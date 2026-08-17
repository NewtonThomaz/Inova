# Inova - Sistema Integrado de Gestão ERP DevOps

Projeto front-end modular de um sistema ERP completo desenvolvido em **HTML5, CSS3 e JavaScript Vanilla (ES6+)**, utilizando **Tailwind CSS** para estilização. O projeto simula uma plataforma corporativa com módulos Financeiro, Comercial/CRM e Recursos Humanos, incluindo autenticação com RBAC (*Role-Based Access Control*), modais interativos, impressão de documentos oficiais e movimentação bidirecional de dados.

> ⚠️ **Projeto Front-End Educacional** — Não possui backend, banco de dados ou API real. Todos os dados são gerenciados em memória no estado global (`AppState`) para fins didáticos e prototipação de alta fidelidade.

---

## 🎯 Objetivo

Exercitar a criação de páginas web modernas, responsivas e bem estruturadas, simulando um sistema ERP empresarial robusto com:

- Arquitetura front-end modular dividida por responsabilidades (`modules`, `modals`, `utils`)
- Sistema de login e controle de acesso baseado em papéis (RBAC)
- Dashboards com KPIs e tabelas dinâmicas
- Kanban de Vendas (CRM) bidirecional com suporte a Drag & Drop nativo
- Emissão e visualização de 2ª Via de Boletos Bancários padrão FEBRABAN e Linha Digitável
- Calculadoras e simuladores trabalhistas (Férias CLT, Demonstrativo de Holerite)
- Modais interativos com formulários controlados e validação (substituindo `prompt()` nativo)
- Fechamento inteligente de modais via tecla `ESC` ou clique fora (backdrop)
- Sistema de notificações Toast dinâmico
- Estilização para impressão oficial via `@media print` (Holerite e Boletos)
- Design System consistente com paleta de cores oficial Inova

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Uso no Projeto |
|------------|----------------|
| **HTML5** | Estruturação semântica, acessível e formulários controlados |
| **Tailwind CSS** (via CDN) | Estilização utility-first, responsividade e layout flexbox/grid |
| **JavaScript Vanilla (ES6+)** | Arquitetura modular, manipulação de DOM, estado reativo em memória |
| **CSS3 Customizado** | Scrollbars customizadas, transições e regras de `@media print` |
| **Font Awesome 6.4** | Ícones vetoriais em botões, abas e cabeçalhos |
| **Google Fonts (Inter)** | Tipografia moderna e limpa (pesos 300 a 800) |

---

## 📦 Estrutura do Projeto

O projeto foi totalmente modularizado para melhor organização, manutenibilidade e separação de conceitos:

```
inova/
├── index.html                  # Interface SPA principal, dashboards e estrutura de modais
├── css/
│   ├── custom.css             # Estilos utilitários, scrollbar e regras @media print
│   └── tailwind-config.js     # Configurações de cores e tokens do Design System Inova
├── img/
│   └── icon.png               # Logotipo oficial da marca Inova
├── js/
│   ├── auth.js                # Lógica de login, logout e controle de permissões (RBAC)
│   ├── state.js               # Estado global em memória da aplicação (AppState)
│   ├── modals/
│   │   └── devops.js          # Controladores de modais específicos (DevOps / Sprints)
│   ├── modules/
│   │   ├── comercial.js       # Funil Kanban CRM bidirecional, SAC e Relacionamentos
│   │   ├── financeiro.js      # Boletos, 2ª Via, Linha Digitável, Contratos e Cobranças
│   │   └── rh.js              # Vagas, Demissões, Calculadora de Férias CLT e Folha
│   └── utils/
│       └── helpers.js         # Utilitários (formatação BRL/Datas, Toasts, listeners ESC/Backdrop)
└── README.md                  # Documentação completa do projeto
```

---

## 🎨 Design System (Identidade Visual Inova)

```css
--inova-blue:        #004D95;     /* Azul principal da marca */
--inova-blue-hover:  #003A70;     /* Azul escuro para hover */
--inova-blue-light:  #E6F0FA;     /* Azul suave para backgrounds e badges */
--inova-yellow:      #F4B41A;     /* Amarelo institucional */
--inova-yellow-hover:#D99E10;     /* Amarelo para foco e hover */
--inova-yellow-light:#FEF9E7;     /* Amarelo claro para destaques */
```

- **Tipografia:** Fonte *Inter* (Google Fonts)
- **Cantos:** `rounded-xl` e `rounded-2xl` predominantes
- **Sombras:** `shadow-sm`, `shadow-md`, `shadow-xl` e `shadow-2xl` em modais
- **Backdrops:** `backdrop-blur-sm` com `bg-slate-900/60` para foco visual em diálogos

---

## 🔐 Autenticação e Controle de Acesso (RBAC)

### Perfis de Acesso

| Perfil | Acesso Permitido | Descrição |
|--------|------------------|-----------|
| **Administrador Geral** | Total | Acesso irrestrito a todos os módulos (Financeiro, Comercial e RH) |
| **Financeiro** | Módulo Financeiro | Gestão de Boletos, 2ª Via, Contratos e Inadimplência |
| **Comercial** | Módulo Comercial | Funil de Vendas CRM, Central SAC e Base de Clientes |
| **Recursos Humanos** | Módulo RH | Vagas, Demissões, Calculadora de Férias e Folha de Pagamento |

### Credenciais de Teste (Pré-preenchidas na tela de Login):
* **E-mail:** `admin@inova.com.br`
* **Senha:** `123456`
* **Perfil:** *Administrador Geral* (ou selecione qualquer outro para testar o RBAC)

---

## 📱 Módulos e Funcionalidades

### 1. 🏦 Módulo Financeiro (`js/modules/financeiro.js`)
- **KPIs Principais:** Faturamento do Mês, Boletos a Receber, Total em Inadimplência e Contratos Vigentes.
- **Abas de Navegação:**
  - **Emissão de Boletos:**
    - Tabela de boletos com status (*Pago*, *Pendente*, *Vencido*).
    - **Modal Gerar Novo Boleto:** Formulário com cliente, valor, vencimento e status inicial.
    - **Modal de Código de Barras:** Exibe linha digitável formatada, botão de cópia rápida e representação gráfica de barras FEBRABAN.
    - **Modal de 2ª Via do Boleto:** Ficha de compensação bancária completa com autenticação mecânica simulada e suporte a **Impressão / PDF** (`window.print()`).
  - **Gestão de Contratos:** Cards de clientes com valor mensal recorrente, início e vigência.
    - **Modal Novo Contrato:** Formulário com razão social, valor mensal, vigência e status.
  - **Cobrança de Inadimplentes:** Tabela com dias em atraso, valores pendentes e botão para disparar notificação de cobrança.

### 2. 📈 Módulo Comercial & CRM (`js/modules/comercial.js`)
- **Abas de Navegação:**
  - **Pipeline de Negócios / Funil de Vendas (Kanban):**
    - 4 Colunas de progressão: *Prospecção* ⇄ *Contato Feito* ⇄ *Proposta Enviada* ⇄ *Fechado / Ganho*.
    - **Movimentação Bidirecional:** Botões dedicados de **Avançar** (`fa-arrow-right`) e **Voltar** (`fa-arrow-left`) em cada card.
    - **Drag and Drop Nativo:** Arraste e solte cards entre qualquer coluna com realce visual.
    - **Modal Nova Oportunidade:** Cadastro de leads com empresa, decisor, valor estimado e estágio inicial.
  - **Central de Chamados SAC:**
    - Tabela com protocolo, solicitante, assunto, prioridade e status do atendimento.
    - **Modal Novo Ticket SAC:** Abertura de chamados com descrição detalhada e prioridade (*Alta*, *Média*, *Baixa*).
    - Ação de concluir/resolver chamados.
  - **Gestão de Relacionamentos 360º:** Cards unificados com potencial acumulado por cliente.

### 3. 👥 Módulo Recursos Humanos (`js/modules/rh.js`)
- **Abas de Navegação:**
  - **Contratações (Vagas):**
    - Grid de vagas abertas com contador de candidatos inscritos.
    - **Modal Publicar Nova Vaga:** Formulário com cargo, departamento e status do processo seletivo.
  - **Desligamentos / Demissões:**
    - Tabela com colaborador, cargo, data e status das verbas rescisórias.
    - **Modal Registrar Demissão:** Formulário com colaborador, motivo da rescisão e status financeiro.
  - **Cálculos de Férias CLT:**
    - **Calculadora Interativa em Tempo Real:** Entrada de salário base, dias de gozo e opção de abono pecuniário (1/3 constitucional).
    - Tabela de programação de férias da equipe.
  - **Folha de Pagamento:**
    - Tabela com salário bruto, descontos legais (INSS/IRRF) e salário líquido.
    - **Modal de Holerite:** Demonstrativo mensal formatado pronto para **Impressão / PDF**.

### 4. ⚙️ Modais Globais e Informativos
- **Modal DevOps / Cronograma:** Planejamento incremental em 3 Sprints com orçamento e entregáveis.
- **Sistema de Modais com Validação:** Todos os formulários realizam validação de campos obrigatórios e exibem notificações Toast.
- **Teclado & Usabilidade:** Pressionar a tecla `ESC` ou clicar no fundo do modal fecha automaticamente qualquer janela aberta.

---

## 💾 Estrutura do Estado Global (`js/state.js`)

Todos os dados reativos da aplicação residem no objeto `AppState.state`:

```javascript
const state = {
  boletos: [...],       // Registros de boletos com linha digitável e status
  contratos: [...],     // Contratos vigentes e recorrência mensal
  inadimplentes: [...], // Histórico de inadimplência e contatos
  crmLeads: [...],      // Oportunidades do funil CRM com estágios e valores
  sacTickets: [...],    // Chamados SAC com níveis de prioridade
  vagasRH: [...],       // Vagas abertas e candidatos
  demissoes: [...],     // Registros rescisórios
  ferias: [...],        // Programações de férias
  folha: [...]          // Colaboradores e valores de folha de pagamento
};
```

---

## 🛠️ Como Executar o Projeto

Como o projeto é front-end vanilla, não requer instalação de dependências ou build:

### Opção 1: Abrir diretamente no navegador
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### Opção 2: Servidor Local (Recomendado)
```bash
# Node.js (npx)
npx serve .

# Python 3
python -m http.server 8000

# PHP
php -S localhost:8000
```
Acesse: `http://localhost:8000`

---

## 📚 Boas Práticas e Padrões Implementados

- **Modularização de Scripts:** Separação clara entre utilitários (`helpers.js`), estado (`state.js`), autenticação (`auth.js`) e módulos de negócio (`comercial.js`, `financeiro.js`, `rh.js`).
- **Renderização Dinâmica Reativa:** Funções de renderização que reconstroem o DOM baseadas no estado atual (`AppState`).
- **Interatividade Aprimorada:** Substituição de `prompt()` por modais ricos com inputs validados.
- **Print Optimization:** Estilização com `@media print` isolando documentos (Holerite e 2ª Via do Boleto) para impressão direta ou exportação em PDF.
- **Acessibilidade & Usabilidade:** Suporte a atalhos de teclado (`ESC`), feedback por Toasts coloridos e layout responsivo para desktop e dispositivos móveis.

---

## 📄 Licença

Projeto desenvolvido para fins educacionais e de estudo prático. Livre para uso, modificação e referência. 🚀