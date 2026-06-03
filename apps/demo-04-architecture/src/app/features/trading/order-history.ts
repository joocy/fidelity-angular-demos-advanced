import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import { TradingService } from './trading.service';

@Component({
  selector: 'app-order-history',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, DecimalPipe, UpperCasePipe],
  template: `
    <div class="card">
      <h2>Order History</h2>

      @if (orders().length === 0) {
        <p style="color:#6b7280;font-style:italic;text-align:center;padding:1rem 0">
          No orders placed yet. Use the order form above.
        </p>
      } @else {
        <table style="width:100%;border-collapse:collapse;font-size:0.83rem">
          <thead>
            <tr style="border-bottom:2px solid #e5e7eb">
              <th style="text-align:left;padding:0.35rem 0.4rem 0.35rem 0;color:#6b7280;font-weight:600">Order ID</th>
              <th style="text-align:left;padding:0.35rem 0.4rem;color:#6b7280;font-weight:600">Symbol</th>
              <th style="text-align:center;padding:0.35rem 0.4rem;color:#6b7280;font-weight:600">Side</th>
              <th style="text-align:right;padding:0.35rem 0.4rem;color:#6b7280;font-weight:600">Qty</th>
              <th style="text-align:right;padding:0.35rem 0.4rem;color:#6b7280;font-weight:600">Price</th>
              <th style="text-align:right;padding:0.35rem 0 0.35rem 0.4rem;color:#6b7280;font-weight:600">Time</th>
            </tr>
          </thead>
          <tbody>
            @for (order of orders(); track order.id) {
              <tr style="border-bottom:1px solid #f3f4f6">
                <td style="padding:0.4rem 0.4rem 0.4rem 0;color:#6b7280;font-family:monospace;font-size:0.78rem">
                  {{ order.id }}
                </td>
                <td style="padding:0.4rem;font-weight:700">{{ order.symbol }}</td>
                <td style="padding:0.4rem;text-align:center">
                  <span
                    style="display:inline-block;padding:0.15rem 0.5rem;border-radius:4px;font-size:0.75rem;font-weight:700;letter-spacing:0.04em"
                    [style.background]="order.side === 'buy' ? '#d1fae5' : '#fee2e2'"
                    [style.color]="order.side === 'buy' ? '#065f46' : '#991b1b'">
                    {{ order.side | uppercase }}
                  </span>
                </td>
                <td style="padding:0.4rem;text-align:right;font-family:monospace">{{ order.qty | number }}</td>
                <td style="padding:0.4rem;text-align:right;font-family:monospace">\${{ order.price | number:'1.2-2' }}</td>
                <td style="padding:0.4rem 0 0.4rem 0.4rem;text-align:right;color:#6b7280;font-size:0.78rem">
                  {{ order.timestamp | date:'HH:mm:ss' }}
                </td>
              </tr>
            }
          </tbody>
        </table>
      }
    </div>
  `,
})
export class OrderHistory {
  private readonly tradingSvc = inject(TradingService);
  readonly orders = this.tradingSvc.orders;
}
