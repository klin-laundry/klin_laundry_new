// Tambahkan ini di atas kode tracking.js yang lama
const adminBtn = document.getElementById("adminUbahStatus");
const adminMode = localStorage.getItem("adminMode") === "true";
if (adminMode && adminBtn) {
  adminBtn.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const statusText = document.getElementById("statusText");
  const progressContainer = document.getElementById("progressStatus");
  const detailContainer = document.getElementById("detailPesanan");

  const semuaPesanan = JSON.parse(localStorage.getItem("pesanan")) || [];

  if (semuaPesanan.length === 0) {
    statusText.textContent = "Data pesanan tidak ditemukan.";
    return;
  }

  // Ambil pesanan terbaru (opsional: bisa berdasarkan ID pengguna aktif)
  const pesanan = semuaPesanan[semuaPesanan.length - 1];

  // Tampilkan detail pesanan
  detailContainer.innerHTML = `
    <p><strong>Nama:</strong> ${pesanan.nama}</p>
    <p><strong>Layanan:</strong> ${pesanan.tipeLayanan}${pesanan.layanan ? " - " + pesanan.layanan : ""}</p>
    <p><strong>Berat:</strong> ${pesanan.berat} kg</p>
    <p><strong>Total Harga:</strong> Rp${(pesanan.total || pesanan.totalHarga || 0).toLocaleString("id-ID")}</p>
    <p><strong>Waktu:</strong> ${pesanan.waktuOrder || pesanan.tanggal || "-"}, ${pesanan.jam || ""}</p>
    <p><strong>Alamat:</strong> ${pesanan.alamat || "-"}</p>
    <p><strong>Pembayaran:</strong> ${pesanan.metodePembayaran || "-"}</p>
  `;

  // Status progres
  const semuaStatus = [
    "Pesanan Diterima",
    "Dalam Antrian",
    "Dicuci",
    "Disetrika",
    "Dikemas",
    "Dikirim",
    "Selesai"
  ];

  const statusSekarang = pesanan.status || "Dalam Antrian";
  const currentIndex = semuaStatus.indexOf(statusSekarang);

  statusText.textContent = `Status Saat Ini: ${statusSekarang}`;

  semuaStatus.forEach((tahap, i) => {
    const langkah = document.createElement("div");
    langkah.className = "tahapan";
    if (i <= currentIndex) langkah.classList.add("aktif");
    langkah.innerHTML = `
      <div class="icon">${i + 1}</div>
      <p>${tahap}</p>
    `;
    progressContainer.appendChild(langkah);
  });
});
