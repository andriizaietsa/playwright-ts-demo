import { type Candidate, type Employee, type JobTitle, type Named, type OrangeHrmApi } from '../api/OrangeHrmApi';
import { E2E_PREFIX, uniqueName, uniqueSuffix } from '../test-data/names';
import { type Cleanup } from './Cleanup';

export type SeededEmployee = Employee & { fullName: string };
export type SeededCandidate = Candidate & { fullName: string };

/**
 * Creates test preconditions through the API — fast and independent of the UI under test —
 * and registers each record for cleanup the moment it exists.
 */
export class Seeder {
  constructor(
    private readonly api: OrangeHrmApi,
    private readonly cleanup: Cleanup,
  ) {}

  async employee(): Promise<SeededEmployee> {
    const firstName = `${E2E_PREFIX.toUpperCase()}${uniqueSuffix()}`;
    const created = await this.api.createEmployee(firstName, 'Automation');
    this.cleanup.add(`employee ${firstName}`, () => this.api.deleteEmployeesByFirstName(firstName));
    return { ...created, fullName: `${created.firstName} ${created.lastName}` };
  }

  async systemUser(employee: Employee, role: 'Admin' | 'ESS' = 'ESS') {
    const suffix = uniqueSuffix();
    const username = `${E2E_PREFIX}_user_${suffix}`;
    const user = await this.api.createSystemUser({ username, password: `Pw!${suffix}9`, empNumber: employee.empNumber, role });
    this.cleanup.add(`user ${username}`, () => this.api.deleteUsersByUsername(username));
    return user;
  }

  async jobTitle(): Promise<JobTitle> {
    const title = uniqueName('Job Title');
    const created = await this.api.createJobTitle(title);
    this.cleanup.add(`job title ${title}`, () => this.api.deleteJobTitlesByTitle(title));
    return created;
  }

  async leaveType(): Promise<Named> {
    const name = uniqueName('Leave');
    const created = await this.api.createLeaveType(name);
    this.cleanup.add(`leave type ${name}`, () => this.api.deleteLeaveTypesByName(name));
    return created;
  }

  async customer(): Promise<Named> {
    const name = uniqueName('Customer');
    const created = await this.api.createCustomer(name);
    this.cleanup.add(`customer ${name}`, () => this.api.deleteCustomersByName(name));
    return created;
  }

  async candidate(): Promise<SeededCandidate> {
    const suffix = uniqueSuffix();
    // The candidate autocomplete matches one name at a time, so the last name carries the unique part.
    const candidate = { firstName: E2E_PREFIX.toUpperCase(), lastName: `Cand${suffix}`, email: `${E2E_PREFIX}.${suffix}@example.com` };
    const created = await this.api.createCandidate(candidate);
    this.cleanup.add(`candidate ${candidate.email}`, () => this.api.deleteCandidates(candidate));
    return { ...created, fullName: `${created.firstName} ${created.lastName}` };
  }

  async buzzPost(): Promise<{ text: string }> {
    const text = uniqueName('Buzz post');
    await this.api.createBuzzPost(text);
    this.cleanup.add(`buzz post ${text}`, () => this.api.deleteBuzzPostsByText(text));
    return { text };
  }
}
