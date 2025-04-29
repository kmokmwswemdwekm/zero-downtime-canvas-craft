
import { motion } from "framer-motion";
import { EquipmentTable } from "@/components/equipment/equipment-table";
import { GlassCard } from "@/components/ui/glass-card";
import { Plus } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";

const EquipmentInventory = () => {
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
      className="min-h-screen bg-gradient-to-br from-steelBlue to-machineDark bg-machine-pattern p-4 md:p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Equipment Inventory</h1>
          <AnimatedButton className="flex items-center gap-2">
            <Plus size={16} />
            Add Equipment
          </AnimatedButton>
        </motion.div>
        
        {/* Stats Summary */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <GlassCard className="text-center">
            <p className="text-muted-foreground text-sm">Total Items</p>
            <p className="text-2xl font-bold">284</p>
          </GlassCard>
          <GlassCard className="text-center">
            <p className="text-muted-foreground text-sm">Categories</p>
            <p className="text-2xl font-bold">12</p>
          </GlassCard>
          <GlassCard className="text-center">
            <p className="text-muted-foreground text-sm">Needing Attention</p>
            <p className="text-2xl font-bold text-statusWarning">17</p>
          </GlassCard>
          <GlassCard className="text-center">
            <p className="text-muted-foreground text-sm">Critical Status</p>
            <p className="text-2xl font-bold text-statusDanger">5</p>
          </GlassCard>
        </motion.div>
        
        {/* Equipment Table */}
        <motion.div variants={itemVariants}>
          <GlassCard>
            <EquipmentTable />
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EquipmentInventory;
