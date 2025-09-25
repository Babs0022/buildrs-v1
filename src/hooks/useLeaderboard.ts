'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useLeaderboard() {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const { data } = await axios.get('/api/leaderboard');
      return data;
    },
  });
}
