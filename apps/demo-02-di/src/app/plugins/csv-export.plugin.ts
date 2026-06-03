import { Injectable } from '@angular/core';
import { ExportPlugin, Trade } from '../export-plugin.token';

@Injectable()
export class CsvExportPlugin implements ExportPlugin {
  readonly label = 'Export CSV';

  export(trades: Trade[]): void {
    const header = 'id,symbol,side,qty,price';
    const rows = trades.map(t => `${t.id},${t.symbol},${t.side},${t.qty},${t.price}`);
    const csv = [header, ...rows].join('\n');
    console.log('[CsvExportPlugin] CSV output:\n' + csv);
  }
}
