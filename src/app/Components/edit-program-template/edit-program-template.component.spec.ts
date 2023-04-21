import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgramTemplateComponent } from './edit-program-template.component';
import { FormsModule } from '@angular/forms';
import { ProgramTemplateService } from 'src/app/services/program-template.service';
import Swal from 'sweetalert2';
declare let window: any;
describe('EditProgramTemplateComponent', () => {
  let component: EditProgramTemplateComponent;
  let fixture: ComponentFixture<EditProgramTemplateComponent>;
  let mockProgramTemplateService;
  beforeEach(async () => {
    mockProgramTemplateService = jasmine.createSpyObj(['editProgramTemplate']);
    const modalMock = {
      show: jasmine.createSpy('show'),
      hide: jasmine.createSpy('hide'),
    };
    window.bootstrap = {
      Modal: jasmine.createSpy('Modal').and.returnValue(modalMock),
    };
    await TestBed.configureTestingModule({
      declarations: [EditProgramTemplateComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: ProgramTemplateService,
          useValue: mockProgramTemplateService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProgramTemplateComponent);
    component = fixture.componentInstance;
    component.programTemplate = {
      category: 'DSA',
      description: 'DSA details',
      weightage: '20',
      programTemplateId: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call programTemplateService.editProgramTemplate with the form value on handleeditProgramTemplate', async () => {
    const formValue = {
      category: 'DSA',
      description: 'DSA details',
      weightage: '20',
      programTemplateId: 1,
    };
    mockProgramTemplateService.editProgramTemplate.and.returnValue(
      Promise.resolve({ status: 202 })
    );
    spyOn(Swal, 'fire');

    await component.handleEditProgramTemplate(formValue);

    expect(mockProgramTemplateService.editProgramTemplate).toHaveBeenCalledWith(
      formValue,
      component.programTemplate.programTemplateId
    );
    spyOn(component, 'handleClosePopup');

    const closeButton = fixture.nativeElement.querySelector('.close');
    closeButton.click();
    expect(Swal.fire).toHaveBeenCalledWith('Updated');
    expect(component.handleClosePopup).toHaveBeenCalled();
  });
  it('show error message while edit wrong data in editProgramTemplate', async () => {
    const formValue = {
      category: 'DSA',
      weightage: '20',
      programTemplateId: 1,
    };
    mockProgramTemplateService.editProgramTemplate.and.returnValue(
      Promise.resolve({ status: 500 })
    );
    spyOn(Swal, 'fire');

    await component.handleEditProgramTemplate(formValue);

    expect(mockProgramTemplateService.editProgramTemplate).toHaveBeenCalledWith(
      formValue,
      component.programTemplate.programTemplateId
    );
    expect(Swal.fire).toHaveBeenCalledWith('Something went wrong');
  });
  it('should show error message if editProgramTemplate type fails', async () => {
    const formValue = {
      category: 'DSA',
      description: 'DSA details',
      weightage: '20',
      programTemplateId: 1,
    };
    mockProgramTemplateService.editProgramTemplate.and.returnValue(
      Promise.reject()
    );
    spyOn(Swal, 'fire');

    await component.handleEditProgramTemplate(formValue);

    expect(mockProgramTemplateService.editProgramTemplate).toHaveBeenCalledWith(
      formValue,
      component.programTemplate.programTemplateId
    );
    expect(Swal.fire).toHaveBeenCalledWith('Something went wrong');
  });
});
