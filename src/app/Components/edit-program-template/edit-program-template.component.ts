import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProgramTemplateService } from 'src/app/services/program-template.service';
import Swal from 'sweetalert2';
declare var window: any;
@Component({
  selector: 'app-edit-program-template',
  templateUrl: './edit-program-template.component.html',
  styleUrls: ['./edit-program-template.component.css'],
})
export class EditProgramTemplateComponent implements OnInit {
  @Input() programTemplate: any;
  @Output() onClose = new EventEmitter<boolean>();

  edit: any;

  constructor(
    private programTemplateService: ProgramTemplateService,
    private router: Router
  ) {}

  async handleEditProgramTemplate(value) {
    console.log(value);

    let weightage =
      document.querySelector<HTMLInputElement>('.weightage')?.value;

    value.weightage = Number(weightage);

    await this.programTemplateService
      .editProgramTemplate(value, this.programTemplate.programTemplateId)
      .then((response) => {
        if (response.status == 202) {
          Swal.fire('Updated');
        } else {
          Swal.fire('Something went wrong');
        }
      })
      .catch((error) => {
        Swal.fire('Something went wrong');
      })
      .finally(() => {
        this.handleClosePopup();
      });
  }
  ngOnInit(): void {
    this.edit = new window.bootstrap.Modal(
      document.getElementById('editModal')
    );

    this.edit.show();
  }
  handleClosePopup() {
    this.edit.hide();
    this.onClose.emit();
  }
}
