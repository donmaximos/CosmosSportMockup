import fs from 'fs';

const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Logo
content = content.replace(
  `<div className="flex items-center gap-3 mb-12 w-full justify-center md:justify-start px-2">
          <img src="/LOGO.jpg" alt="Cosmos Sport" className="h-[25px] object-contain mix-blend-screen" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>`,
  `<div className="flex flex-col items-center justify-center md:items-start mb-12 px-2 w-full">
          <div className="inline-flex flex-col mt-2">
            <span className="text-white font-display font-black text-4xl tracking-tighter leading-none mb-0.5">COSMOS</span>
            <div className="bg-red-600 h-5 w-full flex justify-end items-center px-1.5">
              <span className="text-white font-display font-bold text-[12px] leading-none tracking-widest drop-shadow-md">SPORT</span>
            </div>
          </div>
        </div>`
);

// 2. Add XCircle to imports
content = content.replace(
  `Leaf, Heart, Share2, ChevronLeft, MessageSquare`,
  `Leaf, Heart, Share2, ChevronLeft, MessageSquare, XCircle`
);

// 3. Make Categories list scrollable
content = content.replace(
  `<div className="flex-1 flex flex-col gap-4 relative z-10">
                {categories.map(cat => (`,
  `<div className="flex-1 flex flex-col gap-4 relative z-10 overflow-y-auto custom-scrollbar pr-2 mb-2">
                {categories.map(cat => (`
);

// 4. Update the cols layout for the Left Panel (form vs categories)
content = content.replace(
  `<div className="lg:col-span-4 flex flex-col h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">`,
  `<div className={cn("flex flex-col h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-500", !selectedCategory ? "lg:col-span-4" : "lg:col-span-12")}>`
);

// 5. Hide the History Panel when selectedCategory is set
content = content.replace(
  `{/* Central/Right Panel: Διαδικασία Ελέγχου AI -> Ιστορικό / Feedback */}\n        <div className="lg:col-span-8 flex flex-col h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">`,
  `{/* Central/Right Panel: Διαδικασία Ελέγχου AI -> Ιστορικό / Feedback */}\n        {!selectedCategory && (<div className="lg:col-span-8 flex flex-col h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">`
);

// 5b. Close the history panel wrapper and add the third idea
const historyBlockMatch = `                    <div className="text-sm text-slate-300 italic">
                      "Το πρόγραμμα ξεκίνησε τον προηγούμενο μήνα με μεγάλη επιτυχία!"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>`;

const replacementHistoryBlock = `                    <div className="text-sm text-slate-300 italic">
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
                    <div className="text-xs font-mono text-slate-500 mb-1 uppercase tracking-wider">Feedback απο Management:</div>
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
    </motion.div>`;

content = content.replace(historyBlockMatch, replacementHistoryBlock);

fs.writeFileSync(file, content);
console.log('App.tsx Updated Final!');
