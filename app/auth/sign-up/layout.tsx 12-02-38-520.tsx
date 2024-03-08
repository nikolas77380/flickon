import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Реєстрація",
  description: "Зареєструвати аккаунт",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
