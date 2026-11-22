# Coba Login

Aplikasi Ionic Angular untuk autentikasi, sesi tersimpan, dan auth guards.

## Menjalankan lokal

1. Pastikan MySQL aktif dan database `belajarcrud` memiliki tabel `user` dengan kolom `username` dan `password` (hash MD5, sesuai endpoint PHP yang tersedia).
2. Dari direktori `cobalogin`, jalankan backend:

   ```sh
   php -S 0.0.0.0:8000 -t ../cobalogin-backend
   ```

3. Di terminal lain, jalankan aplikasi:

   ```sh
   npm install
   npm start
   ```

4. Buka alamat yang ditampilkan oleh Angular CLI (biasanya `http://localhost:4200`).

Alamat API untuk development dan production ada di `src/environments/environment.ts` dan `src/environments/environment.prod.ts`. Keduanya saat ini menggunakan `http://localhost:8000/`. Untuk menjalankan aplikasi pada perangkat fisik, ubah `localhost` menjadi alamat IP komputer yang dapat dijangkau perangkat tersebut.
