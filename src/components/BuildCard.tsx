import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ArrowDown, ArrowUp, MessageCircle } from 'lucide-react';

export function BuildCard({ build }: { build: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={build.author.avatarUrl} />
            <AvatarFallback>{build.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{build.author.name}</p>
            <p className="text-sm text-gray-500">Builder Score: {build.author.builderScore}</p>
          </div>
          <Badge>{build.type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{build.title}</h2>
        <p className="mt-2 text-gray-700">{build.description}</p>
        <div className="mt-4 flex gap-2">
          {build.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <ArrowUp className="h-4 w-4" />
          </Button>
          <span>{build.upvotes}</span>
          <Button variant="outline" size="icon">
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          <span>{build.commentsCount}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
