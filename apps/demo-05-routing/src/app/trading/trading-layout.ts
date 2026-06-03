import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-trading-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div style="padding: 2rem; max-width: 900px; margin: 0 auto;">
      <h1 style="margin-bottom: 0.25rem;">Trading</h1>
      <p style="color: #6b7280; margin-bottom: 1.25rem;">
        Feature module with <strong>nested child routes</strong>. This layout component
        owns the tab UI and a <code>&lt;router-outlet&gt;</code> for the child views.
      </p>

      <div style="display: flex; gap: 0; border-bottom: 2px solid #e5e7eb; margin-bottom: 1.5rem;">
        <a
          routerLink="order-entry"
          routerLinkActive="active-tab"
          style="padding: 0.6rem 1.25rem; text-decoration: none; color: #6b7280; font-weight: 500; font-size: 0.9rem; border-bottom: 2px solid transparent; margin-bottom: -2px;"
        >
          Order Entry
        </a>
        <a
          routerLink="order-book"
          routerLinkActive="active-tab"
          style="padding: 0.6rem 1.25rem; text-decoration: none; color: #6b7280; font-weight: 500; font-size: 0.9rem; border-bottom: 2px solid transparent; margin-bottom: -2px;"
        >
          Order Book
        </a>
      </div>

      <router-outlet />
    </div>
  `,
  styles: [`
    a.active-tab {
      color: #1a3a6b !important;
      border-bottom-color: #1a3a6b !important;
    }
  `],
})
export class TradingLayout {}
