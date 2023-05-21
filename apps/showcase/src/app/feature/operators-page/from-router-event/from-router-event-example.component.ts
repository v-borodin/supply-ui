import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { NavigationStart } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { fromRouterEvent, SupDestroyService } from '@supply/cdk';

@Component({
  standalone: true,
  selector: 'app-from-router-event-example',
  templateUrl: './from-router-event-example.component.html',
  styleUrls: ['./from-router-event-example.component.scss'],
  providers: [SupDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FromRouterEventExampleComponent {
  constructor(@Inject(SupDestroyService) destroy$: Observable<void>) {
    fromRouterEvent(NavigationStart) // <-- Router Event type
      .pipe(takeUntil(destroy$))
      .subscribe(event => {
        console.log(event);
      });
  }
}
