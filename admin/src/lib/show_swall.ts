"use client";

import Swal, { SweetAlertIcon } from "sweetalert2";

export const showLoadingAlert = (title: string = "Memproses data...") => {
  Swal.fire({
    title: title,
    text: "Mohon tunggu sebentar",
    allowOutsideClick: false, // Mencegah user menutup modal saat loading
    allowEscapeKey: false, // Mencegah user menekan tombol ESC
    didOpen: () => {
      Swal.showLoading(); // Mengubah modal menjadi mode spinner/loading
    },
  });
};

export const swallAlert = (text: string, icon: SweetAlertIcon = "success") => {
  Swal.fire({
    title: icon === "success" ? "Berhasil!" : "Pemberitahuan!",
    text: `Data ${text}.`,
    icon: icon,
    timer: 1000,
    showConfirmButton: false,
    backdrop: false,
  });
};
