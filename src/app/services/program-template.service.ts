import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ProgramTemplateService {
  baseUrl = 'http://localhost:8082/api/v1/programTemplates';
  programs: any;
  constructor() {}

  async getAllProgramTemplate() {
    await axios.get(this.baseUrl).then((response) => {
      this.programs = response.data;
    });
    return this.programs;
  }

  async deleteProgramTemplate(programTemplateId: number) {
    await axios.delete(`${this.baseUrl}/${programTemplateId}`);
  }

  async editProgramTemplate(formData: any, programTemplateId: number) {
    return await axios.put(`${this.baseUrl}/${programTemplateId}`, formData);
  }

  async addProgramTemplate(formData) {
    return await axios.post(this.baseUrl, formData);
  }
}
