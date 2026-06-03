import { Component } from '@angular/core';
import { FundList } from './fund-list';

interface TestFileSummary {
  file: string;
  description: string;
  concepts: string[];
}

@Component({
  selector: 'app-root',
  imports: [FundList],
  template: `
    <nav>
      <strong>Apex Asset Management</strong>
      <span>Advanced Angular — Module 8: Testing at Scale</span>
    </nav>

    <div style="padding:1.5rem;max-width:1100px;margin:0 auto">
      <h1 style="margin-bottom:0.25rem">Testing at Scale</h1>
      <p style="color:#6b7280;margin-bottom:1.5rem">
        Unit tests, integration tests, and end-to-end tests for an Angular
        application — using <strong>Vitest</strong>, <strong>TestBed</strong>,
        <strong>HttpTestingController</strong>, and <strong>Playwright</strong>.
      </p>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:1.5rem">
        <!-- Testing Guide card -->
        <div class="card" style="grid-column:1/-1">
          <h2>Testing Guide — Files to Explore</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem">
            @for (entry of testFiles; track entry.file) {
              <div style="border:1px solid #e5e7eb;border-radius:6px;padding:0.875rem">
                <div style="font-family:monospace;font-size:0.8rem;color:#1a3a6b;font-weight:600;margin-bottom:0.4rem">
                  {{ entry.file }}
                </div>
                <div style="font-size:0.82rem;color:#374151;margin-bottom:0.5rem">{{ entry.description }}</div>
                <ul style="margin:0;padding-left:1.1rem">
                  @for (concept of entry.concepts; track concept) {
                    <li style="font-size:0.78rem;color:#6b7280;margin-bottom:0.2rem">{{ concept }}</li>
                  }
                </ul>
              </div>
            }
          </div>
        </div>

        <!-- Live fund list -->
        <div class="card" style="grid-column:1/-1">
          <h2>Fund List (live component under test)</h2>
          <app-fund-list />
        </div>
      </div>
    </div>
  `,
})
export class App {
  readonly testFiles: TestFileSummary[] = [
    {
      file: 'fund-card.spec.ts',
      description: 'Component integration testing',
      concepts: [
        'TestBed.configureTestingModule()',
        'fixture.componentRef.setInput()',
        'data-testid selectors',
        'Output event assertions',
      ],
    },
    {
      file: 'fund.service.spec.ts',
      description: 'HttpTestingController',
      concepts: [
        'provideHttpClientTesting()',
        'expectOne() & flush()',
        'Request URL verification',
        'httpTesting.verify()',
      ],
    },
    {
      file: 'fund-list.spec.ts',
      description: 'Integration test with HTTP mocking',
      concepts: [
        'Loading state assertion',
        'Flushing HTTP in tests',
        'Child component rendering',
        'Signal-driven updates',
      ],
    },
    {
      file: 'e2e/fund-list.spec.ts',
      description: 'Playwright end-to-end test',
      concepts: [
        'page.goto() navigation',
        'getByTestId() locators',
        'toBeVisible() assertions',
        'webServer auto-start',
      ],
    },
  ];
}
