<?php
require 'koneksi.php';

$id = filter_var($_GET['id'] ?? null, FILTER_VALIDATE_INT);
if (!$id || $id < 1) {
    api_response(['status' => 'gagal', 'message' => 'ID mahasiswa tidak valid'], 400);
}

$stmt = mysqli_prepare($koneksi, 'DELETE FROM mahasiswa WHERE id = ?');
mysqli_stmt_bind_param($stmt, 'i', $id);
if (!mysqli_stmt_execute($stmt)) {
    api_response(['status' => 'gagal', 'message' => 'Gagal menghapus mahasiswa'], 500);
}
if (mysqli_stmt_affected_rows($stmt) === 0) {
    api_response(['status' => 'gagal', 'message' => 'Mahasiswa tidak ditemukan'], 404);
}

api_response(['status' => 'sukses']);
