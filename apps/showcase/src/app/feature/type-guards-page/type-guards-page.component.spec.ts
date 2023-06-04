import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeGuardsPageComponent } from './type-guards-page.component';

describe('TypeGuardsPageComponent', () => {
  let component: TypeGuardsPageComponent;
  let fixture: ComponentFixture<TypeGuardsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeGuardsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeGuardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
