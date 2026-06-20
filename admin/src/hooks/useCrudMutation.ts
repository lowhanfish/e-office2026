// src/hooks/useCrudMutation.ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

type CrudConfig<TPayload, TResult> = {
  mutationFn: (payload: TPayload) => Promise<TResult>;
  invalidateKeys: ReadonlyArray<ReadonlyArray<string | number>>;
  onSuccess?: (data: TResult, payload: TPayload) => void;
  onError?: (error: Error, payload: TPayload) => void;
};

export function useCrudMutation<TPayload, TResult>(config: CrudConfig<TPayload, TResult>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: config.mutationFn,
    onSuccess: (data, payload) => {
      config.invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      config.onSuccess?.(data, payload);
    },
    onError: (error, payload) => {
      config.onError?.(error as Error, payload);
    },
  });
}
