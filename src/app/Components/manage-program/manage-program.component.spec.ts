import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProgramComponent } from './manage-program.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserHeaderComponent } from '../user-header/user-header.component';
import { ViewProgramComponent } from '../view-program/view-program.component';
import { NgxPaginationModule } from 'ngx-pagination';

describe('ManageProgramComponent', () => {
  let component: ManageProgramComponent;
  let fixture: ComponentFixture<ManageProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProgramComponent, HeaderComponent, FooterComponent, UserHeaderComponent,
      ViewProgramComponent ],
      imports:[NgxPaginationModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
