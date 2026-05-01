import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}`
    });
  }

  // Logs
  getLogs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logs`, { headers: this.getHeaders() });
  }

  createLog(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/logs`, data, { headers: this.getHeaders() });
  }

  // Devices
  getDevices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/devices`, { headers: this.getHeaders() });
  }

  addDevice(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/devices`, data, { headers: this.getHeaders() });
  }

  updateDeviceStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/devices/${id}/status`, { status }, { headers: this.getHeaders() });
  }
}