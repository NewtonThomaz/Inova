


function formatBRL(value) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}


function formatDateBR(dateStr) {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}


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


function getKanbanStageColor(etapa) {
  switch (etapa) {
    case 'prospeccao': return 'bg-sky-500';
    case 'contato': return 'bg-amber-500';
    case 'proposta': return 'bg-purple-500';
    case 'fechado': return 'bg-emerald-500';
    default: return 'bg-slate-500';
  }
}


function getKanbanStageLabel(etapa) {
  switch (etapa) {
    case 'prospeccao': return 'Prospecção';
    case 'contato': return 'Contato Feito';
    case 'proposta': return 'Proposta Enviada';
    case 'fechado': return 'Fechado / Ganho';
    default: return etapa;
  }
}


function generateId(prefix = '') {
  return `${prefix}${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}


async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    return true;
  }
}


function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastIcon = document.getElementById('toast-icon');
  const toastMessage = document.getElementById('toast-message');

  if (!toast || !toastMessage) return;

  
  const configs = {
    success: { bg: 'bg-emerald-600', border: 'border-emerald-500', icon: 'fa-check-circle' },
    error: { bg: 'bg-rose-600', border: 'border-rose-500', icon: 'fa-times-circle' },
    info: { bg: 'bg-inova-blue', border: 'border-inova-blue', icon: 'fa-info-circle' }
  };

  const config = configs[type] || configs.success;

  
  toast.className = `fixed top-5 right-5 z-50 transform -translate-y-10 opacity-0 pointer-events-none transition-all duration-300 ease-in-out px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 ${config.bg} text-white ${config.border}`;
  toastIcon.className = `fas ${config.icon} text-xl`;
  toastMessage.textContent = message;

  
  requestAnimationFrame(() => {
    toast.classList.remove('-translate-y-10', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  
  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('-translate-y-10', 'opacity-0', 'pointer-events-none');
  }, 3500);
}


function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}


function escapeHtml(html) {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}


function capitalizeWords(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}

// Fechamento de modais com ESC e clique no backdrop
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.app-modal, #holerite-modal').forEach(modal => {
      modal.classList.add('hidden');
    });
  }
});

document.addEventListener('click', (e) => {
  if (e.target && e.target.classList && (e.target.classList.contains('app-modal') || e.target.id === 'holerite-modal')) {
    e.target.classList.add('hidden');
  }
});

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