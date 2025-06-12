document.addEventListener("DOMContentLoaded", () => {
  const namaEl = document.getElementById("outputNama");
  const alamatEl = document.getElementById("outputAlamat");
  const tanggalEl = document.getElementById("outputTanggal");
  const jamEl = document.getElementById("outputJam");
  const layananEl = document.getElementById("outputLayanan");
  const form = document.getElementById("formOrder");
  const beratInput = document.getElementById("berat");
  const tipeLayananInput = document.getElementById("tipeLayanan");
  const totalHargaEl = document.getElementById("totalHarga");

  const bookingData = JSON.parse(localStorage.getItem("bookingData"));

  if (!bookingData) {
    alert("Data pemesanan tidak ditemukan. Silakan isi formulir pemesanan terlebih dahulu.");
    window.location.href = "booking.html";
    return;
  }

  // Tampilkan info user
  namaEl.textContent = bookingData.nama;
  alamatEl.textContent = bookingData.alamat;
  tanggalEl.textContent = bookingData.tanggal;
  jamEl.textContent = bookingData.jam;
  layananEl.textContent = bookingData.layanan;

  // Hitung harga
  function hitungHarga() {
    const berat = parseFloat(beratInput.value);
    const tipe = tipeLayananInput.value;
    let hargaPerKg = 0;

    switch (tipe) {
      case "Cuci Kering":
        hargaPerKg = 6000;
        break;
      case "Cuci + Setrika":
        hargaPerKg = 8000;
        break;
      case "Setrika Saja":
        hargaPerKg = 5000;
        break;
      case "Kilat 4 Jam":
        hargaPerKg = 12000;
        break;
    }

    const total = berat && hargaPerKg ? berat * hargaPerKg : 0;
    totalHargaEl.textContent = `Rp${total.toLocaleString("id-ID")}`;
    return total;
  }

  beratInput.addEventListener("input", hitungHarga);
  tipeLayananInput.addEventListener("change", hitungHarga);

  // Handle Submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const berat = parseFloat(beratInput.value);
    const tipe = tipeLayananInput.value;
    const total = hitungHarga();

    if (!berat || !tipe) {
      alert("Mohon isi jenis layanan dan berat cucian.");
      return;
    }

    // Buat ID pesanan unik
    const id = "ORD" + Date.now();

    const newOrder = {
      id,
      nama: bookingData.nama,
      alamat: bookingData.alamat,
      tanggal: bookingData.tanggal,
      jam: bookingData.jam,
      layanan: bookingData.layanan,
      tipeLayanan: tipe,
      berat,
      total: total,
      metodePembayaran: null,
      status: "Dalam Proses",
      waktuOrder: new Date().toLocaleString("id-ID")
    };

    // Simpan ke array pesanan[]
    const pesananLama = JSON.parse(localStorage.getItem("pesanan")) || [];
    pesananLama.push(newOrder);
    localStorage.setItem("pesanan", JSON.stringify(pesananLama));

    // Simpan pesanan aktif (untuk payment.html)
    localStorage.setItem("orderData", JSON.stringify(newOrder));

    alert("Pesanan berhasil disimpan. Lanjut ke pembayaran.");
    window.location.href = "payment.html";
  });
});
