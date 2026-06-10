import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { BlotterStore } from './trade-blotter.store';

@Component({
  selector: 'app-orders-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <h2>Order Entry</h2>

      <!-- Entry form -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:1rem">
        <div>
          <label>Symbol</label>
          <input [value]="symbol()" (input)="symbol.set(asString($event))"
                 placeholder="e.g. AAPL" style="width:100%" />
        </div>
        <div>
          <label>Side</label>
          <select [value]="side()" (change)="side.set(asSide($event))" style="width:100%">
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
          </select>
        </div>
        <div>
          <label>Quantity</label>
          <input type="number" [value]="quantity()" (input)="quantity.set(asNumber($event))"
                 min="1" style="width:100%" />
        </div>
        <div>
          <label>Price ($)</label>
          <input type="number" [value]="price()" (input)="price.set(asNumber($event))"
                 min="0.01" step="0.01" style="width:100%" />
        </div>
      </div>

      <button class="btn-primary" (click)="place()" [disabled]="!canPlace()">
        Place Order
      </button>

      <!-- Open orders -->
      <div style="margin-top:1.25rem">
        <div style="font-size:0.82rem;color:#6b7280;font-weight:600;text-transform:uppercase;
                    letter-spacing:0.04em;margin-bottom:0.5rem">
          Open Orders ({{ store.orders().length }})
        </div>

        @if (store.orders().length === 0) {
          <div style="color:#9ca3af;font-size:0.875rem;padding:0.75rem 0">
            No open orders. Place one above.
          </div>
        } @else {
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Symbol</th>
                <th>Side</th>
                <th style="text-align:right">Qty</th>
                <th style="text-align:right">Price</th>
                <th style="text-align:right">Value</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              @for (order of store.orders(); track order.id) {
                <tr>
                  <td style="color:#9ca3af;font-size:0.8rem">{{ order.id }}</td>
                  <td style="font-weight:600">{{ order.symbol }}</td>
                  <td>
                    <span [style.color]="order.side === 'BUY' ? '#16a34a' : '#dc2626'"
                          style="font-weight:600;font-size:0.85rem">
                      {{ order.side }}
                    </span>
                  </td>
                  <td style="text-align:right;font-family:monospace">{{ order.quantity }}</td>
                  <td style="text-align:right;font-family:monospace">{{ order.price.toFixed(2) }}</td>
                  <td style="text-align:right;font-family:monospace">
                    {{ (order.quantity * order.price).toFixed(2) }}
                  </td>
                  <td style="text-align:right">
                    <button class="btn-secondary btn-sm" (click)="store.cancelOrder(order.id)">
                      Cancel
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        }
      </div>
    </div>
  `,
})
export class OrdersPanel {
  readonly store = inject(BlotterStore);

  symbol   = signal('AAPL');
  side     = signal<'BUY' | 'SELL'>('BUY');
  quantity = signal(100);
  price    = signal(182.50);

  canPlace() {
    return this.symbol().trim().length > 0 && this.quantity() > 0 && this.price() > 0;
  }

  place(): void {
    if (!this.canPlace()) return;
    this.store.placeOrder(this.symbol().toUpperCase(), this.side(), this.quantity(), this.price());
  }

  asString(e: Event): string { return (e.target as HTMLInputElement).value; }
  asNumber(e: Event): number { return +(e.target as HTMLInputElement).value; }
  asSide(e: Event): 'BUY' | 'SELL' { return (e.target as HTMLSelectElement).value as 'BUY' | 'SELL'; }
}
