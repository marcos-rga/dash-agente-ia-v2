import DashboardHeader from "@/components/DashboardHeader";
import MetricCard from "@/components/MetricCard";
import RecentMessages from "@/components/RecentMessages";
import ActivityChart from "@/components/ActivityChart";
import AlertsPanel from "@/components/AlertsPanel";
import { MessageSquare, Clock, Users, TrendingUp } from "lucide-react";

const Index = () => {
  // Mock data - in production this would come from your backend
  const mockData = {
    client: {
      name: "Loja do João",
      agentName: "Sofia",
      agentAvatar: "",
      isOnline: true,
    },
    metrics: [
      {
        title: "Conversas Ativas",
        value: 12,
        change: "+3 hoje",
        changeType: "positive" as const,
        icon: Users,
        description: "Clientes em atendimento"
      },
      {
        title: "Tempo Médio de Resposta",
        value: "2.3s",
        change: "-0.5s",
        changeType: "positive" as const,
        icon: Clock,
        description: "Últimas 24 horas"
      },
      {
        title: "Mensagens Hoje",
        value: 147,
        change: "+18%",
        changeType: "positive" as const,
        icon: MessageSquare,
        description: "Comparado a ontem"
      },
      {
        title: "Taxa de Resolução",
        value: "94%",
        change: "+2%",
        changeType: "positive" as const,
        icon: TrendingUp,
        description: "Problemas resolvidos"
      }
    ],
    recentMessages: [
      {
        id: "1",
        content: "Olá! Gostaria de saber sobre os preços dos produtos disponíveis.",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        sender: "customer" as const,
        customerName: "Maria Silva",
        sentiment: "neutral" as const
      },
      {
        id: "2",
        content: "Ótimo! Aqui estão nossos produtos com os melhores preços. Posso te ajudar a escolher o ideal?",
        timestamp: new Date(Date.now() - 3 * 60 * 1000),
        sender: "agent" as const,
        customerName: "Maria Silva"
      },
      {
        id: "3",
        content: "Perfeito! Muito obrigada pelo atendimento rápido. Vou fazer o pedido agora.",
        timestamp: new Date(Date.now() - 1 * 60 * 1000),
        sender: "customer" as const,
        customerName: "Maria Silva",
        sentiment: "positive" as const
      },
      {
        id: "4",
        content: "Preciso cancelar meu pedido urgentemente!",
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        sender: "customer" as const,
        customerName: "Carlos Santos",
        sentiment: "negative" as const
      },
      {
        id: "5",
        content: "Sem problemas! Vou processar o cancelamento imediatamente para você.",
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        sender: "agent" as const,
        customerName: "Carlos Santos"
      }
    ],
    recentSessions: [
      {
        id: "session1",
        messages: [
          {
            id: "1",
            content: "Olá! Gostaria de saber sobre os preços dos produtos disponíveis.",
            timestamp: new Date(Date.now() - 5 * 60 * 1000),
            sender: "customer" as const,
            customerName: "Maria Silva",
            sentiment: "neutral" as const
          },
          {
            id: "2",
            content: "Ótimo! Aqui estão nossos produtos com os melhores preços. Posso te ajudar a escolher o ideal?",
            timestamp: new Date(Date.now() - 3 * 60 * 1000),
            sender: "agent" as const,
            customerName: "Maria Silva"
          }
        ],
        customerName: "Maria Silva"
      },
      {
        id: "session2",
        messages: [
          {
            id: "3",
            content: "Preciso cancelar meu pedido urgentemente!",
            timestamp: new Date(Date.now() - 10 * 60 * 1000),
            sender: "customer" as const,
            customerName: "Carlos Santos",
            sentiment: "negative" as const
          },
          {
            id: "4",
            content: "Sem problemas! Vou processar o cancelamento imediatamente para você.",
            timestamp: new Date(Date.now() - 8 * 60 * 1000),
            sender: "agent" as const,
            customerName: "Carlos Santos"
          }
        ],
        customerName: "Carlos Santos"
      }
    ],
    activityData: [
      { time: "09:00", messages: 8, conversations: 3 },
      { time: "10:00", messages: 15, conversations: 5 },
      { time: "11:00", messages: 23, conversations: 8 },
      { time: "12:00", messages: 31, conversations: 12 },
      { time: "13:00", messages: 18, conversations: 7 },
      { time: "14:00", messages: 25, conversations: 9 },
      { time: "15:00", messages: 29, conversations: 11 },
      { time: "16:00", messages: 22, conversations: 8 }
    ],
    alerts: [
      {
        id: "1",
        type: "info" as const,
        title: "Pico de Atividade",
        message: "Volume de mensagens 40% acima da média nas últimas 2 horas.",
        timestamp: new Date(),
        suggestion: "Considere adicionar mais um agente durante este horário de pico."
      },
      {
        id: "2",
        type: "warning" as const,
        title: "Tempo de Resposta Elevado",
        message: "Algumas conversas estão demorando mais que 5 segundos para receber resposta.",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        suggestion: "Verifique se o agente está processando muitas conversas simultaneamente."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-muted">
      <DashboardHeader 
        clientName={mockData.client.name}
        agentName={mockData.client.agentName}
        agentAvatar={mockData.client.agentAvatar}
        isOnline={mockData.client.isOnline}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockData.metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              description={metric.description}
            />
          ))}
        </div>

        {/* Charts and Messages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ActivityChart 
            data={mockData.activityData} 
            period="day"
          />
          <RecentMessages messages={mockData.recentMessages} sessions={mockData.recentSessions} />
        </div>

        {/* Alerts */}
        <div className="mb-8">
          <AlertsPanel alerts={mockData.alerts} />
        </div>
      </div>
    </div>
  );
};

export default Index;
