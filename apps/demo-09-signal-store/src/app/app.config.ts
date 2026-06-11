import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // This demo uses signals end to end, so Angular can run without Zone.js change detection.
    provideZonelessChangeDetection(),
  ],
};
