import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { appRoutes } from './app.routes';
import { SelectivePreloadStrategy } from './preloading/selective-preload.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withPreloading(SelectivePreloadStrategy),
    ),
  ],
};
