// src/hooks/useCrudMutation.ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

type CrudConfig<TPayload, TResult> = {
  mutationFn: (payload: TPayload) => Promise<TResult>;
  invalidateKeys: (string | number)[][];
};

export function useCrudMutation<TPayload, TResult>(
  config: CrudConfig<TPayload, TResult>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: config.mutationFn,
    onSuccess: () => {
      config.invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
  });
}