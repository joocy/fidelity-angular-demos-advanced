import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AutoPanel } from './auto-panel';
import { ManualPanel } from './manual-panel';
import { MarkPanel } from './mark-panel';

@Component({
  selector: 'app-root',
  imports: [AutoPanel, ManualPanel, MarkPanel],
  template: `
    <nav>
      <strong>Apex Asset Management</strong>
      <span>Advanced Angular — Module 1: Change Detection</span>
    </nav>

    <div style="padding:1.5rem;max-width:1200px;margin:0 auto">
      <h1 style="margin-bottom:0.25rem">Change Detection Strategies</h1>
      <p style="color:#6b7280;margin-bottom:1.5rem">
        Three panels — three CD approaches — running side by side in a <strong>zoneless</strong> app.
        The shared parent tick (<strong>{{ tick() }}</strong>) advances every second;
        watch how each panel responds differently.
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:1.25rem">
        <app-auto-panel   [tick]="tick()" />
        <app-manual-panel [tick]="tick()" />
        <app-mark-panel   [tick]="tick()" />
      </div>
    </div>
  `,
})
export class App {
  readonly tick = signal(0);

  constructor() {
    const destroyRef = inject(DestroyRef);

    const interval = setInterval(() => this.tick.update(n => n + 1), 1000);

    destroyRef.onDestroy(() => clearInterval(interval));
  }
}
