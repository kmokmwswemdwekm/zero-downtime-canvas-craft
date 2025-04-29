
import { User, Key, Wrench, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

type RoleType = "admin" | "tech" | "viewer";

interface RoleBadgeProps {
  role: RoleType;
  showIcon?: boolean;
  showLabel?: boolean;
  className?: string;
}

export function RoleBadge({ 
  role, 
  showIcon = true, 
  showLabel = true,
  className 
}: RoleBadgeProps) {
  const getRoleClasses = (role: RoleType) => {
    switch (role) {
      case "admin":
        return "bg-admin text-white";
      case "tech":
        return "bg-tech text-gray-800";
      case "viewer":
        return "bg-viewer text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };
  
  const getRoleIcon = (role: RoleType) => {
    switch (role) {
      case "admin":
        return <Key className="h-3.5 w-3.5" />;
      case "tech":
        return <Wrench className="h-3.5 w-3.5" />;
      case "viewer":
        return <Eye className="h-3.5 w-3.5" />;
      default:
        return <User className="h-3.5 w-3.5" />;
    }
  };
  
  const getRoleLabel = (role: RoleType) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div className={cn(
      "status-badge inline-flex items-center gap-1.5",
      getRoleClasses(role),
      className
    )}>
      {showIcon && getRoleIcon(role)}
      {showLabel && <span>{getRoleLabel(role)}</span>}
    </div>
  );
}
