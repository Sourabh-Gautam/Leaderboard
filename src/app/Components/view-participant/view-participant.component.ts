import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { dataExport } from 'src/app/common.func';
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
  isEdit = false;
  editPopup = false;
  addPopup = false;
  currentPage: any;
  data: Array<any>;
  totalRecords: number;

  page: number = 1;
  itemsPerPageOptions = [
    5, 10, 15, 20, 25, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
  ];

  itemPerPage: number = 10;

  constructor(
    private router: Router,
    private participantService: ParticipantService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state as object;
    console.log('state', state);

    this.programId = state['id'];
    this.programTitle = state['title'];
    this.weightage = state['weightage'];

    this.data = new Array<any>();
  }

  handleViewParticipant(programId) {
    this.participantService.getAllParticipants(programId).then((data) => {
      data.sort((a, b) => {
        let ms = new Date(a.awardedDate).getTime();
        let ms1 = new Date(b.awardedDate).getTime();
        return ms1 - ms;
      });

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
    this.editPopup = true;
  }
  handleAddParticipant() {
    this.addPopup = true;
  }
  handleAddBulkParticipant(event) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.readAsText(file, 'UTF-8');

      reader.onload = (evt: any) => {
        const p_arr: any = [];
        const csvData = evt.target.result;

        const participants = csvData.split('\n');
        const headerRectifying = participants[0].replace('\r', '');
        const header = headerRectifying.split(',');
        console.log(header);
        for (let i = 1; i < participants.length - 1; i++) {
          const data = participants[i].replace('\r', '');
          const participant = data.split(',');
          const obj = {};
          for (let j = 0; j < participant.length; j++) {
            obj[header[j]] = participant[j];
          }
          obj['addedBy'] = window.sessionStorage.getItem('username');
          p_arr.push(obj);
        }
        p_arr.forEach((element) => {
          this.participantService.addparticipant(this.programId, element);
        });
      };
    }
    alert('Participants Added');
  }

  handleParticipantExport() {
    const csvData = this.participants.map((e) => {
      delete e['program'];
      return e;
    });
    dataExport(csvData, 'participant-data');
  }
  handleClickAddBulkParticipant(event) {
    const fileInputElement = document.querySelector(
      '#participant-csv'
    ) as HTMLInputElement;
    fileInputElement.click();
  }
  closeAddPopUp() {
    this.addPopup = false;
  }
  closeEditPopUp() {
    this.editPopup = false;
  }
  ngOnInit(): void {
    this.handleViewParticipant(this.programId);
  }
}
