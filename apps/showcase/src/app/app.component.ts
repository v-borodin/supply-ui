import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  SupTargetObserver,
  SupFocusTracker,
  SupSvgRegistry,
} from '@supply/cdk';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, forkJoin, of, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('inputRef', { read: ElementRef })
  private inputRef?: ElementRef;

  title = 'showcase';

  value = '';

  disabled = false;

  loading = false;

  inputControl = new FormControl('');

  user?: {
    name?: string;
  };

  stream1 = of([1, 2, 3, 4]);

  stream2 = of(['a', 'b', 'c', 'd']);

  icon = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="800px" height="800px" viewBox="0 0 16 16">
    <path
      d="M0 8c0-4.418 3.59-8 8-8 4.418 0 8 3.59 8 8 0 4.418-3.59 8-8 8-4.418 0-8-3.59-8-8zm2 0c0 3.307 2.686 6 6 6 3.307 0 6-2.686 6-6 0-3.307-2.686-6-6-6-3.307 0-6 2.686-6 6zm2 0c0-2.21 1.795-4 4-4 2.21 0 4 1.795 4 4 0 2.21-1.795 4-4 4-2.21 0-4-1.795-4-4zm2 0c0 1.112.895 2 2 2 1.112 0 2-.895 2-2 0-1.112-.895-2-2-2-1.112 0-2 .895-2 2z"
      fill-rule="evenodd"/>
  </svg>`;

  constructor(
    @Inject(SupFocusTracker)
    private focusTracker: SupFocusTracker,
    @Inject(SupTargetObserver) private targetObserver: SupTargetObserver,
    private cd: ChangeDetectorRef,
    private svg: SupSvgRegistry
  ) {
    this.svg.register('customIcon', this.icon);

    forkJoin([this.stream1, this.stream2])
      .pipe(tap(([{}]) => {}))
      .subscribe(v => {
        console.log(v);
      });
  }

  ngOnInit() {
    setTimeout(() => {
      this.user = {
        name: 'John Doe',
      };
      this.cd.markForCheck();
    }, 2000);

    this.targetObserver.activeTarget.subscribe(v => {
      console.log(v);
    });
  }

  ngAfterViewInit() {
    this.inputControl.valueChanges.pipe(distinctUntilChanged()).subscribe(v => {
      this.loading = true;
      this.cd.markForCheck();
    });
  }

  setLoading = (loading = true) => {
    this.loading = loading;
    setTimeout(() => {
      this.loading = false;
      this.cd.markForCheck();
    }, 3000);
  };
}
