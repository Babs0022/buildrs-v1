'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateBuild } from '@/hooks/useCreateBuild';
import { useAuthStore } from '@/hooks/useAuth';
import { useUpload } from '@/hooks/useUpload';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddBuildPage() {
  const [type, setType] = useState('Launch');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const { user } = useAuthStore();
  const createBuild = useCreateBuild();
  const upload = useUpload();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    let media_ipfs_hash = null;
    if (mediaFile) {
      const { ipfsHash } = await upload.mutateAsync(mediaFile);
      media_ipfs_hash = ipfsHash;
    }

    await createBuild.mutateAsync({
      ...data,
      user_id: user.id,
      type,
      tags: (data.tags as string).split(',').map((tag) => tag.trim()),
      media_ipfs_hash,
    });

    router.push('/');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Add Build</h1>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="type">Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Launch">Launch</SelectItem>
              <SelectItem value="Update">Update</SelectItem>
              <SelectItem value="Experiment">Experiment</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" />
        </div>
        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input id="tags" name="tags" />
        </div>
        <div>
          <Label htmlFor="demo_url">Demo URL</Label>
          <Input id="demo_url" name="demo_url" />
        </div>
        <div>
          <Label htmlFor="repo_url">Repo URL</Label>
          <Input id="repo_url" name="repo_url" />
        </div>
        <div>
          <Label htmlFor="screenshot_url">Screenshot URL</Label>
          <Input id="screenshot_url" name="screenshot_url" />
        </div>
        <div>
          <Label htmlFor="media">Media (IPFS)</Label>
          <Input
            id="media"
            name="media"
            type="file"
            onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
          />
        </div>
        <Button type="submit" disabled={createBuild.isPending || upload.isPending}>
          {createBuild.isPending || upload.isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}