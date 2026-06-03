import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FundService } from './fund.service';
import { FundCard } from './fund-card';
import { Fund } from './fund.model';

@Component({
  selector: 'app-fund-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FundCard],
  template: `
    @if (loading()) {
      <div style="text-align:center;padding:3rem;color:#6b7280">
        <div data-testid="loading-indicator" style="font-size:1.1rem">Loading funds…</div>
      </div>
    } @else {
      <div data-testid="fund-list">
        @for (fund of funds(); track fund.id) {
          <app-fund-card [fund]="fund" (selected)="onFundSelected($event)" />
        }
        @if (funds().length === 0) {
          <p style="color:#6b7280;text-align:center;padding:2rem">No funds found.</p>
        }
      </div>
    }

    @if (selectedFund()) {
      <div class="card" style="margin-top:1rem;border-left:4px solid #1a3a6b">
        <h2>Selected Fund</h2>
        <p style="margin:0"><strong data-testid="selected-fund-name">{{ selectedFund()!.name }}</strong></p>
        <p style="margin:0.25rem 0 0;color:#6b7280;font-size:0.875rem">
          YTD: {{ selectedFund()!.ytd.toFixed(2) }}% &nbsp;|&nbsp; Risk: {{ selectedFund()!.riskRating }}
        </p>
      </div>
    }
  `,
})
export class FundList implements OnInit {
  private readonly fundService = inject(FundService);

  readonly funds = signal<Fund[]>([]);
  readonly loading = signal(true);
  readonly selectedFund = signal<Fund | null>(null);

  ngOnInit(): void {
    this.fundService.getFunds().subscribe({
      next: (funds) => {
        this.funds.set(funds);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  onFundSelected(fund: Fund): void {
    this.selectedFund.set(fund);
  }
}
