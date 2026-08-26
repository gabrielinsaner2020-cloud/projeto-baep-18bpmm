'use client';

import { useEffect, useState } from 'react';

const roster = [
  ['✵✵✧','TEN-CEL','Rafael Aguiar','Comando Geral'],['✵✧✧','MAJ PM','Gabriel Santos','Subcomando · RH'],['✧✧✧','CAP PM','Valdir','Oficial'],['✧','2º TEN PM','H. Smith','Unidade de Motos'],['✯','ASP PM','Vitor','Oficial em formação'],['❯❯ ❯❯❯','1º SGT PM','Derek Oliveira','Praças'],['❯❯ ❯❯❯','1º SGT PM','Vitor Hugo','Praças'],['❯❯❯','3º SGT PM','Jota Bueno','Praças'],['◊❯❯','ALN SGT PM','Arthur Portella','Formação'],['❯❯','CB PM','Marcos Silva','Efetivo'],['❯❯','CB PM','Felipe Almeida','Efetivo'],['❯❯','CB PM','Maycon Rios','Efetivo'],['❯','SD PM','Joao Cavalcante','Efetivo'],['❯','SD PM','Matheus Silva','Efetivo'],['❯','SD PM','Birel Costa','Efetivo'],
];

const courses = [
  ['01','BASE','Modulação e B.O. PM','Comunicação e registro padronizado'],['02','BASE','P.O.P. / Carceragem','Procedimentos e responsabilidades'],['03','BASE','Abordagem e Posicionamento','Postura, comunicação e segurança'],['04','MOBILIDADE','Direção Defensiva','Condução responsável e prevenção'],['05','TÁTICO','TAT I','Fundamentos e disciplina de equipe'],['06','TÁTICO','TAT II','Integração e cenários simulados'],['07','TÁTICO','TAT III','Coordenação e liderança avançada'],['08','ESPECIALIZAÇÃO','SAT-A','Aperfeiçoamento supervisionado'],['09','ESPECIALIZAÇÃO','SAT-B','Consolidação e certificação'],['10','FORMAÇÃO','CFC','Formação de liderança e gestão'],['11','MOTOCICLETAS','Pelotão RPM / ROCAM','Mobilidade e coordenação'],['12','COMANDO','Comandante RPM / ROCAM','Planejamento e supervisão'],
];

function Insignia({ compact=false }: { compact?: boolean }) {
  return <div className={`insignia ${compact?'compact':''}`}><span>18</span><b>BAEP</b><small>BPM/M · VIRTUAL</small></div>;
}

export default function Home(){
  const [open,setOpen]=useState(false);
  useEffect(()=>{const obs=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>obs.observe(x));return()=>obs.disconnect()},[]);
  return <main>
    <header className="topbar"><a href="#top" className="identity"><Insignia compact/><div><strong>18º BPM/M — VIRTUAL</strong><span>PROJETO DE IMPLANTAÇÃO BAEP</span></div></a><button onClick={()=>setOpen(!open)} aria-label="Menu">{open?'FECHAR':'MENU'} <i>☰</i></button><nav className={open?'open':''}><a href="#missao">Missão</a><a href="#operacao">Atuação</a><a href="#comando">Comando</a><a href="#formacao">Formação</a><a href="#implantacao">Implantação</a></nav></header>

    <section className="cover" id="top">
      <div className="cover-stripe"/><div className="cover-content reveal"><p className="overline">DOSSIÊ INSTITUCIONAL · ORDEM 018/BAEP</p><h1>FORÇA,<br/>DISCIPLINA<br/><em>E PRESENÇA.</em></h1><p className="lead">Plano estratégico para implantação de uma unidade preparada, organizada e presente na Grande São Paulo.</p><div className="actions"><a href="#missao">CONHECER O PROJETO <b>→</b></a><a href="#comando">VER EFETIVO</a></div></div>
      <div className="cover-badge reveal"><Insignia/><div className="seal">PROJETO<br/>VIRTUAL</div></div>
      <div className="cover-meta"><span><small>UNIDADE</small>18º BPM/M</span><span><small>REGIÃO</small>GRANDE SÃO PAULO</span><span><small>SITUAÇÃO</small>EM IMPLANTAÇÃO</span></div>
    </section>

    <section className="statement" id="missao"><div className="side-label">01 — DIRETRIZ</div><div className="reveal"><p className="overline">NOSSA MISSÃO</p><h2>Construir uma unidade de referência baseada em liderança, preparo e responsabilidade.</h2><p>O projeto organiza comando, efetivo, formação, processos e metas em uma estrutura clara. Cada integrante conhece sua função, cada ciclo possui planejamento e cada resultado gera aprendizado.</p></div><blockquote className="reveal">“Excelência não é um ato isolado. É o padrão que repetimos todos os dias.”<span>COMANDO DO 18º BPM/M</span></blockquote></section>

    <section className="doctrine"><article><b>01</b><h3>DISCIPLINA</h3><p>Postura, pontualidade e cumprimento dos padrões da unidade.</p></article><article><b>02</b><h3>PREPARO</h3><p>Formação contínua, avaliação e aperfeiçoamento do efetivo.</p></article><article><b>03</b><h3>PRESENÇA</h3><p>Emprego planejado, coordenação e leitura permanente da cidade.</p></article><article><b>04</b><h3>LEALDADE</h3><p>Coesão, respeito à cadeia de comando e compromisso coletivo.</p></article></section>

    <section className="operation" id="operacao"><header className="section-title reveal"><p className="overline">02 — CONCEITO OPERACIONAL</p><h2>COMO A UNIDADE<br/>VAI TRABALHAR</h2></header><div className="operation-board reveal"><div className="board-head"><span>PLANO DE EMPREGO</span><b>GRANDE SÃO PAULO</b><small>REV. 01</small></div><div className="cycle">{[['01','LEITURA','Mapear setores, horários e prioridades.'],['02','PLANEJAMENTO','Definir objetivos, equipes e responsabilidades.'],['03','BRIEFING','Alinhar comando, comunicação e conduta.'],['04','EXECUÇÃO','Atuar por setores com coordenação contínua.'],['05','AVALIAÇÃO','Registrar resultados e pontos de melhoria.']].map(([n,t,d])=><article key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></article>)}</div><aside><h3>ROTINA DE COMANDO</h3><ul><li>Briefing antes de cada ciclo</li><li>Distribuição formal das funções</li><li>Comunicação durante a atuação</li><li>Relatório ao encerramento</li><li>Debriefing e plano de melhoria</li></ul></aside></div></section>

    <section className="command" id="comando"><header className="section-title reveal"><p className="overline">03 — ORGANIZAÇÃO</p><h2>CADEIA DE COMANDO</h2></header><div className="leaders reveal">{roster.slice(0,4).map(([s,r,n,f],i)=><article key={n} className={i===0?'chief':''}><span>{s}</span><small>{f}</small><h3>{r}<br/><b>{n}</b></h3><i>0{i+1}</i></article>)}</div><div className="personnel reveal">{roster.slice(4).map(([s,r,n,f],i)=><div key={n}><span>{String(i+5).padStart(2,'0')}</span><b>{s}</b><small>{r}</small><strong>{n}</strong><i>{f}</i></div>)}</div></section>

    <section className="training" id="formacao"><header className="section-title reveal"><p className="overline">04 — ACADEMIA</p><h2>FORMAÇÃO QUE<br/>SUSTENTA A MISSÃO</h2><p>Trilhas progressivas, prática supervisionada e avaliação objetiva.</p></header><div className="course-list reveal">{courses.map(([n,tag,t,d])=><article key={n}><span>{n}</span><small>{tag}</small><h3>{t}</h3><p>{d}</p><b>TEÓRICA + PRÁTICA</b></article>)}</div><div className="certification"><span>INSCRIÇÃO</span><i>→</i><span>INSTRUÇÃO</span><i>→</i><span>SIMULAÇÃO</span><i>→</i><span>AVALIAÇÃO</span><i>→</i><span>CERTIFICAÇÃO</span></div></section>

    <section className="deployment" id="implantacao"><header className="section-title reveal"><p className="overline">05 — PLANO DE IMPLANTAÇÃO</p><h2>DA ESTRUTURA<br/>À PRONTIDÃO</h2></header><div className="phases reveal">{[['FASE I','ESTRUTURAR','Comando, funções, normas e identidade.'],['FASE II','CAPACITAR','Cursos, instruções e exercícios integrados.'],['FASE III','VALIDAR','Avaliações, simulações e certificações.'],['FASE IV','ATIVAR','Início dos ciclos e melhoria contínua.']].map(([f,t,d],i)=><article key={f}><b>{String(i+1).padStart(2,'0')}</b><small>{f}</small><h3>{t}</h3><p>{d}</p></article>)}</div></section>

    <footer><Insignia compact/><div><strong>18º BPM/M — VIRTUAL</strong><span>DISCIPLINA · PREPARO · PRESENÇA</span></div><p>Projeto virtual independente, sem vínculo com órgãos públicos reais.</p><a href="#top">VOLTAR AO TOPO ↑</a></footer>
  </main>
}

