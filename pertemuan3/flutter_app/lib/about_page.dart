import 'package:flutter/material.dart';
import 'package:flutter_app/sidemenu.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'About Page',
          style: TextStyle(color: Colors.white), // teks putih
        ), // AppBar
        backgroundColor: Colors.blue, // warna biru
        iconTheme: const IconThemeData(
          color: Colors.white,
        ), // ikon hamburger putih
      ),
      body: const Center(child: Text('Ini adalah halaman About')), // Center
      drawer: const Sidemenu(),
    ); // Scaffold
  }
}
