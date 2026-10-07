import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-[#0a0c16] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-400 text-white font-bold text-sm">
              🎯
            </div>
            <div>
              <span className="font-extrabold text-white text-base">StudyBG</span>
              <span className="text-xs text-slate-400 block">
                Снимай тетрадката. Научи урока за 5 минути.
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-400 text-center md:text-right">
            <div>Създадено за български ученици, студенти и матуранти 🇧🇬</div>
            <div className="mt-1 text-slate-500 font-mono text-[11px]">
              Indigo #6366f1 • Electric Blue • Mint Green
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
