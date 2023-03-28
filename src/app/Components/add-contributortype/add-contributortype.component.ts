import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContributorService } from 'src/app/services/contributor.service';
import Swal from 'sweetalert2';
declare var window: any;
@Component({
  selector: 'app-add-contributortype',
  templateUrl: './add-contributortype.component.html',
  styleUrls: ['./add-contributortype.component.css'],
})
export class AddContributortypeComponent implements OnInit {
  add: any;
  @Output() closePopup = new EventEmitter<boolean>();
  form = {
    contributerType: '',
    points: '',
  };

  constructor(private contributorService: ContributorService) {}

  async handleAddcontributortype(value) {
    console.log(value);
    await this.contributorService
      .addContributorTypes(value)
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
    this.closePopup.emit();
  }
}
