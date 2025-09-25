'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLeaderboard } from '@/hooks/useLeaderboard';

export default function LeaderboardPage() {
  const { data: leaderboard, isLoading, error } = useLeaderboard();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading leaderboard</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Builder</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Streak</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((user: any) => (
              <TableRow key={user.rank}>
                <TableCell>{user.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={user.avatar_url} />
                      <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{user.username}</p>
                      <p className="text-sm text-gray-500">{user.address}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.score}</TableCell>
                <TableCell>{user.streak}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
