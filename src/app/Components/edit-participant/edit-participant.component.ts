import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ContributorService } from 'src/app/services/contributor.service';
import { ParticipantService } from 'src/app/services/participant.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';
declare const window: any;
@Component({
  selector: 'app-edit-participant',
  templateUrl: './edit-participant.component.html',
  styleUrls: ['./edit-participant.component.css'],
})
export class EditParticipantComponent implements OnInit {
  @Input() participant: any;
  @Output() closePopup = new EventEmitter<boolean>();
  @Input() weightage: any;
  @Input() programId: any;
  edit: any;
  rofileList: any;
  contributor: any;
  contributorTypeList: any;
  points: number;

  profileList: any;
  constructor(
    private profileService: ProfileService,
    private participantService: ParticipantService,
    private contributorService: ContributorService
  ) {}

  async handleEditParticipant(value) {
    console.log(value);

    await this.participantService
      .updateparticipants(value, this.programId, this.participant.participantId)
      .then((response) => {
        if (response.status == 202) {
          Swal.fire('Updated');
        } else {
          Swal.fire('Something went wrong');
        }
      })
      .catch((error) => {
        Swal.fire('Something went wrong');
      })
      .finally(() => {
        this.handleClosePopup();
      });
  }

  handleContributorChange(event) {
    const point = (
      document.getElementById(event.currentTarget.value) as HTMLInputElement
    ).value;

    this.points = Number(point) * this.weightage;
  }
  async ngOnInit(): Promise<void> {
    this.edit = new window.bootstrap.Modal(
      document.getElementById('editModal')
    );
    await this.contributorService.getAllContributorTypes().then((data: any) => {
      this.contributorTypeList = data;
    });
    this.edit.show();
    await this.profileService.getAllProfiles().then((data: any) => {
      this.profileList = data;
    });
    this.points = this.participant.points;
  }
  handleClosePopup() {
    this.edit.hide();
    this.closePopup.emit();
  }
}
