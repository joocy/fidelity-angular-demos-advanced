import { Component, signal, computed } from '@angular/core';
import { Trade } from './export-plugin.token';
import { TradeBlotter } from './trade-blotter';
import { ExportToolbar } from './export-toolbar';

const APEX_TRADES: Trade[] = [
  { id: 'TRD-001', symbol: 'AAPL',  side: 'buy',  qty: 2500,  price: 187.42 },
  { id: 'TRD-002', symbol: 'GS',    side: 'sell', qty: 800,   price: 421.15 },
  { id: 'TRD-003', symbol: 'MSFT',  side: 'buy',  qty: 1500,  price: 374.80 },
  { id: 'TRD-004', symbol: 'AMZN',  side: 'sell', qty: 600,   price: 185.62 },
  { id: 'TRD-005', symbol: 'NVDA',  side: 'buy',  qty: 1200,  price: 875.30 },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TradeBlotter, ExportToolbar],
  template: `
    <nav>
      <strong>Apex Asset Management</strong>
      <span>Demo 02: Advanced DI – Multi-Providers &amp; Plugin Architecture</span>
    </nav>

    <div style="padding: 1.5rem; max-width: 960px; margin: 0 auto;">

      <div class="card">
        <h2>What This Demo Shows</h2>
        <ul style="margin:0; padding-left:1.25rem; line-height:1.9; font-size:0.9rem; color:#374151;">
          <li>
            <strong>Multi-providers</strong> — multiple values registered for a single
            <code>InjectionToken</code>; Angular collects them all into one array.
          </li>
          <li>
            <strong>Plugin architecture</strong> — features (CSV, Console, Audit) register
            themselves against the <code>EXPORT_PLUGINS</code> token without knowing about
            each other or modifying the host component.
          </li>
          <li>
            <strong>Open/closed principle</strong> — add a new export plugin by adding one
            line to <code>app.config.ts</code>; no other file changes required.
          </li>
        </ul>
        <p style="margin:0.75rem 0 0; font-size:0.82rem; color:#6b7280;">
          Open the browser console, then click any export button below to see the plugin output.
        </p>
      </div>

      <app-trade-blotter [trades]="trades" (selectionChange)="selectedTrades.set($event)" />

      <app-export-toolbar [trades]="exportTrades()" />

    </div>
  `,
})
export class App {
  readonly trades         = APEX_TRADES;
  readonly selectedTrades = signal<Trade[]>([]);
  readonly exportTrades   = computed(() => {
    const sel = this.selectedTrades();
    return sel.length > 0 ? sel : this.trades;
  });
}
