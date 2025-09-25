'use client';

import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';
import { useAuth, useAuthStore } from '@/hooks/useAuth';
import { Button } from './ui/button';
import { useNeynar } from '@neynar/react';

export function ConnectButton() {
  const { isConnected } = useAccount();
  const { signIn, isPending: isSiwePending } = useAuth();
  const { isAuthenticated, user } = useAuthStore();
  const { login: farcasterLogin, isLoading: isFarcasterPending } = useNeynar();

  if (!isConnected) {
    return <ConnectKitButton />;
  }

  if (isAuthenticated) {
    return <div>Welcome, {user.username}</div>;
  }

  return (
    <div className="flex gap-2">
      <Button onClick={() => signIn()} disabled={isSiwePending}>
        {isSiwePending ? 'Signing in...' : 'Sign In with Ethereum'}
      </Button>
      <Button onClick={() => farcasterLogin?.()} disabled={isFarcasterPending}>
        {isFarcasterPending ? 'Signing in...' : 'Sign In with Farcaster'}
      </Button>
    </div>
  );
}
