import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {ViewportSize} from './types';
import {ViewportResizeService} from './viewport-resize.service';
import {Subscription} from 'rxjs';


@Directive({
  selector: '[ifViewportSize]',
})
export class IfViewportSizeDirective {
  protected hasView = false;
  protected subscribe: Subscription | undefined;

  @Input() set ifViewportSize(size: ViewportSize) {
    //
    if (this.subscribe) {
      this.subscribe.unsubscribe();
      this.subscribe = undefined;
    }

    this.subscribe = this.service.stream$.subscribe((viewportSize: ViewportSize) => {
      if (size === viewportSize) {
        this.show();
      } else {
        this.hide();
      }
    });
  }

  protected show() {
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.hasView = true;
  }

  protected hide() {
    this.viewContainer.clear();
    this.hasView = false;
  }

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected service: ViewportResizeService,
  ) { }

}
