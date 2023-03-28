import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ContributorService {
  baseUrl = 'http://localhost:8082/api/v1/contributorTypes';
  contributorType: any;

  async getAllContributorTypes() {
    await axios.get(`${this.baseUrl}`).then((response) => {
      this.contributorType = response.data;
    });
    return this.contributorType;
  }
  async deleteContributorTypes(contributorTypeId: number) {
    await axios.delete(`${this.baseUrl}/${contributorTypeId}`);
  }

  async editContributorTypes(formData: any, contributorTypeId: number) {
    console.log('this is service data', formData);

    return await axios.put(`${this.baseUrl}/${contributorTypeId}`, formData);
  }

  async addContributorTypes(formData) {
    return await axios.post(this.baseUrl, formData);
  }
}
