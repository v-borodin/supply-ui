import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { fromEvent, Observable, takeUntil } from 'rxjs';
import { preventDefault, SupDestroyService } from '@supply/cdk';
import { SupButtonComponent } from '@supply/uikit';

@Component({
  standalone: true,
  selector: 'app-prevent-default-example',
  imports: [SupButtonComponent],
  templateUrl: './prevent-default-example.component.html',
  styleUrls: ['./prevent-default-example.component.scss'],
  providers: [SupDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreventDefaultExampleComponent implements AfterViewInit {
  @ViewChild('anchor', { static: true, read: ElementRef })
  link!: ElementRef<HTMLAnchorElement>;

  constructor(@Inject(SupDestroyService) private destroy$: Observable<void>) {}

  ngAfterViewInit(): void {
    fromEvent(this.link.nativeElement, 'click')
      .pipe(preventDefault(), takeUntil(this.destroy$))
      .subscribe(event => {
        console.log(event);
      });
  }
}
