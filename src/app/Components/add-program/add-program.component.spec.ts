// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AddProgramComponent } from './add-program.component';
// import { ProgramService } from 'src/app/services/program.service';
// import { FormsModule } from '@angular/forms';
// import { ProgramTemplateService } from 'src/app/services/program-template.service';
// import Swal from 'sweetalert2';
// declare let window: any;
// describe('AddProgramComponent', () => {
//   let component: AddProgramComponent;
//   let fixture: ComponentFixture<AddProgramComponent>;
//   let mockProgramService;
//   let programTemplateServiceSpy;

//   beforeEach(async () => {
//     mockProgramService = jasmine.createSpyObj(['addProgram']);
//     programTemplateServiceSpy = jasmine.createSpyObj(['getAllProgramTemplate']);
//     // jasmine.createSpyObj('ProgramTemplateService', [
//     //   'getAllProgramTemplate',
//     // ]);
//     const modalMock = {
//       show: jasmine.createSpy('show'),
//       hide: jasmine.createSpy('hide'),
//     };
//     window.bootstrap = {
//       Modal: jasmine.createSpy('Modal').and.returnValue(modalMock),
//     };
//     await TestBed.configureTestingModule({
//       declarations: [AddProgramComponent],
//       imports: [FormsModule],
//       providers: [
//         {
//           provide: ProgramService,
//           useValue: mockProgramService,
//         },
//         {
//           provide: ProgramTemplateService,
//           useValue: programTemplateServiceSpy,
//         },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(AddProgramComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//   it('should call addProgram method on ProgramService when handleAddProgram is called', async () => {
//     const formValue = {
//       category: 'DSA',
//       description: 'DSA details',
//       title: 'dsa1',
//       addedBy: 'sneka',
//       startDate: '20/02/2022',
//       endDate: '20/02/2022',
//       weightage: '20',
//     };
//     mockProgramService.addProgram.and.returnValue(
//       Promise.resolve({ status: 201 })
//     );
//     spyOn(Swal, 'fire');

//     await component.handleAddProgram(formValue);

//     expect(mockProgramService.addProgram).toHaveBeenCalledWith(formValue);
//     spyOn(component, 'handleClosePopup');

//     const closeButton = fixture.nativeElement.querySelector('.close');
//     closeButton.click();
//     expect(Swal.fire).toHaveBeenCalledWith('Added');
//     expect(component.handleClosePopup).toHaveBeenCalled();
//   });
//   it('show error message while adding wrong data in addProgramT', async () => {
//     const formValue = {
//       category: 'DSA',
//       description: 'DSA details',
//       title: 'dsa1',
//       addedBy: 'sneka',
//       startDate: '20/02/2022',
//       endDate: '20/02/2022',
//       weightage: '20',
//     };
//     mockProgramService.addProgram.and.returnValue(
//       Promise.resolve({ status: 500 })
//     );
//     spyOn(Swal, 'fire');

//     await component.handleAddProgram(formValue);

//     expect(mockProgramService.addProgram).toHaveBeenCalledWith(formValue);
//     expect(Swal.fire).toHaveBeenCalledWith('Something went wrong !');
//   });
//   it('should show error message if adding ProgramTemplate type fails', async () => {
//     const formValue = {
//       category: 'DSA',
//       description: 'DSA details',
//       title: 'dsa1',
//       addedBy: 'sneka',
//       startDate: '20/02/2022',
//       endDate: '20/02/2022',
//       weightage: '20',
//     };
//     mockProgramService.addProgram.and.returnValue(Promise.reject());
//     spyOn(Swal, 'fire');

//     await component.handleAddProgram(formValue);

//     expect(mockProgramService.addProgram).toHaveBeenCalledWith(formValue);
//     expect(Swal.fire).toHaveBeenCalledWith('Something went wrong !');
//   });
//   it('should call getAllProgramTemplate method on ProgramTemplateService when ngOninit is called', async () => {
//     const data = [
//       {
//         contributerType: 'type',
//         points: '10',
//         id: '1',
//       },
//     ];
//     programTemplateServiceSpy.getAllProgramTemplate.and.returnValue(
//       Promise.resolve(data)
//     );
//     await component.ngOnInit();
//     expect(component.categoryList).toEqual(data);
//     expect(
//       programTemplateServiceSpy.getAllProgramTemplate
//     ).toHaveBeenCalledWith();
//   });
// });
