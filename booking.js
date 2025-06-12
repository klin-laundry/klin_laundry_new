document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formBooking");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // mencegah reload

    // Ambil nilai dari semua input
    const nama = document.getElementById("nama").value.trim();
    const telepon = document.getElementById("telepon").value.trim();
    const alamat = document.getElementById("alamat").value.trim();
    const tanggal = document.getElementById("tanggal").value;
    const jam = document.getElementById("jam").value;
    const catatan = document.getElementById("catatan").value.trim();
    const konfirmasi = document.getElementById("konfirmasi").checked;

    const layananRadio = document.querySelector('input[name="layanan"]:checked');
    const layanan = layananRadio ? layananRadio.value : "";

    // Validasi manual jika dibutuhkan (redundan tapi aman)
    if (!nama || !telepon || !alamat || !tanggal || !jam || !layanan || !konfirmasi) {
      alert("Mohon isi semua data dengan lengkap dan centang konfirmasi.");
      return;
    }

    // Simpan ke localStorage
    const dataBooking = {
      nama,
      telepon,
      alamat,
      tanggal,
      jam,
      layanan,
      catatan
    };

    localStorage.setItem("bookingData", JSON.stringify(dataBooking));

    // Redirect
    alert("Data pemesanan berhasil disimpan. Menuju ke halaman Order...");
    window.location.href = "order.html";
  });
});
