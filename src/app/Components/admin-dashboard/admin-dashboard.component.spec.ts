// /* eslint-disable @typescript-eslint/no-empty-function */
// // import { ComponentFixture, TestBed } from '@angular/core/testing';

// // import { AdminDashboardComponent } from './admin-dashboard.component';

// // describe('AdminDashboardComponent', () => {
// //   let component: AdminDashboardComponent;
// //   let fixture: ComponentFixture<AdminDashboardComponent>;

// //   beforeEach(async () => {
// //     await TestBed.configureTestingModule({
// //       declarations: [ AdminDashboardComponent ]
// //     })
// //     .compileComponents();

// //     fixture = TestBed.createComponent(AdminDashboardComponent);
// //     component = fixture.componentInstance;
// //     fixture.detectChanges();
// //   });

// //   it('should create', () => {
// //     expect(component).toBeTruthy();
// //   });
// // });
// // import { ComponentFixture, TestBed } from '@angular/core/testing';
// // import { RouterTestingModule } from '@angular/router/testing';
// // import { HttpClientTestingModule } from '@angular/common/http/testing';
// // import { AdminDashboardComponent } from './admin-dashboard.component';
// // import { AdminService } from 'src/app/services/admin.service';
// // import { participantFields } from 'src/app/constants';
// // import { AgGridAngular } from 'ag-grid-angular';
// // import { of } from 'rxjs';
// // import { DebugElement } from '@angular/core';
// // import { By } from '@angular/platform-browser';
// // import { Router } from '@angular/router';
// // import {
// //   GridApi,
// //   GridReadyEvent,
// //   ColumnApi,
// // } from 'ag-grid-community/dist/lib/main';

// // describe('AdminDashboardComponent', () => {
// //   let component: AdminDashboardComponent;
// //   let fixture: ComponentFixture<AdminDashboardComponent>;
// //   let mockAdminService: jasmine.SpyObj<AdminService>;
// //   let router: Router;

// //   beforeEach(async () => {
// //     mockAdminService = jasmine.createSpyObj(['getParticipants']);
// //     await TestBed.configureTestingModule({
// //       imports: [RouterTestingModule, HttpClientTestingModule],
// //       declarations: [AdminDashboardComponent, AgGridAngular],
// //       providers: [
// //         { provide: AdminService, useValue: mockAdminService },
// //       ],
// //     }).compileComponents();
// //   });

// //   beforeEach(() => {
// //     fixture = TestBed.createComponent(AdminDashboardComponent);
// //     component = fixture.componentInstance;
// //     router = TestBed.inject(Router);
// //     fixture.detectChanges();
// //   });

// //   it('should create', () => {
// //     expect(component).toBeTruthy();
// //   });

// //   it('should call onGridReady on AgGrid', () => {
// //     const mockGridApi = jasmine.createSpyObj<GridApi>(['setDatasource']);
// //     const mockGridColumnApi = jasmine.createSpyObj<ColumnApi>([]);
// //     const mockGridReadyEvent = { api: mockGridApi, columnApi: mockGridColumnApi } as GridReadyEvent;
// //     spyOn(mockGridApi, 'setDatasource');
// //     component.onGridReady(mockGridReadyEvent);
// //     expect(mockGridApi.setDatasource).toHaveBeenCalledWith(component.dataSource);
// //   });

// //   it('should call onBtExport on AgGrid', () => {
// //     const mockGridApi = jasmine.createSpyObj<GridApi>(['exportDataAsCsv']);
// //     const mockGridColumnApi = jasmine.createSpyObj<ColumnApi>([]);
// //     component.gridApi = mockGridApi;
// //     component.gridColumnApi = mockGridColumnApi;
// //     spyOn(mockGridApi, 'exportDataAsCsv');
// //     component.onBtExport();
// //     expect(mockGridApi.exportDataAsCsv).toHaveBeenCalled();
// //   });

// //   it('should call onCellClicked on AgGrid with email', () => {
// //     const mockGridApi = jasmine.createSpyObj<GridApi>([]);
// //     const mockGridColumnApi = jasmine.createSpyObj<ColumnApi>([]);
// //     component.gridApi = mockGridApi;
// //     component.gridColumnApi = mockGridColumnApi;
// //     spyOn(router, 'navigateByUrl');
// //     const cellClickedEvent = { colDef: { field: 'participantName' }, data: { email: 'test-email' } };
// //     component.gridOptions.onCellClicked(cellClickedEvent);
// //     expect(router.navigateByUrl).toHaveBeenCalledWith('/participant-contributions', {
// //       state: { email: cellClickedEvent.data.email, selectedYear: component.currentYear },
// //     });
// //   });

// // //   it('should call onCellClicked on AgGrid with designation', () => {
// // //     const mockGridApi = jasmine.createSpyObj<GridApi>([]);
// // //     const mockGridColumnApi = jasmine.createSpyObj<ColumnApi>([]);
// // //     component.gridApi = mockGridApi;
// // //     component.gridColumnApi = mockGridColumnApi;
// // //     spyOn(router, 'navigateByUrl

// // });
// // import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// // import { RouterTestingModule } from '@angular/router/testing';
// // import { HttpClientTestingModule } from '@angular/common/http/testing';
// // import { AgGridAngular } from 'ag-grid-angular';

// // import { AdminDashboardComponent } from './admin-dashboard.component';
// // import { AdminService } from 'src/app/services/admin.service';
// // import { GridReadyEvent } from 'ag-grid-community';

// // describe('AdminDashboardComponent', () => {
// //   let component: AdminDashboardComponent;
// //   let fixture: ComponentFixture<AdminDashboardComponent>;

// //   beforeEach(async(() => {
// //     TestBed.configureTestingModule({
// //       declarations: [AdminDashboardComponent, AgGridAngular],
// //       imports: [RouterTestingModule, HttpClientTestingModule],
// //       providers: [AdminService],
// //     }).compileComponents();
// //   }));

// //   beforeEach(() => {
// //     fixture = TestBed.createComponent(AdminDashboardComponent);
// //     component = fixture.componentInstance;
// //     fixture.detectChanges();
// //   });

// //   it('should create', () => {
// //     expect(component).toBeTruthy();
// //   });

// //   it('should have the correct column headers', () => {
// //     const headerCells = fixture.nativeElement.querySelectorAll('.ag-header-cell-text');
// //     expect(headerCells[0].textContent.trim()).toBe('Rank');
// //     expect(headerCells[1].textContent.trim()).toBe('Employee Name');
// //     expect(headerCells[2].textContent.trim()).toBe('Designation');
// //     expect(headerCells[3].textContent.trim()).toBe('Business Unit');
// //     expect(headerCells[4].textContent.trim()).toBe('Resource Manager');
// //     expect(headerCells[5].textContent.trim()).toBe('Primary Skill');
// //     expect(headerCells[6].textContent.trim()).toBe('Sub Skills');
// //     expect(headerCells[7].textContent.trim()).toBe('Points');
// //   });

// //   it('should load the data source on grid ready', () => {
// //     const gridApiSpy = spyOn(component.gridApi, 'setDatasource').and.callThrough();
// //     // const gridReadyEvent = {
// //     //   api: component.gridApi,
// //     //   columnApi: component.gridColumnApi
// //     // };
// //     const gridReadyEvent: GridReadyEvent<any, any> = {
// //         type: 'grid-ready',
// //         api: component.gridApi,
// //         columnApi: component.gridColumnApi,
// //         context: null
// //       };
// //     component.onGridReady(gridReadyEvent);
// //     expect(gridApiSpy).toHaveBeenCalledWith(component.dataSource);
// //   });

// //   it('should navigate to participant contributions page when employee name is clicked', () => {
// //     const routerSpy = spyOn(component.router, 'navigateByUrl').and.callThrough();
// //     const cellClickedEvent = {
// //       colDef: { field: 'participantName' },
// //       data: { email: 'test@example.com' }
// //     };
// //     component.onCellClicked(cellClickedEvent);
// //     expect(routerSpy).toHaveBeenCalledWith('/participant-contributions', {
// //       state: { email: 'test@example.com', selectedYear: component.currentYear }
// //     });
// //   });

// //   it('should navigate to participant by designation page when designation is clicked', () => {
// //     const routerSpy = spyOn(component.router, 'navigateByUrl').and.callThrough();
// //     const cellClickedEvent = {
// //       colDef: { field: 'designation' },
// //       data: { email: 'test@example.com' }
// //     };
// //     component.onCellClicked(cellClickedEvent);
// //     expect(routerSpy).toHaveBeenCalledWith('/participant-by-designation', {
// //       state: { value: 'Developer' }
// //     });
// //   });

// //   it('should navigate to participant by bu page when business unit is clicked', () => {
// //     const routerSpy = spyOn(component.router, 'navigateByUrl').and.callThrough();
// //     const cellClickedEvent = {
// //       colDef: { field: 'businessUnit' },
// //       data: { email: 'test@example.com' }
// //     };
// //     component.onCellClicked(cellClickedEvent);
// //     expect(routerSpy).toHaveBeenCalledWith('/participant-by-bu', {
// //       state: { value: 'Sales' }
// //     });
// //   });

// // //   it('should navigate to participant by rm page when resource manager is clicked', () =>
// // });

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AgGridAngular } from 'ag-grid-angular';
// import { Router } from '@angular/router';
// import {
//   CellClickedEvent,
//   ColDef,
//   GridReadyEvent,
//   IDatasource,
//   IGetRowsParams,
//   GridOptions,
// } from 'ag-grid-community/dist/lib/main';
// import { of } from 'rxjs';

// import { AdminDashboardComponent } from './admin-dashboard.component';
// import { AdminService } from '../../services/admin.service';

// describe('AdminDashboardComponent', () => {
//   let component: AdminDashboardComponent;
//   let fixture: ComponentFixture<AdminDashboardComponent>;
//   let router: Router;
//   let adminService: AdminService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [AdminDashboardComponent, AgGridAngular],
//       imports: [HttpClientTestingModule, RouterTestingModule],
//       providers: [AdminService, Router],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AdminDashboardComponent);
//     component = fixture.componentInstance;
//     router = TestBed.inject(Router);
//     adminService = TestBed.inject(AdminService);
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have defined grid options', () => {
//     expect(component.gridOptions).toBeDefined();
//   });

//   it('should have defined column definitions', () => {
//     expect(component.columnDefs).toBeDefined();
//     expect(component.columnDefs.length).toBeGreaterThan(0);
//   });

//   it('should set the grid data source on grid ready event', () => {
//     const dataSource: IDatasource = component.dataSource;
//     const params: GridReadyEvent = { api: {}, columnApi: {} } as GridReadyEvent;
//     spyOn(params.api, 'sizeColumnsToFit').and.callThrough();
//     spyOn(params.api, 'setDatasource').and.callThrough();
//     component.onGridReady(params);
//     expect(params.api.sizeColumnsToFit).toHaveBeenCalled();
//     expect(params.api.setDatasource).toHaveBeenCalledWith(dataSource);
//   });

//   it('should export grid data as CSV', () => {
//     const api = { exportDataAsCsv: () => {} };
//     spyOn(api, 'exportDataAsCsv').and.callThrough();
//     component.gridApi = api;
//     component.onBtExport();
//     expect(api.exportDataAsCsv).toHaveBeenCalled();
//   });

//   it('should navigate to participant contributions on participant name click', () => {
//     const email = 'test@example.com';
//     const year = '2022';
//     const event: CellClickedEvent = {
//       colDef: { field: 'participantName' },
//       data: { email: email },
//     } as CellClickedEvent;
//     // const router = TestBed.inject(RouterTestingModule).navigateByUrl;
//     spyOn(router, 'navigateByUrl');
//     // spyOn(router, 'callFake');
//     const input = document.createElement('input');
//     input.id = 'year';
//     input.value = year;
//     document.body.appendChild(input);
//     component.onGridReady({ api: {}, columnApi: {} } as GridReadyEvent);
//     component.gridApi.sizeColumnsToFit();
//     event.event = document.createEvent('MouseEvent');
//     event.event.initEvent('click', true, true);
//     const cellElement = document.createElement('div');
//     const targetElement = document.createElement('span');
//     cellElement.appendChild(targetElement);
//     // event.event.target = targetElement;
//     component.gridApi.cellRendererService.invokeCustomComponentMethod(
//       'onCellClicked',
//       event,
//       cellElement
//     );
//     expect(router).toHaveBeenCalledWith('/participant-contributions', {
//       state: { email: email, selectedYear: year },
//     });
//   });

// });

