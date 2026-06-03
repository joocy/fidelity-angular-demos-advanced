import { Component, computed, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { stopLossValidator, takeProfitValidator } from './stop-loss.validator';

@Component({
  selector: 'app-trade-risk-form',
  imports: [ReactiveFormsModule],
  template: `
    <div class="card">
      <h2>Cross-Field Validation — Trade Risk Entry</h2>

      <p style="color:#6b7280;font-size:0.88rem;margin-bottom:1rem">
        Group-level validators enforce cross-field rules: for a <strong>buy</strong> order the
        stop-loss must be <em>below</em> the entry price and the take-profit must be <em>above</em> it.
        A live risk/reward ratio is computed from the three price fields.
      </p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" style="max-width:520px">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem">
          <div>
            <label for="symbol">Symbol</label>
            <input
              id="symbol"
              type="text"
              formControlName="symbol"
              placeholder="e.g. NVDA"
              style="width:100%"
            />
            @if (form.controls.symbol.invalid && form.controls.symbol.touched) {
              <small class="error">Symbol is required.</small>
            }
          </div>

          <div>
            <label for="side">Side</label>
            <select id="side" formControlName="side" style="width:100%">
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>

          <div>
            <label for="entryPrice">Entry Price ($)</label>
            <input
              id="entryPrice"
              type="number"
              formControlName="entryPrice"
              placeholder="0.01"
              min="0.01"
              step="0.01"
              style="width:100%"
            />
            @if (form.controls.entryPrice.invalid && form.controls.entryPrice.touched) {
              <small class="error">Entry price must be at least $0.01.</small>
            }
          </div>

          <div>
            <label for="stopLoss">Stop Loss ($)</label>
            <input
              id="stopLoss"
              type="number"
              formControlName="stopLoss"
              placeholder="0.01"
              min="0.01"
              step="0.01"
              style="width:100%"
            />
            @if (form.controls.stopLoss.invalid && form.controls.stopLoss.touched) {
              <small class="error">Stop loss must be at least $0.01.</small>
            }
          </div>

          <div style="grid-column:1/-1">
            <label for="takeProfit">Take Profit ($)</label>
            <input
              id="takeProfit"
              type="number"
              formControlName="takeProfit"
              placeholder="0.01"
              min="0.01"
              step="0.01"
              style="width:100%"
            />
            @if (form.controls.takeProfit.invalid && form.controls.takeProfit.touched) {
              <small class="error">Take profit must be at least $0.01.</small>
            }
          </div>
        </div>

        <!-- Group-level cross-field errors -->
        @if (form.errors?.['stopLossTooHigh'] && (form.controls.stopLoss.touched || form.controls.entryPrice.touched)) {
          <div style="margin-top:0.75rem;padding:0.6rem 0.8rem;background:#f8d7da;border-radius:4px;border-left:3px solid #721c24">
            <small class="error" style="margin:0">
              Stop loss must be <strong>below</strong> the entry price for a buy order.
            </small>
          </div>
        }
        @if (form.errors?.['takeProfitTooLow'] && (form.controls.takeProfit.touched || form.controls.entryPrice.touched)) {
          <div style="margin-top:0.5rem;padding:0.6rem 0.8rem;background:#f8d7da;border-radius:4px;border-left:3px solid #721c24">
            <small class="error" style="margin:0">
              Take profit must be <strong>above</strong> the entry price for a buy order.
            </small>
          </div>
        }

        <!-- Risk / Reward indicator -->
        @if (rrRatio() !== null) {
          <div style="margin-top:0.75rem;padding:0.6rem 0.8rem;background:#e8f5e9;border-radius:4px;border-left:3px solid #2e7d32;display:flex;align-items:center;gap:0.5rem">
            <span style="font-size:0.82rem;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.04em">Risk / Reward</span>
            <strong style="color:#1a1f35">1 : {{ rrRatio() }}</strong>
            <span style="font-size:0.8rem;color:#6b7280">(risk {{ '$' + riskAmount() }} → reward {{ '$' + rewardAmount() }})</span>
          </div>
        }

        <div style="margin-top:1rem;display:flex;gap:0.5rem">
          <button type="submit" class="btn-primary">Place Order</button>
          <button type="button" class="btn-secondary" (click)="resetForm()">Reset</button>
        </div>
      </form>

      @if (submittedValue()) {
        <div style="margin-top:1.25rem;padding:0.75rem 1rem;background:#f0f4ff;border-radius:6px;border-left:3px solid #1a3a6b">
          <strong style="font-size:0.82rem;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em">Order Submitted</strong>
          <pre style="margin:0.5rem 0 0;font-size:0.85rem;color:#1a1f35">{{ submittedValue() | json }}</pre>
        </div>
      }
    </div>
  `,
})
export class TradeRiskForm {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group(
    {
      symbol: this.fb.control('', Validators.required),
      side: this.fb.control<'buy' | 'sell'>('buy'),
      entryPrice: this.fb.control<number | null>(null, [Validators.required, Validators.min(0.01)]),
      stopLoss: this.fb.control<number | null>(null, [Validators.required, Validators.min(0.01)]),
      takeProfit: this.fb.control<number | null>(null, [Validators.required, Validators.min(0.01)]),
    },
    { validators: [stopLossValidator, takeProfitValidator] }
  );

  submittedValue = signal<Record<string, unknown> | null>(null);

  riskAmount = computed(() => {
    const entry = Number(this.form.controls.entryPrice.value);
    const stop = Number(this.form.controls.stopLoss.value);
    if (!entry || !stop) return null;
    return Math.abs(entry - stop).toFixed(2);
  });

  rewardAmount = computed(() => {
    const entry = Number(this.form.controls.entryPrice.value);
    const tp = Number(this.form.controls.takeProfit.value);
    if (!entry || !tp) return null;
    return Math.abs(tp - entry).toFixed(2);
  });

  rrRatio = computed(() => {
    const risk = Number(this.riskAmount());
    const reward = Number(this.rewardAmount());
    if (!risk || !reward || risk === 0) return null;
    return (reward / risk).toFixed(2);
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submittedValue.set(this.form.getRawValue() as Record<string, unknown>);
  }

  resetForm(): void {
    this.form.reset({ side: 'buy' });
    this.submittedValue.set(null);
  }
}
