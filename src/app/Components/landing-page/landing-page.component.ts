import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  flag: boolean = true;
  constructor() {}

  ngOnInit(): void {
    sessionStorage.clear();
  }
  toggleFlag() {
    this.flag = !this.flag;
  }
}
