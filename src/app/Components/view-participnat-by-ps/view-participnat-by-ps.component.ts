/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ParticipantService } from 'src/app/services/participant.service';

@Component({
  selector: 'app-view-participnat-by-ps',
  templateUrl: './view-participnat-by-ps.component.html',
  styleUrls: ['./view-participnat-by-ps.component.css'],
})
export class ViewParticipnatByPsComponent implements OnInit {
  state$: Observable<object>;
  value: string;
  participantDetails: any;
  isAdmin: string | null = sessionStorage.getItem('admin');
  currentPage: any;
  data: Array<any>;
  totalRecords: number;

  page: number = 1;
  itemsPerPageOptions = [
    5, 10, 15, 20, 25, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
  ];

  itemPerPage: number = 10;
  constructor(
    private activatedRoute: ActivatedRoute,
    private participantService: ParticipantService
  ) {
    this.data = new Array<any>();
  }

  async ngOnInit() {
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
    this.state$.subscribe((e) => (this.value = e['value']));
    await this.participantService.getParticipantByPS(this.value).then((e) => {
      this.participantDetails = e;
    });
    this.data = this.participantDetails;
    this.totalRecords = this.data.length;
    console.log('Designation - ', this.participantDetails[0]);
  }
}
