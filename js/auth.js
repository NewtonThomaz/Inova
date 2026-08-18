


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
  const authContainer = document.getElementById('auth-container');
  if (authContainer) authContainer.classList.add('hidden');

  const mainApp = document.getElementById('main-app');
  if (mainApp) mainApp.classList.remove('hidden');

  // Atualizar dados do usuário no menu lateral
  if (window.AppState.currentUser) {
    const userDisplayName = document.getElementById('user-display-name');
    if (userDisplayName) userDisplayName.textContent = window.AppState.currentUser.name;

    const userDisplayEmail = document.getElementById('user-display-email');
    if (userDisplayEmail) userDisplayEmail.textContent = window.AppState.currentUser.email;

    const userAvatar = document.getElementById('user-avatar');
    if (userAvatar) userAvatar.textContent = window.AppState.currentUser.name.substring(0, 2).toUpperCase();

    const activeUserBadge = document.getElementById('active-user-badge');
    if (activeUserBadge) activeUserBadge.textContent = window.AppState.currentUser.role.toUpperCase();
  }

  // Data atual no topo (com verificação segura)
  const now = new Date();
  const currentDateEl = document.getElementById('current-date');
  if (currentDateEl) {
    currentDateEl.textContent = now.toLocaleDateString('pt-BR');
  }

  // Ativação do módulo inicial baseado no perfil
  const role = window.AppState.currentUser ? window.AppState.currentUser.role : 'admin';
  if (role === 'financeiro') switchModule('financeiro');
  else if (role === 'comercial') switchModule('comercial');
  else if (role === 'rh') switchModule('rh');
  else switchModule('financeiro');
}


function switchModule(mod) {
  window.AppState.activeModule = mod;

  // Atualizar botões de navegação
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('bg-inova-blue-light', 'text-inova-blue');
    btn.classList.add('text-slate-600');
  });

  const activeNavBtn = document.getElementById(`nav-${mod}`);
  if (activeNavBtn) {
    activeNavBtn.classList.remove('text-slate-600');
    activeNavBtn.classList.add('bg-inova-blue-light', 'text-inova-blue');
  }

  // Ocultar todas as seções
  document.querySelectorAll('.module-section').forEach(sec => sec.classList.add('hidden'));

  const titleEl = document.getElementById('page-title');
  const subTitleEl = document.getElementById('page-subtitle');

  // Validação de Permissão RBAC
  const currentRole = window.AppState.currentUser ? window.AppState.currentUser.role : 'admin';
  const isAllowed = currentRole === 'admin' || currentRole === mod;

  if (mod === 'financeiro') {
    if (titleEl) titleEl.innerHTML = `<i class="fas fa-wallet text-emerald-600"></i> Módulo Financeiro Inova`;
    if (subTitleEl) subTitleEl.textContent = `Gestão de boletos bancários, contratos vigentes e cobrança de inadimplentes`;
    const modEl = document.getElementById('module-financeiro');
    if (modEl) modEl.classList.remove('hidden');

    const finContent = document.getElementById('fin-content');
    const finDenied = document.getElementById('fin-denied');

    if (!isAllowed) {
      if (finContent) finContent.classList.add('hidden');
      if (finDenied) finDenied.classList.remove('hidden');
    } else {
      if (finContent) finContent.classList.remove('hidden');
      if (finDenied) finDenied.classList.add('hidden');
      if (window.FinanceiroModule && typeof window.FinanceiroModule.renderFinanceiro === 'function') {
        window.FinanceiroModule.renderFinanceiro();
      } else if (typeof renderFinanceiro === 'function') {
        renderFinanceiro();
      }
    }
  } else if (mod === 'comercial') {
    if (titleEl) titleEl.innerHTML = `<i class="fas fa-chart-line text-inova-blue"></i> Módulo Comercial & CRM Inova`;
    if (subTitleEl) subTitleEl.textContent = `Central de atendimento SAC, Funil de vendas CRM e Gestão de Relacionamentos`;
    const modEl = document.getElementById('module-comercial');
    if (modEl) modEl.classList.remove('hidden');

    const comContent = document.getElementById('com-content');
    const comDenied = document.getElementById('com-denied');

    if (!isAllowed) {
      if (comContent) comContent.classList.add('hidden');
      if (comDenied) comDenied.classList.remove('hidden');
    } else {
      if (comContent) comContent.classList.remove('hidden');
      if (comDenied) comDenied.classList.add('hidden');
      if (window.ComercialModule && typeof window.ComercialModule.renderComercial === 'function') {
        window.ComercialModule.renderComercial();
      } else if (typeof renderComercial === 'function') {
        renderComercial();
      }
    }
  } else if (mod === 'rh') {
    if (titleEl) titleEl.innerHTML = `<i class="fas fa-users-gear text-purple-600"></i> Módulo de Recursos Humanos Inova`;
    if (subTitleEl) subTitleEl.textContent = `Gestão de contratações, demissões, calculadora de férias e folha salarial`;
    const modEl = document.getElementById('module-rh');
    if (modEl) modEl.classList.remove('hidden');

    const rhContent = document.getElementById('rh-content');
    const rhDenied = document.getElementById('rh-denied');

    if (!isAllowed) {
      if (rhContent) rhContent.classList.add('hidden');
      if (rhDenied) rhDenied.classList.remove('hidden');
    } else {
      if (rhContent) rhContent.classList.remove('hidden');
      if (rhDenied) rhDenied.classList.add('hidden');
      if (window.RHModule && typeof window.RHModule.renderRH === 'function') {
        window.RHModule.renderRH();
      } else if (typeof renderRH === 'function') {
        renderRH();
      }
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