import { AfterViewInit, Compiler, Component, Injector, Input, NgModule, NgModuleRef, ViewChild, ViewContainerRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { TextInformationModel } from '@libraries/lib-common';
@Component({
  selector: 'app-text',
  template: `<ng-container #dynamicTemplate></ng-container>`
})

export class TextComponent implements AfterViewInit {
  @Input() information: TextInformationModel;

  @ViewChild('dynamicTemplate', {read: ViewContainerRef}) vc: ViewContainerRef;

  constructor(private _compiler: Compiler,
              private _injector: Injector,
              private _m: NgModuleRef<any>) {
  }

  ngAfterViewInit() {
    const template = '<span>generated on the fly: {{name}}</span>';
    const tmpCmp = Component({template: template})(class Dynamic {
    });
    const tmpModule = NgModule({
      declarations: [tmpCmp],
      imports: [BrowserModule],
      providers: [{provide: Compiler, useFactory: createJitCompiler}]
    })(class DynamicModule {});


    this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
      .then((factories) => {
        const f = factories.componentFactories[0];
        const cmpRef = this.vc.createComponent(f);
        cmpRef.instance.name = 'dynamic';
      })
  }
}

export function createJitCompiler() {
  return new JitCompilerFactory().createCompiler();
}
