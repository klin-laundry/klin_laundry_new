document.addEventListener("DOMContentLoaded", () => {
  const daftarRiwayat = document.getElementById("daftarRiwayat");
  const filterStatus = document.getElementById("filterStatus");
  const sortOrder = document.getElementById("sortOrder");

  // Ambil semua data pesanan dari localStorage
  let semuaPesanan = JSON.parse(localStorage.getItem("pesanan")) || [];

  /**
   * Fungsi untuk menampilkan riwayat pesanan ke dalam DOM.
   * @param {Array} pesananToDisplay - Array pesanan yang akan ditampilkan.
   */
  function tampilkanRiwayat(pesananToDisplay) {
    daftarRiwayat.innerHTML = ""; // Bersihkan konten yang ada

    if (pesananToDisplay.length === 0) {
      daftarRiwayat.innerHTML = "<p style='text-align:center; margin-top:2rem;'>Belum ada riwayat pesanan yang ditemukan.</p>";
      return;
    }

    pesananToDisplay.forEach(order => {
      const card = document.createElement("div");
      card.classList.add("card-riwayat"); // Memastikan kelas ini sesuai dengan CSS

      // Mengambil status dan mengonversi untuk kelas CSS (menghapus spasi)
      const statusClass = order.status ? order.status.replace(/\s/g, "") : "MenungguProses";
      const displayStatus = order.status || "Menunggu Proses";

      card.innerHTML = `
        <h3>🧺 ${order.tipeLayanan || order.layanan || "Layanan Tidak Diketahui"}</h3>
        <p><strong>ID Pesanan:</strong> ${order.id || "N/A"}</p>
        <p><strong>Nama:</strong> ${order.nama || "Pengguna Tidak Dikenal"}</p>
        <p><strong>Berat:</strong> ${order.berat ? order.berat + ' kg' : 'N/A'}</p>
        <p><strong>Total:</strong> Rp${(order.total || order.totalHarga || 0).toLocaleString("id-ID")}</p>
        <p><strong>Status:</strong> <span class="status ${statusClass}">${displayStatus}</span></p>
        <p><strong>Metode Pembayaran:</strong> ${order.metodePembayaran || "Belum dipilih"}</p>
        <p><strong>Waktu Order:</strong> ${order.waktuOrder || order.tanggal || "N/A"}</p>
        <div class="card-actions">
          <button class="lacak" onclick="lacakStatus('${order.id}')">📍 Lacak Status</button>
          <button class="kurir" onclick="hubungiKurir('${order.id}')">📞 Hubungi Kurir</button>
        </div>
      `;
      daftarRiwayat.appendChild(card);
    });
  }

  /**
   * Fungsi untuk menerapkan filter dan pengurutan pada daftar pesanan.
   * Hasilnya kemudian ditampilkan.
   */
  function filterDanUrutkan() {
    let hasilFilterDanUrut = [...semuaPesanan];

    // Filter berdasarkan status
    const statusYangDipilih = filterStatus.value;
    if (statusYangDipilih !== "all") {
      hasilFilterDanUrut = hasilFilterDanUrut.filter(p => p.status === statusYangDipilih);
    }

    // Urutkan berdasarkan waktu order
    const urutanYangDipilih = sortOrder.value;
    if (urutanYangDipilih === "baru") {
      // Urutkan dari terbaru ke terlama
      hasilFilterDanUrut.sort((a, b) => {
        const dateA = new Date(a.waktuOrder || a.tanggal);
        const dateB = new Date(b.waktuOrder || b.tanggal);
        return dateB - dateA;
      });
    } else if (urutanYangDipilih === "lama") {
      // Urutkan dari terlama ke terbaru
      hasilFilterDanUrut.sort((a, b) => {
        const dateA = new Date(a.waktuOrder || a.tanggal);
        const dateB = new Date(b.waktuOrder || b.tanggal);
        return dateA - dateB;
      });
    }

    tampilkanRiwayat(hasilFilterDanUrut);
  }

  // === Fungsi Global yang Dipanggil dari HTML (onclick) ===

  /**
   * Mengarahkan pengguna ke halaman pelacakan status untuk pesanan tertentu.
   * @param {string} id - ID unik pesanan.
   */
  window.lacakStatus = function (id) {
    // Pastikan tracking.html dapat menerima parameter 'orderId'
    window.location.href = `tracking.html?orderId=${id}`;
  };

  /**
   * Mengarahkan pengguna ke halaman untuk menghubungi kurir pesanan tertentu.
   * @param {string} id - ID unik pesanan.
   */
  window.hubungiKurir = function (id) {
    // Pastikan hubungi-kurir.html dapat menerima parameter 'orderId'
    window.location.href = `hubungi-kurir.html?orderId=${id}`;
  };

  // === Event Listeners ===

  // Pemicu filter dan pengurutan saat pilihan berubah
  filterStatus.addEventListener("change", filterDanUrutkan);
  sortOrder.addEventListener("change", filterDanUrutkan);

  // Tampilkan riwayat pertama kali saat halaman dimuat
  filterDanUrutkan();
});