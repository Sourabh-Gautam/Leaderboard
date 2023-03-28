import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantService } from 'src/app/services/participant.service';
import { ProgramService } from 'src/app/services/program.service';

@Component({
  selector: 'app-view-participant',
  templateUrl: './view-participant.component.html',
  styleUrls: ['./view-participant.component.css'],
})
export class ViewParticipantComponent implements OnInit {
  participants: any = [];
  participant: any;
  programId: number;
  programTitle: string;
  weightage: any;
  isEdit: boolean = false;
  editPopup: boolean = false;
  addPopup: boolean = false;
  // totalRecords: any;
  // page: Number = 1;
  // data!: Array<any>;
  currentPage: any;
  data: Array<any>;
  totalRecords: number;
  page: number = 1;
  itemPerPage: number = 5;

  constructor(
    private router: ActivatedRoute,
    private participantService: ParticipantService
  ) {
    this.router.params.subscribe((value) => {
      this.programId = value.id;
      this.programTitle = value.title;
      this.weightage = value.weightage;
    });

    this.data = new Array<any>();
  }

  handleViewParticipant(programId) {
    console.log('view participant component', programId);
    this.participantService.getAllParticipants(programId).then((data) => {
      data.sort((a, b) => {
        let ms = new Date(a.awardedDate).getTime();
        let ms1 = new Date(b.awardedDate).getTime();
        return ms1 - ms;
      });
      console.log(data);

      this.participants = data;
    });
    this.data = this.participants;
    this.totalRecords = this.data.length;
  }

  async handleDeleteParticipant(event, participantId) {
    let programId = event.currentTarget.nextSibling.value;

    await this.participantService.deleteParticipants(programId, participantId);
    this.handleViewParticipant(programId);
  }
  handleEditParticipant(participant) {
    this.participant = participant;
    console.log('edit participat', this.participant);
    this.editPopup = true;
  }
  handleAddParticipant() {
    this.addPopup = true;
  }
  closeAddPopUp() {
    this.addPopup = false;
  }
  closeEditPopUp() {
    this.editPopup = false;
  }
  ngOnInit(): void {
    console.log();
    this.handleViewParticipant(this.programId);
  }
}
