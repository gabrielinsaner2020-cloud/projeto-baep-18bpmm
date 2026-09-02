import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Projeto BAEP | 18º BPM/M – Virtual',
  description: 'Proposta do 18º BPM/M – Virtual para implantação BAEP: comando, formação e rotina de trabalho. Projeto independente, adaptável à comunidade de destino.',
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

