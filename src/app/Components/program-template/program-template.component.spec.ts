import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramTemplateComponent } from './program-template.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ViewProgramTemplateComponent } from '../view-program-template/view-program-template.component';
import { NgxPaginationModule } from 'ngx-pagination';

describe('ProgramTemplateComponent', () => {
  let component: ProgramTemplateComponent;
  let fixture: ComponentFixture<ProgramTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramTemplateComponent , FooterComponent,
         HeaderComponent, ViewProgramTemplateComponent],
         imports: [NgxPaginationModule]
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
