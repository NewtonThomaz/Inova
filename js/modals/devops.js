


function openDevopsModal() {
  document.getElementById('devops-modal').classList.remove('hidden');
}


function closeDevopsModal() {
  document.getElementById('devops-modal').classList.add('hidden');
}


function closeHoleriteModal() {
  document.getElementById('holerite-modal').classList.add('hidden');
}


window.ModalsModule = {
  openDevopsModal,
  closeDevopsModal,
  closeHoleriteModal
};