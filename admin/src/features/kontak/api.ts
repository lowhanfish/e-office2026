// features/kontak/api.ts

import { requestJSON } from '@/lib/api';

export interface Kontak {
  id: number;
  name: string;
}

export type KontakPayload = Omit<Kontak, 'id'>;
export type KontakUpdatePayload = Kontak;

export const kontakQueryKey = ['kontak'] as const;

export const getKontak = () => {
  return requestJSON<Kontak[]>('https://jsonplaceholder.typicode.com/users?_limit=4');
};

export const createKontak = (payload: KontakPayload) => {
  return requestJSON<Kontak>('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const updateKontak = (payload: KontakUpdatePayload) => {
  return requestJSON<Kontak>(`https://jsonplaceholder.typicode.com/users/${payload.id}`, {
    method: 'PUT',
    body: JSON.stringify({ name: payload.name }),
  });
};

export const deleteKontak = (id: number) => {
  return requestJSON<void>(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: 'DELETE',
  }).then(() => id);
};
