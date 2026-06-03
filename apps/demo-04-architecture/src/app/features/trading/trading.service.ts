import { Injectable, inject, signal } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';

export interface Order {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  qty: number;
  price: number;
  timestamp: Date;
}

@Injectable({ providedIn: 'root' })
export class TradingService {
  private readonly notificationSvc = inject(NotificationService);

  readonly orders = signal<Order[]>([]);

  placeOrder(symbol: string, side: 'buy' | 'sell', qty: number, price: number): void {
    const order: Order = {
      id: `ORD-${Date.now()}`,
      symbol,
      side,
      qty,
      price,
      timestamp: new Date(),
    };
    this.orders.update(prev => [order, ...prev]);
    this.notificationSvc.notify(
      `Order placed: ${side.toUpperCase()} ${qty} × ${symbol} @ $${price.toFixed(2)}`
    );
  }
}
