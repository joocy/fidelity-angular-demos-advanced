import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const stopLossValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const side = group.get('side')?.value as string;
  const entryPrice = Number(group.get('entryPrice')?.value);
  const stopLoss = Number(group.get('stopLoss')?.value);

  if (side === 'buy' && stopLoss >= entryPrice && entryPrice > 0 && stopLoss > 0) {
    return { stopLossTooHigh: true };
  }
  return null;
};

export const takeProfitValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const side = group.get('side')?.value as string;
  const entryPrice = Number(group.get('entryPrice')?.value);
  const takeProfit = Number(group.get('takeProfit')?.value);

  if (side === 'buy' && takeProfit <= entryPrice && entryPrice > 0 && takeProfit > 0) {
    return { takeProfitTooLow: true };
  }
  return null;
};
