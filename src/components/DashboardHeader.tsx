import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  clientName: string;
  agentName: string;
  agentAvatar?: string;
  isOnline: boolean;
  token?: string; // Tornar o token opcional
}

const DashboardHeader = ({ 
  clientName, 
  agentName, 
  agentAvatar, 
  isOnline,
  token 
}: DashboardHeaderProps) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              {agentAvatar ? (
                <img 
                  src={agentAvatar} 
                  alt={agentName}
                  className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-accent text-white flex items-center justify-center font-semibold text-lg">
                  {agentName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">
                {clientName}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-600">Agente: {agentName}</span>
                <Badge 
                  variant={isOnline ? "default" : "secondary"}
                  className={`${
                    isOnline 
                      ? "bg-green-100 text-green-800 hover:bg-green-100" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className={`h-2 w-2 rounded-full mr-2 ${
                    isOnline ? "bg-green-500 animate-pulse-slow" : "bg-gray-400"
                  }`} />
                  {isOnline ? "Online" : "Offline"}
                </Badge>
              </div>
            </div>
          </div>
          {token && ( // Verifica se o token está definido antes de renderizar
            <div className="text-sm text-gray-500 font-mono bg-muted px-3 py-2 rounded-md">
              Token: {token.substring(0, 8)}...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
