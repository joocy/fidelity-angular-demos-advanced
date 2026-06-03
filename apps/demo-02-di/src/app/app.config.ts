import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { EXPORT_PLUGINS } from './export-plugin.token';
import { CsvExportPlugin } from './plugins/csv-export.plugin';
import { ConsoleExportPlugin } from './plugins/console-export.plugin';
import { AuditExportPlugin } from './plugins/audit-export.plugin';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    // Multi-providers: all three are registered for the same token.
    // Angular injects them as an array — new plugins can be added here without touching any other file.
    { provide: EXPORT_PLUGINS, useClass: CsvExportPlugin, multi: true },
    { provide: EXPORT_PLUGINS, useClass: ConsoleExportPlugin, multi: true },
    { provide: EXPORT_PLUGINS, useClass: AuditExportPlugin, multi: true },
  ],
};
