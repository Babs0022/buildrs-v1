'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BuildCard } from '@/components/BuildCard';
import { useAuthStore } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { useUserBuilds } from '@/hooks/useUserBuilds';

export default function ProfilePage() {
  const { user: authUser } = useAuthStore();
  const { data: user, isLoading: isLoadingUser } = useUser(authUser?.address);
  const { data: builds, isLoading: isLoadingBuilds } = useUserBuilds(user?.id);

  if (isLoadingUser || isLoadingBuilds) return <div>Loading...</div>;
  if (!user) return <div>Please connect your wallet and sign in.</div>;

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <p className="text-sm text-gray-500">{user.address}</p>
            </div>
            <Button>Edit Profile</Button>
          </div>
        </CardHeader>
        <CardContent>
          <p>{user.bio}</p>
          <div className="mt-4 flex gap-4">
            <a href={user.github_url} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={user.twitter_url} target="_blank" rel="noreferrer">
              Twitter
            </a>
          </div>
          <div className="mt-4 flex gap-4">
            <div>
              <p className="font-semibold">Builder Score</p>
              <p>{user.builderScore || 'N/A'}</p>
            </div>
            <div>
              <p className="font-semibold">Streak</p>
              <p>{user.streak || 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Tabs defaultValue="builds" className="mt-4">
        <TabsList>
          <TabsTrigger value="builds">Builds</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="builds">
          <div className="mt-4 space-y-4">
            {builds?.map((build: any) => (
              <BuildCard key={build.id} build={build} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="activity">
          <p>Activity feed coming soon.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
