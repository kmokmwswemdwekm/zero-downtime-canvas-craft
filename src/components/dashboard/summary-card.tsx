import { ReactNode } from "react";
import { cn } from "@/lib/utils";
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
  const getTrendClasses = (trend?: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return "text-green-400";
      case "down":
        return "text-red-400";
      case "stable":
        return "text-yellow-400";
      default:
        return "text-gray-400";
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
    <div
      className={cn(
        "rounded-2xl p-4 shadow-sm backdrop-blur-sm bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a]/90 border border-white/10 transition duration-300",
        className
      )}
    >
      <div className="flex flex-col h-full text-white">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-medium text-gray-300">{title}</h3>
          {icon && <div className="text-gray-400">{icon}</div>}
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-6 h-6 border-2 border-white/60 border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <>
            <div className="flex-1">
              <div className="text-3xl font-bold">{value}</div>
              {trend && trendValue && (
                <div
                  className={cn(
                    "text-xs mt-1 flex items-center gap-1 font-medium",
                    getTrendClasses(trend)
                  )}
                >
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
    </div>
  );
}
