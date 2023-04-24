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
  //       email: 'Sneka_P@epam.com',
  //       participantId: 4,
  //       points: 2500,
  //       primarySkill: 'java',
  //     },
  //   ];

  //   participantServiceSpy.getParticipantByEmail.and.returnValue(
  //     Promise.resolve(participantDetails)
  //   );

  //   await fixture.detectChanges();
  //   await component.ngOnInit();
  //   expect(component.participantDetails).toEqual(participantDetails);
  //   expect(component.data).toEqual(participantDetails);
  //   expect(component.totalRecords).toBe(participantDetails.length);
  //   expect(component.participantDetails).toEqual(participantDetails);
  // });
});
