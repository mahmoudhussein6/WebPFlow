import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sparkles } from 'lucide-react';

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + (Math.random() * 15);
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        filter: 'blur(20px)',
        transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0c] overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-secondary/20 blur-[120px]"
        />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Main Logo Animation */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative mb-12"
        >
          <div className="relative z-10 flex h-32 w-32 items-center justify-center rounded-[40px] bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 backdrop-blur-3xl shadow-[0_0_50px_rgba(45,212,191,0.2)]">
            <Cpu size={64} className="text-primary" />
          </div>
          
          {/* Rotating Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-20px] rounded-full border border-dashed border-primary/20"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-40px] rounded-full border border-dashed border-secondary/10"
          />
        </motion.div>

        {/* Text and Tagline */}
        <div className="text-center z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-sora text-5xl font-black tracking-tight text-white mb-2"
          >
            WebP<span className="text-primary">Flow</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-3 text-slate-500"
          >
            <div className="h-[1px] w-8 bg-white/10" />
            <span className="text-[0.65rem] font-black uppercase tracking-[0.5em]">Studio Edition v4.2</span>
            <div className="h-[1px] w-8 bg-white/10" />
          </motion.div>
        </div>

        {/* Technical HUD Loader */}
        <div className="mt-16 w-64">
          <div className="flex justify-between items-end mb-2">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[0.6rem] font-bold text-primary flex items-center gap-2"
            >
              <Sparkles size={10} />
              ENGAGING ENGINE
            </motion.div>
            <div className="text-[0.6rem] font-black text-slate-600">
              {Math.round(progress)}%
            </div>
          </div>
          
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
              layoutId="loader-bar"
            />
          </div>
          
          <div className="mt-4 flex justify-center gap-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="h-1 w-1 rounded-full bg-primary"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Technical Overlays */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 flex flex-col gap-1">
          <div className="h-1 w-10 bg-primary/40" />
          <div className="h-1 w-4 bg-primary/40" />
        </div>
        <div className="absolute bottom-10 right-10 flex flex-col items-end gap-1 text-[0.5rem] font-bold text-slate-700">
          <span>LATENCY: 1.2MS</span>
          <span>BUFFER: 512KB</span>
          <span>CORE: ACTIVE</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
