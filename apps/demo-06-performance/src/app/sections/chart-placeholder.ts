import { Component } from '@angular/core';

@Component({
  selector: 'app-chart-placeholder',
  template: `
    <div class="card">
      <h2>Chart: Portfolio Performance</h2>
      <p style="color:#6b7280;font-size:0.85rem;margin-bottom:1rem">
        Loaded after a 2-second timer via <code>&#64;defer (on timer(2000))</code>.
        Simulates deferring a heavyweight charting library until it's actually needed.
      </p>

      <div class="chart-wrapper">
        <div class="chart-y-labels">
          <span>120</span>
          <span>115</span>
          <span>110</span>
          <span>105</span>
          <span>100</span>
        </div>

        <div class="chart-area">
          <svg viewBox="0 0 600 220" preserveAspectRatio="none" style="width:100%;height:220px;display:block">
            <!-- Grid lines -->
            <line x1="0" y1="44"  x2="600" y2="44"  stroke="#f1f5f9" stroke-width="1"/>
            <line x1="0" y1="88"  x2="600" y2="88"  stroke="#f1f5f9" stroke-width="1"/>
            <line x1="0" y1="132" x2="600" y2="132" stroke="#f1f5f9" stroke-width="1"/>
            <line x1="0" y1="176" x2="600" y2="176" stroke="#f1f5f9" stroke-width="1"/>

            <!-- Benchmark line (grey) -->
            <polyline
              points="0,176 75,170 150,162 225,165 300,155 375,148 450,143 525,138 600,132"
              fill="none"
              stroke="#9ca3af"
              stroke-width="2"
              stroke-dasharray="6 3"/>

            <!-- Fund area fill -->
            <polygon
              points="0,176 75,160 150,140 225,150 300,120 375,100 450,88 525,72 600,55 600,220 0,220"
              fill="rgba(26,58,107,0.08)"/>

            <!-- Fund performance line (navy) -->
            <polyline
              points="0,176 75,160 150,140 225,150 300,120 375,100 450,88 525,72 600,55"
              fill="none"
              stroke="#1a3a6b"
              stroke-width="2.5"
              stroke-linejoin="round"
              stroke-linecap="round"/>

            <!-- Data point dots -->
            <circle cx="0"   cy="176" r="4" fill="#1a3a6b"/>
            <circle cx="75"  cy="160" r="4" fill="#1a3a6b"/>
            <circle cx="150" cy="140" r="4" fill="#1a3a6b"/>
            <circle cx="225" cy="150" r="4" fill="#1a3a6b"/>
            <circle cx="300" cy="120" r="4" fill="#1a3a6b"/>
            <circle cx="375" cy="100" r="4" fill="#1a3a6b"/>
            <circle cx="450" cy="88"  r="4" fill="#1a3a6b"/>
            <circle cx="525" cy="72"  r="4" fill="#1a3a6b"/>
            <circle cx="600" cy="55"  r="4" fill="#1a3a6b"/>
          </svg>

          <div class="chart-x-labels">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
            <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
          </div>
        </div>
      </div>

      <div style="display:flex;gap:1.5rem;margin-top:0.75rem;font-size:0.82rem">
        <span style="display:flex;align-items:center;gap:0.35rem">
          <span style="display:inline-block;width:20px;height:3px;background:#1a3a6b;border-radius:2px"></span>
          Apex UK Equity Fund
        </span>
        <span style="display:flex;align-items:center;gap:0.35rem">
          <span style="display:inline-block;width:20px;height:2px;background:#9ca3af;border-radius:2px;border-top:1px dashed #9ca3af"></span>
          FTSE All-Share Benchmark
        </span>
      </div>

      <div style="margin-top:1rem;display:flex;gap:1.5rem;flex-wrap:wrap">
        <div style="text-align:center">
          <div style="font-size:1.25rem;font-weight:700;color:#155724">+21.4%</div>
          <div style="font-size:0.78rem;color:#6b7280">Fund YTD</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:1.25rem;font-weight:700;color:#6b7280">+8.6%</div>
          <div style="font-size:0.78rem;color:#6b7280">Benchmark YTD</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:1.25rem;font-weight:700;color:#155724">+12.8%</div>
          <div style="font-size:0.78rem;color:#6b7280">Alpha</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chart-wrapper {
      display: flex;
      gap: 0.5rem;
      align-items: stretch;
    }
    .chart-y-labels {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 0.75rem;
      color: #9ca3af;
      padding-bottom: 1.5rem;
      text-align: right;
      min-width: 2rem;
    }
    .chart-area {
      flex: 1;
      min-width: 0;
    }
    .chart-x-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: #9ca3af;
      margin-top: 0.25rem;
      padding: 0 2px;
    }
  `],
})
export class ChartPlaceholder {
  constructor() {
    console.log('ChartPlaceholder initialised');
  }
}
