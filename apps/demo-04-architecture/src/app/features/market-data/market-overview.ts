import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MarketDataService } from './market-data.service';

@Component({
  selector: 'app-market-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
  template: `
    <div class="card">
      <h2>Market Overview</h2>

      <div style="display:flex;flex-direction:column;gap:0.75rem">
        @for (sym of symbols(); track sym) {
          <div style="
            background:#f8fafc;
            border:1px solid #e5e7eb;
            border-radius:6px;
            padding:0.75rem 1rem;
            display:flex;
            justify-content:space-between;
            align-items:center
          ">
            <div>
              <div style="font-weight:700;font-size:1rem;color:#1a1f35">{{ sym }}</div>
              <div style="font-size:0.78rem;color:#6b7280;margin-top:0.1rem">{{ companyName(sym) }}</div>
            </div>
            <div style="text-align:right">
              <div style="font-family:monospace;font-size:1.05rem;font-weight:600;color:#1a3a6b">
                \${{ prices()[sym] | number:'1.2-2' }}
              </div>
              <div style="margin-top:0.2rem">
                <span [class]="'badge ' + (changePercent(sym) >= 0 ? 'badge-up' : 'badge-down')">
                  {{ changePercent(sym) >= 0 ? '+' : '' }}{{ changePercent(sym) | number:'1.2-2' }}%
                </span>
              </div>
            </div>
          </div>
        }
      </div>

      <p style="margin-top:0.75rem;font-size:0.78rem;color:#9ca3af">
        Architecture note: <code style="background:#f3f4f6;padding:0.1rem 0.3rem;border-radius:3px">MarketDataService</code>
        owns the live feed — both this component and <code style="background:#f3f4f6;padding:0.1rem 0.3rem;border-radius:3px">PriceTicker</code>
        share the same signal without duplication.
      </p>
    </div>
  `,
})
export class MarketOverview {
  private readonly marketSvc = inject(MarketDataService);

  readonly prices = this.marketSvc.prices;

  private readonly NAMES: Record<string, string> = {
    AAPL:  'Apple Inc.',
    GS:    'Goldman Sachs',
    MSFT:  'Microsoft Corp.',
  };

  symbols(): string[] {
    return this.marketSvc.symbols();
  }

  companyName(sym: string): string {
    return this.NAMES[sym] ?? sym;
  }

  changePercent(symbol: string): number {
    return this.marketSvc.changePercent(symbol);
  }
}
