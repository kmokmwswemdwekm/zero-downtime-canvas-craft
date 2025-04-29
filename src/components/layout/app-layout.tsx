
import { useState } from "react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  role?: "admin" | "tech" | "viewer";
}

export function AppLayout({ role = "viewer" }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="min-h-screen flex">
      <SidebarNav 
        role={role}
        collapsed={sidebarCollapsed}
        toggleCollapsed={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <motion.div 
        className="flex-1"
        animate={{ 
          marginLeft: sidebarCollapsed ? 70 : 250 
        }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
}
