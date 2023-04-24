/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddParticipantComponent } from './add-participant.component';
import { ParticipantService } from 'src/app/services/participant.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ContributorService } from 'src/app/services/contributor.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
declare let window: any;
describe('AddParticipantComponent', () => {
  let component: AddParticipantComponent;
  let fixture: ComponentFixture<AddParticipantComponent>;
  let mockParticipantService;
  let mockProfileService;
  let mockContributorService;

  beforeEach(async () => {
    const modalMock = {
      show: jasmine.createSpy('show'),
      hide: jasmine.createSpy('hide'),
    };
    window.bootstrap = {
      Modal: jasmine.createSpy('Modal').and.returnValue(modalMock),
    };
    mockParticipantService = jasmine.createSpyObj(['addparticipant']);
    mockProfileService = jasmine.createSpyObj([
      'getAllProfiles',
      'getAllProfilesForDropDown',
    ]);
    mockContributorService = jasmine.createSpyObj(['getAllContributorTypes']);

    await TestBed.configureTestingModule({
      declarations: [AddParticipantComponent],
      imports: [FormsModule],
      providers: [
        { provide: ParticipantService, useValue: mockParticipantService },
        { provide: ProfileService, useValue: mockProfileService },
        { provide: ContributorService, useValue: mockContributorService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle add participant', async () => {
    const formValue = [
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
    mockParticipantService.addparticipant.and.returnValue(
      Promise.resolve({ status: 201 })
    );
    spyOn(Swal, 'fire');

    await component.handleAddParticipant(formValue);

    expect(mockParticipantService.addparticipant).toHaveBeenCalledWith(
      component.programId,
      formValue
    );
    spyOn(component, 'handleClosePopup');

    const closeButton = fixture.nativeElement.querySelector('.close');
    closeButton.click();
    expect(Swal.fire).toHaveBeenCalledWith('Added');
    expect(component.handleClosePopup).toHaveBeenCalled();
  });

  it('should handle add participant error', async () => {
    const formValue = [
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
    mockParticipantService.addparticipant.and.returnValue(Promise.reject());
    spyOn(Swal, 'fire');

    await component.handleAddParticipant(formValue);

    expect(mockParticipantService.addparticipant).toHaveBeenCalledWith(
      component.programId,
      formValue
    );
    expect(Swal.fire).toHaveBeenCalledWith('Something went wrong !');
  });
  it('show error message while adding wrong data in addParticipant', async () => {
    const formValue = [
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
    mockParticipantService.addparticipant.and.returnValue(
      Promise.resolve({ status: 500 })
    );
    spyOn(Swal, 'fire');

    await component.handleAddParticipant(formValue);

    expect(mockParticipantService.addparticipant).toHaveBeenCalledWith(
      component.programId,
      formValue
    );
    expect(Swal.fire).toHaveBeenCalledWith('Something went wrong !');
  });
  it('should handle profile change', () => {
    const event = { target: { value: 'John Doe' } };
    component.profileList = [
      {
        name: 'John Doe',
        designation: 'Developer',
        businessUnit: 'IT',
        rmName: 'Jane Doe',
        primarySkill: 'Angular',
        email: 'john.doe@example.com',
      },
    ];

    component.handleProfileChange(event);

    expect(component.designation).toBe('Developer');
    expect(component.businessUnit).toBe('IT');
    expect(component.resourceManager).toBe('Jane Doe');
    expect(component.primarySkill).toBe('Angular');
    expect(component.email).toBe('john.doe@example.com');
  });

  it('should set the designation to empty string if profile name does not match', () => {
    const event = { target: { value: 'John Doe' } };
    component.profileList = [
      {
        name: 'John Doe',
        designation: 'Developer',
        businessUnit: 'IT',
        rmName: 'Jane Doe',
        primarySkill: 'Angular',
        email: 'john.doe@example.com',
      },
    ];

    const profileList = [
      {
        name: 'Some Other Name',
        designation: 'Some Designation',
        businessUnit: 'Some Business Unit',
        rmName: 'Some Resource Manager',
        primarySkill: 'Some Primary Skill',
        email: 'Some Email',
      },
    ];
    component.profileList = profileList;
    component.handleProfileChange(event);
    expect(component.designation).toEqual('');
  });

  it('should update filtered options when input changes', () => {
    component.profileList = [{ name: 'John Doe' }, { name: 'Jane Doe' }];
    const event = { currentTarget: { value: 'j' } };

    component.onInput();

    expect(component.filteredOptions).toEqual(['John Doe', 'Jane Doe']);
  });

  it('should filter options when input changes', () => {
    component.profileList = [{ name: 'John' }, { name: 'Jane' }];
    component.searchQuery = 'j';

    component.onInput();

    expect(component.filteredOptions).toEqual(['John', 'Jane']);
  });
  it('should update points when contributor point is changed', () => {
    const event = {
      currentTarget: { value: '2' },
    };
    const inputEl = document.createElement('input');
    inputEl.setAttribute('id', '2');
    inputEl.setAttribute('value', '10');
    spyOn(document, 'getElementById').and.returnValue(inputEl);

    component.weightage = 2;
    component.handleContributorChange(event);

    expect(component.points).toEqual(20);
  });

  it('should call profileService functions on ngOnInit and set profileList', async () => {
    const mockProfiles = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    const mockContributorTypes = [
      { id: 1, ContributorTypes: 'winner', points: '20' },
      { id: 2, mockContributorTypes: 'participant', points: '40' },
    ];
    mockProfileService.getAllProfiles.and.returnValue(
      Promise.resolve(mockProfiles)
    );
    mockContributorService.getAllContributorTypes.and.returnValue(
      Promise.resolve(mockContributorTypes)
    );

    mockProfileService.getAllProfilesForDropDown.and.returnValue(
      Promise.resolve(mockProfiles)
    );

    await component.ngOnInit();

    expect(mockProfileService.getAllProfiles).toHaveBeenCalledTimes(2);
    expect(mockProfileService.getAllProfilesForDropDown).toHaveBeenCalledTimes(
      1
    );
    expect(component.profileList).toEqual(mockProfiles);
  });
});

