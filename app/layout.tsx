import type { Metadata } from 'next';
import './globals.css';

const origin = process.env.GITHUB_ACTIONS === 'true'
  ? 'https://gabrielinsaner2020-cloud.github.io/projeto-baep-18bpmm/'
  : 'https://projeto-baep-18bpmm.vercel.app/';

export const metadata: Metadata = {
  title: 'Projeto BAEP | 18º BPM/M – Virtual',
  description: 'Proposta do 18º BPM/M – Virtual para implantação BAEP: comando, formação e rotina de trabalho. Projeto independente, adaptável à comunidade de destino.',
  openGraph: {
    title: '18º BPM/M — Virtual | Projeto de implantação BAEP',
    description: 'Comando, formação e atuação. Conheça a proposta do 18º para implantação de uma unidade BAEP virtual.',
    type: 'website',
    locale: 'pt_BR',
    url: origin,
    images: [{ url: `${origin}og.png`, alt: '18º BPM/M — Virtual. Projeto de implantação BAEP. Comando, formação e atuação.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '18º BPM/M — Virtual | Projeto BAEP',
    description: 'Conheça o comando, a formação e a proposta de atuação do 18º.',
    images: [`${origin}og.png`],
  },
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

