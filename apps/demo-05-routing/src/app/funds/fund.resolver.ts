import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Fund, FUNDS } from './fund.model';

export const fundResolver: ResolveFn<Fund | null> = (route) => {
  const id = route.paramMap.get('id') ?? '';
  const fund = FUNDS.get(id) ?? null;

  if (!fund) {
    inject(Router).navigate(['/portal/funds']);
    return null;
  }

  return fund;
};
