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

// signalStore composes a root-provided injectable store from small feature blocks.
export const BlotterStore = signalStore(
  { providedIn: 'root' },
  // withState defines the writable signal-backed state owned by the store.
  withState({
    orders: [] as Order[],
    nextId: 1,
  }),
  // Custom features can add their own state and methods to the same store instance.
  withAuditLog(),
  // withComputed exposes derived read-only signals that automatically recalculate
  // when the orders signal changes.
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
  // withMethods is where state transitions live. Components call these methods
  // instead of mutating orders directly.
  withMethods(store => ({
    placeOrder(symbol: string, side: 'BUY' | 'SELL', quantity: number, price: number): void {
      const id = store.nextId();
      // patchState replaces state immutably, keeping signal change detection predictable.
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
