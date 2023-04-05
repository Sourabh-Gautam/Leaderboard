import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ParticipantService } from 'src/app/services/participant.service';

@Component({
  selector: 'app-view-participant-contributions',
  templateUrl: './view-participant-contributions.component.html',
  styleUrls: ['./view-participant-contributions.component.css'],
})
export class ViewParticipantContributionsComponent implements OnInit {
  state$: Observable<object>;
  email: string;
  participantDetails: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private participantService: ParticipantService
  ) {}

  async ngOnInit() {
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
    this.state$.subscribe((e) => (this.email = e['email']));
    await this.participantService
      .getParticipantDetails(this.email)
      .then((e) => {
        this.participantDetails = e;
      });

    console.log('Pd - ', this.participantDetails[0]);
  }
}
