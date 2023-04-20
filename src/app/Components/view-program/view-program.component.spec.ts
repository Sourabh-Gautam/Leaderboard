/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ViewProgramComponent } from './view-program.component';
import { ProgramService } from 'src/app/services/program.service';
import { of } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

describe('ViewProgramComponent', () => {
  let component: ViewProgramComponent;
  let fixture: ComponentFixture<ViewProgramComponent>;
  let programService: ProgramService;
//   let programServiceSpy: jasmine.SpyObj<ProgramService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProgramComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxPaginationModule
      ],
      providers: [
        ProgramService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProgramComponent);
    component = fixture.componentInstance;
    programService = TestBed.inject(ProgramService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

//   it('should fetch programs on component initialization', () => {
//     const mockPrograms = [
//       { id: 1, title: 'Program 1' },
//       { id: 2, title: 'Program 2' }
//     ];
//     spyOn(programService, 'getAllPrograms').and.returnValue(of(mockPrograms));
//     component.ngOnInit();
//     expect(component.programs).toEqual(mockPrograms);
//   });
// it('should call programService.getAllPrograms() on initialization', async () => {
//     const programs = [{ id: 1, title: 'Program 1' }, { id: 2, title: 'Program 2' }];
//     programService.getAllPrograms.and.returnValue(of(programs));

//     await component.ngOnInit();

//     expect(programService.getAllPrograms).toHaveBeenCalled();
//     expect(component.programs).toEqual(programs);
//     expect(component.data).toEqual(programs);
//     expect(component.totalRecords).toEqual(programs.length);
//   });

//   it('should call programService.deleteProgram() when handleDeleteProgram() is called', async () => {
//     const programId = 1;
//     programService.deleteProgram.and.returnValue(Promise.resolve());

//     await component.handleDeleteProgram({ currentTarget: { nextSibling: { value: programId } } });

//     expect(programService.deleteProgram).toHaveBeenCalledWith(programId);
//     expect(programService.getAllPrograms).toHaveBeenCalled();
//   });


  // it('should handle program export', () => {
  //   const mockPrograms = [
  //     { id: 1, title: 'Program 1' },
  //     { id: 2, title: 'Program 2' }
  //   ];
  //   component.programs = mockPrograms;
  //   spyOn(window, 'open');
  //   component.handleProgramExport();
  //   expect(window.open).toHaveBeenCalledWith('data:text/csv;charset=utf-8,%EF%BB%BFid%2Ctitle%0A1%2CProgram%201%0A2%2CProgram%202%0A', '_blank');
  // });

  // it('should navigate to view-participant page on handleViewParticipant', () => {
  //   const mockProgram = { programId: 1, title: 'Program 1', weightage: 10 };
  //   spyOn(component.router, 'navigate');
  //   component.handleViewParticipant(mockProgram);
  //   expect(component.router.navigate).toHaveBeenCalledWith(['view-participant'], {
  //     state: {
  //       id: mockProgram.programId,
  //       title: mockProgram.title,
  //       weightage: mockProgram.weightage,
  //     },
    // });
  // });
});
