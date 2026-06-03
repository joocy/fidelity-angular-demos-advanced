import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { PortfolioService } from './portfolio.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-positions-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DecimalPipe],
  template: `
    <div class="card">
      <h2>Positions</h2>

      @if (positions().length === 0) {
        <p style="color:#6b7280;font-style:italic;text-align:center;padding:1rem 0">
          No positions held. Place a trade or add units to get started.
        </p>
      } @else {
        <table style="width:100%;border-collapse:collapse;font-size:0.875rem">
          <thead>
            <tr style="border-bottom:2px solid #e5e7eb">
              <th style="text-align:left;padding:0.4rem 0.5rem 0.4rem 0;color:#6b7280;font-weight:600">Fund</th>
              <th style="text-align:right;padding:0.4rem 0.5rem;color:#6b7280;font-weight:600">Units</th>
              <th style="text-align:right;padding:0.4rem 0.5rem;color:#6b7280;font-weight:600">Value (GBP)</th>
              <th style="text-align:right;padding:0.4rem 0 0.4rem 0.5rem;color:#6b7280;font-weight:600">Action</th>
            </tr>
          </thead>
          <tbody>
            @for (pos of positions(); track pos.fundId) {
              <tr style="border-bottom:1px solid #f3f4f6">
                <td style="padding:0.5rem 0.5rem 0.5rem 0;font-weight:600">
                  {{ portfolioSvc.fundName(pos.fundId) }}
                </td>
                <td style="text-align:right;padding:0.5rem;font-family:monospace">
                  {{ pos.units | number }}
                </td>
                <td style="text-align:right;padding:0.5rem;font-family:monospace">
                  {{ pos.value | currency:'GBP':'symbol':'1.2-2' }}
                </td>
                <td style="text-align:right;padding:0.5rem 0 0.5rem 0.5rem">
                  <button
                    class="btn-secondary"
                    style="font-size:0.78rem;padding:0.2rem 0.6rem;color:#dc2626"
                    (click)="remove(pos.fundId)">
                    Remove
                  </button>
                </td>
              </tr>
            }
          </tbody>
          <tfoot>
            <tr style="border-top:2px solid #e5e7eb">
              <td colspan="2" style="padding:0.5rem 0.5rem 0 0;font-weight:700;color:#1a1f35">Total</td>
              <td style="text-align:right;padding:0.5rem 0.5rem 0;font-family:monospace;font-weight:700;color:#1a3a6b">
                {{ totalValue() | currency:'GBP':'symbol':'1.2-2' }}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      }
    </div>
  `,
})
export class PositionsTable {
  readonly portfolioSvc = inject(PortfolioService);
  private readonly notificationSvc = inject(NotificationService);

  readonly positions = this.portfolioSvc.positions;
  readonly totalValue = this.portfolioSvc.totalValue;

  remove(fundId: string): void {
    const name = this.portfolioSvc.fundName(fundId);
    this.portfolioSvc.removePosition(fundId);
    this.notificationSvc.notify(`Position removed: ${name}`);
  }
}
