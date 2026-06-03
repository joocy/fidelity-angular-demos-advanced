import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, input, signal } from '@angular/core';

const BASE_PRICES: Record<string, number> = { AAPL: 189.25, GS: 412.80, MSFT: 378.40 };

@Component({
  selector: 'app-auto-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <h2>Signal-driven (OnPush) — Auto CD</h2>
      <p style="color:#6b7280;font-size:0.85rem;margin-bottom:1rem">
        Signal reads inside the template create reactive dependencies — the view re-renders
        automatically whenever a signal changes. No Zone, no manual trigger needed.
      </p>

      <table style="width:100%;border-collapse:collapse;font-size:0.9rem">
        <thead>
          <tr style="border-bottom:1px solid #e5e7eb">
            <th style="text-align:left;padding:0.35rem 0;color:#6b7280;font-weight:600">Symbol</th>
            <th style="text-align:right;padding:0.35rem 0;color:#6b7280;font-weight:600">Price</th>
            <th style="text-align:right;padding:0.35rem 0;color:#6b7280;font-weight:600">Change</th>
          </tr>
        </thead>
        <tbody>
          @for (row of rows(); track row.symbol) {
            <tr style="border-bottom:1px solid #f3f4f6">
              <td style="padding:0.4rem 0;font-weight:600">{{ row.symbol }}</td>
              <td style="text-align:right;padding:0.4rem 0;font-family:monospace">
                \${{ row.price.toFixed(2) }}
              </td>
              <td style="text-align:right;padding:0.4rem 0">
                <span [class]="'badge ' + (row.delta >= 0 ? 'badge-up' : 'badge-down')">
                  {{ row.delta >= 0 ? '+' : '' }}{{ row.delta.toFixed(2) }}%
                </span>
              </td>
            </tr>
          }
        </tbody>
      </table>

      <p style="margin-top:0.75rem;font-size:0.8rem;color:#9ca3af">
        Parent tick: <strong>{{ tick() }}</strong> &nbsp;|&nbsp;
        Price signal updates every 1.5 s independently — no Zone, no manual CD call.
      </p>
    </div>
  `,
})
export class AutoPanel {
  readonly tick = input.required<number>();

  private readonly _prices = signal<Record<string, number>>({ ...BASE_PRICES });

  readonly rows = computed(() =>
    Object.entries(this._prices()).map(([symbol, price]) => ({
      symbol,
      price,
      delta: ((price - BASE_PRICES[symbol]) / BASE_PRICES[symbol]) * 100,
    }))
  );

  constructor() {
    const destroyRef = inject(DestroyRef);

    const interval = setInterval(() => {
      this._prices.update(prev => {
        const next = { ...prev };
        for (const sym of Object.keys(next)) {
          const jitter = (Math.random() - 0.5) * 2;
          next[sym] = Math.max(1, +(next[sym] + jitter).toFixed(2));
        }
        return next;
      });
    }, 1500);

    destroyRef.onDestroy(() => clearInterval(interval));
  }
}
