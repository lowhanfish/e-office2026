
import { RequestInit } from "next/dist/server/web/spec-extension/request"


export const callAPI = async <T>(
  url: string,
  option: RequestInit = {}
): Promise<T> => {

  const { method, headers, ...otherOption } = option;
  const { ['Content-Type']: contentType = 'application/json', ...otherHeaders } = (headers ?? {}) as Record<string, string>;

  try {
    const res = await fetch(url, {
      ...otherOption,
      method: method ?? 'GET',
      headers: {
        'Content-Type': contentType,
        ...otherHeaders,
      },
    });

    if (!res.ok) {
      throw new Error(`Kesalahan dalam HTTP request. status: ${res.status}`);
    }

    return (await res.json()) as T;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw new Error(`Kesalahan dalam fetch. Error: ${error}`);
  }
};
