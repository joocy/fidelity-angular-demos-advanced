import { Component } from '@angular/core';

interface AnalyticsRow {
  fund: string;
  aum: string;
  dailyPnl: number;
  weeklyPnl: number;
  monthlyPnl: number;
  ytd: number;
}

function randPnl(min: number, max: number): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

const FUNDS = [
  'Apex UK Equity', 'Apex Global Growth', 'Apex EM Bond', 'Apex Tech Sector',
  'Apex Real Assets', 'Apex High Yield', 'Apex ESG Core', 'Apex Diversified',
  'Apex Small Cap', 'Apex Income Fund',
];

const AUM_VALUES = [
  '£4.2bn', '£8.7bn', '£1.9bn', '£3.3bn', '£6.1bn',
  '£2.8bn', '£5.5bn', '£7.0bn', '£1.4bn', '£9.2bn',
];

@Component({
  selector: 'app-heavy-analytics',
  template: `
    <div class="card">
      <h2>Heavy Analytics — 50-Row P&amp;L Table</h2>
      <p style="color:#6b7280;font-size:0.85rem;margin-bottom:0.75rem">
        This component was deferred until the browser was idle.
        Check the console — you'll see exactly when it initialised.
      </p>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:0.85rem">
          <thead>
            <tr style="background:#f8fafc;text-align:right">
              <th style="text-align:left;padding:0.5rem 0.75rem;border-bottom:2px solid #e2e8f0">#</th>
              <th style="text-align:left;padding:0.5rem 0.75rem;border-bottom:2px solid #e2e8f0">Fund</th>
              <th style="padding:0.5rem 0.75rem;border-bottom:2px solid #e2e8f0">AUM</th>
              <th style="padding:0.5rem 0.75rem;border-bottom:2px solid #e2e8f0">Daily P&amp;L</th>
              <th style="padding:0.5rem 0.75rem;border-bottom:2px solid #e2e8f0">Weekly P&amp;L</th>
              <th style="padding:0.5rem 0.75rem;border-bottom:2px solid #e2e8f0">Monthly P&amp;L</th>
              <th style="padding:0.5rem 0.75rem;border-bottom:2px solid #e2e8f0">YTD</th>
            </tr>
          </thead>
          <tbody>
            @for (row of rows; track row.fund + $index) {
              <tr style="border-bottom:1px solid #f1f5f9;text-align:right"
                  [style.background]="$even ? '#fafafa' : 'white'">
                <td style="padding:0.4rem 0.75rem;text-align:left;color:#9ca3af">{{ $index + 1 }}</td>
                <td style="padding:0.4rem 0.75rem;text-align:left;font-weight:500">{{ row.fund }}</td>
                <td style="padding:0.4rem 0.75rem">{{ row.aum }}</td>
                <td style="padding:0.4rem 0.75rem"
                    [style.color]="row.dailyPnl >= 0 ? '#155724' : '#721c24'">
                  {{ row.dailyPnl >= 0 ? '+' : '' }}{{ row.dailyPnl }}%
                </td>
                <td style="padding:0.4rem 0.75rem"
                    [style.color]="row.weeklyPnl >= 0 ? '#155724' : '#721c24'">
                  {{ row.weeklyPnl >= 0 ? '+' : '' }}{{ row.weeklyPnl }}%
                </td>
                <td style="padding:0.4rem 0.75rem"
                    [style.color]="row.monthlyPnl >= 0 ? '#155724' : '#721c24'">
                  {{ row.monthlyPnl >= 0 ? '+' : '' }}{{ row.monthlyPnl }}%
                </td>
                <td style="padding:0.4rem 0.75rem"
                    [style.color]="row.ytd >= 0 ? '#155724' : '#721c24'">
                  {{ row.ytd >= 0 ? '+' : '' }}{{ row.ytd }}%
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class HeavyAnalytics {
  readonly rows: AnalyticsRow[] = Array.from({ length: 50 }, (_, i) => ({
    fund: FUNDS[i % FUNDS.length] + (i >= FUNDS.length ? ` ${Math.floor(i / FUNDS.length) + 1}` : ''),
    aum: AUM_VALUES[i % AUM_VALUES.length],
    dailyPnl: randPnl(-2.5, 3.0),
    weeklyPnl: randPnl(-5.0, 6.5),
    monthlyPnl: randPnl(-8.0, 10.0),
    ytd: randPnl(-12.0, 18.0),
  }));

  constructor() {
    console.log('HeavyAnalytics initialised');
  }
}
