import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<"admin" | "tech" | "viewer">("viewer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: role,
            }
          }
        });
        if (error) throw error;
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("Authentication error:", err);
      setError(err.message || "An error occurred during authentication");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-steelBlue to-machineDark bg-machine-pattern p-4">
      <motion.div
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <GlassCard role={role} className="shadow-xl">
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <h1 className="text-2xl font-bold">Zero Downtime</h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex justify-center mb-6 space-x-4">
              <button 
                onClick={() => setIsLogin(true)}
                className={`px-4 py-2 rounded-lg transition ${isLogin ? 'bg-primary text-white' : 'bg-transparent'}`}
              >
                Login
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`px-4 py-2 rounded-lg transition ${!isLogin ? 'bg-primary text-white' : 'bg-transparent'}`}
              >
                Signup
              </button>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <motion.div variants={itemVariants} className="space-y-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label>Select Role</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole("admin")}
                      className={`p-2 rounded border ${role === "admin" ? 'bg-admin text-white' : 'border-gray-700'}`}
                    >
                      Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("tech")}
                      className={`p-2 rounded border ${role === "tech" ? 'bg-tech text-gray-800' : 'border-gray-700'}`}
                    >
                      Technician
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("viewer")}
                      className={`p-2 rounded border ${role === "viewer" ? 'bg-viewer text-white' : 'border-gray-700'}`}
                    >
                      Viewer
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            {error && (
              <motion.div 
                variants={itemVariants} 
                className="mt-4 p-2 bg-destructive/20 text-destructive rounded-md text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="mt-6">
              <AnimatedButton type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : isLogin ? "Login" : "Create Account"}
              </AnimatedButton>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 dark:bg-gray-900 px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <AnimatedButton 
                  variant="outline" 
                  type="button"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={async () => {
                    try {
                      const { error } = await supabase.auth.signInWithOAuth({
                        provider: 'google',
                      });
                      if (error) throw error;
                      navigate("/dashboard");
                    } catch (err: any) {
                      console.error("Google sign-in error:", err);
                      setError(err.message || "Failed to sign in with Google");
                    }
                  }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span>Google</span>
                </AnimatedButton>
              </div>
            </motion.div>
          </form>
        </GlassCard>

        <motion.p 
          variants={itemVariants}
          className="text-center text-sm text-muted-foreground mt-4"
        >
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            className="underline text-primary"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
