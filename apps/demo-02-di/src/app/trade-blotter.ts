import { Component, input, output, signal, computed } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Trade } from './export-plugin.token';

@Component({
  selector: 'app-trade-blotter',
  standalone: true,
  template: `
    <div class="card">
      <h2>Trade Blotter</h2>
      <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.75rem;">
        <button class="btn-secondary" (click)="toggleSelectAll()">
          {{ selectedAll() ? 'Deselect All' : 'Select All' }}
        </button>
        <span style="font-size:0.85rem; color:#6b7280;">
          {{ selectedCount() }} of {{ trades().length }} trades selected for export
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Symbol</th>
            <th>Side</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Notional</th>
          </tr>
        </thead>
        <tbody>
          @for (trade of trades(); track trade.id) {
            <tr [style.background]="isSelected(trade.id) ? '#eef3fb' : ''">
              <td>
                <input type="checkbox"
                       [checked]="isSelected(trade.id)"
                       (change)="toggleTrade(trade.id)" />
              </td>
              <td style="font-family:monospace; font-size:0.8rem; color:#6b7280;">{{ trade.id }}</td>
              <td><strong>{{ trade.symbol }}</strong></td>
              <td>
                <span [style.color]="trade.side === 'buy' ? '#16a34a' : '#dc2626'"
                      style="font-weight:600; text-transform:uppercase; font-size:0.8rem;">
                  {{ trade.side }}
                </span>
              </td>
              <td>{{ trade.qty | number }}</td>
              <td>{{ trade.price | currency }}</td>
              <td>{{ trade.qty * trade.price | currency }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  imports: [CurrencyPipe, DecimalPipe],
})
export class TradeBlotter {
  readonly trades        = input.required<Trade[]>();
  readonly selectionChange = output<Trade[]>();

  private readonly _selectedIds = signal<Set<string>>(new Set());

  readonly selectedAll = computed(() => {
    const ids = this._selectedIds();
    return this.trades().length > 0 && this.trades().every(t => ids.has(t.id));
  });

  readonly selectedCount = computed(() => this._selectedIds().size);

  readonly selectedTrades = computed(() =>
    this.trades().filter(t => this._selectedIds().has(t.id))
  );

  isSelected(id: string): boolean {
    return this._selectedIds().has(id);
  }

  toggleTrade(id: string): void {
    const next = new Set(this._selectedIds());
    next.has(id) ? next.delete(id) : next.add(id);
    this._selectedIds.set(next);
    this.selectionChange.emit(this.selectedTrades());
  }

  toggleSelectAll(): void {
    this._selectedIds.set(
      this.selectedAll() ? new Set() : new Set(this.trades().map(t => t.id))
    );
    this.selectionChange.emit(this.selectedTrades());
  }
}
