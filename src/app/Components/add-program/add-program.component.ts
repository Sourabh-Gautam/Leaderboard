import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProgramTemplateService } from 'src/app/services/program-template.service';
import { ProgramService } from 'src/app/services/program.service';
import Swal from 'sweetalert2';
declare var window: any;

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css'],
})
export class AddProgramComponent implements OnInit {
  categoryList: any;
  add: any;
  username: string | null;
  form = {
    title: '',
    description: '',

    weightage: '',
  };
  @Output() onClose = new EventEmitter<boolean>();
  constructor(
    private programService: ProgramService,
    private programTemplateService: ProgramTemplateService
  ) {
    this.username = sessionStorage.getItem('username');
  }

  async handleAddProgram(value) {
    const organizersElement =
      document.querySelector<HTMLInputElement>('.organizers');
    const organizersValue = organizersElement?.value.split(',') ?? [];

    value.organizers = organizersValue;

    let weightage =
      document.querySelector<HTMLInputElement>('.weightage')?.value;

    value.weightage = Number(weightage);
    console.log('ts file data', value);

    await this.programService
      .addProgram(value)
      .then((response) => {
        if (response.status == 201) {
          Swal.fire('Added').then(() => {});
        } else {
          Swal.fire('Something went wrong !');
        }
      })
      .catch((error) => {
        Swal.fire('Something went wrong !');
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
    this.add = new window.bootstrap.Modal(document.getElementById('addModal'));
    this.add.show();
    this.programTemplateService.getAllProgramTemplate().then((data: any) => {
      this.categoryList = data;
    });
  }
}
