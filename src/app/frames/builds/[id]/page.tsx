import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

// This function will be replaced with a database call
async function getBuild(id: string) {
  // In a real app, you would fetch this from your database
  return {
    id,
    title: 'My Awesome Build',
    author: 'test.eth',
    imageUrl: 'https://via.placeholder.com/600x315', // Frame images should have a 1.91:1 aspect ratio
  };
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const build = await getBuild(params.id);
  const appUrl = `${process.env.NEXT_PUBLIC_APP_URL}/builds/${build.id}`;

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: 'View on BUILDRS',
        action: 'link',
        target: appUrl,
      },
      {
        label: 'Upvote',
        action: 'post',
      },
    ],
    image: build.imageUrl,
    post_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/frames/builds/${build.id}/vote`,
  });

  return {
    title: build.title,
    description: `A build by ${build.author}`,
    openGraph: {
      title: build.title,
      description: `A build by ${build.author}`,
      images: [build.imageUrl],
    },
    other: {
      ...frameMetadata,
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Build Frame</h1>
      <p>This page is intended to be rendered as a Farcaster Frame.</p>
      <p>Build ID: {params.id}</p>
    </div>
  );
}
