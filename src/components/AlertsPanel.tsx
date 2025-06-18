import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, TrendingDown, Zap } from "lucide-react";

interface AlertItem {
  id: string;
  type: "warning" | "info" | "error";
  title: string;
  message: string;
  timestamp: Date;
  suggestion?: string;
}

interface AlertsPanelProps {
  alerts: AlertItem[];
}

const AlertsPanel = ({ alerts }: AlertsPanelProps) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "error":
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  const getAlertVariant = (type: string) => {
    switch (type) {
      case "error":
        return "destructive";
      default:
        return "default";
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Alertas Inteligentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Zap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Tudo funcionando perfeitamente!</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <Alert key={alert.id} variant={getAlertVariant(alert.type)}>
              <div className="flex items-start gap-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{alert.title}</span>
                    <Badge className={getBadgeColor(alert.type)}>
                      {alert.type === "warning" ? "Atenção" : 
                       alert.type === "error" ? "Crítico" : "Info"}
                    </Badge>
                  </div>
                  <AlertDescription className="mb-2">
                    {alert.message}
                  </AlertDescription>
                  {alert.suggestion && (
                    <div className="bg-accent/5 p-3 rounded-md mt-2">
                      <p className="text-sm text-accent font-medium">
                        💡 Sugestão: {alert.suggestion}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Alert>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
