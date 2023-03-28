import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
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
  constructor(
    private programTemplateService: ProgramTemplateService,
    private router: Router
  ) {
    this.getAllProgramTemplate();
  }

  async getAllProgramTemplate() {
    await this.programTemplateService
      .getAllProgramTemplate()
      .then((response) => {
        this.programTemplates = response;
      });
  }
  handleAddProgramTemplate() {
    this.addPopup = true;
  }

  handleEditProgramTemplate(programTemplate) {
    this.programTemplate = programTemplate;
    this.editPopup = true;
  }

  async handleDeleteProgramTemplate(event) {
    let programTemplateId = event.currentTarget.nextSibling.value;
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
