'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useCreateBuild() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBuild: any) => {
      const { data } = await axios.post('/api/builds', newBuild);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['builds'] });
    },
  });
}
