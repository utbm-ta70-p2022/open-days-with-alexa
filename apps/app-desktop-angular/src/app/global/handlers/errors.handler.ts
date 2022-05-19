import { ErrorHandler } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApplicationError } from '../errors/application.error';
import { ToastMessageService } from '../services/toast-message.service';
import { HttpErrorResponse } from '@angular/common/http';

export class ErrorsHandler implements ErrorHandler {
  constructor(private readonly toastMessageService: ToastMessageService) {}

  async handleError(error: any) {
    if (error.promise && error.rejection) {
      error = error.rejection;
    }

    if (!environment.production) {
      console.error(error);
    }

    if (error instanceof ApplicationError) {
      this.toastMessageService.showError(error.message, 'Un problème est survenu');
    } else if (error instanceof HttpErrorResponse) {
      if (error.url?.includes(environment.webserviceOrigin)) {
        this.toastMessageService.showError(error.error.message);
      }
    } else {
      this.toastMessageService.showError('Erreur inconnue', 'Un problème est survenu');
    }
  }
}
