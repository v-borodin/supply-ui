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
import { SupTargetObserver, SupFocusTracker } from '@supply/cdk';
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

  constructor(
    @Inject(SupFocusTracker)
    private focusTracker: SupFocusTracker,
    @Inject(SupTargetObserver) private targetObserver: SupTargetObserver,
    private cd: ChangeDetectorRef
  ) {
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
