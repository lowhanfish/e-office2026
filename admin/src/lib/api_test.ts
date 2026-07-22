// lib/fetchInstansi.ts

// 1. Helper sederhana untuk minta Access Token baru (15 menit)
async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await fetch("http://localhost:8000/api/v1/auth/refresh", {
      method: "POST",
      headers: { "accept": "application/json" },
      credentials: "include", // Mengirim cookies (termasuk refresh_token 7 hari)
    });

    if (!res.ok) return null;

    const data = await res.json();
    
    // Simpan access token baru ke localStorage
    localStorage.setItem("accessToken", data.access_token);
    return data.access_token;
  } catch (error) {
    return null;
  }
}

// 2. Fungsi khusus untuk nembak endpoint Instansi SIMPEG
export async function getInstansi(skip = 0, limit = 100) {
  const url = `http://localhost:8000/api/v1/simpeg/master/ref_instansi/read?skip=${skip}&limit=${limit}`;
  
  // Ambil token dari browser
  let token = localStorage.getItem("accessToken");

  // Opsi request persis seperti curl kamu + Authorization
  const requestConfig: RequestInit = {
    method: "GET",
    headers: {
      "accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    credentials: "include",
  };

  // --- TEMBAKAN PERTAMA ---
  let response = await fetch(url, requestConfig);

  // Jika Backend merespons 401 (artinya token 15 menit kamu sudah kadaluwarsa)
  if (response.status === 401) {
    console.log("Token 15 menit habis. Mencoba Minta Token Baru...");

    // Panggil endpoint refresh
    const newToken = await refreshAccessToken();

    if (newToken) {
      console.log("Token Baru Didapat! Mengulang Request SIMPEG...");

      // Update header dengan token baru
      requestConfig.headers = {
        ...requestConfig.headers,
        "Authorization": `Bearer ${newToken}`,
      };

      // --- TEMBAKAN KEDUA (Retry otomatis) ---
      response = await fetch(url, requestConfig);
    } else {
      // Jika Refresh Token 7 hari JUGA habis
      console.log("Refresh token 7 hari juga kadaluwarsa. Paksa Logout.");
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
      throw new Error("Sesi login telah berakhir.");
    }
  }

  // Jika respons selain 200/OK
  if (!response.ok) {
    throw new Error(`Gagal mengambil data instansi. Status: ${response.status}`);
  }

  // Kembalikan data JSON
  return await response.json();
}