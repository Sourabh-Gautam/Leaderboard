/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { dataExport } from 'src/app/common.func';
import { ParticipantService } from 'src/app/services/participant.service';

@Component({
  selector: 'app-my-contributions',
  templateUrl: './my-contributions.component.html',
  styleUrls: ['./my-contributions.component.css'],
})
export class MyContributionsComponent implements OnInit {
  email: string;
  currentYear : number;
  points = 0;
  zeroContribution = false;
  participantDetails: any[];
  isAdmin: string | null = sessionStorage.getItem('admin');

  itemsPerPageOptions = [
    5, 10, 15, 20, 25, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
  ];

  itemPerPage: number = 10;

  constructor(private participantService: ParticipantService) {
    this.ngOnInit();
    this.currentYear = new Date().getFullYear();
  }

  handleProfileExport() {
    dataExport(this.participantDetails, 'contribution-data');
  }

  // async getAllContributions() {
  //   await this.participantService.getParticipantByEmail(this.email, this.currentYear).then((data) => {
  //     this.profiles = data;
  //   });
  //   this.data = this.profiles;
  //   this.totalRecords = this.data.length;
  // }

  async ngOnInit() {
    this.email = sessionStorage.getItem('email') as string;
    await this.participantService
      .getParticipantByEmail(this.email, this.currentYear)
      .then((e) => {
        if (e.length == 0) {
          this.zeroContribution = true;
        } else {
          this.participantDetails = e;
          this.participantDetails.map(x => {
            this.points += x['points'];
            console.log(x['points']);
          })

        }
      });
  }
}
