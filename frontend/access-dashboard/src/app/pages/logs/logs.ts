import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './logs.html',
  styleUrl: './logs.css'
})
export class Logs implements OnInit {
  logs: any[] = [];
  devices: any[] = [];
  selectedDevice = '';
  selectedType = 'tap_in';

  constructor(private api: ApiService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadLogs();
    this.api.getDevices().subscribe((data: any) => {
      this.devices = data;
      if (data.length > 0) this.selectedDevice = data[0].name;
    });
  }

  loadLogs() {
    this.api.getLogs().subscribe((data: any) => {
      this.logs = data;
    });
  }

  tapIn() {
    const log = {
      user_id: 1,
      device_name: this.selectedDevice,
      access_type: this.selectedType
    };
    this.api.createLog(log).subscribe(() => {
      this.loadLogs();
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}