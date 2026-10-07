import React from 'react';
import { GraduationCap, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#090b14] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold shadow-sm">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base tracking-tight">StudyBG</span>
                <span className="text-[10px] uppercase font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700/60">
                  Образователна платформа
                </span>
              </div>
              <span className="text-xs text-slate-400 block mt-0.5">
                Ефективна подготовка за училище, НВО и ДЗИ по стандартите на МОН.
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end text-xs text-slate-400 gap-1">
            <div className="flex items-center gap-1.5 text-slate-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Съобразено с държавните образователни изисквания</span>
            </div>
            <div className="text-slate-400 text-[11px]">
              © {new Date().getFullYear()} StudyBG. Всички права запазени.
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
