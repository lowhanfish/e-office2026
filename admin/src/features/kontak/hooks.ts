
// features/kontak/hooks.ts

'use client';

import { useQuery } from '@tanstack/react-query';
import { useCrudMutation } from '@/hooks/useCrudMutation';
import {
  createKontak,
  deleteKontak,
  getKontak,
  kontakQueryKey,
  updateKontak,
  type KontakPayload,
  type KontakUpdatePayload,
} from './api';

export function useKontakList() {
  return useQuery({
    queryKey: kontakQueryKey,
    queryFn: getKontak,
  });
}

export function useCreateKontak() {
  return useCrudMutation<KontakPayload, unknown>({
    mutationFn: createKontak,
    invalidateKeys: [kontakQueryKey],
  });
}

export function useUpdateKontak() {
  return useCrudMutation<KontakUpdatePayload, unknown>({
    mutationFn: updateKontak,
    invalidateKeys: [kontakQueryKey],
  });
}

export function useDeleteKontak() {
  return useCrudMutation<number, number>({
    mutationFn: deleteKontak,
    invalidateKeys: [kontakQueryKey],
  });
}
