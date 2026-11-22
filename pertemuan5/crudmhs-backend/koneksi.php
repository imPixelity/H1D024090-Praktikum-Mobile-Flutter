<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function api_response(mixed $data, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function json_input(): array
{
    $data = json_decode(file_get_contents('php://input'), true);
    if (!is_array($data)) {
        api_response(['status' => 'gagal', 'message' => 'Body JSON tidak valid'], 400);
    }
    return $data;
}

$koneksi = mysqli_connect('localhost', 'mariadb_user', '123', 'sinau');
if (!$koneksi) {
    api_response(['status' => 'gagal', 'message' => 'Koneksi database gagal'], 500);
}

mysqli_set_charset($koneksi, 'utf8mb4');
