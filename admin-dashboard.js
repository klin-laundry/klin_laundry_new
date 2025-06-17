document.addEventListener("DOMContentLoaded", function () {
  const totalPesananEl = document.getElementById("totalPesanan");
  const pesananSelesaiEl = document.getElementById("pesananSelesai");
  const pesananProsesEl = document.getElementById("pesananProses");
  const jumlahPenggunaEl = document.getElementById("jumlahPengguna");

  const tunaiCountEl = document.getElementById("tunaiCount");
  const transferCountEl = document.getElementById("transferCount");
  const qrisCountEl = document.getElementById("qrisCount");
  const vaCountEl = document.getElementById("vaCount");

  const tabelBody = document.getElementById("tabelPesananTerbaru");

  // Ambil data pesanan dari localStorage
  const dataPesanan = JSON.parse(localStorage.getItem("pesanan")) || [];

  // Hitung statistik
const totalPesanan = dataPesanan.length;
const selesai = dataPesanan.filter(p => p.status.toLowerCase() === "selesai").length;
const proses = totalPesanan - selesai; 
const penggunaUnik = [...new Set(dataPesanan.map(p => p.nama))];

  const metodeCount = {
    Tunai: 0,
    Transfer: 0,
    QRIS: 0,
    VA: 0,
    "Kartu Kredit": 0
  };

  dataPesanan.forEach(p => {
    if (p.metodePembayaran === "Tunai") metodeCount.Tunai++;
    else if (p.metodePembayaran === "Transfer") metodeCount.Transfer++;
    else if (p.metodePembayaran === "QRIS") metodeCount.QRIS++;
    else if (p.metodePembayaran === "VA") metodeCount.VA++;
    else if (p.metodePembayaran === "Kartu Kredit") metodeCount["Kartu Kredit"]++;
  });

  // Tampilkan statistik
  totalPesananEl.textContent = totalPesanan;
  pesananSelesaiEl.textContent = selesai;
  pesananProsesEl.textContent = proses;
  jumlahPenggunaEl.textContent = penggunaUnik.length;

  tunaiCountEl.textContent = metodeCount.Tunai;
  transferCountEl.textContent = metodeCount.Transfer;
  qrisCountEl.textContent = metodeCount.QRIS;
  vaCountEl.textContent = metodeCount.VA + metodeCount["Kartu Kredit"];

  // Tampilkan daftar ringkasan pesanan terbaru
  if (dataPesanan.length > 0) {
    tabelBody.innerHTML = ""; // Clear isi default
    const terbaru = dataPesanan.slice().reverse().slice(0, 5); // ambil 5 terakhir
    terbaru.forEach(p => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.nama}</td>
        <td>${p.layanan}</td>
        <td>${p.berat} kg</td>
        <td>Rp${p.total.toLocaleString()}</td>
        <td>${p.status}</td>
        <td>${p.metodePembayaran}</td>
      `;
      tabelBody.appendChild(row);
    });
  } else {
    tabelBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Tidak ada data pesanan</td></tr>`;
  }
});
