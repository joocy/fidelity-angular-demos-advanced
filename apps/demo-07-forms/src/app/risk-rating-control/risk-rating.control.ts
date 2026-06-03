import { Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-risk-rating',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RiskRatingControl),
      multi: true,
    },
  ],
  template: `
    <div class="risk-slider">
      @for (opt of options; track opt.value) {
        <button
          type="button"
          class="risk-btn"
          [class.selected]="value() === opt.value"
          (click)="select(opt.value)"
          [disabled]="isDisabled()"
        >
          {{ opt.label }}
        </button>
      }
    </div>
  `,
})
export class RiskRatingControl implements ControlValueAccessor {
  options = [
    { value: 1, label: '1 Very Low' },
    { value: 2, label: '2 Low' },
    { value: 3, label: '3 Medium' },
    { value: 4, label: '4 High' },
    { value: 5, label: '5 Very High' },
  ];

  value = signal<number | null>(null);
  isDisabled = signal(false);

  private onChange: (v: number) => void = () => {};
  private onTouched: () => void = () => {};

  select(v: number): void {
    this.value.set(v);
    this.onChange(v);
    this.onTouched();
  }

  writeValue(v: number): void {
    this.value.set(v);
  }

  registerOnChange(fn: (v: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(d: boolean): void {
    this.isDisabled.set(d);
  }
}
