import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrdersPanel } from './orders-panel';
import { SummaryPanel } from './summary-panel';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OrdersPanel, SummaryPanel],
  template: `
    <nav>
      <strong>Apex Asset Management</strong>
      <span>Advanced Angular · Demo 09: NgRx Signal Store</span>
    </nav>

    <main style="max-width:1100px;margin:1.5rem auto;padding:0 1rem">

      <div style="margin-bottom:1.5rem">
        <h1 style="font-size:1.4rem;font-weight:700;margin-bottom:0.25rem">
          Demo 09 — NgRx Signal Store
        </h1>
        <p style="color:#6b7280;font-size:0.9rem;margin:0">
          A single <code>BlotterStore</code> (providedIn: 'root') is injected into two independent
          components. State changes in either panel are immediately visible in the other — no inputs,
          outputs, or services required. The store uses <code>withState</code>,
          <code>withComputed</code>, <code>withMethods</code>, and a composable
          <code>withAuditLog()</code> feature.
        </p>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;align-items:start">
        <app-orders-panel />
        <app-summary-panel />
      </div>

    </main>
  `,
})
export class App {}
