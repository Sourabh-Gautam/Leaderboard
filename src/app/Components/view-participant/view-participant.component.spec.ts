
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewParticipantComponent } from './view-participant.component';
import { ParticipantService } from 'src/app/services/participant.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

describe('ViewParticipantComponent', () => {
  let component: ViewParticipantComponent;
  let fixture: ComponentFixture<ViewParticipantComponent>;
  let mockParticipantService;

  beforeEach(async () => {
    mockParticipantService = jasmine.createSpyObj(['getAllParticipants', 'deleteParticipants', 'addparticipant']);
    await TestBed.configureTestingModule({
      declarations: [ViewParticipantComponent],
      imports: [RouterTestingModule, FormsModule, NgxPaginationModule],
      providers: [ParticipantService,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewParticipantComponent);
    
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve participants on initialization', () => {
    spyOn(component.participantService, 'getAllParticipants').and.returnValue(Promise.resolve([{
      id: 1,
      name: 'John Doe',
      awardedDate: '2022-04-20'
    }, {
      id: 2,
      name: 'Jane Smith',
      awardedDate: '2022-04-22'
    }]));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.participants.length).toBe(0);
  });

  it('should sort participants by awarded date in descending order', () => {
    spyOn(component.participantService, 'getAllParticipants').and.returnValue(Promise.resolve([{
      id: 1,
      name: 'John Doe',
      awardedDate: '2022-04-20'
    }, {
      id: 2,
      name: 'Jane Smith',
      awardedDate: '2022-04-22'
    }]));

    component.handleViewParticipant(1);
    fixture.detectChanges();

    expect(component.participants.length).toBe(0);
  });

  describe('handleProfileExport', () => {
    it('should call the dataExport function with the profiles data and a filename', () => {
      const mockProfiles = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
      ];
      component.participants = mockProfiles;
      spyOn(window, 'open');

      component.handleParticipantExport();
    });
  });

  it('should delete participant and refresh list', async () => {
    spyOn(component.participantService, 'deleteParticipants').and.returnValue(Promise.resolve());
    spyOn(component.participantService, 'getAllParticipants').and.returnValue(Promise.resolve([{
      id: 1,
      name: 'John Doe',
      awardedDate: '2022-04-20'
    }]));

    await component.handleDeleteParticipant({ currentTarget: { nextSibling: { value: 1 } } }, 2);
    fixture.detectChanges();

    expect(component.participants.length).toBe(1);
  });

  it('should open edit popup when edit button is clicked', () => {
    const participant = {
      id: 1,
      name: 'John Doe',
      awardedDate: '2022-04-20'
    };

    component.handleEditParticipant(participant);

    expect(component.participant).toBe(participant);
    expect(component.editPopup).toBe(true);
  });

  it('should open add popup when add button is clicked', () => {
    component.handleAddParticipant();

    expect(component.addPopup).toBe(true);
  });

  it('should add participants on handleAddBulkParticipant', async () => {
    const csvData = `name,email
      Participant 1, participant1@example.com
      Participant 2, participant2@example.com`;
    const mockFile = new File([csvData], 'participants.csv', { type: 'text/csv' });
    const event = { target: { files: [mockFile] } };
    spyOn(window, 'alert');
    mockParticipantService.addparticipant.and.returnValue(Promise.resolve(true));
    component.handleAddBulkParticipant(event);
    fixture.detectChanges();
    expect(mockParticipantService.addparticipant).toHaveBeenCalledTimes(0);
    expect(window.alert).toHaveBeenCalledWith('Participants Added');
  });
it('should set editPopup to false on closeEditPopUp', () => {
    component.editPopup = true;
    component.closeEditPopUp();
    expect(component.editPopup).toBeFalse();
  });

  it('should set addPopup to false on closeAddPopUp', () => {
    component.addPopup = true;
    component.closeAddPopUp();
    expect(component.addPopup).toBeFalse();
  });

});

