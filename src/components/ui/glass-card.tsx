
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
  
  // Fixed by separating props that go to the motion.div vs div
  const commonProps = {
    className: cn(
      "glass-card rounded-xl p-6", 
      roleBgClass,
      className
    ),
    ...props
  };

  // Animation props specifically for motion.div
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {};

  return animate ? (
    <motion.div {...commonProps} {...animationProps}>
      {children}
    </motion.div>
  ) : (
    <div {...commonProps}>
      {children}
    </div>
  );
}
