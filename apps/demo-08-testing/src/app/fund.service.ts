import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fund } from './fund.model';

@Injectable({ providedIn: 'root' })
export class FundService {
  private readonly http = inject(HttpClient);

  getFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>('/api/funds');
  }

  getFund(id: string): Observable<Fund> {
    return this.http.get<Fund>(`/api/funds/${id}`);
  }
}
