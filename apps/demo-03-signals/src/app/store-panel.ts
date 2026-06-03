import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WatchlistStore } from './watchlist.store';

@Component({
  selector: 'app-store-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <h2>NgRx SignalStore — Watchlist</h2>
      <p style="color:#6b7280;font-size:0.85rem;margin-bottom:1.25rem">
        <code>WatchlistStore</code> is created with <code>signalStore()</code> from
        <strong>@ngrx/signals</strong>. State slices (<code>items</code>, <code>filter</code>),
        computed signals (<code>filteredItems</code>, <code>gainers</code>, <code>losers</code>),
        and methods (<code>setFilter</code>, <code>updatePrice</code>) are all first-class signals —
        no selectors, reducers, or actions required.
      </p>

      <!-- Stats bar -->
      <div style="display:flex;gap:1rem;margin-bottom:1rem;flex-wrap:wrap">
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:0.6rem 1rem;display:flex;align-items:center;gap:0.5rem">
          <span style="font-size:1.1rem">▲</span>
          <div>
            <div style="font-size:1.3rem;font-weight:700;color:#16a34a;font-family:monospace">{{ store.gainers() }}</div>
            <div style="font-size:0.75rem;color:#6b7280;font-weight:600">GAINERS</div>
          </div>
        </div>
        <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:6px;padding:0.6rem 1rem;display:flex;align-items:center;gap:0.5rem">
          <span style="font-size:1.1rem">▼</span>
          <div>
            <div style="font-size:1.3rem;font-weight:700;color:#dc2626;font-family:monospace">{{ store.losers() }}</div>
            <div style="font-size:0.75rem;color:#6b7280;font-weight:600">LOSERS</div>
          </div>
        </div>
        <div style="flex:1"></div>
        <div style="display:flex;align-items:flex-end;gap:0.5rem">
          <button class="btn-primary" (click)="randomisePrices()">Randomise prices</button>
        </div>
      </div>

      <!-- Filter -->
      <div style="margin-bottom:0.75rem">
        <label>Filter by symbol</label>
        <input
          [value]="store.filter()"
          (input)="store.setFilter(asString($event))"
          placeholder="e.g. AA"
          style="width:180px" />
        @if (store.filter()) {
          <span style="margin-left:0.6rem;font-size:0.82rem;color:#6b7280">
            Showing {{ store.filteredItems().length }} of {{ store.items().length }} items
          </span>
        }
      </div>

      <!-- Watchlist table -->
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th style="text-align:right">Price ($)</th>
            <th style="text-align:right">Change (%)</th>
          </tr>
        </thead>
        <tbody>
          @for (item of store.filteredItems(); track item.symbol) {
            <tr>
              <td style="font-weight:600;letter-spacing:0.02em">{{ item.symbol }}</td>
              <td style="text-align:right;font-family:monospace">{{ item.price.toFixed(2) }}</td>
              <td style="text-align:right;font-family:monospace"
                  [style.color]="item.change >= 0 ? '#16a34a' : '#dc2626'">
                {{ item.change >= 0 ? '+' : '' }}{{ item.change.toFixed(2) }}%
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="3" style="text-align:center;color:#9ca3af;padding:1rem">
                No items match the current filter.
              </td>
            </tr>
          }
        </tbody>
      </table>

      <div style="margin-top:0.75rem;font-size:0.8rem;color:#9ca3af">
        State is held in <code>WatchlistStore</code> (providedIn: 'root') — shared across all consumers.
      </div>
    </div>
  `,
})
export class StorePanel {
  readonly store = inject(WatchlistStore);

  asString(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  randomisePrices(): void {
    for (const item of this.store.items()) {
      const delta  = (Math.random() - 0.48) * 10;
      const newPrice = Math.max(1, +(item.price + delta).toFixed(2));
      this.store.updatePrice(item.symbol, newPrice);
    }
  }
}
