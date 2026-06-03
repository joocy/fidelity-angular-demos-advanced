import { Injectable, DestroyRef, inject, signal } from '@angular/core';

const BASE_PRICES: Record<string, number> = {
  AAPL:  182.50,
  GS:    455.00,
  MSFT:  414.00,
};

@Injectable({ providedIn: 'root' })
export class MarketDataService {
  private readonly destroyRef = inject(DestroyRef);

  readonly prices = signal<Record<string, number>>({ ...BASE_PRICES });

  private intervalId: ReturnType<typeof setInterval> | null = null;

  readonly basePrices: Readonly<Record<string, number>> = BASE_PRICES;

  startLiveFeed(): void {
    if (this.intervalId !== null) return;

    this.intervalId = setInterval(() => {
      this.prices.update(prev => {
        const next = { ...prev };
        for (const sym of Object.keys(next)) {
          const jitter = (Math.random() - 0.5) * 4;
          next[sym] = Math.max(1, +(next[sym] + jitter).toFixed(2));
        }
        return next;
      });
    }, 1500);

    this.destroyRef.onDestroy(() => this.stopLiveFeed());
  }

  stopLiveFeed(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  symbols(): string[] {
    return Object.keys(this.prices());
  }

  changePercent(symbol: string): number {
    const current = this.prices()[symbol] ?? 0;
    const base = BASE_PRICES[symbol] ?? current;
    return base === 0 ? 0 : ((current - base) / base) * 100;
  }
}
