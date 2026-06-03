export interface Fund {
  id: string;
  name: string;
  isin: string;
  ytd: number;
  nav: number;
  riskRating: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export const FUNDS: Fund[] = [
  { id: 'uk-equity',        name: 'UK Equity Fund',        isin: 'GB00B3X7QG63', ytd:  8.4,  nav: 142.50, riskRating: 5 },
  { id: 'gov-bond',         name: 'Government Bond Fund',  isin: 'GB00BG05HK52', ytd:  2.1,  nav:  98.20, riskRating: 2 },
  { id: 'emerging-markets', name: 'Emerging Markets Fund', isin: 'GB00B4TZHH95', ytd: 14.7,  nav: 213.80, riskRating: 6 },
];
