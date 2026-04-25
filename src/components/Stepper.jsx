import React from 'react';
import { CheckCircle, ChevronRight } from 'lucide-react';

const Stepper = ({ steps, currentStep }) => {
  return (
    <nav className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
      {steps.map((step, idx) => (
        <React.Fragment key={step.id}>
          <div className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border transition-all duration-500 ${
            currentStep >= step.id 
              ? 'border-primary/50 bg-primary/5 text-primary shadow-[0_0_20px_rgba(45,212,191,0.1)]' 
              : 'border-white/5 bg-white/[0.01] text-slate-600 opacity-50'
          }`}>
            <step.icon size={16} className={`${currentStep === step.id ? 'animate-pulse' : ''} sm:w-[18px] sm:h-[18px]`} />
            <span className="hidden sm:block text-[0.65rem] sm:text-sm font-black uppercase tracking-[0.2em]">{step.name}</span>
            {currentStep > step.id && <CheckCircle size={12} className="text-primary sm:w-[14px] sm:h-[14px]" />}
          </div>
          {idx < steps.length - 1 && (
            <ChevronRight size={14} className={`${currentStep > step.id ? 'text-primary' : 'text-slate-700'} sm:w-[16px] sm:h-[16px]`} />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Stepper;
