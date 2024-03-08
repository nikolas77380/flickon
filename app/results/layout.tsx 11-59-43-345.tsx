export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="max-w-[1373px] m:auto">{children}</div>
    </div>
  );
}
