document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formOrder");
  const beratInput = document.getElementById("berat");
  const tipeLayananSelect = document.getElementById("tipeLayanan");
  const totalHargaEl = document.getElementById("totalHarga");

  const outputNama = document.getElementById("outputNama");
  const outputAlamat = document.getElementById("outputAlamat");
  const outputTanggal = document.getElementById("outputTanggal");
  const outputJam = document.getElementById("outputJam");
  const outputLayanan = document.getElementById("outputLayanan");

  // Ambil data dari booking
  const bookingData = JSON.parse(localStorage.getItem("bookingData"));

  if (!bookingData) {
    alert("Data booking tidak ditemukan. Silakan isi form booking terlebih dahulu.");
    window.location.href = "booking.html";
    return;
  }

  // Tampilkan data di ringkasan
  outputNama.textContent = bookingData.nama;
  outputAlamat.textContent = bookingData.alamat;
  outputTanggal.textContent = bookingData.tanggal;
  outputJam.textContent = bookingData.jam;
  outputLayanan.textContent = bookingData.layanan;

  // Fungsi untuk mendapatkan harga per kg
  function getHargaPerKg(layanan) {
    switch (layanan) {
      case "Cuci Kering": return 6000;
      case "Cuci + Setrika": return 8000;
      case "Setrika Saja": return 5000;
      case "Kilat 4 Jam": return 12000;
      default: return 0;
    }
  }

  form.addEventListener("input", () => {
    const layanan = tipeLayananSelect.value;
    const berat = parseFloat(beratInput.value);
    const hargaPerKg = getHargaPerKg(layanan);
    const total = layanan && berat ? berat * hargaPerKg : 0;
    totalHargaEl.textContent = `Rp${total.toLocaleString("id-ID")}`;
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const layanan = tipeLayananSelect.value;
    const berat = parseFloat(beratInput.value);
    const hargaPerKg = getHargaPerKg(layanan);
    const total = layanan && berat ? berat * hargaPerKg : 0;

    if (!layanan || !berat || berat <= 0) {
      alert("Harap pilih layanan dan isi berat cucian.");
      return;
    }

    const orderData = {
      id: "ORD" + Date.now(),
      nama: bookingData.nama,
      alamat: bookingData.alamat,
      tanggal: bookingData.tanggal,
      jam: bookingData.jam,
      metodeLayanan: bookingData.layanan,
      tipeLayanan: layanan,
      berat: berat,
      total: total,
      waktuOrder: new Date().toLocaleString("id-ID"),
      metodePembayaran: null,
      status: "Belum Dibayar"
    };

    // Simpan order ke localStorage
    localStorage.setItem("orderData", JSON.stringify(orderData));

    const semuaPesanan = JSON.parse(localStorage.getItem("pesanan")) || [];
    semuaPesanan.push(orderData);
    localStorage.setItem("pesanan", JSON.stringify(semuaPesanan));

    // Arahkan ke payment
    window.location.href = "payment.html";
  });
});
