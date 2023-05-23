import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionWrapperComponent } from './section-wrapper.component';

describe('SectionWrapperComponent', () => {
  let component: SectionWrapperComponent;
  let fixture: ComponentFixture<SectionWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
