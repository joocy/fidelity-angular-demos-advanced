import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TradingService } from './trading.service';
import { MarketDataService } from '../market-data/market-data.service';

@Component({
  selector: 'app-order-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
  template: `
    <div class="card">
      <h2>Place Order</h2>

      <div style="display:flex;flex-direction:column;gap:0.75rem">

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem">
          <div>
            <label style="display:block;font-size:0.8rem;font-weight:600;color:#374151;margin-bottom:0.3rem">
              Symbol
            </label>
            <select
              style="width:100%;padding:0.45rem 0.6rem;border:1px solid #d1d5db;border-radius:4px;font-size:0.875rem;background:white"
              [value]="symbol()"
              (change)="symbol.set($any($event.target).value)">
              <option value="AAPL">AAPL – Apple</option>
              <option value="GS">GS – Goldman Sachs</option>
              <option value="MSFT">MSFT – Microsoft</option>
            </select>
          </div>

          <div>
            <label style="display:block;font-size:0.8rem;font-weight:600;color:#374151;margin-bottom:0.3rem">
              Side
            </label>
            <div style="display:flex;gap:0.5rem">
              <button
                style="flex:1;padding:0.45rem;border-radius:4px;border:2px solid transparent;font-size:0.875rem;font-weight:600;transition:all 0.15s"
                [style.background]="side() === 'buy' ? '#059669' : '#e5e7eb'"
                [style.color]="side() === 'buy' ? 'white' : '#374151'"
                (click)="side.set('buy')">
                BUY
              </button>
              <button
                style="flex:1;padding:0.45rem;border-radius:4px;border:2px solid transparent;font-size:0.875rem;font-weight:600;transition:all 0.15s"
                [style.background]="side() === 'sell' ? '#dc2626' : '#e5e7eb'"
                [style.color]="side() === 'sell' ? 'white' : '#374151'"
                (click)="side.set('sell')">
                SELL
              </button>
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem">
          <div>
            <label style="display:block;font-size:0.8rem;font-weight:600;color:#374151;margin-bottom:0.3rem">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              style="width:100%;padding:0.45rem 0.6rem;border:1px solid #d1d5db;border-radius:4px;font-size:0.875rem"
              [value]="qty()"
              (input)="qty.set(+$any($event.target).value)" />
          </div>

          <div>
            <label style="display:block;font-size:0.8rem;font-weight:600;color:#374151;margin-bottom:0.3rem">
              Price (market)
            </label>
            <div style="
              padding:0.45rem 0.6rem;
              border:1px solid #e5e7eb;
              border-radius:4px;
              font-family:monospace;
              font-size:0.875rem;
              background:#f9fafb;
              color:#1a3a6b;
              font-weight:600
            ">
              \${{ livePrice() | number:'1.2-2' }}
            </div>
          </div>
        </div>

        <div style="
          background:#f8fafc;
          border:1px solid #e5e7eb;
          border-radius:4px;
          padding:0.6rem 0.75rem;
          font-size:0.875rem;
          display:flex;
          justify-content:space-between
        ">
          <span style="color:#6b7280">Estimated notional</span>
          <span style="font-weight:700;color:#1a3a6b;font-family:monospace">
            \${{ (qty() * livePrice()) | number:'1.2-2' }}
          </span>
        </div>

        <button
          class="btn-primary"
          style="width:100%;padding:0.6rem;font-size:0.9rem;font-weight:600;letter-spacing:0.03em"
          [style.background]="side() === 'sell' ? '#dc2626' : '#1a3a6b'"
          [disabled]="qty() <= 0"
          (click)="submit()">
          {{ side() === 'buy' ? 'Place Buy Order' : 'Place Sell Order' }}
        </button>
      </div>

      <p style="margin-top:0.75rem;font-size:0.78rem;color:#9ca3af">
        Architecture note: This component holds only ephemeral UI state (signals).
        Committed state lives in <code style="background:#f3f4f6;padding:0.1rem 0.3rem;border-radius:3px">TradingService</code>.
      </p>
    </div>
  `,
})
export class OrderForm {
  private readonly tradingSvc = inject(TradingService);
  private readonly marketSvc = inject(MarketDataService);

  readonly symbol = signal<string>('AAPL');
  readonly side = signal<'buy' | 'sell'>('buy');
  readonly qty = signal<number>(10);

  livePrice(): number {
    return this.marketSvc.prices()[this.symbol()] ?? 0;
  }

  submit(): void {
    if (this.qty() <= 0) return;
    this.tradingSvc.placeOrder(this.symbol(), this.side(), this.qty(), this.livePrice());
    this.qty.set(10);
  }
}
