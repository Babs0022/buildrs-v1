'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useUser(address: string) {
  return useQuery({
    queryKey: ['user', address],
    queryFn: async () => {
      const { data } = await axios.get(`/api/users/${address}`);
      return data;
    },
    enabled: !!address,
  });
}
