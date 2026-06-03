import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { interval, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-interop-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <h2>Signals ↔ Observables Interop</h2>
      <p style="color:#6b7280;font-size:0.85rem;margin-bottom:1.25rem">
        Angular's <code>toSignal()</code> wraps any Observable as a readable signal.
        <code>toObservable()</code> turns a writable signal into an Observable stream.
        Both bridges are automatic — no manual subscribe/unsubscribe needed.
      </p>

      <!-- Row 1: Observable → Signal (toSignal) -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.25rem">

        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:0.85rem 1rem">
          <div style="font-size:0.78rem;font-weight:700;color:#15803d;text-transform:uppercase;margin-bottom:0.5rem">
            Observable → Signal &nbsp;<code style="font-size:0.72rem">toSignal()</code>
          </div>
          <div style="font-size:0.85rem;color:#374151;margin-bottom:0.6rem">
            <code>interval(1000)</code> is an Observable — wrapped with <code>toSignal()</code>
            to read its latest value directly in the template with no subscription boilerplate.
          </div>
          <div style="display:flex;align-items:baseline;gap:0.5rem">
            <span style="font-size:0.82rem;color:#6b7280">Tick:</span>
            <span style="font-size:1.6rem;font-weight:700;font-family:monospace;color:#15803d">
              {{ tick() ?? 0 }}
            </span>
            <span style="font-size:0.8rem;color:#9ca3af">updates every second</span>
          </div>
        </div>

        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:0.85rem 1rem">
          <div style="font-size:0.78rem;font-weight:700;color:#15803d;text-transform:uppercase;margin-bottom:0.5rem">
            BehaviorSubject → Signal &nbsp;<code style="font-size:0.72rem">toSignal()</code>
          </div>
          <div style="font-size:0.85rem;color:#374151;margin-bottom:0.6rem">
            A <code>BehaviorSubject&lt;string&gt;</code> drives a search filter.
            Wrapped with <code>toSignal()</code> so the template reads it like any signal.
          </div>
          <div>
            <label>Search term (via BehaviorSubject)</label>
            <input
              [value]="searchTermSignal() ?? ''"
              (input)="onSearchInput($event)"
              placeholder="e.g. AAPL"
              style="width:100%" />
            <div style="margin-top:0.4rem;font-size:0.82rem;color:#6b7280">
              Signal reads: <strong>{{ searchTermSignal() || '(empty)' }}</strong>
            </div>
          </div>
        </div>

      </div>

      <!-- Row 2: Signal → Observable (toObservable) -->
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:0.85rem 1rem">
        <div style="font-size:0.78rem;font-weight:700;color:#1d4ed8;text-transform:uppercase;margin-bottom:0.5rem">
          Signal → Observable &nbsp;<code style="font-size:0.72rem">toObservable()</code>
        </div>
        <div style="font-size:0.85rem;color:#374151;margin-bottom:0.75rem">
          A writable <code>signal&lt;string&gt;</code> is the source. <code>toObservable()</code>
          converts it into an Observable stream (re-wrapped as a signal here for display).
          In real apps you'd pipe operators like <code>debounceTime</code>, <code>switchMap</code>, etc.
        </div>
        <div style="display:flex;gap:1rem;align-items:flex-end;flex-wrap:wrap">
          <div style="flex:1;min-width:180px">
            <label>Writable signal input</label>
            <input
              [value]="searchSignal()"
              (input)="onSignalInput($event)"
              placeholder="type here…"
              style="width:100%" />
          </div>
          <div style="flex:1;min-width:180px">
            <div style="font-size:0.78rem;color:#6b7280;font-weight:600;text-transform:uppercase;margin-bottom:0.2rem">
              Observable (via toObservable) reads
            </div>
            <div style="font-family:monospace;font-size:1rem;color:#1d4ed8;padding:0.4rem 0.6rem;background:white;border:1px solid #bfdbfe;border-radius:4px;min-height:2rem">
              {{ observableAsSignal() || '(empty)' }}
            </div>
          </div>
        </div>
        <div style="margin-top:0.6rem;font-size:0.8rem;color:#6b7280">
          Data flow: <code>searchSignal</code> (writable signal)
          → <code>toObservable(searchSignal)</code> (Observable&lt;string&gt;)
          → <code>toSignal(...)</code> → template read
        </div>
      </div>
    </div>
  `,
})
export class InteropPanel {
  // ── Observable → Signal (toSignal) ──────────────────────────────────────
  /** interval(1000) Observable wrapped as a signal — no subscribe needed */
  readonly tick = toSignal(interval(1000));

  /** BehaviorSubject wrapped as a signal */
  private readonly searchTerm$ = new BehaviorSubject<string>('');
  readonly searchTermSignal = toSignal(this.searchTerm$);

  onSearchInput(event: Event) {
    this.searchTerm$.next((event.target as HTMLInputElement).value);
  }

  // ── Signal → Observable (toObservable) ──────────────────────────────────
  /** Writable signal — the "source of truth" */
  readonly searchSignal = signal('');

  /**
   * toObservable() converts the signal into an Observable stream.
   * Here we pipe a trivial map just to illustrate operator composition,
   * then wrap back with toSignal() so the template can read it reactively.
   */
  readonly observableAsSignal = toSignal(
    toObservable(this.searchSignal).pipe(map(v => v)),
    { initialValue: '' }
  );

  onSignalInput(event: Event) {
    this.searchSignal.set((event.target as HTMLInputElement).value);
  }
}
