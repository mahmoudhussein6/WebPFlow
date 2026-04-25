import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Download, Clock, History as HistoryIcon, FileImage } from 'lucide-react';

const formatSize = (bytes) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const HistoryPanel = ({ history, isOpen, onClose, onDelete, onDownload }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-[110] w-full max-w-[450px] bg-bg-dark border-l border-white/5 shadow-2xl p-8 flex flex-col gap-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <HistoryIcon size={24} />
                </div>
                <div>
                  <h3 className="font-sora text-2xl font-black tracking-tight text-white">Studio History</h3>
                  <p className="text-sm font-medium text-slate-500">Persistent local optimizations</p>
                </div>
              </div>
              <button onClick={onClose} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-10 opacity-30">
                  <Clock size={60} className="mb-4" />
                  <p className="text-lg font-bold">No history yet</p>
                  <p className="text-sm">Optimized images will appear here automatically.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {history.map((item) => (
                    <motion.div 
                      layout
                      key={item.id}
                      className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-4 transition-all hover:bg-white/[0.04] hover:border-primary/20"
                    >
                      <div className="flex gap-4">
                        <div className="h-16 w-16 flex-shrink-0 rounded-xl bg-black/40 flex items-center justify-center text-primary border border-white/5 overflow-hidden">
                          {item.blob ? (
                            <img src={URL.createObjectURL(item.blob)} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <FileImage size={24} />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-bold text-white truncate mb-1">{item.name}</h4>
                          <div className="flex items-center gap-3 text-[0.7rem] font-bold">
                            <span className="text-primary">{formatSize(item.compressedSize)}</span>
                            <span className="text-slate-600 line-through">{formatSize(item.originalSize)}</span>
                            <span className="text-slate-500 ml-auto uppercase tracking-tighter">{item.format}</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute right-2 bottom-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
                        <button 
                          onClick={() => onDelete(item.id)}
                          className="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                        <button 
                          onClick={() => onDownload(item)}
                          className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/5">
              <p className="text-[0.7rem] font-medium text-slate-600 leading-relaxed text-center italic">
                Optimizations are stored locally in your browser's IndexedDB and never touch our servers.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HistoryPanel;
