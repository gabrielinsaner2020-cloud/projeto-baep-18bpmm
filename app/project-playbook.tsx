type Plan = { title:string; intro:string; rows:[string,string,string][]; documents:string[]; review:string };
export const playbooks:Record<string,Plan> = {
 inicio:{title:'O que a administração recebe',intro:'Entregas sugeridas para apresentar a unidade, discutir limites e decidir sobre uma etapa piloto.',rows:[
 ['Resumo executivo','Apresentar objetivo, escopo inicial, estrutura e compromissos de conduta.','Permite avaliar se a proposta está alinhada à comunidade.'],
 ['Diagnóstico de capacidade','Consolidar disponibilidade declarada, funções necessárias e formação pendente.','Dimensiona o início sem prometer cobertura indisponível.'],
 ['Pacto de implantação','Acordar interlocutores, calendário de revisão e dependências.','Define o que está autorizado e o que ainda depende de aprovação.'],
 ['Dossiê de acompanhamento','Organizar modelos de relatório, critérios de avaliação e pendências.','Permite acompanhar o projeto depois da apresentação.']],documents:['Resumo executivo de uma página','Lista de pontos para aprovação','Registro de decisões da reunião'],review:'Confirmar o que já existe, o que depende de autorização e o que ainda é uma proposta.'},
 projeto:{title:'Novas iniciativas para desenvolver a unidade',intro:'Programas complementares propostos. Começar com um escopo pequeno e designar responsáveis antes de abrir atividades.',rows:[
 ['Mentoria 18','Associar novos integrantes a orientadores durante a adaptação, com conversas de acompanhamento.','Verificar dúvidas resolvidas e necessidades de apoio adicional.'],
 ['Laboratório de comunicação','Praticar comunicação e produção de relatos a partir de cenários fictícios.','Comparar clareza, objetividade e correção dos registros após a devolutiva.'],
 ['Escola de instrutores','Preparar integrantes para organizar aulas, explicar critérios e avaliar com respeito.','Aprovar um plano de aula e acompanhar uma instrução supervisionada.'],
 ['Fórum de melhoria','Reunir sugestões e escolher ações viáveis para o próximo ciclo.','Registrar encaminhamento e justificativa para as sugestões recebidas.'],
 ['Integração comunitária','Propor apresentações e atividades educativas virtuais autorizadas.','Recolher feedback sobre clareza, respeito e contribuição para a convivência.']],documents:['Ficha de iniciativa','Plano de mentoria','Registro de sugestões'],review:'Priorizar programas com benefício claro e pessoas disponíveis para acompanhá-los.'},
 operacao:{title:'Padrão de qualidade do turno',intro:'Roteiro administrativo para atividades virtuais. A qualidade está na organização e no comportamento, não na quantidade de ocorrências.',rows:[
 ['Preparação','Confirmar objetivo, regras, participantes e responsável; acolher dúvidas e impedimentos.','Briefing compreendido e funções confirmadas antes do início.'],
 ['Acompanhamento','Verificar se a atividade continua dentro do escopo autorizado e comunicar mudanças.','Registro das alterações relevantes e orientações da supervisão.'],
 ['Interrupção responsável','Se faltar supervisão ou houver conflito de regras, pausar a atividade afetada e consultar o responsável.','Motivo da pausa e condição necessária para retomada registrados.'],
 ['Fechamento','Consolidar pendências e encaminhar necessidades à instrução ou ao comando.','Cada melhoria tem responsável e próxima verificação.']],documents:['Modelo de briefing','Registro de alteração de turno','Relatório de encerramento'],review:'Registrar o necessário para compreender decisões, sem acumular informações pessoais desnecessárias.'},
 estrutura:{title:'Quem encaminha cada assunto',intro:'Fluxo proposto para reduzir dúvidas. Funções adicionais dependem de designação pelo comando.',rows:[
 ['Ingresso e disponibilidade','RH — CAP PM Gabriel Santos organiza informações e encaminhamentos.','Decisões que ultrapassem a função seguem para o comando.'],
 ['Desenvolvimento e tecnologia','CAP PM Gabriel Santos — criador deste projeto e responsável por todos os desenvolvimentos e iniciativas tecnológicas do 18º BPM/M.','Concepção e evolução das soluções digitais alinhadas às necessidades da unidade.'],
 ['Unidade de motos','2º TEN PM H. Smith acompanha a especialidade dentro das regras e autorizações.','Participação vinculada à formação e à validação interna.'],
 ['Mudança de estrutura','TEN-CEL Rafael Aguiar, responsável geral, com alinhamento do MAJ PM Jeraldo.','Decisão formalizada e efeitos comunicados ao efetivo.'],
 ['Instrução e turno','Instrutores e supervisores precisam ser designados para a atividade.','Responsável, limites da função e substituição conhecidos pela equipe.']],documents:['Matriz de funções','Registro de designações','Relação de substituições'],review:'Patente não substitui uma designação clara: informar quem responde pelo assunto e quem o substitui.'},
 formacao:{title:'Critérios que tornam a formação útil',intro:'Avaliação por competências proposta para complementar os cursos. Critérios divulgados antes da turma; atividades exclusivamente virtuais.',rows:[
 ['Comunicação — Modulação e B.O.','Produzir relato fictício com sequência compreensível e fatos separados de opiniões.','Reduz ambiguidades e melhora o acompanhamento pela supervisão.'],
 ['Procedimentos — P.O.P. e base','Explicar as regras do cenário e reconhecer quando pedir orientação.','Evita improvisos incompatíveis com as normas locais.'],
 ['Mobilidade — Direção e RPM/ROCAM','Participar de exercício virtual supervisionado, respeitando limites e comunicação.','Vincula a especialização à responsabilidade demonstrada.'],
 ['Cooperação — TAT e SAT','Cumprir o papel combinado, comunicar mudanças e participar do debriefing.','Melhora a coordenação e identifica necessidades de reciclagem.'],
 ['Liderança — CFC e comando','Preparar briefing, distribuir responsabilidades e oferecer devolutiva respeitosa.','Desenvolve a capacidade de orientar pessoas e acompanhar entregas.']],documents:['Plano de aula com pré-requisitos','Ficha de avaliação por competência','Plano individual de recuperação'],review:'Resultados sugeridos: demonstrou, em desenvolvimento ou precisa de nova avaliação. Curso não gera promoção automática.'},
 gestao:{title:'Uma agenda de gestão sustentável',intro:'Cadência sugerida, adaptável à disponibilidade. Cada encontro deve produzir decisões, responsáveis e acompanhamento.',rows:[
 ['A cada turno','Revisar disponibilidade, pendências imediatas e orientações.','Escala confirmada e responsáveis identificados.'],
 ['Semanal','Acompanhar integração, calendário de instrução e dificuldades recorrentes.','Ações curtas com responsáveis e prazos acordados.'],
 ['Mensal','Revisar formação, participação, conduta e andamento dos programas.','Resumo com contexto e plano de melhoria para o próximo período.'],
 ['Ao fim de cada fase','Avaliar entregas, pendências, capacidade e alinhamento com a administração.','Decisão de manter, ajustar ou ampliar o escopo.'],
 ['Após mudança relevante','Rever documentos quando regras, comando ou disponibilidade mudarem.','Informações atualizadas e comunicadas ao efetivo.']],documents:['Pauta e ata resumida','Quadro de ações e responsáveis','Resumo mensal'],review:'Avaliações individuais permanecem internas. Apresentações externas usam sínteses sem expor dados pessoais.'},
 implantacao:{title:'Riscos previstos. Respostas combinadas.',intro:'Antecipar dificuldades faz parte de uma proposta séria. A expansão depende de condições para manter o padrão acordado.',rows:[
 ['Disponibilidade abaixo do previsto','Reduzir escopo inicial e rever horários com o efetivo.','Confirmar capacidade antes de ampliar atividades.'],
 ['Instrutores indisponíveis','Reprogramar turmas e identificar a formação pendente.','Ter responsável e material aprovado antes de abrir a turma.'],
 ['Regras ainda não alinhadas','Registrar dúvidas e adiar a atividade afetada.','Obter orientação da administração e comunicá-la à equipe.'],
 ['Piloto com falhas recorrentes','Reforçar orientação, corrigir processos e repetir a avaliação.','Demonstrar evolução nos pontos considerados essenciais.'],
 ['Crescimento rápido','Organizar entradas por ciclos conforme a capacidade de integração.','Garantir supervisão e formação para novos integrantes.']],documents:['Registro de riscos e dependências','Checklist de validação da fase','Revisão do piloto'],review:'Registrar evidências, pendências aceitas e condições de revisão. O calendário é referência, não garantia.'},
};
export default function ProjectPlaybook({category}:{category:string}) {
 const plan=playbooks[category];
 return <div className="project-playbook"><header><span>PLANO APLICADO / PROPOSTAS PARA VALIDAÇÃO</span><h3>{plan.title}</h3><p>{plan.intro}</p></header>
 <div className="playbook-matrix">{plan.rows.map((row,i)=><article key={row[0]}><div className="playbook-topic"><span>{String(i+1).padStart(2,'0')}</span><h4>{row[0]}</h4></div><div><small>APLICAÇÃO PROPOSTA</small><p>{row[1]}</p></div><div><small>RESULTADO / VERIFICAÇÃO</small><p>{row[2]}</p></div></article>)}</div>
 <div className="playbook-files"><div><span>DOCUMENTOS A PREPARAR</span><ul>{plan.documents.map(document=><li key={document}><i aria-hidden="true">↗</i>{document}</li>)}</ul></div><aside><span>PONTO DE ATENÇÃO</span><p>{plan.review}</p><small>Modelos propostos — o site não coleta dados nem gera registros administrativos.</small></aside></div></div>;
}
