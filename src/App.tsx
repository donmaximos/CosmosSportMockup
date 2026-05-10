import React, { useState } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, Tooltip 
} from 'recharts';
import { 
  Activity, Award, BarChart2, Briefcase, ChevronRight, Cpu, 
  Globe, Hexagon, Layers, Mail, Settings, Target, User, Zap,
  CheckCircle2, Clock, Calendar, Gift, Star, Ticket,
  Lightbulb, ArrowRight, UploadCloud, BrainCircuit,
  Leaf, Heart, Share2, ChevronLeft, MessageSquare, XCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for safe Tailwind class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Data for Radar Chart & Stats
const statsData = [
  { subject: 'Ολοκλήρωση Task', skill: 'ΤΑΣΚ', current: 92, max: 100 },
  { subject: 'Πωλήσεις', skill: 'ΠΩΛ', current: 90, max: 100 },
  { subject: 'Επικοινωνία', skill: 'ΕΠΙΚ', current: 82, max: 100 },
  { subject: 'Εξυπηρέτηση', skill: 'ΕΞΥΠ', current: 88, max: 100 },
  { subject: 'Εμπειρία', skill: 'ΕΜΠ', current: 78, max: 100 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'scouter' | 'impact' | 'missions'>('overview');

  return (
    <div className="h-[100dvh] bg-black text-slate-300 font-sans selection:bg-red-600/30 overflow-hidden relative flex flex-col md:flex-row">
      {/* Ambient background glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-red-700/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-red-700/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Sidebar Navigation */}
      <aside className="hidden md:flex w-64 shrink-0 border-r border-slate-800/50 bg-[#111111]/80 backdrop-blur-xl min-h-screen flex-col items-start py-8 px-4 z-20 transition-all">
        <div className="flex flex-col items-center justify-center md:items-start mb-12 px-2 w-full">
          <div className="inline-flex flex-col mt-2">
            <span className="text-white font-display font-black text-4xl tracking-tighter leading-none mb-0.5">COSMOS</span>
            <div className="bg-red-600 h-5 w-full flex justify-end items-center px-1.5">
              <span className="text-white font-display font-bold text-[12px] leading-none tracking-widest drop-shadow-md">SPORT</span>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-2 w-full">
          <NavItem 
            icon={<User />} 
            label="ProCard" 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
          />
          <NavItem 
            icon={<Layers />} 
            label="Missions" 
            active={activeTab === 'missions'} 
            onClick={() => setActiveTab('missions')} 
          />
          <NavItem 
            icon={<Target />} 
            label="Impact" 
            active={activeTab === 'impact'} 
            onClick={() => setActiveTab('impact')} 
          />
          <NavItem 
            icon={<Award />} 
            label="Scouter" 
            active={activeTab === 'scouter'} 
            onClick={() => setActiveTab('scouter')} 
          />
          
        </nav>

        <div className="mt-auto w-full">
          <NavItem icon={<Settings />} label="Ρυθμίσεις" />
        </div>
      </aside>

      {/* Mobile Top Header (Brand) */}
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
      <main className="flex-1 p-4 md:p-12 z-10 overflow-y-auto min-h-0 relative pb-28 md:pb-12 w-full custom-scrollbar">
        {activeTab === 'overview' && <OverviewView />}
        {activeTab === 'scouter' && <ScouterView />}
        {activeTab === 'impact' && <ImpactView />}
        {activeTab === 'missions' && <MissionsView />}
      </main>

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
    </div>
  );
}

// ----------------------
// Views
// ----------------------

function OverviewView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <header className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight uppercase">
            Cosmos <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-700 drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]">ProCard</span>
          </h1>
          <p className="text-slate-400 mt-2 font-mono text-sm tracking-widest uppercase">
            Κέντρο Ελέγχου Αναλυτικών Δεδομένων Προσωπικού
          </p>
        </div>
        <div className="hidden md:flex gap-4 items-center">
          <div className="text-right">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Τρέχουσα Σεζόν</div>
            <div className="text-red-500 font-mono font-bold tracking-widest">Q3 - 2026</div>
          </div>
          <div className="w-12 h-12 rounded-full border border-red-600/50 flex items-center justify-center bg-red-600/10 shadow-[0_0_15px_rgba(248,113,113,0.3)]">
            <Activity className="text-red-400 w-6 h-6" />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Player Card */}
        <div className="col-span-1 lg:col-span-5 xl:col-span-4 flex justify-center items-start">
          <PlayerCard />
        </div>

        {/* Right Column: Analytics & Radar */}
        <div className="col-span-1 lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
          {/* Top Row: Quick XP / Leveling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard 
              title="XP για Missions" 
              value="+2" 
              subtitle="Δυνατότητα Βελτίωσης Overall"
              icon={<Zap className="w-5 h-5 text-red-400" />}
              trend="available"
              color="orange"
            />
            <StatCard 
              title="Έργα / Projects" 
              value="124" 
              subtitle="Συνολικές Αναθέσεις"
              icon={<Briefcase className="w-5 h-5 text-red-500" />}
              color="cyan"
            />
            <StatCard 
              title="Παγκόσμια Κατάταξη" 
              value="#42" 
              subtitle="Top 5% του Τμήματος"
              icon={<Globe className="w-5 h-5 text-red-300" />}
              color="purple"
            />
          </div>

          {/* Radar & Detail Stats */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-full">
            {/* Radar Chart Panel */}
            <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-slate-800/60 rounded-3xl p-6 shadow-2xl relative group hover:border-red-600/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-b from-red-600/5 to-transparent rounded-3xl pointer-events-none" />
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wider flex justify-between items-center z-10 relative">
                Ραντάρ Χαρακτηριστικών
                <Activity className="w-4 h-4 text-red-500" />
              </h3>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={statsData}>
                    <PolarGrid stroke="#1e293b" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} 
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f111a', borderColor: '#1e293b', color: '#fff' }}
                      itemStyle={{ color: '#ef4444' }}
                    />
                    <Radar 
                      name="Alex P." 
                      dataKey="current" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      fill="url(#colorRed)" 
                      fillOpacity={0.5} 
                    />
                    <defs>
                      <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* KPI Bars Panel */}
            <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-slate-800/60 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
                Αναλυτικά Χαρακτηριστικά
              </h3>
              <div className="flex flex-col gap-5 flex-1 justify-center">
                {statsData.map((stat, idx) => (
                  <KPIBar key={idx} stat={stat} index={idx} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ScouterView() {
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
        <div className="flex w-full md:w-auto overflow-x-auto custom-scrollbar bg-[#111111]/80 backdrop-blur-md rounded-xl p-1 border border-white/10 shrink-0">
          <button 
            onClick={() => { setActiveTab('rewards'); setSelectedColleague(null); }}
            className={cn("flex-1 md:flex-none min-w-fit px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-colors whitespace-nowrap text-center", activeTab === 'rewards' ? "bg-red-600 text-white" : "text-slate-400 hover:text-white")}
          >
            Ανταμοιβές
          </button>
          <button 
            onClick={() => setActiveTab('recommendations')}
            className={cn("flex-1 md:flex-none min-w-fit px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-colors whitespace-nowrap text-center", activeTab === 'recommendations' ? "bg-red-600 text-white" : "text-slate-400 hover:text-white")}
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
            title="Δώρο 2 Εισιτήρια Ευρωλίγκα"
            cost="600 XP"
            image="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80"
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
          <div className="md:col-span-2 lg:col-span-3 mt-4 bg-gradient-to-br from-red-700/20 to-red-700/10 border border-red-600/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent animate-shimmer" />
            <div className="relative z-10 flex-1">
              <h4 className="font-bold text-white text-xl mb-2">Μπόνους Scouter</h4>
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
                    <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">Ανέβασμα Βιογραφικού</label>
                    <input type="file" required className="w-full bg-[#111]/80 border border-dashed border-slate-700 rounded-xl px-4 py-6 text-slate-400 focus:border-red-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">Σχόλια / Σημειώσεις</label>
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
                    title={`Η σύσταση καταχωρήθηκε`}
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
}

function ImpactView() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  


  const categories = [
    { id: '1', title: 'Βελτίωση Περιβαλλοντικής Συνείδησης', icon: <Leaf className="w-5 h-5" />, desc: 'Προτάσεις για ανακύκλωση, εξοικονόμηση ενέργειας και βιώσιμες πρακτικές.' },
    { id: '2', title: 'Αύξηση Κοινωνικής Ευθύνης', icon: <Heart className="w-5 h-5" />, desc: 'Δράσεις για την τοπική κοινωνία, εθελοντισμός και προσφορά.' },
    { id: '3', title: 'Ιδέα για Social Media Marketing', icon: <Share2 className="w-5 h-5" />, desc: 'Νέες καμπάνιες, διαγωνισμοί και τρόποι διαδραστικότητας στο Instagram/TikTok.' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedCategory(null);
      alert('Η ιδέα σας υποβλήθηκε επιτυχώς!');
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 w-full max-w-7xl mx-auto"
    >
      {/* Background for Impact view */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-black/80 mix-blend-multiply" />
        <img 
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=80" 
          alt="Collaborative Workspace Background"
          className="w-full h-full object-cover filter blur-lg opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      <header className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight uppercase">
            Make an <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">Impact</span>
          </h1>
          <p className="text-slate-400 mt-2 font-mono text-sm tracking-widest uppercase">
            Εσωτερική Πλατφόρμα Ανοιχτής Καινοτομίας
          </p>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-250px)] lg:h-auto">
        
        {/* Left Panel: Submission Form or Categories */}
        <div className={cn("flex flex-col min-h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative transition-all duration-500", !selectedCategory ? "lg:col-span-4" : "lg:col-span-12")}>
          <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
          
          {!selectedCategory ? (
            <>
              <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-2 mb-8 relative z-10">
                <Target className="w-6 h-6 text-red-500" />
                Επιλογή Τομέα
              </h3>
              <p className="text-slate-400 font-mono text-xs tracking-widest uppercase mb-6 relative z-10">
                Πού θέλεις να συνεισφέρεις;
              </p>

              <div className="flex-1 flex flex-col gap-4 relative z-10 overflow-y-auto custom-scrollbar pr-2 mb-2">
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.title)}
                    className="text-left w-full bg-[#111111]/80 border border-white/[0.05] hover:border-red-500/50 rounded-xl p-4 transition-all group hover:bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-red-500/20 group-hover:text-red-400 transition-colors text-slate-400">
                        {cat.icon}
                      </div>
                      <h4 className="font-bold text-white text-sm">{cat.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500 ml-11">{cat.desc}</p>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <button 
                  onClick={() => { setSelectedCategory(null); setIsSubmitting(false); }}
                  className="p-2 rounded-full border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-red-400" />
                  Υπόβαλε την Ιδέα σου
                </h3>
              </div>

              <div className="mb-6 relative z-10 bg-red-900/20 border border-red-500/20 rounded-xl p-3 text-sm flex gap-2 items-start">
                 <Target className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                 <div>
                   <span className="text-slate-400 text-[10px] block uppercase tracking-wider mb-1">Επιλεγμένος Τομέας:</span>
                   <span className="text-red-50 font-semibold">{selectedCategory}</span>
                 </div>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6 relative z-10 w-full overflow-y-auto overflow-x-hidden custom-scrollbar min-h-0 pr-2 mb-2 pb-4">
                <div className="shrink-0">
                  <label className="block text-slate-400 font-mono text-xs tracking-wider uppercase mb-2 ml-1">Τίτλος Ιδέας</label>
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Εισάγετε ένα σύντομο τίτλο..."
                      required
                      className="w-full bg-[#111111]/80 border border-slate-700/50 rounded-xl px-4 py-3 text-white font-semibold focus:outline-none focus:border-red-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex-1 min-h-[150px] flex flex-col shrink-0">
                  <label className="block text-slate-400 font-mono text-xs tracking-wider uppercase mb-2 ml-1">Περιγραφή</label>
                  <div className="relative group flex-1 flex">
                    <textarea 
                      placeholder="Αναλύστε την πρότασή σας..."
                      required
                      className="w-full flex-1 bg-[#111111]/80 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-red-500/50 transition-colors resize-none leading-relaxed"
                    />
                  </div>
                </div>

                <div className="shrink-0">
                  <label className="block text-slate-400 font-mono text-xs tracking-wider uppercase mb-2 ml-1">Συνημμένα (Προαιρετικό)</label>
                  <label className="border-2 border-dashed border-slate-700/50 rounded-xl px-4 py-4 flex items-center justify-center gap-3 text-slate-500 hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/5 transition-all cursor-pointer">
                    <UploadCloud className="w-5 h-5" />
                    <span className="font-semibold text-sm">Ανέβασμα αρχείων</span>
                    <input type="file" className="hidden" />
                  </label>
                </div>

                <button type="submit" disabled={isSubmitting} className="mt-4 shrink-0 relative w-full group overflow-hidden rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 transition-transform duration-500 group-hover:scale-[1.02]" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-xl" />
                  <div className="relative flex items-center justify-center gap-2 py-4 px-6">
                    <span className="font-display font-black text-white tracking-widest uppercase">
                      {isSubmitting ? 'Υποβολή...' : 'Υποβολή'}
                    </span>
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </button>
              </form>
            </>
          )}
        </div>

        {/* Central/Right Panel: Διαδικασία Ελέγχου AI -> Ιστορικό / Feedback */}
        {!selectedCategory && (<div className="lg:col-span-8 flex flex-col h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-600/10 blur-[80px] rounded-full pointer-events-none" />

          <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-2 mb-4 relative z-10">
            <MessageSquare className="w-6 h-6 text-red-500" />
            Ιστορικό & Feedback
          </h3>
          <p className="text-slate-400 font-mono text-xs tracking-widest uppercase mb-10 relative z-10">
            Ενημερωθείτε για την πορεία των ιδεών σας
          </p>

          <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar relative z-10">
            {/* Idea 1 */}
            <div className="bg-[#111111]/80 border border-white/5 rounded-2xl p-5 flex flex-col hover:border-red-500/30 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-white font-bold text-lg">Πρόγραμμα Ανακύκλωσης Συσκευασιών</h4>
                <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider border border-red-500/30">
                  ΣΕ ΕΞΕΛΙΞΗ
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2">
                Ολοκληρωμένο σύστημα ανακύκλωσης συσκευασιών στα καταστήματα με επιβράβευση πόντων loyalty για τους πελάτες.
              </p>
              <div className="mt-auto bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-red-500/20 text-red-400 shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 mb-1 uppercase tracking-wider">Feedback από Management:</div>
                    <div className="text-sm text-slate-300 italic">
                      "Η ιδέα είναι εξαιρετική. Έχει ήδη προωθηθεί στο τμήμα Operations για την κοστολόγηση του προγράμματος."
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Idea 2 */}
            <div className="bg-[#111111]/80 border border-white/5 rounded-2xl p-5 flex flex-col hover:border-slate-500/30 transition-colors opacity-80">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-white font-bold text-lg">Εβδομαδιαία Live Workout Sessions</h4>
                <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider border border-emerald-500/30">
                  ΥΛΟΠΟΙΗΘΗΚΕ
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2">
                Online και in-store live workouts κάθε Σάββατο πρωί με influencers του χώρου.
              </p>
              <div className="mt-auto bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 mb-1 uppercase tracking-wider">Feedback από Marketing:</div>
                    <div className="text-sm text-slate-300 italic">
                      "Το πρόγραμμα ξεκίνησε τον προηγούμενο μήνα με μεγάλη επιτυχία!"
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Idea 3 - Rejected */}
            <div className="bg-[#111111]/80 border border-white/5 rounded-2xl p-5 flex flex-col hover:border-slate-500/30 transition-colors opacity-70">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-white font-bold text-lg">Εγκατάσταση Ηλιακών Πάνελ</h4>
                <div className="bg-slate-500/20 text-slate-400 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider border border-slate-500/30">
                  ΑΠΟΡΡΙΦΘΗΚΕ
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2">
                Εγκατάσταση ηλιακών συστημάτων σε όλα τα καταστήματα της αλυσίδας για 100% αυτονομία.
              </p>
              <div className="mt-auto bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-slate-500/20 text-slate-400 shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 mb-1 uppercase tracking-wider">Feedback από Management:</div>
                    <div className="text-sm text-slate-300 italic">
                      "Η αρχική επένδυση είναι δυσανάλογη και τα περισσότερα κτίρια ενοικιάζονται, καθιστώντας αδύνατες τις δομικές αλλαγές προς το παρόν. Εξαιρετική σκέψη ωστόσο."
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>)}
      </div>
    </motion.div>
  );
}
// ----------------------
// Sub-components
// ----------------------

function TimelineStep({ status, icon, title, xp, date, isCurrent = false, isReward = false }: any) {
  const isCompleted = status === 'completed';
  const isActive = status === 'active';
  
  return (
    <div className="relative">
      <div className={cn(
        "absolute -left-10 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-[#111111] z-10",
        isCompleted ? "border-red-500 bg-red-500/20" : 
        isActive ? "border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]" : 
        "border-slate-700"
      )}>
        {icon}
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/[0.02] rounded-2xl p-4 border border-white/[0.05] shadow-inner hover:bg-white/[0.06] transition-colors group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent group-hover:translate-x-full transition-transform duration-1000" />
        <div className="relative z-10">
          <h4 className={cn(
            "font-bold text-lg",
            isCompleted ? "text-slate-300" :
            isActive ? "text-white" : "text-slate-500"
          )}>
            {title}
          </h4>
          <span className={cn(
            "text-sm font-mono tracking-wider",
            isCompleted || isActive ? "text-red-500" : "text-slate-600"
          )}>
            {date}
          </span>
        </div>
        
        <div className={cn(
          "mt-2 sm:mt-0 font-display font-black px-3 py-1 rounded-lg border",
          isReward ? "bg-gradient-to-r from-red-600/20 to-red-400/10 border-red-400/30 text-red-400 shadow-[0_0_10px_rgba(248,113,113,0.2)]" :
          isCompleted ? "bg-red-600/10 border-red-600/20 text-red-500" :
          isActive ? "bg-white/10 border-white/20 text-white" :
          "bg-slate-800/50 border-slate-700/50 text-slate-500"
        )}>
          {xp}
        </div>
      </div>
    </div>
  );
}

function RewardCard({ title, cost, image, progress, icon }: any) {
  return (
    <div className="bg-white/[0.02] rounded-2xl border border-white/[0.05] overflow-hidden group hover:border-white/20 transition-colors relative flex flex-col">
      <div className="h-32 relative overflow-hidden shrink-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
          {icon}
          <span className="text-white font-bold text-xs">{cost}</span>
        </div>
      </div>
      <div className="p-4 pt-2 flex flex-col flex-1">
        <h4 className="text-white font-semibold text-sm mb-3 z-10 relative drop-shadow-md">{title}</h4>
        
        <div className="mt-auto">
          {progress >= 100 ? (
            <button 
              onClick={() => alert('Επιτυχής Εξαργύρωση!')} 
              className="w-full py-2.5 rounded-xl bg-red-600/90 hover:bg-red-500 text-white font-bold text-xs tracking-widest uppercase transition-colors shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            >
              Εξαργύρωση
            </button>
          ) : (
            <>
              <div className="flex justify-between text-xs mb-1 font-mono">
                <span className="text-slate-300">Πρόοδος</span>
                <span className="text-red-500 font-bold">{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden shadow-inner border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-red-600 relative transition-all" 
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 skew-x-[-20deg]" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 w-full p-3 rounded-xl transition-all duration-300 group relative",
        active 
          ? "bg-gradient-to-r from-red-600/20 to-transparent text-red-500 border-l-2 border-red-500" 
          : "text-slate-500 hover:text-slate-200 hover:bg-slate-800/50"
      )}
    >
      {active && (
        <div className="absolute left-0 w-8 h-full bg-red-500/20 blur-xl rounded-full" />
      )}
      <div className={cn("flex-shrink-0", active ? "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" : "")}>
        {icon}
      </div>
      <span className="font-semibold tracking-wide hidden md:block">{label}</span>
      {active && <ChevronRight className="w-4 h-4 ml-auto hidden md:block opacity-50" />}
    </button>
  );
}

function PlayerCard() {
  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full max-w-[340px] aspect-[2/3] rounded-[2rem] p-[3px] overflow-hidden group perspective-1000"
    >
      {/* Animated glowing border */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-500 via-red-600 to-red-800 opacity-50 blur-sm group-hover:opacity-100 transition-opacity duration-1000 animate-spin-slow" style={{ animationDuration: '4s' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-red-500 via-red-600 to-red-800 opacity-80" />
      
      {/* Inner dark card area */}
      <div className="absolute inset-[2px] bg-gradient-to-b from-[#111111] to-[#111111] rounded-[1.85rem] z-10 overflow-hidden flex flex-col">
        <button className="absolute top-4 right-4 z-40 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/20 text-white hover:text-red-400 hover:border-red-400 transition-colors cursor-pointer active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
        </button>
        
        {/* Top Header Section of Card */}
        <div className="flex justify-between items-start pt-6 px-6 relative z-30">
          <div className="flex flex-col items-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            <span className="text-6xl font-display font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              85
            </span>
            <span className="text-lg font-mono font-bold text-red-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wider">
              CX
            </span>
            <div className="w-6 h-[1px] bg-white/20 my-2" />
            {/* Country/Dept flag placeholder */}
            <div className="w-8 h-5 bg-gradient-to-br from-red-600 to-red-900 rounded-sm shadow-md flex items-center justify-center text-[8px] font-bold">
              GLB
            </div>
            {/* Team/Club logo placeholder */}
            <Hexagon className="w-6 h-6 text-red-500 fill-red-600/20 mt-2" />
          </div>
        </div>

        {/* Player Image (Absolute positioning to overlay rating) */}
        <div className="absolute top-0 right-[-10%] w-[110%] h-[55%] z-20">
          {/* Masking gradient for smooth fade at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent z-10" />
          <img 
            src="Myphoto.jpg" 
            alt="Alex P."
            className="w-full h-full object-cover object-top filter contrast-125 saturate-50 drop-shadow-[0_0_20px_rgba(239,68,68,0.2)]"
            style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
          />
        </div>

        {/* Bottom Section containing Name & Stats */}
        <div className="relative z-30 mt-auto pt-4 pb-6 px-5 flex flex-col items-center">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent mb-3" />
          
          <h2 className="text-2xl font-display font-black uppercase tracking-widest text-white mb-4 drop-shadow-md">
            Alex P.
          </h2>
          
          {/* Stats Grid inside the Card */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full px-2">
            <CardStat label="ΤΑΣΚ" value="92" hrLabel="Ολοκλήρωση" />
            <CardStat label="ΠΩΛ" value="90" hrLabel="Πωλήσεις" />
            <CardStat label="ΕΠΙΚ" value="82" hrLabel="Επικοινωνία" />
            <CardStat label="ΕΞΥΠ" value="88" hrLabel="Εξυπηρέτηση" />
            <CardStat label="ΕΜΠ" value="78" hrLabel="Εμπειρία" />
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/20 to-transparent mt-4 mb-2" />
          <div className="flex justify-center items-center gap-2 text-[10px] text-slate-400 font-mono tracking-widest uppercase">
            <Cpu className="w-3 h-3" />
            Performance ID: AX-0992
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CardStat({ label, value, hrLabel, isSpecial = false }: { label: string, value: string, hrLabel: string, isSpecial?: boolean }) {
  return (
    <div className="flex justify-between items-center font-mono">
      <div className="flex items-center gap-2">
        <span className={cn(
          "font-bold text-lg",
          isSpecial ? "text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.8)]" : "text-white"
        )}>{value}</span>
        <span className="text-slate-400 text-sm font-semibold">{label}</span>
      </div>
      <span className="text-[9px] text-red-600/70 tracking-tighter uppercase ml-2 text-right opacity-0 group-hover:opacity-100 transition-opacity">
        {hrLabel}
      </span>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon, trend, color }: any) {
  return (
    <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-slate-800/60 rounded-2xl p-5 relative overflow-hidden group">
      <div className={cn(
        "absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-red-600/5 blur-2xl transition-all",
        color === 'orange' && "bg-red-600/10",
        color === 'purple' && "bg-red-500/10",
        color === 'cyan' && "group-hover:bg-red-600/20",
        color === 'orange' && "group-hover:bg-red-600/20"
      )} />
      
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-slate-400 font-medium text-sm mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <h4 className={cn(
              "text-3xl font-display font-black tracking-tight",
              color === 'orange' ? "text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.5)]" : "text-white"
            )}>{value}</h4>
            {trend && (
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider bg-red-400/10 px-2 py-0.5 rounded border border-red-400/20">
                Boost
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-2">{subtitle}</p>
        </div>
        <div className="bg-slate-800/50 p-2 rounded-xl border border-slate-700/50">
          {icon}
        </div>
      </div>
    </div>
  );
}

function KPIBar({ stat, index }: { stat: any, index: number }) {
  const isHigh = stat.current >= 90;
  
  return (
    <div className="w-full group">
      <div className="flex justify-between items-end mb-2">
        <div>
          <span className="text-slate-400 font-mono text-xs tracking-wider uppercase mr-2">{stat.skill}</span>
          <span className="text-white font-semibold text-sm">{stat.subject}</span>
        </div>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + (index * 0.1) }}
          className={cn(
            "font-mono font-bold text-lg drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]",
            isHigh ? "text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "text-white"
          )}
        >
          {stat.current}
        </motion.span>
      </div>
      
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${stat.current}%` }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full relative",
            isHigh 
              ? "bg-gradient-to-r from-red-700 to-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]" 
              : "bg-gradient-to-r from-slate-600 to-slate-400"
          )}
        >
          {/* Subtle shine effect inside the bar */}
          <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 skew-x-[-20deg]" />
        </motion.div>
      </div>
    </div>
  );
}

function MissionsView() {
  const [activeTab, setActiveTab] = useState<'available' | 'completed'>('available');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 w-full max-w-6xl mx-auto"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">Missions</span>
          </h1>
          <p className="text-slate-400 mt-2 font-mono text-sm tracking-widest uppercase">
            Εκπαιδεύσεις & Ανάπτυξη Δεξιοτήτων
          </p>
        </div>
        <div className="flex w-full md:w-auto overflow-x-auto custom-scrollbar bg-[#111111]/80 backdrop-blur-md rounded-xl p-1 border border-white/10 shrink-0">
          <button 
            onClick={() => setActiveTab('available')}
            className={cn("flex-1 md:flex-none min-w-fit px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-colors text-center", activeTab === 'available' ? "bg-red-600 text-white" : "text-slate-400 hover:text-white")}
          >
            Διαθέσιμα
          </button>
          <button 
            onClick={() => setActiveTab('completed')}
            className={cn("flex-1 md:flex-none min-w-fit px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-colors text-center", activeTab === 'completed' ? "bg-red-600 text-white" : "text-slate-400 hover:text-white")}
          >
            Ολοκληρωμένα
          </button>
        </div>
      </header>

      {activeTab === 'available' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MissionCard 
            title="Customer Service Excellence"
            category="Εξυπηρέτηση"
            xp="+5 ΕΞΥΠ"
            progress={100}
            status="available"
            image="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=600&q=80"
          />
          <MissionCard 
            title="Σεμινάριο Νέων Παραλαβών"
            category="Ταχύτητα Task"
            xp="+2 ΤΑΣΚ"
            progress={45}
            status="in-progress"
            image="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=600&q=80"
          />
          <MissionCard 
            title="Leadership & Store Management"
            category="Ομαδικότητα"
            xp="+10 ΕΠΙΚ"
            progress={0}
            status="available"
            image="https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=600&q=80"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MissionCard 
            title="Βασικές Αρχές Πωλήσεων"
            category="Πωλήσεις"
            xp="+3 ΠΩΛ"
            progress={100}
            status="completed"
            image="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=600&q=80"
          />
          <MissionCard 
            title="Διαχείριση Παραπόνων"
            category="Επικοινωνία"
            xp="+4 ΕΠΙΚ"
            progress={100}
            status="completed"
            image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80"
          />
        </div>
      )}
    </motion.div>
  );
}

function MissionCard({ title, category, xp, progress, status, image }: any) {
  const isCompleted = status === 'completed';
  const isInProgress = status === 'in-progress';
  const isAvailable = status === 'available';

  return (
    <div className="bg-white/[0.02] rounded-3xl border border-white/[0.05] overflow-hidden group hover:border-red-500/30 transition-all flex flex-col h-full relative">
      <div className="h-40 relative overflow-hidden">
        <img src={image} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" alt={title}/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 flex items-center gap-1 z-10">
          <Zap className="w-4 h-4 text-red-500" />
          <span className="text-white font-bold text-sm tracking-widest">{xp}</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="text-red-500 font-mono text-xs uppercase tracking-widest mb-2">{category}</div>
        <h3 className="text-xl font-bold text-white mb-4 leading-tight">{title}</h3>
        
        <div className="mt-auto">
          {isAvailable ? (
            <button className="w-full py-3 rounded-xl bg-red-600/20 hover:bg-red-600/40 border border-red-500/50 text-white transition-colors font-bold tracking-wide shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              Αίτηση Συμμετοχής
            </button>
          ) : (
            <>
              <div className="flex justify-between text-xs mb-2 font-mono">
                <span className={isCompleted ? "text-red-400" : "text-slate-400"}>
                  {isCompleted ? "Ολοκληρώθηκε" : "Σε εξέλιξη"}
                </span>
                <span className="text-red-500 font-bold">{progress}%</span>
              </div>
              <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5 relative">
                <div 
                  className={cn(
                    "h-full relative transition-all duration-1000",
                    isCompleted ? "bg-gradient-to-r from-red-600 to-red-400" : "bg-gradient-to-r from-red-800 to-red-500"
                  )}
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 skew-x-[-20deg]" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
