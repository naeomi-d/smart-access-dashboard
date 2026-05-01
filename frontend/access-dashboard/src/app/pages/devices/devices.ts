import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './devices.html',
  styleUrl: './devices.css'
})
export class Devices implements OnInit {
  devices: any[] = [];
  newDevice = { name: '', location: '' };
  showForm = false;

  constructor(private api: ApiService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadDevices();
  }

  loadDevices() {
    this.api.getDevices().subscribe((data: any) => {
      this.devices = data;
    });
  }

  addDevice() {
    if (!this.newDevice.name || !this.newDevice.location) return;
    this.api.addDevice(this.newDevice).subscribe(() => {
      this.newDevice = { name: '', location: '' };
      this.showForm = false;
      this.loadDevices();
    });
  }

  toggleStatus(device: any) {
    const newStatus = device.status === 'online' ? 'offline' : 'online';
    this.api.updateDeviceStatus(device.id, newStatus).subscribe(() => {
      this.loadDevices();
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}