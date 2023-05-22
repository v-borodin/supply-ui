import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaPageComponent } from './textarea-page.component';

describe('TextareaComponent', () => {
  let component: TextareaPageComponent;
  let fixture: ComponentFixture<TextareaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextareaPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
