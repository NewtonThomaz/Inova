/**
 * Modais da aplicação
 * DevOps/Sprints info e Holerite
 */

/**
 * Abre modal DevOps / Cronograma de Sprints
 */
function openDevopsModal() {
  document.getElementById('devops-modal').classList.remove('hidden');
}

/**
 * Fecha modal DevOps
 */
function closeDevopsModal() {
  document.getElementById('devops-modal').classList.add('hidden');
}

/**
 * Fecha modal Holerite (também acessível via RHModule)
 */
function closeHoleriteModal() {
  document.getElementById('holerite-modal').classList.add('hidden');
}

// Exportar para uso global
window.ModalsModule = {
  openDevopsModal,
  closeDevopsModal,
  closeHoleriteModal
};