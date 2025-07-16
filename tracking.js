document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formOrder");
  const beratInput = document.getElementById("berat");
  const layananRadios = document.querySelectorAll('input[name="layanan"]');

  const namaEl = document.getElementById("namaRingkasan");
  const layananEl = document.getElementById("layananRingkasan");
  const beratEl = document.getElementById("beratRingkasan");
  const totalEl = document.getElementById("hargaRingkasan");

  // Ambil data dari booking sebelumnya
  const bookingData = JSON.parse(localStorage.getItem("bookingData"));

  if (!bookingData) {
    alert("Data booking tidak ditemukan. Silakan isi form booking terlebih dahulu.");
    window.location.href = "booking.html";
    return;
  }

  // Pre-fill form jika perlu
  document.getElementById("nama").value = bookingData.nama;
  document.getElementById("alamat").value = bookingData.alamat;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const berat = parseFloat(beratInput.value);
    const layananRadio = Array.from(layananRadios).find(r => r.checked);

    if (!berat || berat <= 0 || !layananRadio) {
      alert("Silakan masukkan berat cucian dan pilih layanan.");
      return;
    }

    const layanan = layananRadio.value;
    const hargaPerKg = layanan === "Cuci + Setrika" ? 8000 : 5000;
    const total = berat * hargaPerKg;

    // Buat objek pesanan lengkap
    const orderData = {
      id: "ORD" + Date.now(), // ✅ ID unik
      nama: bookingData.nama,
      alamat: bookingData.alamat,
      tipeLayanan: layanan,
      berat: berat,
      total: total,
      waktuOrder: new Date().toLocaleString("id-ID"),
      metodePembayaran: null,
      status: "Belum Dibayar"
    };

    // Simpan ke localStorage (sebagai order aktif dan ke daftar semua pesanan)
    localStorage.setItem("orderData", JSON.stringify(orderData));

    const semuaPesanan = JSON.parse(localStorage.getItem("pesanan")) || [];
    semuaPesanan.push(orderData);
    localStorage.setItem("pesanan", JSON.stringify(semuaPesanan));

    // Redirect ke halaman pembayaran
    window.location.href = "payment.html";
  });

  // Optional: Preview ringkasan pesanan (saat input berubah)
  form.addEventListener("input", () => {
    const berat = parseFloat(beratInput.value);
    const layananRadio = Array.from(layananRadios).find(r => r.checked);
    const layanan = layananRadio ? layananRadio.value : "-";
    const hargaPerKg = layanan === "Cuci + Setrika" ? 8000 : 5000;
    const total = berat ? berat * hargaPerKg : 0;

    namaEl.textContent = bookingData.nama;
    layananEl.textContent = layanan;
    beratEl.textContent = berat ? `${berat} kg` : "-";
    totalEl.textContent = total ? `Rp${total.toLocaleString("id-ID")}` : "-";
  });
});
