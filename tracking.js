document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("orderId");

  const semuaPesanan = JSON.parse(localStorage.getItem("pesanan")) || [];
  const pesanan = semuaPesanan.find(p => p.id === orderId);

  const detailContainer = document.getElementById("detailPesanan");
  const progressContainer = document.getElementById("progressStatus");
  const statusText = document.getElementById("statusText");

  // Cek jika tidak ditemukan
  if (!pesanan) {
    detailContainer.innerHTML = `<p style="color:red;">❌ Pesanan dengan ID ${orderId} tidak ditemukan.</p>`;
    statusText.textContent = "Gagal memuat status.";
    return;
  }

  // Tampilkan detail pesanan
  detailContainer.innerHTML = `
    <p><strong>Nama:</strong> ${pesanan.nama}</p>
    <p><strong>Layanan:</strong> ${pesanan.tipeLayanan || pesanan.layanan}</p>
    <p><strong>Berat:</strong> ${pesanan.berat} kg</p>
    <p><strong>Total:</strong> Rp${(pesanan.total || 0).toLocaleString("id-ID")}</p>
    <p><strong>Waktu Order:</strong> ${pesanan.waktuOrder}</p>
    <p><strong>Alamat:</strong> ${pesanan.alamat || "-"}</p>
    <p><strong>Pembayaran:</strong> ${pesanan.metodePembayaran || "-"}</p>
  `;

  // List status progres
  const statusSteps = [
    "Pesanan Diterima", // 0
    "Dalam Antrian",    // 1
    "Dicuci",           // 2
    "Disetrika",        // 3
    "Dikemas",          // 4
    "Dikirim",          // 5
    "Selesai"           // 6
  ];

  const statusSekarang = pesanan.status || "Pesanan Diterima";
  const indexAktif = statusSteps.indexOf(statusSekarang);

  statusText.innerHTML = `<strong>Status Saat Ini:</strong> ${statusSekarang}`;

  // Buat tampilan status progres
  statusSteps.forEach((step, i) => {
    const stepBox = document.createElement("div");
    stepBox.classList.add("step-box");
    if (i <= indexAktif) stepBox.classList.add("aktif");

    stepBox.innerHTML = `
      <div class="step-num">${i + 1}</div>
      <div class="step-label">${step}</div>
    `;

    progressContainer.appendChild(stepBox);
  });

  // Tampilkan tombol admin jika ID ditemukan
  document.getElementById("adminUbahStatus").classList.remove("hidden");
});
