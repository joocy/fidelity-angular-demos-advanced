import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order-entry',
  imports: [FormsModule, RouterLink],
  template: `
    <div style="padding: 1.5rem;">
      <h2 style="margin-bottom: 1rem;">Order Entry</h2>

      @if (submitted()) {
        <div style="background: #d1fae5; color: #065f46; border-radius: 6px; padding: 0.75rem 1rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <strong>Order submitted!</strong> Check the
          <a routerLink="../order-book" style="color: #065f46; font-weight: 600;">Order Book</a>
          to see it.
        </div>
      }

      <div class="card" style="max-width: 420px;">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #374151; margin-bottom: 0.35rem;">Symbol</label>
          <input
            type="text"
            [(ngModel)]="symbol"
            placeholder="e.g. APXEQ"
            style="width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 4px; font-size: 0.9rem;"
          />
        </div>

        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #374151; margin-bottom: 0.35rem;">Side</label>
          <div style="display: flex; gap: 0.75rem;">
            <label style="display: flex; align-items: center; gap: 0.35rem; cursor: pointer;">
              <input type="radio" [(ngModel)]="side" value="Buy" /> Buy
            </label>
            <label style="display: flex; align-items: center; gap: 0.35rem; cursor: pointer;">
              <input type="radio" [(ngModel)]="side" value="Sell" /> Sell
            </label>
          </div>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #374151; margin-bottom: 0.35rem;">Quantity</label>
          <input
            type="number"
            [(ngModel)]="quantity"
            min="1"
            placeholder="0"
            style="width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 4px; font-size: 0.9rem;"
          />
        </div>

        <button
          class="btn-primary"
          (click)="submit()"
          [disabled]="!symbol() || quantity() <= 0"
          style="width: 100%; padding: 0.6rem;"
        >
          Submit Order
        </button>
      </div>

      <div style="margin-top: 1.5rem; background: #eff6ff; border-radius: 6px; padding: 1rem; border-left: 3px solid #3b82f6; max-width: 420px;">
        <div style="font-size: 0.8rem; font-weight: 600; color: #1d4ed8; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.04em;">Routing Concept: Child Routes</div>
        <p style="color: #374151; font-size: 0.875rem; margin: 0;">
          This component is a <strong>child route</strong> of TradingLayout. The parent
          provides a persistent tab UI and a <code>&lt;router-outlet&gt;</code> — the child
          swaps without destroying the parent.
        </p>
      </div>
    </div>
  `,
})
export class OrderEntry {
  private readonly orderService = inject(OrderService);

  readonly symbol = signal('');
  readonly side = signal<'Buy' | 'Sell'>('Buy');
  readonly quantity = signal(0);
  readonly submitted = signal(false);

  submit(): void {
    if (!this.symbol() || this.quantity() <= 0) return;

    this.orderService.submit(this.symbol(), this.side(), this.quantity());

    this.symbol.set('');
    this.quantity.set(0);
    this.submitted.set(true);

    setTimeout(() => this.submitted.set(false), 3000);
  }
}
