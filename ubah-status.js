document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("daftarPesanan");

  const opsiStatus = [
    "Pesanan Diterima", "Dalam Antrian", "Dicuci",
    "Disetrika", "Dikemas", "Dikirim", "Selesai"
  ];

  let pesanan = [];
  try {
    const data = JSON.parse(localStorage.getItem("pesanan"));
    pesanan = Array.isArray(data) ? data : [];
  } catch {
    pesanan = [];
  }

  function buatDropdown(index, selectedStatus) {
    return `
      <select class="ubah-status" data-index="${index}">
        ${opsiStatus.map(status =>
          `<option value="${status}" ${status === selectedStatus ? "selected" : ""}>${status}</option>`
        ).join("")}
      </select>
    `;
  }

  function tampilkanTabel() {
    tbody.innerHTML = "";

    if (pesanan.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5">Belum ada data pesanan.</td></tr>`;
      return;
    }

    pesanan.forEach((item, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${item.nama}</td>
        <td>${item.layanan || item.tipeLayanan || "-"}</td>
        <td>Rp${(item.total || item.totalHarga || 0).toLocaleString("id-ID")}</td>
        <td class="status-cell">${item.status || "Belum Ada"}</td>
        <td>${buatDropdown(index, item.status || "Pesanan Diterima")}</td>
      `;

      tbody.appendChild(row);
    });
  }

  tbody.addEventListener("change", (e) => {
    if (e.target.classList.contains("ubah-status")) {
      const index = parseInt(e.target.dataset.index);
      const statusBaru = e.target.value;

      if (!isNaN(index) && pesanan[index]) {
        pesanan[index].status = statusBaru;
        localStorage.setItem("pesanan", JSON.stringify(pesanan));

        const row = e.target.closest("tr");
        const statusCell = row.querySelector(".status-cell");
        statusCell.textContent = statusBaru;
      }
    }
  });

  tampilkanTabel();
});
