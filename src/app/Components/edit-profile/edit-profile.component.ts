/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

declare var window: any;
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  @Input() profile: any;
  @Output() onClose = new EventEmitter<boolean>();
  edit: any;
  designations: any;

  ResourceManager: any;
  BusinessUnit: any;
  primarySkill: any;
  subSkill: any;
  constructor(private profileService: ProfileService) {}

  async getDesignations() {
    this.profileService.getAllDesignation().then((data) => {
      this.designations = data;
    });
  }
  async getResourceManager() {
    this.profileService.getAllResourceManager().then((data) => {
      this.ResourceManager = data;
    });
  }
  async getSkills() {
    this.profileService.getAllSkill().then((data) => {
      this.primarySkill = data;
      console.log('ksfks', data);
    });
    console.log('inside add component', this.primarySkill);
  }
  async getSubSkills() {
    this.profileService.getAllSubSkill().then((data) => {
      this.subSkill = data;
      console.log('ksfks', data);
    });
    console.log('inside add component', this.subSkill);
  }
  async getBusinessUnit() {
    this.profileService.getAllBusinessUnit().then((data) => {
      this.BusinessUnit = data;
    });
  }
  async handleEditProfile(value) {
    console.log('sneka', value.resourceManager);
    console.log('Handler called');
    console.log('Profile', this.profile);
    const subskills : any[] = [];
    value.subSkill.forEach(element => subskills.push(element['subSkillName']));
    console.log('Sub Skills', subskills);
    value['subSkill'] = subskills;

    await this.profileService
      .editProfile(value, this.profile.id)
      .then((response) => {
        if (response.status == 200) {
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

  handleClosePopup() {
    this.edit.hide();
    this.onClose.emit();
  }

  ngOnInit(): void {
    this.edit = new window.bootstrap.Modal(
      document.getElementById('editModal')
    );
    this.getSkills();
    this.getSubSkills();
    this.getBusinessUnit();
    this.getResourceManager();
    this.edit.show();

    this.getDesignations();
  }
}
