import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { withAuditLog } from './with-audit-log.feature';

export interface Order {
  id: number;
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: number;
  price: number;
}

export const BlotterStore = signalStore(
  { providedIn: 'root' },
  withState({
    orders: [] as Order[],
    nextId: 1,
  }),
  withAuditLog(),
  withComputed(({ orders }) => ({
    totalBuys: computed(() =>
      orders()
        .filter(o => o.side === 'BUY')
        .reduce((sum, o) => sum + o.quantity * o.price, 0),
    ),
    totalSells: computed(() =>
      orders()
        .filter(o => o.side === 'SELL')
        .reduce((sum, o) => sum + o.quantity * o.price, 0),
    ),
    netExposure: computed(() =>
      orders().reduce(
        (net, o) => net + (o.side === 'BUY' ? 1 : -1) * o.quantity * o.price,
        0,
      ),
    ),
    buyCount:  computed(() => orders().filter(o => o.side === 'BUY').length),
    sellCount: computed(() => orders().filter(o => o.side === 'SELL').length),
  })),
  withMethods(store => ({
    placeOrder(symbol: string, side: 'BUY' | 'SELL', quantity: number, price: number): void {
      const id = store.nextId();
      patchState(store, {
        orders: [...store.orders(), { id, symbol, side, quantity, price }],
        nextId: id + 1,
      });
      store.logAction(`#${id} ${side} ${quantity} ${symbol} @ ${price.toFixed(2)}`);
    },
    cancelOrder(id: number): void {
      const order = store.orders().find(o => o.id === id);
      patchState(store, { orders: store.orders().filter(o => o.id !== id) });
      if (order) {
        store.logAction(`Cancelled #${id} ${order.side} ${order.symbol}`);
      }
    },
    cancelAll(): void {
      const count = store.orders().length;
      patchState(store, { orders: [] });
      store.logAction(`Cancelled all ${count} order${count !== 1 ? 's' : ''}`);
    },
  })),
);
