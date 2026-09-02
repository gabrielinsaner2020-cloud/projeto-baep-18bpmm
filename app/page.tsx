'use client';
import CategoryBriefing from './category-briefing';

import { useCallback, useEffect, useRef, useState } from 'react';

function Crest() {
  return (
      <div className="crest-photo" aria-label="Brasão BAEP">
        <img src="baep-crest-360-web.png" alt="Brasão BAEP — Ações Especiais" />
    </div>
  );
}


const operationalStages = [
  { code:'01', title:'LEITURA DA CIDADE', label:'Diagnóstico territorial', description:'Organização das informações necessárias para compreender setores, horários, demandas recorrentes e prioridades da cidade de implantação.', bullets:['Divisão inicial por setores','Identificação de períodos prioritários','Levantamento de demandas recorrentes','Integração com as unidades existentes'], readiness:'92%', channel:'INTEL-01' },
  { code:'02', title:'PLANEJAMENTO', label:'Construção do ciclo', description:'Transformação do diagnóstico em objetivos, responsabilidades, recursos necessários e critérios claros de acompanhamento.', bullets:['Objetivo principal definido','Responsáveis por cada entrega','Cronograma e pontos de controle','Critérios de sucesso documentados'], readiness:'88%', channel:'PLAN-02' },
  { code:'03', title:'DISTRIBUIÇÃO DE EQUIPES', label:'Organização do efetivo', description:'Distribuição equilibrada das equipes conforme formação, função, disponibilidade e prioridade institucional.', bullets:['Funções e lideranças definidas','Equilíbrio entre setores','Comunicação padronizada','Reserva e substituições previstas'], readiness:'95%', channel:'CMD-03' },
  { code:'04', title:'EXECUÇÃO COORDENADA', label:'Ativação controlada', description:'Início das atividades com comando presente, comunicação contínua e registro das decisões tomadas durante o ciclo.', bullets:['Briefing antes da ativação','Supervisão durante o ciclo','Atualização contínua do comando','Registro das ocorrências relevantes'], readiness:'90%', channel:'OPS-04' },
  { code:'05', title:'RELATÓRIO E AVALIAÇÃO', label:'Aprendizado institucional', description:'Consolidação dos resultados, identificação de oportunidades e definição das melhorias para o próximo ciclo.', bullets:['Debriefing estruturado','Indicadores consolidados','Lições aprendidas registradas','Plano de melhoria aprovado'], readiness:'100%', channel:'QA-05' }
];

const categories = [
  { id: 'inicio', label: 'Início', code: '01', icon: '⌂', description: 'Apresentação e acesso rápido aos módulos.' },
  { id: 'projeto', label: 'Projetos', code: '02', icon: '◈', description: 'Missão, pilares e compromissos da unidade.' },
  { id: 'operacao', label: 'Atuação', code: '03', icon: '⌖', description: 'Planejamento, coordenação e rotina de trabalho.' },
  { id: 'estrutura', label: 'Hierarquia', code: '04', icon: '◇', description: 'Comando, responsáveis e quadro do efetivo.' },
  { id: 'formacao', label: 'Cursos', code: '05', icon: '▤', description: 'Trilhas de formação e matriz de capacitação.' },
  { id: 'gestao', label: 'Gestão', code: '06', icon: '◉', description: 'Responsabilidades e acompanhamento da unidade.' },
  { id: 'implantacao', label: 'Implantação', code: '07', icon: '↗', description: 'Requisitos, entregas e fases de implantação.' },
] as const;
type CategoryId = typeof categories[number]['id'];
const categoryFromHash = (hash: string): CategoryId => {
  const value = hash.replace(/^#/, '');
  const aliases: Record<string, CategoryId> = { hierarquia: 'estrutura', cursos: 'formacao', projetos: 'projeto' };
  return aliases[value] ?? categories.find(item => item.id === value)?.id ?? 'inicio';
};
const trainingCourses = [
          ['BASE','Modulação e B.O. PM','Comunicação, registro padronizado e fluxo de informação.','4H','Reduz falhas de comunicação e melhora a qualidade dos registros.','Padronização de rádio, relatórios e passagem de serviço.'],
          ['BASE','P.O.P. / Carceragem','Procedimentos, responsabilidades e documentação.','4H','Fortalece a segurança administrativa e a responsabilidade funcional.','Rotinas de custódia, conferência, registro e transferência.'],
          ['BASE','Abordagem e Posicionamento','Postura, comunicação e segurança no atendimento.','6H','Desenvolve controle emocional, leitura de cenário e atuação coordenada.','Exercícios de verbalização, posicionamento e tomada de decisão.'],
          ['MOBILIDADE','Direção Defensiva','Condução responsável, prevenção e tomada de decisão.','6H','Diminui riscos, preserva viaturas e aumenta a segurança da equipe.','Percepção de risco, condução preventiva e resposta a imprevistos.'],
          ['TÁTICO','TAT I','Fundamentos, disciplina de equipe e progressão formativa.','8H','Cria uma base operacional comum para todo o efetivo.','Comandos, formação de equipe, disciplina e exercícios básicos.'],
          ['TÁTICO','TAT II','Integração de equipe e resolução de cenários simulados.','8H','Aumenta a integração, a comunicação e a velocidade das decisões.','Simulações progressivas com funções e objetivos definidos.'],
          ['TÁTICO','TAT III','Liderança, coordenação e avaliação avançada.','10H','Prepara graduados e oficiais para comandar equipes em cenários complexos.','Planejamento, supervisão, avaliação e correção de desempenho.'],
          ['ESPECIALIZAÇÃO','SAT-A','Aperfeiçoamento técnico e atuação supervisionada.','6H','Transforma conhecimento teórico em competência prática observável.','Estações técnicas, repetição orientada e avaliação individual.'],
          ['ESPECIALIZAÇÃO','SAT-B','Consolidação técnica e certificação de competência.','8H','Valida o padrão mínimo para atuação especializada na unidade.','Cenários integrados, prova prática e registro de desempenho.'],
          ['FORMAÇÃO','CFC','Curso de formação para liderança, instrução e gestão.','12H','Forma líderes capazes de desenvolver pessoas e manter o padrão institucional.','Gestão de equipe, instrução, feedback, escala e acompanhamento.'],
          ['MOTOCICLETAS','Pelotão RPM / ROCAM','Mobilidade, patrulhamento e coordenação de pelotão.','8H','Amplia mobilidade, presença e capacidade de resposta da unidade.','Pilotagem aplicada, comunicação, patrulhamento e trabalho em dupla.'],
          ['COMANDO','Comandante RPM / ROCAM','Planejamento, liderança, supervisão e avaliação.','10H','Capacita o comandante a empregar e acompanhar a unidade de motocicletas.','Briefing, distribuição de equipes, supervisão e debriefing.']
        ];

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryId>('inicio');
  const [leaving, setLeaving] = useState(false);
  const [destination, setDestination] = useState<CategoryId>('inicio');
  const [motionPaused, setMotionPaused] = useState(false);
  const motionRef = useRef(false);
  const [courseQuery, setCourseQuery] = useState('');
  const [courseLevel, setCourseLevel] = useState('TODOS');
  const categoryRef = useRef<CategoryId>('inicio');
  const transitionTimer = useRef<number | undefined>(undefined);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const activeIndex = categories.findIndex(item => item.id === activeCategory);
  const currentCategory = categories[activeIndex];
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const filteredCourses = trainingCourses.filter(([tag, title, description]) =>
    (courseLevel === 'TODOS' || tag === courseLevel) &&
    normalize(title + ' ' + description).includes(normalize(courseQuery))
  );
  const switchCategory = useCallback((next: CategoryId, push = false, animate = true) => {
    window.clearTimeout(transitionTimer.current);
    setMenu(false);
    if (push && window.location.hash !== '#' + next) window.history.pushState(null, '', '#' + next);
    if (next === categoryRef.current) {
      setLeaving(false);
      if (push) window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    setDestination(next);
    const apply = () => {
      categoryRef.current = next;
      setActiveCategory(next);
      setLeaving(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
      requestAnimationFrame(() => titleRef.current?.focus({ preventScroll: true }));
    };
    if (!animate || motionRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) apply();
    else { setLeaving(true); transitionTimer.current = window.setTimeout(apply, 720); }
  }, []);
  useEffect(() => {
    switchCategory(categoryFromHash(window.location.hash), false, false);
    const sync = () => switchCategory(categoryFromHash(window.location.hash));
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.clearTimeout(transitionTimer.current);
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, [switchCategory]);
  useEffect(() => {
    document.title = currentCategory.label + ' | Projeto BAEP — 18º BPM/M';
  }, [currentCategory.label]);
  const [booting, setBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [activeOperation, setActiveOperation] = useState(0);
  const [clock, setClock] = useState('00:00:00');
  useEffect(() => {
    const bootTimer = window.setTimeout(() => setBooting(false), 4200);
    const progressTimer = window.setInterval(() => setBootProgress((value) => Math.min(100, value + 1)), 38);
    const stopProgress = window.setTimeout(() => window.clearInterval(progressTimer), 4200);
    const clockTimer = window.setInterval(() => setClock(new Date().toLocaleTimeString('pt-BR')), 1000);
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
    const sections = document.querySelectorAll<HTMLElement>('.category-panel > section:not(.hero)');
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
    const counters = document.querySelectorAll<HTMLElement>('[data-count]');
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        const target = Number(element.dataset.count || 0);
        const suffix = element.dataset.suffix || '';
        const started = performance.now();
        const duration = 1400;
        const animate = (now: number) => {
          const progress = Math.min((now - started) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = String(Math.round(target * eased)).padStart(target < 10 ? 2 : 1, '0') + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        countObserver.unobserve(element);
      });
    }, { threshold: 0.5 });
    counters.forEach((counter) => countObserver.observe(counter));
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.clearTimeout(bootTimer);
      window.clearTimeout(stopProgress);
      window.clearInterval(progressTimer);
      window.clearInterval(clockTimer);
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      observer.disconnect();
      countObserver.disconnect();
    };
  }, []);
  return (
    <main className={motionPaused ? "motion-paused" : ""} onClick={(event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      if (!anchor) return;
      const hash = anchor.getAttribute('href') || '';
      if (!categories.some(item => '#' + item.id === hash)) return;
      event.preventDefault();
      switchCategory(categoryFromHash(hash), true);
    }}>
      <div className={`boot-screen boot-v2 ${booting ? 'is-active' : 'is-done'}`} aria-hidden={!booting}>
        <div className="boot-grid" aria-hidden="true" /><div className="boot-vignette" aria-hidden="true" />
        <div className="boot-v2-header"><span>18º BPM/M — VIRTUAL</span><span>APRESENTAÇÃO DO PROJETO BAEP</span></div>
        <div className="boot-v2-body">
          <div className="boot-seal"><div className="seal-ring seal-ring-a" /><div className="seal-ring seal-ring-b" /><Crest /><span>DISCIPLINA · PREPARO · PRESENÇA</span></div>
          <div className="boot-v2-copy"><small>PROJETO DE IMPLANTAÇÃO / BAEP</small><h2>UMA UNIDADE.<br/><em>UM COMPROMISSO.</em></h2><p>Conheça a estrutura, a formação e a proposta de atuação do 18º BPM/M — Virtual.</p><div className="boot-facts"><div><b>07</b><span>MÓDULOS DO PROJETO</span></div><div><b>12</b><span>CURSOS NA MATRIZ</span></div><div><b>16</b><span>NOMES NA HIERARQUIA</span></div></div></div>
        </div>
        <div className="boot-mission-readout"><span>BRIEFING DE APRESENTAÇÃO</span><div><b>{bootProgress < 34 ? '01 / IDENTIDADE' : bootProgress < 67 ? '02 / PREPARAÇÃO' : '03 / IMPLANTAÇÃO'}</b><p>{bootProgress < 34 ? 'Uma estrutura de comando com funções e responsabilidades definidas.' : bootProgress < 67 ? 'Formação progressiva, avaliação e acompanhamento do efetivo.' : 'Implantação por fases, entregas verificáveis e revisão com a administração.'}</p></div><i aria-hidden="true" /></div><div className="boot-dossier"><div className="boot-dossier-label"><span>CONTEÚDO DA APRESENTAÇÃO</span><b>18 / BAEP</b></div><div className="boot-module-map">{categories.map((item,i)=><span key={item.id} className={bootProgress >= i * 14 ? 'revealed' : ''}><b>{item.code}</b>{item.label}<i /></span>)}</div><p>ESTRUTURA · PROGRAMAS · FORMAÇÃO · GESTÃO · IMPLANTAÇÃO</p></div>
        <div className="boot-v2-bottom"><div className="boot-chapters">{['IDENTIDADE','ESTRUTURA','FORMAÇÃO','APRESENTAÇÃO'].map((label,i)=><span key={label} className={bootProgress >= i*25 ? 'reached' : ''}><b>0{i+1}</b>{label}</span>)}</div><div className="intro-track"><i style={{width:bootProgress+'%'}} /></div><div className="intro-caption"><span>APRESENTAÇÃO VISUAL</span><b>{bootProgress}%</b><span>PROJETO VIRTUAL INDEPENDENTE</span></div></div>
        <button className="boot-skip" onClick={() => setBooting(false)}>ENTRAR NO PROJETO <span>↗</span></button>
      </div>
      <div className="particles" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ '--particle': i } as React.CSSProperties} />)}</div>
      <div className="cursor-glow" aria-hidden="true" />
      <nav className="nav">
        <a className="brand" href="#inicio"><span className="brand-emblem"><Crest /><i aria-hidden="true" /></span><span><b>18º BPM/M</b><small>PROJETO BAEP</small></span></a>
        <div className="header-project-data"><span>PROJETO DE IMPLANTAÇÃO</span><b>BAEP <i>/</i> 18º BPM/M</b></div>
        <button className="motion-toggle" aria-pressed={motionPaused} onClick={() => { motionRef.current = !motionPaused; setMotionPaused(!motionPaused); }} aria-label={motionPaused ? 'Ativar animações' : 'Pausar animações'}><i aria-hidden="true">{motionPaused ? '▶' : 'Ⅱ'}</i><span>{motionPaused ? 'Ativar efeitos' : 'Pausar efeitos'}</span></button>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-label={menu ? "Fechar categorias" : "Abrir categorias"} aria-controls="module-menu" aria-expanded={menu}><span /><span /></button>
        <div id="module-menu" className={`links ${menu ? 'open' : ''}`}>{categories.map(item => <a key={item.id} href={'#' + item.id} aria-current={activeCategory === item.id ? 'page' : undefined}>{item.label}</a>)}</div>
        <a className="nav-cta" href="#estrutura">Conheça a unidade <span>↗</span></a>
      </nav>
      <aside className="module-sidebar" aria-label="Categorias do projeto">
        <div className="module-sidebar-title"><span>18º BPM/M</span><b>CENTRAL DO PROJETO</b><small>SELECIONE UMA CATEGORIA</small></div>
        <nav>{categories.map(item => <a key={item.id} href={'#' + item.id} aria-current={activeCategory === item.id ? 'page' : undefined}><span className="module-icon" aria-hidden="true">{item.icon}</span><span>{item.label}<small>{item.code} / MÓDULO</small></span><b>›</b></a>)}</nav>
        <div className="module-sidebar-footer"><i /><span>PROJETO VIRTUAL<br/><b>NAVEGAÇÃO POR MÓDULOS</b></span></div>
      </aside>
      <div className="module-content">
        <div key={destination} className={`transition-veil transit-console ${leaving ? 'active' : ''}`} aria-hidden="true">
          <div className="transit-grid" /><div className="transition-shutter shutter-left" /><div className="transition-shutter shutter-right" /><div className="transit-scan" /><div className="transit-frame" />
          <div className="transit-heading"><span>18º BPM/M · PROJETO BAEP</span><span>NAVEGAÇÃO / {categories.find(item=>item.id===destination)?.code}</span></div>
          <div className="transit-watermark">{categories.find(item=>item.id===destination)?.code}</div>
          <div className="transition-caption"><span>PRÓXIMA SEÇÃO</span><b>{categories.find(item=>item.id===destination)?.label}</b><p>{categories.find(item=>item.id===destination)?.description}</p><i /><div className="transit-sequence"><span>SELECIONAR</span><span>TRANSIÇÃO</span><span>EXPLORAR</span></div></div>
          <div className="transit-route">{categories.map(item=><span key={item.id} className={item.id===destination?'target':''}><i /><b>{item.code}</b><small>{item.label}</small></span>)}</div>
        </div>
        <div className="module-toolbar premium-toolbar">
          <div className="toolbar-title"><small>18º BPM/M <span>/</span> CENTRAL DO PROJETO</small><h2 ref={titleRef} tabIndex={-1}>{currentCategory.label}<span>.</span></h2><p>{currentCategory.description}</p></div>
          <div className="toolbar-index" aria-hidden="true"><span>MÓDULO</span><b>{currentCategory.code}</b><small>DE 07</small></div>
          <div className="toolbar-context"><span><i /> NAVEGAÇÃO POR CATEGORIAS</span><span>PROJETO GERAL · SEM DESTINO FIXO</span><span>PRÓXIMO: <b>{categories[activeIndex+1]?.label || 'Início'}</b></span></div>
        </div>
        <nav className="module-mobile-tabs" aria-label="Acesso rápido às categorias">{categories.map(item => <a key={item.id} href={'#' + item.id} aria-current={activeCategory === item.id ? 'page' : undefined}><span>{item.code}</span><b>{item.label}<small>{item.description}</small></b><i aria-hidden="true">{item.icon}</i><em aria-hidden="true">↗</em></a>)}</nav>
        <div className={`category-stage ${leaving ? 'is-leaving' : ''}`} aria-busy={leaving}>
          <div className="module-transition-line" aria-hidden="true" />
          <div className="category-panel" hidden={activeCategory !== 'inicio'} role="region" aria-label="Início">
      <section className="hero" id="inicio">
        <div className="grid-lines" aria-hidden="true" /><div className="scan" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse" /> Projeto institucional · Implantação BAEP</div>
          <h1>PRONTOS PARA<br /><strong>O PRÓXIMO NÍVEL.</strong></h1>
          <p>Uma proposta de excelência, disciplina e preparo para a implantação de uma unidade de ações especiais conduzida pelo 18º BPM/M – Virtual.</p>
          <div className="hero-actions"><a className="primary" href="#projeto">Explorar o projeto <span>→</span></a><a className="secondary" href="#estrutura"><i className="play">▶</i> Ver estrutura</a></div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hud-corner top-left" /><div className="hud-corner bottom-right" /><div className="crest-wrap"><div className="crest-aura" /><Crest /></div>
          <div className="datum datum-a"><span>COMANDO</span><b>18º BPM/M</b></div><div className="datum datum-b"><span>DESTINO DO PROJETO</span><b>CIDADE DE IMPLANTAÇÃO</b></div><div className="datum datum-c"><span>STATUS</span><b><i /> PRONTO PARA IMPLANTAÇÃO</b></div>
        </div>
        <div className="hero-index"><span>01</span><div /><small>VISÃO ESTRATÉGICA</small></div><div className="scroll-cue"><span>EXPLORE PELO MENU DE CATEGORIAS</span><i>↗</i></div>
      </section>
      <section className="ticker" aria-label="Pilares da unidade"><div>DISCIPLINA <b>✦</b> PREPARO <b>✦</b> PRESENÇA <b>✦</b> EXCELÊNCIA OPERACIONAL <b>✦</b> DISCIPLINA <b>✦</b> PREPARO</div></section>
      <section className="module-launcher"><header><p className="kicker">EXPLORE POR CATEGORIA</p><h2>ACESSO DIRETO<br/><em>AO PROJETO.</em></h2><p>Escolha uma área. Cada módulo reúne uma parte da proposta, sem precisar percorrer todo o site.</p></header><div>{categories.slice(1).map(item => <a href={'#' + item.id} key={item.id}><span>{item.code} / {item.icon}</span><h3>{item.label}</h3><p>{item.description}</p><b>ABRIR MÓDULO ↗</b></a>)}</div></section>
      <CategoryBriefing category="inicio" />
          </div>
          <div className="category-panel" hidden={activeCategory !== 'projeto'} role="region" aria-label="Projetos">
      <section className="intro" id="projeto"><div className="section-no">02 / MISSÃO</div><div><p className="kicker">UMA NOVA FORÇA. UMA NOVA MISSÃO.</p><h2>Estrutura, capacitação e liderança para elevar o padrão operacional.</h2></div><p className="intro-text">Este projeto apresenta a visão estratégica para uma unidade BAEP moderna, disciplinada e preparada para os desafios operacionais da cidade que receberá a unidade.</p></section>
      <section className="pillars">
        {[['01','PRESENÇA','Atuação coordenada, pronta resposta e domínio territorial.'],['02','PREPARO','Formação contínua, doutrina e avaliação técnica.'],['03','DISCIPLINA','Comando presente, procedimentos claros e padrão elevado.'],['04','INOVAÇÃO','Tecnologia aplicada à gestão, instrução e planejamento.']].map(([n,t,d])=><article className="tilt-card" key={n}><span>{n}</span><div className="card-icon">{n==='01'?'⌖':n==='02'?'◈':n==='03'?'◆':'◉'}</div><h3>{t}</h3><p>{d}</p><i>↗</i></article>)}
      </section>
      <section className="project-blueprint">
        <header className="section-head"><div><p className="kicker">ARQUITETURA DO PROJETO</p><h2>UMA UNIDADE<br/><em>PRONTA PARA ASSUMIR.</em></h2></div><p>O projeto organiza pessoas, formação, comando, documentação e avaliação em um modelo adaptável à realidade da cidade de implantação.</p></header>
        <div className="blueprint-grid">{[
          ['01','OBJETIVO CENTRAL','Implantar uma unidade BAEP com identidade definida, cadeia de comando clara, efetivo preparado e capacidade de evolução contínua.'],
          ['02','ENTREGA INSTITUCIONAL','Apresentar à administração uma proposta completa, compreensível e aplicável, com fases, responsáveis e resultados esperados.'],
          ['03','ESTRUTURA HUMANA','Distribuir funções entre comando, RH, instrução, mobilidade, supervisão e efetivo operacional.'],
          ['04','PADRÃO DE FORMAÇÃO','Garantir que cada integrante percorra uma trilha comum, seja avaliado e mantenha sua qualificação atualizada.'],
          ['05','GESTÃO E CONTROLE','Registrar decisões, acompanhar indicadores, revisar resultados e transformar aprendizados em melhoria.'],
          ['06','ADAPTAÇÃO LOCAL','Adequar cronograma, efetivo e prioridades à cidade que receberá a unidade sem perder a identidade do 18º BPM/M.']
        ].map(([n,t,d])=><article key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div><i>↗</i></article>)}</div>
        <div className="project-promise"><span>COMPROMISSO DO 18º BPM/M</span><strong>ENTREGAR UMA UNIDADE ORGANIZADA, CAPACITADA, AVALIÁVEL E PRONTA PARA EVOLUIR.</strong></div>
      </section>
      <CategoryBriefing category="projeto" />
          </div>
          <div className="category-panel" hidden={activeCategory !== 'operacao'} role="region" aria-label="Atuação">
      <section className="operations" id="operacao">
        <header className="section-head"><div><p className="kicker">MODELO DE ATUAÇÃO</p><h2>COMO VAMOS<br/><em>TRABALHAR.</em></h2></div><p>Presença planejada, integração entre equipes e uma rotina clara de comando, execução e avaliação.</p></header>
        <div className="ops-dashboard advanced">
          <aside className="ops-nav"><small>CENTRAL OPERACIONAL</small>{operationalStages.map((stage,i)=><button key={stage.code} className={activeOperation===i?'active':''} onClick={() => setActiveOperation(i)} aria-pressed={activeOperation===i}><span>{stage.code}</span>{stage.title}<b>↗</b></button>)}<div className="ops-nav-footer"><i /> SISTEMA INTEGRADO<b>{clock}</b></div></aside>
          <div className="ops-map">
            <div className="map-grid"/><div className="radar-cross horizontal"/><div className="radar-cross vertical"/><div className="map-ring ring-one"/><div className="map-ring ring-two"/><div className="map-ring ring-three"/>
            <div className="map-top-data"><span>RADAR / 18-BPMM</span><b>{operationalStages[activeOperation].channel}</b><i>● MONITORAMENTO ATIVO</i></div>
            <div className="map-node node-a"><i/>SETOR ALFA<small>PRIORIDADE 01</small></div><div className="map-node node-b"><i/>SETOR BRAVO<small>PRIORIDADE 02</small></div><div className="map-node node-c"><i/>SETOR CHARLIE<small>PRIORIDADE 03</small></div><div className="map-node node-d"><i/>APOIO<small>RESERVA</small></div>
            <div className="map-command"><span>18º BPM/M</span><b>CENTRO DE COMANDO</b><small>{operationalStages[activeOperation].label}</small><div className="command-bars"><i/><i/><i/><i/><i/></div></div>
            <div className="map-status"><span>SITUAÇÃO OPERACIONAL</span><b><i/> MONITORAMENTO ATIVO</b></div>
            <div className="map-coordinates"><span>SETOR</span><b>GERAL</b><span>COBERTURA</span><b>03 + APOIO</b><span>ATUALIZAÇÃO</span><b>{clock}</b></div>
            <div className="map-scale"><i/><i/><i/><i/><i/><span>ESCALA TERRITORIAL / ADAPTÁVEL</span></div>
          </div>
          <aside className="ops-detail"><span>{operationalStages[activeOperation].code} / {operationalStages[activeOperation].label}</span><h3>{operationalStages[activeOperation].title}</h3><p>{operationalStages[activeOperation].description}</p><div className="detail-readiness"><small>NÍVEL DE PREPARAÇÃO</small><b>{operationalStages[activeOperation].readiness}</b><i><span style={{width:operationalStages[activeOperation].readiness}}/></i></div><ul>{operationalStages[activeOperation].bullets.map((item)=><li key={item}>{item}</li>)}</ul><footer><span>CANAL ATIVO</span><b>{operationalStages[activeOperation].channel}</b></footer></aside>
        </div>
        <div className="ops-intelligence">{[
          ['SISTEMA','ONLINE','Integração dos módulos'],
          ['COBERTURA','04 NÍVEIS','Setores e apoio'],
          ['CICLO','05 ETAPAS','Do diagnóstico à avaliação'],
          ['COMANDO','ATIVO','Supervisão e controle'],
          ['QUALIDADE','CONTÍNUA','Revisão e melhoria']
        ].map(([t,v,d],i)=><article key={t}><span>0{i+1}</span><small>{t}</small><b>{v}</b><p>{d}</p><i /></article>)}</div>
        <div className="workflows">{[['BRIEFING','Antes de cada ciclo','Objetivos, equipes, comunicação e responsabilidades definidos pelo comando.'],['PRESENÇA','Durante a atuação','Equipes distribuídas por setores com coordenação, disciplina e comunicação contínua.'],['DEBRIEFING','Após cada ciclo','Registro dos resultados, revisão das decisões e plano de melhoria para a próxima atuação.']].map(([t,s,d],i)=><article key={t}><b>0{i+1}</b><small>{s}</small><h3>{t}</h3><p>{d}</p></article>)}</div>
      </section>
      <CategoryBriefing category="operacao" />
          </div>
          <div className="category-panel" hidden={activeCategory !== 'estrutura'} role="region" aria-label="Hierarquia">
      <section className="structure" id="estrutura">
        <header className="section-head"><div><p className="kicker">CADEIA DE COMANDO</p><h2>ESTRUTURA DA<br/><em>UNIDADE</em></h2></div><p>Uma organização construída sobre liderança, responsabilidade e integração.</p></header>
        <div className="command-grid">
          <article className="leader leader-main"><span className="rank">✵✵✧</span><small>RESPONSÁVEL GERAL</small><h3>TEN-CEL<br/>RAFAEL AGUIAR</h3><div className="leader-code">CMD / 001</div></article>
          <article className="leader"><span className="rank">✵✧✧</span><small>SUBCOMANDO</small><h3>MAJ PM<br/>JERALDO</h3><div className="leader-code">SCMD / 002</div></article>
          <article className="leader"><span className="rank">✧✧✧</span><small>RH · DESENVOLVIMENTO E TECNOLOGIA</small><h3>CAP PM<br/>GABRIEL SANTOS</h3><div className="leader-code">CRIADOR DO PROJETO / 003</div></article>
          <article className="leader"><span className="rank">✧✧</span><small>OFICIAL</small><h3>1º TEN PM<br/>VALDIR</h3><div className="leader-code">OF / 004</div></article>
          <article className="leader accent"><span className="rank">✧</span><small>UNIDADE DE MOTOS</small><h3>2º TEN PM<br/>H. SMITH</h3><div className="leader-code">MOTO / 005</div></article>
        </div>
        <div className="roster">
          {[['✯','ASP PM','VITOR'],['❯❯ ❯❯❯','1º SGT PM','DEREK OLIVEIRA'],['❯❯ ❯❯❯','1º SGT PM','VITOR HUGO'],['❯❯❯','3º SGT PM','JOTA BUENO'],['◊❯❯','ALN SGT PM','ARTHUR PORTELLA'],['❯❯','CB PM','MARCOS SILVA'],['❯❯','CB PM','FELIPE ALMEIDA'],['❯❯','CB PM','MAYCON RIOS'],['❯','SD PM','JOAO CAVALCANTE'],['❯','SD PM','MATHEUS SILVA'],['❯','SD PM','BIREL COSTA']].map(([s,r,n],i)=><div className="roster-row" key={n}><b>{String(i+6).padStart(2,'0')}</b><span>{s}</span><small>{r}</small><strong>{n}</strong><i>ATIVO</i></div>)}
        </div>
      </section>
      <CategoryBriefing category="estrutura" />
          </div>
          <div className="category-panel" hidden={activeCategory !== 'formacao'} role="region" aria-label="Cursos">
      <section className="academy" id="formacao">
        <div className="academy-copy"><p className="kicker">ACADEMIA DE FORMAÇÃO</p><h2>PREPARO QUE<br/><em>DEFINE O PADRÃO.</em></h2><p>Uma trilha progressiva que transforma conhecimento em prontidão, com instrução, simulação, avaliação e reciclagem.</p><div className="academy-stat"><b className="count-up" data-count="6">00</b><span>MÓDULOS<br/>ESTRATÉGICOS</span><b className="count-up" data-count="100" data-suffix="%">0%</b><span>AVALIAÇÃO<br/>CONTÍNUA</span></div></div>
        <div className="courses">
          {[['01','DOUTRINA E DISCIPLINA','Fundamentos da unidade, postura e cadeia de comando.'],['02','ABORDAGEM TÁTICA','Procedimentos, comunicação e controle de cenário.'],['03','PATRULHAMENTO ESPECIALIZADO','Planejamento, progressão e atuação coordenada.'],['04','OPERAÇÕES COM MOTOCICLETAS','Mobilidade, escolta e pronta resposta.'],['05','GERENCIAMENTO DE CRISES','Tomada de decisão, negociação e comando.'],['06','LIDERANÇA OPERACIONAL','Gestão de equipe, avaliação e desenvolvimento.']].map(([n,t,d])=><article key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div><b>＋</b></article>)}
        </div>
      </section>
      <section className="training-system">
        <header className="section-head"><div><p className="kicker">MATRIZ DE CAPACITAÇÃO</p><h2>CURSOS E<br/><em>CERTIFICAÇÕES.</em></h2></div><p>Formação organizada por níveis, com pré-requisitos, prática supervisionada, avaliação e reciclagem.</p></header>
        <div className="course-tools"><label><span>BUSCAR NA MATRIZ DE CURSOS</span><input type="search" value={courseQuery} onChange={event => setCourseQuery(event.target.value)} placeholder="Nome do curso ou assunto..." /></label><label><span>CATEGORIA</span><select value={courseLevel} onChange={event => setCourseLevel(event.target.value)}>{['TODOS', ...Array.from(new Set(trainingCourses.map(course => course[0])))].map(level => <option key={level} value={level}>{level}</option>)}</select></label><div aria-live="polite"><b>{String(filteredCourses.length).padStart(2, '0')}</b><span>CURSOS<br/>ENCONTRADOS</span></div></div>
        {filteredCourses.length === 0 && <div className="course-empty"><h3>Nenhum curso encontrado</h3><p>Tente outro nome ou selecione outra categoria.</p><button onClick={() => { setCourseQuery(''); setCourseLevel('TODOS'); }}>Limpar filtros</button></div>}
        <div className="training-grid">{filteredCourses.map(([tag,t,d,h,impact,application],i)=><article key={t}><div className="course-top"><span>{String(i+1).padStart(2,'0')}</span><small>{tag}</small><b>{h}</b></div><h3>{t}</h3><p>{d}</p><div className="course-influence"><small>INFLUÊNCIA NA UNIDADE</small><strong>{impact}</strong><small>APLICAÇÃO FORMATIVA</small><span>{application}</span></div><footer><i>AVALIAÇÃO</i><strong>TEÓRICA + PRÁTICA</strong></footer></article>)}</div>
        <div className="formation-impact">
          <header><span>RESULTADO DA FORMAÇÃO</span><h3>O QUE A MATRIZ ENTREGA À UNIDADE</h3></header>
          <div>{[
            ['01','PADRONIZAÇÃO','Todos trabalham com os mesmos procedimentos, linguagem e critérios de qualidade.'],
            ['02','PRONTIDÃO','O efetivo conhece sua função e responde com mais segurança e organização.'],
            ['03','LIDERANÇA','Graduados e oficiais acompanham, orientam e desenvolvem suas equipes.'],
            ['04','MELHORIA CONTÍNUA','Avaliações e reciclagens transformam falhas observadas em novos treinamentos.']
          ].map(([n,t,d])=><article key={n}><b>{n}</b><h4>{t}</h4><p>{d}</p></article>)}</div>
        </div>
        <div className="training-flow">{[['01','INSCRIÇÃO','Pré-requisitos'],['02','INSTRUÇÃO','Teoria orientada'],['03','SIMULAÇÃO','Prática supervisionada'],['04','AVALIAÇÃO','Critérios objetivos'],['05','CERTIFICAÇÃO','Registro e validade']].map(([n,t,d],i)=><div className="flow-item" key={n}><span>{n}</span><b>{t}</b><small>{d}</small>{i<4&&<i>→</i>}</div>)}</div>
      </section>
      <CategoryBriefing category="formacao" />
          </div>
          <div className="category-panel" hidden={activeCategory !== 'gestao'} role="region" aria-label="Gestão">
      <section className="governance">
        <div className="governance-copy"><p className="kicker">GESTÃO DA UNIDADE</p><h2>PADRÃO EM<br/><em>CADA DETALHE.</em></h2><p>A unidade trabalha com responsabilidades definidas, registro de decisões e acompanhamento contínuo do efetivo.</p></div>
        <div className="governance-grid">{[['COMANDO GERAL','Direção estratégica, prioridades e validação das operações.','TEN-CEL Rafael Aguiar'],['SUBCOMANDO','Coordenação da unidade, apoio ao comando e supervisão das atividades.','MAJ PM Jeraldo'],['RH E TECNOLOGIA','Criador deste projeto e responsável por todos os desenvolvimentos e iniciativas tecnológicas do 18º BPM/M, além da gestão de Recursos Humanos.','CAP PM Gabriel Santos'],['UNIDADE DE MOTOS','Formação específica, prontidão e gestão da mobilidade.','2º TEN PM H. Smith'],['INSTRUÇÃO','Calendário, instrutores, avaliações e certificações.','Comissão de Formação'],['CONTROLE DE QUALIDADE','Revisão de relatórios, indicadores e plano de melhoria.','Comando da Unidade'],['COMUNICAÇÃO','Briefings, avisos, agenda e memória institucional.','Secretaria Operacional']].map(([t,d,r],i)=><article key={t}><span>0{i+1}</span><h3>{t}</h3><p>{d}</p><small>RESPONSÁVEL</small><b>{r}</b></article>)}</div>
      </section>
      <section className="indicators">
        <header><p className="kicker">PAINEL DE PRONTIDÃO</p><h2>O QUE VAMOS<br/><em>ACOMPANHAR.</em></h2></header>
        <div className="indicator-grid">{[['01','EFETIVO','Presença, disponibilidade e distribuição por função.','100%'],['02','FORMAÇÃO','Cursos concluídos, avaliações e reciclagens.','12 trilhas'],['03','DISCIPLINA','Pontualidade, registros e cumprimento dos padrões.','Contínuo'],['04','OPERAÇÃO','Planejamento executado e relatórios finalizados.','Por ciclo'],['05','LIDERANÇA','Feedback, evolução e desenvolvimento do efetivo.','Mensal'],['06','QUALIDADE','Lições aprendidas e ações de melhoria implementadas.','Semanal']].map(([n,t,d,v])=><article key={n}><span>{n}</span><h3>{t}</h3><strong>{v}</strong><p>{d}</p><div><i/></div></article>)}</div>
      </section>
      <CategoryBriefing category="gestao" />
          </div>
          <div className="category-panel" hidden={activeCategory !== 'implantacao'} role="region" aria-label="Implantação">
      <section className="readiness-system">
        <header className="section-head"><div><p className="kicker">CONDIÇÕES DE IMPLANTAÇÃO</p><h2>O QUE PRECISA<br/><em>ESTAR PRONTO.</em></h2></div><p>A ativação acontece somente quando estrutura, pessoas, formação e gestão atingem o padrão mínimo definido pelo comando.</p></header>
        <div className="readiness-board">
          <div className="readiness-levels">{[
            ['01','COMANDO E FUNÇÕES','Nomeação formal dos responsáveis, substituições previstas e atribuições documentadas.','ESSENCIAL'],
            ['02','EFETIVO E ESCALAS','Quantidade compatível, disponibilidade conhecida e distribuição equilibrada por função.','ESSENCIAL'],
            ['03','FORMAÇÃO CERTIFICADA','Trilhas obrigatórias concluídas, avaliações registradas e reciclagens programadas.','OBRIGATÓRIO'],
            ['04','ROTINAS E DOCUMENTOS','Briefing, debriefing, relatórios, registros internos e comunicação padronizada.','OBRIGATÓRIO'],
            ['05','RECURSOS E MOBILIDADE','Meios disponíveis, responsáveis definidos e controle de utilização estabelecido.','OPERACIONAL'],
            ['06','INDICADORES E REVISÃO','Metas, acompanhamento periódico e plano de melhoria aprovado pelo comando.','CONTÍNUO']
          ].map(([n,t,d,s])=><article key={n}><b>{n}</b><div><h3>{t}</h3><p>{d}</p></div><span>{s}</span></article>)}</div>
          <aside className="approval-gate"><small>PORTÃO DE ATIVAÇÃO</small><h3>CRITÉRIO DE<br/>PRONTIDÃO</h3><div className="gate-score"><b className="count-up" data-count="100" data-suffix="%">0%</b><span>REQUISITOS<br/>VERIFICADOS</span></div><ul><li>Comando validado</li><li>Efetivo capacitado</li><li>Documentação aprovada</li><li>Rotina testada</li><li>Plano de melhoria ativo</li></ul><footer><i /> LIBERAÇÃO PELO COMANDO GERAL</footer></aside>
        </div>
        <div className="city-deliverables">{[
          ['PLANO DE 90 DIAS','Cronograma inicial com prioridades, responsáveis e pontos de avaliação.'],
          ['MATRIZ DE RESPONSABILIDADES','Definição clara de quem decide, executa, acompanha e comunica.'],
          ['RELATÓRIO DE PRONTIDÃO','Visão consolidada da formação, do efetivo e das pendências antes da ativação.'],
          ['CICLO DE REVISÃO','Reuniões periódicas para avaliar resultados e atualizar o plano da unidade.']
        ].map(([t,d],i)=><article key={t}><span>0{i+1}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
      </section>
      <section className="roadmap" id="implantacao">
        <header className="section-head"><div><p className="kicker">PLANO DE IMPLANTAÇÃO</p><h2>DA VISÃO À<br/><em>PRONTIDÃO.</em></h2></div><p>Quatro movimentos para estruturar, capacitar, validar e ativar a nova unidade.</p></header>
        <div className="timeline"><div className="progress-line" />{[['FASE 01','ESTRUTURAÇÃO','Definição de comando, funções, normas e identidade da unidade.'],['FASE 02','CAPACITAÇÃO','Ciclo intensivo de cursos, instruções e exercícios integrados.'],['FASE 03','VALIDAÇÃO','Avaliações técnicas, simulações e certificação do efetivo.'],['FASE 04','ATIVAÇÃO','Início das operações com acompanhamento e melhoria contínua.']].map(([f,t,d],i)=><article key={f}><div className="phase-dot">{i+1}</div><small>{f}</small><h3>{t}</h3><p>{d}</p></article>)}</div>
        <div className="final-cta"><Crest/><div><small>18º BPM/M – VIRTUAL</small><h2>DISCIPLINA. PREPARO.<br/>PRESENÇA.</h2><p>Projeto geral · Implantação BAEP</p></div><a href="#inicio">VOLTAR AO TOPO ↑</a></div>
      </section>
      <CategoryBriefing category="implantacao" />
          </div>
        </div>
        <nav className="module-pagination" aria-label="Navegar entre categorias"><button disabled={activeIndex === 0} onClick={() => switchCategory(categories[activeIndex - 1].id, true)}><span>←</span><div><small>ANTERIOR</small><b>{categories[activeIndex - 1]?.label || 'Você está no início'}</b></div></button><span>{currentCategory.code} / 07</span><button disabled={activeIndex === categories.length - 1} onClick={() => switchCategory(categories[activeIndex + 1].id, true)}><div><small>PRÓXIMO</small><b>{categories[activeIndex + 1]?.label || 'Último módulo'}</b></div><span>→</span></button></nav>
      <footer className="disclaimer">PROJETO VIRTUAL INDEPENDENTE · SEM VÍNCULO COM ÓRGÃOS PÚBLICOS REAIS</footer>
      </div>
    </main>
  );
}


