'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useBuilds() {
  return useQuery({
    queryKey: ['builds'],
    queryFn: async () => {
      const { data } = await axios.get('/api/builds');
      return data;
    },
  });
}
