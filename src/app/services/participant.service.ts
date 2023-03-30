import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  baseUrl = 'http://localhost:8082/api/v1/programs';
  participants: any;
  programId: any;
  name: any;
  constructor() {}

  async getAllParticipants(programId: number) {
    console.log('this is the program id', programId);
    await axios
      .get(`${this.baseUrl}/${programId}/participants`)
      .then((response) => {
        this.participants = response.data;
        // console.log(response.data);
      });
    return this.participants;
  }

  async deleteParticipants(programId: number, participantId: number) {
    await axios.delete(
      `${this.baseUrl}/${programId}/participants/${participantId}`
    );
  }

  async addparticipant(programId, formData) {
    console.log('formdata ', JSON.stringify(formData));
    return await axios.post(
      `${this.baseUrl}/${programId}/participants`,
      formData
    );
  }

  async updateparticipants(formData, programId: number, participantId: number) {
    console.log(formData);

    return await axios.put(
      `${this.baseUrl}/${programId}/participants/${participantId}`,
      formData
    );
  }
}
