import './polyfills';

import {enableProdMode, NgModuleRef} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule).then((ref: NgModuleRef<AppModule>) => {
  // Ensure Angular destroys itself on hot reloads.
  if ((window as any).ngRef) {
    (window as any).ngRef.destroy();
  }
  (window as any).ngRef = ref;

  // Otherise, log the boot error
}).catch((err: Error) => console.error(err));
