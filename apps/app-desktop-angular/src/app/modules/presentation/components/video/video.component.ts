import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { randomInt } from 'crypto';

@Component({
  templateUrl: `video.component.html`,
})
export class VideoComponent {
  safeSrc: SafeResourceUrl;
  repeat: string = "1"; //1: loop , 0: no loop
  url!: string;
  videoId!: string;
  videoList!: string[];
  id!: number;

  constructor(private sanitizer: DomSanitizer) {
    this.url = "https://www.youtube.com/embed/";
    this.videoList = ["c9F5kMUfFKk","lAsierVrHIo"];
    this.id = Math.floor(Math.random() * (this.videoList.length));
    this.videoId = this.videoList[this.id];
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(
      this.url + this.videoId + "?playlist=" + this.videoId + "&loop=" + this.repeat
      + "&rel=0&enablejsapi=1&loop=1&autoplay=1&controls=0"
    );


  }


}
