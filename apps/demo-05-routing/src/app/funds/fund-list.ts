import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FUNDS, Fund } from './fund.model';

@Component({
  selector: 'app-fund-list',
  imports: [RouterLink],
  template: `
    <div style="padding: 2rem; max-width: 900px; margin: 0 auto;">
      <h1 style="margin-bottom: 0.25rem;">Funds</h1>
      <p style="color: #6b7280; margin-bottom: 1.5rem;">
        This component was <strong>lazy loaded</strong> via <code>loadComponent()</code>.
        It was also <strong>preloaded in the background</strong> thanks to the selective
        preloading strategy (<code>data: {{ '{' }} preload: true {{ '}' }}</code>).
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
        @for (fund of funds; track fund.id) {
          <a
            [routerLink]="['/portal/funds', fund.id]"
            style="text-decoration: none; color: inherit; display: block;"
          >
            <div class="card" style="cursor: pointer; transition: box-shadow 0.15s; border-top: 3px solid #1a3a6b;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                <div>
                  <div style="font-weight: 600; font-size: 0.95rem;">{{ fund.name }}</div>
                  <div style="color: #6b7280; font-size: 0.8rem; font-family: monospace;">{{ fund.isin }}</div>
                </div>
                <span
                  class="badge"
                  [style.background]="fund.riskRating === 'High' ? '#fee2e2' : fund.riskRating === 'Medium' ? '#fef3c7' : '#d1fae5'"
                  [style.color]="fund.riskRating === 'High' ? '#991b1b' : fund.riskRating === 'Medium' ? '#92400e' : '#065f46'"
                >
                  {{ fund.riskRating }} Risk
                </span>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                <div>
                  <div style="font-size: 0.75rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em;">YTD Return</div>
                  <div style="font-size: 1.1rem; font-weight: 700;"
                       [style.color]="fund.ytd >= 0 ? '#059669' : '#dc2626'">
                    {{ fund.ytd >= 0 ? '+' : '' }}{{ fund.ytd }}%
                  </div>
                </div>
                <div>
                  <div style="font-size: 0.75rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em;">NAV</div>
                  <div style="font-size: 1.1rem; font-weight: 700;">£{{ fund.nav.toFixed(2) }}</div>
                </div>
              </div>
            </div>
          </a>
        }
      </div>
    </div>
  `,
})
export class FundList {
  readonly funds: Fund[] = Array.from(FUNDS.values());
}
