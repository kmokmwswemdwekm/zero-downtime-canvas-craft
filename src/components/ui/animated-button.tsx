
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedButton({ 
  children, 
  className, 
  ...props 
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Button 
        className={cn("relative overflow-hidden", className)} 
        {...props}
      >
        {isHovered && (
          <motion.span 
            className="absolute inset-0 bg-white/10"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
        {children}
      </Button>
    </motion.div>
  );
}
