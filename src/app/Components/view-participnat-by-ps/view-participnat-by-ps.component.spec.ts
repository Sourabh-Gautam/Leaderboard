import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParticipnatByPsComponent } from './view-participnat-by-ps.component';

describe('ViewParticipnatByPsComponent', () => {
  let component: ViewParticipnatByPsComponent;
  let fixture: ComponentFixture<ViewParticipnatByPsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewParticipnatByPsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewParticipnatByPsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
