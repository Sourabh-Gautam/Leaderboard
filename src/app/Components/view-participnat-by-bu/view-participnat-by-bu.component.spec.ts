// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ViewParticipnatByBuComponent } from './view-participnat-by-bu.component';
// import { ActivatedRoute } from '@angular/router';

// describe('ViewParticipnatByBuComponent', () => {
//   let component: ViewParticipnatByBuComponent;
//   let fixture: ComponentFixture<ViewParticipnatByBuComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ViewParticipnatByBuComponent],
//       providers: [ActivatedRoute],
//     }).compileComponents();

//     fixture = TestBed.createComponent(ViewParticipnatByBuComponent);
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
import { ViewParticipnatByBuComponent } from './view-participnat-by-bu.component';
import { ParticipantService } from 'src/app/services/participant.service';
import { NgxPaginationModule, PaginatePipe } from 'ngx-pagination';
import { FooterComponent } from '../footer/footer.component';
describe('ViewParticipnatByBuComponent', () => {
  let component: ViewParticipnatByBuComponent;
  let fixture: ComponentFixture<ViewParticipnatByBuComponent>;
  let activatedRoute: ActivatedRoute;
  let participantServiceSpy;

  const activatedRouteStub = {
    paramMap: of({ get: () => '123' }),
  };

  const participantServiceSpyObj = jasmine.createSpyObj(['getParticipantByBU']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewParticipnatByBuComponent, FooterComponent],
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
    fixture = TestBed.createComponent(ViewParticipnatByBuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get participant details by BU on component initialization', async () => {
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

    participantServiceSpy.getParticipantByBU.and.returnValue(
      Promise.resolve(participantDetails)
    );

    await component.ngOnInit();

    expect(component.participantDetails).toEqual(participantDetails);
    expect(component.data).toEqual(participantDetails);
    expect(component.totalRecords).toBe(participantDetails.length);
  });
});
