export interface Fund {
  id: string;
  name: string;
  ytd: number;
  riskRating: 'Low' | 'Medium' | 'High';
}
