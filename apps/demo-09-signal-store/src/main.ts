import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Standalone bootstrap: no NgModule is needed for this demo application.
bootstrapApplication(App, appConfig).catch(console.error);
