import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ParticipantService } from 'src/app/services/participant.service';
import { ViewParticipantContributionsComponent } from './view-participant-contributions.component';
import { NgxPaginationModule, PaginatePipe } from 'ngx-pagination';
import { FooterComponent } from '../footer/footer.component';

describe('ViewParticipantContributionsComponent', () => {
  let component: ViewParticipantContributionsComponent;
  let fixture: ComponentFixture<ViewParticipantContributionsComponent>;
  let participantServiceSpy: jasmine.SpyObj<ParticipantService>;
  let activatedRouteStub: { paramMap: Observable<any> };

  beforeEach(async () => {
    participantServiceSpy = jasmine.createSpyObj('ParticipantService', [
      'getParticipantByEmail',
    ]);
    activatedRouteStub = { paramMap: of({ email: 'test@test.com' }) };

    await TestBed.configureTestingModule({
      declarations: [ViewParticipantContributionsComponent, FooterComponent],
      imports: [NgxPaginationModule],
      providers: [
        { provide: ParticipantService, useValue: participantServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewParticipantContributionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should fetch participant details on initialization', async () => {
  //   const participantDetails = [
  //     {
  //       participantName: 'John Doe',
  //       contributorType: 'winner',
  //       addedBy: 'Sneka',
  //       awardedDate: '2023-04-14',
  //       businessUnit: 'NACD',
  //       designation: 'sofware devloper',
    //     email: 'Sneka_P@epam.com',
    //     participantId: 4,
    //     points: 2500,
    //     primarySkill: 'java',
    //   },
    // ];

    // participantServiceSpy.getParticipantByEmail.and.returnValue(
    //   Promise.resolve(participantDetails)
    // );

    // await fixture.detectChanges();
    // await component.ngOnInit();
  //   expect(component.participantDetails).toEqual(participantDetails);
  //   // expect(component.data).toEqual(participantDetails);
  //   // expect(component.totalRecords).toBe(participantDetails.length);
  //   // expect(component.participantDetails).toEqual(participantDetails);
  // });
});
// // import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// // import { ActivatedRoute } from '@angular/router';
// // import { Observable, of } from 'rxjs';
// // import { ParticipantService } from 'src/app/services/participant.service';

// // import { ViewParticipantContributionsComponent } from './view-participant-contributions.component';
// // import { NgxPaginationModule } from 'ngx-pagination';

// // describe('ViewParticipantContributionsComponent', () => {
// //   let component: ViewParticipantContributionsComponent;
// //   let fixture: ComponentFixture<ViewParticipantContributionsComponent>;
// //   let activatedRoute: ActivatedRoute;
// //   let participantService: ParticipantService;

// //   beforeEach(async () => {
// //     await TestBed.configureTestingModule({
// //       declarations: [ ViewParticipantContributionsComponent ],
// //       imports: [NgxPaginationModule],
// //       providers: [
// //         {
// //           provide: ActivatedRoute,
// //           useValue: {
// //             paramMap: of({ email: 'test@example.com', selectedYear: 2022 })
// //           }
// //         },
// //         {
// //           provide: ParticipantService,
// //           useValue: {
// //             getParticipantByEmail: () => Promise.resolve([
// //               { id: 1, name: 'Test1', points: 10 },
// //               { id: 2, name: 'Test2', points: 20 },
// //               { id: 3, name: 'Test3', points: 30 },
// //             ])
// //           }
// //         }
// //       ]
// //     })
// //     .compileComponents();
// //   });

// //   beforeEach(() => {
// //     fixture = TestBed.createComponent(ViewParticipantContributionsComponent);
// //     component = fixture.componentInstance;
// //     activatedRoute = TestBed.inject(ActivatedRoute);
// //     participantService = TestBed.inject(ParticipantService);
// //     fixture.detectChanges();
// //   });

// //   it('should create', () => {
// //     expect(component).toBeTruthy();
// //   });

// //   it('should set email and selectedYear from route params', () => {
// //     expect(component.email).toBe('test@example.com');
// //     expect(component.selectedYear).toBe(2022);
// //   });

// //   it('should fetch participant details from service', waitForAsync(() => {
// //     spyOn(participantService, 'getParticipantByEmail').and.callThrough();
// //     component.ngOnInit();
// //     fixture.whenStable().then(() => {
// //       expect(participantService.getParticipantByEmail).toHaveBeenCalledWith('test@example.com', 2022);
// //       expect(component.participantDetails).toEqual([
// //         { id: 1, name: 'Test1', points: 10 },
// //         { id: 2, name: 'Test2', points: 20 },
// //         { id: 3, name: 'Test3', points: 30 },
// //       ]);
// //       expect(component.points).toBe(60);
// //       expect(component.totalRecords).toBe(3);
// //       expect(component.data).toEqual([
// //         { id: 1, name: 'Test1', points: 10 },
// //         { id: 2, name: 'Test2', points: 20 },
// //         { id: 3, name: 'Test3', points: 30 },
// //       ]);
// //     });
// //   }));

// //   it('should set data and totalRecords after fetching participant details', waitForAsync(() => {
// //     component.participantDetails = [
// //       { id: 1, name: 'Test1', points: 10 },
// //       { id: 2, name: 'Test2', points: 20 },
// //     ];
// //     component.ngOnInit();
// //     fixture.whenStable().then(() => {
// //       expect(component.totalRecords).toBe(2);
// //       expect(component.data).toEqual([
// //         { id: 1, name: 'Test1', points: 10 },
// //         { id: 2, name: 'Test2', points: 20 },
// //       ]);
// //     });
// //   }));

// //   // it('should set points to 0 if no participant details found', waitForAsync(()
// // });
// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { ActivatedRoute } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { ParticipantService } from 'src/app/services/participant.service';

// import { ViewParticipantContributionsComponent } from './view-participant-contributions.component';
// import { NgxPaginationModule } from 'ngx-pagination';
// import { HeaderComponent } from '../header/header.component';
// import { FooterComponent } from '../footer/footer.component';
// import { UserHeaderComponent } from '../user-header/user-header.component';
// import { FormsModule } from '@angular/forms';

// describe('ViewParticipantContributionsComponent', () => {
//   let component: ViewParticipantContributionsComponent;
//   let fixture: ComponentFixture<ViewParticipantContributionsComponent>;

//   const activatedRouteMock = {
//     paramMap: of({
//       get: (param: string) => {
//         if (param === 'email') return 'test@example.com';
//         if (param === 'selectedYear') return '2023';
//         return null;
//       },
//     }),
//   };

//   const participantServiceMock = {
//     getParticipantByEmail: jasmine.createSpy('getParticipantByEmail').and.returnValue(
//       Promise.resolve([
//         { id: 1, name: 'Task 1', points: 10 },
//         { id: 2, name: 'Task 2', points: 20 },
//         { id: 3, name: 'Task 3', points: 30 },
//       ])
//     ),
//   };

//   beforeEach(
//     waitForAsync(() => {
//       TestBed.configureTestingModule({
//         declarations: [ViewParticipantContributionsComponent, HeaderComponent, FooterComponent,UserHeaderComponent],
//         imports: [NgxPaginationModule,  FormsModule],
//         providers: [
//           { provide: ActivatedRoute, useValue: activatedRouteMock },
//           { provide: ParticipantService, useValue: participantServiceMock },
//         ],
//       }).compileComponents();
//     })
//   );

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ViewParticipantContributionsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should set email and selectedYear from route params', () => {
//     expect(component.email).toBe('test@example.com');
//     expect(component.selectedYear).toBe(2023);
//   });

//   it('should fetch participant details and calculate points on init', async () => {
//     await fixture.whenStable();

//     expect(participantServiceMock.getParticipantByEmail)?.toHaveBeenCalledWith('test@example.com', 2023);
//     expect(component.participantDetails).toEqual([
//       { id: 1, name: 'Task 1', points: 10 },
//       { id: 2, name: 'Task 2', points: 20 },
//       { id: 3, name: 'Task 3', points: 30 },
//     ]);
//     expect(component.points).toBe(60);
//   });

//   it('should set data and totalRecords from participantDetails', async () => {
//     await fixture.whenStable();

//     expect(component.data).toEqual([
//       { id: 1, name: 'Task 1', points: 10 },
//       { id: 2, name: 'Task 2', points: 20 },
//       { id: 3, name: 'Task 3', points: 30 },
//     ]);
//     expect(component.totalRecords).toBe(3);
//   });
// });
