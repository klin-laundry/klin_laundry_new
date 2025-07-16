document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("orderId");

  const pesanan = JSON.parse(localStorage.getItem("pesanan")) || [];
  const data = pesanan.find(p => p.id === orderId);

  if (!data) {
    document.body.innerHTML = "<h2 style='text-align:center'>Data pesanan tidak ditemukan.</h2>";
    return;
  }

  // Tampilkan detail pesanan
  document.getElementById("nama").textContent = data.nama;
  document.getElementById("layanan").textContent = data.layanan || "-";
  document.getElementById("berat").textContent = data.berat + " kg";
  document.getElementById("total").textContent = "Rp" + (data.total || 0).toLocaleString("id-ID");
  document.getElementById("waktu").textContent = data.waktuOrder || "-";
  document.getElementById("alamat").textContent = data.alamat || "-";
  document.getElementById("pembayaran").textContent = data.metodePembayaran || "-";

  // Status Progres
  const statusSekarang = data.status || "Pesanan Diterima";
  document.getElementById("status-sekarang").textContent = statusSekarang;

  const semuaLangkah = [
    "Pesanan Diterima", "Dalam Antrian", "Dicuci",
    "Disetrika", "Dikemas", "Dikirim", "Selesai"
  ];

  semuaLangkah.forEach((status, index) => {
    const elemen = document.getElementById(`step-${index + 1}`);
    if (elemen) {
      if (semuaLangkah.indexOf(statusSekarang) >= index) {
        elemen.classList.add("aktif");
      }
    }
  });
});
