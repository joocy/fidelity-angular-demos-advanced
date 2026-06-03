import { ChangeDetectionStrategy, Component, computed, effect, signal, DestroyRef, inject } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-signals-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UpperCasePipe],
  template: `
    <div class="card">
      <h2>Signals, Computed &amp; Effects</h2>
      <p style="color:#6b7280;font-size:0.85rem;margin-bottom:1.25rem">
        A writable signal is the source of truth. Computed signals derive new values reactively.
        Effects run side-effects whenever their signal dependencies change — and can register
        a cleanup function that runs before the next execution or on destroy.
      </p>

      <!-- Position inputs -->
      <div style="display:flex;gap:1.5rem;align-items:flex-end;margin-bottom:1.25rem;flex-wrap:wrap">
        <div>
          <label>AAPL Price ($)</label>
          <div style="display:flex;gap:0.4rem;align-items:center">
            <button class="btn-secondary" (click)="decrementPrice()">−</button>
            <span style="font-family:monospace;font-size:1.1rem;min-width:5rem;text-align:center">
              {{ price().toFixed(2) }}
            </span>
            <button class="btn-secondary" (click)="incrementPrice()">+</button>
          </div>
        </div>

        <div>
          <label>Quantity</label>
          <div style="display:flex;gap:0.4rem;align-items:center">
            <button class="btn-secondary" (click)="decrementQty()">−</button>
            <span style="font-family:monospace;font-size:1.1rem;min-width:4rem;text-align:center">
              {{ quantity() }}
            </span>
            <button class="btn-secondary" (click)="incrementQty()">+</button>
          </div>
        </div>
      </div>

      <!-- Computed values -->
      <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:1.25rem">
        <div style="background:#f8fafc;border-radius:6px;padding:0.75rem 1.25rem;flex:1;min-width:140px">
          <div style="font-size:0.78rem;color:#6b7280;font-weight:600;text-transform:uppercase;margin-bottom:0.25rem">
            Position Value
          </div>
          <div style="font-size:1.4rem;font-weight:700;font-family:monospace">
            \${{ total().toFixed(2) }}
          </div>
          <div style="font-size:0.8rem;color:#9ca3af;margin-top:0.15rem">
            computed(() =&gt; price() × quantity())
          </div>
        </div>

        <div style="background:#f8fafc;border-radius:6px;padding:0.75rem 1.25rem;flex:1;min-width:140px">
          <div style="font-size:0.78rem;color:#6b7280;font-weight:600;text-transform:uppercase;margin-bottom:0.25rem">
            Risk Level
          </div>
          <div style="font-size:1.4rem;font-weight:700"
               [style.color]="riskLevel() === 'high' ? '#dc2626' : riskLevel() === 'medium' ? '#d97706' : '#16a34a'">
            {{ riskLevel() | uppercase }}
          </div>
          <div style="font-size:0.8rem;color:#9ca3af;margin-top:0.15rem">
            computed() from total()
          </div>
        </div>
      </div>

      <!-- Effect / cleanup note -->
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:0.75rem 1rem;font-size:0.85rem">
        <strong style="color:#1d4ed8">Effect with cleanup</strong>
        <p style="margin:0.35rem 0 0;color:#374151;line-height:1.5">
          An <code>effect()</code> watches <code>riskLevel()</code> and logs each transition to the console.
          Its cleanup function logs <em>"effect cleaned up"</em> before each re-run and on component
          destroy — open DevTools to observe the sequence.
        </p>
        <p style="margin:0.5rem 0 0;color:#6b7280;font-style:italic;font-size:0.82rem">
          Current effect log: risk level is <strong>{{ riskLevel() }}</strong>
          (change the position value to cross the $10k / $50k thresholds to trigger transitions)
        </p>
      </div>
    </div>
  `,
})
export class SignalsPanel {
  private readonly destroyRef = inject(DestroyRef);

  readonly price    = signal(182.50);
  readonly quantity = signal(100);

  readonly total = computed(() => this.price() * this.quantity());

  readonly riskLevel = computed<'low' | 'medium' | 'high'>(() => {
    const t = this.total();
    if (t < 10_000)  return 'low';
    if (t < 50_000) return 'medium';
    return 'high';
  });

  constructor() {
    const riskEffect = effect(onCleanup => {
      const level = this.riskLevel();
      console.log(`[SignalsPanel] risk level changed → ${level}`);
      onCleanup(() => console.log('[SignalsPanel] effect cleaned up'));
    });

    this.destroyRef.onDestroy(() => riskEffect.destroy());
  }

  incrementPrice()  { this.price.update(p => +(p + 1).toFixed(2)); }
  decrementPrice()  { this.price.update(p => Math.max(1, +(p - 1).toFixed(2))); }
  incrementQty()    { this.quantity.update(q => q + 10); }
  decrementQty()    { this.quantity.update(q => Math.max(0, q - 10)); }
}
