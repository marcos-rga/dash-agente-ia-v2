import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: "customer" | "agent";
  customerName: string;
  sentiment?: "positive" | "neutral" | "negative";
}

interface Session {
  id: string;
  messages: Message[];
  customerName: string;
}

interface RecentSessionsProps {
  sessions?: Session[]; // Tornar sessions opcional
}

const RecentSessions = ({ sessions = [] }: RecentSessionsProps) => { // Definir valor padrão como array vazio
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const handleSessionClick = (session: Session) => {
    setSelectedSession(session);
    setOpenDialog(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Últimas Sessões</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sessions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhuma sessão recente
            </div>
          ) : (
            sessions.map((session) => (
              <div 
                key={session.id} 
                className="border-l-4 border-accent pl-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSessionClick(session)}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-medium text-sm">{session.customerName}</span>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatDistanceToNow(new Date(session.messages[0].timestamp), { 
                      addSuffix: true,
                      locale: ptBR 
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {session.messages[0].content}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {selectedSession && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mensagens da Sessão</DialogTitle>
              <DialogClose />
            </DialogHeader>
            <div className="space-y-4">
              {selectedSession.messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "customer" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-xs p-2 rounded-lg ${message.sender === "customer" ? "bg-gray-200" : "bg-blue-500 text-white"}`}>
                    <p>{message.content}</p>
                    <span className="text-xs text-gray-500">{formatDistanceToNow(message.timestamp, { addSuffix: true, locale: ptBR })}</span>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default RecentSessions;
