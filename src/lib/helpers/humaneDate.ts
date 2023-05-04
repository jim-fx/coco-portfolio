export function formatDate(date: Date): string {
  const dayOfMonth = String(date.getDate()).padStart(2, '0');
  const monthOfYear = String(date.getMonth() + 1).padStart(2, '0');
  return `${dayOfMonth}.${monthOfYear}`;
}

