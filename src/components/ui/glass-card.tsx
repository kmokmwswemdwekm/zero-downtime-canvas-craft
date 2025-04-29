
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  role?: "admin" | "tech" | "viewer";
  animate?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  role, 
  animate = true,
  ...props 
}: GlassCardProps) {
  const roleBgClass = role ? `${role}-bg` : "";
  
  const cardProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
    className: cn(
      "glass-card rounded-xl p-6", 
      roleBgClass,
      className
    ),
    ...props
  } : {
    className: cn(
      "glass-card rounded-xl p-6", 
      roleBgClass,
      className
    ),
    ...props
  };

  return animate ? (
    <motion.div {...cardProps}>
      {children}
    </motion.div>
  ) : (
    <div className={cardProps.className} {...props}>
      {children}
    </div>
  );
}
