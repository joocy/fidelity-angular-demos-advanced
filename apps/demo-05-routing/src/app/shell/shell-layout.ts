import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-shell-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div style="display: flex; flex-direction: column; min-height: 100vh;">

      <!-- Top nav bar -->
      <nav>
        <strong>Apex Asset Management</strong>
        <span>Advanced Angular — Module 5: Advanced Routing</span>
        <div style="margin-left: auto; display: flex; align-items: center; gap: 1rem;">
          @if (loadingChunk()) {
            <span style="display: inline-flex; align-items: center; gap: 0.35rem; background: rgba(255,255,255,0.12); padding: 0.2rem 0.65rem; border-radius: 4px; font-size: 0.78rem;">
              <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #fbbf24; animation: pulse 1s infinite;"></span>
              Loading chunk…
            </span>
          } @else if (lastLoaded()) {
            <span style="display: inline-flex; align-items: center; gap: 0.35rem; background: rgba(255,255,255,0.12); padding: 0.2rem 0.65rem; border-radius: 4px; font-size: 0.78rem; color: #86efac;">
              &#10003; {{ lastLoaded() }} preloaded
            </span>
          }
          @if (auth.isLoggedIn()) {
            <span style="font-size: 0.85rem; color: #86efac;">&#10003; Logged in</span>
            <button class="btn-secondary" (click)="auth.logout()" style="font-size: 0.8rem; padding: 0.3rem 0.7rem;">Logout</button>
          } @else {
            <span style="font-size: 0.85rem; color: #fca5a5;">Not logged in</span>
            <button class="btn-primary" (click)="auth.login()" style="font-size: 0.8rem; padding: 0.3rem 0.7rem; background: white; color: #1a3a6b;">Login</button>
          }
        </div>
      </nav>

      <!-- Body: sidebar + content -->
      <div style="display: flex; flex: 1;">

        <!-- Sidebar -->
        <aside style="width: 220px; background: #1e2d4a; color: white; padding: 1.5rem 0; flex-shrink: 0;">
          <div style="padding: 0 1rem 1rem; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-weight: 600;">Navigation</div>

          <a
            routerLink="/portal/home"
            routerLinkActive="sidebar-active"
            [routerLinkActiveOptions]="{ exact: true }"
            style="display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 1rem; text-decoration: none; color: #cbd5e1; font-size: 0.875rem; border-left: 3px solid transparent;"
          >
            <span>&#8962;</span> Home
          </a>

          <a
            routerLink="/portal/funds"
            routerLinkActive="sidebar-active"
            style="display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 1rem; text-decoration: none; color: #cbd5e1; font-size: 0.875rem; border-left: 3px solid transparent;"
          >
            <span>📈</span> Funds
            <span style="margin-left: auto; font-size: 0.7rem; background: #0e7490; color: white; padding: 0.1rem 0.4rem; border-radius: 3px;">preloads</span>
          </a>

          <a
            routerLink="/portal/trading"
            routerLinkActive="sidebar-active"
            style="display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 1rem; text-decoration: none; color: #cbd5e1; font-size: 0.875rem; border-left: 3px solid transparent;"
          >
            <span>⚡</span> Trading
            <span style="margin-left: auto; font-size: 0.7rem; background: #7c3aed; color: white; padding: 0.1rem 0.4rem; border-radius: 3px;">guard</span>
          </a>

          <div style="margin-top: 2rem; padding: 0.75rem 1rem; margin-left: 0.5rem; margin-right: 0.5rem; background: rgba(255,255,255,0.05); border-radius: 6px;">
            <div style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-bottom: 0.5rem; font-weight: 600;">Auth Status</div>
            @if (auth.isLoggedIn()) {
              <div style="color: #86efac; font-size: 0.8rem;">&#10003; Authenticated</div>
              <div style="color: #64748b; font-size: 0.75rem; margin-top: 0.25rem;">All routes accessible</div>
            } @else {
              <div style="color: #fca5a5; font-size: 0.8rem;">&#10007; Not authenticated</div>
              <div style="color: #64748b; font-size: 0.75rem; margin-top: 0.25rem;">Guard blocks Trading &amp; Fund Detail</div>
            }
          </div>

          <div style="margin-top: 1rem; padding: 0.75rem 1rem; margin-left: 0.5rem; margin-right: 0.5rem; background: rgba(255,255,255,0.05); border-radius: 6px;">
            <div style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-bottom: 0.5rem; font-weight: 600;">Preloading</div>
            @if (loadingChunk()) {
              <div style="color: #fbbf24; font-size: 0.8rem;">Loading…</div>
            } @else if (lastLoaded()) {
              <div style="color: #86efac; font-size: 0.8rem;">&#10003; {{ lastLoaded() }}</div>
              <div style="color: #64748b; font-size: 0.75rem; margin-top: 0.25rem;">chunk preloaded</div>
            } @else {
              <div style="color: #94a3b8; font-size: 0.8rem;">Idle</div>
              <div style="color: #64748b; font-size: 0.75rem; margin-top: 0.25rem;">No chunk loading</div>
            }
          </div>
        </aside>

        <!-- Main content -->
        <main style="flex: 1; overflow-y: auto;">
          <router-outlet />
        </main>

      </div>
    </div>
  `,
  styles: [`
    a.sidebar-active {
      color: white !important;
      border-left-color: #60a5fa !important;
      background: rgba(255, 255, 255, 0.07);
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
  `],
})
export class ShellLayout implements OnInit {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly loadingChunk = signal(false);
  readonly lastLoaded = signal('');

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingChunk.set(true);
        this.lastLoaded.set('');
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingChunk.set(false);
        const path = (event.route.path ?? 'module').replace(/\//g, '-');
        this.lastLoaded.set(path);
      }
    });
  }
}
