import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = 'http://localhost:8080/api/v1/dashboard';

  constructor(private http: HttpClient) {}

  async getParticipants(pageNo: number, recordCount: number, sortFilterModel) {
    console.log(sortFilterModel);
    return await this.http.post(
      `${this.baseUrl}/${pageNo - 1}/${recordCount}`,
      sortFilterModel
    );
  }

  async getParticipantsCount() {
    return await this.http.get<number>(`${this.baseUrl}/participants-count`);
  }
}
