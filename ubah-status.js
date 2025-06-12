document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("daftarPesanan");
  const pesanan = JSON.parse(localStorage.getItem("pesanan")) || [];

  const opsiStatus = [
    "Pesanan Diterima", "Dalam Antrian", "Dicuci", "Disetrika", "Dikemas", "Dikirim", "Selesai"
  ];

  function tampilkanTabel() {
    tbody.innerHTML = "";

    pesanan.forEach((item, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.nama}</td>
        <td>${item.layanan || item.tipeLayanan || "-"}</td>
        <td>Rp${(item.total || item.totalHarga || 0).toLocaleString("id-ID")}</td>
        <td>${item.status || "Belum Ada"}</td>
        <td>
          <select data-index="${i}">
            ${opsiStatus.map(status => `
              <option value="${status}" ${status === item.status ? "selected" : ""}>${status}</option>
            `).join("")}
          </select>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  tbody.addEventListener("change", (e) => {
    if (e.target.tagName === "SELECT") {
      const index = parseInt(e.target.dataset.index);
      pesanan[index].status = e.target.value;
      localStorage.setItem("pesanan", JSON.stringify(pesanan));
      tampilkanTabel(); // refresh tampilan
    }
  });

  tampilkanTabel();
});
