import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  logs: any[] = [];
  devices: any[] = [];
  totalLogs = 0;
  totalDevices = 0;
  onlineDevices = 0;

  constructor(private api: ApiService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.api.getLogs().subscribe((data: any) => {
      this.logs = data.slice(0, 5);
      this.totalLogs = data.length;
    });
    this.api.getDevices().subscribe((data: any) => {
      this.devices = data;
      this.totalDevices = data.length;
      this.onlineDevices = data.filter((d: any) => d.status === 'online').length;
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}