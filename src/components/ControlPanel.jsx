import React from 'react';
import { Settings, Sliders, Maximize, FileType, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const ControlPanel = ({ settings, onSettingsChange }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/[0.01] backdrop-blur-[20px] border border-white/5 rounded-[24px] sm:rounded-[40px] shadow-2xl flex flex-col gap-10 p-8 sm:p-12 w-full"
    >
      <div className="flex items-center justify-between border-b border-white/5 pb-8">
        <div className="flex items-center gap-4">
          <div className="h-3 w-12 rounded-full bg-primary shadow-[0_0_15px_rgba(45,212,191,0.4)]"></div>
          <h3 className="font-sora text-xl sm:text-2xl font-black tracking-tight">Technical Parameters</h3>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-primary font-bold text-sm">
          <Settings size={18} />
          <span className="uppercase tracking-widest text-[0.7rem]">v4.2 Engine</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-16">
        {/* Quality Config */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-500">
              <Sliders size={16} className="text-primary" />
              <span>Compression</span>
            </div>
            <span className="text-2xl font-black text-primary font-sora">
              {Math.round(settings.quality * 100)}%
            </span>
          </div>
          <div className="relative pt-2">
            <input 
              type="range" 
              min="0.1" 
              max="1" 
              step="0.05" 
              value={settings.quality}
              onChange={(e) => onSettingsChange({ quality: parseFloat(e.target.value) })}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/5 accent-primary"
            />
            <div className="mt-4 flex justify-between text-[0.7rem] font-black text-slate-600 tracking-tighter">
              <span className="bg-white/5 px-2 py-0.5 rounded">ULTRA SMALL</span>
              <span className="bg-white/5 px-2 py-0.5 rounded">BALANCED</span>
              <span className="bg-white/5 px-2 py-0.5 rounded">MAX QUALITY</span>
            </div>
          </div>
          <p className="text-[0.75rem] text-slate-500 leading-relaxed font-medium">
            Higher values preserve more detail but result in larger file sizes.
          </p>
        </div>

        {/* Output Format */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-500">
            <FileType size={16} className="text-secondary" />
            <span>Target Format</span>
          </div>
          <div className="flex flex-col gap-3">
            {['webp', 'png', 'jpeg'].map(format => (
              <button
                key={format}
                onClick={() => onSettingsChange({ format })}
                className={`flex items-center justify-between rounded-2xl px-6 py-4 text-sm font-black transition-all ${
                  settings.format === format 
                    ? 'bg-primary text-gray-950 shadow-xl shadow-primary/20 scale-[1.02]' 
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:translate-x-1'
                }`}
              >
                <span className="uppercase tracking-[0.2em]">{format}</span>
                {settings.format === format && <Zap size={16} fill="currentColor" />}
              </button>
            ))}
          </div>
        </div>

        {/* Dimension Control */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-500">
            <Maximize size={16} className="text-accent" />
            <span>Resolution Scale</span>
          </div>
          <div className="relative group">
            <input 
              type="number" 
              placeholder="Width (Auto-Height)"
              value={settings.maxWidth || ''}
              onChange={(e) => onSettingsChange({ maxWidth: parseInt(e.target.value) || null })}
              className="w-full rounded-2xl border border-white/5 bg-white/5 p-5 text-sm font-bold text-white outline-none focus:border-primary/50 transition-all placeholder:text-slate-700"
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[0.75rem] font-black text-slate-500 bg-black/20 px-2 py-1 rounded-md">
              PX
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4">
            <p className="text-[0.75rem] font-bold text-slate-500 leading-relaxed">
              <span className="text-primary mr-1">Pro Tip:</span>
              Match the maximum width of your website's content container to avoid wasted pixels.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ControlPanel;
