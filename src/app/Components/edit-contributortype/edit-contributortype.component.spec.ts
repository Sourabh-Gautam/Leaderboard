import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContributortypeComponent } from './edit-contributortype.component';

describe('EditContributortypeComponent', () => {
  let component: EditContributortypeComponent;
  let fixture: ComponentFixture<EditContributortypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditContributortypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditContributortypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
