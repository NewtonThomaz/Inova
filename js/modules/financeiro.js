


function renderFinanceiro() {
  renderBoletosTable();
  renderContratosGrid();
  renderInadimplentesTable();
}


function renderBoletosTable() {
  const tbody = document.getElementById('tbl-boletos-body');
  if (!tbody) return;

  tbody.innerHTML = window.AppState.state.boletos.map(b => `
    <tr class="hover:bg-slate-50 transition border-b border-slate-100">
      <td class="p-3.5 font-mono text-xs font-bold text-inova-blue">${b.id}</td>
      <td class="p-3.5 font-semibold text-slate-800">${window.AppHelpers.escapeHtml(b.cliente)}</td>
      <td class="p-3.5 text-slate-500 text-xs">${window.AppHelpers.formatDateBR(b.vencimento)}</td>
      <td class="p-3.5 font-bold text-slate-900">R$ ${window.AppHelpers.formatBRL(b.valor)}</td>
      <td class="p-3.5">
        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${window.AppHelpers.getBoletoStatusClass(b.status)}">${b.status}</span>
      </td>
      <td class="p-3.5 text-right space-x-1">
        <button onclick="copiarCodigoBarra('${b.codigoBarra}')" title="Copiar Linha Digitável" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"><i class="fas fa-barcode"></i> Código</button>
        <button onclick="simularSegundaVia('${b.id}')" title="Enviar 2ª Via" class="px-2.5 py-1 bg-inova-blue hover:bg-inova-blue-hover text-white rounded-lg text-xs font-semibold"><i class="fas fa-paper-plane"></i> 2ª Via</button>
      </td>
    </tr>
  `).join('');
}


function renderContratosGrid() {
  const grid = document.getElementById('contratos-grid');
  if (!grid) return;

  grid.innerHTML = window.AppState.state.contratos.map(c => `
    <div class="bg-white border border-slate-200 p-4 rounded-xl space-y-3 hover:border-purple-300 transition shadow-sm">
      <div class="flex justify-between items-start">
        <div>
          <h4 class="font-bold text-slate-800 text-sm">${window.AppHelpers.escapeHtml(c.cliente)}</h4>
          <p class="text-[11px] text-slate-400 font-mono">${c.id}</p>
        </div>
        <span class="text-[10px] px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-bold uppercase">${c.status}</span>
      </div>
      <div class="text-xs text-slate-500 space-y-1">
        <p><i class="far fa-calendar mr-1"></i> Início: ${window.AppHelpers.formatDateBR(c.inicio)}</p>
        <p><i class="fas fa-clock mr-1"></i> Vigência: ${c.vigencia}</p>
      </div>
      <div class="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
        <span class="text-slate-500">Recorrência Mensal:</span>
        <span class="font-black text-emerald-600 text-sm">R$ ${window.AppHelpers.formatBRL(c.valorMensal)}</span>
      </div>
    </div>
  `).join('');
}


function renderInadimplentesTable() {
  const tbody = document.getElementById('tbl-inadimplentes-body');
  if (!tbody) return;

  tbody.innerHTML = window.AppState.state.inadimplentes.map(i => `
    <tr class="hover:bg-slate-50 transition border-b border-slate-100">
      <td class="p-3.5 font-semibold text-slate-800">${window.AppHelpers.escapeHtml(i.cliente)}</td>
      <td class="p-3.5"><span class="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-700 font-bold text-xs">${i.diasAtraso} dias em atraso</span></td>
      <td class="p-3.5 font-bold text-rose-600">R$ ${window.AppHelpers.formatBRL(i.valor)}</td>
      <td class="p-3.5 text-slate-500 text-xs">${window.AppHelpers.formatDateBR(i.ultimoContato)}</td>
      <td class="p-3.5 text-right">
        <button onclick="enviarCobranca('${window.AppHelpers.escapeHtml(i.cliente)}')" class="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs rounded-lg font-bold transition flex items-center gap-1.5 ml-auto shadow-sm">
          <i class="fas fa-bullhorn"></i> Disparar Cobrança
        </button>
      </td>
    </tr>
  `).join('');
}


function setFinSubTab(sub) {
  ['boletos', 'contratos', 'inadimplentes'].forEach(s => {
    document.getElementById(`sub-fin-${s}`).classList.add('hidden');
    const tab = document.getElementById(`tab-fin-${s}`);
    tab.classList.replace('text-inova-blue', 'text-slate-500');
    tab.classList.replace('border-inova-blue', 'border-transparent');
  });

  document.getElementById(`sub-fin-${sub}`).classList.remove('hidden');
  const activeTab = document.getElementById(`tab-fin-${sub}`);
  activeTab.classList.replace('text-slate-500', 'text-inova-blue');
  activeTab.classList.replace('border-transparent', 'border-inova-blue');
}


function openNewBoletoModal() {
  const modal = document.getElementById('modal-novo-boleto');
  if (!modal) return;
  const form = document.getElementById('form-novo-boleto');
  if (form) form.reset();

  const vencInput = document.getElementById('boleto-vencimento');
  if (vencInput) {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 15);
    vencInput.value = futureDate.toISOString().split('T')[0];
  }
  modal.classList.remove('hidden');
}

function closeNewBoletoModal() {
  const modal = document.getElementById('modal-novo-boleto');
  if (modal) modal.classList.add('hidden');
}

function submitNewBoleto(event) {
  if (event) event.preventDefault();
  const cliente = document.getElementById('boleto-cliente').value.trim();
  const valor = parseFloat(document.getElementById('boleto-valor').value);
  const vencimento = document.getElementById('boleto-vencimento').value;
  const status = document.getElementById('boleto-status').value || 'Pendente';

  if (!cliente || isNaN(valor) || valor <= 0 || !vencimento) {
    window.AppHelpers.showToast('Preencha todos os campos do boleto corretamente.', 'error');
    return;
  }

  window.AppState.state.boletos.unshift({
    id: `BOL-${Math.floor(1000 + Math.random() * 9000)}`,
    cliente,
    vencimento,
    valor,
    status,
    codigoBarra: '34191.00000 80000.123456 7 ' + Math.floor(Math.random() * 100000000)
  });

  closeNewBoletoModal();
  renderFinanceiro();
  window.AppHelpers.showToast(`Novo boleto gerado para ${cliente}!`);
}

function openNewContratoModal() {
  const modal = document.getElementById('modal-novo-contrato');
  if (!modal) return;
  const form = document.getElementById('form-novo-contrato');
  if (form) form.reset();

  const inicioInput = document.getElementById('contrato-inicio');
  if (inicioInput) {
    inicioInput.value = new Date().toISOString().split('T')[0];
  }
  modal.classList.remove('hidden');
}

function closeNewContratoModal() {
  const modal = document.getElementById('modal-novo-contrato');
  if (modal) modal.classList.add('hidden');
}

function submitNewContrato(event) {
  if (event) event.preventDefault();
  const cliente = document.getElementById('contrato-cliente').value.trim();
  const valorMensal = parseFloat(document.getElementById('contrato-valor').value);
  const inicio = document.getElementById('contrato-inicio').value || new Date().toISOString().split('T')[0];
  const vigencia = document.getElementById('contrato-vigencia').value || '12 Meses';
  const status = document.getElementById('contrato-status').value || 'Ativo';

  if (!cliente || isNaN(valorMensal) || valorMensal <= 0) {
    window.AppHelpers.showToast('Preencha todos os dados do contrato.', 'error');
    return;
  }

  window.AppState.state.contratos.unshift({
    id: `CTR-00${window.AppState.state.contratos.length + 1}`,
    cliente,
    valorMensal,
    inicio,
    status,
    vigencia
  });

  closeNewContratoModal();
  renderFinanceiro();
  window.AppHelpers.showToast(`Novo contrato cadastrado para ${cliente}!`);
}

async function copiarCodigoBarra(codigo) {
  await window.AppHelpers.copyToClipboard(codigo);
  window.AppHelpers.showToast('Código de barras copiado para a área de transferência!');
}

function simularSegundaVia(id) {
  window.AppHelpers.showToast(`Segunda via do boleto ${id} enviada via e-mail Inova!`);
}

function enviarCobranca(cliente) {
  window.AppHelpers.showToast(`Notificação formal de cobrança disparada para ${cliente}`);
}

window.FinanceiroModule = {
  renderFinanceiro,
  setFinSubTab,
  openNewBoletoModal,
  closeNewBoletoModal,
  submitNewBoleto,
  openNewContratoModal,
  closeNewContratoModal,
  submitNewContrato,
  copiarCodigoBarra,
  simularSegundaVia,
  enviarCobranca
};