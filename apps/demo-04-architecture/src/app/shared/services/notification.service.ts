import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly messages = signal<string[]>([]);

  notify(msg: string): void {
    this.messages.update(prev => [...prev, msg]);
  }

  dismiss(index: number): void {
    this.messages.update(prev => prev.filter((_, i) => i !== index));
  }
}
