import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgramComponent } from './edit-program.component';
import { FormsModule } from '@angular/forms';
import { ProgramService } from 'src/app/services/program.service';
import { ProgramTemplateService } from 'src/app/services/program-template.service';
import Swal from 'sweetalert2';
declare let window: any;
describe('EditProgramComponent', () => {
  let component: EditProgramComponent;
  let fixture: ComponentFixture<EditProgramComponent>;
  let mockProgramService;
  let programTemplateServiceSpy;

  beforeEach(async () => {
    mockProgramService = jasmine.createSpyObj(['updateProgram']);
    programTemplateServiceSpy = jasmine.createSpyObj(['getAllProgramTemplate']);
    const modalMock = {
      show: jasmine.createSpy('show'),
      hide: jasmine.createSpy('hide'),
    };
    window.bootstrap = {
      Modal: jasmine.createSpy('Modal').and.returnValue(modalMock),
    };
    await TestBed.configureTestingModule({
      declarations: [EditProgramComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: ProgramService,
          useValue: mockProgramService,
        },
        {
          provide: ProgramTemplateService,
          useValue: programTemplateServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProgramComponent);
    component = fixture.componentInstance;
    component.program = {
      programId: 1,
      category: 'DSA',
      description: 'DSA details',
      title: 'dsa1',
      addedBy: 'sneka',
      startDate: '20/02/2022',
      endDate: '20/02/2022',
      weightage: '20',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call editProgram method on ProgramService when handleeditProgram is called', async () => {
    const formValue = {
      category: 'DSA',
      description: 'DSA details',
      title: 'dsa1',
      addedBy: 'sneka',
      startDate: '20/02/2022',
      endDate: '20/02/2022',
      weightage: '20',
    };
    mockProgramService.updateProgram.and.returnValue(
      Promise.resolve({ status: 202 })
    );
    spyOn(Swal, 'fire');

    await component.handleEditProgram(formValue);

    expect(mockProgramService.updateProgram).toHaveBeenCalledWith(
      formValue,
      component.program.programId
    );
    spyOn(component, 'handleClosePopup');

    const closeButton = fixture.nativeElement.querySelector('.close');
    closeButton.click();
    expect(Swal.fire).toHaveBeenCalledWith('Updated');
    expect(component.handleClosePopup).toHaveBeenCalled();
  });
  it('show error message while adding wrong data in editProgram', async () => {
    const formValue = {
      category: 'DSA',
      description: 'DSA details',
      title: 'dsa1',
      addedBy: 'sneka',
      startDate: '20/02/2022',
      endDate: '20/02/2022',
      weightage: '20',
    };
    mockProgramService.updateProgram.and.returnValue(
      Promise.resolve({ status: 500 })
    );
    spyOn(Swal, 'fire');

    await component.handleEditProgram(formValue);

    expect(mockProgramService.updateProgram).toHaveBeenCalledWith(
      formValue,
      component.program.programId
    );
    expect(Swal.fire).toHaveBeenCalledWith('Some went wrong');
  });
  it('should show error message if adding ProgramTemplate type fails', async () => {
    const formValue = {
      category: 'DSA',
      description: 'DSA details',
      title: 'dsa1',
      addedBy: 'sneka',
      startDate: '20/02/2022',
      endDate: '20/02/2022',
      weightage: '20',
    };
    mockProgramService.updateProgram.and.returnValue(Promise.reject());
    spyOn(Swal, 'fire');

    await component.handleEditProgram(formValue);

    expect(mockProgramService.updateProgram).toHaveBeenCalledWith(
      formValue,
      component.program.programId
    );
    expect(Swal.fire).toHaveBeenCalledWith('Some went wrong');
  });
  it('should call getAllProgramTemplate method on ProgramTemplateService when ngOninit is called', async () => {
    const data = [
      {
        contributerType: 'type',
        points: '10',
        id: '1',
      },
    ];
    programTemplateServiceSpy.getAllProgramTemplate.and.returnValue(
      Promise.resolve(data)
    );
    await component.ngOnInit();
    expect(component.categoryList).toEqual(data);
    expect(
      programTemplateServiceSpy.getAllProgramTemplate
    ).toHaveBeenCalledWith();
  });
});
