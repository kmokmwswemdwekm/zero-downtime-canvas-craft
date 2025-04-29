
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { DowntimeChart } from "@/components/dashboard/downtime-chart";
import { CalendarPreview } from "@/components/dashboard/calendar-preview";
import { GlassCard } from "@/components/ui/glass-card";
import { Bell, Settings, User } from "lucide-react";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren", 
        staggerChildren: 0.1 
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-darkBg p-4 md:p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm">
              <Bell size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm">
              <Settings size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm">
              <User size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </motion.div>
        
        {/* Summary Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <SummaryCard 
            title="Total Equipment" 
            value={loading ? "—" : "284"} 
            loading={loading}
            status="success"
          />
          <SummaryCard 
            title="Health Status" 
            value={loading ? "—" : "97%"} 
            loading={loading}
            status="success"
            trend="up"
            trendValue="2.3% from last month"
          />
          <SummaryCard 
            title="Active Alerts" 
            value={loading ? "—" : "5"} 
            loading={loading}
            status="warning"
            trend="down"
            trendValue="3 fewer than yesterday"
          />
          <SummaryCard 
            title="Maintenance Due" 
            value={loading ? "—" : "12"} 
            loading={loading}
            status="warning"
          />
        </motion.div>
        
        {/* Charts and Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <DowntimeChart />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <CalendarPreview />
          </motion.div>
        </div>
        
        {/* Footer Quote */}
        <motion.div 
          variants={itemVariants} 
          className="mt-8 text-center"
        >
          <GlassCard className="inline-block px-8 py-3">
            <p className="italic text-muted-foreground">
              "Zero Downtime is Possible."
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
