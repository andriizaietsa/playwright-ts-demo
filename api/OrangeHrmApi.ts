import { expect, type APIRequestContext } from '@playwright/test';
import { todayLocal } from '../test-data/dates';

const API = '/web/index.php/api/v2';

export interface Employee {
  empNumber: number;
  firstName: string;
  lastName: string;
}
export interface JobTitle {
  id: number;
  title: string;
}
export interface Named {
  id: number;
  name: string;
}
export interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

type Params = Record<string, string | number>;

/**
 * Thin wrapper over the OrangeHRM REST API, used only for test setup and cleanup — the tests check the UI.
 * It must be given a request context that carries a logged-in session (e.g. page.request).
 * The delete…By… methods look records up by name first, so they are safe to call when nothing exists.
 */
export class OrangeHrmApi {
  constructor(private readonly request: APIRequestContext) {}

  // ─── Generic helpers ───

  private async create<T>(endpoint: string, data: object): Promise<T> {
    const response = await this.request.post(`${API}/${endpoint}`, { data });
    await expect(response, `create ${endpoint}`).toBeOK();
    return ((await response.json()) as { data: T }).data;
  }

  /**
   * Every record matching `params`, read page by page — a single page would silently miss records
   * once a list on the shared demo grows past it. Pass server-side filters wherever the endpoint has one.
   */
  private async list<T>(endpoint: string, params: Params = {}): Promise<T[]> {
    const pageSize = 100;
    const all: T[] = [];
    for (let offset = 0; ; offset += pageSize) {
      const response = await this.request.get(`${API}/${endpoint}`, {
        params: { ...params, limit: pageSize, offset },
      });
      await expect(response, `list ${endpoint}`).toBeOK();
      const { data, meta } = (await response.json()) as { data: T[]; meta: { total?: number } };
      all.push(...data);
      if (data.length < pageSize || all.length >= (meta.total ?? 0)) return all;
    }
  }

  private async deleteIds(endpoint: string, ids: number[]): Promise<void> {
    if (ids.length === 0) return;
    const response = await this.request.delete(`${API}/${endpoint}`, { data: { ids } });
    await expect(response, `delete ${endpoint}`).toBeOK();
  }

  // ─── PIM ───

  createEmployee(firstName: string, lastName: string): Promise<Employee> {
    return this.create('pim/employees', { firstName, middleName: '', lastName, employeeId: '' });
  }

  async deleteEmployeesByFirstName(firstName: string): Promise<void> {
    const found = await this.list<Employee>('pim/employees', { nameOrId: firstName });
    await this.deleteIds('pim/employees', found.filter((e) => e.firstName === firstName).map((e) => e.empNumber));
  }

  // ─── Admin ───

  createSystemUser(user: { username: string; password: string; empNumber: number; role: 'Admin' | 'ESS' }) {
    return this.create<{ id: number; userName: string }>('admin/users', {
      username: user.username,
      password: user.password,
      status: true,
      userRoleId: user.role === 'Admin' ? 1 : 2,
      empNumber: user.empNumber,
    });
  }

  async deleteUsersByUsername(username: string): Promise<void> {
    const found = await this.list<{ id: number; userName: string }>('admin/users', { username });
    await this.deleteIds('admin/users', found.filter((u) => u.userName === username).map((u) => u.id));
  }

  createJobTitle(title: string): Promise<JobTitle> {
    return this.create('admin/job-titles', { title, description: '', note: '' });
  }

  async deleteJobTitlesByTitle(title: string): Promise<void> {
    const found = await this.list<JobTitle>('admin/job-titles');
    await this.deleteIds('admin/job-titles', found.filter((j) => j.title === title).map((j) => j.id));
  }

  // ─── Leave ───

  createLeaveType(name: string): Promise<Named> {
    return this.create('leave/leave-types', { name, situational: false });
  }

  async deleteLeaveTypesByName(name: string): Promise<void> {
    await this.deleteByName('leave/leave-types', name);
  }

  async deleteEntitlements(empNumber: number, leaveTypeId: number): Promise<void> {
    const found = await this.list<{ id: number }>('leave/leave-entitlements', { empNumber, leaveTypeId });
    await this.deleteIds('leave/leave-entitlements', found.map((e) => e.id));
  }

  // ─── Time ───

  createCustomer(name: string): Promise<Named> {
    return this.create('time/customers', { name, description: '' });
  }

  async deleteCustomersByName(name: string): Promise<void> {
    await this.deleteByName('time/customers', name);
  }

  async deleteProjectsByName(name: string): Promise<void> {
    await this.deleteByName('time/projects', name);
  }

  // ─── Recruitment ───

  createCandidate(candidate: { firstName: string; lastName: string; email: string }): Promise<Candidate> {
    return this.create('recruitment/candidates', {
      ...candidate,
      middleName: '',
      contactNumber: '',
      keywords: '',
      comment: '',
      dateOfApplication: todayLocal(),
      consentToKeepData: false,
    });
  }

  /** Looks the candidate up by last name on the server, then matches the exact email. */
  async deleteCandidates(candidate: { lastName: string; email: string }): Promise<void> {
    const found = await this.list<Candidate>('recruitment/candidates', { candidateName: candidate.lastName });
    await this.deleteIds('recruitment/candidates', found.filter((c) => c.email === candidate.email).map((c) => c.id));
  }

  async deleteVacanciesByName(name: string, jobTitleId: number): Promise<void> {
    const found = await this.list<Named>('recruitment/vacancies', { jobTitleId });
    await this.deleteIds('recruitment/vacancies', found.filter((v) => v.name === name).map((v) => v.id));
  }

  // ─── Performance ───

  async deleteKpisByTitle(title: string, jobTitleId: number): Promise<void> {
    const found = await this.list<{ id: number; title: string }>('performance/kpis', { jobTitleId });
    await this.deleteIds('performance/kpis', found.filter((k) => k.title === title).map((k) => k.id));
  }

  // ─── Claim ───

  async deleteEventsByName(name: string): Promise<void> {
    await this.deleteByName('claim/events', name);
  }

  async deleteExpenseTypesByName(name: string): Promise<void> {
    await this.deleteByName('claim/expenses/types', name);
  }

  // ─── Buzz ───

  async createBuzzPost(text: string): Promise<void> {
    await this.create('buzz/posts', { type: 'text', text });
  }

  /**
   * Buzz posts are deleted one share at a time, not by a list of ids. The feed has no text filter,
   * so only the newest 50 posts are searched — enough for a post this test run just created.
   */
  async deleteBuzzPostsByText(text: string): Promise<void> {
    const response = await this.request.get(`${API}/buzz/feed`, {
      params: { limit: 50, sortField: 'share.createdAtUtc', sortOrder: 'DESC' },
    });
    await expect(response, 'list buzz feed').toBeOK();
    const feed = ((await response.json()) as { data: { id: number; text: string | null }[] }).data;
    for (const share of feed.filter((s) => s.text === text)) {
      const response = await this.request.delete(`${API}/buzz/shares/${share.id}`);
      await expect(response, 'delete buzz share').toBeOK();
    }
  }

  private async deleteByName(endpoint: string, name: string): Promise<void> {
    const found = await this.list<Named>(endpoint);
    await this.deleteIds(endpoint, found.filter((item) => item.name === name).map((item) => item.id));
  }
}
