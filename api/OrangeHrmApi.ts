import { expect, type APIRequestContext } from '@playwright/test';

export interface Employee {
  empNumber: number;
  firstName: string;
  lastName: string;
}

const API = '/web/index.php/api/v2';

/**
 * Thin wrapper over the OrangeHRM REST API, used for test setup and cleanup.
 * It must be given a request context that carries a logged-in session (e.g. page.request).
 */
export class OrangeHrmApi {
  constructor(private readonly request: APIRequestContext) {}

  async createEmployee(firstName: string, lastName: string): Promise<Employee> {
    const response = await this.request.post(`${API}/pim/employees`, {
      data: { firstName, middleName: '', lastName, employeeId: '' },
    });
    await expect(response, 'create employee').toBeOK();
    return (await response.json()).data as Employee;
  }

  async deleteEmployees(empNumbers: number[]): Promise<void> {
    if (empNumbers.length === 0) return;
    const response = await this.request.delete(`${API}/pim/employees`, { data: { ids: empNumbers } });
    await expect(response, 'delete employees').toBeOK();
  }

  async findUserIdsByUsername(username: string): Promise<number[]> {
    const response = await this.request.get(`${API}/admin/users`, { params: { username } });
    await expect(response, 'search users').toBeOK();
    const { data } = (await response.json()) as { data: { id: number; userName: string }[] };
    return data.filter((user) => user.userName === username).map((user) => user.id);
  }

  async deleteUsersByUsername(username: string): Promise<void> {
    const ids = await this.findUserIdsByUsername(username);
    if (ids.length === 0) return;
    const response = await this.request.delete(`${API}/admin/users`, { data: { ids } });
    await expect(response, 'delete users').toBeOK();
  }
}
