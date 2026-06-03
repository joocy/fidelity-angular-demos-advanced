import { Injectable, computed, signal } from '@angular/core';
import { FUNDS } from '../../shared/models/fund.model';
import { Position } from '../../shared/models/portfolio.model';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly _positions = signal<Position[]>([
    { fundId: 'uk-equity',        units: 500,  value: 500  * 142.50 },
    { fundId: 'gov-bond',         units: 1200, value: 1200 *  98.20 },
    { fundId: 'emerging-markets', units: 300,  value: 300  * 213.80 },
  ]);

  readonly positions = this._positions.asReadonly();

  readonly totalValue = computed(() =>
    this._positions().reduce((sum, p) => sum + p.value, 0)
  );

  fundName(fundId: string): string {
    return FUNDS.find(f => f.id === fundId)?.name ?? fundId;
  }

  addUnits(fundId: string, units: number): void {
    const fund = FUNDS.find(f => f.id === fundId);
    if (!fund) return;
    this._positions.update(prev => {
      const existing = prev.find(p => p.fundId === fundId);
      if (existing) {
        return prev.map(p =>
          p.fundId === fundId
            ? { ...p, units: p.units + units, value: (p.units + units) * fund.nav }
            : p
        );
      }
      return [...prev, { fundId, units, value: units * fund.nav }];
    });
  }

  removePosition(fundId: string): void {
    this._positions.update(prev => prev.filter(p => p.fundId !== fundId));
  }
}
