import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContributortypeComponent } from './view-contributortype.component';

describe('ViewContributortypeComponent', () => {
  let component: ViewContributortypeComponent;
  let fixture: ComponentFixture<ViewContributortypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewContributortypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewContributortypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
