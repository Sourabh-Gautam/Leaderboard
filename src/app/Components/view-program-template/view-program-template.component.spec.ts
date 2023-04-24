import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewProgramTemplateComponent } from './view-program-template.component';
import { ProgramTemplateService } from 'src/app/services/program-template.service';
import { of } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

describe('ViewProgramTemplateComponent', () => {
  let component: ViewProgramTemplateComponent;
  let fixture: ComponentFixture<ViewProgramTemplateComponent>;
  let programTemplateServiceSpy: jasmine.SpyObj<ProgramTemplateService>;

  beforeEach(async () => {
    programTemplateServiceSpy = jasmine.createSpyObj('ProgramTemplateService', [
      'getAllProgramTemplate',
      'deleteProgramTemplate',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ViewProgramTemplateComponent],
      imports: [RouterTestingModule, NgxPaginationModule, FormsModule],
      providers: [
        {
          provide: ProgramTemplateService,
          useValue: programTemplateServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProgramTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all program templates on initialization', async () => {
    const programTemplates = [
      {
        category: 'DSA',
        description: 'DSA details',
        weightage: '20',
      },
    ];
    programTemplateServiceSpy.getAllProgramTemplate.and.returnValue(
      Promise.resolve(programTemplates)
    );
    await component.getAllProgramTemplate();
    expect(component.programTemplates).toEqual(programTemplates);
    expect(component.totalRecords).toEqual(programTemplates.length);
  });

  it('should delete program template on handleDeleteProgramTemplate', async () => {
    const programTemplateId = 1;
    programTemplateServiceSpy.deleteProgramTemplate.and.returnValue(
      Promise.resolve()
    );
    spyOn(component, 'getAllProgramTemplate');
    await component.handleDeleteProgramTemplate({
      currentTarget: { nextSibling: { value: programTemplateId } },
    });
    expect(
      programTemplateServiceSpy.deleteProgramTemplate
    ).toHaveBeenCalledWith(programTemplateId);
    expect(component.getAllProgramTemplate).toHaveBeenCalled();
  });

  it('should set addPopup to true on handleAddProgramTemplate', () => {
    component.handleAddProgramTemplate();
    expect(component.addPopup).toBeTrue();
  });

  it('should set editPopup to true and programTemplate on handleEditProgramTemplate', () => {
    const programTemplate = { id: 1, name: 'template1' };
    component.handleEditProgramTemplate(programTemplate);
    expect(component.editPopup).toBeTrue();
    expect(component.programTemplate).toEqual(programTemplate);
  });

  it('should set editPopup to false on closeEditPopUp', () => {
    component.editPopup = true;
    component.closeEditPopUp();
    expect(component.editPopup).toBeFalse();
  });

  it('should set addPopup to false on closeAddPopUp', () => {
    component.addPopup = true;
    component.closeAddPopUp();
    expect(component.addPopup).toBeFalse();
  });

  describe('handleProgramTemplateExport', () => {
    it('should call dataExport on handleProgramTemplateExport', () => {
      const programTemplate = [
        { id: 1, name: 'program1' },
        { id: 2, name: 'program2' },
      ];
      component.programTemplates = programTemplate;
      spyOn(window, 'open');

      component.handleProgramTemplateExport();
    });
  });
});
