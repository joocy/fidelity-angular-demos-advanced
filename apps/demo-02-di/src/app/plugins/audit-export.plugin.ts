import { Injectable } from '@angular/core';
import { ExportPlugin, Trade } from '../export-plugin.token';

@Injectable()
export class AuditExportPlugin implements ExportPlugin {
  readonly label = 'Send to Audit Log';

  export(trades: Trade[]): void {
    console.log(`[AUDIT] ${trades.length} trades exported at ${new Date().toISOString()}`);
  }
}
