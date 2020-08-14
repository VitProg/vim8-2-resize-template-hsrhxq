import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HelloComponent} from './hello.component';
import {TestComponent} from './test.component';
import {IfViewportSizeDirective} from './viewport-size/if-viewport-size.directive';
import {ViewportResizeService} from './viewport-size/viewport-resize.service';
import {VIEWPORT_RESIZE_SERVICE_CONFIG} from './viewport-size/di';


@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HelloComponent, TestComponent, IfViewportSizeDirective],
  bootstrap: [AppComponent],
  providers: [
    ViewportResizeService,
    {
      provide: VIEWPORT_RESIZE_SERVICE_CONFIG,
      useValue: {
        medium: 400,
        large: 800,
      },
    },
  ],
})
export class AppModule {
}
