import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParticipantContributionsComponent } from './view-participant-contributions.component';

describe('ViewParticipantContributionsComponent', () => {
  let component: ViewParticipantContributionsComponent;
  let fixture: ComponentFixture<ViewParticipantContributionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewParticipantContributionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewParticipantContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
