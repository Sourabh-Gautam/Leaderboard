/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProgramTemplateService } from 'src/app/services/program-template.service';
import Swal from 'sweetalert2';
declare let window: any;
@Component({
  selector: 'app-add-program-template',
  templateUrl: './add-program-template.component.html',
  styleUrls: ['./add-program-template.component.css'],
})
export class AddProgramTemplateComponent implements OnInit {
  add: any;
  form = {
    weightage: '',
    description: '',
    category: '',
  };
  @Output() onClose = new EventEmitter<boolean>();

  constructor(private programTemplateService: ProgramTemplateService) {}

  async handleAddProgramTemplate(value) {
    const weightage =
      document.querySelector<HTMLInputElement>('.weightage')?.value;

    value.weightage = Number(weightage);
    console.log(value);
    await this.programTemplateService
      .addProgramTemplate(value)
      .then((response) => {
        if (response.status == 201) {
          Swal.fire('Added');
        } else {
          Swal.fire('Something went wrong !');
        }
      })
      .catch((error) => {
        Swal.fire('Something went wrong !');
      })
      .finally(() => this.handleClosePopup());
  }

  ngOnInit(): void {
    this.add = new window.bootstrap.Modal(document.getElementById('addModal'));

    this.add.show();
  }
  handleClosePopup() {
    this.add.hide();
    this.onClose.emit();
  }
}
