import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular/lazy';
import { firstValueFrom } from 'rxjs';
import { ApiService, Mahasiswa } from '../api.service';

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.page.html',
  styleUrls: ['./mahasiswa.page.scss'],
  standalone: false,
})
export class MahasiswaPage implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly modal = inject(ModalController);
  private readonly alertController = inject(AlertController);
  private readonly toastController = inject(ToastController);

  dataMahasiswa: Mahasiswa[] = [];
  id: number | null = null;
  nama = '';
  jurusan = '';
  modal_tambah = false;
  modal_edit = false;
  isLoading = false;
  isSaving = false;

  ngOnInit(): void {
    this.getMahasiswa();
  }

  async getMahasiswa(): Promise<void> {
    this.isLoading = true;
    try {
      this.dataMahasiswa = await firstValueFrom(this.apiService.tampil());
    } catch (error) {
      await this.showToast(this.errorMessage(error), 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  reset_model(): void {
    this.id = null;
    this.nama = '';
    this.jurusan = '';
  }

  open_modal_tambah(isOpen: boolean): void {
    this.reset_model();
    this.modal_edit = false;
    this.modal_tambah = isOpen;
  }

  async open_modal_edit(isOpen: boolean, idget: number): Promise<void> {
    this.reset_model();
    try {
      const mahasiswa = await firstValueFrom(this.apiService.lihat(idget));
      this.id = mahasiswa.id;
      this.nama = mahasiswa.nama;
      this.jurusan = mahasiswa.jurusan;
      this.modal_tambah = false;
      this.modal_edit = isOpen;
    } catch (error) {
      await this.showToast(this.errorMessage(error), 'danger');
    }
  }

  async cancel(): Promise<void> {
    await this.modal.dismiss();
    this.onModalDismiss();
  }

  onModalDismiss(): void {
    this.modal_tambah = false;
    this.modal_edit = false;
    this.reset_model();
  }

  async tambahMahasiswa(): Promise<void> {
    const nama = this.nama.trim();
    const jurusan = this.jurusan.trim();
    if (!nama || !jurusan) {
      await this.showToast('Nama dan jurusan wajib diisi.', 'warning');
      return;
    }

    this.isSaving = true;
    try {
      await firstValueFrom(this.apiService.tambah({ nama, jurusan }));
      await this.modal.dismiss();
      this.modal_tambah = false;
      this.reset_model();
      await this.getMahasiswa();
      await this.showToast('Data mahasiswa berhasil ditambahkan.', 'success');
    } catch (error) {
      await this.showToast(this.errorMessage(error), 'danger');
    } finally {
      this.isSaving = false;
    }
  }

  async editMahasiswa(): Promise<void> {
    const nama = this.nama.trim();
    const jurusan = this.jurusan.trim();
    if (this.id === null || !nama || !jurusan) {
      await this.showToast('Nama dan jurusan wajib diisi.', 'warning');
      return;
    }

    this.isSaving = true;
    try {
      await firstValueFrom(this.apiService.edit({ id: this.id, nama, jurusan }));
      await this.modal.dismiss();
      this.modal_edit = false;
      this.reset_model();
      await this.getMahasiswa();
      await this.showToast('Data mahasiswa berhasil diperbarui.', 'success');
    } catch (error) {
      await this.showToast(this.errorMessage(error), 'danger');
    } finally {
      this.isSaving = false;
    }
  }

  async hapusMahasiswa(id: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Hapus mahasiswa?',
      message: 'Data yang dihapus tidak dapat dikembalikan.',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Hapus',
          role: 'destructive',
          handler: () => {
            void this.confirmHapusMahasiswa(id);
          },
        },
      ],
    });
    await alert.present();
  }

  private async confirmHapusMahasiswa(id: number): Promise<void> {
    try {
      await firstValueFrom(this.apiService.hapus(id));
      await this.getMahasiswa();
      await this.showToast('Data mahasiswa berhasil dihapus.', 'success');
    } catch (error) {
      await this.showToast(this.errorMessage(error), 'danger');
    }
  }

  private async showToast(message: string, color: 'success' | 'warning' | 'danger'): Promise<void> {
    const toast = await this.toastController.create({ message, color, duration: 2500, position: 'bottom' });
    await toast.present();
  }

  private errorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const message = error.error?.message;
      if (typeof message === 'string') {
        return message;
      }
      return error.status === 0
        ? 'Backend tidak dapat dijangkau. Periksa alamat API dan server PHP.'
        : `Permintaan gagal (HTTP ${error.status}).`;
    }
    return error instanceof Error ? error.message : 'Terjadi kesalahan.';
  }
}
