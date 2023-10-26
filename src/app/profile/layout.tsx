import NavbarBtm from '@/components/NavbarBtm';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container h-screen max-w-lg pb-6 bg-gray">
      {children}
      <NavbarBtm />
    </div>
  );
}
