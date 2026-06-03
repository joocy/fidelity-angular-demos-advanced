import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { NotificationService } from './shared/services/notification.service';
import { PriceTicker } from './features/market-data/price-ticker';
import { MarketOverview } from './features/market-data/market-overview';
import { PortfolioSummary } from './features/portfolio/portfolio-summary';
import { PositionsTable } from './features/portfolio/positions-table';
import { OrderForm } from './features/trading/order-form';
import { OrderHistory } from './features/trading/order-history';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PriceTicker,
    MarketOverview,
    PortfolioSummary,
    PositionsTable,
    OrderForm,
    OrderHistory,
  ],
  template: `
    <!-- ── Nav ─────────────────────────────────────────────── -->
    <nav>
      <strong>Apex Asset Management</strong>
      <span>Module 4: Architecting for Scale</span>
      <span style="margin-left:auto;font-size:0.78rem;background:#0f2547;padding:0.25rem 0.7rem;border-radius:4px">
        Feature-based DDD architecture
      </span>
    </nav>

    <!-- ── Notification toast strip ──────────────────────── -->
    @if (notifications().length > 0) {
      <div style="background:#fffbeb;border-bottom:1px solid #fde68a;padding:0.5rem 1.5rem;display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center">
        <span style="font-size:0.78rem;font-weight:600;color:#92400e;margin-right:0.25rem">Notifications:</span>
        @for (msg of notifications(); track $index; let i = $index) {
          <span style="
            background:white;
            border:1px solid #fde68a;
            border-radius:4px;
            padding:0.2rem 0.6rem;
            font-size:0.8rem;
            color:#1a1f35;
            display:inline-flex;
            align-items:center;
            gap:0.4rem
          ">
            {{ msg }}
            <button
              style="background:none;border:none;padding:0;cursor:pointer;color:#9ca3af;font-size:0.9rem;line-height:1"
              (click)="dismiss(i)">
              ✕
            </button>
          </span>
        }
      </div>
    }

    <!-- ── Live price ticker ──────────────────────────────── -->
    <app-price-ticker />

    <!-- ── Architecture explainer banner ─────────────────── -->
    <div style="background:#1a3a6b;color:white;padding:0.6rem 1.5rem;display:flex;gap:2rem;flex-wrap:wrap;align-items:center">
      <span style="font-size:0.8rem;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#a8bccf">
        Feature domains:
      </span>
      @for (domain of domains; track domain.name) {
        <div style="display:flex;align-items:center;gap:0.4rem">
          <span style="
            width:8px;height:8px;border-radius:50%;
            background:{{ domain.color }}
          "></span>
          <code style="font-size:0.78rem;color:#e2e8f0">{{ domain.path }}</code>
          <span style="font-size:0.78rem;color:#a8bccf">{{ domain.label }}</span>
        </div>
      }
    </div>

    <!-- ── Main dashboard grid ────────────────────────────── -->
    <div style="padding:1.25rem 1.5rem">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:1.25rem;align-items:start">

        <!-- Portfolio column -->
        <div>
          <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem">
            <span style="width:10px;height:10px;border-radius:50%;background:#1a3a6b;display:inline-block"></span>
            <span style="font-size:0.75rem;font-weight:700;color:#1a3a6b;text-transform:uppercase;letter-spacing:0.06em">
              features/portfolio
            </span>
          </div>
          <app-portfolio-summary />
          <app-positions-table />
        </div>

        <!-- Market data column -->
        <div>
          <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem">
            <span style="width:10px;height:10px;border-radius:50%;background:#0891b2;display:inline-block"></span>
            <span style="font-size:0.75rem;font-weight:700;color:#0891b2;text-transform:uppercase;letter-spacing:0.06em">
              features/market-data
            </span>
          </div>
          <app-market-overview />
        </div>

        <!-- Trading column -->
        <div>
          <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem">
            <span style="width:10px;height:10px;border-radius:50%;background:#7c3aed;display:inline-block"></span>
            <span style="font-size:0.75rem;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:0.06em">
              features/trading
            </span>
          </div>
          <app-order-form />
          <app-order-history />
        </div>

      </div>

      <!-- ── Architecture reference panel ─────────────────── -->
      <div class="card" style="margin-top:0.5rem;background:#0f172a;color:#e2e8f0">
        <h2 style="color:#64748b">Folder Structure Reference</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem">

          <div>
            <p style="font-size:0.8rem;color:#94a3b8;margin:0 0 0.5rem">
              The folder structure enforces domain boundaries.
              Each feature owns its service (state), components (view), and barrel export (API surface).
              Cross-feature communication goes through shared services only.
            </p>
            <div style="font-family:monospace;font-size:0.78rem;line-height:1.9;color:#7dd3fc">
              <div style="color:#94a3b8">src/app/</div>
              <div>&nbsp;&nbsp;<span style="color:#fbbf24">shared/</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;models/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#64748b">← domain types</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;services/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#64748b">← cross-feature state</span></div>
              <div>&nbsp;&nbsp;<span style="color:#34d399">features/</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;portfolio/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#64748b">← owns Position state</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;market-data/ &nbsp;&nbsp;&nbsp;<span style="color:#64748b">← owns price signals</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;trading/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#64748b">← owns Order state</span></div>
              <div>&nbsp;&nbsp;<span style="color:#f472b6">app.ts</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#64748b">← composes features</span></div>
            </div>
          </div>

          <div>
            <p style="font-size:0.8rem;color:#94a3b8;margin:0 0 0.5rem">Key rules demonstrated:</p>
            <ul style="font-size:0.8rem;color:#cbd5e1;line-height:1.9;margin:0;padding-left:1.2rem">
              <li><strong style="color:#7dd3fc">Single source of truth</strong> — each service owns one slice of state</li>
              <li><strong style="color:#7dd3fc">Signal-based state</strong> — no Subjects, no BehaviorSubjects</li>
              <li><strong style="color:#7dd3fc">Barrel exports</strong> — consumers import from <code style="color:#f472b6">features/portfolio</code>, not deep paths</li>
              <li><strong style="color:#7dd3fc">Shared services only</strong> — cross-domain comms via <code style="color:#f472b6">NotificationService</code></li>
              <li><strong style="color:#7dd3fc">Zoneless</strong> — <code style="color:#f472b6">provideZonelessChangeDetection()</code> + OnPush everywhere</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  `,
})
export class App {
  private readonly notificationSvc = inject(NotificationService);
  readonly notifications = this.notificationSvc.messages;

  readonly domains = [
    { name: 'portfolio',    path: 'features/portfolio',    label: 'Portfolio',    color: '#1a3a6b' },
    { name: 'market-data',  path: 'features/market-data',  label: 'Market Data',  color: '#0891b2' },
    { name: 'trading',      path: 'features/trading',      label: 'Trading',      color: '#7c3aed' },
    { name: 'shared',       path: 'shared/',               label: 'Shared',       color: '#d97706' },
  ];

  dismiss(index: number): void {
    this.notificationSvc.dismiss(index);
  }
}
