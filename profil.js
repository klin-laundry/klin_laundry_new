document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formProfil");
  const fotoInput = document.getElementById("fotoInput");
  const fotoPreview = document.getElementById("fotoPreview");

  // Muat data dari localStorage
  const profilData = JSON.parse(localStorage.getItem("userProfile")) || {};
  if (profilData.nama) document.getElementById("nama").value = profilData.nama;
  if (profilData.email) document.getElementById("email").value = profilData.email;
  if (profilData.alamat) document.getElementById("alamat").value = profilData.alamat;
  if (profilData.foto) fotoPreview.src = profilData.foto;

  // Simpan data
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const alamat = document.getElementById("alamat").value.trim();

    if (!nama || !email || !alamat) {
      alert("Harap lengkapi semua data.");
      return;
    }

    const data = {
      nama,
      email,
      alamat,
      foto: fotoPreview.src
    };

    // Simpan ke localStorage (untuk pengguna)
    localStorage.setItem("userProfile", JSON.stringify(data));

    // 🔄 Tambahan: Simpan juga ke data pelanggan sistem admin
    let daftarPelanggan = JSON.parse(localStorage.getItem("dataPelanggan")) || [];
    const index = daftarPelanggan.findIndex(u => u.email === email);
    if (index !== -1) {
      daftarPelanggan[index] = data; // update
    } else {
      daftarPelanggan.push(data); // tambah baru
    }
    localStorage.setItem("dataPelanggan", JSON.stringify(daftarPelanggan));

    alert("Profil berhasil diperbarui!");
  });

  // Ganti foto profil preview
  fotoInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      fotoPreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
});
