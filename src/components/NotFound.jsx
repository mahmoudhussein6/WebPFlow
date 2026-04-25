import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ChevronLeft, Cpu } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0c] p-6 text-center overflow-hidden relative">
      {/* Broken Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[50%] h-[50%] rounded-full bg-rose-500/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 max-w-xl"
      >
        {/* Error Icon */}
        <div className="relative mx-auto mb-12 flex h-32 w-32 items-center justify-center rounded-[40px] bg-white/[0.02] border border-white/5 shadow-2xl">
          <motion.div
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [0.95, 1, 0.95]
            }}
            transition={{ duration: 0.2, repeat: Infinity }}
          >
            <ShieldAlert size={64} className="text-rose-500" strokeWidth={1.5} />
          </motion.div>
          
          <div className="absolute -inset-4 rounded-[48px] border border-rose-500/20 animate-pulse" />
        </div>

        <h1 className="font-sora text-7xl font-black tracking-tighter text-white mb-4">
          4<span className="text-rose-500">0</span>4
        </h1>
        
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-black uppercase tracking-[0.3em] mb-8">
          <Cpu size={12} /> Signal Lost: Path Not Found
        </div>

        <p className="text-lg font-medium text-slate-500 leading-relaxed mb-12">
          The engine coordinates you requested do not exist. You may have navigated outside the Studio's operational parameters.
        </p>

        <button 
          onClick={() => navigate('/')}
          className="group flex items-center justify-center gap-3 mx-auto px-12 py-6 text-lg font-extrabold rounded-2xl bg-white/5 border border-white/10 text-white transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          Return to Studio
        </button>
      </motion.div>

      {/* Technical HUD Overlay */}
      <div className="absolute bottom-10 left-10 text-left opacity-20 hidden md:block">
        <div className="text-[0.6rem] font-bold text-slate-500 mb-2 font-mono">ERROR_LOG_DUMP:</div>
        <div className="flex flex-col gap-1 text-[0.5rem] text-slate-700 font-mono">
          <span>{`> ROUTE_FAILED: ${window.location.pathname}`}</span>
          <span>{`> STATUS: 0xDEADBEEF`}</span>
          <span>{`> ACTION: RETURNING_TO_BASE`}</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
