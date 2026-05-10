import fs from 'fs';

const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Scouter: Add tabs for 'rewards' | 'recommendations'
const newScouterStart = `function ScouterView() {
  const [activeTab, setActiveTab] = useState<'rewards' | 'recommendations'>('rewards');
  const [selectedColleague, setSelectedColleague] = useState<any>(null);

  const recommendations = [
    { id: 1, name: 'Chloe', role: 'Υποψήφια Frontend Engineer', xp: 260, status: 'Εκκρεμούν', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80' },
    { id: 2, name: 'Μάρκος', role: 'Υποψήφιος Store Manager', xp: 400, status: 'Ολοκληρώθηκε', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 w-full max-w-6xl mx-auto"
    >
      {/* Background for Scouter view */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-black/80 mix-blend-multiply" />
        <img 
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2000&q=80" 
          alt="Office Background"
          className="w-full h-full object-cover filter blur-md opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight uppercase">
            Cosmos <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">Scouter</span>
          </h1>
          <p className="text-slate-400 mt-2 font-mono text-sm tracking-widest uppercase">
            Σύστημα Ανταμοιβής Συστάσεων
          </p>
        </div>
        <div className="flex bg-[#111111]/80 backdrop-blur-md rounded-xl p-1 border border-white/10 shrink-0">
          <button 
            onClick={() => { setActiveTab('rewards'); setSelectedColleague(null); }}
            className={cn("px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-colors whitespace-nowrap", activeTab === 'rewards' ? "bg-red-600 text-white" : "text-slate-400 hover:text-white")}
          >
            Ανταμοιβές
          </button>
          <button 
            onClick={() => setActiveTab('recommendations')}
            className={cn("px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-colors whitespace-nowrap", activeTab === 'recommendations' ? "bg-red-600 text-white" : "text-slate-400 hover:text-white")}
          >
            Οι Συστάσεις μου
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      {activeTab === 'rewards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RewardCard 
            title="Συλλεκτικά Αθλητικά Cosmos"
            cost="500 XP"
            image="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80"
            progress={100}
            icon={<Zap className="w-4 h-4 text-red-100" />}
          />
          <RewardCard 
            title="Δώρο 2 Εισiτήρια Ευρωλίγκα"
            cost="600 XP"
            image="https://images.unsplash.com/photo-1504450758481-7338ba7524a7?auto=format&fit=crop&w=400&q=80"
            progress={80}
            icon={<Target className="w-4 h-4 text-red-500" />}
          />
          <RewardCard 
            title="Βελτίωση Εξοπλισμού (A/C, Καρέκλες)"
            cost="800 XP"
            image="https://images.unsplash.com/photo-1598257006626-48b0c252070d?auto=format&fit=crop&w=400&q=80"
            progress={86}
            icon={<Star className="w-4 h-4 text-red-500" />}
          />
          <div className="lg:col-span-3 mt-4 bg-gradient-to-br from-red-700/20 to-red-700/10 border border-red-600/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent animate-shimmer" />
            <div className="relative z-10 flex-1">
              <h4 className="font-bold text-white text-xl mb-2">Mπόνους Scouter</h4>
              <p className="text-slate-300 text-sm">Πρότεινε έναν ακόμα φίλο πριν το τέλος της σεζόν για πολλαπλασιαστή 1.5x XP.</p>
            </div>
            <button 
              onClick={() => { setActiveTab('recommendations'); setSelectedColleague('new'); }}
              className="relative z-10 shrink-0 px-8 py-4 rounded-xl bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.4)] text-white hover:scale-105 transition-all font-bold tracking-wide uppercase"
            >
              Υποβολή Νέας Σύστασης
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List of recommendations */}
          <div className="lg:col-span-1 space-y-4">
             {selectedColleague !== 'new' && (
              <button 
                onClick={() => setSelectedColleague('new')}
                className="w-full mb-2 bg-[#111]/80 hover:bg-white/5 border border-dashed border-red-500/50 hover:border-red-500 text-red-400 p-4 rounded-2xl flex items-center justify-center gap-2 transition-all font-bold tracking-wider"
              >
                + ΥΠΟΒΟΛΗ ΝΕΑΣ ΣΥΣΤΑΣΗΣ
              </button>
             )}
             {recommendations.map(person => (
               <button 
                 key={person.id}
                 onClick={() => setSelectedColleague(person)}
                 className={cn("w-full text-left bg-white/[0.03] backdrop-blur-md rounded-2xl p-4 border transition-all flex items-center gap-4", selectedColleague?.id === person.id ? "border-red-500 bg-red-500/10" : "border-white/10 hover:border-white/30")}
               >
                 <img src={person.img} className="w-12 h-12 rounded-full object-cover border border-white/20" alt={person.name} />
                 <div className="flex-1 min-w-0">
                   <h4 className="text-white font-bold truncate">{person.name}</h4>
                   <p className="text-xs text-slate-400 truncate mt-1">{person.role}</p>
                 </div>
                 {person.status === 'Εκκρεμούν' && <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,1)]"></div>}
               </button>
             ))}
          </div>

          {/* Details / Timeline / Form */}
          <div className="lg:col-span-2">
            {!selectedColleague ? (
              <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <Target className="w-16 h-16 text-slate-700 mb-6" />
                <h3 className="text-xl font-bold text-slate-400">Επιλέξτε μια σύσταση για λεπτομέρειες</h3>
              </div>
            ) : selectedColleague === 'new' ? (
              <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <h3 className="text-2xl font-bold text-white mb-6">Νέα Σύσταση</h3>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Η σύσταση καταχωρήθηκε!'); setSelectedColleague(recommendations[0]); }}>
                  <div>
                    <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">Ονοματεπώνυμο</label>
                    <input type="text" required className="w-full bg-[#111]/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-red-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">Άνέβασμα Βιογραφικού</label>
                    <input type="file" required className="w-full bg-[#111]/80 border border-dashed border-slate-700 rounded-xl px-4 py-6 text-slate-400 focus:border-red-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">Σόλια / Σημειώσεις</label>
                    <textarea rows={3} className="w-full bg-[#111]/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-red-500 outline-none resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full py-4 bg-red-600 rounded-xl font-bold tracking-widest text-white uppercase hover:bg-red-500 transition-colors">
                    ΚΑΤΑΧΩΡΗΣΗ
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">
                <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-center gap-4 mb-10 relative z-10">
                  <div className="w-16 h-16 rounded-full border-2 border-red-500/50 p-1 bg-[#222222]">
                    <img 
                      src={selectedColleague.img} 
                      alt={selectedColleague.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">{selectedColleague.name}</h3>
                    <p className="text-red-500 font-mono text-sm">{selectedColleague.role}</p>
                  </div>
                  <div className="ml-auto bg-[#111]/80 text-white font-mono px-4 py-2 rounded-xl border border-white/10">
                    {selectedColleague.xp} XP
                  </div>
                </div>

                <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-800 space-y-12 pb-4 z-10">
                  <TimelineStep 
                    status="completed"
                    icon={<CheckCircle2 className="w-5 h-5 text-red-500" />}
                    title={\`Η σύσταση καταχωρήθηκε\`}
                    xp="+10 XP"
                    date="Oct 12"
                  />
                  <TimelineStep 
                    status={selectedColleague.status === 'Ολοκληρώθηκε' ? "completed" : "active"}
                    icon={selectedColleague.status === 'Ολοκληρώθηκε' ? <CheckCircle2 className="w-5 h-5 text-red-500" /> : <Calendar className="w-5 h-5 text-white" />}
                    title="Προγραμματίστηκε Συνέντευξη"
                    xp="+50 XP"
                    date={selectedColleague.status === 'Ολοκληρώθηκε' ? "Oct 15" : "Σε εκκρεμότητα"}
                    isCurrent={selectedColleague.status !== 'Ολοκληρώθηκε'}
                  />
                  <TimelineStep 
                    status={selectedColleague.status === 'Ολοκληρώθηκε' ? "completed" : "locked"}
                    icon={selectedColleague.status === 'Ολοκληρώθηκε' ? <CheckCircle2 className="w-5 h-5 text-red-500" /> : <Target className="w-5 h-5 text-slate-500" />}
                    title="Έφτασε στην Τελική Συνέντευξη"
                    xp="+100 XP"
                    date={selectedColleague.status === 'Ολοκληρώθηκε' ? "Oct 20" : "Κλειδωμένο"}
                  />
                  <TimelineStep 
                    status={selectedColleague.status === 'Ολοκληρώθηκε' ? "completed" : "locked"}
                    icon={selectedColleague.status === 'Ολοκληρώθηκε' ? <Star className="w-5 h-5 text-red-500" /> : <Star className="w-5 h-5 text-slate-500" />}
                    title="Προσλήφθηκε"
                    xp="+200 XP και Συλλεκτικά Sneakers"
                    date={selectedColleague.status === 'Ολοκληρώθηκε' ? "Oct 25" : "Κλειδωμένο"}
                    isReward={selectedColleague.status !== 'Ολοκληρώθηκε'}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}`;

const oldScouterRegex = /function ScouterView\(\) \{[\s\S]*?function ImpactView\(\) \{/m;
content = content.replace(oldScouterRegex, newScouterStart + '\n\nfunction ImpactView() {');

// 2. Change the Impact Grid from fixed height to min-h-[calc] so it can expand, allowing scroll
// Actually just taking off the h-full from the lg:col-span-12 div, or changing it!
// Find \`lg:h-[calc(100vh-250px)]\` and change to \`min-h-[calc(100vh-250px)]\`
content = content.replace(
  'className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:h-[calc(100vh-250px)]"',
  'className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-250px)] lg:h-auto"'
);

// We need the parent col inside ImpactView to not rigidly clip
content = content.replace(
  'className={cn("flex flex-col h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-500", !selectedCategory ? "lg:col-span-4" : "lg:col-span-12")}',
  'className={cn("flex flex-col min-h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative transition-all duration-500", !selectedCategory ? "lg:col-span-4" : "lg:col-span-12")}' // took off overflow-hidden so the internal scroll can naturally expand if it needs or have the parent expand
);

// Change RewardCard to support Redeem button
const oldRewardCard = `function RewardCard({ title, cost, image, progress, icon }: any) {
  return (
    <div className="bg-[#111111]/80 rounded-2xl border border-white/5 overflow-hidden flex hover:border-red-500/30 transition-all group h-24">
      <div className="w-24 shrink-0 relative">
        <img src={image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={title} />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111111]/80" />
      </div>
      <div className="p-3 flex flex-col justify-between flex-1 min-w-0">
         <div className="flex justify-between items-start">
           <h4 className="font-bold text-white text-sm truncate pr-2" title={title}>{title}</h4>
           <div className="flex items-center gap-1 bg-red-500/10 px-2 py-0.5 rounded text-xs font-mono font-bold text-red-400 shrink-0 border border-red-500/20">
             {icon}
             <span>{cost}</span>
           </div>
         </div>
         <div className="mt-2">
           <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1">
             <span>Πρόοδος</span>
             <span>{progress}%</span>
           </div>
           <div className="h-1.5 w-full bg-black rounded-full overflow-hidden border border-white/5">
             <div className="h-full bg-gradient-to-r from-red-800 to-red-500 relative" style={{ width: \`\${progress}%\` }}>
                <div className="absolute inset-0 bg-white/20 skew-x-[-20deg] animate-pulse" />
             </div>
           </div>
         </div>
      </div>
    </div>
  );
}`;

const newRewardCard = `function RewardCard({ title, cost, image, progress, icon }: any) {
  return (
    <div className="bg-[#111111]/80 rounded-2xl border border-white/10 overflow-hidden flex flex-col hover:border-red-500/50 transition-all group relative">
      <div className="h-40 w-full relative">
        <img src={image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" alt={title} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-red-500/30 text-sm font-mono font-bold text-white shadow-[0_0_10px_rgba(0,0,0,0.5)]">
             <Star className="w-3 h-3 text-red-500" />
             <span>{cost}</span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1 z-10">
         <h4 className="font-bold text-white text-lg mb-4 leading-tight">{title}</h4>
         
         <div className="mt-auto flex flex-col gap-3">
           {progress >= 100 ? (
             <button onClick={() => alert('Επιτυχής Εξαργύρωση!')} className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold tracking-widest uppercase transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)]">
               Εξαργυρωση
             </button>
           ) : (
             <>
               <div className="flex justify-between text-[11px] text-slate-400 font-mono uppercase tracking-wider">
                 <span>Πρόοδος</span>
                 <span className="text-red-400">{progress}%</span>
               </div>
               <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-white/10 mb-2">
                 <div className="h-full bg-gradient-to-r from-red-800 to-red-500 relative transition-all" style={{ width: \`\${progress}%\` }}>
                    <div className="absolute inset-0 bg-white/20 skew-x-[-20deg]" />
                 </div>
               </div>
               <p className="text-xs text-slate-500 text-center">Απαιτούνται ακόμα πόντοι</p>
             </>
           )}
         </div>
      </div>
    </div>
  );
}`;

content = content.replace(oldRewardCard, newRewardCard);


fs.writeFileSync(file, content);
console.log('Done mapping Scouter tab + Reward modifications + fixed Impact bug');
