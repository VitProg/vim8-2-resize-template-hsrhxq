import {Inject, Injectable} from '@angular/core';
import {IConfig, ViewportSize} from './types';
import {fromEvent, Observable, ReplaySubject} from 'rxjs';
import {debounceTime, filter, map, startWith} from 'rxjs/operators';
import {isUndefined} from 'util';
import {VIEWPORT_RESIZE_SERVICE_CONFIG} from './di';

@Injectable({
  providedIn: 'root',
})
export class ViewportResizeService {
  protected oldWidth = -1;
  protected currentSize: ViewportSize | undefined;
  protected subject = new ReplaySubject<ViewportSize>();

  constructor(@Inject(VIEWPORT_RESIZE_SERVICE_CONFIG) protected config: IConfig) {
    fromEvent(window, 'resize')
      .pipe(
        startWith(0),
        debounceTime(50),
        map(() => {
          const newWidth = window.innerWidth;
          if (this.oldWidth !== newWidth) {
            this.oldWidth = newWidth;
            return this.getSize(newWidth);
          }
          return undefined;
        }),
        filter((i: ViewportSize | undefined) => !isUndefined(i)),
        filter((i: ViewportSize) => i !== this.currentSize),
      )
      .subscribe((size: ViewportSize) => {
        this.currentSize = size;
        this.subject.next(this.currentSize);
      });
  }

  get stream$(): Observable<ViewportSize> {
    return this.subject;
  }

  get size(): ViewportSize {
    return this.currentSize;
  }

  is(type: ViewportSize, width: number): boolean {
    switch (type) {
      case 'small':
        return width < this.config.medium;
      case 'large':
        return width >= this.config.large;
      case 'medium':
      default:
        return width >= this.config.medium && width < this.config.large;
    }
  }

  getSize(width: number): ViewportSize {
    if (this.is('small', width)) {
      return 'small';
    }
    if (this.is('medium', width)) {
      return 'medium';
    }
    if (this.is('large', width)) {
      return 'large';
    }
  }
}

/*
small: viewportWidth < config.medium
medium: config.medium <= viewportWidth < config.large
large: config.large <= viewportWidth
 */
