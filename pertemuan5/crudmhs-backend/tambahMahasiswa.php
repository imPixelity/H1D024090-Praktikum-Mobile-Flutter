<?php
require 'koneksi.php';

$data = json_input();
$nama = trim((string) ($data['nama'] ?? ''));
$jurusan = trim((string) ($data['jurusan'] ?? ''));

if ($nama === '' || $jurusan === '') {
    api_response(['status' => 'gagal', 'message' => 'Nama dan jurusan wajib diisi'], 422);
}

$stmt = mysqli_prepare($koneksi, 'INSERT INTO mahasiswa (nama, jurusan) VALUES (?, ?)');
if (!$stmt) {
    api_response(['status' => 'gagal', 'message' => 'Gagal menyiapkan query'], 500);
}
mysqli_stmt_bind_param($stmt, 'ss', $nama, $jurusan);
if (!mysqli_stmt_execute($stmt)) {
    api_response(['status' => 'gagal', 'message' => 'Gagal menambahkan mahasiswa'], 500);
}

api_response([
    'status' => 'sukses',
    'id' => mysqli_insert_id($koneksi),
], 201);
