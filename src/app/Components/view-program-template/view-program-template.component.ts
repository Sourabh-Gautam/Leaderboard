/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { dataExport } from 'src/app/common.func';
import { ProgramTemplateService } from 'src/app/services/program-template.service';
import { ProgramService } from 'src/app/services/program.service';

@Component({
  selector: 'app-view-program-template',
  templateUrl: './view-program-template.component.html',
  styleUrls: ['./view-program-template.component.css'],
})
export class ViewProgramTemplateComponent implements OnInit {
  programTemplates: any = [];
  programTemplate: any;
  isEdit: boolean = false;
  editPopup: boolean = false;
  addPopup: boolean = false;
  data: Array<any>;
  totalRecords: number;
  page: number = 1;
  itemsPerPageOptions = [
    5, 10, 15, 20, 25, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
  ];

  itemPerPage: number = 10;
  constructor(
    private programTemplateService: ProgramTemplateService,
    private router: Router
  ) {
    this.getAllProgramTemplate();
    this.data = new Array<any>();
  }

  async getAllProgramTemplate() {
    await this.programTemplateService
      .getAllProgramTemplate()
      .then((response) => {
        this.programTemplates = response;
      });
    this.data = this.programTemplates;
    this.totalRecords = this.data.length;
  }
  handleAddProgramTemplate() {
    this.addPopup = true;
  }
  handleProgramTemplateExport() {
    dataExport(this.programTemplates, 'program-template-data');
  }
  handleEditProgramTemplate(programTemplate) {
    this.programTemplate = programTemplate;
    this.editPopup = true;
  }

  async handleDeleteProgramTemplate(event) {
    const programTemplateId = event.currentTarget.nextSibling.value;
    console.log(programTemplateId);
    await this.programTemplateService.deleteProgramTemplate(programTemplateId);
    this.getAllProgramTemplate();
  }

  closeEditPopUp() {
    this.editPopup = false;
  }
  closeAddPopUp() {
    this.addPopup = false;
  }
  ngOnInit(): void {}
}
