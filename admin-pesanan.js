document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#tabelPesanan tbody");

  let pesanan = JSON.parse(localStorage.getItem("pesanan")) || [];

  function renderTabel() {
    tbody.innerHTML = "";

    if (pesanan.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8">Belum ada data pesanan.</td></tr>`;
      return;
    }

    pesanan.forEach((item, i) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${item.nama}</td>
        <td>${item.layanan || item.tipeLayanan}</td>
        <td>${item.berat} kg</td>
        <td>Rp${(item.total || item.totalHarga || 0).toLocaleString("id-ID")}</td>
        <td><span class="status ${item.status || "Menunggu Proses"}">${item.status || "Menunggu Proses"}</span></td>
        <td>${item.metodePembayaran || "-"}</td>
        <td>${item.waktuOrder || item.tanggal || "-"}</td>
        <td>
          <button class="ubah" data-index="${i}">Ubah Status</button>
          <button class="hapus" data-index="${i}">Hapus</button>
        </td>
      `;

      tbody.appendChild(row);
    });
  }

  function simpanDanRefresh() {
    localStorage.setItem("pesanan", JSON.stringify(pesanan));
    renderTabel();
  }

  // Delegasi tombol aksi
  tbody.addEventListener("click", (e) => {
    if (e.target.classList.contains("ubah")) {
      // Mengarahkan ke halaman ubah-status.html
      window.location.href = "ubah-status.html";
    } else if (e.target.classList.contains("hapus")) {
      const index = e.target.dataset.index;
      const konfirmasi = confirm("Yakin ingin menghapus pesanan ini?");
      if (konfirmasi) {
        pesanan.splice(index, 1);
        simpanDanRefresh();
      }
    }
  });

  renderTabel();
});