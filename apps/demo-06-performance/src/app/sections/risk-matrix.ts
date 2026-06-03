import { Component } from '@angular/core';

interface RiskCell {
  value: number;
  level: 'low' | 'medium' | 'high' | 'critical';
}

const SECTORS = [
  'Financials', 'Technology', 'Healthcare', 'Energy',
  'Consumer', 'Industrials', 'Materials', 'Utilities',
  'Real Estate', 'Telecoms',
];

const RISK_LEVELS = ['Market Risk', 'Credit Risk', 'Liquidity Risk', 'Operational Risk'] as const;

function riskLevel(score: number): 'low' | 'medium' | 'high' | 'critical' {
  if (score < 25) return 'low';
  if (score < 50) return 'medium';
  if (score < 75) return 'high';
  return 'critical';
}

function cellBg(level: string): string {
  switch (level) {
    case 'low':      return '#d4edda';
    case 'medium':   return '#fff3cd';
    case 'high':     return '#f8d7da';
    case 'critical': return '#c82333';
    default:         return '#f4f6f9';
  }
}

function cellColor(level: string): string {
  return level === 'critical' ? 'white' : '#1a1f35';
}

@Component({
  selector: 'app-risk-matrix',
  template: `
    <div class="card">
      <h2>Risk Matrix — 10 Sectors × 4 Risk Levels</h2>
      <p style="color:#6b7280;font-size:0.85rem;margin-bottom:0.75rem">
        Loaded on viewport entry via <code>@defer (on viewport)</code>. Scroll down triggered this.
      </p>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:0.85rem">
          <thead>
            <tr style="background:#f8fafc">
              <th style="text-align:left;padding:0.5rem 0.75rem;border-bottom:2px solid #e2e8f0;min-width:120px">
                Sector
              </th>
              @for (riskLabel of riskLabels; track riskLabel) {
                <th style="padding:0.5rem 0.75rem;border-bottom:2px solid #e2e8f0;text-align:center;min-width:130px">
                  {{ riskLabel }}
                </th>
              }
            </tr>
          </thead>
          <tbody>
            @for (sector of sectors; track sector; let i = $index) {
              <tr style="border-bottom:1px solid #f1f5f9">
                <td style="padding:0.5rem 0.75rem;font-weight:600">{{ sector }}</td>
                @for (cell of matrix[i]; track $index) {
                  <td style="padding:0.5rem 0.75rem;text-align:center"
                      [style.background]="cellBg(cell.level)"
                      [style.color]="cellColor(cell.level)">
                    <strong>{{ cell.value }}</strong>
                    <div style="font-size:0.72rem;text-transform:uppercase;letter-spacing:0.04em;opacity:0.8">
                      {{ cell.level }}
                    </div>
                  </td>
                }
              </tr>
            }
          </tbody>
        </table>
      </div>
      <div style="margin-top:0.75rem;display:flex;gap:1rem;flex-wrap:wrap;font-size:0.8rem">
        <span style="background:#d4edda;padding:0.2rem 0.5rem;border-radius:4px">Low (&lt;25)</span>
        <span style="background:#fff3cd;padding:0.2rem 0.5rem;border-radius:4px">Medium (25–49)</span>
        <span style="background:#f8d7da;padding:0.2rem 0.5rem;border-radius:4px">High (50–74)</span>
        <span style="background:#c82333;color:white;padding:0.2rem 0.5rem;border-radius:4px">Critical (75+)</span>
      </div>
    </div>
  `,
})
export class RiskMatrix {
  readonly sectors = SECTORS;
  readonly riskLabels = RISK_LEVELS;

  readonly matrix: RiskCell[][] = SECTORS.map((_, si) =>
    RISK_LEVELS.map((_, ri) => {
      const value = Math.floor(((si * 11 + ri * 23 + 7) % 100));
      return { value, level: riskLevel(value) };
    })
  );

  readonly cellBg = cellBg;
  readonly cellColor = cellColor;

  constructor() {
    console.log('RiskMatrix initialised');
  }
}
