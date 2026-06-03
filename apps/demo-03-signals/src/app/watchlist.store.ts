import { computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';

export interface WatchlistItem {
  symbol: string;
  price: number;
  change: number;
}

const INITIAL_ITEMS: WatchlistItem[] = [
  { symbol: 'AAPL',  price: 182.50, change:  1.24 },
  { symbol: 'GS',    price: 455.00, change:  2.05 },
  { symbol: 'MSFT',  price: 414.00, change: -0.87 },
  { symbol: 'AMZN',  price: 185.00, change:  0.63 },
  { symbol: 'NVDA',  price: 890.00, change: -1.42 },
];

export const WatchlistStore = signalStore(
  { providedIn: 'root' },
  withState({
    items: INITIAL_ITEMS as WatchlistItem[],
    filter: '',
  }),
  withComputed(({ items, filter }) => ({
    filteredItems: computed(() =>
      filter()
        ? items().filter(i => i.symbol.includes(filter().toUpperCase()))
        : items()
    ),
    gainers: computed(() => items().filter(i => i.change > 0).length),
    losers:  computed(() => items().filter(i => i.change < 0).length),
  })),
  withMethods(store => ({
    setFilter: (f: string) => patchState(store, { filter: f }),
    updatePrice: (symbol: string, price: number) =>
      patchState(store, {
        items: store.items().map(i =>
          i.symbol === symbol
            ? { ...i, price, change: +(((price - 180) / 180) * 100).toFixed(2) }
            : i
        ),
      }),
  }))
);
