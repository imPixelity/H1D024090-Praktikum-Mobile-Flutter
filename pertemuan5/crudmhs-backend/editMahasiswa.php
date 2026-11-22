<?php
require 'koneksi.php';

$data = json_input();
$id = filter_var($data['id'] ?? null, FILTER_VALIDATE_INT);
$nama = trim((string) ($data['nama'] ?? ''));
$jurusan = trim((string) ($data['jurusan'] ?? ''));

if (!$id || $id < 1 || $nama === '' || $jurusan === '') {
    api_response(['status' => 'gagal', 'message' => 'ID, nama, dan jurusan wajib diisi'], 422);
}

$stmt = mysqli_prepare($koneksi, 'UPDATE mahasiswa SET nama = ?, jurusan = ? WHERE id = ?');
mysqli_stmt_bind_param($stmt, 'ssi', $nama, $jurusan, $id);
if (!mysqli_stmt_execute($stmt)) {
    api_response(['status' => 'gagal', 'message' => 'Gagal mengubah data mahasiswa'], 500);
}

if (mysqli_stmt_affected_rows($stmt) === 0) {
    $check = mysqli_prepare($koneksi, 'SELECT id FROM mahasiswa WHERE id = ?');
    mysqli_stmt_bind_param($check, 'i', $id);
    mysqli_stmt_execute($check);
    if (!mysqli_stmt_get_result($check)->fetch_assoc()) {
        api_response(['status' => 'gagal', 'message' => 'Mahasiswa tidak ditemukan'], 404);
    }
}

api_response(['status' => 'sukses']);
