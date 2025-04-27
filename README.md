# Market Pulse - Plataforma de Oportunidades de Trading

![Market Pulse Banner](https://placeholder.com/banner.jpg)

Um protótipo de MVP para uma ferramenta inovadora de análise de mercado em tempo real com identidade visual única, focada em mostrar oportunidades de trade com escassez controlada.

## 🚀 Características

- **Design Único**: Paleta de cores neon (verde/rosa) sobre fundo escuro para criar urgência visual
- **Pulse Waves**: Janelas de oportunidade temporárias que usuários podem "capturar"
- **Super Pulses**: Oportunidades raras de alta recompensa que custam mais créditos
- **Análise de Sentimento**: Termômetro bull vs bear e histórico de sentimento
- **Gamificação**: Sistema de streak, badges e leaderboard
- **Escassez Controlada**: Sistema de créditos para capturar oportunidades
- **Feedback Imediato**: Notificações toast e animações de resposta
- **UI Responsiva**: Design mobile-first com sidebar colapsável

## 💻 Tecnologias

- React 18
- Vite (para build rápido)
- Tailwind CSS (estilização)
- Framer Motion (animações)
- Chart.js (gráficos)
- Lucide React (ícones)
- Context API (gerenciamento de estado)
- WebSockets simulados (dados em tempo real)

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/sua-empresa/market-pulse.git
cd market-pulse

# Instale as dependências
npm install

# Execute o projeto em modo de desenvolvimento
npm run dev

# Gere a build de produção
npm run build
```

## 📁 Estrutura do Projeto

```
src/
├── index.html
├── assets/
│   └── fonts/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── pulse/
│   │   ├── PulseTimer.jsx
│   │   ├── AssetCard.jsx
│   │   └── PulseButton.jsx
│   ├── analytics/
│   │   ├── SentimentGauge.jsx
│   │   └── SentimentHistory.jsx
│   └── gamification/
│       ├── StreakCounter.jsx
│       ├── BadgeDisplay.jsx
│       └── LeaderboardModal.jsx
├── hooks/
│   ├── useWebSocket.js
│   ├── usePulseTimer.js
│   └── useToast.js
├── context/
│   ├── ThemeContext.jsx
│   └── UserContext.jsx
├── utils/
│   ├── formatters.js
│   └── mockData.js
├── pages/
│   ├── Dashboard.jsx
│   ├── Fundamentals.jsx
│   ├── News.jsx
│   └── Credits.jsx
├── App.jsx
└── main.jsx
```

## 🎨 Decisões de Design

- **Cores neon**: Maior contraste visual para destacar oportunidades e criar sensação de urgência
- **Animações pulsantes**: Reforçam o conceito de "Market Pulse" e capturam a atenção
- **Escassez controlada**: Pulses aparecem em intervalos aleatórios para criar engajamento
- **Notificações toast**: Feedback imediato sobre ações do usuário
- **Super Pulses**: Eventos raros que criam sensação adicional de excitação
- **Gamificação**: Streaks e badges incentivam uso regular e competição entre usuários
- **Tooltips e microtexto**: Ajudam a explicar elementos sem sobrecarregar a interface
- **Comportamento adaptativo**: Diferentes estados visuais para refletir urgência

## 🕹️ Características da UX

- **Feedback visual**: Cada interação tem uma resposta visual clara
- **Foco automático**: Botões críticos recebem foco quando necessário
- **Escala temporal**: Alternância entre estado de espera e urgência
- **Hierarquia visual**: Elementos mais importantes têm maior destaque
- **Microinterações**: Pequenas animações que tornam a interface mais viva
- **Gradientes animados**: Efeitos visuais que atraem atenção para dados importantes
- **Histórico visual**: Visualização clara de ações passadas e progressão

## 🔮 Próximos Passos

- Implementar autenticação de usuários
- Conectar a API real de dados de mercado
- Adicionar funcionalidade de chat para discussão entre usuários
- Implementar notificações push para novas oportunidades
- Expandir sistema de badges e gamificação
- Desenvolver versão mobile nativa
- Adicionar testes E2E e de componentes

## 📃 Licença

Este projeto é privado e proprietário. Todos os direitos reservados.

---

Desenvolvido com 💚 por Torki © 2025