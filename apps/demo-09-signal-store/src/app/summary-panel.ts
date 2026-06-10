import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BlotterStore } from './trade-blotter.store';

@Component({
  selector: 'app-summary-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <h2>Blotter Summary</h2>
      <p style="color:#6b7280;font-size:0.85rem;margin-bottom:1rem">
        Computed signals derived from the same <code>BlotterStore</code>. Every value updates
        automatically when orders change in the left panel.
      </p>

      <!-- Stats grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:1.25rem">
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:0.75rem 1rem">
          <div style="font-size:0.75rem;color:#6b7280;font-weight:600;text-transform:uppercase;margin-bottom:0.25rem">
            Buy Orders
          </div>
          <div style="font-size:1.4rem;font-weight:700;color:#16a34a;font-family:monospace">
            {{ store.buyCount() }}
          </div>
          <div style="font-size:0.8rem;color:#6b7280;font-family:monospace">
            $ {{ store.totalBuys().toFixed(2) }}
          </div>
        </div>

        <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:6px;padding:0.75rem 1rem">
          <div style="font-size:0.75rem;color:#6b7280;font-weight:600;text-transform:uppercase;margin-bottom:0.25rem">
            Sell Orders
          </div>
          <div style="font-size:1.4rem;font-weight:700;color:#dc2626;font-family:monospace">
            {{ store.sellCount() }}
          </div>
          <div style="font-size:0.8rem;color:#6b7280;font-family:monospace">
            $ {{ store.totalSells().toFixed(2) }}
          </div>
        </div>

        <div style="grid-column:span 2;background:#f8fafc;border:1px solid #e2e8f0;
                    border-radius:6px;padding:0.75rem 1rem">
          <div style="font-size:0.75rem;color:#6b7280;font-weight:600;text-transform:uppercase;margin-bottom:0.25rem">
            Net Exposure
          </div>
          <div style="font-size:1.4rem;font-weight:700;font-family:monospace"
               [style.color]="store.netExposure() >= 0 ? '#16a34a' : '#dc2626'">
            {{ store.netExposure() >= 0 ? '+' : '' }} $ {{ store.netExposure().toFixed(2) }}
          </div>
          <div style="font-size:0.8rem;color:#6b7280">
            Total buys minus total sells
          </div>
        </div>
      </div>

      <!-- Cancel all -->
      @if (store.orders().length > 0) {
        <button class="btn-danger" (click)="store.cancelAll()" style="margin-bottom:1.25rem">
          Cancel All ({{ store.orders().length }})
        </button>
      }

      <!-- Audit log — from withAuditLog() feature -->
      <div>
        <div style="font-size:0.82rem;color:#6b7280;font-weight:600;text-transform:uppercase;
                    letter-spacing:0.04em;margin-bottom:0.5rem">
          Audit Log
          <span style="font-weight:400;font-size:0.78rem"> — via <code>withAuditLog()</code> feature</span>
        </div>

        @if (store.log().length === 0) {
          <div style="color:#9ca3af;font-size:0.875rem">No actions yet.</div>
        } @else {
          <ul style="list-style:none;margin:0;padding:0;font-size:0.85rem;font-family:monospace">
            @for (entry of store.log(); track $index) {
              <li style="padding:0.3rem 0.5rem;border-radius:4px;margin-bottom:0.25rem"
                  [style.background]="$index === 0 ? '#eff6ff' : '#f8fafc'"
                  [style.color]="$index === 0 ? '#1d4ed8' : '#6b7280'">
                {{ entry }}
              </li>
            }
          </ul>
        }
      </div>
    </div>
  `,
})
export class SummaryPanel {
  readonly store = inject(BlotterStore);
}
