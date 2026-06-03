import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order-book',
  imports: [RouterLink],
  template: `
    <div style="padding: 1.5rem;">
      <h2 style="margin-bottom: 1rem;">Order Book</h2>

      @if (orders().length === 0) {
        <div class="card" style="text-align: center; color: #9ca3af; padding: 2.5rem;">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">📋</div>
          <div>No orders yet.</div>
          <a routerLink="../order-entry" style="display: inline-block; margin-top: 0.75rem; color: #1a3a6b; font-weight: 600;">
            Go to Order Entry
          </a>
        </div>
      } @else {
        <div class="card" style="padding: 0; overflow: hidden;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
            <thead>
              <tr style="background: #f8fafc; border-bottom: 1px solid #e5e7eb;">
                <th style="text-align: left; padding: 0.75rem 1rem; color: #6b7280; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em;">#</th>
                <th style="text-align: left; padding: 0.75rem 1rem; color: #6b7280; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em;">Symbol</th>
                <th style="text-align: left; padding: 0.75rem 1rem; color: #6b7280; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em;">Side</th>
                <th style="text-align: right; padding: 0.75rem 1rem; color: #6b7280; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em;">Qty</th>
                <th style="text-align: right; padding: 0.75rem 1rem; color: #6b7280; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em;">Time</th>
              </tr>
            </thead>
            <tbody>
              @for (order of orders(); track order.id) {
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 0.75rem 1rem; color: #9ca3af;">{{ order.id }}</td>
                  <td style="padding: 0.75rem 1rem; font-weight: 600; font-family: monospace;">{{ order.symbol }}</td>
                  <td style="padding: 0.75rem 1rem;">
                    <span
                      class="badge"
                      [style.background]="order.side === 'Buy' ? '#d1fae5' : '#fee2e2'"
                      [style.color]="order.side === 'Buy' ? '#065f46' : '#991b1b'"
                    >
                      {{ order.side }}
                    </span>
                  </td>
                  <td style="padding: 0.75rem 1rem; text-align: right; font-variant-numeric: tabular-nums;">{{ order.quantity.toLocaleString() }}</td>
                  <td style="padding: 0.75rem 1rem; text-align: right; color: #6b7280; font-size: 0.8rem;">
                    {{ order.timestamp.toLocaleTimeString() }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <div style="margin-top: 0.5rem; color: #9ca3af; font-size: 0.8rem;">
          {{ orders().length }} order{{ orders().length === 1 ? '' : 's' }} total
        </div>
      }
    </div>
  `,
})
export class OrderBook {
  private readonly orderService = inject(OrderService);
  readonly orders = this.orderService.orders;
}
