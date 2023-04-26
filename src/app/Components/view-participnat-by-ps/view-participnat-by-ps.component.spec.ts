
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ParticipantService } from 'src/app/services/participant.service';

import { ViewParticipnatByPsComponent } from './view-participnat-by-ps.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from '../footer/footer.component';
import { UserHeaderComponent } from '../user-header/user-header.component';

describe('ViewParticipnatByPsComponent', () => {
  let component: ViewParticipnatByPsComponent;
  let fixture: ComponentFixture<ViewParticipnatByPsComponent>;
  let mockActivatedRoute, mockParticipantService;

  beforeEach(async () => {
    mockActivatedRoute = {
      paramMap: of({ get: () => '123' }),
    };
    mockParticipantService = jasmine.createSpyObj(['getParticipantByPS']);
    await TestBed.configureTestingModule({
      declarations: [ViewParticipnatByPsComponent, FooterComponent, UserHeaderComponent],
      imports: [NgxPaginationModule, FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ParticipantService, useValue: mockParticipantService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewParticipnatByPsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve participant details on initialization', async () => {
    const mockParticipantDetails = [
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
    mockParticipantService.getParticipantByPS.and.returnValue(
      Promise.resolve(mockParticipantDetails)
    );
    await component.ngOnInit();

    expect(component.participantDetails).toEqual(mockParticipantDetails);

    expect(component.data).toEqual(mockParticipantDetails);
    expect(component.totalRecords).toBe(mockParticipantDetails.length);
  });

  //   it('should set data and total records on initialization', async () => {
  //     const mockParticipantDetails = [{ name: 'John', ps: 'test_ps' }];
  //     mockParticipantService.getParticipantByPS.and.returnValue(
  //       Promise.resolve(mockParticipantDetails)
  //     );
  //     await component.ngOnInit();
  //     expect(component.data).toEqual(mockParticipantDetails);
  //     expect(component.totalRecords).toEqual(mockParticipantDetails.length);
  //   });
});
