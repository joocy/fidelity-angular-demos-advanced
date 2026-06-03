import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { PortfolioService } from './portfolio.service';

@Component({
  selector: 'app-portfolio-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DecimalPipe],
  template: `
    <div class="card">
      <h2>Portfolio Summary</h2>

      <div style="display:flex;align-items:baseline;gap:0.5rem;margin-bottom:1.25rem">
        <span style="font-size:2rem;font-weight:700;color:#1a3a6b">
          {{ totalValue() | currency:'GBP':'symbol':'1.0-0' }}
        </span>
        <span style="font-size:0.85rem;color:#6b7280">total value</span>
      </div>

      <div style="display:flex;flex-direction:column;gap:0.5rem">
        @for (pos of positions(); track pos.fundId) {
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <span style="font-weight:600;font-size:0.9rem">{{ svc.fundName(pos.fundId) }}</span>
              <span style="margin-left:0.5rem;color:#6b7280;font-size:0.8rem">{{ pos.units | number }} units</span>
            </div>
            <div style="display:flex;align-items:center;gap:0.75rem">
              <span style="font-family:monospace;font-size:0.95rem">
                {{ pos.value | currency:'GBP':'symbol':'1.0-0' }}
              </span>
              <div style="width:80px;height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden">
                <div
                  style="height:100%;background:#1a3a6b;border-radius:3px"
                  [style.width.%]="(pos.value / totalValue()) * 100">
                </div>
              </div>
              <span style="font-size:0.8rem;color:#6b7280;width:3rem;text-align:right">
                {{ (pos.value / totalValue()) * 100 | number:'1.0-0' }}%
              </span>
            </div>
          </div>
        }
      </div>

      <p style="margin-top:1rem;font-size:0.78rem;color:#9ca3af">
        Positions: {{ positions().length }} &nbsp;|&nbsp;
        Architecture note: <code style="background:#f3f4f6;padding:0.1rem 0.3rem;border-radius:3px">PortfolioService</code>
        is the single source of truth for this feature domain.
      </p>
    </div>
  `,
})
export class PortfolioSummary {
  readonly svc = inject(PortfolioService);
  readonly positions = this.svc.positions;
  readonly totalValue = this.svc.totalValue;
}
