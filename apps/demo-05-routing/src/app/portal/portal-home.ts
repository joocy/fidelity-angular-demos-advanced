import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-portal-home',
  imports: [RouterLink],
  template: `
    <div style="padding: 2rem; max-width: 900px; margin: 0 auto;">
      <h1 style="margin-bottom: 0.25rem;">Welcome to Apex Portal</h1>
      <p style="color: #6b7280; margin-bottom: 2rem;">
        Advanced Angular — Module 5: Advanced Routing demo application.
        Explore each section below to see different routing concepts in action.
      </p>

      @if (!auth.isLoggedIn()) {
        <div class="card" style="border-left: 4px solid #f59e0b; margin-bottom: 1.5rem;">
          <h2 style="color: #92400e;">Authentication Required</h2>
          <p style="color: #6b7280; margin-bottom: 0.75rem;">
            Some sections require you to be logged in. Use the login button in the sidebar
            to authenticate before accessing Fund Detail and Trading pages.
          </p>
        </div>
      }

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem;">

        <div class="card" style="border-top: 3px solid #1a3a6b;">
          <h2>Funds List</h2>
          <p style="color: #6b7280; margin-bottom: 1rem; font-size: 0.9rem;">
            Demonstrates <strong>lazy loading</strong> via <code>loadComponent()</code> and
            the <strong>selective preloading strategy</strong>. This route is marked
            <code>data: {{ '{' }} preload: true {{ '}' }}</code> so it loads eagerly in the background.
          </p>
          <a routerLink="/portal/funds" class="btn-primary" style="text-decoration: none; padding: 0.4rem 0.9rem; border-radius: 4px; font-size: 0.875rem; color: white; background: #1a3a6b;">
            View Funds
          </a>
        </div>

        <div class="card" style="border-top: 3px solid #059669;">
          <h2>Fund Detail</h2>
          <p style="color: #6b7280; margin-bottom: 1rem; font-size: 0.9rem;">
            Demonstrates a <strong>route resolver</strong> (<code>ResolveFn&lt;Fund&gt;</code>)
            — data is fetched and injected into the component before it renders.
            Also uses <code>input()</code> binding from the resolved data and requires
            <strong>authentication</strong> via <code>canActivate</code>.
          </p>
          <a routerLink="/portal/funds/uk-eq" class="btn-primary" style="text-decoration: none; padding: 0.4rem 0.9rem; border-radius: 4px; font-size: 0.875rem; color: white; background: #059669;">
            View Fund Detail
          </a>
        </div>

        <div class="card" style="border-top: 3px solid #7c3aed;">
          <h2>Trading</h2>
          <p style="color: #6b7280; margin-bottom: 1rem; font-size: 0.9rem;">
            Demonstrates <strong>nested child routes</strong> with a feature-level
            <code>&lt;router-outlet&gt;</code>. The Trading section has its own layout
            with tabs for Order Entry and Order Book. Protected by <code>canActivate</code>.
          </p>
          <a routerLink="/portal/trading" class="btn-primary" style="text-decoration: none; padding: 0.4rem 0.9rem; border-radius: 4px; font-size: 0.875rem; color: white; background: #7c3aed;">
            Open Trading
          </a>
        </div>

      </div>

      <div class="card" style="margin-top: 1.5rem; background: #f8fafc;">
        <h2>Routing Features in This Demo</h2>
        <ul style="color: #374151; font-size: 0.9rem; line-height: 1.8; margin: 0; padding-left: 1.25rem;">
          <li><strong>Lazy loading</strong> — <code>loadComponent()</code> for funds and trading modules</li>
          <li><strong>Selective preloading</strong> — custom <code>PreloadingStrategy</code> reads <code>data.preload</code></li>
          <li><strong>Route resolvers</strong> — <code>ResolveFn&lt;Fund&gt;</code> ensures data before render</li>
          <li><strong>Functional guards</strong> — <code>CanActivateFn</code> with redirect on failure</li>
          <li><strong>Child routes</strong> — nested router-outlet in TradingLayout</li>
          <li><strong>Input binding</strong> — <code>withComponentInputBinding()</code> maps params to <code>input()</code></li>
        </ul>
      </div>
    </div>
  `,
})
export class PortalHome {
  readonly auth = inject(AuthService);
}
