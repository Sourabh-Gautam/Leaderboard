/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';
declare let window: any;
@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css'],
})
export class AddProfileComponent implements OnInit {
  add: any;
  designations: any;
  ResourceManager: any;
  BusinessUnit: any;
  primarySkill: any;
  subSkill: any;
  email:any;
  form = {
    name: '',
  };
  @Output() onClose = new EventEmitter<boolean>();
  constructor(private profileService: ProfileService) {}
  async getDesignations() {
    this.profileService.getAllDesignation().then((data) => {
      this.designations = data;
    });
  }
  async getResourceManager() {
    this.profileService.getAllResourceManager().then((data) => {
      this.ResourceManager = data;
      console.log('data of resourcemanager:', this.ResourceManager);
    });
  }
  async getSkills() {
    this.profileService.getAllSkill().then((data) => {
      this.primarySkill = data;
      console.log('data of primary Skill:', this.primarySkill);
    });
    // console.log('inside add component', this.primarySkill);
  }

  // sub Skill
  async getSubSkills() {
    this.profileService.getAllSubSkill().then((data) => {
      this.subSkill = data;
      console.log('data of Sub Skill: ', this.subSkill);
    });
    // console.log('inside add component', this.subSkill);
  }
  // subSkill
  async getBusinessUnit() {
    this.profileService.getAllBusinessUnit().then((data) => {
      this.BusinessUnit = data;
    });
  }
  async handleAddProfile(formData) {
    console.log('haddle add profile data', formData);
    const subskills : any[] = [];
    formData.subSkill.forEach(element => subskills.push(element['subSkillName']));
    console.log('Sub Skills', subskills);
    formData['subSkill'] = subskills;

    await this.profileService
      .addProfile(formData)
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
      .finally(() => {
        this.handleClosePopup();
      });
    this.designations();
  }
  ngOnInit(): void {
    this.add = new window.bootstrap.Modal(document.getElementById('addModal'));
    this.add.show();
    this.getDesignations();
    this.getSkills();
    this.getSubSkills();
    this.getResourceManager();
    console.log('snekaaa', this.getSkills());
    this.getBusinessUnit();
  }
  handleClosePopup() {
    this.add.hide();
    this.onClose.emit();
  }
}
