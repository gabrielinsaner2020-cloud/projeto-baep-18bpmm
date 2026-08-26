import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Projeto BAEP | 18º BPM/M – Virtual',
  description: 'Projeto estratégico de implantação BAEP para a Grande São Paulo.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

