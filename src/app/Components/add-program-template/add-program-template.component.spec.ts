/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramTemplateComponent } from './add-program-template.component';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProgramTemplateService } from 'src/app/services/program-template.service';
declare let window: any;
describe('AddProgramTemplateComponent', () => {
  let component: AddProgramTemplateComponent;
  let fixture: ComponentFixture<AddProgramTemplateComponent>;
  let mockProgramTemplateService;
  beforeEach(async () => {
    mockProgramTemplateService = jasmine.createSpyObj(['addProgramTemplate']);
    const modalMock = {
      show: jasmine.createSpy('show'),
      hide: jasmine.createSpy('hide'),
    };
    window.bootstrap = {
      Modal: jasmine.createSpy('Modal').and.returnValue(modalMock),
    };
    await TestBed.configureTestingModule({
      declarations: [AddProgramTemplateComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: ProgramTemplateService,
          useValue: mockProgramTemplateService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProgramTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call programTemplateService.addProgramTemplate with the form value on handleAddProgramTemplate', async () => {
    const formValue = {
      category: 'DSA',
      description: 'DSA details',
      weightage: '20',
    };
    mockProgramTemplateService.addProgramTemplate.and.returnValue(
      Promise.resolve({ status: 201 })
    );
    spyOn(Swal, 'fire');

    await component.handleAddProgramTemplate(formValue);

    expect(mockProgramTemplateService.addProgramTemplate).toHaveBeenCalledWith(
      formValue
    );
    spyOn(component, 'handleClosePopup');

    const closeButton = fixture.nativeElement.querySelector('.close');
    closeButton.click();
    expect(Swal.fire).toHaveBeenCalledWith('Added');
    expect(component.handleClosePopup).toHaveBeenCalled();
  });
  it('show error message while adding wrong data in addProgramTemplate', async () => {
    const formValue = {
      category: 'DSA',
      weightage: '20',
    };
    mockProgramTemplateService.addProgramTemplate.and.returnValue(
      Promise.resolve({ status: 500 })
    );
    spyOn(Swal, 'fire');

    await component.handleAddProgramTemplate(formValue);

    expect(mockProgramTemplateService.addProgramTemplate).toHaveBeenCalledWith(
      formValue
    );
    expect(Swal.fire).toHaveBeenCalledWith('Something went wrong !');
  });
  it('should show error message if adding ProgramTemplate type fails', async () => {
    const formValue = {
      category: 'DSA',
      description: 'DSA details',
      weightage: '20',
    };
    mockProgramTemplateService.addProgramTemplate.and.returnValue(
      Promise.reject()
    );
    spyOn(Swal, 'fire');

    await component.handleAddProgramTemplate(formValue);

    expect(mockProgramTemplateService.addProgramTemplate).toHaveBeenCalledWith(
      formValue
    );
    expect(Swal.fire).toHaveBeenCalledWith('Something went wrong !');
  });
});
