import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContributortypeComponent } from './add-contributortype.component';

describe('AddContributortypeComponent', () => {
  let component: AddContributortypeComponent;
  let fixture: ComponentFixture<AddContributortypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContributortypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContributortypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
