
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { motion } from "framer-motion";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  status?: "success" | "warning" | "danger" | "neutral";
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  loading?: boolean;
  className?: string;
}

export function SummaryCard({
  title,
  value,
  icon,
  status,
  trend,
  trendValue,
  loading = false,
  className,
}: SummaryCardProps) {
  // Get trend classes and arrow
  const getTrendClasses = (trend?: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return "text-statusGood";
      case "down":
        return "text-statusDanger";
      case "stable":
        return "text-statusWarning";
      default:
        return "text-gray-500";
    }
  };

  const getTrendArrow = (trend?: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return "↑";
      case "down":
        return "↓";
      case "stable":
        return "→";
      default:
        return "";
    }
  };

  return (
    <GlassCard className={cn("h-full", className)}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <>
            <div className="flex-1">
              <div className="text-2xl font-bold">{value}</div>
              {trend && trendValue && (
                <div className={cn("text-xs mt-1 flex items-center gap-1", getTrendClasses(trend))}>
                  <span>{getTrendArrow(trend)}</span>
                  <span>{trendValue}</span>
                </div>
              )}
            </div>
            
            {status && (
              <div className="mt-4 flex justify-end">
                <StatusIndicator status={status} showIcon />
              </div>
            )}
          </>
        )}
      </div>
    </GlassCard>
  );
}
