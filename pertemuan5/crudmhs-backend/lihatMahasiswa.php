<?php
require 'koneksi.php';

$id = filter_var($_GET['id'] ?? null, FILTER_VALIDATE_INT);
if (!$id || $id < 1) {
    api_response(['status' => 'gagal', 'message' => 'ID mahasiswa tidak valid'], 400);
}

$stmt = mysqli_prepare($koneksi, 'SELECT id, nama, jurusan FROM mahasiswa WHERE id = ?');
mysqli_stmt_bind_param($stmt, 'i', $id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$mahasiswa = mysqli_fetch_assoc($result);

if (!$mahasiswa) {
    api_response(['status' => 'gagal', 'message' => 'Mahasiswa tidak ditemukan'], 404);
}
$mahasiswa['id'] = (int) $mahasiswa['id'];
api_response($mahasiswa);
