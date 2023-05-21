import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerPageComponent } from './date-picker-page.component';

describe('DatePickerPageComponent', () => {
  let component: DatePickerPageComponent;
  let fixture: ComponentFixture<DatePickerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePickerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
