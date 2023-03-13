## API Zakat Penghasilan

Projek ini dapat menghitung zakat penghasilan yang harus dibayarkan oleh seseorang dengan hanya mengetahui gaji bulanannya dan besarnya penghasilan tambahan yang diperolehnya selama setahun jika ada.

Zakat adalah salah satu syari'at / aturan dalam agama Islam yang mewajibkan seseorang mengeluarkan sebagian hartanya jika telah memenuhi syarat tertentu dan disalurkan kepada penerima tertentu. Zakat terdiri dari beberapa jenis, seperti zakat fitrah, zakat profesi, zakat logam mulia, dan lain-lain. Tetapi, untuk saat ini hanya tersedia perhitungan zakat penghasilan.

Zakat penghasilan adalah zakat yang dikeluarkan dari penghasilan seseorang selama setahun penuh, baik itu dari gaji maupun dari sumber penghasilan lainnya. Seorang Muslim diwajibkan membayar zakat penghasilan jika jumlah penghasilannya selama setahun penuh telah memenuhi nisab atau minimal jumlah penghasilan selama setahun, yakni 85 gram emas.

## Link akses live demo

Projek ini bisa diakses lewat link [https://zakat-penghasilan-api.vercel.app](https://zakat-penghasilan-api.vercel.app).

Saat ini baru disediakan versi API saja.

## Menu yang disediakan

Berikut ini adalah beberapa menu yang bisa diakses:

- `/api/count` (method POST), menghitung zakat penghasilan
- `/api/nisab` (method GET), mengetahui nishab zakat penghasilan hari ini dalam rupiah
- `/api/gold-price` (method GET), mengetahui harga 1 gram emas hari ini

Cara pakainya, tambahkan tulisan di atas setelah link projek. Disarankan akses menggunakan [Postman](https://www.postman.com/)

## Cara Menghitung Zakat

Masuk ke menu `/api/count` (method POST), lalu isikan dengan variabel berikut:
- `"salary"`, diisi dengan gaji per bulan (wajib diisi, jika tidak sedang bekerja isikan dengan 0)
- `"anotherIncome"`, diisi dengan penghasilan tambahan selain gaji dalam satu tahun (opsional)
Jalankan menu `/api/count`, dan akan muncul hasil berupa object `"data"` dengan isi sebagai berikut:
- `"wajibZakat"`, jika berisi `false` maka belum wajib membayar zakat penghasilan berdasarkan data yang dimasukkan. Sedangkan jika `true`, maka sudah wajib membayar zakat penghasilan.
- `"perYear"`, berisi nominal zakat (dalam rupiah) yang wajib dibayarkan setiap tahun, jika memilih membayar per tahun.
- `"perMonth"`, berisi nominal zakat (dalam rupiah) yang wajib dibayarkan setiap bulan, jika memilih membayar per bulan.

## Disclaimer

Harga emas diambil dari [MetalPriceAPI](https://metalpriceapi.com) setiap 1 kali sehari.