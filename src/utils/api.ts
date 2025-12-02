import { Debt } from './types';

const BASEURL = 'https://rekrutacja-webhosting-it.krd.pl/api/Recruitment';

export async function GetTopDebts(): Promise<Debt[]> {
    const response = await fetch(`${BASEURL}/GetTopDebts`);
    if (!response.ok) throw new Error(`Network response was not ok, HTTP ${response.status}`);
    return response.json();
};

export async function GetFilteredDebts(phrase: string): Promise<Debt[]> {
    const response = await fetch(`${BASEURL}/GetFilteredDebts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phrase })
    });
    if (response.status === 405) throw new Error('Phrase too short');
    if (!response.ok) throw new Error(`Network response was not ok, HTTP ${response.status}`);
    return response.json();
};