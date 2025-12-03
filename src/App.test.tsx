import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { formatDate, sortDebts } from './utils/utils';
import TableDebts from './components/TableDebts/TableDebts';
import { Debt } from './utils/types';

const sampleData: Debt[] = [
  { Id: 1, Name: "Marcin Szymczak (Test)", Value: 10000.0, NIP: "1112223301", Date: "2017-03-01T00:00:00" },
  { Id: 2, Name: "Kazimierz Górski (Test)", Value: 4000.0, NIP: "1112223302", Date: "2017-03-30T00:00:00" },
  { Id: 3, Name: "Renata Urbańska (Test)", Value: 1000.0, NIP: "1112223303", Date: "2017-02-03T00:00:00" }
];

test('Renders input and search button', () => {
  render(<App />);
  expect(screen.getByText('Szukaj')).toBeInTheDocument();
  expect(screen.getByRole('searchbox')).toBeInTheDocument();
});

test('Renders table', () => {
  render(<TableDebts data={sampleData} loading={false} sort={{ key: 'Name', dir: 'asc' }} onSort={() => {}}/>);
  expect(screen.getByText('Dłużnik')).toBeInTheDocument();
  expect(screen.getByText('NIP')).toBeInTheDocument();
  expect(screen.getByText('Kwota zadłużenia')).toBeInTheDocument();
  expect(screen.getByText('Data')).toBeInTheDocument();
  expect(screen.getByText(sampleData[0].Name)).toBeInTheDocument();
  expect(screen.getByText(sampleData[0].Value)).toBeInTheDocument();
  expect(screen.getByText(sampleData[1].NIP)).toBeInTheDocument();
});

test('Filtering calling', async () => {
  render(<App />);
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'test' } });
  fireEvent.click(screen.getByText('Szukaj'));
  expect(screen.getByTestId('loader')).toBeInTheDocument();
});

test('Renders Error message - too short input', async () => {
  render(<App />);
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: '1' } });
  fireEvent.click(screen.getByText('Szukaj'));
  expect(await screen.findByText('Fraza wyszukiwania jest za krótka. Proszę podać co najmniej 3 znaki.')).toBeInTheDocument();
});

test('Renders Error message - no data', () => {
  render(<TableDebts data={[]} loading={false} sort={{ key: 'Name', dir: 'asc' }} onSort={() => {}}/>);
  expect(screen.getByText('Brak danych do wyświetlenia')).toBeInTheDocument();
});

test('Renders loader', () => {
  render(<TableDebts data={sampleData} loading={true} sort={{ key: 'Name', dir: 'asc' }} onSort={() => {}}/>);
  expect(screen.getByTestId('loader')).toBeInTheDocument();
});

test('Sorts data by NIP ascending', () => {
  render(<TableDebts data={sampleData} loading={false} sort={{ key: 'NIP', dir: 'asc' }} onSort={() => {}}/>);
  const sorted = sortDebts(sampleData, { key: 'NIP', dir: 'asc' });
  expect(sorted[0].NIP).toBe('1112223301');
  expect(sorted[1].NIP).toBe('1112223302');
});

test('Show correct date', () => {
  const sampleDate = '2017-04-15T00:00:00';
  expect(formatDate(sampleDate)).toBe('15.04.2017');
});
