// // import { ComponentFixture, TestBed } from '@angular/core/testing';

// // import { UserDashboardComponent } from './user-dashboard.component';

// // describe('UserDashboardComponent', () => {
// //   let component: UserDashboardComponent;
// //   let fixture: ComponentFixture<UserDashboardComponent>;

// //   beforeEach(async () => {
// //     await TestBed.configureTestingModule({
// //       declarations: [ UserDashboardComponent ]
// //     })
// //     .compileComponents();

// //     fixture = TestBed.createComponent(UserDashboardComponent);
// //     component = fixture.componentInstance;
// //     fixture.detectChanges();
// //   });

// //   it('should create', () => {
// //     expect(component).toBeTruthy();
// //   });
// // });

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AgGridAngular } from 'ag-grid-angular';
// import { GridOptions } from 'ag-grid-community';
// import { of } from 'rxjs';
// import { AdminService } from 'src/app/services/admin.service';
// import { UserDashboardComponent } from './user-dashboard.component';

// describe('UserDashboardComponent', () => {
//   let component: UserDashboardComponent;
//   let fixture: ComponentFixture<UserDashboardComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [RouterTestingModule],
//       declarations: [UserDashboardComponent, AgGridAngular],
//       providers: [
//         {
//           provide: AdminService,
//           useValue: {
//             getParticipantList: () => of([]),
//           },
//         },
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(UserDashboardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have default column definitions', () => {
//     expect(component.columnDefs).toBeDefined();
//     expect(component.columnDefs.length).toBeGreaterThan(0);
//   });

//   it('should have default grid options', () => {
//     expect(component.gridOptions).toBeDefined();
//     expect(component.gridOptions.defaultColDef).toBeDefined();
//     expect(component.gridOptions.rowModelType).toBeDefined();
//   });

//   // it('should initialize grid on grid ready', () => {
//   //   const mockGridApi = { sizeColumnsToFit: jasmine.createSpy('sizeColumnsToFit') };
//   //   const mockParams = { api: mockGridApi, columnApi: jasmine.createSpyObj(['setDatasource']) };
//   //   component.onGridReady(mockParams as any);
//   //   expect(mockGridApi.sizeColumnsToFit).toHaveBeenCalled();
//   //   expect(mockParams.columnApi.setDatasource).toHaveBeenCalledWith(component.dataSource);
//   // });

//   it('should export grid data as csv', () => {
//     const mockGridApi = { exportDataAsCsv: jasmine.createSpy('exportDataAsCsv') };
//     component.gridApi = mockGridApi;
//     component.onBtExport();
//     expect(mockGridApi.exportDataAsCsv).toHaveBeenCalled();
//   });

//   // it('should initialize data source on grid ready', () => {
//   //   spyOn(component, 'getAllParticipants');
//   //   const mockGridApi = { sizeColumnsToFit: jasmine.createSpy('sizeColumnsToFit') };
//   //   const mockParams = { api: mockGridApi, columnApi: jasmine.createSpyObj(['setDatasource']) };
//   //   component.onGridReady(mockParams as any);
//   //   expect(component.getAllParticipants).toHaveBeenCalled();
//   // });

// //   it('should get participants data on page load', () => {
// //     spyOn(component.adminService, 'getParticipantList').and.returnValue(of([]));
// //     component.ngOnInit();
// //     expect(component.participantList).toBeDefined();
// //     expect(component.constParticipantList).toBeDefined();
// //     expect(component.participantFields).toBeDefined();
// //     expect(component.pageNo).toEqual(1);
// //     expect(component.sortBy).toEqual('points');
// //     expect(component.sortOrder).toEqual('desc');
// //     expect(component.currentYear).toEqual(new Date().getFullYear());
// //   });
// });
