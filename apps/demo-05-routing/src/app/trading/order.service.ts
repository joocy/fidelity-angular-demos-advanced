import { Injectable, signal } from '@angular/core';

export interface Order {
  id: number;
  symbol: string;
  side: 'Buy' | 'Sell';
  quantity: number;
  timestamp: Date;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private _orders = signal<Order[]>([]);
  readonly orders = this._orders.asReadonly();

  private nextId = 1;

  submit(symbol: string, side: 'Buy' | 'Sell', quantity: number): void {
    this._orders.update(list => [
      ...list,
      { id: this.nextId++, symbol: symbol.toUpperCase(), side, quantity, timestamp: new Date() },
    ]);
  }
}
