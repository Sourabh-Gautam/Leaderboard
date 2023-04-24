// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ViewParticipnatByDesignationComponent } from './view-participnat-by-designation.component';

// describe('ViewParticipnatByDesignationComponent', () => {
//   let component: ViewParticipnatByDesignationComponent;
//   let fixture: ComponentFixture<ViewParticipnatByDesignationComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ViewParticipnatByDesignationComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(ViewParticipnatByDesignationComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ViewParticipnatByDesignationComponent } from './view-participnat-by-designation.component';
import { ParticipantService } from 'src/app/services/participant.service';
import { NgxPaginationModule } from 'ngx-pagination';

describe('ViewParticipnatByDesignationComponent', () => {
  let component: ViewParticipnatByDesignationComponent;
  let fixture: ComponentFixture<ViewParticipnatByDesignationComponent>;
  let activatedRoute: ActivatedRoute;
  let participantServiceSpy;

  const activatedRouteStub = {
    paramMap: of({ get: () => '123' }),
  };

  const participantServiceSpyObj = jasmine.createSpyObj([
    'getParticipantByDesignation',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewParticipnatByDesignationComponent],
      imports: [NgxPaginationModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ParticipantService, useValue: participantServiceSpyObj },
      ],
    }).compileComponents();

    activatedRoute = TestBed.inject(ActivatedRoute);
    participantServiceSpy = TestBed.inject(
      ParticipantService
    ) as jasmine.SpyObj<ParticipantService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewParticipnatByDesignationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the state$ observable and retrieve participant data on initialization', async () => {
    // const paramMap = { get: () => 'test' };
    // const historyState = { value: 'test' };

    const participantDetails = [
      {
        participantName: 'John Doe',
        contributorType: 'winner',
        addedBy: 'Sneka',
        awardedDate: '2023-04-14',
        businessUnit: 'NACD',
        designation: 'sofware devloper',
        email: 'Sneka_P@epam.com',
        participantId: 4,
        points: 2500,
        primarySkill: 'java',
      },
    ];
    participantServiceSpy.getParticipantByDesignation.and.returnValue(
      Promise.resolve(participantDetails)
    );

    await component.ngOnInit();

    expect(component.participantDetails).toEqual(participantDetails);
    expect(component.data).toEqual(participantDetails);
    expect(component.totalRecords).toBe(participantDetails.length);

    // expect(component.participantDetails).toEqual(participantDetails);
    // expect(component.data).toEqual(participantDetails);
    // expect(component.totalRecords).toEqual(participantDetails.length);
  });
});
