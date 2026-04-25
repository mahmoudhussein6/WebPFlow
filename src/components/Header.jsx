import React from 'react';
import { Image, Sparkles, Cpu, History } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ onOpenHistory, historyCount }) => {
  return (
    <header className="w-full border-b border-white/5 bg-black/10 backdrop-blur-xl z-50 sticky top-0">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="relative group">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary to-secondary opacity-75 blur-md transition duration-500 group-hover:opacity-100"></div>
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-bg-dark border border-white/10">
              <Cpu size={26} className="text-primary" />
            </div>
          </div>
          <div>
            <h1 className="font-sora text-2xl font-extrabold tracking-tight">
              WebP<span className="text-primary">Flow</span>
            </h1>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary"></span>
              <p className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-500">
                Studio Edition
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6"
        >
          <div className="flex items-center gap-2">
            <button 
              onClick={onOpenHistory}
              className="relative flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-4 py-2 text-[0.8rem] font-bold text-slate-300 hover:bg-white/10 transition-all group"
            >
              <History size={16} className="group-hover:rotate-[-20deg] transition-transform" />
              <span>History</span>
              {historyCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.6rem] font-black text-gray-950 shadow-lg">
                  {historyCount}
                </span>
              )}
            </button>
            <div className="h-8 w-[1px] bg-white/10 mx-2 hidden md:block"></div>
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[0.8rem] font-bold text-primary">
              <Sparkles size={14} />
              <span>Local Engine Active</span>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
