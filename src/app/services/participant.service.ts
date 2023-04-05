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
    await axios
      .get(`${this.baseUrl}/${programId}/participants`)
      .then((response) => {
        this.participants = response.data;
      });
    return this.participants;
  }

  async getParticipantDetails(email: string) {
    await axios
      .get(`http://localhost:8082/api/v1/participants-contribution/${email}`)
      .then((response) => {
        this.participants = response.data;
      });
    return this.participants;
  }

  async deleteParticipants(programId: number, participantId: number) {
    await axios.delete(
      `${this.baseUrl}/${programId}/participants/${participantId}`
    );
  }

  async addparticipant(programId, formData) {
    return await axios.post(
      `${this.baseUrl}/${programId}/participants`,
      formData
    );
  }

  async updateparticipants(formData, programId: number, participantId: number) {
    return await axios.put(
      `${this.baseUrl}/${programId}/participants/${participantId}`,
      formData
    );
  }
}
