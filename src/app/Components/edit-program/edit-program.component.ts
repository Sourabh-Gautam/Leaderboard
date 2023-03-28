import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProgramTemplateService } from 'src/app/services/program-template.service';
import { ProgramService } from 'src/app/services/program.service';
import Swal from 'sweetalert2';
declare var window: any;

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.css'],
})
export class EditProgramComponent implements OnInit {
  @Input() program: any;
  @Output() onClose = new EventEmitter<boolean>();
  add: any;
  categoryList: any;
  constructor(
    private programService: ProgramService,
    private programTemplateService: ProgramTemplateService
  ) {}

  async handleEditProgram(value) {
    let weightage =
      document.querySelector<HTMLInputElement>('.weightage')?.value;

    value.weightage = Number(weightage);

    await this.programService
      .updateProgram(value, this.program.programId)
      .then((response) => {
        if (response.status == 202) {
          Swal.fire('Updated');
        } else {
          Swal.fire('Some went wrong');
        }
      })
      .catch((error) => {
        Swal.fire('Some went wrong');
      })
      .finally(() => {
        this.handleClosePopup();
      });
  }

  handleClosePopup() {
    this.add.hide();
    this.onClose.emit();
  }

  ngOnInit(): void {
    this.add = new window.bootstrap.Modal(document.getElementById('editModel'));
    this.programTemplateService.getAllProgramTemplate().then((data: any) => {
      this.categoryList = data;
    });
    this.add.show();
  }
}
