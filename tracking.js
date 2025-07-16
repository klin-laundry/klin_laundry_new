document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("orderId");

  const pesanan = JSON.parse(localStorage.getItem("pesanan")) || [];
  const data = pesanan.find(p => p.id === orderId);

  if (!data) {
    document.getElementById("status-sekarang").textContent = "Pesanan tidak ditemukan.";
    console.error("Order ID tidak ditemukan:", orderId);
    return;
  }

  // Tampilkan detail pesanan
  document.getElementById("nama").textContent = data.nama;
  document.getElementById("layanan").textContent = data.tipeLayanan || data.layanan;
  document.getElementById("berat").textContent = data.berat + " kg";
  document.getElementById("total").textContent = "Rp" + (data.total || 0).toLocaleString("id-ID");
  document.getElementById("waktu").textContent = data.waktuOrder;
  document.getElementById("alamat").textContent = data.alamat;
  document.getElementById("pembayaran").textContent = data.metodePembayaran;
  document.getElementById("status-sekarang").textContent = data.status;

  // Progress visual
  const semuaLangkah = [
    "Pesanan Diterima", "Dalam Antrian", "Dicuci",
    "Disetrika", "Dikemas", "Dikirim", "Selesai"
  ];

  const indexStatus = semuaLangkah.indexOf(data.status);

  semuaLangkah.forEach((_, index) => {
    const el = document.getElementById(`step-${index + 1}`);
    if (el && index <= indexStatus) {
      el.classList.add("active");
    }
  });
});
