import { Component, OnInit } from '@angular/core';
import { BlockUiService } from './global/services/block-ui.service';
import { IpcLogService } from './global/services/ipc-log.service';

@Component({
  selector: 'app-angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly _blockUiService: BlockUiService, private readonly _logService: IpcLogService) {}

  async ngOnInit() {
    this._logService.listen();
  }

  get $uiBlocked() {
    return this._blockUiService.$uiBlocked;
  }
}
