
import { cn } from "@/lib/utils";

type StatusType = "success" | "warning" | "danger" | "neutral";

interface StatusIndicatorProps {
  status: StatusType;
  showIcon?: boolean;
  text?: string;
  className?: string;
}

export function StatusIndicator({ 
  status, 
  showIcon = true, 
  text, 
  className 
}: StatusIndicatorProps) {
  const getStatusClasses = (status: StatusType) => {
    switch (status) {
      case "success":
        return "bg-statusGood text-white";
      case "warning":
        return "bg-statusWarning text-gray-800";
      case "danger":
        return "bg-statusDanger text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };
  
  const getStatusEmoji = (status: StatusType) => {
    switch (status) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "danger":
        return "🔥";
      default:
        return "ℹ️";
    }
  };

  return (
    <div className={cn(
      "status-badge",
      getStatusClasses(status),
      className
    )}>
      {showIcon && <span className="mr-1">{getStatusEmoji(status)}</span>}
      {text && <span>{text}</span>}
    </div>
  );
}
