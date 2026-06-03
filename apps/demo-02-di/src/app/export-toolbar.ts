import { Component, inject, input, signal } from '@angular/core';
import { EXPORT_PLUGINS, Trade } from './export-plugin.token';

interface ExportEvent {
  pluginLabel: string;
  tradeCount: number;
  timestamp: string;
}

@Component({
  selector: 'app-export-toolbar',
  standalone: true,
  template: `
    <div class="card">
      <h2>Export Plugins</h2>
      <p style="font-size:0.85rem; color:#6b7280; margin: 0 0 0.75rem;">
        {{ plugins.length }} plugin(s) registered via multi-provider token.
        Click a button to invoke a plugin — check the browser console for output.
      </p>
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.75rem;">
        @for (plugin of plugins; track plugin.label) {
          <button class="btn-primary" (click)="runExport(plugin)">
            {{ plugin.label }}
          </button>
        }
      </div>
      @if (lastExport()) {
        <div style="font-size:0.82rem; color:#6b7280; background:#f8fafc; padding:0.5rem 0.75rem; border-radius:4px; border-left:3px solid #1a3a6b;">
          Last export: <strong>{{ lastExport()!.pluginLabel }}</strong>
          &mdash; {{ lastExport()!.tradeCount }} trade(s)
          at {{ lastExport()!.timestamp }}
        </div>
      }
    </div>
  `,
})
export class ExportToolbar {
  /** All registered export plugins — injected from the multi-provider token. */
  readonly plugins = inject(EXPORT_PLUGINS);

  /** Trades to export, passed in from the parent. */
  readonly trades = input.required<Trade[]>();

  readonly lastExport = signal<ExportEvent | null>(null);

  runExport(plugin: { label: string; export(trades: Trade[]): void }): void {
    const tradesToExport = this.trades();
    plugin.export(tradesToExport);
    this.lastExport.set({
      pluginLabel: plugin.label,
      tradeCount: tradesToExport.length,
      timestamp: new Date().toLocaleTimeString(),
    });
  }
}
