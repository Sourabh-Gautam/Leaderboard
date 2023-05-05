/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import axios from 'axios';
import { ParticipantService } from './participant.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  baseUrl = 'http://localhost:8081/api/v1/profiles';
  profiles: any;
  designation: any;
  participantList: any;
  nameList: any;
  resourceManager: any;
  businessUnits: any;
  skill: any;
  subSkill: any;

  constructor(private participantService: ParticipantService) {}
  async getAllSkill() {
    await axios.get(`${this.baseUrl}/skills`).then((response) => {
      this.skill = response.data;
    });
    return this.skill;
  }

  // subSkill
  async getAllSubSkill() {
    await axios.get(`${this.baseUrl}/subSkills`).then((response) => {
      this.subSkill = response.data;
    });
    return this.subSkill;
  }
  // subSkill

  async getAllBusinessUnit() {
    await axios.get(`${this.baseUrl}/businessUnits`).then((response) => {
      this.businessUnits = response.data;
    });
    return this.businessUnits;
  }

  async getAllResourceManager() {
    await axios.get(`${this.baseUrl}/resourceManagers`).then((response) => {
      this.resourceManager = response.data;
    });
    return this.resourceManager;
  }

  async getAllProfiles() {
    await axios.get(this.baseUrl).then((response) => {
      this.profiles = response.data;
    });
    return this.profiles;
  }

  async editProfile(formData: any, profileId: number) {
    console.log('inside profile service');

    return await axios.put(`${this.baseUrl}/${profileId}`, formData);
  }

  async addProfile(formData) {
    return await axios.post(this.baseUrl, formData);
  }

  async getProfileByEmail(email: string) {
    return await axios.get(`${this.baseUrl}/email/${email}`);
  }

  async getAllDesignation() {
    await axios.get(`${this.baseUrl}/designations`).then((response) => {
      this.designation = response.data;
      console.log(response.data);
    });
    return this.designation;
  }

  async deleteProfile(profileId: number) {
    await axios.delete(`${this.baseUrl}/${profileId}`);
  }

  editProgramTemplate(value, profileId) {
    console.log('working');
  }
  async getAllProfilesForDropDown(programId: number) {
    this.participantList =
      this.participantService.getAllParticipants(programId);

    await axios.get(this.baseUrl).then((response) => {
      this.profiles = response.data;
    });
    this.participantList.then((data) => {
      this.nameList = data;
      for (let i = 0; i < this.profiles.length; i++) {
        for (let j = 0; j < this.nameList.length; j++) {
          if (this.profiles[i].name == this.nameList[j].participantName) {
            this.profiles.splice(i, 1);
          }
        }
      }
    });
    return this.profiles;
  }
}
