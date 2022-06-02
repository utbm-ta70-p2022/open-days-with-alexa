import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoInformationModel } from '@libraries/lib-common';

@Component({
  selector: 'app-video',
  template: `<iframe [src]='safeSrc' width="100%" height="100%" frameborder="0" title="youtube-video"></iframe>`,
})
export class VideoComponent implements OnInit {
  @Input() information: VideoInformationModel;

  safeSrc!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

    this.information.src += '?rel=0&enablejsapi=1&autoplay=1&controls=0&disablekb=1';
    console.log(this.information.src);
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.information.src);
  }

  // safeSrc: SafeResourceUrl;

  // repeat = '1'; // 1: loop , 0: no loop

  // url!: string;

  // videoId!: string;

  // videoList!: string[];

  // id!: number;

  // constructor(private sanitizer: DomSanitizer) {
  //   // this.url = 'https://www.youtube.com/embed/';
  //   // // this.videoList = ['c9F5kMUfFKk', 'lAsierVrHIo'];
  //   // // this.id = Math.floor(Math.random() * this.videoList.length);
  //   // // this.videoId = this.videoList[this.id];
  //   // this.videoId = this.information.src;
  //   // this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
  //   //   this.url +
  //   //     this.videoId +
  //   //     '?playlist=' +
  //   //     this.videoId +
  //   //     '&loop=' +
  //   //     this.repeat +
  //   //     '&rel=0&enablejsapi=1&loop=1&autoplay=1&controls=0'
  //   // );
  // }
}

// import { Pipe, PipeTransform } from '@angular/core';
// @Pipe({
//   name: 'safe'
// })
// export class SafePipe implements PipeTransform {

//   constructor(private sanitizer: DomSanitizer) { }
//   transform(url) {
//     return this.sanitizer.bypassSecurityTrustResourceUrl(url);
//   }

// }

// import { Pipe, PipeTransform } from '@angular/core';
// import {  SafeHtml, SafeStyle, SafeScript, SafeUrl } from '@angular/platform-browser';
// @Pipe({
//   name: 'safe',
// })
// export class SafePipe implements PipeTransform {
//   constructor(protected sanitizer: DomSanitizer) {}
//   public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
//     switch (type) {
//       case 'html':
//         return this.sanitizer.bypassSecurityTrustHtml(value);
//       case 'style':
//         return this.sanitizer.bypassSecurityTrustStyle(value);
//       case 'script':
//         return this.sanitizer.bypassSecurityTrustScript(value);
//       case 'url':
//         return this.sanitizer.bypassSecurityTrustUrl(value);
//       case 'resourceUrl':
//         return this.sanitizer.bypassSecurityTrustResourceUrl(value);
//       default:
//         throw new Error(`Invalid safe type specified: ${type}`);
//     }
//   }
// }
