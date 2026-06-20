// lib/api.ts

export async function requestJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const { headers: customHeaders, ...requestOptions } = options ?? {};

  const res = await fetch(url, {
    ...requestOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(customHeaders ?? {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Request gagal: ${res.status}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}
