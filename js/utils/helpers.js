/**
 * Funções utilitárias compartilhadas
 * Formatters, toast notifications, helpers de DOM
 */

/**
 * Formata valor monetário para BRL
 * @param {number} value - Valor numérico
 * @returns {string} Valor formatado (ex: R$ 1.234,56)
 */
function formatBRL(value) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Formata data para padrão brasileiro
 * @param {string} dateStr - Data no formato YYYY-MM-DD
 * @returns {string} Data formatada (ex: 15/08/2026)
 */
function formatDateBR(dateStr) {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

/**
 * Obtém classe CSS para status de boleto
 * @param {string} status - Status do boleto
 * @returns {string} Classes Tailwind
 */
function getBoletoStatusClass(status) {
  switch (status) {
    case 'Pago':
      return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
    case 'Vencido':
      return 'bg-rose-100 text-rose-700 border border-rose-200';
    default:
      return 'bg-amber-100 text-amber-800 border border-amber-200';
  }
}

/**
 * Obtém classe CSS para prioridade SAC
 * @param {string} prioridade - Prioridade do ticket
 * @returns {string} Classes Tailwind
 */
function getPrioridadeClass(prioridade) {
  switch (prioridade) {
    case 'Alta':
      return 'bg-rose-100 text-rose-700 border border-rose-200';
    case 'Média':
      return 'bg-amber-100 text-amber-700 border border-amber-200';
    default:
      return 'bg-slate-100 text-slate-700 border border-slate-200';
  }
}

/**
 * Obtém classe CSS para status SAC
 * @param {string} status - Status do ticket
 * @returns {string} Classes Tailwind
 */
function getSacStatusClass(status) {
  switch (status) {
    case 'Aberto':
      return 'bg-inova-blue-light text-inova-blue border border-inova-blue/20';
    case 'Em Atendimento':
      return 'bg-amber-100 text-amber-700 border border-amber-200';
    default:
      return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
  }
}

/**
 * Obtém cor da etapa do Kanban
 * @param {string} etapa - Etapa do funil
 * @returns {string} Classe de cor do indicador
 */
function getKanbanStageColor(etapa) {
  switch (etapa) {
    case 'prospeccao': return 'bg-sky-500';
    case 'contato': return 'bg-amber-500';
    case 'proposta': return 'bg-purple-500';
    case 'fechado': return 'bg-emerald-500';
    default: return 'bg-slate-500';
  }
}

/**
 * Obtém label da etapa do Kanban
 * @param {string} etapa - Etapa do funil
 * @returns {string} Label legível
 */
function getKanbanStageLabel(etapa) {
  switch (etapa) {
    case 'prospeccao': return 'Prospecção';
    case 'contato': return 'Contato Feito';
    case 'proposta': return 'Proposta Enviada';
    case 'fechado': return 'Fechado / Ganho';
    default: return etapa;
  }
}

/**
 * Gera ID único simples
 * @param {string} prefix - Prefixo opcional
 * @returns {string} ID único
 */
function generateId(prefix = '') {
  return `${prefix}${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

/**
 * Copia texto para a área de transferência
 * @param {string} text - Texto a copiar
 * @returns {Promise<void>}
 */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback para navegadores antigos
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    return true;
  }
}

/**
 * Exibe notificação toast
 * @param {string} message - Mensagem a exibir
 * @param {string} type - Tipo: 'success' | 'error' | 'info'
 */
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastIcon = document.getElementById('toast-icon');
  const toastMessage = document.getElementById('toast-message');

  if (!toast || !toastMessage) return;

  // Configurar ícone e cor baseado no tipo
  const configs = {
    success: { bg: 'bg-emerald-600', border: 'border-emerald-500', icon: 'fa-check-circle' },
    error: { bg: 'bg-rose-600', border: 'border-rose-500', icon: 'fa-times-circle' },
    info: { bg: 'bg-inova-blue', border: 'border-inova-blue', icon: 'fa-info-circle' }
  };

  const config = configs[type] || configs.success;

  // Reset classes
  toast.className = `fixed top-5 right-5 z-50 transform -translate-y-10 opacity-0 pointer-events-none transition-all duration-300 ease-in-out px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 ${config.bg} text-white ${config.border}`;
  toastIcon.className = `fas ${config.icon} text-xl`;
  toastMessage.textContent = message;

  // Mostrar
  requestAnimationFrame(() => {
    toast.classList.remove('-translate-y-10', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  // Esconder após 3.5s
  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('-translate-y-10', 'opacity-0', 'pointer-events-none');
  }, 3500);
}

/**
 * Debounce para limitar frequência de execução
 * @param {Function} fn - Função a executar
 * @param {number} delay - Delay em ms
 * @returns {Function} Função com debounce
 */
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Escape HTML para prevenir XSS
 * @param {string} html - String com HTML
 * @returns {string} String escapada
 */
function escapeHtml(html) {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * Capitaliza primeira letra de cada palavra
 * @param {string} str - String a capitalizar
 * @returns {string} String capitalizada
 */
function capitalizeWords(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}

// Exportar para uso global
window.AppHelpers = {
  formatBRL,
  formatDateBR,
  getBoletoStatusClass,
  getPrioridadeClass,
  getSacStatusClass,
  getKanbanStageColor,
  getKanbanStageLabel,
  generateId,
  copyToClipboard,
  showToast,
  debounce,
  escapeHtml,
  capitalizeWords
};