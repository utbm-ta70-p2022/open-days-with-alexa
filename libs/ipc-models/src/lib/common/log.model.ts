export class LogModel {
  message: string;
  level: 'debug' | 'info' | 'warning' | 'error';
  timestamp?: string;
}
