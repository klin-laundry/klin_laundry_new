document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTS
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const profileBtn = document.getElementById("profileBtn");
  const profileDropdown = document.getElementById("profileDropdown");

  // MAP PENCARIAN FITUR → HALAMAN
  const routeMap = {
    dashboard: "dashboard.html",
    home: "dashboard.html",
    pemesanan: "booking.html",
    booking: "booking.html",
    order: "order.html",
    pembayaran: "payment.html",
    payment: "payment.html",
    riwayat: "riwayat.html",
    history: "riwayat.html",
    aplikasi: "apps.html",
    apps: "apps.html",
    hubungi: "hubungi.html",
    kontak: "hubungi.html",
    tentang: "tentang.html",
    profil: "profil.html"
  };

  // === FITUR PENCARIAN ===
  searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value.trim().toLowerCase();
    if (!keyword) {
      alert("Masukkan nama fitur yang ingin dicari.");
      return;
    }

    let matched = false;
    for (const key in routeMap) {
      if (keyword.includes(key)) {
        window.location.href = routeMap[key];
        matched = true;
        break;
      }
    }

    if (!matched) {
      alert("Fitur tidak ditemukan. Coba: 'pemesanan', 'riwayat', 'apps', dll.");
    }
  });

  // Tekan Enter = klik cari
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchBtn.click();
  });

  // === TOGGLE DROPDOWN PROFIL ===
  profileBtn.addEventListener("click", () => {
    profileDropdown.classList.toggle("hidden");
  });

  // Tutup dropdown saat klik di luar
  document.addEventListener("click", (e) => {
    if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
      profileDropdown.classList.add("hidden");
    }
  });
});
