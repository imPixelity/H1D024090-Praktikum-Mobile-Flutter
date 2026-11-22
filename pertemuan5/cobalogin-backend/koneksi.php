<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: PUT, GET, HEAD, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$con = mysqli_connect(
    'localhost',
    'mariadb_user',
    '123',
    'belajarcrud'
);

if (!$con) {
    http_response_code(500);
    echo json_encode([
        'status_login' => 'error',
        'message' => 'Koneksi database gagal'
    ]);
    exit;
}

?>
