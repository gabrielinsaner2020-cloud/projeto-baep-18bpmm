import type { Metadata } from 'next';
import './globals.css';
import './modules.css';
import './enhancements.css';

export const metadata: Metadata = {
  title: 'Projeto BAEP | 18º BPM/M – Virtual',
  description: 'Explore o projeto BAEP do 18º BPM/M – Virtual por categorias: projetos, atuação, hierarquia, cursos, gestão e implantação.',
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

