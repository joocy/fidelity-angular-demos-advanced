export interface Fund {
  id: string;
  name: string;
  isin: string;
  ytd: number;
  nav: number;
  riskRating: 'Low' | 'Medium' | 'High';
}

export const FUNDS: Map<string, Fund> = new Map([
  ['uk-eq', {
    id: 'uk-eq',
    name: 'Apex UK Equity Fund',
    isin: 'GB00B1234567',
    ytd: 8.4,
    nav: 142.50,
    riskRating: 'High',
  }],
  ['gov-bd', {
    id: 'gov-bd',
    name: 'Apex Government Bond Fund',
    isin: 'GB00B2345678',
    ytd: 2.1,
    nav: 98.30,
    riskRating: 'Low',
  }],
  ['em', {
    id: 'em',
    name: 'Apex Emerging Markets Fund',
    isin: 'GB00B3456789',
    ytd: 14.7,
    nav: 211.80,
    riskRating: 'High',
  }],
  ['mm', {
    id: 'mm',
    name: 'Apex Money Market Fund',
    isin: 'GB00B4567890',
    ytd: 4.2,
    nav: 100.10,
    riskRating: 'Low',
  }],
]);
