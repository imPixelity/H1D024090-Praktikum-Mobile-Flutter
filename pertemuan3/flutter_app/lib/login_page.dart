import 'package:flutter/material.dart';
import 'package:flutter_app/home_page.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  // ignore: prefer_typing_uninitialized_variables
  var namauser;

  void _saveUsername() async {
    // Inisialisasi Share Preferences
    SharedPreferences prefs = await SharedPreferences.getInstance();
    // Simpan Username ke local storage
    prefs.setString('username', _usernameController.text);
  }

  _showInput(namacontroller, placeholder, isPassword) {
    return TextField(
      controller: namacontroller,
      obscureText: isPassword,
      decoration: InputDecoration(hintText: placeholder), // InputDecoration
    ); // TextField
  }

  _showDialog(pesan, alamat) {
    return showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(pesan),
          actions: [
            TextButton(
              child: const Text('0K'),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => alamat,
                  ), // MaterialPageRoute
                );
              },
            ), // Text Button
          ],
        ); // Alert Dialog
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Login',
          style: TextStyle(color: Colors.white), // teks putih
        ), // AppBar
        backgroundColor: Colors.blue, // warna biru
      ),
      body: Container(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _showInput(_usernameController, 'Masukkan Username', false),
            _showInput(_passwordController, 'Masukkan Password', true),
            Container(
              margin: const EdgeInsets.only(
                top: 10,
              ), // jarak dari field di atasnya
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue, // tombol biru
                  foregroundColor: Colors.white, // teks putih
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(
                      4,
                    ), // kotak dengan sudut sedikit membulat
                  ),
                ),
                child: const Text('Login'),
                onPressed: () {
                  if (_usernameController.text == 'admin' &&
                      _passwordController.text == 'admin') {
                    // save Username
                    _saveUsername();

                    // Show alert
                    _showDialog('Anda Berhasil Login', const HomePage());
                  } else {
                    // Show alert
                    _showDialog(
                      'Username dan Password Salah',
                      const LoginPage(),
                    );
                  }
                },
              ), // ElevatedButton
            ), // Container
          ],
        ), // Column
      ), // Container
    ); // Scaffold
  }
}
