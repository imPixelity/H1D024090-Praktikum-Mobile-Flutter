import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AlertController } from '@ionic/angular/lazy';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  private readonly authService = inject(AuthenticationService);
  private readonly alertController = inject(AlertController);
  private readonly router = inject(Router);

  username = '';
  password = '';
  isLoading = false;

  async login(): Promise<void> {
    const username = this.username.trim();
    if (!username || !this.password) {
      await this.showAlert('Username dan password tidak boleh kosong.');
      return;
    }

    this.isLoading = true;
    try {
      const success = await this.authService.login(username, this.password);
      if (!success) {
        await this.showAlert('Username atau password salah.');
        return;
      }

      this.username = '';
      this.password = '';
      await this.router.navigateByUrl('/dashboard', { replaceUrl: true });
    } catch (error) {
      console.error('Login gagal', error);
      const serverMessage =
        error instanceof HttpErrorResponse && typeof error.error?.message === 'string'
          ? error.error.message
          : null;
      const message = serverMessage
        ? `Login gagal: ${serverMessage}`
        : error instanceof HttpErrorResponse && error.status === 0
          ? 'Server tidak dapat dijangkau. Periksa koneksi dan alamat API.'
          : 'Terjadi kesalahan pada server. Periksa konfigurasi backend.';
      await this.showAlert(message);
    } finally {
      this.isLoading = false;
    }
  }

  private async showAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Notifikasi',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
