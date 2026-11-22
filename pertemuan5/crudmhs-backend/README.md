# CRUD Mahasiswa PHP API

Endpoint CRUD untuk aplikasi `crudmhs`:

- `GET tampilMahasiswa.php`
- `POST tambahMahasiswa.php` dengan JSON `{ "nama": "...", "jurusan": "..." }`
- `GET lihatMahasiswa.php?id=...`
- `PUT editMahasiswa.php` dengan JSON `{ "id": 1, "nama": "...", "jurusan": "..." }`
- `DELETE hapusMahasiswa.php?id=...`

Import `schema.sql` jika database belum dibuat. Koneksi memakai database `sinau` dan akun MariaDB yang dikonfigurasi dalam `koneksi.php`.
