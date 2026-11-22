import { Component, inject, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular/lazy';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  private readonly authService = inject(AuthenticationService);
  private readonly alertController = inject(AlertController);
  private readonly router = inject(Router);

  nama = '';

  async ngOnInit(): Promise<void> {
    this.nama = await this.authService.getUsername();
  }

  async logout(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Perhatian',
      message: 'Yakin ingin logout dari aplikasi?',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Yakin',
          role: 'confirm',
          handler: () => {
            void this.finishLogout();
          },
        },
      ],
    });
    await alert.present();
  }

  private async finishLogout(): Promise<void> {
    await this.authService.logout();
    await this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
