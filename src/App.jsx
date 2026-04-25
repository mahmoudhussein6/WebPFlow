import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import HistoryPanel from './components/HistoryPanel';
import Stepper from './components/Stepper';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import { Loader2 } from 'lucide-react';

// Step Components - Lazy Loading for Performance
const Step1_Upload = React.lazy(() => import('./components/steps/Step1_Upload'));
const Step2_Configure = React.lazy(() => import('./components/steps/Step2_Configure'));
const Step3_Review = React.lazy(() => import('./components/steps/Step3_Review'));
const Step4_Export = React.lazy(() => import('./components/steps/Step4_Export'));

// Tools
const ImageComparison = React.lazy(() => import('./components/ImageComparison'));

import { AnimatePresence } from 'framer-motion';
import { Upload as UploadIcon, Settings as SettingsIcon, Eye, Package } from 'lucide-react';
import JSZip from 'jszip';
import { saveToHistory, getHistory, deleteFromHistory } from './utils/db';

function App() {
  // Global State
  const [files, setFiles] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [settings, setSettings] = useState({
    quality: 0.8,
    format: 'webp',
    maxWidth: null
  });
  const [isProcessingAll, setIsProcessingAll] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyItems, setHistoryItems] = useState([]);
  
  // Splash Screen State
  const [showSplash, setShowSplash] = useState(true);

  // Lifecycle
  useEffect(() => {
    refreshHistory();
    return () => {
      files.forEach(f => {
        if (f.preview) URL.revokeObjectURL(f.preview);
        if (f.originalPreview) URL.revokeObjectURL(f.originalPreview);
      });
    };
  }, []);

  // Database Handlers
  const refreshHistory = async () => {
    try {
      const items = await getHistory();
      setHistoryItems(items);
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  };

  const handleDeleteHistory = async (id) => {
    await deleteFromHistory(id);
    refreshHistory();
  };

  // Image Processing Engine
  const processImageInWorker = useCallback((fileObj, currentSettings) => {
    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL('./utils/processor.worker.js', import.meta.url), { type: 'module' });
      
      worker.onmessage = (e) => {
        const { success, compressedBlob, compressedSize, format, error } = e.data;
        if (success) {
          const preview = URL.createObjectURL(compressedBlob);
          resolve({ compressedBlob, compressedSize, format, preview });
        } else {
          reject(new Error(error));
        }
        worker.terminate();
      };

      worker.onerror = (err) => {
        reject(err);
        worker.terminate();
      };

      worker.postMessage({
        fileBlob: fileObj.originalFile,
        settings: currentSettings,
        id: fileObj.id
      });
    });
  }, []);

  // File Handlers
  const handleFilesAdded = (newFiles) => {
    const fileEntries = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      originalSize: file.size,
      originalFile: file,
      originalPreview: URL.createObjectURL(file),
      status: 'pending',
      preview: null,
      compressedSize: null,
      compressedBlob: null
    }));
    setFiles(prev => [...prev, ...fileEntries]);
    setCurrentStep(2);
  };

  const removeFile = (id) => {
    setFiles(prev => {
      const target = prev.find(f => f.id === id);
      if (target?.preview) URL.revokeObjectURL(target.preview);
      if (target?.originalPreview) URL.revokeObjectURL(target.originalPreview);
      const updated = prev.filter(f => f.id !== id);
      if (updated.length === 0) setCurrentStep(1);
      return updated;
    });
  };

  const clearAll = () => {
    files.forEach(f => {
      if (f.preview) URL.revokeObjectURL(f.preview);
      if (f.originalPreview) URL.revokeObjectURL(f.originalPreview);
    });
    setFiles([]);
    setCurrentStep(1);
  };

  // Optimization Trigger
  const processAll = async () => {
    setIsProcessingAll(true);
    const updatedFiles = [...files];
    const CONCURRENCY_LIMIT = 4;
    
    const queue = [...Array(updatedFiles.length).keys()].filter(i => updatedFiles[i].status !== 'completed');
    
    const processNext = async () => {
      if (queue.length === 0) return;
      const index = queue.shift();
      const file = updatedFiles[index];
      updatedFiles[index].status = 'processing';
      setFiles([...updatedFiles]);
      try {
        const result = await processImageInWorker(file, settings);
        const completedFile = { ...updatedFiles[index], ...result, status: 'completed' };
        updatedFiles[index] = completedFile;
        setFiles([...updatedFiles]);
        await saveToHistory(completedFile);
      } catch (err) {
        console.error('Worker error:', err);
        updatedFiles[index].status = 'error';
        setFiles([...updatedFiles]);
      }
      await processNext();
    };

    const workers = Array(Math.min(CONCURRENCY_LIMIT, queue.length)).fill(null).map(() => processNext());
    await Promise.all(workers);
    refreshHistory();
    setIsProcessingAll(false);
    setCurrentStep(3);
  };

  const downloadFile = (file) => {
    const link = document.createElement('a');
    link.href = file.preview || (file.blob ? URL.createObjectURL(file.blob) : '');
    const extension = file.format || settings.format;
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    link.download = `${nameWithoutExt}_optimized.${extension}`;
    link.click();
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    files.forEach(file => {
      if (file.compressedBlob) {
        const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        zip.file(`${nameWithoutExt}_optimized.${settings.format}`, file.compressedBlob);
      }
    });
    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'optimized_images.zip';
    link.click();
    setCurrentStep(4);
  };

  // Config
  const steps = useMemo(() => [
    { id: 1, name: 'Upload', icon: UploadIcon },
    { id: 2, name: 'Engine', icon: SettingsIcon },
    { id: 3, name: 'Review', icon: Eye },
    { id: 4, name: 'Export', icon: Package },
  ], []);

  const totalReduction = useMemo(() => {
    const original = files.reduce((acc, f) => acc + f.originalSize, 0);
    const compressed = files.reduce((acc, f) => acc + (f.compressedSize || 0), 0);
    return original > 0 ? Math.round(((original - compressed) / original) * 100) : 0;
  }, [files]);

  const stepTitles = {
    1: 'Upload Assets',
    2: 'Configure Engine',
    3: 'Review Optimization',
    4: 'Export Results'
  };

  return (
    <div className="flex min-h-screen flex-col font-outfit selection:bg-primary/30 overflow-hidden">
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <Helmet>
        <title>{`WebPFlow Studio | ${stepTitles[currentStep]}`}</title>
        <meta name="description" content="High-performance client-side WebP image optimizer." />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Helmet>

      <Header onOpenHistory={() => setIsHistoryOpen(true)} historyCount={historyItems.length} />
      
      <main className="flex-1 flex flex-col pt-8 sm:pt-12 pb-12 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="mx-auto w-full max-w-[1500px] flex flex-col h-full gap-8 sm:gap-12">
          
          <Stepper steps={steps} currentStep={currentStep} />

          <div className="flex-1 relative">
            <React.Suspense fallback={<div className="flex h-full items-center justify-center"><Loader2 className="animate-spin text-primary" size={40} /></div>}>
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <Step1_Upload onFilesAdded={handleFilesAdded} />
                )}

                {currentStep === 2 && (
                  <Step2_Configure 
                    settings={settings}
                    onSettingsChange={(newSettings) => setSettings(prev => ({ ...prev, ...newSettings }))}
                    onProcess={processAll}
                    isProcessing={isProcessingAll}
                    onClear={clearAll}
                  />
                )}

                {currentStep === 3 && (
                  <Step3_Review 
                    files={files}
                    onAdjust={() => setCurrentStep(2)}
                    onApprove={() => setCurrentStep(4)}
                    onRemove={removeFile}
                    onDownload={downloadFile}
                    onPreview={setPreviewFile}
                  />
                )}

                {currentStep === 4 && (
                  <Step4_Export 
                    totalReduction={totalReduction}
                    onDownloadAll={downloadAll}
                    onNewProject={clearAll}
                  />
                )}
              </AnimatePresence>
            </React.Suspense>
          </div>
        </div>
      </main>

      <Footer />

      <React.Suspense fallback={null}>
        <HistoryPanel 
          history={historyItems} 
          isOpen={isHistoryOpen} 
          onClose={() => setIsHistoryOpen(false)} 
          onDelete={handleDeleteHistory}
          onDownload={downloadFile}
        />

        <AnimatePresence>
          {previewFile && (
            <ImageComparison 
              file={previewFile} 
              onClose={() => setPreviewFile(null)} 
            />
          )}
        </AnimatePresence>
      </React.Suspense>
    </div>
  );
}

export default App;
