import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input, signal } from '@angular/core';

interface Position {
  symbol: string;
  shares: number;
  price: number;
  value: number;
}

const POSITIONS: Position[] = [
  { symbol: 'AAPL', shares: 500,  price: 189.25, value: 94625 },
  { symbol: 'GS',   shares: 120,  price: 412.80, value: 49536 },
  { symbol: 'MSFT', shares: 300,  price: 378.40, value: 113520 },
];

@Component({
  selector: 'app-manual-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <h2>Detached — Manual CD (detectChanges)</h2>
      <p style="color:#6b7280;font-size:0.85rem;margin-bottom:1rem">
        This component is <strong>fully detached</strong> from the CD tree via
        <code>cdr.detach()</code>. Even though the parent tick is advancing, the view
        only refreshes when you click <em>Refresh now</em>.
      </p>

      <table style="width:100%;border-collapse:collapse;font-size:0.9rem;margin-bottom:0.75rem">
        <thead>
          <tr style="border-bottom:1px solid #e5e7eb">
            <th style="text-align:left;padding:0.35rem 0;color:#6b7280;font-weight:600">Symbol</th>
            <th style="text-align:right;padding:0.35rem 0;color:#6b7280;font-weight:600">Shares</th>
            <th style="text-align:right;padding:0.35rem 0;color:#6b7280;font-weight:600">Live Price</th>
            <th style="text-align:right;padding:0.35rem 0;color:#6b7280;font-weight:600">Value</th>
          </tr>
        </thead>
        <tbody>
          @for (pos of visiblePositions; track pos.symbol) {
            <tr style="border-bottom:1px solid #f3f4f6">
              <td style="padding:0.4rem 0;font-weight:600">{{ pos.symbol }}</td>
              <td style="text-align:right;padding:0.4rem 0">{{ pos.shares }}</td>
              <td style="text-align:right;padding:0.4rem 0;font-family:monospace">
                \${{ pos.price.toFixed(2) }}
              </td>
              <td style="text-align:right;padding:0.4rem 0;font-family:monospace">
                \${{ pos.value.toLocaleString() }}
              </td>
            </tr>
          }
        </tbody>
      </table>

      <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
        <button class="btn-primary" (click)="refresh()">Refresh now</button>
        <span style="font-size:0.82rem;color:#6b7280">
          Last refreshed: <strong>{{ lastRefreshed }}</strong>
        </span>
        <span style="font-size:0.82rem;color:#9ca3af">
          Parent tick: <strong>{{ tick() }}</strong> (this view ignores it)
        </span>
      </div>
    </div>
  `,
})
export class ManualPanel {
  readonly tick = input.required<number>();

  private readonly cdr = inject(ChangeDetectorRef);

  visiblePositions: Position[] = POSITIONS.map(p => ({ ...p }));
  lastRefreshed = '—';

  private latestPrices: Record<string, number> = Object.fromEntries(
    POSITIONS.map(p => [p.symbol, p.price])
  );

  constructor() {
    // Detach immediately — this view will never be checked automatically.
    this.cdr.detach();

    const destroyRef = inject(DestroyRef);

    const interval = setInterval(() => {
      for (const sym of Object.keys(this.latestPrices)) {
        const jitter = (Math.random() - 0.5) * 2;
        this.latestPrices[sym] = Math.max(1, +(this.latestPrices[sym] + jitter).toFixed(2));
      }
      // Intentionally NOT calling detectChanges — the view stays stale until the user clicks.
    }, 1000);

    destroyRef.onDestroy(() => clearInterval(interval));
  }

  refresh(): void {
    this.visiblePositions = POSITIONS.map(p => ({
      ...p,
      price: this.latestPrices[p.symbol],
      value: Math.round(p.shares * this.latestPrices[p.symbol]),
    }));
    this.lastRefreshed = new Date().toLocaleTimeString();
    this.cdr.detectChanges();
  }
}
