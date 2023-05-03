import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyContributionsComponent } from './my-contributions.component';
import { ParticipantService } from 'src/app/services/participant.service';
import { of } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';

describe('MyContributionsComponent', () => {
  let component: MyContributionsComponent;
  let fixture: ComponentFixture<MyContributionsComponent>;
  let participantServiceSpy: jasmine.SpyObj<ParticipantService>;

  beforeEach(async () => {
    participantServiceSpy = jasmine.createSpyObj('ParticipantService', [
      'getParticipantByEmail',
    ]);
    await TestBed.configureTestingModule({
      declarations: [MyContributionsComponent, FooterComponent],
      providers: [
        { provide: ParticipantService, useValue: participantServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyContributionsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch participant details on initialization', () => {
    const email = 'test@test.com';
    const currentYear = new Date().getFullYear();
    const participantDetails = [
      {
        participantName: 'John Doe',
        contributorType: 'winner',
        addedBy: 'Sneka',
        awardedDate: '2023-04-14',
        businessUnit: 'NACD',
        designation: 'sofware devloper',
        email: 'test@test.com',
        participantId: 4,
        points: 2500,
        primarySkill: 'java',
      },
    ];
    participantServiceSpy.getParticipantByEmail.and.returnValue(
      Promise.resolve(participantDetails)
    );

    component.ngOnInit();
    expect(component.points).toBe(0);
    expect(component.zeroContribution).toBeFalse();
  });

  it('should handle zero contributions', async () => {
    const email = 'test@test.com';
    const currentYear = new Date().getFullYear();
    const participant = [];
    participantServiceSpy.getParticipantByEmail.and.returnValue(
      Promise.resolve(participant)
    );

    await component.ngOnInit();

    expect(component.points).toBe(0);
    expect(component.zeroContribution).toBeTrue();
  });

  // describe('handleProfileExport', () => {
  //   it('should call the dataExport function with the profiles data and a filename', () => {
  //     const mockProfiles = [
  //       { id: 1, name: 'John Doe' },
  //       { id: 2, name: 'Jane Smith' },
  //     ];
  //     component.participantDetails = mockProfiles;
  //     spyOn(window, 'open');

  //     component.handleProfileExport();
  //   });
  // });
});
