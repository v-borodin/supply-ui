import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionLazyContentExampleComponent } from './accordion-lazy-content-example.component';

describe('AccordionLazyContentExampleComponent', () => {
  let component: AccordionLazyContentExampleComponent;
  let fixture: ComponentFixture<AccordionLazyContentExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AccordionLazyContentExampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionLazyContentExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
