'use client';

import { useCallback, useEffect, useState } from 'react';

export type GalleryPhoto = {
  pathname: string;
  title: string;
  uploadedAt: string;
  image: string;
  initial?: boolean;
};

const initialPhotos: GalleryPhoto[] = [
  ['01-apresentacao-da-equipe.jpg','Apresentação e prontidão da equipe'],
  ['02-briefing-operacional.jpg','Briefing operacional e distribuição de recursos'],
  ['03-formatura-e-disciplina.jpg','Formatura, respeito e disciplina'],
  ['04-prontidao-da-unidade.jpg','Prontidão e presença da unidade'],
  ['05-presenca-comunitaria.jpg','Presença e atendimento à comunidade virtual'],
  ['06-integracao-e-prontidao.jpg','Integração e prontidão operacional'],
  ['07-equipe-em-posicionamento.jpg','Equipe em posicionamento coordenado'],
  ['08-patrulhamento-integrado.jpg','Patrulhamento integrado e mobilidade'],
  ['09-mobilidade-noturna.jpg','Mobilidade noturna sobre duas rodas'],
].map(([file,title]) => ({ pathname:`initial/${file}`, title, uploadedAt:'', image:`/gallery/${file}`, initial:true }));

export default function GallerySection() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(initialPhotos);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const load = useCallback(async () => {
    try {
      const response = await fetch('/api/gallery', { cache: 'no-store' });
      if (!response.ok) throw new Error();
      const uploaded = await response.json() as GalleryPhoto[];
      setPhotos([...initialPhotos, ...uploaded]);
      setState('ready');
    } catch { setState('error'); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  return <section className="gallery-section" id="galeria">
    <header className="section-head"><div><p className="kicker">REGISTROS DA UNIDADE</p><h2>GALERIA DE<br/><em>ATUAÇÃO VIRTUAL.</em></h2></div><p>Uma memória visual das atividades, formações e momentos que representam a identidade do 18º BPM/M — Virtual.</p></header>
    <div className="gallery-status"><span><i /> ACERVO INSTITUCIONAL</span><b>{String(photos.length).padStart(2, '0')} REGISTROS</b><small>ATUALIZAÇÃO PELO PAINEL PRIVADO</small></div>
    {state === 'loading' && <div className="gallery-message"><i/><h3>CARREGANDO O ACERVO</h3><p>Sincronizando registros visuais...</p></div>}
    {state === 'error' && <div className="gallery-message"><h3>ACERVO INDISPONÍVEL</h3><p>Não foi possível carregar as imagens agora.</p><button onClick={load}>TENTAR NOVAMENTE</button></div>}
    {state === 'ready' && photos.length === 0 && <div className="gallery-message empty"><span>▣</span><h3>GALERIA EM PREPARAÇÃO</h3><p>Os primeiros registros serão publicados pelo administrador do projeto.</p></div>}
    {photos.length > 0 && <div className="gallery-grid">{photos.map((photo, index) => <figure key={photo.pathname}>
      <div><img src={photo.image} alt={photo.title || `Registro visual ${index + 1} do 18º BPM/M`} loading="lazy"/></div>
      <figcaption><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{photo.title || 'REGISTRO DE ATUAÇÃO'}</h3><small>{photo.initial ? 'ACERVO INICIAL' : new Intl.DateTimeFormat('pt-BR').format(new Date(photo.uploadedAt))} · 18º BPM/M VIRTUAL</small></div></figcaption>
    </figure>)}</div>}
    <footer className="gallery-footer"><div><small>GESTÃO DO ACERVO</small><p>Envio, organização e documento oficial disponíveis somente a usuários autorizados.</p></div><a href="/admin">ACESSO PRIVADO <span>↗</span></a></footer>
  </section>;
}
