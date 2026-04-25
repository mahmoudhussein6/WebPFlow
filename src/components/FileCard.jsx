import React, { memo } from 'react';
import { Trash2, Download, Eye, FileImage, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const formatSize = (bytes) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const FileCard = memo(({ file, onRemove, onDownload, onPreview }) => {
  const reduction = file.compressedSize 
    ? Math.round(((file.originalSize - file.compressedSize) / file.originalSize) * 100)
    : 0;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative flex flex-col overflow-hidden rounded-[24px] bg-white/[0.02] border border-white/5 p-4 transition-all hover:bg-white/[0.04] hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5"
    >
      <div className="flex gap-4">
        {/* Preview Thumbnail */}
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-black/40 border border-white/5 shadow-inner">
          {file.originalPreview ? (
            <img 
              src={file.originalPreview} 
              alt={file.name} 
              className="h-full w-full object-cover transition-transform group-hover:scale-110" 
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-700">
              <FileImage size={24} />
            </div>
          )}
          
          {/* Status Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 transition-opacity group-hover:opacity-100">
            {file.status === 'completed' && (
              <button 
                onClick={() => onPreview(file)}
                className="p-2 rounded-full bg-primary text-gray-950 shadow-lg hover:scale-110 transition-transform"
              >
                <Eye size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="truncate text-sm font-bold text-white/90" title={file.name}>
              {file.name}
            </h4>
            <button 
              onClick={() => onRemove(file.id)}
              className="text-slate-600 hover:text-rose-500 transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-[0.65rem] font-black uppercase tracking-widest">
              {file.status === 'pending' && <span className="text-slate-500">Waiting</span>}
              {file.status === 'processing' && <span className="text-primary animate-pulse flex items-center gap-1"><Loader2 size={10} className="animate-spin" /> Engine Active</span>}
              {file.status === 'completed' && <span className="text-primary flex items-center gap-1"><CheckCircle size={10} /> Optimized</span>}
              {file.status === 'error' && <span className="text-rose-500 flex items-center gap-1"><AlertCircle size={10} /> Fail</span>}
            </div>
            {file.status === 'completed' && (
              <div className="ml-auto rounded-md bg-primary/10 px-1.5 py-0.5 text-[0.6rem] font-black text-primary border border-primary/20">
                -{reduction}%
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
        <div className="flex flex-col">
          <span className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-600">Original</span>
          <span className="text-[0.7rem] font-black text-slate-400">{formatSize(file.originalSize)}</span>
        </div>
        
        {file.status === 'completed' && (
          <>
            <div className="h-6 w-[1px] bg-white/5"></div>
            <div className="flex flex-col text-right">
              <span className="text-[0.6rem] font-bold uppercase tracking-widest text-primary">WebP Output</span>
              <span className="text-[0.7rem] font-black text-white">{formatSize(file.compressedSize)}</span>
            </div>
          </>
        )}
      </div>

      {/* Quick Action Button */}
      {file.status === 'completed' && (
        <button 
          onClick={() => onDownload(file)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 py-2 text-[0.7rem] font-black uppercase tracking-widest text-white transition-all hover:bg-primary hover:text-gray-950"
        >
          <Download size={12} /> Save Asset
        </button>
      )}
    </motion.div>
  );
});

// Extra helper for the X icon which was missing in the previous snippet
const X = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export default FileCard;
