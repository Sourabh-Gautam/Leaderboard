/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
  profiles: any;
  profile: any;
  editPopup: boolean;
  addPopup: boolean;
  data: Array<any>;
  subSkillData :Array<any>;
  subSkill : any;
  totalRecords: number;
  page: number = 1;
  itemPerPage: number = 5;
  constructor(private profileService: ProfileService) {
    this.getAllProfiles();
    this.data = new Array<any>();
  }
  async getAllProfiles() {
    await this.profileService.getAllProfiles().then((data) => {
      this.profiles = data;
    });
    this.data = this.profiles;
    this.totalRecords = this.data.length;
  }
  async getAllSubSkills() {
    await this.profileService.getAllSubSkill().then((subSkillData) => {
      this.subSkill = subSkillData;
    });
    this.subSkillData = this.subSkill;
  }
  async handleAddProfile() {
    this.addPopup = true;
  }

  async handleEditProfile(profile) {
    console.log(profile);
    this.profile = profile;
    this.editPopup = true;
  }
  async handleDeleteProfile(profileId) {
    await this.profileService.deleteProfile(profileId);
    this.getAllProfiles();
  }
  closeEditPopUp() {
    this.editPopup = false;
  }
  closeAddPopUp() {
    this.addPopup = false;
  }
  ngOnInit(): void {}
}
