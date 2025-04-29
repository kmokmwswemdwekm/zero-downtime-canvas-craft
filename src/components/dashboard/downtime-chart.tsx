
import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";

// Sample data
const dummyData = [
  { name: "Jan", downtime: 2.5 },
  { name: "Feb", downtime: 3.8 },
  { name: "Mar", downtime: 1.2 },
  { name: "Apr", downtime: 4.5 },
  { name: "May", downtime: 2.1 },
  { name: "Jun", downtime: 0.8 },
  { name: "Jul", downtime: 1.5 },
];

export function DowntimeChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setChartData(dummyData);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <GlassCard className="h-[300px]">
      <h3 className="text-lg font-medium mb-4">Downtime Percentage</h3>
      
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-[calc(100%-2rem)]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
          />
        </div>
      ) : (
        <motion.div 
          className="h-[calc(100%-2rem)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={(value) => `${value}%`}
                domain={[0, 'dataMax + 1']}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Downtime']} 
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="downtime" 
                stroke="#FF4A4A" 
                fill="#FF4A4A20" 
                activeDot={{ r: 8 }} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </GlassCard>
  );
}
