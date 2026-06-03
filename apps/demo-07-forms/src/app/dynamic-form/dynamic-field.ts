import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig } from './field-config.model';

@Component({
  selector: 'app-dynamic-field',
  imports: [ReactiveFormsModule],
  template: `
    <div style="margin-bottom: 0.85rem" [formGroup]="group()">
      @if (field().type !== 'checkbox') {
        <label [for]="field().key">{{ field().label }}</label>
      }

      @switch (field().type) {
        @case ('text') {
          <input
            [id]="field().key"
            type="text"
            [formControlName]="field().key"
            [placeholder]="field().placeholder ?? ''"
            style="width:100%"
          />
        }
        @case ('number') {
          <input
            [id]="field().key"
            type="number"
            [formControlName]="field().key"
            [placeholder]="field().placeholder ?? ''"
            [min]="field().min ?? null"
            [max]="field().max ?? null"
            style="width:100%"
          />
        }
        @case ('select') {
          <select [id]="field().key" [formControlName]="field().key" style="width:100%">
            <option value="">-- Select --</option>
            @for (opt of field().options ?? []; track opt.value) {
              <option [value]="opt.value">{{ opt.label }}</option>
            }
          </select>
        }
        @case ('checkbox') {
          <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.25rem">
            <input
              [id]="field().key"
              type="checkbox"
              [formControlName]="field().key"
              style="width:auto"
            />
            <label [for]="field().key" style="margin:0">{{ field().label }}</label>
          </div>
        }
      }

      @if (control()?.invalid && control()?.touched) {
        @if (control()?.errors?.['required']) {
          <small class="error">{{ field().label }} is required.</small>
        }
        @if (control()?.errors?.['min']) {
          <small class="error">Minimum value is {{ field().min }}.</small>
        }
        @if (control()?.errors?.['max']) {
          <small class="error">Maximum value is {{ field().max }}.</small>
        }
      }
    </div>
  `,
})
export class DynamicField {
  field = input.required<FieldConfig>();
  group = input.required<FormGroup>();

  control() {
    return this.group().get(this.field().key);
  }
}
