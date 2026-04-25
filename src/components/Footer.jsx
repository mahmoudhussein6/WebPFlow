import React from 'react';
import { Zap, Activity, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mx-auto mt-20 mb-10 w-full max-w-[1400px] border-t border-white/5 pt-16 px-8">
      <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <h3 className="mb-4 flex items-center gap-2 font-sora font-bold text-primary">
            <Zap size={20} /> Why WebP?
          </h3>
          <p className="text-[0.9rem] leading-relaxed text-slate-400 font-medium">
            WebP is a modern image format that provides superior lossless and lossy compression for images on the web. 
            WebP lossless images are 26% smaller in size compared to PNGs.
          </p>
        </div>
        <div>
          <h3 className="mb-4 flex items-center gap-2 font-sora font-bold text-secondary">
            <Activity size={20} /> SEO Benefits
          </h3>
          <p className="text-[0.9rem] leading-relaxed text-slate-400 font-medium">
            Smaller image sizes lead to faster page loads, which is a key factor in Google's Search Ranking. 
            Optimizing images can significantly improve your Core Web Vitals score.
          </p>
        </div>
        <div>
          <h3 className="mb-4 flex items-center gap-2 font-sora font-bold text-accent">
            <Shield size={20} /> 100% Private
          </h3>
          <p className="text-[0.9rem] leading-relaxed text-slate-400 font-medium">
            Unlike other converters, your images never touch our servers. All processing happens 
            locally in your browser using JavaScript and Canvas API.
          </p>
        </div>
      </div>

      <div className="mb-10 p-10 text-center rounded-[32px] bg-white/[0.01] border border-white/5 backdrop-blur-md shadow-inner">
        <h4 className="mb-4 font-sora font-bold text-lg">Optimization Tips</h4>
        <ul className="flex flex-wrap justify-center gap-8 text-[0.85rem] font-bold uppercase tracking-widest text-slate-500">
          <li>• Use 80% quality</li>
          <li>• Match display width</li>
          <li>• Convert PNG to WebP</li>
          <li>• Batch process images</li>
        </ul>
      </div>

      <div className="flex flex-col items-center justify-between gap-6 text-[0.8rem] font-bold uppercase tracking-widest text-slate-600 md:flex-row border-t border-white/5 pt-10">
        <p>© 2026 WebPFlow. Studio Edition v4.2</p>
        <div className="flex gap-8">
          <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-primary cursor-pointer transition-colors">Documentation</span>
          <span className="hover:text-primary cursor-pointer transition-colors">GitHub</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
