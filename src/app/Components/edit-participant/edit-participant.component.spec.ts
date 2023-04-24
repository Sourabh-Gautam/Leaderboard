import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParticipantComponent } from './edit-participant.component';
import { FormsModule } from '@angular/forms';
import { ParticipantService } from 'src/app/services/participant.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ContributorService } from 'src/app/services/contributor.service';
import Swal from 'sweetalert2';
declare let window: any;
describe('EditParticipantComponent', () => {
  let component: EditParticipantComponent;
  let fixture: ComponentFixture<EditParticipantComponent>;
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
    mockParticipantService = jasmine.createSpyObj(['updateparticipants']);
    mockProfileService = jasmine.createSpyObj(['getAllProfiles']);
    mockContributorService = jasmine.createSpyObj(['getAllContributorTypes']);
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [EditParticipantComponent],
      providers: [
        { provide: ParticipantService, useValue: mockParticipantService },
        { provide: ProfileService, useValue: mockProfileService },
        { provide: ContributorService, useValue: mockContributorService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditParticipantComponent);
    component = fixture.componentInstance;
    component.participant = {
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
    };
    component.weightage = 2;
    component.programId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call  participantService.handleEditParticipant with the form value e', async () => {
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
    mockParticipantService.updateparticipants.and.returnValue(
      Promise.resolve({ status: 202 })
    );
    spyOn(Swal, 'fire');

    await component.handleEditParticipant(formValue);

    expect(mockParticipantService.updateparticipants).toHaveBeenCalledWith(
      formValue,
      component.programId,
      component.participant.participantId
    );
    spyOn(component, 'handleClosePopup');

    const closeButton = fixture.nativeElement.querySelector('.close');
    closeButton.click();
    expect(Swal.fire).toHaveBeenCalledWith('Updated');
    expect(component.handleClosePopup).toHaveBeenCalled();
  });

  it('should show error message if edit participant type fails', async () => {
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
    mockParticipantService.updateparticipants.and.returnValue(
      Promise.resolve({ status: 500 })
    );
    spyOn(Swal, 'fire');

    await component.handleEditParticipant(formValue);

    expect(mockParticipantService.updateparticipants).toHaveBeenCalledWith(
      formValue,
      component.programId,
      component.participant.participantId
    );
    expect(Swal.fire).toHaveBeenCalledWith('Something went wrong');
  });
  it('should show error message if edit contributor type with invalide data ', async () => {
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
    mockParticipantService.updateparticipants.and.returnValue(Promise.reject());
    spyOn(Swal, 'fire');

    await component.handleEditParticipant(formValue);
    expect(mockParticipantService.updateparticipants).toHaveBeenCalledWith(
      formValue,
      component.programId,
      component.participant.participantId
    );

    expect(Swal.fire).toHaveBeenCalledWith('Something went wrong');
  });

  it('should call handleClosePopup when handleClosePopup is called', () => {
    spyOn(component.closePopup, 'emit');

    component.handleClosePopup();

    expect(component.edit.hide).toHaveBeenCalled();
    expect(component.closePopup.emit).toHaveBeenCalled();
  });

  it('should set points correctly when handleContributorChange is called', () => {
    const event = {
      currentTarget: {
        value: '123',
      },
    };
    const pointInput = document.createElement('input');
    pointInput.id = '123';
    pointInput.value = '5';
    document.body.appendChild(pointInput);

    component.handleContributorChange(event);

    expect(component.points).toEqual(10);

    document.body.removeChild(pointInput);
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
    mockContributorService.getAllContributorTypes.and.returnValue(
      Promise.resolve(mockContributorTypes)
    );

    mockProfileService.getAllProfiles.and.returnValue(
      Promise.resolve(mockProfiles)
    );

    await component.ngOnInit();
    expect(mockContributorService.getAllContributorTypes).toHaveBeenCalledTimes(
      2
    );
    expect(component.contributorTypeList).toEqual(mockContributorTypes);
    expect(mockProfileService.getAllProfiles).toHaveBeenCalledTimes(1);
    expect(component.profileList).toEqual(mockProfiles);
  });
});
