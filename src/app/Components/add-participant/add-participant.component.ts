import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContributorService } from 'src/app/services/contributor.service';
import { ParticipantService } from 'src/app/services/participant.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';
declare let window: any;
@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.css'],
})
export class AddParticipantComponent implements OnInit {
  add: any;
  profileList: any;
  contributorTypeList: any;
  points: any;
  username: string | null;
  designation: string;
  businessUnit: any;
  primarySkill: any;
  subSkill: any;
  resourceManager: any;
  email: any;
  searchQuery = '';

  filteredOptions: string[] = [];

  name: string[] = [];

  form = {
    participantName: '',
  };
  @Input() programId: any;
  @Input() weightage: any;
  @Output() closePopup = new EventEmitter<boolean>();
  constructor(
    private profileService: ProfileService,
    private participantService: ParticipantService,
    private contributorService: ContributorService
  ) {
    this.username = sessionStorage.getItem('username');
  }
  async handleAddParticipant(value) {
    await this.participantService
      .addparticipant(this.programId, value)
      .then((response) => {
        if (response.status == 201) {
          Swal.fire('Added');
        } else {
          Swal.fire('Something went wrong !');
        }
      })
      .catch((error) => {
        Swal.fire('Something went wrong !');
      })
      .finally(() => {
        this.handleClosePopup();
      });
  }

  async ngOnInit(): Promise<void> {
    this.add = new window.bootstrap.Modal(document.getElementById('addModal'));

    this.add.show();
    await this.profileService.getAllProfiles().then((data: any) => {
      this.profileList = data;
      console.log('all prfoile :', data);
    });
    await this.contributorService.getAllContributorTypes().then((data: any) => {
      this.contributorTypeList = data;
    });
    await this.profileService

      .getAllProfilesForDropDown(this.programId)

      .then((data: any) => {
        this.profileList = data;
      });
  }
  handleProfileChange(event) {
    let flag = true;
    const value = event.target.value;
    this.profileList.forEach((element) => {
      if (element.name === value) {
        this.designation = element.designation;
        this.businessUnit = element.businessUnit;
        this.resourceManager = element.rmName;
        this.primarySkill = element.primarySkill;
        this.subSkill = element.subSkill;
        this.email = element.email;
        flag = false;
      }
    });
    if (flag) {
      this.designation = '';
    }
  }
  onInput() {
    let i = 0;

    this.profileList.forEach((element) => {
      this.name[i++] = element.name;
    });

    this.filteredOptions = this.name.filter((option) =>
      option.toLowerCase().startsWith(this.searchQuery.toLowerCase())
    );
  }
  handleContributorChange(event) {
    const point = (
      document.getElementById(event.currentTarget.value) as HTMLInputElement
    ).value;

    this.points = Number(point) * this.weightage;
  }
  handleClosePopup() {
    this.add.hide();
    this.closePopup.emit();
  }
}
