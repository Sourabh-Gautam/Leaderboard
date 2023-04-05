import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ParticipantService } from 'src/app/services/participant.service';

@Component({
  selector: 'app-view-participnat-by-bu',
  templateUrl: './view-participnat-by-bu.component.html',
  styleUrls: ['./view-participnat-by-bu.component.css'],
})
export class ViewParticipnatByBuComponent implements OnInit {
  state$: Observable<object>;
  value: string;
  participantDetails: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private participantService: ParticipantService
  ) {}

  async ngOnInit() {
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
    this.state$.subscribe((e) => (this.value = e['value']));
    await this.participantService.getParticipantByBU(this.value).then((e) => {
      this.participantDetails = e;
    });

    console.log('Designation - ', this.participantDetails[0]);
  }
}
