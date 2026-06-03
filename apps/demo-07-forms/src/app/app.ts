import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicForm } from './dynamic-form/dynamic-form';
import { RiskRatingDemo } from './risk-rating-control/risk-rating-demo';
import { TradeRiskForm } from './cross-validation/trade-risk-form';
import { NEW_CLIENT_FORM, TRADE_ORDER_FORM } from './dynamic-form/form-configs';
import { FormConfig } from './dynamic-form/field-config.model';

type Tab = 'dynamic' | 'cva' | 'crossvalidation';

@Component({
  selector: 'app-root',
  imports: [FormsModule, JsonPipe, DynamicForm, RiskRatingDemo, TradeRiskForm],
  template: `
    <nav>
      <strong>Apex Asset Management</strong>
      <span>Advanced Angular — Module 7: Advanced Forms &amp; UX Patterns</span>
    </nav>

    <div style="padding:1.5rem;max-width:900px;margin:0 auto">
      <h1 style="margin-bottom:0.25rem">Advanced Forms &amp; UX Patterns</h1>
      <p style="color:#6b7280;margin-bottom:1.5rem">
        Dynamic form engine driven by configuration, a custom
        <strong>ControlValueAccessor</strong> risk-rating widget, and cross-field validators
        enforcing trade risk rules — all built with Reactive Forms in a zoneless Angular 21 app.
      </p>

      <!-- Tab bar -->
      <div style="display:flex;gap:0.5rem;margin-bottom:1.5rem;border-bottom:2px solid #e2e8f0;padding-bottom:0">
        <button
          class="tab-btn"
          [class.tab-active]="activeTab() === 'dynamic'"
          (click)="activeTab.set('dynamic')"
          style="padding:0.5rem 1.1rem;border:none;background:none;cursor:pointer;font-size:0.9rem;font-weight:600;color:#6b7280;border-bottom:2px solid transparent;margin-bottom:-2px"
          [style.color]="activeTab() === 'dynamic' ? '#1a3a6b' : '#6b7280'"
          [style.border-bottom-color]="activeTab() === 'dynamic' ? '#1a3a6b' : 'transparent'"
        >
          1. Dynamic Form Engine
        </button>
        <button
          class="tab-btn"
          [class.tab-active]="activeTab() === 'cva'"
          (click)="activeTab.set('cva')"
          style="padding:0.5rem 1.1rem;border:none;background:none;cursor:pointer;font-size:0.9rem;font-weight:600;color:#6b7280;border-bottom:2px solid transparent;margin-bottom:-2px"
          [style.color]="activeTab() === 'cva' ? '#1a3a6b' : '#6b7280'"
          [style.border-bottom-color]="activeTab() === 'cva' ? '#1a3a6b' : 'transparent'"
        >
          2. Custom Form Control
        </button>
        <button
          class="tab-btn"
          [class.tab-active]="activeTab() === 'crossvalidation'"
          (click)="activeTab.set('crossvalidation')"
          style="padding:0.5rem 1.1rem;border:none;background:none;cursor:pointer;font-size:0.9rem;font-weight:600;color:#6b7280;border-bottom:2px solid transparent;margin-bottom:-2px"
          [style.color]="activeTab() === 'crossvalidation' ? '#1a3a6b' : '#6b7280'"
          [style.border-bottom-color]="activeTab() === 'crossvalidation' ? '#1a3a6b' : 'transparent'"
        >
          3. Cross-Field Validation
        </button>
      </div>

      <!-- Tab: Dynamic Form Engine -->
      @if (activeTab() === 'dynamic') {
        <div class="card">
          <h2>Dynamic Form Engine</h2>

          <p style="color:#6b7280;font-size:0.88rem;margin-bottom:1rem">
            The form below is constructed entirely from a <code>FormConfig</code> object at runtime —
            no hardcoded template fields. Switch configs to see the form rebuild itself using
            <code>NonNullableFormBuilder</code>.
          </p>

          <div style="margin-bottom:1.25rem;display:flex;align-items:center;gap:0.75rem">
            <label style="margin:0;white-space:nowrap" for="formSelect">Active config:</label>
            <select id="formSelect" [(ngModel)]="selectedConfigKey" (ngModelChange)="onConfigChange($event)" style="min-width:220px">
              <option value="newClient">New Client Onboarding</option>
              <option value="tradeOrder">Trade Order Entry</option>
            </select>
          </div>

          <app-dynamic-form
            [config]="activeConfig()"
            (submitted)="onFormSubmitted($event)"
          />
        </div>

        @if (lastSubmission()) {
          <div class="card" style="border-left:3px solid #1a3a6b">
            <h2>Last Submitted Value</h2>
            <pre style="margin:0;font-size:0.85rem;color:#1a1f35;white-space:pre-wrap">{{ lastSubmission() | json }}</pre>
          </div>
        }
      }

      <!-- Tab: Custom Form Control (CVA) -->
      @if (activeTab() === 'cva') {
        <app-risk-rating-demo />
      }

      <!-- Tab: Cross-Field Validation -->
      @if (activeTab() === 'crossvalidation') {
        <app-trade-risk-form />
      }
    </div>
  `,
})
export class App {
  activeTab = signal<Tab>('dynamic');

  selectedConfigKey = 'newClient';

  private configs: Record<string, FormConfig> = {
    newClient: NEW_CLIENT_FORM,
    tradeOrder: TRADE_ORDER_FORM,
  };

  activeConfig = signal<FormConfig>(NEW_CLIENT_FORM);
  lastSubmission = signal<Record<string, unknown> | null>(null);

  onConfigChange(key: string): void {
    this.activeConfig.set(this.configs[key]);
    this.lastSubmission.set(null);
  }

  onFormSubmitted(value: Record<string, unknown>): void {
    this.lastSubmission.set(value);
  }
}
