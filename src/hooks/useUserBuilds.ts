'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useUserBuilds(userId: number) {
  return useQuery({
    queryKey: ['userBuilds', userId],
    queryFn: async () => {
      // This endpoint doesn't exist yet, I'll create it later.
      const { data } = await axios.get(`/api/users/${userId}/builds`);
      return data;
    },
    enabled: !!userId,
  });
}
