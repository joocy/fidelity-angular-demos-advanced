import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignalsPanel } from './signals-panel';
import { InteropPanel } from './interop-panel';
import { StorePanel } from './store-panel';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SignalsPanel, InteropPanel, StorePanel],
  template: `
    <nav>
      <strong>Apex Asset Management</strong>
      <span>Advanced Angular · Module 3: Signals Deep Dive</span>
    </nav>

    <main style="max-width:900px;margin:1.5rem auto;padding:0 1rem">

      <div style="margin-bottom:1.5rem">
        <h1 style="font-size:1.4rem;font-weight:700;margin-bottom:0.25rem">Demo 03 — Signals Deep Dive</h1>
        <p style="color:#6b7280;font-size:0.9rem;margin:0">
          Three interactive panels covering Angular 21 Signals primitives, Observable interop bridges,
          and NgRx SignalStore for reactive state management — all zoneless, all standalone.
        </p>
      </div>

      <!-- Section 1 -->
      <div style="margin-bottom:1.75rem">
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem">
          <div style="background:#1a3a6b;color:white;border-radius:50%;width:1.6rem;height:1.6rem;display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:700;flex-shrink:0">1</div>
          <h2 style="font-size:1.05rem;font-weight:700;margin:0">Signals, Computed &amp; Effects</h2>
        </div>
        <app-signals-panel />
      </div>

      <!-- Section 2 -->
      <div style="margin-bottom:1.75rem">
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem">
          <div style="background:#1a3a6b;color:white;border-radius:50%;width:1.6rem;height:1.6rem;display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:700;flex-shrink:0">2</div>
          <h2 style="font-size:1.05rem;font-weight:700;margin:0">Signals ↔ Observables Interop</h2>
        </div>
        <app-interop-panel />
      </div>

      <!-- Section 3 -->
      <div style="margin-bottom:1.75rem">
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem">
          <div style="background:#1a3a6b;color:white;border-radius:50%;width:1.6rem;height:1.6rem;display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:700;flex-shrink:0">3</div>
          <h2 style="font-size:1.05rem;font-weight:700;margin:0">NgRx SignalStore</h2>
        </div>
        <app-store-panel />
      </div>

    </main>
  `,
})
export class App {}
