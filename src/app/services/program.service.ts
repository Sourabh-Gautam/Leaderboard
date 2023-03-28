import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  baseUrl = 'http://localhost:8082/api/v1/programs';
  programs: any;
  constructor() {}

  async getAllPrograms() {
    await axios.get(this.baseUrl).then((response) => {
      this.programs = response.data;
    });
    return this.programs;
  }

  async deleteProgram(programId: number) {
    await axios.delete(`${this.baseUrl}/${programId}`);
  }

  async addProgram(formData) {
    return await axios.post(this.baseUrl, formData);
  }

  async updateProgram(formData, programId) {
    return await axios.put(`${this.baseUrl}/${programId}`, formData);
  }
}
