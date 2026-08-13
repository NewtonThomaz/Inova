


function toggleAuth(view) {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (view === 'register') {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
  } else {
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  }
}


function handleLogin() {
  const email = document.getElementById('login-email').value || 'usuario@inova.com.br';
  const role = document.getElementById('login-role').value;

  window.AppState.currentUser = {
    name: email.split('@')[0].toUpperCase(),
    email: email,
    role: role
  };

  initApp();
  window.AppHelpers.showToast(`Bem-vindo à Inova, ${window.AppState.currentUser.name}! Conectado como ${role.toUpperCase()}`);
}


function handleRegister() {
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const role = document.getElementById('reg-role').value;

  if (!name || !email) {
    window.AppHelpers.showToast('Preencha nome e e-mail!', 'error');
    return;
  }

  window.AppState.currentUser = { name, email, role };
  initApp();
  window.AppHelpers.showToast('Conta Inova criada com sucesso!');
}


function handleLogout() {
  window.AppState.currentUser = null;
  document.getElementById('main-app').classList.add('hidden');
  document.getElementById('auth-container').classList.remove('hidden');
  window.AppHelpers.showToast('Sessão encerrada.');
}


function initApp() {
  document.getElementById('auth-container').classList.add('hidden');
  document.getElementById('main-app').classList.remove('hidden');

  
  document.getElementById('user-display-name').textContent = window.AppState.currentUser.name;
  document.getElementById('user-display-email').textContent = window.AppState.currentUser.email;
  document.getElementById('user-avatar').textContent = window.AppState.currentUser.name.substring(0, 2).toUpperCase();
  document.getElementById('active-user-badge').textContent = window.AppState.currentUser.role.toUpperCase();

  
  const now = new Date();
  document.getElementById('current-date').textContent = now.toLocaleDateString('pt-BR');

  
  const role = window.AppState.currentUser.role;
  if (role === 'financeiro') switchModule('financeiro');
  else if (role === 'comercial') switchModule('comercial');
  else if (role === 'rh') switchModule('rh');
  else switchModule('financeiro');
}


function switchModule(mod) {
  window.AppState.activeModule = mod;

  
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('bg-inova-blue-light', 'text-inova-blue');
    btn.classList.add('text-slate-600');
  });

  const activeNavBtn = document.getElementById(`nav-${mod}`);
  if (activeNavBtn) {
    activeNavBtn.classList.remove('text-slate-600');
    activeNavBtn.classList.add('bg-inova-blue-light', 'text-inova-blue');
  }

  
  document.querySelectorAll('.module-section').forEach(sec => sec.classList.add('hidden'));

  const titleEl = document.getElementById('page-title');
  const subTitleEl = document.getElementById('page-subtitle');

  
  const isAllowed = window.AppState.currentUser.role === 'admin' || window.AppState.currentUser.role === mod;

  if (mod === 'financeiro') {
    titleEl.innerHTML = `<i class="fas fa-wallet text-emerald-600"></i> Módulo Financeiro Inova`;
    subTitleEl.textContent = `Gestão de boletos bancários, contratos vigentes e cobrança de inadimplentes`;
    document.getElementById('module-financeiro').classList.remove('hidden');

    if (!isAllowed) {
      document.getElementById('fin-content').classList.add('hidden');
      document.getElementById('fin-denied').classList.remove('hidden');
    } else {
      document.getElementById('fin-content').classList.remove('hidden');
      document.getElementById('fin-denied').classList.add('hidden');
      renderFinanceiro();
    }
  } else if (mod === 'comercial') {
    titleEl.innerHTML = `<i class="fas fa-chart-line text-inova-blue"></i> Módulo Comercial & CRM Inova`;
    subTitleEl.textContent = `Central de atendimento SAC, Funil de vendas CRM e Gestão de Relacionamentos`;
    document.getElementById('module-comercial').classList.remove('hidden');

    if (!isAllowed) {
      document.getElementById('com-content').classList.add('hidden');
      document.getElementById('com-denied').classList.remove('hidden');
    } else {
      document.getElementById('com-content').classList.remove('hidden');
      document.getElementById('com-denied').classList.add('hidden');
      renderComercial();
    }
  } else if (mod === 'rh') {
    titleEl.innerHTML = `<i class="fas fa-users-gear text-purple-600"></i> Módulo de Recursos Humanos Inova`;
    subTitleEl.textContent = `Gestão de contratações, demissões, calculadora de férias e folha salarial`;
    document.getElementById('module-rh').classList.remove('hidden');

    if (!isAllowed) {
      document.getElementById('rh-content').classList.add('hidden');
      document.getElementById('rh-denied').classList.remove('hidden');
    } else {
      document.getElementById('rh-content').classList.remove('hidden');
      document.getElementById('rh-denied').classList.add('hidden');
      renderRH();
    }
  }
}


window.AuthModule = {
  toggleAuth,
  handleLogin,
  handleRegister,
  handleLogout,
  initApp,
  switchModule
};