import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantService } from 'src/app/services/participant.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';
declare var window: any;
@Component({
  selector: 'app-edit-participant',
  templateUrl: './edit-participant.component.html',
  styleUrls: ['./edit-participant.component.css'],
})
export class EditParticipantComponent implements OnInit {
  @Input() participant: any;
  @Output() closePopup = new EventEmitter<boolean>();
  @Input() programId: any;
  edit: any;
  rofileList: any;
  contributor:any;

  profileList: any;
  constructor(
    private profileService: ProfileService,
    private participantService: ParticipantService,
    private router: Router
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
  ngOnInit(): void {
    this.edit = new window.bootstrap.Modal(
      document.getElementById('editModal')
    );

    this.edit.show();
    this.profileService.getAllProfiles().then((data: any) => {
      this.profileList = data;
    });
  }
  handleClosePopup() {
    this.edit.hide();
    this.closePopup.emit();
  }
}
