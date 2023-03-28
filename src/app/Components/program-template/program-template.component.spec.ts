import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramTemplateComponent } from './program-template.component';

describe('ProgramTemplateComponent', () => {
  let component: ProgramTemplateComponent;
  let fixture: ComponentFixture<ProgramTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
