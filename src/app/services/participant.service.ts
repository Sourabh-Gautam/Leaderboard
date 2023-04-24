import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  baseUrl = 'http://localhost:8082/api/v1/programs';
  pdBaseUrl = 'http://localhost:8082/api/v1/participants-details';
  participants: any;
  programId: any;

  async getAllParticipants(programId: number) {
    await axios
      .get(`${this.baseUrl}/${programId}/participants`)
      .then((response) => {
        this.participants = response.data;
      });
    return this.participants;
  }

  async getParticipantByEmail(email: string) {
    const response = await axios.get(`${this.pdBaseUrl}/email/${email}`);
     this.participants = response.data.sort((a, b) => {
     return b.awardedDate.localeCompare(a.awardedDate);
     });
    return this.participants;
    }

  async getParticipantByDesignation(value: string) {
    await axios
      .get(`${this.pdBaseUrl}/designation/${value}`)
      .then((response) => {
        this.participants = response.data;
      });
    return this.participants;
  }

  async getParticipantByBU(value: string) {
    await axios.get(`${this.pdBaseUrl}/bu/${value}`).then((response) => {
      this.participants = response.data;
    });
    return this.participants;
  }

  async getParticipantByPS(value: string) {
    await axios.get(`${this.pdBaseUrl}/ps/${value}`).then((response) => {
      this.participants = response.data;
    });
    return this.participants;
  }

  async getParticipantByRM(value: string) {
    await axios.get(`${this.pdBaseUrl}/rm/${value}`).then((response) => {
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
