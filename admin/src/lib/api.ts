export async function requestJSON<T>(url: string, options?: RequestInit): Promise<T> {
  // 1. KITA PISAHKAN: Ambil headers kustom keluar, sisanya simpan di 'sisaOptions'
  const { headers: customHeaders, ...sisaOptions } = options || {};

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(customHeaders || {}), // Gabungkan header default dengan header kustom
    },
    ...sisaOptions, // <-- Di sini SUDAH BERSIH, tidak ada lagi kunci 'headers' yang tabrakan!
  });

  if (!res.ok) throw new Error(`Request gagal: ${res.status}`);
  return res.json();
}