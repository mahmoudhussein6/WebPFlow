import React, { useState, useRef } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ImageComparison = ({ file, onClose }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 sm:bg-black/90 p-0 sm:p-6 lg:p-10 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="relative flex w-full sm:max-w-[1000px] h-full sm:h-auto sm:max-h-[90vh] flex-col gap-4 sm:gap-5 p-5 sm:p-8 rounded-none sm:rounded-[40px] bg-white/[0.01] border-none sm:border border-white/5 shadow-2xl backdrop-blur-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mt-8 sm:mt-0">
          <div>
            <h3 className="font-sora text-xl sm:text-2xl font-bold tracking-tight">Quality Comparison</h3>
            <p className="text-[0.8rem] sm:text-[0.9rem] font-medium text-slate-400 mt-1 line-clamp-1">{file.name}</p>
          </div>
          <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div 
          ref={containerRef}
          className="relative flex-1 sm:aspect-video w-full cursor-col-resize overflow-hidden rounded-2xl sm:rounded-[32px] bg-[#0c0c0e] select-none border border-white/5 shadow-inner min-h-[300px]"
          onMouseMove={handleMove}
          onTouchMove={handleMove}
        >
          {/* Base Layer: Optimized (After) */}
          <div className="absolute inset-0 h-full w-full">
            <img 
              src={file.compressedPreview || file.preview} 
              alt="After" 
              className="h-full w-full object-contain" 
            />
            <div className="absolute right-4 top-4 sm:right-6 sm:top-6 rounded-lg sm:rounded-xl bg-primary px-3 py-1.5 sm:px-4 sm:py-2 text-[0.65rem] sm:text-[0.75rem] font-black uppercase tracking-widest text-gray-950 shadow-lg z-10">
              Optimized
            </div>
          </div>

          {/* Sliding Layer: Original (Before) */}
          <div 
            className="absolute inset-0 h-full overflow-hidden border-r-2 border-primary shadow-[0_0_30px_rgba(45,212,191,0.3)] z-20"
            style={{ width: `${sliderPos}%` }}
          >
            <img 
              src={file.originalPreview} 
              alt="Before" 
              className="h-full object-contain max-w-none" 
              style={{ width: containerRef.current?.offsetWidth }}
            />
            <div className="absolute left-4 top-4 sm:left-6 sm:top-6 rounded-lg sm:rounded-xl bg-black/60 px-3 py-1.5 sm:px-4 sm:py-2 text-[0.65rem] sm:text-[0.75rem] font-black uppercase tracking-widest text-white backdrop-blur-md border border-white/10">
              Original
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute bottom-0 top-0 w-[2px] -translate-x-1/2 bg-primary pointer-events-none z-30"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-10 w-10 sm:h-14 sm:w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-gray-950 shadow-[0_0_20px_rgba(45,212,191,0.5)]">
              <Maximize2 size={20} className="rotate-45 sm:w-[24px] sm:h-[24px]" />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-5 text-[0.75rem] sm:text-[0.9rem] font-medium text-slate-500 italic text-center px-4 mt-auto sm:mt-0">
          Slide right to reveal original quality
        </div>
      </div>
    </motion.div>
  );
};

export default ImageComparison;
