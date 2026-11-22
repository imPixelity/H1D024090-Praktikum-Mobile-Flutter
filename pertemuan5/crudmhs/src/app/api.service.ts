import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Mahasiswa {
  id: number;
  nama: string;
  jurusan: string;
}

export interface ApiResult {
  status: 'sukses' | 'gagal';
  message?: string;
  id?: number;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  tampil(endpoint = 'tampilMahasiswa.php'): Observable<Mahasiswa[]> {
    return this.http.get<Mahasiswa[]>(`${this.baseUrl}${endpoint}`);
  }

  tambah(data: Pick<Mahasiswa, 'nama' | 'jurusan'>, endpoint = 'tambahMahasiswa.php'): Observable<ApiResult> {
    return this.http.post<ApiResult>(`${this.baseUrl}${endpoint}`, data);
  }

  edit(data: Mahasiswa, endpoint = 'editMahasiswa.php'): Observable<ApiResult> {
    return this.http.put<ApiResult>(`${this.baseUrl}${endpoint}`, data);
  }

  hapus(id: number, endpoint = 'hapusMahasiswa.php'): Observable<ApiResult> {
    return this.http.delete<ApiResult>(`${this.baseUrl}${endpoint}?id=${encodeURIComponent(id)}`);
  }

  lihat(id: number, endpoint = 'lihatMahasiswa.php'): Observable<Mahasiswa> {
    return this.http.get<Mahasiswa>(`${this.baseUrl}${endpoint}?id=${encodeURIComponent(id)}`);
  }
}
