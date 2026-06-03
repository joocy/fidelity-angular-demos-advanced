export interface Position {
  fundId: string;
  units: number;
  value: number;
}

export interface Portfolio {
  positions: Position[];
  totalValue: number;
}
