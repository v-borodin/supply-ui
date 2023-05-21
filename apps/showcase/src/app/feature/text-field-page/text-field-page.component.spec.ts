import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFieldPageComponent } from './text-field-page.component';

describe('TextFieldPageComponent', () => {
  let component: TextFieldPageComponent;
  let fixture: ComponentFixture<TextFieldPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextFieldPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextFieldPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
