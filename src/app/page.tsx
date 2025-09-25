'use client';

import { BuildCard } from '@/components/BuildCard';
import { useBuilds } from '@/hooks/useBuilds';

export default function HomePage() {
  const { data: builds, isLoading, error } = useBuilds();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading builds</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Feed</h1>
      <div className="mt-4 space-y-4">
        {builds.map((build: any) => (
          <BuildCard key={build.id} build={build} />
        ))}
      </div>
    </div>
  );
}