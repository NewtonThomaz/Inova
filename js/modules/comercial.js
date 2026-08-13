


function renderComercial() {
  renderKanban();
  renderSACTable();
  renderRelacionamentosGrid();
}


function renderKanban() {
  const stages = ['prospeccao', 'contato', 'proposta', 'fechado'];

  stages.forEach(stage => {
    const colEl = document.getElementById(`kanban-${stage}`);
    const countEl = document.getElementById(`count-${stage}`);
    if (!colEl || !countEl) return;

    const filtered = window.AppState.state.crmLeads.filter(l => l.etapa === stage);
    countEl.textContent = filtered.length;

    colEl.innerHTML = filtered.map(l => `
      <div class="bg-slate-50 border border-slate-200 p-3.5 rounded-xl shadow-sm space-y-2 hover:border-inova-yellow transition">
        <h4 class="font-bold text-slate-800 text-xs">${window.AppHelpers.escapeHtml(l.cliente)}</h4>
        <p class="text-[11px] text-slate-500"><i class="fas fa-user text-slate-400 mr-1"></i> ${window.AppHelpers.escapeHtml(l.contato)}</p>
        <div class="pt-2 border-t border-slate-200 flex justify-between items-center">
          <span class="text-xs font-black text-inova-blue">R$ ${window.AppHelpers.formatBRL(l.valor)}</span>
          <button onclick="moverEtapaLead('${l.id}')" title="Avançar Etapa" class="p-1.5 bg-white border border-slate-200 hover:bg-inova-yellow text-slate-700 hover:text-slate-900 rounded-lg text-[11px] transition"><i class="fas fa-arrow-right"></i></button>
        </div>
      </div>
    `).join('');
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
        <button onclick="resolverTicket('${t.id}')" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold">Concluir Ticket</button>
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
    document.getElementById(`sub-com-${s}`).classList.add('hidden');
  });
  document.getElementById(`sub-com-${sub}`).classList.remove('hidden');

  
  const buttons = {
    crm: 'btn-com-crm',
    sac: 'btn-com-sac',
    relacionamento: 'btn-com-relacionamento'
  };

  Object.entries(buttons).forEach(([key, id]) => {
    const btn = document.getElementById(id);
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
      valor: parseFloat(valor),
      etapa: 'prospeccao'
    });
    renderComercial();
    window.AppHelpers.showToast('Nova oportunidade adicionada ao Funil CRM!');
  }
}


function moverEtapaLead(id) {
  const lead = window.AppState.state.crmLeads.find(l => l.id === id);
  if (lead) {
    if (lead.etapa === 'prospeccao') lead.etapa = 'contato';
    else if (lead.etapa === 'contato') lead.etapa = 'proposta';
    else if (lead.etapa === 'proposta') lead.etapa = 'fechado';
    renderComercial();
    window.AppHelpers.showToast(`Oportunidade ${id} movida no Funil Inova!`);
  }
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


window.ComercialModule = {
  renderComercial,
  setComSubTab,
  openNewLeadModal,
  moverEtapaLead,
  openNewTicketModal,
  resolverTicket
};