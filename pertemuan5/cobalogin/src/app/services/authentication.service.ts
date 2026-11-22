import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

const TOKEN_KEY = 'token-saya';
const USERNAME_KEY = 'namasaya';

interface LoginResponse {
  status_login: 'berhasil' | 'gagal' | 'error';
  token?: string;
  username?: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly http = inject(HttpClient);
  readonly isAuthenticated = new BehaviorSubject<boolean | null>(null);
  private token = '';
  private readonly tokenLoad: Promise<void>;

  constructor() {
    this.tokenLoad = this.loadToken();
  }

  get apiURL(): string {
    return environment.apiUrl;
  }

  async loadToken(): Promise<void> {
    try {
      const { value } = await Preferences.get({ key: TOKEN_KEY });
      this.token = value ?? '';
      this.isAuthenticated.next(Boolean(this.token));
    } catch (error) {
      console.error('Gagal memuat sesi login', error);
      this.isAuthenticated.next(false);
    }
  }

  async login(username: string, password: string): Promise<boolean> {
    await this.tokenLoad;
    const response = await firstValueFrom(
      this.http.post<LoginResponse>(`${this.apiURL}proses_login.php`, {
        username,
        password,
      }),
    );

    if (response.status_login !== 'berhasil' || !response.token || !response.username) {
      return false;
    }

    await Promise.all([
      Preferences.set({ key: TOKEN_KEY, value: response.token }),
      Preferences.set({ key: USERNAME_KEY, value: response.username }),
    ]);
    this.token = response.token;
    this.isAuthenticated.next(true);
    return true;
  }

  async getUsername(): Promise<string> {
    const { value } = await Preferences.get({ key: USERNAME_KEY });
    return value ?? '';
  }

  async logout(): Promise<void> {
    this.isAuthenticated.next(false);
    this.token = '';
    await Promise.all([
      Preferences.remove({ key: TOKEN_KEY }),
      Preferences.remove({ key: USERNAME_KEY }),
    ]);
  }
}
