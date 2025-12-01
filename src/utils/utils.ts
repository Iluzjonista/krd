export function formatDate(date: string): string {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString('pl-PL');
}