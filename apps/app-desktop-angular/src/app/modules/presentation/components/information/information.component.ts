import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AudioInformationModel,
  ImageInformationModel,
  InformationModel,
  TextInformationModel,
  VideoInformationModel,
} from '@libraries/lib-common';
import { Select } from '@ngxs/store';
import { PresentationTimerState } from '../../../../global/store/states/presentation-timer.state';
import { Observable } from 'rxjs';
import { InformationService } from '../../../../../app/global/services/information.service';
import { InformationNotHandledError } from '../../../../global/errors/information-not-handled.error';

@Component({
  template: `
    <p-progressBar
      *ngIf="counter$ | async as counter"
      styleClass="progress"
      [showValue]="false"
      [value]="(counter / this.currentInformation.displayDurationInSeconds) * 100"
    ></p-progressBar>
    <ngcontainer [ngSwitch]="currentInformationType">
      <app-audio *ngSwitchCase="'audio'" [information]="audioInformation"></app-audio>
      <app-image *ngSwitchCase="'image'" [information]="imageInformation"></app-image>
      <app-text *ngSwitchCase="'text'" [information]="textInformation"></app-text>
      <app-video *ngSwitchCase="'video'" [information]="videoInformation"></app-video>
    </ngcontainer>
  `,
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class InformationComponent implements OnInit {
  @Select(PresentationTimerState) counter$: Observable<number>;

  currentInformation: InformationModel;

  currentInformationType: 'audio' | 'image' | 'text' | 'video';

  constructor(
    private readonly _informationService: InformationService,
    private readonly _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentInformation = this._informationService.retrieveOrFail(this._activatedRoute.snapshot.params.id);

    if (this.currentInformation instanceof AudioInformationModel) {
      this.currentInformationType = 'audio';
    } else if (this.currentInformation instanceof ImageInformationModel) {
      this.currentInformationType = 'image';
    } else if (this.currentInformation instanceof TextInformationModel) {
      this.currentInformationType = 'text';
    } else if (this.currentInformation instanceof VideoInformationModel) {
      this.currentInformationType = 'video';
    } else {
      throw new InformationNotHandledError();
    }
  }

  get audioInformation(): AudioInformationModel {
    return this.currentInformation as AudioInformationModel;
  }

  get imageInformation(): ImageInformationModel {
    return this.currentInformation as ImageInformationModel;
  }

  get textInformation(): TextInformationModel {
    return this.currentInformation as TextInformationModel;
  }

  get videoInformation(): VideoInformationModel {
    return this.currentInformation as VideoInformationModel;
  }
}
