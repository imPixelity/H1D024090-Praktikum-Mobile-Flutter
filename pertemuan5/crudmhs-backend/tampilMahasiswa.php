<?php
require 'koneksi.php';

$query = mysqli_query($koneksi, 'SELECT id, nama, jurusan FROM mahasiswa ORDER BY id DESC');
if (!$query) {
    api_response(['status' => 'gagal', 'message' => 'Gagal mengambil data mahasiswa'], 500);
}

$data = [];
while ($row = mysqli_fetch_assoc($query)) {
    $row['id'] = (int) $row['id'];
    $data[] = $row;
}

api_response($data);
