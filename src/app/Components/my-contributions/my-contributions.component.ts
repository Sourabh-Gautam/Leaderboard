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
  zeroContribution = false;
  participantDetails: any;
  isAdmin: string | null = sessionStorage.getItem('admin');

  constructor(private participantService: ParticipantService) {}

  async ngOnInit() {
    this.email = sessionStorage.getItem('email') as string;
    await this.participantService
      .getParticipantByEmail(this.email)
      .then((e) => {
        if (e.length == 0) {
          this.zeroContribution = true;
        } else {
          this.participantDetails = e;
        }
      });
  }
}
