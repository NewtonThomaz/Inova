/**
 * Estado global da aplicação (Mock Data)
 * Em produção, isso viria de uma API/backend
 */

// Estado da aplicação
const state = {
  boletos: [
    { id: 'BOL-9021', cliente: 'TechCorp Brasil LTDA', vencimento: '2026-08-15', valor: 8500.00, status: 'Pendente', codigoBarra: '34191.09021 80000.123456 7 8910000850000' },
    { id: 'BOL-9022', cliente: 'Nexus Logística S.A.', vencimento: '2026-08-10', valor: 14200.00, status: 'Pago', codigoBarra: '34191.09022 80000.123456 7 8910001420000' },
    { id: 'BOL-9023', cliente: 'Padaria Modelo EIRELI', vencimento: '2026-07-28', valor: 3100.00, status: 'Vencido', codigoBarra: '34191.09023 80000.123456 7 8910000310000' },
    { id: 'BOL-9024', cliente: 'Inova Softwares ME', vencimento: '2026-08-20', valor: 12400.00, status: 'Pendente', codigoBarra: '34191.09024 80000.123456 7 8910001240000' }
  ],
  contratos: [
    { id: 'CTR-001', cliente: 'TechCorp Brasil LTDA', valorMensal: 8500.00, inicio: '2025-01-10', status: 'Ativo', vigencia: '12 Meses' },
    { id: 'CTR-002', cliente: 'Nexus Logística S.A.', valorMensal: 14200.00, inicio: '2024-06-15', status: 'Ativo', vigencia: '24 Meses' },
    { id: 'CTR-003', cliente: 'Sistemas Alfa LTDA', valorMensal: 6800.00, inicio: '2025-03-01', status: 'Em Renovação', vigencia: '12 Meses' }
  ],
  inadimplentes: [
    { cliente: 'Padaria Modelo EIRELI', diasAtraso: 14, valor: 3100.00, ultimoContato: '2026-08-01' },
    { cliente: 'Comércio Silva LTDA', diasAtraso: 32, valor: 5250.00, ultimoContato: '2026-07-25' },
    { cliente: 'Distribuidora Global', diasAtraso: 45, valor: 4500.00, ultimoContato: '2026-07-15' }
  ],
  crmLeads: [
    { id: 'LD-1', cliente: 'Supermercados Sol', contato: 'Carlos Souza', valor: 15000.00, etapa: 'prospeccao' },
    { id: 'LD-2', cliente: 'Farma Vida', contato: 'Renata Lima', valor: 28000.00, etapa: 'contato' },
    { id: 'LD-3', cliente: 'Grupo Horizonte', contato: 'Marcos Paulo', valor: 45000.00, etapa: 'proposta' },
    { id: 'LD-4', cliente: 'Indústria MetalPró', contato: 'Fernanda Vaz', valor: 62000.00, etapa: 'fechado' }
  ],
  sacTickets: [
    { id: 'TCK-101', cliente: 'TechCorp Brasil LTDA', assunto: 'Dúvida na integração de API Financeira', prioridade: 'Alta', status: 'Aberto' },
    { id: 'TCK-102', cliente: 'Nexus Logística S.A.', assunto: 'Solicitação de 2ª via de boleto', prioridade: 'Média', status: 'Em Atendimento' },
    { id: 'TCK-103', cliente: 'Padaria Modelo EIRELI', assunto: 'Ajuste cadastral de CNPJ', prioridade: 'Baixa', status: 'Resolvido' }
  ],
  vagasRH: [
    { id: 'VG-01', titulo: 'Desenvolvedor Full Stack Senior', departamento: 'Tecnologia', candidatos: 18, status: 'Em Seleção' },
    { id: 'VG-02', titulo: 'Analista Financeiro Pleno', departamento: 'Financeiro', candidatos: 12, status: 'Entrevistas' },
    { id: 'VG-03', titulo: 'Executivo de Vendas B2B', departamento: 'Comercial', candidatos: 25, status: 'Aberto' }
  ],
  demissoes: [
    { colaborador: 'Roberto Andrade', cargo: 'Suporte N2', data: '2026-07-30', motivo: 'Iniciativa do Empregado', statusVerbas: 'Pago' },
    { colaborador: 'Camila Torres', cargo: 'Vendedora Pleno', data: '2026-08-05', motivo: 'Reestruturação Interna', statusVerbas: 'Em Processamento' }
  ],
  ferias: [
    { funcionario: 'Ana Beatriz Santos', periodo: '2025/2026', inicio: '2026-09-01', dias: 30, status: 'Aprovado' },
    { funcionario: 'Lucas Mendes', periodo: '2024/2025', inicio: '2026-10-15', dias: 15, status: 'Pendente' }
  ],
  folha: [
    { colaborador: 'Ana Beatriz Santos', cargo: 'Gerente Comercial', bruto: 9500.00, descontos: 2100.00, liquido: 7400.00 },
    { colaborador: 'Lucas Mendes', cargo: 'DevOps Engineer', bruto: 8800.00, descontos: 1900.00, liquido: 6900.00 },
    { colaborador: 'Juliana Paes', cargo: 'Analista de RH', bruto: 5200.00, descontos: 980.00, liquido: 4220.00 }
  ]
};

// Estado da sessão do usuário
let currentUser = null;
let activeModule = 'financeiro';

// Exportar para uso global (script type="module" não usado por simplicidade)
window.AppState = {
  state,
  get currentUser() { return currentUser; },
  set currentUser(val) { currentUser = val; },
  get activeModule() { return activeModule; },
  set activeModule(val) { activeModule = val; }
};