import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MarketDataService } from './market-data.service';

@Component({
  selector: 'app-price-ticker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
  styles: [`
    .ticker-bar {
      background: #0f2547;
      color: white;
      padding: 0.5rem 1.5rem;
      display: flex;
      gap: 2rem;
      overflow-x: auto;
      white-space: nowrap;
      align-items: center;
    }
    .ticker-bar::-webkit-scrollbar { height: 3px; }
    .ticker-bar::-webkit-scrollbar-thumb { background: #2d5a8e; border-radius: 3px; }
    .ticker-item {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
    }
    .symbol { font-weight: 700; font-size: 0.85rem; color: #a8bccf; letter-spacing: 0.05em; }
    .price  { font-family: monospace; font-size: 0.95rem; }
    .change-up   { color: #4ade80; font-size: 0.78rem; font-weight: 600; }
    .change-down { color: #f87171; font-size: 0.78rem; font-weight: 600; }
  `],
  template: `
    <div class="ticker-bar">
      <span style="font-size:0.75rem;color:#6b8cae;letter-spacing:0.08em;text-transform:uppercase;flex-shrink:0">
        Live Prices
      </span>
      @for (sym of symbols(); track sym) {
        <div class="ticker-item">
          <span class="symbol">{{ sym }}</span>
          <span class="price">\${{ prices()[sym] | number:'1.2-2' }}</span>
          <span [class]="changePercent(sym) >= 0 ? 'change-up' : 'change-down'">
            {{ changePercent(sym) >= 0 ? '+' : '' }}{{ changePercent(sym) | number:'1.2-2' }}%
          </span>
        </div>
        <span style="color:#2d5a8e;flex-shrink:0">|</span>
      }
    </div>
  `,
})
export class PriceTicker implements OnInit {
  readonly marketSvc = inject(MarketDataService);

  readonly prices = this.marketSvc.prices;

  symbols(): string[] {
    return this.marketSvc.symbols();
  }

  changePercent(symbol: string): number {
    return this.marketSvc.changePercent(symbol);
  }

  ngOnInit(): void {
    this.marketSvc.startLiveFeed();
  }
}
