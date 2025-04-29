
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HTMLMotionProps } from "framer-motion";

interface GlassCardProps {
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
}: GlassCardProps & Omit<HTMLMotionProps<"div">, keyof GlassCardProps>) {
  const roleBgClass = role ? `${role}-bg` : "";
  
  const commonClassName = cn(
    "glass-card rounded-xl p-6", 
    roleBgClass,
    className
  );

  // Animation props specifically for motion.div
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {};

  return animate ? (
    <motion.div className={commonClassName} {...props} {...animationProps}>
      {children}
    </motion.div>
  ) : (
    <div className={commonClassName} {...props}>
      {children}
    </div>
  );
}
