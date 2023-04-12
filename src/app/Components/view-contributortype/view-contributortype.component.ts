import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataExport } from 'src/app/common.func';
import { ContributorService } from 'src/app/services/contributor.service';

@Component({
  selector: 'app-view-contributortype',
  templateUrl: './view-contributortype.component.html',
  styleUrls: ['./view-contributortype.component.css'],
})
export class ViewContributortypeComponent implements OnInit {
  contributorTypeList: any;
  addPopup: boolean;
  editPopup: boolean;
  contributortype: any;

  constructor(
    private contributorService: ContributorService,
    private router: Router
  ) {}
  handleAddContributorType() {
    this.addPopup = true;
  }
  ngOnInit(): void {
    this.contributorService.getAllContributorTypes().then((data: any) => {
      this.contributorTypeList = data;
    });
  }
  async getAllContributorTypes() {
    await this.contributorService.getAllContributorTypes().then((response) => {
      this.contributorTypeList = response;
    });
  }
  handleAddContributortype() {
    this.addPopup = true;
  }

  handleContributorTypeExport() {
    dataExport(this.contributorTypeList, 'contributor-type-data');
  }

  handleEditContributortype(contributortype) {
    this.contributortype = contributortype;
    this.editPopup = true;
  }

  async handleDeleteContributortype(event) {
    let contributortypeId = event.currentTarget.nextSibling.value;
    console.log(contributortypeId);
    await this.contributorService.deleteContributorTypes(contributortypeId);
    this.getAllContributorTypes();
  }

  closeEditPopUp() {
    this.editPopup = false;
  }
  closeAddPopUp() {
    this.addPopup = false;
  }
}
