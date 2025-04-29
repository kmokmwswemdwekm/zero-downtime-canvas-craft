
import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { format, addDays, startOfWeek } from "date-fns";

// Mock maintenance events
const events = [
  { id: 1, title: "Generator Maintenance", date: addDays(new Date(), 2) },
  { id: 2, title: "HVAC Checkup", date: addDays(new Date(), 4) },
  { id: 3, title: "Pump Inspection", date: addDays(new Date(), 1) },
];

export function CalendarPreview() {
  const [currentDate] = useState(new Date());
  
  // Get the current week
  const weekStart = startOfWeek(currentDate);
  const weekDays = [...Array(7)].map((_, i) => addDays(weekStart, i));

  return (
    <GlassCard>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Upcoming Maintenance</h3>
        <button className="text-sm text-primary">View All</button>
      </div>
      
      <div className="space-y-4">
        {/* Week days header */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
          {weekDays.map((day, i) => (
            <div key={i} className="py-1">
              <div>{format(day, "EEE")}</div>
              <div className={`font-semibold ${
                format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") 
                  ? "text-primary" 
                  : ""
              }`}>
                {format(day, "d")}
              </div>
            </div>
          ))}
        </div>
        
        {/* Events */}
        <div className="space-y-2">
          {events.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ scale: 1.02 }}
              className="bg-background/50 p-3 rounded-md border border-border flex justify-between"
            >
              <div>
                <div className="font-medium">{event.title}</div>
                <div className="text-xs text-muted-foreground">
                  {format(event.date, "EEEE, MMMM d")}
                </div>
              </div>
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
