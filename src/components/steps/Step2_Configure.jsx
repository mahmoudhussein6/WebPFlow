import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Sparkles, Trash2 } from 'lucide-react';
import ControlPanel from '../ControlPanel';

const Step2_Configure = ({ settings, onSettingsChange, onProcess, isProcessing, onClear }) => {
  return (
    <motion.div 
      key="step2"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="flex flex-col items-center w-full h-full gap-8 sm:gap-12"
    >
      <div className="w-full max-w-[1200px] flex flex-col gap-10">
        <div className="text-center">
          <h3 className="font-sora text-3xl sm:text-5xl font-black tracking-tight mb-3 text-white">Engine Config</h3>
          <p className="text-slate-500 text-lg font-medium italic">Fine-tune the transformation engine parameters</p>
        </div>
        
        <ControlPanel 
          settings={settings} 
          onSettingsChange={onSettingsChange} 
        />
        
        <div className="flex flex-col gap-3 max-w-[600px] mx-auto w-full">
          <button 
            className="w-full flex items-center justify-center gap-3 px-8 sm:px-12 py-5 sm:py-6 text-lg sm:text-xl font-extrabold rounded-2xl bg-gradient-to-br from-primary to-secondary text-gray-950 shadow-2xl shadow-primary/40 transition-all hover:brightness-110 active:scale-95 group disabled:opacity-50" 
            onClick={onProcess}
            disabled={isProcessing}
          >
            {isProcessing ? <Loader2 size={24} className="animate-spin" /> : <Sparkles size={24} />}
            {isProcessing ? 'Engaging Engine...' : 'Optimize Collection'}
          </button>
          <button 
            className="w-full flex items-center justify-center gap-2 rounded-2xl p-4 border border-white/5 bg-white/5 text-slate-500 hover:text-rose-500 hover:border-rose-500/20 transition-all text-xs font-black uppercase tracking-widest" 
            onClick={onClear}
          >
            <Trash2 size={12} /> Abandon Session
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Step2_Configure;
