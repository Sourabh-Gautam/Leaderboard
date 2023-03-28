import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'leaderboardapp';
  operation: string = 'na';

  constructor() {}

  addProgram() {
    this.operation = 'add';
  }
}
