import { BottomNav } from './BottomNav';
import { Header } from './Header';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-16 pb-16">{children}</main>
      <BottomNav />
    </div>
  );
}
