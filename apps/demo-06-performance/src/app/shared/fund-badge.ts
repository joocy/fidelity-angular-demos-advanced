import { Component } from '@angular/core';

@Component({
  selector: 'app-fund-badge',
  template: `
    <span class="fund-pill">
      <span class="fund-name">Apex UK Equity Fund</span>
      <span class="fund-return badge badge-up">+8.4% YTD</span>
    </span>
  `,
  styles: [`
    .fund-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #1a3a6b;
      color: white;
      border-radius: 20px;
      padding: 0.35rem 0.9rem;
      font-size: 0.875rem;
      font-weight: 600;
    }
    .fund-name {
      letter-spacing: 0.01em;
    }
    .fund-return {
      font-size: 0.78rem;
      padding: 0.1rem 0.45rem;
    }
  `],
})
export class FundBadge {}
