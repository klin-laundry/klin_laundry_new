document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const guestCheck = document.getElementById("guest");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const guest = guestCheck.checked;
    const username = document.getElementById("username").value;
    const alamat = document.getElementById("alamat").value;
    const password = document.getElementById("password").value;
    const ulangi = document.getElementById("ulangi").value;

    if (!guest) {
      if (password !== ulangi) {
        alert("Password tidak cocok!");
        return;
      }
      if (!document.getElementById("syarat").checked) {
        alert("Anda harus menyetujui syarat & ketentuan.");
        return;
      }
    }

    alert(`Login berhasil! Selamat datang ${guest ? "Tamu" : username}`);
    window.location.href = "dashboard.html"; // redirect untuk user biasa
  });

  document.getElementById("btnStart").addEventListener("click", function () {
    guestCheck.checked = true;
    form.requestSubmit();
  });

  document.getElementById("googleBtn").addEventListener("click", function () {
    alert("Fitur Google Sign-in belum tersedia.");
  });

  document.getElementById("loginLink").addEventListener("click", function (e) {
    e.preventDefault();
    guestCheck.checked = true;
    form.requestSubmit();
  });

  // Tidak perlu event listener khusus untuk tombol admin karena sudah langsung pakai window.location di HTML
});
