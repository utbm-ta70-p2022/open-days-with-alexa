import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoInformationModel } from '@libraries/lib-common';

@Component({
  selector: 'app-video',
  template: `<div style="height: calc(100% - 1rem)"><iframe [src]='safeSrc' width="100%" height="100%" frameborder="0" title="youtube-video"></iframe></div>`,
})
export class VideoComponent implements OnInit {
  @Input() information: VideoInformationModel;

  safeSrc!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

    this.information.src += 'rel=0&enablejsapi=1&autoplay=1&controls=0&disablekb=1';
    console.log(this.information.src);
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.information.src);
  }
}
