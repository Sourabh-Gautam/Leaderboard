import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProfileComponent } from './manage-profile.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ViewProfileComponent } from '../view-profile/view-profile.component';
import { NgxPaginationModule } from 'ngx-pagination';

describe('ManageProfileComponent', () => {
  let component: ManageProfileComponent;
  let fixture: ComponentFixture<ManageProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProfileComponent, FooterComponent,
         HeaderComponent, ViewProfileComponent ],
         imports:[NgxPaginationModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
