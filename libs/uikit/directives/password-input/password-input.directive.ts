import {
  Directive,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { MaskerRendererComponent } from './masker-renderer/masker-renderer.component';
import { SupDestroyService, SupFieldSimpleDirective } from '@supply/cdk';
import { Observable, takeUntil } from 'rxjs';

@Directive({
  selector: '[supPasswordInput]',
  providers: [SupDestroyService],
  standalone: true,
})
export class PasswordInputDirective
  extends SupFieldSimpleDirective
  implements OnInit
{
  @Input()
  size = `medium`;

  @HostBinding(`class`)
  get classes() {
    return `input-box ${this.size}`;
  }

  viewPassword = false;

  constructor(
    @Inject(ElementRef) { nativeElement }: ElementRef,
    @Inject(Renderer2) renderer: Renderer2,
    @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef,
    @Inject(SupDestroyService) destroy$: Observable<void>
  ) {
    super();

    viewContainerRef.clear();

    viewContainerRef
      .createComponent(MaskerRendererComponent)
      .instance.touched.pipe(takeUntil(destroy$))
      .subscribe(() => {
        this.viewPassword = !this.viewPassword;
        nativeElement.type = this.viewPassword ? `text` : `password`;
      });
  }
}
