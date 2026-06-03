import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Fund } from './fund.model';

@Component({
  selector: 'app-fund-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card" style="display:flex;align-items:center;justify-content:space-between;gap:1rem">
      <div style="flex:1">
        <div style="font-weight:600;font-size:1rem;margin-bottom:0.35rem" data-testid="fund-name">
          {{ fund().name }}
        </div>
        <div style="display:flex;align-items:center;gap:0.75rem">
          <span
            class="badge"
            [class.badge-up]="fund().ytd >= 0"
            [class.badge-down]="fund().ytd < 0"
            data-testid="fund-return"
          >
            {{ fund().ytd >= 0 ? '+' : '' }}{{ fund().ytd.toFixed(2) }}%
          </span>
          <span
            class="badge"
            [style.background]="riskBackground()"
            [style.color]="riskColor()"
            data-testid="risk-rating"
          >
            {{ fund().riskRating }}
          </span>
        </div>
      </div>
      <button class="btn-primary" data-testid="view-btn" (click)="selected.emit(fund())">
        View
      </button>
    </div>
  `,
})
export class FundCard {
  fund = input.required<Fund>();
  selected = output<Fund>();

  riskBackground(): string {
    const map: Record<string, string> = { Low: '#e0f2fe', Medium: '#fef9c3', High: '#fee2e2' };
    return map[this.fund().riskRating] ?? '#e2e8f0';
  }

  riskColor(): string {
    const map: Record<string, string> = { Low: '#075985', Medium: '#854d0e', High: '#991b1b' };
    return map[this.fund().riskRating] ?? '#1a1f35';
  }
}
