import fs from 'fs';

const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  '<div className="min-h-screen bg-black text-slate-300 font-sans selection:bg-red-600/30 overflow-hidden relative flex">',
  '<div className="h-[100dvh] bg-black text-slate-300 font-sans selection:bg-red-600/30 overflow-hidden relative flex flex-col md:flex-row">'
);

content = content.replace(
  '<aside className="w-20 md:w-64 border-r border-slate-800/50 bg-[#111111]/80 backdrop-blur-xl flex min-h-screen flex-col items-center md:items-start py-8 px-4 z-20 transition-all">',
  '<aside className="hidden md:flex w-64 shrink-0 border-r border-slate-800/50 bg-[#111111]/80 backdrop-blur-xl min-h-screen flex-col items-start py-8 px-4 z-20 transition-all">'
);

content = content.replace(
  '      {/* Main Content Area */}\n      <main className="flex-1 p-6 md:p-12 z-10 overflow-y-auto h-screen custom-scrollbar relative">',
  `      {/* Mobile Top Header (Brand) */}
      <header className="md:hidden shrink-0 flex items-center justify-between p-4 bg-[#111111]/90 backdrop-blur-xl border-b border-white/10 z-20 sticky top-0 w-full relative">
        <div className="absolute inset-x-0 bottom-[-1px] h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
        <div className="inline-flex flex-col">
          <span className="text-white font-display font-black text-2xl tracking-tighter leading-none mb-0.5">COSMOS</span>
          <div className="bg-red-600 h-3.5 w-full flex justify-end items-center px-1">
            <span className="text-white font-display font-bold text-[8px] leading-none tracking-widest drop-shadow-md">SPORT</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="p-2 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-12 z-10 overflow-y-auto min-h-0 relative pb-28 md:pb-12 w-full custom-scrollbar">`
);

content = content.replace(
  '      </main>\n    </div>',
  `      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-[76px] bg-[#0a0a0a]/95 backdrop-blur-3xl border-t border-white/5 z-50 flex items-center gap-1 justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        <button onClick={() => setActiveTab('overview')} className={cn("flex flex-col items-center justify-center w-full h-full gap-1.5 transition-all duration-300", activeTab === 'overview' ? "text-red-500 translate-y-[-2px]" : "text-slate-500 hover:text-slate-300")}>
          <User className="w-[22px] h-[22px]" />
          <span className="text-[10px] font-bold tracking-wider">ProCard</span>
        </button>
        <button onClick={() => setActiveTab('missions')} className={cn("flex flex-col items-center justify-center w-full h-full gap-1.5 transition-all duration-300", activeTab === 'missions' ? "text-red-500 translate-y-[-2px]" : "text-slate-500 hover:text-slate-300")}>
          <Layers className="w-[22px] h-[22px]" />
          <span className="text-[10px] font-bold tracking-wider">Missions</span>
        </button>
        <button onClick={() => setActiveTab('impact')} className={cn("flex flex-col items-center justify-center w-full h-full gap-1.5 transition-all duration-300", activeTab === 'impact' ? "text-red-500 translate-y-[-2px]" : "text-slate-500 hover:text-slate-300")}>
          <Target className="w-[22px] h-[22px]" />
          <span className="text-[10px] font-bold tracking-wider">Impact</span>
        </button>
        <button onClick={() => setActiveTab('scouter')} className={cn("flex flex-col items-center justify-center w-full h-full gap-1.5 transition-all duration-300", activeTab === 'scouter' ? "text-red-500 translate-y-[-2px]" : "text-slate-500 hover:text-slate-300")}>
          <Award className="w-[22px] h-[22px]" />
          <span className="text-[10px] font-bold tracking-wider">Scouter</span>
        </button>
      </nav>
    </div>`
);


fs.writeFileSync(file, content);
console.log('App wrapper layout transformed!');
