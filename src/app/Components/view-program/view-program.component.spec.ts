/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewProgramComponent } from './view-program.component';
import { ProgramService } from 'src/app/services/program.service';
import { ProgramTemplateService } from 'src/app/services/program-template.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

describe('ViewProgramComponent', () => {
  let component: ViewProgramComponent;
  let fixture: ComponentFixture<ViewProgramComponent>;
  let programService: ProgramService;
  let programTemplateService: ProgramTemplateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, NgxPaginationModule],

      declarations: [ViewProgramComponent],
      providers: [ProgramService, ProgramTemplateService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProgramComponent);
    component = fixture.componentInstance;
    programService = TestBed.inject(ProgramService);
    programTemplateService = TestBed.inject(ProgramTemplateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllPrograms on component initialization', () => {
    spyOn(component, 'getAllPrograms');
    component.ngOnInit();
  });

  it('should retrieve programs from ProgramService', async () => {
    const programs = [
      { id: 1, name: 'program1' },
      { id: 2, name: 'program2' },
    ];
    spyOn(programService, 'getAllPrograms').and.returnValue(
      Promise.resolve(programs)
    );
    await component.getAllPrograms();
    expect(programService.getAllPrograms).toHaveBeenCalled();
    expect(component.programs).toEqual(programs);
  });

  it('should handle program deletion', async () => {
    const programId = 1;
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(programService, 'deleteProgram').and.returnValue(Promise.resolve());
    spyOn(component, 'getAllPrograms');
    await component.handleDeleteProgram({
      currentTarget: { nextSibling: { value: programId } },
    } as any);
    expect(programService.deleteProgram).toHaveBeenCalledWith(programId);
    expect(component.getAllPrograms).toHaveBeenCalled();
  });
  describe('handleProfileExport', () => {
    it('should call the dataExport function with the program data and a filename', () => {
      const programs = [
        { id: 1, name: 'program1' },
        { id: 2, name: 'program2' },
      ];
      component.programs = programs;
      spyOn(window, 'open');

      component.handleProgramExport();
    });
  });
  it('should set editPopup to true and set program when handleEditProgram is called', async () => {
    const programs = [
      { id: 1, name: 'program1' },
      { id: 2, name: 'program2' },
    ];
    await component.handleEditProgram(programs);
    expect(component.editPopup).toBeTrue();
    expect(component.program).toEqual(programs);
  });
  it('should set addPopup to true when handleAddProfile is called', async () => {
    await component.handleAddProgram();
    expect(component.addPopup).toBeTrue();
  });
  it('should set editPopup to false when closeEditPopUp is called', () => {
    component.closeEditPopUp();
    expect(component.editPopup).toBeFalse();
  });

  it('should set addPopup to false when closeAddPopUp is called', () => {
    component.closeAddPopUp();
    expect(component.addPopup).toBeFalse();
  });

  it('should navigate to view-participant page when handleViewParticipant is called', () => {
    const routerSpy = spyOn(component.router, 'navigate');
    const program = { programId: 1, title: 'Test Program', weightage: 10 };
    component.handleViewParticipant(program);
    expect(routerSpy).toHaveBeenCalledWith(['view-participant']);
    expect(sessionStorage.getItem('id')).toBe('1');
    expect(sessionStorage.getItem('title')).toBe('Test Program');
    expect(sessionStorage.getItem('weightage')).toBe('10');
  });
});
