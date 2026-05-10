import fs from 'fs';

const path = 'src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /function ImpactView\(\) \{[\s\S]*?(?=\n\/\/ \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\n\/\/ Sub-components)/;

const newImpactView = `function ImpactView() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState(0);

  // Animated increment for AI score (only start when submitting)
  React.useEffect(() => {
    if (isSubmitting) {
      const timer = setTimeout(() => {
        setScore(89);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setScore(0);
    }
  }, [isSubmitting]);

  const categories = [
    { id: '1', title: 'Βελτίωση Περιβαλλοντικής Συνείδησης', icon: <Leaf className="w-5 h-5" />, desc: 'Προτάσεις για ανακύκλωση, εξοικονόμηση ενέργειας και βιώσιμες πρακτικές.' },
    { id: '2', title: 'Αύξηση Κοινωνικής Ευθύνης', icon: <Heart className="w-5 h-5" />, desc: 'Δράσεις για την τοπική κοινωνία, εθελοντισμός και προσφορά.' },
    { id: '3', title: 'Ιδέα για Social Media Marketing', icon: <Share2 className="w-5 h-5" />, desc: 'Νέες καμπάνιες, διαγωνισμοί και τρόποι διαδραστικότητας στο Instagram/TikTok.' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:h-[calc(100vh-250px)]">
        
        {/* Left Panel: Submission Form or Categories */}
        <div className="lg:col-span-4 flex flex-col h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">
          <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
          
          {!selectedCategory ? (
            <>
              <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-2 mb-8 relative z-10">
                <Target className="w-6 h-6 text-red-500" />
                Επιλογή Τομέα
              </h3>
              <p className="text-slate-400 font-mono text-xs tracking-widest uppercase mb-6 relative z-10">
                Που θελεις να συνεισφερεις;
              </p>

              <div className="flex-1 flex flex-col gap-4 relative z-10">
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
                   <span className="text-slate-400 text-[10px] block uppercase tracking-wider mb-1">Επιλεγμενος Τομεας:</span>
                   <span className="text-red-50 font-semibold">{selectedCategory}</span>
                 </div>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6 relative z-10 w-full">
                <div>
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

                <div className="flex-1 min-h-[150px] flex flex-col">
                  <label className="block text-slate-400 font-mono text-xs tracking-wider uppercase mb-2 ml-1">Περιγραφή</label>
                  <div className="relative group flex-1 flex">
                    <textarea 
                      placeholder="Αναλύστε την πρότασή σας..."
                      required
                      className="w-full flex-1 bg-[#111111]/80 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-red-500/50 transition-colors resize-none leading-relaxed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-mono text-xs tracking-wider uppercase mb-2 ml-1">Συνημμένα (Προαιρετικό)</label>
                  <label className="border-2 border-dashed border-slate-700/50 rounded-xl px-4 py-4 flex items-center justify-center gap-3 text-slate-500 hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/5 transition-all cursor-pointer">
                    <UploadCloud className="w-5 h-5" />
                    <span className="font-semibold text-sm">Άνέβασμα αρχείων</span>
                    <input type="file" className="hidden" />
                  </label>
                </div>

                <button type="submit" disabled={isSubmitting} className="mt-4 relative w-full group overflow-hidden rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 transition-transform duration-500 group-hover:scale-[1.02]" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-xl" />
                  <div className="relative flex items-center justify-center gap-2 py-4 px-6">
                    <span className="font-display font-black text-white tracking-widest uppercase">
                      {isSubmitting ? 'Υποβολή...' : 'Υποβολή & AI Ανάλυση'}
                    </span>
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </button>
              </form>
            </>
          )}
        </div>

        {/* Central/Right Panel: Διαδικασία Ελέγχου AI */}
        <div className="lg:col-span-8 flex flex-col bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-600/10 blur-[80px] rounded-full pointer-events-none" />

          <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-2 mb-4 relative z-10">
            <BrainCircuit className="w-6 h-6 text-red-500" />
            Διαδικασία Ελέγχου AI
          </h3>
          <p className="text-slate-400 font-mono text-xs tracking-widest uppercase mb-10 relative z-10">
            Ανάλυση & Πρόβλεψη σε Πραγματικό Χρόνο
          </p>

          {!isSubmitting ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 relative z-10">
              <BrainCircuit className="w-16 h-16 w-16 h-16 mb-6 opacity-20" />
              <p className="text-center font-mono text-sm tracking-widest uppercase max-w-sm">
                Αναμονή για υποβολή ιδέας... <br className="mb-2"/> Η Τεχνητή Νοημοσύνη θα αξιολογήσει άμεσα τον αντίκτυπο και την εφικτότητα.
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center relative z-10 opacity-0 animate-[fadeIn_0.5s_ease-out_0.3s_forwards]">
              
              {/* Real-time analysis graphical visualization background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                {/* Circular ripples */}
                <div className="w-[300px] h-[300px] border border-red-600/20 rounded-full animate-[ping_3s_ease-in-out_infinite] absolute" />
                <div className="w-[400px] h-[400px] border border-red-600/10 rounded-full animate-[ping_4s_ease-in-out_infinite_0.5s] absolute" />
                {/* Data lines */}
                <div className="absolute w-[600px] h-[2px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent rotate-45" />
                <div className="absolute w-[600px] h-[2px] bg-gradient-to-r from-transparent via-red-600/20 to-transparent -rotate-45" />
                {/* Sine wave or random data paths - decorative */}
                <svg className="absolute w-[500px] h-[200px] text-red-600/20" viewBox="0 0 500 200">
                  <path d="M0,100 C100,200 150,0 250,100 C350,200 400,0 500,100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" />
                </svg>
              </div>

              {/* Central Score Gauge */}
              <div className="relative flex flex-col items-center mb-12">
                <div className="relative w-56 h-56 flex items-center justify-center">
                  {/* Outer decorative ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="112" cy="112" r="100" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-800/50" />
                    <motion.circle 
                      cx="112" cy="112" r="100" 
                      fill="none" 
                      stroke="url(#scoreGradient)" 
                      strokeWidth="8" 
                      strokeDasharray="628"
                      initial={{ strokeDashoffset: 628 }}
                      animate={{ strokeDashoffset: 628 - (628 * score) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                      strokeLinecap="round"
                      className="drop-shadow-[0_0_15px_rgba(248,113,113,0.6)]"
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ef4444" /> {/* red-500 */}
                        <stop offset="100%" stopColor="#f87171" /> {/* red-400 */}
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  <div className="text-center flex flex-col items-center">
                    <span className="text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                      {score}
                    </span>
                    <div className="w-12 h-[2px] bg-slate-700 my-2" />
                    <span className="text-slate-500 font-mono text-sm tracking-widest">100</span>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <h4 className="text-white font-bold text-xl mb-1 drop-shadow-md">Βαθμολογία AI</h4>
                  <p className="text-red-500 font-mono text-sm tracking-wider uppercase drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                    Το όριο επιτεύχθηκε
                  </p>
                </div>
              </div>

              {/* Status & Επόμενο Στάδιο Pipeline */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full max-w-2xl px-4 relative z-10">
                {/* Approved Badge */}
                <div className="flex-1 w-full bg-white/[0.05] border border-red-500/40 rounded-2xl p-4 flex items-center justify-center gap-3 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                  <CheckCircle2 className="w-6 h-6 text-red-500 fill-red-500/20" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest leading-none mb-1">Κατάσταση</div>
                    <div className="text-red-50 font-bold tracking-wide">Εγκρίθηκε από το AI</div>
                  </div>
                </div>

                {/* Arrow Indicator */}
                <div className="flex items-center justify-center text-slate-600 sm:rotate-0 rotate-90">
                  <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
                  <div className="absolute w-[50px] h-[2px] bg-gradient-to-r from-red-500/50 to-red-400/50 -z-10 hidden sm:block" />
                </div>

                {/* Next Stage Badge */}
                <div className="flex-1 w-full bg-[#1a1a1a]/80 border border-red-600/30 rounded-2xl p-4 flex flex-col justify-center relative overflow-hidden shadow-[0_0_20px_rgba(248,113,113,0.15)]">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-400" />
                  <div className="text-[10px] text-red-200/60 font-mono uppercase tracking-widest leading-none mb-2 flex items-center gap-1.5">
                    <Settings className="w-3 h-3 text-red-400 animate-[spin_4s_linear_infinite]" />
                    Next Stage
                  </div>
                  <div className="text-white font-bold leading-tight drop-shadow-sm">
                    Προώθηση σε <br/>Operations Manager
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}`;

content = content.replace(regex, newImpactView);
fs.writeFileSync(path, content);
console.log('ImpactView updated successfully!');
