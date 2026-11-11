import { type Locator, type Page } from '@playwright/test';

/**
 * Clicks a list page's Search button and waits for the filtered list response.
 * Until it lands, the table still shows the unfiltered list, and assertions would run against stale rows.
 *
 * @param endpoint    API path the list loads from, e.g. '/api/v2/pim/employees'
 * @param filterParam query parameter only the filtered request carries, e.g. 'empNumber'
 */
export async function clickAndWaitForList(
  page: Page,
  searchButton: Locator,
  endpoint: string,
  filterParam: string,
): Promise<void> {
  const filtered = page.waitForResponse((response) => {
    const url = new URL(response.url());
    return url.pathname.endsWith(endpoint) && url.searchParams.has(filterParam);
  });
  await searchButton.click();
  await filtered;
}
