/**
 * Today's date as YYYY-MM-DD in the machine's own time zone — the date a user would pick.
 * toISOString() gives the UTC date, which is already "tomorrow" on an evening run west of UTC.
 */
export function todayLocal(): string {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}
