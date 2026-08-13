# Inova - Sistema Integrado de Gestão ERP DevOps

Projeto front-end educacional de um sistema ERP completo desenvolvido em **HTML, CSS e JavaScript vanilla**, utilizando **Tailwind CSS** para estilização. O projeto simula uma plataforma empresarial com módulos Financeiro, Comercial/CRM e Recursos Humanos, incluindo autenticação com RBAC (Role-Based Access Control).

> ⚠️ **Projeto apenas front-end** — Não possui backend, banco de dados ou API real. Todos os dados são mockados em memória (JavaScript) para fins didáticos e de prototipação de interface.

---

## 🎯 Objetivo

Exercitar a criação de páginas HTML modernas, responsivas e bem estruturadas, simulando um sistema ERP empresarial completo com:

- Sistema de login/cadastro com perfis de acesso
- Navegação por módulos com controle de permissão
- Dashboards com KPIs e tabelas interativas
- Kanban de vendas (CRM)
- Calculadoras e simuladores (férias CLT, holerites)
- Modais informativos (DevOps/Sprints, impressão de holerite)
- Design system consistente (modo claro, cores da marca Inova)

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Uso |
|------------|-----|
| **HTML5** | Estrutura semântica e acessível |
| **Tailwind CSS** (via CDN) | Estilização utility-first, responsiva, dark-mode ready |
| **JavaScript Vanilla (ES6+)** | Lógica de UI, state management em memória, renderização dinâmica |
| **Font Awesome 6.4** | Ícones vetoriais |
| **Google Fonts (Inter)** | Tipografia moderna |

---

## 📦 Estrutura do Projeto

```
inova/
├── index.html          # Arquivo único contendo HTML, CSS (Tailwind config) e JS
├── img/
│   └── icon.png        # Logo da marca Inova (fallback para SVG inline se não encontrado)
└── README.md           # Este arquivo
```

> **Nota:** Todo o código está contido em `index.html` para simplicidade didática. Em projetos reais, recomenda-se separar CSS, JS e componentes.

---

## 🎨 Design System (Cores Inova)

```css
--inova-blue:       #004D95     
--inova-blue-hover: #003A70      
--inova-yellow:     #F4B41A      
--inova-yellow-hover:#D99E10     
--inova-yellow-light:#FEF9E7   
```

- **Modo:** Apenas **Light Mode** implementado (preparado para dark mode via `tailwind.config.darkMode: 'class'`)
- **Tipografia:** Inter (300–800)
- **Bordas:** `rounded-xl` / `rounded-2xl` predominantes
- **Sombras:** `shadow-sm` / `shadow-md` / `shadow-xl` em camadas
- **Scrollbar:** Customizada (`.custom-scrollbar`)

---

## 🔐 Autenticação e RBAC

### Perfis Disponíveis

| Perfil | Acesso | Descrição |
|--------|--------|-----------|
| **Administrador** | Total | Todos os módulos (Financeiro, Comercial, RH) |
| **Financeiro** | Financeiro | Boletos, Contratos, Cobrança |
| **Comercial** | Comercial | CRM/Kanban, SAC, Relacionamentos |
| **RH** | RH | Vagas, Demissões, Férias, Folha |

### Fluxo de Login

1. Usuário informa e-mail, senha e seleciona perfil
2. `handleLogin()` cria objeto `currentUser` em memória
3. `initApp()` esconde auth, mostra app principal
4. `switchModule()` redireciona para módulo padrão do perfil
5. Se acessar módulo sem permissão → tela de **Acesso Restrito**

---

## 📱 Módulos e Funcionalidades

### 1. 🏦 Módulo Financeiro
- **KPIs:** Faturado mês, Boletos a receber, Inadimplência, Contratos vigentes
- **Abas:**
  - **Emissão de Boletos:** Tabela com código de barras, ações (copiar, 2ª via)
  - **Gestão de Contratos:** Cards com vigência, valor mensal, status
  - **Cobrança de Inadimplentes:** Tabela com dias em atraso, disparo de cobrança
- **Ações simuladas:** Novo boleto, novo contrato, copiar linha digitável, enviar cobrança

### 2. 📈 Módulo Comercial / CRM
- **Sub-abbas:**
  - **CRM - Funil de Vendas (Kanban):** 4 colunas (Prospecção → Contato → Proposta → Fechado) com drag-and-drop simulado via botão "Avançar"
  - **SAC - Atendimento:** Tabela de tickets com prioridade, status, resolução
  - **Gestão de Relacionamentos:** Cards 360º com potencial de negócio
- **Ações:** Nova oportunidade, novo ticket SAC, mover etapa, resolver ticket

### 3. 👥 Módulo Recursos Humanos
- **Sub-abbas:**
  - **Contratações:** Grid de vagas com contador de candidatos
  - **Demissões:** Tabela com motivo, status verbas rescisórias
  - **Férias:** 
    - **Calculadora CLT interativa** (salário, dias, abono 1/3) → resultado em tempo real
    - Tabela de programação de férias da equipe
  - **Folha de Pagamento:** Tabela com bruto, descontos (INSS/IRRF), líquido + botão **Ver Holerite**
- **Ações:** Nova vaga, registrar demissão, calcular férias, imprimir holerite

### 4. ⚙️ DevOps / Stakeholders (Modal)
- Cronograma de 3 Sprints (MVP incremental)
- Investimento por sprint + total R$ 90.000
- Metodologia Scrum com entregas funcionais

### 5. 🖨️ Holerite (Modal + Print)
- Demonstrativo mensal CLT formatado para impressão
- `@media print` otimizado (oculta tudo exceto `#printable-holerite`)
- Botão "Imprimir / PDF" nativo do navegador

---

## 💾 Estado e Dados (Mock)

Todos os dados residem no objeto `state` (linha ~841 do `index.html`):

```javascript
const state = {
  boletos: [...],       // 4 registros
  contratos: [...],     // 3 registros
  inadimplentes: [...], // 3 registros
  crmLeads: [...],      // 4 leads no funil
  sacTickets: [...],    // 3 tickets
  vagasRH: [...],       // 3 vagas
  demissoes: [...],     // 2 registros
  ferias: [...],        // 2 programações
  folha: [...]          // 3 colaboradores
};
```

- **Persistência:** Apenas em memória (recarrega a página → volta ao estado inicial)
- **Criação:** `prompt()` nativo para simplicidade didática
- **Atualização:** Re-render completo da seção (`renderFinanceiro()`, `renderComercial()`, `renderRH()`)

---

## 🛠️ Como Executar

### Opção 1: Abrir diretamente no navegador
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### Opção 2: Servidor local (recomendado para evitar CORS em assets)
```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .

# PHP
php -S localhost:8000
```
Acesse: `http://localhost:8000`

> **Credenciais de teste** (pré-preenchidas no login):
> - E-mail: `admin@inova.com.br`
> - Senha: `123456`
> - Perfil: `Administrador Geral`

---

## 📚 Padrões de Código Utilizados

### Renderização Dinâmica
```javascript
// Template literals + map + join para gerar HTML
tbody.innerHTML = state.boletos.map(b => `
  <tr>...${b.id}...</tr>
`).join('');
```

### Event Delegation via `onclick` inline
```html
<button onclick="moverEtapaLead('${l.id}')">Avançar</button>
```
> Simples e didático. Em projetos reais: `addEventListener` + delegação.

### Estado Global Simples
```javascript
let currentUser = null;
let activeModule = 'financeiro';
```

### Toast Notifications
```javascript
showToast('Mensagem de sucesso!');
// Animação CSS: translateY + opacity
```

### Acessibilidade Básica
- `lang="pt-BR"` no `<html>`
- Labels associados aos inputs
- Contraste de cores (WCAG AA na maioria)
- Ícones decorativos com `aria-hidden` implícito (Font Awesome)
- Navegação por teclado funcional (botões, links, inputs)

---

## 🎓 Conceitos Exercitados

| Conceito | Onde Aplicado |
|----------|---------------|
| **Single Page Application (SPA) vanilla** | Troca de seções via `classList.toggle('hidden')` |
| **RBAC no front-end** | `switchModule()` valida `currentUser.role === mod` |
| **Componentização via funções** | `renderFinanceiro()`, `renderComercial()`, `renderRH()` |
| **State-driven UI** | Dados em `state` → funções de render → DOM |
| **Formulários controlados** | `value` + `onchange`/`onclick` + `prompt()` |
| **Tabelas responsivas** | `overflow-x-auto` + `table` nativa |
| **Kanban Board CSS Grid** | `grid-cols-4` + `kanban-col` (min-height fixo) |
| **Print CSS** | `@media print` isolando `#printable-holerite` |
| **Design Tokens no Tailwind** | `tailwind.config.theme.extend.colors.inova` |
| **Fallback de imagem** | `onerror` → esconde `<img>` → mostra `<div>` com iniciais |

---

## 🚧 Limitações Conhecidas (Proposital)

- ❌ Sem backend / API / banco de dados
- ❌ Sem persistência (localStorage, IndexedDB, etc.)
- ❌ Sem validação robusta de formulários (apenas `prompt` básico)
- ❌ Sem testes automatizados
- ❌ Sem build/bundler (Vite, Webpack, etc.)
- ❌ Sem TypeScript
- ❌ Drag-and-drop real no Kanban (apenas botão "Avançar")
- ❌ Acessibilidade completa (ARIA labels, focus management em modais)
- ❌ Responsividade testada apenas em breakpoints Tailwind padrão

---

## 📈 Possíveis Evoluções (Para Estudo)

1. **Separar arquivos:** `index.html`, `styles.css`, `app.js`, `state.js`
2. **Adicionar localStorage:** Persistir `state` e `currentUser`
3. **Migrar para Alpine.js ou Vue 3 (CDN):** Reatividade declarativa
4. **Implementar Drag-and-Drop nativo:** HTML5 Drag API no Kanban
5. **Adicionar Chart.js:** Gráficos nos KPIs financeiros/comerciais
6. **Dark Mode real:** Toggle + `localStorage` + `darkMode: 'class'`
7. **Validação de formulários:** Yup/Zod ou nativa `checkValidity()`
8. **Testes:** Vitest + Happy DOM ou Playwright E2E
9. **Storybook:** Documentar componentes visuais isolados
10. **PWA:** Manifest + Service Worker para offline

---

## 📄 Licença

Projeto educacional de domínio livre. Use, modifique e estude à vontade.

---

## 🤝 Contribuição

Este é um projeto de exercício individual. Sinta-se à vontade para:

1. Fazer fork
2. Criar branch (`git checkout -b feature/nova-funcionalidade`)
3. Commitar (`git commit -m 'feat: adiciona X'`)
4. Push (`git push origin feature/nova-funcionalidade`)
5. Abrir Pull Request

---

**Desenvolvido para fins didáticos — Prática de HTML/CSS/JS moderno com Tailwind CSS** 🚀