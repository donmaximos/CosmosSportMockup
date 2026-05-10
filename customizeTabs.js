import fs from 'fs';

const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// ScouterView tabs wrapper
content = content.replace(
  '<div className="flex bg-[#111111]/80 backdrop-blur-md rounded-xl p-1 border border-white/10 shrink-0">',
  '<div className="flex w-full md:w-auto overflow-x-auto custom-scrollbar bg-[#111111]/80 backdrop-blur-md rounded-xl p-1 border border-white/10 shrink-0">'
);
// ScouterView Tab 1
content = content.replace(
  `className={cn("px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-colors whitespace-nowrap", activeTab === 'rewards' ? "bg-red-600 text-white" : "text-slate-400 hover:text-white")}`,
  `className={cn("flex-1 md:flex-none min-w-fit px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-colors whitespace-nowrap text-center", activeTab === 'rewards' ? "bg-red-600 text-white" : "text-slate-400 hover:text-white")}`
);
// ScouterView Tab 2
content = content.replace(
  `className={cn("px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-colors whitespace-nowrap", activeTab === 'recommendations' ? "bg-red-600 text-white" : "text-slate-400 hover:text-white")}`,
  `className={cn("flex-1 md:flex-none min-w-fit px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-colors whitespace-nowrap text-center", activeTab === 'recommendations' ? "bg-red-600 text-white" : "text-slate-400 hover:text-white")}`
);

// MissionsView tabs wrapper
content = content.replace(
  '<div className="flex bg-[#111111]/80 backdrop-blur-md rounded-xl p-1 border border-white/10">',
  '<div className="flex w-full md:w-auto overflow-x-auto custom-scrollbar bg-[#111111]/80 backdrop-blur-md rounded-xl p-1 border border-white/10 shrink-0">'
);
// MissionsView Tab 1
content = content.replace(
  `className={cn("px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-colors", activeTab === 'available' ? "bg-red-600 text-white" : "text-slate-400 hover:text-white")}`,
  `className={cn("flex-1 md:flex-none min-w-fit px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-colors text-center", activeTab === 'available' ? "bg-red-600 text-white" : "text-slate-400 hover:text-white")}`
);
// MissionsView Tab 2
content = content.replace(
  `className={cn("px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-colors", activeTab === 'completed' ? "bg-red-600 text-white" : "text-slate-400 hover:text-white")}`,
  `className={cn("flex-1 md:flex-none min-w-fit px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-colors text-center", activeTab === 'completed' ? "bg-red-600 text-white" : "text-slate-400 hover:text-white")}`
);

fs.writeFileSync(file, content);
console.log('Tabs styling for mobile updated!');
