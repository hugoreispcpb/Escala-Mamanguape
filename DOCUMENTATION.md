## 🎯 Escala Mamanguape - Sistema Moderno de Visualização de Plantões

Um sistema **dinâmico, moderno e responsivo** para visualizar, gerenciar e compartilhar escalas de plantão de forma fácil e intuitiva.

### ✨ Características Principais

#### 📅 Visualizações Múltiplas
- **Visualização em Calendário**: Veja todos os plantões do mês em um calendário tradicional
- **Visualização em Lista**: Tabela detalhada com informações de todos os plantões
- **Navegação por Mês**: Mude facilmente entre os meses

#### 👥 Filtros e Busca
- **Busca por Profissional**: Localize rapidamente plantões específicos
- **Filtro por Profissional**: Selecione um profissional para ver apenas seus plantões
- **Destaque Visual**: Profissionais aparecem destacados em amarelo quando selecionados

#### 📊 Estatísticas em Tempo Real
- **Total de Plantões**: Quantidade total no período filtrado
- **Plantões Noturnos**: Contagem de plantões noturnos
- **Total de Profissionais**: Número de profissionais na escala

#### 🔔 Centro de Notificações
- Receba notificações sobre próximos plantões
- Gerencie e limpe notificações
- Indicador de notificações não lidas

#### 📝 Solicitação de Permuta de Turnos
- Clique em qualquer plantão para solicitar permuta
- Selecione o profissional para quem deseja solicitar
- Adicione uma mensagem personalizada
- Confirmação de envio

#### 📥 Exportação de Dados
- **Download em PDF**: Exporte a escala em formato PDF
- **Download em CSV**: Importe para Excel ou outros programas
- Mantém a formatação e destaque visual

#### 🎨 Design Responsivo
- Interface moderna com Tailwind CSS
- Funciona em desktop, tablet e mobile
- Tema claro por padrão (extensível para escuro)
- Animações e transições suaves

---

## 🚀 Primeiros Passos

### Instalação

```bash
# Clone o repositório
git clone https://github.com/hugoreispcpb/Escala-Mamanguape.git
cd Escala-Mamanguape

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação abrirá automaticamente em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

O resultado estará na pasta `dist/`

---

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Schedule/
│   │   ├── ScheduleCalendar.tsx       # Componente principal
│   │   ├── DayCard.tsx                # Card de dia individual
│   │   ├── ListView.tsx               # Visualização em lista
│   │   ├── FilterBar.tsx              # Barra de busca
│   │   ├── ScheduleStats.tsx          # Estatísticas
│   │   ├── ProfessionalFilter.tsx     # Filtro por profissional
│   │   ├── NotificationCenter.tsx     # Centro de notificações
│   │   ├── ShiftRequest.tsx           # Modal de permuta
│   │   └── PDFExport.tsx              # Exportação PDF/CSV
│   └── ErrorBoundary.tsx              # Tratamento de erros
├── contexts/
│   └── ThemeContext.tsx               # Contexto de tema
├── pages/
│   ├── Home.tsx                       # Página inicial
│   ├── SchedulePage.tsx               # Página da escala
│   └── NotFound.tsx                   # Página 404
├── store/
│   └── scheduleStore.ts               # Estado global (Zustand)
├── types/
│   └── Schedule.ts                    # Tipos TypeScript
├── data/
│   └── mockSchedule.ts                # Dados de exemplo
├── App.tsx                            # Componente principal
└── main.tsx                           # Entry point
```

---

## 🎮 Como Usar

### 1. Navegar Entre Meses
Use os botões de seta (◀️ ▶️) no cabeçalho para mudar de mês

### 2. Buscar por Profissional
Digite o nome do profissional na barra de busca para filtrar plantões

### 3. Ver Plantões de um Profissional
Clique nos nomes na seção "Meu Plantão" para destacar todos os plantões daquele profissional

### 4. Solicitar Permuta
- Clique em um plantão no calendário
- Selecione com quem deseja trocar
- Adicione uma mensagem (opcional)
- Clique em "Enviar Solicitação"

### 5. Exportar Escala
- Clique em **PDF** para baixar em PDF
- Clique em **CSV** para baixar em CSV

### 6. Alternar Visualizações
- Clique em **📅** para ver calendário
- Clique em **📋** para ver lista

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|---|---|---|
| React | 18.2.0 | Framework UI |
| TypeScript | 5.0 | Tipagem segura |
| Vite | 5.0 | Build tool |
| Tailwind CSS | 3.3 | Estilos |
| Zustand | 4.4 | Gerenciamento de estado |
| Wouter | 3.1 | Roteamento |
| date-fns | 2.30 | Manipulação de datas |
| jsPDF | 2.5 | Geração de PDF |
| html2canvas | 1.4 | Conversão HTML para imagem |
| Lucide React | 0.292 | Ícones |

---

## 🔧 Configuração Avançada

### Adicionar Novos Dados

Edite `src/data/mockSchedule.ts`:

```typescript
export const mockScheduleData: ScheduleEntry[] = [
  {
    id: '1',
    day: 2,
    dayName: 'QUARTA',
    date: new Date(2026, 6, 2),
    shiftTime: '18:00 às 08:00',
    professionals: [
      { id: '1', name: 'NOME DO PROFISSIONAL' },
    ],
  },
  // ...
];
```

### Integrar com API Backend

No arquivo `src/store/scheduleStore.ts`, adicione ações para chamar sua API:

```typescript
const fetchScheduleFromAPI = async () => {
  const response = await fetch('/api/schedule');
  const data = await response.json();
  setEntries(data);
};
```

### Customizar Cores e Temas

Edite `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#sua-cor-aqui',
      secondary: '#outra-cor',
    },
  },
}
```

---

## 📱 Responsividade

O projeto é totalmente responsivo:

- **Desktop**: Calendário 7 colunas completo
- **Tablet**: Grid adaptado com 2-3 colunas
- **Mobile**: Visualização em lista é recomendada

---

## 🚨 Troubleshooting

### Erro: "Element not found for PDF export"
Verifique se o elemento com `id="schedule-to-print"` existe no DOM

### Escala não aparece
1. Limpe o cache do navegador
2. Verifique se os dados em `mockSchedule.ts` estão corretos
3. Abra o DevTools (F12) para verificar erros

### Problema com datas
Certifique-se de usar `new Date()` corretamente com mês 0-11 (julho = mês 6)

---

## 📝 Próximas Features

- [ ] Autenticação de usuários
- [ ] Integração com Google Calendar
- [ ] Notificações push
- [ ] Histórico de permutas
- [ ] Relatórios de plantões
- [ ] Integração com banco de dados
- [ ] Temas dark/light completos
- [ ] Suporte multilíngue

---

## 👨‍💼 Autor

Desenvolvido por **Hugo Reis** para **Mamanguape**

## 📄 Licença

Este projeto está sob a licença MIT

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para abrir issues ou pull requests.

---

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato através das issues do GitHub.

**Deploy**: https://escalaplan-hamweuxs.manus.space/
