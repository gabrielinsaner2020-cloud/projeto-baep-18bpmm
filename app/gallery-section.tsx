'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export type GalleryPhoto = {
  pathname: string;
  title: string;
  uploadedAt: string;
  image: string;
  initial?: boolean;
  description?: string;
};

const initialPhotos: GalleryPhoto[] = [
  ['01-apresentacao-da-equipe.jpg','Apresentação e prontidão da equipe','Registro de apresentação do efetivo, valorizando alinhamento, respeito à unidade e preparação coletiva.'],
  ['02-briefing-operacional.jpg','Briefing operacional e distribuição de recursos','Momento de orientação da equipe, conferência de responsabilidades e organização dos recursos antes da atividade virtual.'],
  ['03-formatura-e-disciplina.jpg','Formatura, respeito e disciplina','A disciplina e a apresentação individual reforçam a identidade, a organização e o compromisso do efetivo.'],
  ['04-prontidao-da-unidade.jpg','Prontidão e presença da unidade','Equipe preparada para iniciar as atividades virtuais com funções definidas, comunicação e supervisão.'],
  ['05-presenca-comunitaria.jpg','Presença e atendimento à comunidade virtual','Atuação baseada em presença, comunicação respeitosa e atenção às demandas apresentadas no ambiente virtual.'],
  ['06-integracao-e-prontidao.jpg','Integração e prontidão operacional','Integração do efetivo e dos recursos de mobilidade em uma composição planejada para atuação coordenada.'],
  ['07-equipe-em-posicionamento.jpg','Equipe em posicionamento coordenado','Organização visual da equipe e das viaturas, demonstrando união, preparo e identidade institucional.'],
  ['08-patrulhamento-integrado.jpg','Patrulhamento integrado e mobilidade','Integração entre equipe, viatura e motocicletas para ampliar mobilidade e presença durante as atividades virtuais.'],
  ['09-mobilidade-noturna.jpg','Mobilidade noturna sobre duas rodas','Registro da unidade de motocicletas em atividade noturna, com foco em mobilidade, integração e presença.'],
].map(([file,title,description]) => ({ pathname:`initial/${file}`, title, description, uploadedAt:'', image:`/gallery/${file}`, initial:true }));

export default function GallerySection() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(initialPhotos);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [selected, setSelected] = useState<number | null>(null);
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
  useEffect(() => {
    if (selected === null) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
      if (event.key === 'ArrowRight') setSelected(value => value === null ? null : (value + 1) % photos.length);
      if (event.key === 'ArrowLeft') setSelected(value => value === null ? null : (value - 1 + photos.length) % photos.length);
    };
    document.body.classList.add('lightbox-open'); window.addEventListener('keydown', key);
    return () => { document.body.classList.remove('lightbox-open'); window.removeEventListener('keydown', key); };
  }, [selected, photos.length]);

  return <section className="gallery-section" id="galeria">
    <header className="section-head"><div><p className="kicker">REGISTROS DA UNIDADE</p><h2>GALERIA DE<br/><em>ATUAÇÃO VIRTUAL.</em></h2></div><p>Uma memória visual das atividades, formações e momentos que representam a identidade do 18º BPM/M — Virtual.</p></header>
    <div className="gallery-status"><span><i /> ACERVO INSTITUCIONAL</span><b>{String(photos.length).padStart(2, '0')} REGISTROS</b><a className="gallery-private" href="/admin"><i>⌾</i> ÁREA PRIVADA <strong>↗</strong></a></div>
    {state === 'loading' && <div className="gallery-message"><i/><h3>CARREGANDO O ACERVO</h3><p>Sincronizando registros visuais...</p></div>}
    {state === 'error' && <div className="gallery-message"><h3>ACERVO INDISPONÍVEL</h3><p>Não foi possível carregar as imagens agora.</p><button onClick={load}>TENTAR NOVAMENTE</button></div>}
    {state === 'ready' && photos.length === 0 && <div className="gallery-message empty"><span>▣</span><h3>GALERIA EM PREPARAÇÃO</h3><p>Os primeiros registros serão publicados pelo administrador do projeto.</p></div>}
    {photos.length > 0 && <div className="gallery-grid">{photos.map((photo, index) => <figure key={photo.pathname}>
      <button className="gallery-open" onClick={() => setSelected(index)} aria-label={`Abrir ${photo.title || 'registro'} em tela cheia`}><img src={photo.image} alt={photo.title || `Registro visual ${index + 1} do 18º BPM/M`} loading="lazy"/><span>AMPLIAR REGISTRO <b>↗</b></span></button>
      <figcaption><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{photo.title || 'REGISTRO DE ATUAÇÃO'}</h3><small>{photo.initial ? 'ACERVO INICIAL' : new Intl.DateTimeFormat('pt-BR').format(new Date(photo.uploadedAt))} · 18º BPM/M VIRTUAL</small></div></figcaption>
    </figure>)}</div>}
    {selected !== null && photos[selected] && createPortal(<div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={photos[selected].title || 'Registro ampliado'} onMouseDown={event => { if(event.target === event.currentTarget) setSelected(null); }}>
      <button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Fechar imagem">×</button><div className="lightbox-frame"><div className="lightbox-visual"><img src={photos[selected].image} alt={photos[selected].title}/><span>18º BPM/M · REGISTRO {String(selected+1).padStart(2,'0')}</span></div><aside><small>ACERVO DE ATUAÇÃO VIRTUAL</small><b className="lightbox-number">{String(selected+1).padStart(2,'0')}<i>/{String(photos.length).padStart(2,'0')}</i></b><h2>{photos[selected].title || 'Registro de atuação'}</h2><p>{photos[selected].description || 'Registro visual publicado no acervo do projeto para apresentar parte das atividades desenvolvidas pela unidade virtual.'}</p><div><span><i/> IDENTIDADE</span><span><i/> PREPARO</span><span><i/> INTEGRAÇÃO</span></div><footer><button onClick={() => setSelected((selected-1+photos.length)%photos.length)}>← ANTERIOR</button><button onClick={() => setSelected((selected+1)%photos.length)}>PRÓXIMA →</button></footer></aside></div>
    </div>, document.body)}
  </section>;
}
