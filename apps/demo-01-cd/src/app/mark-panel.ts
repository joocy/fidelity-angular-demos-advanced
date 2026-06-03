import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input } from '@angular/core';

interface Alert {
  id: number;
  symbol: string;
  message: string;
  severity: 'up' | 'down';
  time: string;
}

const SYMBOLS = ['AAPL', 'GS', 'MSFT'];
const MESSAGES_UP   = ['Above 50-day MA', 'New intraday high', 'Volume surge detected'];
const MESSAGES_DOWN = ['Below support level', 'RSI oversold', 'Trailing stop triggered'];

@Component({
  selector: 'app-mark-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <h2>OnPush + markForCheck — Non-signal Reactivity</h2>
      <p style="color:#6b7280;font-size:0.85rem;margin-bottom:1rem">
        <code>count</code> is a <strong>plain property</strong> (no signal). After mutating it,
        <code>cdr.markForCheck()</code> schedules a re-render on the next CD cycle.
        Use this pattern when integrating third-party libraries that emit non-signal data.
      </p>

      <div style="display:flex;gap:2rem;margin-bottom:1rem;flex-wrap:wrap">
        <div>
          <div style="font-size:2rem;font-weight:700;color:#1a3a6b">{{ count }}</div>
          <div style="font-size:0.8rem;color:#6b7280;margin-top:0.1rem">Alerts generated</div>
        </div>
        <div>
          <div style="font-size:2rem;font-weight:700;color:#1a3a6b">{{ tick() }}</div>
          <div style="font-size:0.8rem;color:#6b7280;margin-top:0.1rem">Parent tick</div>
        </div>
      </div>

      <div style="max-height:180px;overflow-y:auto">
        @for (alert of alerts; track alert.id) {
          <div style="display:flex;align-items:center;gap:0.6rem;padding:0.3rem 0;border-bottom:1px solid #f3f4f6;font-size:0.85rem">
            <span [class]="'badge badge-' + alert.severity">{{ alert.symbol }}</span>
            <span style="flex:1">{{ alert.message }}</span>
            <span style="color:#9ca3af;font-size:0.78rem">{{ alert.time }}</span>
          </div>
        } @empty {
          <p style="color:#9ca3af;font-size:0.85rem">Waiting for first alert…</p>
        }
      </div>

      <p style="margin-top:0.75rem;font-size:0.8rem;color:#9ca3af">
        New alert every 2 s via plain mutation + <code>markForCheck()</code> — no signal involved.
      </p>
    </div>
  `,
})
export class MarkPanel {
  readonly tick = input.required<number>();

  count = 0;
  alerts: Alert[] = [];

  private readonly cdr = inject(ChangeDetectorRef);

  constructor() {
    const destroyRef = inject(DestroyRef);

    const interval = setInterval(() => {
      const symbol   = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      const isUp     = Math.random() > 0.45;
      const messages = isUp ? MESSAGES_UP : MESSAGES_DOWN;
      const message  = messages[Math.floor(Math.random() * messages.length)];

      this.count++;
      this.alerts.unshift({
        id:       this.count,
        symbol,
        message,
        severity: isUp ? 'up' : 'down',
        time:     new Date().toLocaleTimeString(),
      });
      if (this.alerts.length > 8) this.alerts.pop();

      // Plain mutation — Angular's OnPush would normally skip this view.
      // markForCheck() tells Angular to include it in the next scheduled CD pass.
      this.cdr.markForCheck();
    }, 2000);

    destroyRef.onDestroy(() => clearInterval(interval));
  }
}
