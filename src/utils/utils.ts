import { Debt } from "./types";

export function formatDate(date: string): string {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString('pl-PL');
}

export function sortDebts(debts: any[], sort: { key: keyof Debt; dir: 'asc' | 'desc' }) {
  return debts.slice().sort((a, b) => {
    if (a[sort.key] < b[sort.key]) return sort.dir === 'asc' ? -1 : 1;
    if (a[sort.key] > b[sort.key]) return sort.dir === 'asc' ? 1 : -1;
    return 0;
  });
}