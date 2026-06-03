import { InjectionToken } from '@angular/core';

export interface Trade {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  qty: number;
  price: number;
}

export interface ExportPlugin {
  label: string;
  export(trades: Trade[]): void;
}

// Multi-provider token: each plugin registers itself with { provide: EXPORT_PLUGINS, useClass: ..., multi: true }.
// Angular collects all registrations and injects them as an array, enabling an open plugin architecture.
export const EXPORT_PLUGINS = new InjectionToken<ExportPlugin[]>('EXPORT_PLUGINS');
