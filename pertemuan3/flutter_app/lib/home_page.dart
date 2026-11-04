import 'package:flutter/material.dart';
import 'package:flutter_app/sidemenu.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  // ignore: prefer_typing_uninitialized_variables
  var namasuer;

  void _loadUsername() async {
    // Inisialisasi share preferences
    SharedPreferences prefs = await SharedPreferences.getInstance();

    // Ambil Username yang sudah tersimpan
    namasuer = prefs.getString('username');

    // Set username on UI
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    _loadUsername();
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Home Page',
          style: TextStyle(color: Colors.white), // teks putih
        ), // AppBar
        backgroundColor: Colors.blue, // warna biru
        iconTheme: const IconThemeData(
          color: Colors.white,
        ), // ikon hamburger putih
      ),
      body: Center(child: Text('Ini adalah halaman User $namasuer')), // Center
      drawer: const Sidemenu(),
    ); // Scaffold
  }
}
