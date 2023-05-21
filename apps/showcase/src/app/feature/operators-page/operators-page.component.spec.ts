import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorsPageComponent } from './operators-page.component';

describe('OperatorsPageComponent', () => {
  let component: OperatorsPageComponent;
  let fixture: ComponentFixture<OperatorsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
