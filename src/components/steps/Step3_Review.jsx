import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ChevronRight } from 'lucide-react';
import FileCard from '../FileCard';

const Step3_Review = ({ files, onAdjust, onApprove, onRemove, onDownload, onPreview }) => {
  return (
    <motion.div 
      key="step3"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="flex flex-col h-full gap-8 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 sm:px-10 py-6 sm:py-8 rounded-[30px] sm:rounded-[40px] bg-white/[0.01] border border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-xl sm:rounded-[24px] bg-primary/10 text-primary border border-primary/20">
            <Eye size={24} className="sm:w-[36px] sm:h-[36px]" />
          </div>
          <div>
            <h2 className="font-sora text-xl sm:text-3xl font-black tracking-tight text-white">Quality Review</h2>
            <p className="text-[0.7rem] sm:text-slate-500 font-medium mt-1">Review optimized assets before export.</p>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-4 w-full md:w-auto">
          <button 
            className="flex-1 md:flex-none border border-white/10 bg-white/5 text-white hover:bg-white/10 px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-xs sm:text-base transition-all"
            onClick={onAdjust}
          >
            Adjust
          </button>
          <button 
            className="flex-[2] md:flex-none flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-12 py-3 sm:py-4 text-sm sm:text-lg font-extrabold rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-secondary text-gray-950 shadow-xl sm:shadow-2xl shadow-primary/40 transition-all hover:brightness-110" 
            onClick={onApprove}
          >
            Approve <ChevronRight size={16} className="sm:w-[20px] sm:h-[20px]" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 pb-6 custom-scrollbar">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {files.map(file => (
            <FileCard 
              key={file.id} 
              file={file} 
              onRemove={() => onRemove(file.id)}
              onDownload={onDownload}
              onPreview={onPreview}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Step3_Review;
