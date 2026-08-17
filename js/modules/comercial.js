


/**
 * Módulo Comercial & CRM - Inova ERP
 * Gestão de Funil de Vendas (Kanban), Central SAC e Relacionamento com Clientes
 */

const STAGES_ORDER = ['prospeccao', 'contato', 'proposta', 'fechado'];

function renderComercial() {
  renderKanban();
  renderSACTable();
  renderRelacionamentosGrid();
}

function renderKanban() {
  const stages = STAGES_ORDER;

  stages.forEach(stage => {
    const colEl = document.getElementById(`kanban-${stage}`);
    const countEl = document.getElementById(`count-${stage}`);
    if (!colEl || !countEl) return;

    const filtered = window.AppState.state.crmLeads.filter(l => l.etapa === stage);
    countEl.textContent = filtered.length;

    colEl.innerHTML = filtered.map(l => {
      const isFirstStage = stage === 'prospeccao';
      const isLastStage = stage === 'fechado';

      return `
      <div class="bg-slate-50 border border-slate-200 p-3.5 rounded-xl shadow-sm space-y-2 hover:border-inova-yellow transition cursor-grab active:cursor-grabbing select-none"
           draggable="true"
           ondragstart="window.ComercialModule.handleDragStart(event, '${l.id}')"
           ondragend="window.ComercialModule.handleDragEnd(event)">
        <div class="flex items-center justify-between">
          <h4 class="font-bold text-slate-800 text-xs">${window.AppHelpers.escapeHtml(l.cliente)}</h4>
          <span class="text-[10px] font-mono font-semibold text-slate-400">#${l.id}</span>
        </div>
        <p class="text-[11px] text-slate-500"><i class="fas fa-user text-slate-400 mr-1"></i> ${window.AppHelpers.escapeHtml(l.contato)}</p>
        <div class="pt-2 border-t border-slate-200 flex justify-between items-center gap-2">
          <span class="text-xs font-black text-inova-blue">R$ ${window.AppHelpers.formatBRL(l.valor)}</span>
          <div class="flex items-center gap-1.5">
            ${!isFirstStage ? `
              <button onclick="window.ComercialModule.voltarEtapaLead('${l.id}')" title="Voltar etapa anterior" class="w-7 h-7 bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg text-[11px] transition flex items-center justify-center shadow-xs">
                <i class="fas fa-arrow-left"></i>
              </button>
            ` : ''}
            ${!isLastStage ? `
              <button onclick="window.ComercialModule.moverEtapaLead('${l.id}')" title="Avançar próxima etapa" class="w-7 h-7 bg-white border border-slate-200 hover:bg-inova-yellow text-slate-700 hover:text-slate-900 rounded-lg text-[11px] transition flex items-center justify-center shadow-xs">
                <i class="fas fa-arrow-right"></i>
              </button>
            ` : `
              <span class="text-[10px] font-bold text-emerald-700 px-2 py-0.5 bg-emerald-50 rounded-md border border-emerald-200 flex items-center gap-1">
                <i class="fas fa-check-double text-emerald-600"></i> Ganho
              </span>
            `}
          </div>
        </div>
      </div>
    `;
    }).join('');
  });
}

function renderSACTable() {
  const tbody = document.getElementById('tbl-sac-body');
  if (!tbody) return;

  tbody.innerHTML = window.AppState.state.sacTickets.map(t => `
    <tr class="hover:bg-slate-50 transition border-b border-slate-100">
      <td class="p-3.5 font-mono text-xs font-bold text-inova-blue">${t.id}</td>
      <td class="p-3.5 font-semibold text-slate-800">${window.AppHelpers.escapeHtml(t.cliente)}</td>
      <td class="p-3.5 text-slate-600 text-xs">${window.AppHelpers.escapeHtml(t.assunto)}</td>
      <td class="p-3.5"><span class="px-2.5 py-1 text-[10px] font-bold rounded-full border ${window.AppHelpers.getPrioridadeClass(t.prioridade)}">${t.prioridade}</span></td>
      <td class="p-3.5"><span class="px-2.5 py-1 text-[10px] font-bold rounded-full border ${window.AppHelpers.getSacStatusClass(t.status)}">${t.status}</span></td>
      <td class="p-3.5 text-right">
        <button onclick="window.ComercialModule.resolverTicket('${t.id}')" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold">Concluir Ticket</button>
      </td>
    </tr>
  `).join('');
}

function renderRelacionamentosGrid() {
  const grid = document.getElementById('relacionamento-grid');
  if (!grid) return;

  grid.innerHTML = window.AppState.state.crmLeads.map(l => `
    <div class="bg-white border border-slate-200 p-4 rounded-xl space-y-2 shadow-sm">
      <div class="flex justify-between items-center">
        <h4 class="font-bold text-slate-800 text-sm">${window.AppHelpers.escapeHtml(l.cliente)}</h4>
        <span class="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold uppercase">${l.etapa}</span>
      </div>
      <p class="text-xs text-slate-500"><i class="fas fa-user mr-1 text-inova-blue"></i> Responsável: ${window.AppHelpers.escapeHtml(l.contato)}</p>
      <p class="text-xs text-slate-500"><i class="fas fa-hand-holding-dollar mr-1 text-emerald-600"></i> Potencial: R$ ${window.AppHelpers.formatBRL(l.valor)}</p>
    </div>
  `).join('');
}

function setComSubTab(sub) {
  ['crm', 'sac', 'relacionamento'].forEach(s => {
    const el = document.getElementById(`sub-com-${s}`);
    if (el) el.classList.add('hidden');
  });
  const currentEl = document.getElementById(`sub-com-${sub}`);
  if (currentEl) currentEl.classList.remove('hidden');

  const buttons = {
    crm: 'btn-com-crm',
    sac: 'btn-com-sac',
    relacionamento: 'btn-com-relacionamento'
  };

  Object.entries(buttons).forEach(([key, id]) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    if (key === sub) {
      btn.className = 'px-4 py-2.5 rounded-xl text-xs font-bold bg-inova-yellow-light text-slate-900 border border-inova-yellow flex items-center gap-2';
    } else {
      btn.className = 'px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-900 flex items-center gap-2';
    }
  });
}

function openNewLeadModal() {
  const cliente = prompt('Nome da empresa/lead comercial:');
  const valor = prompt('Valor estimado do negócio (R$):', '25000');

  if (cliente && valor) {
    window.AppState.state.crmLeads.unshift({
      id: `LD-${window.AppState.state.crmLeads.length + 1}`,
      cliente,
      contato: 'Contato Registrado',
      valor: parseFloat(valor) || 0,
      etapa: 'prospeccao'
    });
    renderComercial();
    window.AppHelpers.showToast('Nova oportunidade adicionada ao Funil CRM!');
  }
}

function moverEtapaLead(id) {
  const lead = window.AppState.state.crmLeads.find(l => l.id === id);
  if (!lead) return;

  const currentIndex = STAGES_ORDER.indexOf(lead.etapa);
  if (currentIndex >= 0 && currentIndex < STAGES_ORDER.length - 1) {
    lead.etapa = STAGES_ORDER[currentIndex + 1];
    renderComercial();
    const stageLabel = window.AppHelpers.getKanbanStageLabel ? window.AppHelpers.getKanbanStageLabel(lead.etapa) : lead.etapa;
    window.AppHelpers.showToast(`Oportunidade ${id} avançou para ${stageLabel}!`);
  }
}

function voltarEtapaLead(id) {
  const lead = window.AppState.state.crmLeads.find(l => l.id === id);
  if (!lead) return;

  const currentIndex = STAGES_ORDER.indexOf(lead.etapa);
  if (currentIndex > 0) {
    lead.etapa = STAGES_ORDER[currentIndex - 1];
    renderComercial();
    const stageLabel = window.AppHelpers.getKanbanStageLabel ? window.AppHelpers.getKanbanStageLabel(lead.etapa) : lead.etapa;
    window.AppHelpers.showToast(`Oportunidade ${id} retornou para ${stageLabel}!`);
  }
}

function setLeadEtapa(id, novaEtapa) {
  const lead = window.AppState.state.crmLeads.find(l => l.id === id);
  if (!lead || !STAGES_ORDER.includes(novaEtapa)) return;

  if (lead.etapa !== novaEtapa) {
    lead.etapa = novaEtapa;
    renderComercial();
    const stageLabel = window.AppHelpers.getKanbanStageLabel ? window.AppHelpers.getKanbanStageLabel(novaEtapa) : novaEtapa;
    window.AppHelpers.showToast(`Oportunidade ${id} movida para ${stageLabel}!`);
  }
}

let draggedLeadId = null;

function handleDragStart(event, id) {
  draggedLeadId = id;
  if (event.dataTransfer) {
    event.dataTransfer.setData('text/plain', id);
    event.dataTransfer.effectAllowed = 'move';
  }
  setTimeout(() => {
    if (event.target && event.target.classList) {
      event.target.classList.add('opacity-40');
    }
  }, 0);
}

function handleDragEnd(event) {
  if (event.target && event.target.classList) {
    event.target.classList.remove('opacity-40');
  }
  document.querySelectorAll('.kanban-col').forEach(col => {
    col.classList.remove('ring-2', 'ring-inova-yellow', 'bg-amber-50/40');
  });
  draggedLeadId = null;
}

function handleDragOver(event) {
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
}

function handleDragEnter(event, stage) {
  event.preventDefault();
  const col = event.currentTarget;
  if (col && col.classList) {
    col.classList.add('ring-2', 'ring-inova-yellow', 'bg-amber-50/40');
  }
}

function handleDragLeave(event) {
  const col = event.currentTarget;
  if (col && col.classList && !col.contains(event.relatedTarget)) {
    col.classList.remove('ring-2', 'ring-inova-yellow', 'bg-amber-50/40');
  }
}

function handleDrop(event, stage) {
  event.preventDefault();
  const col = event.currentTarget;
  if (col && col.classList) {
    col.classList.remove('ring-2', 'ring-inova-yellow', 'bg-amber-50/40');
  }
  const id = (event.dataTransfer && event.dataTransfer.getData('text/plain')) || draggedLeadId;
  if (id && stage) {
    setLeadEtapa(id, stage);
  }
  draggedLeadId = null;
}

function openNewTicketModal() {
  const cliente = prompt('Nome do Cliente solicitante SAC:');
  const assunto = prompt('Descreva o assunto/problema do atendimento SAC:');

  if (cliente && assunto) {
    window.AppState.state.sacTickets.unshift({
      id: `TCK-${100 + window.AppState.state.sacTickets.length + 1}`,
      cliente,
      assunto,
      prioridade: 'Alta',
      status: 'Aberto'
    });
    renderComercial();
    window.AppHelpers.showToast('Novo chamado SAC Inova aberto!');
  }
}

function resolverTicket(id) {
  const ticket = window.AppState.state.sacTickets.find(t => t.id === id);
  if (ticket) {
    ticket.status = 'Resolvido';
    renderComercial();
    window.AppHelpers.showToast(`Ticket SAC ${id} finalizado!`);
  }
}

// Aliases globais para compatibilidade direta
window.moverEtapaLead = moverEtapaLead;
window.voltarEtapaLead = voltarEtapaLead;
window.avancarEtapaLead = moverEtapaLead;
window.setLeadEtapa = setLeadEtapa;
window.resolverTicket = resolverTicket;

window.ComercialModule = {
  renderComercial,
  renderKanban,
  setComSubTab,
  openNewLeadModal,
  moverEtapaLead,
  voltarEtapaLead,
  avancarEtapaLead: moverEtapaLead,
  setLeadEtapa,
  openNewTicketModal,
  resolverTicket,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  handleDrop
};