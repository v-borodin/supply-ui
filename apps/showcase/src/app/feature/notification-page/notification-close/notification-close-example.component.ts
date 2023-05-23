import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SupButtonComponent, SupNotificationComponent } from '@supply/uikit';
import { finalize, retry } from 'rxjs';

const API_URL = 'https://jsonplaceholder.typicode.com';

@Component({
  standalone: true,
  selector: 'app-notification-close',
  imports: [NgIf, SupNotificationComponent, SupButtonComponent],
  templateUrl: './notification-close-example.component.html',
  styleUrls: ['./notification-close-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationCloseExampleComponent implements OnInit {
  loading = false;

  errorMsg: string | null = null;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.loading = true;
    this.http
      .get(`${API_URL}/todos/0`) // <-- intentionally invalid id '0'
      .pipe(
        retry({ count: 3, delay: 750 }),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        error: err => (this.errorMsg = err.message),
      });
  }
}
