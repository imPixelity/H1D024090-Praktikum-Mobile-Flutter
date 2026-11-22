# CRUD Mahasiswa

Aplikasi Ionic Angular untuk melihat, menambah, mengubah, dan menghapus data mahasiswa melalui PHP API.

## Menjalankan lokal

1. Database `sinau` dan tabel `mahasiswa` dibuat oleh `crudmhs-backend/schema.sql`. Kredensial MariaDB di `crudmhs-backend/koneksi.php` saat ini memakai `mariadb_user` / `123`.
2. Dari direktori `crudmhs`, jalankan backend pada terminal pertama:

   ```sh
   php -S 0.0.0.0:8001 -t ../crudmhs-backend
   ```

3. Dari direktori `crudmhs`, jalankan aplikasi di terminal kedua:

   ```sh
   npm install
   npm start
   ```

4. Buka alamat yang dicetak Angular CLI, biasanya `http://localhost:4200`.

URL API diatur pada `src/environments/environment.ts` dan `environment.prod.ts`. Untuk perangkat fisik, ganti `localhost` dengan alamat IP komputer yang menjalankan PHP.
