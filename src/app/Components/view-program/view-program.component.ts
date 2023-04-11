import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { dataExport } from 'src/app/common.func';
import { ProgramTemplateService } from 'src/app/services/program-template.service';
import { ProgramService } from 'src/app/services/program.service';
import Swal from 'sweetalert2';
declare const window: any;
@Component({
  selector: 'app-view-program',
  templateUrl: './view-program.component.html',
  styleUrls: ['./view-program.component.css'],
})
export class ViewProgramComponent implements OnInit {
  programs: any = [];
  formModal: any;
  editModal: any;
  editPopup = false;
  addPopup = false;
  categoryList: any;
  program: any;
  data: Array<any>;
  totalRecords: number;
  page = 1;
  itemPerPage = 5;
  constructor(
    private programService: ProgramService,
    private programTemplateService: ProgramTemplateService,
    private router: Router
  ) {
    this.getAllPrograms();
    this.data = new Array<any>();
  }

  async handleAddProgram() {
    this.addPopup = true;
  }

  handleProgramExport() {
    dataExport(this.programs, 'program-data');
  }

  async handleEditProgram(program) {
    console.log(program);

    this.program = program;
    this.editPopup = true;
  }

  closeEditPopUp() {
    this.editPopup = false;
  }
  closeAddPopUp() {
    this.addPopup = false;
  }

  async getAllPrograms() {
    await this.programService.getAllPrograms().then((data) => {
      data.sort((a, b) => {
        const ms = new Date(a.endDate).getTime();
        const ms1 = new Date(b.endDate).getTime();
        return ms1 - ms;
      });
      this.programs = data;
    });
    this.data = this.programs;
    this.totalRecords = this.data.length;
  }

  async handleDeleteProgram(event) {
    const programId = event.currentTarget.nextSibling.value;
    console.log(programId);
    await this.programService.deleteProgram(programId);
    this.getAllPrograms();
  }

  ngOnInit(): void {}

  handleViewParticipant(program) {
    console.log('view program component', program.programId);
    this.router.navigate(['view-participant'], {
      state: {
        id: program.programId,
        title: program.title,
        weightage: program.weightage,
      },
    });
  }
}
