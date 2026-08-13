/**
 * Módulo Recursos Humanos
 * Vagas, Demissões, Férias (com calculadora), Folha de Pagamento
 */

/**
 * Renderiza todo o módulo RH
 */
function renderRH() {
  renderVagasGrid();
  renderDemissoesTable();
  renderFeriasTable();
  renderFolhaTable();
}

/**
 * Renderiza grid de vagas
 */
function renderVagasGrid() {
  const grid = document.getElementById('rh-vagas-grid');
  if (!grid) return;

  grid.innerHTML = window.AppState.state.vagasRH.map(v => `
    <div class="bg-white border border-slate-200 p-4 rounded-xl space-y-3 hover:border-purple-300 transition shadow-sm">
      <div class="flex justify-between items-start">
        <h4 class="font-bold text-slate-800 text-sm">${window.AppHelpers.escapeHtml(v.titulo)}</h4>
        <span class="text-[10px] px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-bold">${v.status}</span>
      </div>
      <p class="text-xs text-slate-500">Departamento: ${window.AppHelpers.escapeHtml(v.departamento)}</p>
      <div class="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
        <span class="text-slate-500">Candidatos Inscritos:</span>
        <span class="font-bold text-purple-700 font-mono">${v.candidatos}</span>
      </div>
    </div>
  `).join('');
}

/**
 * Renderiza tabela de demissões
 */
function renderDemissoesTable() {
  const tbody = document.getElementById('tbl-demissoes-body');
  if (!tbody) return;

  tbody.innerHTML = window.AppState.state.demissoes.map(d => `
    <tr class="hover:bg-slate-50 transition border-b border-slate-100">
      <td class="p-3.5 font-semibold text-slate-800">${window.AppHelpers.escapeHtml(d.colaborador)}</td>
      <td class="p-3.5 text-slate-500 text-xs">${window.AppHelpers.escapeHtml(d.cargo)}</td>
      <td class="p-3.5 text-slate-600 text-xs">${window.AppHelpers.formatDateBR(d.data)}</td>
      <td class="p-3.5 text-slate-500 text-xs">${window.AppHelpers.escapeHtml(d.motivo)}</td>
      <td class="p-3.5 text-right">
        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${d.statusVerbas === 'Pago' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">${d.statusVerbas}</span>
      </td>
    </tr>
  `).join('');
}

/**
 * Renderiza tabela de férias
 */
function renderFeriasTable() {
  const tbody = document.getElementById('tbl-ferias-body');
  if (!tbody) return;

  tbody.innerHTML = window.AppState.state.ferias.map(f => `
    <tr class="hover:bg-slate-50 transition border-b border-slate-100">
      <td class="p-3.5 font-semibold text-slate-800">${window.AppHelpers.escapeHtml(f.funcionario)}</td>
      <td class="p-3.5 text-slate-500 text-xs">${window.AppHelpers.escapeHtml(f.periodo)}</td>
      <td class="p-3.5 text-slate-600 text-xs">${window.AppHelpers.formatDateBR(f.inicio)}</td>
      <td class="p-3.5 font-bold text-purple-700 text-xs">${f.dias} dias</td>
      <td class="p-3.5 text-right">
        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">${f.status}</span>
      </td>
    </tr>
  `).join('');
}

/**
 * Renderiza tabela de folha de pagamento
 */
function renderFolhaTable() {
  const tbody = document.getElementById('tbl-folha-body');
  if (!tbody) return;

  tbody.innerHTML = window.AppState.state.folha.map(fl => `
    <tr class="hover:bg-slate-50 transition border-b border-slate-100">
      <td class="p-3.5 font-semibold text-slate-800">${window.AppHelpers.escapeHtml(fl.colaborador)}</td>
      <td class="p-3.5 text-slate-500 text-xs">${window.AppHelpers.escapeHtml(fl.cargo)}</td>
      <td class="p-3.5 font-semibold text-slate-700">R$ ${window.AppHelpers.formatBRL(fl.bruto)}</td>
      <td class="p-3.5 text-rose-600 font-semibold">- R$ ${window.AppHelpers.formatBRL(fl.descontos)}</td>
      <td class="p-3.5 font-black text-emerald-600">R$ ${window.AppHelpers.formatBRL(fl.liquido)}</td>
      <td class="p-3.5 text-right">
        <button onclick="verHolerite('${window.AppHelpers.escapeHtml(fl.colaborador)}', '${window.AppHelpers.escapeHtml(fl.cargo)}', ${fl.bruto}, ${fl.descontos}, ${fl.liquido})" class="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1 ml-auto border border-slate-200">
          <i class="fas fa-file-invoice text-purple-600"></i> Ver Holerite
        </button>
      </td>
    </tr>
  `).join('');
}

/**
 * Alterna sub-aba do RH
 * @param {string} sub - 'contratacoes' | 'demissoes' | 'ferias' | 'folha'
 */
function setRhSubTab(sub) {
  ['contratacoes', 'demissoes', 'ferias', 'folha'].forEach(s => {
    document.getElementById(`sub-rh-${s}`).classList.add('hidden');
  });
  document.getElementById(`sub-rh-${sub}`).classList.remove('hidden');

  // Atualizar botões
  const buttons = {
    contratacoes: 'btn-rh-contratacoes',
    demissoes: 'btn-rh-demissoes',
    ferias: 'btn-rh-ferias',
    folha: 'btn-rh-folha'
  };

  Object.entries(buttons).forEach(([key, id]) => {
    const btn = document.getElementById(id);
    if (key === sub) {
      btn.className = 'px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-2';
    } else {
      btn.className = 'px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-900 flex items-center gap-2';
    }
  });
}

/**
 * Calculadora de férias CLT
 */
function calcularFeriasSimulacao() {
  const salario = parseFloat(document.getElementById('calc-salario').value) || 0;
  const dias = parseInt(document.getElementById('calc-dias').value);
  const abono = document.getElementById('calc-abono').value;

  let baseProporcional = (salario / 30) * dias;
  let tercoConstitucional = baseProporcional / 3;

  if (abono === 'sim') {
    tercoConstitucional += (salario / 30 * 10) / 3;
  }

  const total = baseProporcional + tercoConstitucional;

  document.getElementById('res-ferias-base').textContent = `R$ ${window.AppHelpers.formatBRL(baseProporcional)}`;
  document.getElementById('res-ferias-terco').textContent = `R$ ${window.AppHelpers.formatBRL(tercoConstitucional)}`;
  document.getElementById('res-ferias-total').textContent = `R$ ${window.AppHelpers.formatBRL(total)}`;

  window.AppHelpers.showToast('Cálculo de Férias CLT Inova recalculado!');
}

/**
 * Abre modal de holerite
 * @param {string} nome - Nome do colaborador
 * @param {string} cargo - Cargo
 * @param {number} bruto - Salário bruto
 * @param {number} descontos - Descontos
 * @param {number} liquido - Salário líquido
 */
function verHolerite(nome, cargo, bruto, descontos, liquido) {
  document.getElementById('holerite-nome').textContent = nome;
  document.getElementById('holerite-cargo').textContent = cargo;
  document.getElementById('holerite-bruto').textContent = window.AppHelpers.formatBRL(bruto);
  document.getElementById('holerite-descontos').textContent = window.AppHelpers.formatBRL(descontos);
  document.getElementById('holerite-liquido').textContent = 'R$ ' + window.AppHelpers.formatBRL(liquido);

  document.getElementById('holerite-modal').classList.remove('hidden');
}

/**
 * Fecha modal de holerite
 */
function closeHoleriteModal() {
  document.getElementById('holerite-modal').classList.add('hidden');
}

/**
 * Abre modal para nova vaga
 */
function openNewVagaModal() {
  const titulo = prompt('Título do Cargo / Vaga de Emprego:');
  const depto = prompt('Departamento (ex: Tecnologia, RH, Comercial):', 'Tecnologia');

  if (titulo) {
    window.AppState.state.vagasRH.unshift({
      id: `VG-0${window.AppState.state.vagasRH.length + 1}`,
      titulo,
      departamento: depto || 'Geral',
      candidatos: 0,
      status: 'Aberto'
    });
    renderRH();
    window.AppHelpers.showToast('Nova vaga de contratação publicada na Inova!');
  }
}

/**
 * Abre modal para nova demissão
 */
function openNewDemissaoModal() {
  const colaborador = prompt('Nome do colaborador para desligamento:');
  const motivo = prompt('Motivo do desligamento:', 'Acordo Trabalhista');

  if (colaborador) {
    window.AppState.state.demissoes.unshift({
      colaborador,
      cargo: 'Analista Corporativo',
      data: new Date().toISOString().split('T')[0],
      motivo: motivo || 'Acordo',
      statusVerbas: 'Em Processamento'
    });
    renderRH();
    window.AppHelpers.showToast('Processo de demissão e rescisão registrado!');
  }
}

// Exportar para uso global
window.RHModule = {
  renderRH,
  setRhSubTab,
  calcularFeriasSimulacao,
  verHolerite,
  closeHoleriteModal,
  openNewVagaModal,
  openNewDemissaoModal
};