'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import type { GalleryPhoto } from '../gallery-section';

async function compressImage(file: File) {
  if (file.size <= 1_500_000 || file.type === 'image/png') return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1920 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale); canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/webp', .82));
  bitmap.close();
  return blob && blob.size < file.size ? new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' }) : file;
}

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const loadPhotos = useCallback(async () => { const r = await fetch('/api/gallery', { cache:'no-store' }); if (r.ok) setPhotos(await r.json()); }, []);
  useEffect(() => { fetch('/api/admin/status', { cache:'no-store' }).then(r=>r.json() as Promise<{authenticated:boolean}>).then(data=>{ setAuthenticated(data.authenticated); if(data.authenticated) void loadPhotos(); }).catch(()=>setAuthenticated(false)); }, [loadPhotos]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage('');
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    try {
      const response = await fetch('/api/admin/login', { method:'POST', credentials:'same-origin', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ username:form.get('username'), password:form.get('password') }) });
      const data = await response.json() as { error?: string };
      if (!response.ok) return setMessage(data.error || 'Não foi possível entrar.');
      formElement.reset(); setAuthenticated(true); void loadPhotos();
    } catch { setMessage('A autenticação não respondeu. Atualize a página e tente novamente.'); }
    finally { setBusy(false); }
  }
  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage('Preparando imagem...');
    const formElement = event.currentTarget;
    const form = new FormData(formElement); const original = form.get('file');
    try {
      if (!(original instanceof File) || !original.size) throw new Error('Selecione uma imagem.');
      const file = await compressImage(original); if(file.size > 3_800_000) throw new Error('A imagem ficou maior que 3,8 MB. Escolha uma menor.');
      form.set('file', file); setMessage('Enviando para o acervo...');
      const response = await fetch('/api/gallery', { method:'POST', body:form }); const data = await response.json() as { error?: string };
      if(!response.ok) throw new Error(data.error || 'Falha no envio.');
      formElement.reset(); await loadPhotos(); setMessage('Imagem publicada com sucesso.');
    } catch(error) { setMessage(error instanceof Error ? error.message : 'Falha no envio.'); } finally { setBusy(false); }
  }
  async function remove(photo: GalleryPhoto) {
    if(!confirm(`Remover ${photo.title || 'esta imagem'} da galeria?`)) return;
    setBusy(true); const response = await fetch(`/api/gallery?pathname=${encodeURIComponent(photo.pathname)}`, { method:'DELETE' });
    setBusy(false); if(response.ok) { await loadPhotos(); setMessage('Imagem removida.'); } else setMessage('Não foi possível remover a imagem.');
  }
  async function logout() { await fetch('/api/admin/logout', {method:'POST'}); setAuthenticated(false); setPhotos([]); }

  return <main className="admin-shell"><header><a href="/">← VOLTAR AO PROJETO</a><div><b>18º BPM/M</b><span>CONTROLE DE ACESSO</span></div></header>
    {authenticated === null && <section className="admin-loader"><i/><p>VALIDANDO CREDENCIAIS</p></section>}
    {authenticated === false && <section className="login-card"><small>ÁREA RESTRITA / NÍVEL ADMINISTRATIVO</small><h1>PAINEL<br/><em>PRIVADO.</em></h1><p>Entre para gerenciar o acervo visual e preparar o documento oficial do projeto.</p><form onSubmit={login}><label>USUÁRIO<input name="username" autoComplete="username" required/></label><label>SENHA<input name="password" type="password" autoComplete="current-password" required/></label><button disabled={busy}>{busy?'AUTENTICANDO...':'ACESSAR O PAINEL →'}</button></form>{message&&<div className="admin-alert">{message}</div>}<footer><i/> CONEXÃO PROTEGIDA · SESSÃO DE 8 HORAS</footer></section>}
    {authenticated && <section className="admin-dashboard"><div className="admin-heading"><div><small>SESSÃO AUTORIZADA</small><h1>CENTRAL DO<br/><em>PROJETO.</em></h1></div><button onClick={logout}>ENCERRAR SESSÃO</button></div><div className="admin-actions"><article><span>01 / ACERVO VISUAL</span><h2>PUBLICAR NOVO REGISTRO</h2><p>Envie JPG, PNG ou WebP. Imagens grandes são otimizadas antes do envio.</p><form onSubmit={upload}><label>TÍTULO OPCIONAL<input name="title" maxLength={100} placeholder="Ex.: Formação integrada"/></label><label className="file-field">SELECIONAR IMAGEM<input name="file" type="file" accept="image/jpeg,image/png,image/webp" required/></label><button disabled={busy}>{busy?'PROCESSANDO...':'PUBLICAR NA GALERIA →'}</button></form></article><article className="pdf-action"><span>02 / APRESENTAÇÃO</span><h2>DOCUMENTO OFICIAL</h2><p>Abra a versão organizada para apresentação e salve em PDF pelo navegador.</p><a href="/admin/documento">ABRIR GERADOR DE PDF ↗</a></article></div>{message&&<div className="admin-alert success">{message}</div>}<div className="admin-library"><header><div><small>ARQUIVOS PUBLICADOS</small><h2>GALERIA / {String(photos.length).padStart(2,'0')}</h2></div><button onClick={loadPhotos}>ATUALIZAR</button></header>{photos.length===0?<p className="admin-empty">Nenhuma imagem publicada.</p>:<div>{photos.map(photo=><article key={photo.pathname}><img src={photo.image} alt=""/><div><b>{photo.title||'Sem título'}</b><small>{new Intl.DateTimeFormat('pt-BR').format(new Date(photo.uploadedAt))}</small></div><button disabled={busy} onClick={()=>remove(photo)}>REMOVER</button></article>)}</div>}</div></section>}
  </main>;
}
