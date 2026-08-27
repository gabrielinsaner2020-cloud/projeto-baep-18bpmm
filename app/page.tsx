'use client';

import { useEffect, useState } from 'react';

function Crest() {
  return (
      <div className="crest-photo" aria-label="Brasão do 7º BAEP">
        <img src="baep-crest-360-web.png" alt="Brasão do 7º BAEP — Ações Especiais" />
    </div>
  );
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        const root = document.documentElement.style;
        root.setProperty('--mx', `${event.clientX}px`);
        root.setProperty('--my', `${event.clientY}px`);
        root.setProperty('--parallax-x', `${x * 18}px`);
        root.setProperty('--parallax-y', `${y * 14}px`);
        root.setProperty('--tilt-x', `${y * -4}deg`);
        root.setProperty('--tilt-y', `${x * 6}deg`);
      });
    };
    const sections = document.querySelectorAll<HTMLElement>('main > section:not(.hero)');
    sections.forEach((section) => section.classList.add('reveal-section'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    sections.forEach((section) => observer.observe(section));
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      observer.disconnect();
    };
  }, []);
  return (
    <main>
      <div className="cursor-glow" aria-hidden="true" />
      <nav className="nav">
        <a className="brand" href="#inicio"><Crest /><span><b>18º BPM/M</b><small>PROJETO BAEP</small></span></a>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Abrir menu" aria-expanded={menu}><span /><span /></button>
        <div className={`links ${menu ? 'open' : ''}`}><a href="#projeto">O projeto</a><a href="#operacao">Atuação</a><a href="#estrutura">Estrutura</a><a href="#formacao">Formação</a><a href="#implantacao">Implantação</a></div>
        <a className="nav-cta" href="#estrutura">Conheça a unidade <span>↗</span></a>
      </nav>
      <section className="hero" id="inicio">
        <div className="grid-lines" aria-hidden="true" /><div className="scan" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse" /> Grande São Paulo · Projeto de implantação</div>
          <h1>PRONTOS PARA<br /><strong>O PRÓXIMO NÍVEL.</strong></h1>
          <p>Uma proposta de excelência, disciplina e preparo para a implantação de uma unidade de ações especiais conduzida pelo 18º BPM/M – Virtual.</p>
          <div className="hero-actions"><a className="primary" href="#projeto">Explorar o projeto <span>→</span></a><a className="secondary" href="#estrutura"><i className="play">▶</i> Ver estrutura</a></div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hud-corner top-left" /><div className="hud-corner bottom-right" /><div className="crest-wrap"><div className="crest-aura" /><Crest /></div>
          <div className="datum datum-a"><span>COMANDO</span><b>18º BPM/M</b></div><div className="datum datum-b"><span>ÁREA DE ATUAÇÃO</span><b>GRANDE SÃO PAULO</b></div><div className="datum datum-c"><span>STATUS</span><b><i /> PRONTO PARA IMPLANTAÇÃO</b></div>
        </div>
        <div className="hero-index"><span>01</span><div /><small>VISÃO ESTRATÉGICA</small></div><div className="scroll-cue"><span>SCROLL PARA EXPLORAR</span><i>↓</i></div>
      </section>
      <section className="ticker" aria-label="Pilares da unidade"><div>DISCIPLINA <b>✦</b> PREPARO <b>✦</b> PRESENÇA <b>✦</b> EXCELÊNCIA OPERACIONAL <b>✦</b> DISCIPLINA <b>✦</b> PREPARO</div></section>
      <section className="intro" id="projeto"><div className="section-no">02 / MISSÃO</div><div><p className="kicker">UMA NOVA FORÇA. UMA NOVA MISSÃO.</p><h2>Estrutura, capacitação e liderança para elevar o padrão operacional.</h2></div><p className="intro-text">Este projeto apresenta a visão estratégica para uma unidade BAEP moderna, disciplinada e preparada para os desafios da Grande São Paulo.</p></section>
      <section className="pillars">
        {[['01','PRESENÇA','Atuação coordenada, pronta resposta e domínio territorial.'],['02','PREPARO','Formação contínua, doutrina e avaliação técnica.'],['03','DISCIPLINA','Comando presente, procedimentos claros e padrão elevado.'],['04','INOVAÇÃO','Tecnologia aplicada à gestão, instrução e planejamento.']].map(([n,t,d])=><article className="tilt-card" key={n}><span>{n}</span><div className="card-icon">{n==='01'?'⌖':n==='02'?'◈':n==='03'?'◆':'◉'}</div><h3>{t}</h3><p>{d}</p><i>↗</i></article>)}
      </section>
      <section className="operations" id="operacao">
        <header className="section-head"><div><p className="kicker">MODELO DE ATUAÇÃO</p><h2>COMO VAMOS<br/><em>TRABALHAR.</em></h2></div><p>Presença planejada, integração entre equipes e uma rotina clara de comando, execução e avaliação.</p></header>
        <div className="ops-dashboard">
          <aside className="ops-nav"><small>CENTRAL OPERACIONAL</small>{['Leitura da cidade','Planejamento','Distribuição de equipes','Execução coordenada','Relatório e avaliação'].map((x,i)=><button key={x} className={i===0?'active':''}><span>0{i+1}</span>{x}<b>↗</b></button>)}</aside>
          <div className="ops-map"><div className="map-grid"/><div className="map-ring ring-one"/><div className="map-ring ring-two"/><div className="map-node node-a"><i/>SETOR NORTE</div><div className="map-node node-b"><i/>SETOR CENTRAL</div><div className="map-node node-c"><i/>SETOR SUL</div><div className="map-command"><span>18º BPM/M</span><b>CENTRO DE COMANDO</b><small>COORDENAÇÃO INTEGRADA</small></div><div className="map-status"><span>SITUAÇÃO OPERACIONAL</span><b><i/> MONITORAMENTO ATIVO</b></div></div>
          <aside className="ops-detail"><span>01 / DIAGNÓSTICO</span><h3>LEITURA<br/>DA CIDADE</h3><p>Mapeamento dos setores, horários, demandas recorrentes e prioridades para orientar presença e emprego responsável do efetivo.</p><ul><li>Definição de setores</li><li>Janela de atuação</li><li>Pontos de atenção</li><li>Coordenação com unidades</li></ul></aside>
        </div>
        <div className="workflows">{[['BRIEFING','Antes de cada ciclo','Objetivos, equipes, comunicação e responsabilidades definidos pelo comando.'],['PRESENÇA','Durante a atuação','Equipes distribuídas por setores com coordenação, disciplina e comunicação contínua.'],['DEBRIEFING','Após cada ciclo','Registro dos resultados, revisão das decisões e plano de melhoria para a próxima atuação.']].map(([t,s,d],i)=><article key={t}><b>0{i+1}</b><small>{s}</small><h3>{t}</h3><p>{d}</p></article>)}</div>
      </section>
      <section className="structure" id="estrutura">
        <header className="section-head"><div><p className="kicker">CADEIA DE COMANDO</p><h2>ESTRUTURA DA<br/><em>UNIDADE</em></h2></div><p>Uma organização construída sobre liderança, responsabilidade e integração.</p></header>
        <div className="command-grid">
          <article className="leader leader-main"><span className="rank">✵✵✧</span><small>RESPONSÁVEL GERAL</small><h3>TEN-CEL<br/>RAFAEL AGUIAR</h3><div className="leader-code">CMD / 001</div></article>
          <article className="leader"><span className="rank">✵✧✧</span><small>SUBCOMANDO · RH</small><h3>MAJ PM<br/>GABRIEL SANTOS</h3><div className="leader-code">SCMD / 002</div></article>
          <article className="leader"><span className="rank">✧✧✧</span><small>OFICIAL</small><h3>CAP PM<br/>VALDIR</h3><div className="leader-code">OF / 003</div></article>
          <article className="leader accent"><span className="rank">✧</span><small>UNIDADE DE MOTOS</small><h3>2º TEN PM<br/>H. SMITH</h3><div className="leader-code">MOTO / 004</div></article>
        </div>
        <div className="roster">
          {[['✯','ASP PM','VITOR'],['❯❯ ❯❯❯','1º SGT PM','DEREK OLIVEIRA'],['❯❯ ❯❯❯','1º SGT PM','VITOR HUGO'],['❯❯❯','3º SGT PM','JOTA BUENO'],['◊❯❯','ALN SGT PM','ARTHUR PORTELLA'],['❯❯','CB PM','MARCOS SILVA'],['❯❯','CB PM','FELIPE ALMEIDA'],['❯❯','CB PM','MAYCON RIOS'],['❯','SD PM','JOAO CAVALCANTE'],['❯','SD PM','MATHEUS SILVA'],['❯','SD PM','BIREL COSTA']].map(([s,r,n],i)=><div className="roster-row" key={n}><b>{String(i+5).padStart(2,'0')}</b><span>{s}</span><small>{r}</small><strong>{n}</strong><i>ATIVO</i></div>)}
        </div>
      </section>
      <section className="academy" id="formacao">
        <div className="academy-copy"><p className="kicker">ACADEMIA DE FORMAÇÃO</p><h2>PREPARO QUE<br/><em>DEFINE O PADRÃO.</em></h2><p>Uma trilha progressiva que transforma conhecimento em prontidão, com instrução, simulação, avaliação e reciclagem.</p><div className="academy-stat"><b>06</b><span>MÓDULOS<br/>ESTRATÉGICOS</span><b>100%</b><span>AVALIAÇÃO<br/>CONTÍNUA</span></div></div>
        <div className="courses">
          {[['01','DOUTRINA E DISCIPLINA','Fundamentos da unidade, postura e cadeia de comando.'],['02','ABORDAGEM TÁTICA','Procedimentos, comunicação e controle de cenário.'],['03','PATRULHAMENTO ESPECIALIZADO','Planejamento, progressão e atuação coordenada.'],['04','OPERAÇÕES COM MOTOCICLETAS','Mobilidade, escolta e pronta resposta.'],['05','GERENCIAMENTO DE CRISES','Tomada de decisão, negociação e comando.'],['06','LIDERANÇA OPERACIONAL','Gestão de equipe, avaliação e desenvolvimento.']].map(([n,t,d])=><article key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div><b>＋</b></article>)}
        </div>
      </section>
      <section className="training-system">
        <header className="section-head"><div><p className="kicker">MATRIZ DE CAPACITAÇÃO</p><h2>CURSOS E<br/><em>CERTIFICAÇÕES.</em></h2></div><p>Formação organizada por níveis, com pré-requisitos, prática supervisionada, avaliação e reciclagem.</p></header>
        <div className="training-grid">{[['BASE','Modulação e B.O. PM','Comunicação, registro padronizado e fluxo de informação.','4H'],['BASE','P.O.P. / Carceragem','Procedimentos, responsabilidades e documentação.','4H'],['BASE','Abordagem e Posicionamento','Postura, comunicação e segurança no atendimento.','6H'],['MOBILIDADE','Direção Defensiva','Condução responsável, prevenção e tomada de decisão.','6H'],['TÁTICO','TAT I','Fundamentos, disciplina de equipe e progressão formativa.','8H'],['TÁTICO','TAT II','Integração de equipe e resolução de cenários simulados.','8H'],['TÁTICO','TAT III','Liderança, coordenação e avaliação avançada.','10H'],['ESPECIALIZAÇÃO','SAT-A','Aperfeiçoamento técnico e atuação supervisionada.','6H'],['ESPECIALIZAÇÃO','SAT-B','Consolidação técnica e certificação de competência.','8H'],['FORMAÇÃO','CFC','Curso de formação para liderança, instrução e gestão.','12H'],['MOTOCICLETAS','Pelotão RPM / ROCAM','Mobilidade, patrulhamento e coordenação de pelotão.','8H'],['COMANDO','Comandante RPM / ROCAM','Planejamento, liderança, supervisão e avaliação.','10H']].map(([tag,t,d,h],i)=><article key={t}><div className="course-top"><span>{String(i+1).padStart(2,'0')}</span><small>{tag}</small><b>{h}</b></div><h3>{t}</h3><p>{d}</p><footer><i>AVALIAÇÃO</i><strong>TEÓRICA + PRÁTICA</strong></footer></article>)}</div>
        <div className="training-flow">{[['01','INSCRIÇÃO','Pré-requisitos'],['02','INSTRUÇÃO','Teoria orientada'],['03','SIMULAÇÃO','Prática supervisionada'],['04','AVALIAÇÃO','Critérios objetivos'],['05','CERTIFICAÇÃO','Registro e validade']].map(([n,t,d],i)=><div className="flow-item" key={n}><span>{n}</span><b>{t}</b><small>{d}</small>{i<4&&<i>→</i>}</div>)}</div>
      </section>
      <section className="governance">
        <div className="governance-copy"><p className="kicker">GESTÃO DA UNIDADE</p><h2>PADRÃO EM<br/><em>CADA DETALHE.</em></h2><p>A unidade trabalha com responsabilidades definidas, registro de decisões e acompanhamento contínuo do efetivo.</p></div>
        <div className="governance-grid">{[['COMANDO GERAL','Direção estratégica, prioridades e validação das operações.','TEN-CEL Rafael Aguiar'],['SUBCOMANDO E RH','Escalas, documentação, desenvolvimento e acompanhamento.','MAJ PM Gabriel Santos'],['UNIDADE DE MOTOS','Formação específica, prontidão e gestão da mobilidade.','2º TEN PM H. Smith'],['INSTRUÇÃO','Calendário, instrutores, avaliações e certificações.','Comissão de Formação'],['CONTROLE DE QUALIDADE','Revisão de relatórios, indicadores e plano de melhoria.','Comando da Unidade'],['COMUNICAÇÃO','Briefings, avisos, agenda e memória institucional.','Secretaria Operacional']].map(([t,d,r],i)=><article key={t}><span>0{i+1}</span><h3>{t}</h3><p>{d}</p><small>RESPONSÁVEL</small><b>{r}</b></article>)}</div>
      </section>
      <section className="indicators">
        <header><p className="kicker">PAINEL DE PRONTIDÃO</p><h2>O QUE VAMOS<br/><em>ACOMPANHAR.</em></h2></header>
        <div className="indicator-grid">{[['01','EFETIVO','Presença, disponibilidade e distribuição por função.','100%'],['02','FORMAÇÃO','Cursos concluídos, avaliações e reciclagens.','12 trilhas'],['03','DISCIPLINA','Pontualidade, registros e cumprimento dos padrões.','Contínuo'],['04','OPERAÇÃO','Planejamento executado e relatórios finalizados.','Por ciclo'],['05','LIDERANÇA','Feedback, evolução e desenvolvimento do efetivo.','Mensal'],['06','QUALIDADE','Lições aprendidas e ações de melhoria implementadas.','Semanal']].map(([n,t,d,v])=><article key={n}><span>{n}</span><h3>{t}</h3><strong>{v}</strong><p>{d}</p><div><i/></div></article>)}</div>
      </section>
      <section className="roadmap" id="implantacao">
        <header className="section-head"><div><p className="kicker">PLANO DE IMPLANTAÇÃO</p><h2>DA VISÃO À<br/><em>PRONTIDÃO.</em></h2></div><p>Quatro movimentos para estruturar, capacitar, validar e ativar a nova unidade.</p></header>
        <div className="timeline"><div className="progress-line" />{[['FASE 01','ESTRUTURAÇÃO','Definição de comando, funções, normas e identidade da unidade.'],['FASE 02','CAPACITAÇÃO','Ciclo intensivo de cursos, instruções e exercícios integrados.'],['FASE 03','VALIDAÇÃO','Avaliações técnicas, simulações e certificação do efetivo.'],['FASE 04','ATIVAÇÃO','Início das operações com acompanhamento e melhoria contínua.']].map(([f,t,d],i)=><article key={f}><div className="phase-dot">{i+1}</div><small>{f}</small><h3>{t}</h3><p>{d}</p></article>)}</div>
        <div className="final-cta"><Crest/><div><small>18º BPM/M – VIRTUAL</small><h2>DISCIPLINA. PREPARO.<br/>PRESENÇA.</h2><p>Grande São Paulo · Projeto BAEP</p></div><a href="#inicio">VOLTAR AO TOPO ↑</a></div>
      </section>
      <footer className="disclaimer">PROJETO VIRTUAL INDEPENDENTE · SEM VÍNCULO COM ÓRGÃOS PÚBLICOS REAIS</footer>
    </main>
  );
}


