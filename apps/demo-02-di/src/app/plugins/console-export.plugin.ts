import { Injectable } from '@angular/core';
import { ExportPlugin, Trade } from '../export-plugin.token';

@Injectable()
export class ConsoleExportPlugin implements ExportPlugin {
  readonly label = 'Log to Console';

  export(trades: Trade[]): void {
    console.log('[ConsoleExportPlugin] Trade data:');
    console.table(trades);
  }
}
