import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Fund } from './fund.model';

@Component({
  selector: 'app-fund-detail',
  imports: [RouterLink],
  template: `
    <div style="padding: 2rem; max-width: 720px; margin: 0 auto;">

      <a routerLink="/portal/funds" style="color: #1a3a6b; text-decoration: none; font-size: 0.875rem; display: inline-flex; align-items: center; gap: 0.25rem; margin-bottom: 1.25rem;">
        &#8592; Back to Funds
      </a>

      @if (fund()) {
        <div class="card" style="border-top: 4px solid #1a3a6b;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
            <div>
              <h1 style="margin-bottom: 0.25rem;">{{ fund()!.name }}</h1>
              <div style="font-family: monospace; color: #6b7280; font-size: 0.9rem;">ISIN: {{ fund()!.isin }}</div>
            </div>
            <span
              class="badge"
              style="font-size: 0.85rem; padding: 0.25rem 0.75rem;"
              [style.background]="fund()!.riskRating === 'High' ? '#fee2e2' : fund()!.riskRating === 'Medium' ? '#fef3c7' : '#d1fae5'"
              [style.color]="fund()!.riskRating === 'High' ? '#991b1b' : fund()!.riskRating === 'Medium' ? '#92400e' : '#065f46'"
            >
              {{ fund()!.riskRating }} Risk
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
            <div style="background: #f8fafc; border-radius: 6px; padding: 1rem;">
              <div style="font-size: 0.75rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">YTD Return</div>
              <div style="font-size: 1.75rem; font-weight: 700;"
                   [style.color]="fund()!.ytd >= 0 ? '#059669' : '#dc2626'">
                {{ fund()!.ytd >= 0 ? '+' : '' }}{{ fund()!.ytd }}%
              </div>
            </div>
            <div style="background: #f8fafc; border-radius: 6px; padding: 1rem;">
              <div style="font-size: 0.75rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">NAV per Unit</div>
              <div style="font-size: 1.75rem; font-weight: 700;">£{{ fund()!.nav.toFixed(2) }}</div>
            </div>
            <div style="background: #f8fafc; border-radius: 6px; padding: 1rem;">
              <div style="font-size: 0.75rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">Fund ID</div>
              <div style="font-size: 1.75rem; font-weight: 700; font-family: monospace; font-size: 1.1rem; padding-top: 0.35rem;">{{ fund()!.id }}</div>
            </div>
          </div>

          <div style="background: #eff6ff; border-radius: 6px; padding: 1rem; border-left: 3px solid #3b82f6;">
            <div style="font-size: 0.8rem; font-weight: 600; color: #1d4ed8; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.04em;">Routing Concept: Resolver</div>
            <p style="color: #374151; font-size: 0.875rem; margin: 0;">
              This component received the <code>fund</code> object via a <strong>ResolveFn</strong>.
              The router resolved the data before activating this component — so
              <code>fund()</code> is guaranteed non-null at render time. The route param <code>:id</code>
              is also bound directly to <code>id = input.required&lt;string&gt;()</code>
              via <code>withComponentInputBinding()</code>.
            </p>
          </div>
        </div>
      } @else {
        <div class="card" style="color: #dc2626;">
          Fund not found.
        </div>
      }
    </div>
  `,
})
export class FundDetail {
  /** Bound from route resolver data via withComponentInputBinding() */
  readonly fund = input.required<Fund | null>();
  /** Bound from :id route param via withComponentInputBinding() */
  readonly id = input.required<string>();
}
