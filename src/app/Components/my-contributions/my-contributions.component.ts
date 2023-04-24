import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private participantService: ParticipantService) {
    this.currentYear = new Date().getFullYear();
  }

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
