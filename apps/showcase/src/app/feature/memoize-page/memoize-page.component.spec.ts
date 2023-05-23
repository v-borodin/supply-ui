import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoizePageComponent } from './memoize-page.component';

describe('MemoizePageComponent', () => {
  let component: MemoizePageComponent;
  let fixture: ComponentFixture<MemoizePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoizePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoizePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
