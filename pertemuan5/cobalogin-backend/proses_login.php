<?php

require 'koneksi.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$username = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');

if ($username === '' || $password === '') {
    echo json_encode([
        'status_login' => 'gagal'
    ]);
    exit;
}

$password = md5($password);

$stmt = mysqli_prepare(
    $con,
    "SELECT username, password FROM user
     WHERE username = ? AND password = ?"
);

mysqli_stmt_bind_param(
    $stmt,
    "ss",
    $username,
    $password
);

mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

if ($value = mysqli_fetch_assoc($result)) {

    $pesan = [
        'username' => $value['username'],
        'token' => time() . '_' . $value['password'],
        'status_login' => 'berhasil'
    ];

} else {

    $pesan = [
        'status_login' => 'gagal'
    ];

}

echo json_encode($pesan);

mysqli_stmt_close($stmt);
mysqli_close($con);

?>
