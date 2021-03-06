import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  constructor(private readonly _messageService: MessageService) {}

  showSuccess(message: string, title = 'Succès') {
    this._messageService.add({ key: 'global-toast', severity: 'success', summary: title, detail: message });
  }

  showInfo(message: string, title = 'Information') {
    this._messageService.add({ key: 'global-toast', severity: 'info', summary: title, detail: message });
  }

  showWarning(message: string, title = 'Attention') {
    this._messageService.add({ key: 'global-toast', severity: 'warn', summary: title, detail: message });
  }

  showError(message: string, title = 'Erreur') {
    this._messageService.add({ key: 'global-toast', severity: 'error', summary: title, detail: message });
  }
}
