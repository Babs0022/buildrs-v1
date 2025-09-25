import { ConnectButton } from './ConnectButton';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-md items-center justify-between px-4">
        <h1 className="text-xl font-bold">BUILDRS</h1>
        <ConnectButton />
      </div>
    </header>
  );
}
