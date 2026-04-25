import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const Step4_Export = ({ totalReduction, onDownloadAll, onNewProject }) => {
  return (
    <motion.div 
      key="step4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center h-full min-h-[400px] sm:min-h-[600px] text-center gap-8 sm:gap-10"
    >
      <div className="relative">
        <div className="absolute -inset-6 sm:-inset-10 rounded-full bg-primary opacity-10 blur-[60px] sm:blur-[100px] animate-pulse"></div>
        <div className="relative flex h-32 w-32 sm:h-48 sm:w-48 items-center justify-center rounded-[40px] sm:rounded-[56px] bg-white/[0.02] border border-primary/20 text-primary shadow-2xl">
          <Download size={60} strokeWidth={1} className="sm:w-[100px] sm:h-[100px]" />
        </div>
      </div>
      
      <div className="max-w-[700px] px-4">
        <h2 className="font-sora text-4xl sm:text-6xl font-black tracking-tight mb-3 sm:mb-4 text-white leading-tight">Ready for Export</h2>
        <p className="text-lg sm:text-2xl font-medium text-slate-500 leading-relaxed">
          Collection optimized. Total efficiency: 
          <span className="text-primary font-black ml-2 sm:ml-3 text-3xl sm:text-4xl">
            {totalReduction}%
          </span>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-2 w-full sm:w-auto px-6">
        <button 
          className="flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-16 py-6 sm:py-8 text-xl sm:text-2xl font-black rounded-[20px] sm:rounded-[24px] bg-gradient-to-br from-primary to-secondary text-gray-950 shadow-xl sm:shadow-[0_20px_50px_rgba(45,212,191,0.3)] transition-all hover:brightness-110 active:scale-95" 
          onClick={onDownloadAll}
        >
          <Download size={24} className="sm:w-[28px] sm:h-[28px]" /> Download ZIP
        </button>
        <button 
          className="flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-12 py-6 sm:py-8 text-lg sm:text-xl font-bold rounded-[20px] sm:rounded-[24px] bg-white/5 border border-white/10 text-white transition-all hover:bg-white/10 active:scale-95" 
          onClick={onNewProject}
        >
          New Project
        </button>
      </div>
    </motion.div>
  );
};

export default Step4_Export;
