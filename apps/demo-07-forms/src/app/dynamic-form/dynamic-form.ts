import { Component, effect, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormConfig } from './field-config.model';
import { DynamicField } from './dynamic-field';

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule, DynamicField],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <h3 style="margin-bottom:1rem;color:#1a3a6b">{{ config().title }}</h3>

      @for (field of config().fields; track field.key) {
        <app-dynamic-field [field]="field" [group]="form" />
      }

      <div style="margin-top:1rem;display:flex;gap:0.5rem">
        <button type="submit" class="btn-primary">Submit</button>
        <button type="button" class="btn-secondary" (click)="onReset()">Reset</button>
      </div>
    </form>
  `,
})
export class DynamicForm {
  config = input.required<FormConfig>();
  submitted = output<Record<string, unknown>>();

  private fb = inject(NonNullableFormBuilder);
  form = this.fb.group({});

  constructor() {
    effect(() => {
      this.buildForm(this.config());
    });
  }

  private buildForm(config: FormConfig): void {
    const controls: Record<string, ReturnType<NonNullableFormBuilder['control']>> = {};

    for (const field of config.fields) {
      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }
      if (field.min !== undefined) {
        validators.push(Validators.min(field.min));
      }
      if (field.max !== undefined) {
        validators.push(Validators.max(field.max));
      }

      const defaultValue: string | number | boolean =
        field.type === 'checkbox' ? false
        : field.type === 'number' ? ('' as unknown as number)
        : '';

      controls[field.key] = this.fb.control(defaultValue, validators);
    }

    // Replace the form's controls entirely
    // Remove old controls
    Object.keys(this.form.controls).forEach(key => this.form.removeControl(key as never));
    // Add new controls
    Object.entries(controls).forEach(([key, ctrl]) => this.form.addControl(key as never, ctrl as never));
    this.form.reset();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit(this.form.getRawValue() as Record<string, unknown>);
  }

  onReset(): void {
    this.form.reset();
  }
}
