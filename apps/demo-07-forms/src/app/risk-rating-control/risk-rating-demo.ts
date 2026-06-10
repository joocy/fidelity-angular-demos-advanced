import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RiskRatingControl } from './risk-rating.control';

@Component({
  selector: 'app-risk-rating-demo',
  imports: [ReactiveFormsModule, RiskRatingControl, JsonPipe],
  template: `
    <div class="card">
      <h2>Custom ControlValueAccessor — Risk Rating Selector</h2>

      <p style="color:#6b7280;font-size:0.88rem;margin-bottom:1rem">
        <code>RiskRatingControl</code> implements <code>ControlValueAccessor</code> and integrates
        seamlessly with Reactive Forms. The five-button widget below is a first-class form control.
      </p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" style="max-width:480px">
        <div style="margin-bottom:0.85rem">
          <label for="clientName">Client Name</label>
          <input
            id="clientName"
            type="text"
            formControlName="clientName"
            placeholder="Full name"
            style="width:100%"
          />
          @if (form.controls.clientName.invalid && form.controls.clientName.touched) {
            <small class="error">Client name is required.</small>
          }
        </div>

        <div style="margin-bottom:0.85rem">
          <label>Risk Tolerance</label>
          <app-risk-rating formControlName="riskTolerance" />
          @if (form.controls.riskTolerance.invalid && form.controls.riskTolerance.touched) {
            <small class="error">Please select a risk rating.</small>
          }
        </div>

        <div style="display:flex;gap:0.5rem;margin-top:1rem;flex-wrap:wrap">
          <button type="submit" class="btn-primary">Save Profile</button>
          <button type="button" class="btn-secondary" (click)="toggleDisabled()">
            {{ form.controls.riskTolerance.disabled ? 'Enable Control' : 'Disable Control' }}
          </button>
          <button type="button" class="btn-secondary" (click)="resetForm()">Reset</button>
        </div>
      </form>

      @if (submittedValue()) {
        <div style="margin-top:1.25rem;padding:0.75rem 1rem;background:#f0f4ff;border-radius:6px;border-left:3px solid #1a3a6b">
          <strong style="font-size:0.82rem;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em">Last Submitted</strong>
          <pre style="margin:0.5rem 0 0;font-size:0.85rem;color:#1a1f35">{{ submittedValue() | json }}</pre>
        </div>
      }

      <div style="margin-top:1.25rem;padding:0.75rem 1rem;background:#fafafa;border-radius:6px;border:1px solid #e2e8f0">
        <strong style="font-size:0.82rem;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em">Live Form Value</strong>
        <pre style="margin:0.5rem 0 0;font-size:0.85rem;color:#1a1f35">{{ form.getRawValue() | json }}</pre>
      </div>
    </div>
  `,
})
export class RiskRatingDemo {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    clientName: this.fb.control('', Validators.required),
    riskTolerance: this.fb.control<number | null>(null, Validators.required),
  });

  submittedValue = signal<Record<string, unknown> | null>(null);

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submittedValue.set(this.form.getRawValue() as Record<string, unknown>);
  }

  toggleDisabled(): void {
    const ctrl = this.form.controls.riskTolerance;
    if (ctrl.disabled) {
      ctrl.enable();
    } else {
      ctrl.disable();
    }
  }

  resetForm(): void {
    this.form.reset();
    this.submittedValue.set(null);
  }
}
