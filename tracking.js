document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("orderId");

  const pesanan = JSON.parse(localStorage.getItem("pesanan")) || [];
  const data = pesanan.find(p => p.id === orderId);

  if (!data) {
    document.getElementById("status-sekarang").textContent = "Data tidak ditemukan.";
    return;
  }

  // Isi detail
  document.getElementById("nama").textContent = data.nama;
  document.getElementById("layanan").textContent = data.tipeLayanan;
  document.getElementById("berat").textContent = data.berat + " kg";
  document.getElementById("total").textContent = "Rp" + (data.total || 0).toLocaleString("id-ID");
  document.getElementById("waktu").textContent = data.waktuOrder;
  document.getElementById("alamat").textContent = data.alamat;
  document.getElementById("pembayaran").textContent = data.metodePembayaran;
  document.getElementById("status-sekarang").textContent = data.status;

  // Status tracker
  const steps = [
    "Pesanan Diterima", "Dalam Antrian", "Dicuci",
    "Disetrika", "Dikemas", "Dikirim", "Selesai"
  ];

  const statusIndex = steps.indexOf(data.status);

  steps.forEach((_, i) => {
    const stepEl = document.getElementById(`step-${i + 1}`);
    if (i <= statusIndex && stepEl) {
      stepEl.classList.add("active");
    }
  });
});
