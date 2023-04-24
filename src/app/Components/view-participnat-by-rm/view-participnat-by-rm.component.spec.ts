import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParticipantService } from 'src/app/services/participant.service';

import { ViewParticipnatByRmComponent } from './view-participnat-by-rm.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from '../footer/footer.component';
import { UserHeaderComponent } from '../user-header/user-header.component';

describe('ViewParticipnatByRmComponent', () => {
  let component: ViewParticipnatByRmComponent;
  let fixture: ComponentFixture<ViewParticipnatByRmComponent>;

  let activatedRoute: ActivatedRoute;

  const activatedRouteStub = {
    paramMap: of({ get: () => '123' }),
  };
  const participantServiceSpy = jasmine.createSpyObj(['getParticipantByRM']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewParticipnatByRmComponent, FooterComponent, UserHeaderComponent],
      imports: [NgxPaginationModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ParticipantService, useValue: participantServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewParticipnatByRmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

    participantServiceSpy.getParticipantByRM.and.returnValue(
      Promise.resolve(participantDetails)
    );

    await component.ngOnInit();

    expect(component.participantDetails).toEqual(participantDetails);
    expect(component.data).toEqual(participantDetails);
    expect(component.totalRecords).toBe(participantDetails.length);
  });
});
