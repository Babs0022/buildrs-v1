'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { create } from 'zustand';
import { useEffect } from 'react';
import { useNeynar } from '@neynar/react';

interface AuthState {
  user: any;
  isAuthenticated: boolean;
  login: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export function useAuth() {
  const { address, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { login } = useAuthStore();
  const { user: farcasterUser } = useNeynar();

  const siweMutation = useMutation({
    mutationFn: async ({ message, signature }: { message: string; signature: string }) => {
      const { data } = await axios.post('/api/auth/verify', { message, signature });
      return data;
    },
    onSuccess: (data) => {
      login(data.user);
    },
  });

  const farcasterMutation = useMutation({
    mutationFn: async ({ signer_uuid, fid }: { signer_uuid: string; fid: string }) => {
      const { data } = await axios.post('/api/auth/verify-farcaster', { signer_uuid, fid });
      return data;
    },
    onSuccess: (data) => {
      login(data.user);
    },
  });

  useEffect(() => {
    if (farcasterUser?.signer_uuid && farcasterUser?.fid) {
      farcasterMutation.mutate({ signer_uuid: farcasterUser.signer_uuid, fid: String(farcasterUser.fid) });
    }
  }, [farcasterUser]);

  const signIn = async () => {
    if (!address || !chainId) return;

    try {
      const { data: { nonce } } = await axios.get('/api/auth/nonce');

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      }).prepareMessage();

      const signature = await signMessageAsync({ message });

      siweMutation.mutate({ message, signature });
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return { signIn, ...siweMutation };
}
