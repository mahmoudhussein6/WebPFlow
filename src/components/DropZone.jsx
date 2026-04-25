import React, { useCallback, useState } from 'react';
import { Upload, ShieldCheck, Zap, Layers, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const DropZone = ({ onFilesAdded }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesAdded(files);
    }
  }, [onFilesAdded]);

  const handleFileInput = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFilesAdded(files);
    }
  }, [onFilesAdded]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative h-full min-h-[400px] sm:min-h-[600px] cursor-pointer rounded-[32px] sm:rounded-[40px] border transition-all duration-500 overflow-hidden ${
        isDragging 
          ? 'border-primary bg-primary/5 shadow-[0_0_60px_rgba(45,212,191,0.15)] scale-[1.01]' 
          : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 shadow-2xl'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('fileInput').click()}
    >
      <input 
        id="fileInput"
        type="file" 
        multiple 
        accept="image/*"
        className="hidden"
        onChange={handleFileInput}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-14 text-center">
        <motion.div 
          animate={{ 
            y: isDragging ? -20 : 0,
            scale: isDragging ? 1.1 : 1
          }}
          className="mb-6 sm:mb-10"
        >
          <div className={`relative flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-[24px] sm:rounded-[32px] transition-all duration-500 ${
            isDragging ? 'bg-primary text-gray-950' : 'bg-white/5 text-slate-500'
          }`}>
            {isDragging ? <Zap size={40} className="sm:w-[56px] sm:h-[56px]" /> : <Upload size={40} className="sm:w-[56px] sm:h-[56px]" />}
            <div className="absolute -inset-4 sm:-inset-6 rounded-full border border-primary/10 animate-pulse opacity-20"></div>
          </div>
        </motion.div>

        <h2 className="font-sora mb-3 sm:mb-4 text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Transform your <span className="text-primary">Assets</span>
        </h2>
        <p className="mx-auto mb-8 sm:mb-12 max-w-[600px] text-base sm:text-xl font-medium text-slate-500 leading-relaxed px-4">
          High-performance client-side optimization. <br className="hidden md:block" />
          Drop your files to engage the transformation engine.
        </p>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-extrabold rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-secondary text-gray-950 shadow-lg shadow-primary/20 transition-all hover:brightness-110 hover:scale-[1.02] active:scale-95 group">
            <Sparkles size={18} className="group-hover:rotate-12 transition-transform sm:w-[20px] sm:h-[20px]" />
            Upload Images
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-extrabold rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white transition-all hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 active:scale-95">
            View Engine
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-8 sm:gap-16 border-t border-white/5 pt-8 sm:pt-12">
          <div className="flex items-center gap-2 sm:gap-3 text-[0.65rem] sm:text-[0.85rem] font-black uppercase tracking-widest text-slate-600">
            <ShieldCheck size={16} className="text-primary sm:w-[20px] sm:h-[20px]" />
            <span>Local Engine</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-[0.65rem] sm:text-[0.85rem] font-black uppercase tracking-widest text-slate-600">
            <Layers size={16} className="text-secondary sm:w-[20px] sm:h-[20px]" />
            <span>Multi-Core v4.2</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DropZone;
