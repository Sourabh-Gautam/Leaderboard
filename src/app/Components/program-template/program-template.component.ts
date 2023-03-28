import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-program-template',
  templateUrl: './program-template.component.html',
  styleUrls: ['./program-template.component.css'],
})
export class ProgramTemplateComponent implements OnInit {
  [x: string]: any;
  constructor() {}

  ngOnInit(): void {}
}
