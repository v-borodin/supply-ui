import { ChangeDetectionStrategy, Component, Inject, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { outsideAngular, SupDestroyService } from '@supply/cdk';
import { fromEvent, Observable, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-outside-angular-example',
  templateUrl: './outside-angular-example.component.html',
  styleUrls: ['./outside-angular-example.component.scss'],
  providers: [SupDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutsideAngularExampleComponent {
  constructor(
    @Inject(DOCUMENT) document: Document,
    @Inject(NgZone) ngZone: NgZone,
    @Inject(SupDestroyService) destroy$: Observable<void>
  ) {
    fromEvent(document, 'scroll')
      .pipe(outsideAngular(ngZone), takeUntil(destroy$))
      .subscribe(event => {
        console.log(event); // <-- performed outside Angular zone
      });
  }
}
