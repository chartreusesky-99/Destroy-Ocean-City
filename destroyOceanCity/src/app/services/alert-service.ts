import { Injectable, signal } from '@angular/core';
import { Alert } from '../models/alert-model';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private nextId = 1;

  alerts = signal<Alert[]>([]);

  get alerts$() {
    return this.alerts;

  }

  addAlert(type: Alert['type'], message: string, dismissible = true) {
    const newAlert: Alert = { id: this.nextId++, type, message, dismissible };
    this.alerts.set([...this.alerts(), newAlert]);

  }

  removeAlert(id: number) {
    this.alerts.set(this.alerts().filter(a => a.id !== id));
    
  }
}
