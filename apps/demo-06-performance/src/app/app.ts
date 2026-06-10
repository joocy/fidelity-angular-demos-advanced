import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FundBadge } from './shared/fund-badge';
import { HeavyAnalytics } from './sections/heavy-analytics';
import { RiskMatrix } from './sections/risk-matrix';
import { NewsFeed } from './sections/news-feed';
import { ChartPlaceholder } from './sections/chart-placeholder';

@Component({
  selector: 'app-root',
  imports: [NgOptimizedImage, FundBadge, HeavyAnalytics, RiskMatrix, NewsFeed, ChartPlaceholder],
  template: `
    <nav>
      <strong>Apex Asset Management</strong>
      <span>Advanced Angular — Module 6: Performance Optimisation</span>
    </nav>

    <div style="padding:1.5rem;max-width:1100px;margin:0 auto">
      <h1 style="margin-bottom:0.25rem">Angular Performance: &#64;defer Strategies</h1>
      <p style="color:#6b7280;margin-bottom:1.5rem">
        Five sections below each use a different <code>&#64;defer</code> trigger.
        Explore how Angular splits your bundle and loads components on demand.
      </p>

      <!-- Dev Tools hint -->
      <div class="card" style="background:#fffbeb;border-left:4px solid #f59e0b;margin-bottom:1.5rem">
        <h2 style="color:#92400e">How to observe deferred loading</h2>
        <ul style="margin:0;padding-left:1.25rem;line-height:1.8;color:#78350f">
          <li>Open <strong>Chrome DevTools → Network tab</strong> and throttle to <strong>"Slow 3G"</strong> to see deferred chunk requests appear.</li>
          <li>Open the <strong>Console tab</strong> — each deferred component logs when it initialises so you can see the exact moment it loads.</li>
          <li>Each section below uses a different <code>&#64;defer</code> trigger — scroll, click, wait, or just let the browser go idle.</li>
        </ul>
      </div>

      <div style="display:grid;grid-template-columns:1fr;gap:2rem">

        <!-- ─── Section 1: Always rendered ─── -->
        <section>
          <div class="card" style="border-top:3px solid #10b981">
            <h2 style="color:#065f46">Section 1 — Eagerly loaded (no &#64;defer)</h2>
            <p style="color:#6b7280;font-size:0.875rem;margin-bottom:1rem">
              <code>FundBadge</code> is a simple component included in the initial bundle.
              It is always available immediately — no deferral needed for lightweight UI.
            </p>
            <app-fund-badge />
          </div>
        </section>

        <!-- ─── Section 2: on idle ─── -->
        <section>
          <div style="border-left:4px solid #6366f1;padding-left:1rem">
            <h3 style="color:#4338ca;margin-bottom:0.5rem">
              Section 2 — <code>&#64;defer (on idle)</code>
            </h3>
            <p style="color:#6b7280;font-size:0.875rem;margin-bottom:0.75rem">
              Defers until the browser has finished its initial work and becomes idle
              (<code>requestIdleCallback</code>). Great for analytics and non-critical UI.
            </p>
            @defer (on idle) {
              <app-heavy-analytics />
            } @placeholder {
              <div class="card" style="border:2px dashed #c7d2fe;color:#6366f1;text-align:center;padding:1.5rem">
                Analytics will load when the browser is idle...
              </div>
            } @loading (minimum 300ms) {
              <div class="card" style="color:#6b7280;text-align:center;padding:1.5rem">
                <span style="animation:pulse 1s infinite">Loading analytics...</span>
              </div>
            }
          </div>
        </section>

        <!-- ─── Section 3: on viewport ─── -->
        <section>
          <div style="border-left:4px solid #f59e0b;padding-left:1rem">
            <h3 style="color:#d97706;margin-bottom:0.5rem">
              Section 3 — <code>&#64;defer (on viewport)</code>
            </h3>
            <p style="color:#6b7280;font-size:0.875rem;margin-bottom:0.75rem">
              Defers until the placeholder element enters the browser viewport
              (uses <code>IntersectionObserver</code>). Ideal for below-the-fold content.
            </p>
            @defer (on viewport) {
              <app-risk-matrix />
            } @placeholder {
              <div class="card" style="min-height:200px;border:2px dashed #fcd34d;color:#d97706;
                                       display:flex;align-items:center;justify-content:center;
                                       flex-direction:column;gap:0.5rem;text-align:center">
                <span style="font-size:1.5rem">↓</span>
                <span>Risk matrix loads when this area scrolls into view</span>
                <span style="font-size:0.8rem;color:#9ca3af">Scroll down if you don't see it yet</span>
              </div>
            }
          </div>
        </section>

        <!-- ─── Section 4: on interaction ─── -->
        <section>
          <div style="border-left:4px solid #ec4899;padding-left:1rem">
            <h3 style="color:#db2777;margin-bottom:0.5rem">
              Section 4 — <code>&#64;defer (on interaction(trigger))</code>
            </h3>
            <p style="color:#6b7280;font-size:0.875rem;margin-bottom:0.75rem">
              Defers until the user interacts with a named template reference.
              The placeholder itself becomes the trigger — click the button below.
            </p>
            @defer (on interaction(newsTrigger)) {
              <app-news-feed />
            } @placeholder {
              <div style="text-align:center;padding:0.5rem 0">
                <button #newsTrigger class="btn-secondary"
                        style="padding:0.65rem 1.4rem;font-size:0.9rem;border:2px solid #e2e8f0">
                  Click to load market news
                </button>
              </div>
            } @loading {
              <div class="card" style="color:#6b7280;text-align:center;padding:1rem">
                Loading news feed...
              </div>
            }
          </div>
        </section>

        <!-- ─── Section 5: on timer ─── -->
        <section>
          <div style="border-left:4px solid #14b8a6;padding-left:1rem">
            <h3 style="color:#0f766e;margin-bottom:0.5rem">
              Section 5 — <code>&#64;defer (on timer(2000))</code>
            </h3>
            <p style="color:#6b7280;font-size:0.875rem;margin-bottom:0.75rem">
              Defers for a fixed duration after the page renders. Simulates deferring a
              heavyweight charting library so the initial paint stays fast.
            </p>
            @defer (on timer(2000)) {
              <app-chart-placeholder />
            } @placeholder {
              <div class="card" style="border:2px dashed #99f6e4;color:#0f766e;text-align:center;padding:1.5rem">
                Chart loading in 2 seconds...
              </div>
            } @loading {
              <div class="card" style="color:#6b7280;text-align:center;padding:1.5rem">
                Loading chart library...
              </div>
            }
          </div>
        </section>

        <!-- ─── Section 6: NgOptimizedImage ─── -->
        <section>
          <div class="card" style="border-top:3px solid #8b5cf6">
            <h2 style="color:#5b21b6">Section 6 — NgOptimizedImage</h2>
            <p style="color:#6b7280;font-size:0.875rem;margin-bottom:1rem">
              <code>NgOptimizedImage</code> (imported from <code>@angular/common</code>) adds
              <code>loading="lazy"</code>, enforces explicit <code>width</code>/<code>height</code>
              to prevent layout shift, and marks above-the-fold images with <code>priority</code>
              to generate a <code>&lt;link rel="preload"&gt;</code> automatically.
            </p>
            <div style="display:flex;gap:1.5rem;flex-wrap:wrap;align-items:flex-end">

              <div style="text-align:center">
                <img ngSrc="https://placehold.co/120x60?text=FUND+A"
                     width="120" height="60"
                     priority
                     alt="Fund A logo"
                     style="border-radius:6px;display:block;margin-bottom:0.35rem" />
                <span style="font-size:0.78rem;color:#6b7280">Apex UK Equity<br/>
                  <code style="font-size:0.7rem">priority</code> (preloaded)</span>
              </div>

              <div style="text-align:center">
                <img ngSrc="https://placehold.co/120x60?text=FUND+B"
                     width="120" height="60"
                     alt="Fund B logo"
                     style="border-radius:6px;display:block;margin-bottom:0.35rem" />
                <span style="font-size:0.78rem;color:#6b7280">Apex Global Growth<br/>
                  <code style="font-size:0.7rem">loading="lazy"</code></span>
              </div>

              <div style="text-align:center">
                <img ngSrc="https://placehold.co/120x60?text=FUND+C"
                     width="120" height="60"
                     alt="Fund C logo"
                     style="border-radius:6px;display:block;margin-bottom:0.35rem" />
                <span style="font-size:0.78rem;color:#6b7280">Apex EM Bond<br/>
                  <code style="font-size:0.7rem">loading="lazy"</code></span>
              </div>

            </div>
            <p style="color:#6b7280;font-size:0.8rem;margin-top:1rem;margin-bottom:0">
              Check the Network tab — the first image is preloaded; the others are lazily fetched.
              Angular also warns in dev mode if you omit <code>width</code>/<code>height</code>.
            </p>
          </div>
        </section>

      </div>
    </div>
  `,
  styles: [`
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.5; }
    }
  `],
})
export class App {}
