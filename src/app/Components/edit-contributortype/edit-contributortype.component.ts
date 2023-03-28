import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ContributorService } from 'src/app/services/contributor.service';
import Swal from 'sweetalert2';
declare let window: any;
@Component({
  selector: 'app-edit-contributortype',
  templateUrl: './edit-contributortype.component.html',
  styleUrls: ['./edit-contributortype.component.css'],
})
export class EditContributortypeComponent implements OnInit {
  @Input() contributortype: any;
  @Output() closePopup = new EventEmitter<boolean>();

  edit: any;

  constructor(
    private contributorService: ContributorService,
    private router: Router
  ) {}

  async handleEditcontributorType(value) {
    value.points = Number(value.points);

    await this.contributorService
      .editContributorTypes(value, this.contributortype.id)
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
    this.closePopup.emit();
  }
}
