import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  constructor(private readonly _messageService: MessageService) {}

  showSuccess(message: string) {
    this._messageService.add({ key: 'global-toast', severity: 'success', summary: 'Success', detail: message });
  }

  showInfo(message: string) {
    this._messageService.add({ key: 'global-toast', severity: 'info', summary: 'Information', detail: message });
  }

  showWarning(message: string) {
    this._messageService.add({ key: 'global-toast', severity: 'warn', summary: 'Warning', detail: message });
  }

  showError(message: string) {
    this._messageService.add({ key: 'global-toast', severity: 'error', summary: 'Error', detail: message });
  }
}
