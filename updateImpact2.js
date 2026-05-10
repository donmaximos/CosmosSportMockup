import fs from 'fs';

const path = 'src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace left button text
content = content.replace(
  `{isSubmitting ? 'Υποβολή...' : 'Υποβολή & AI Ανάλυση'}`,
  `{isSubmitting ? 'Υποβολή...' : 'Υποβολή Ιδέας'}`
);

// Replace the right panel
const oldRightPanelStr = `{/* Central/Right Panel: Διαδικασία Ελέγχου AI */}`;
const indexOfRightPanel = content.indexOf(oldRightPanelStr);

// Find the end of the ImpactView component
const endOfImpactViewStr = `    </motion.div>
  );
}`;
const lastIndexOfImpactViewEnd = content.indexOf(endOfImpactViewStr, indexOfRightPanel);

const newRightPanel = `{/* Central/Right Panel: Διαδικασία Ελέγχου AI -> Ιστορικό / Feedback */}
        <div className="lg:col-span-8 flex flex-col h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-600/10 blur-[80px] rounded-full pointer-events-none" />

          <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-2 mb-4 relative z-10">
            <MessageSquare className="w-6 h-6 text-red-500" />
            Ιστορικό & Feedback
          </h3>
          <p className="text-slate-400 font-mono text-xs tracking-widest uppercase mb-10 relative z-10">
            Ενημερωθειτε για την πορεια των ιδεων σας
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
                    <div className="text-xs font-mono text-slate-500 mb-1 uppercase tracking-wider">Feedback απο Management:</div>
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
                    <div className="text-xs font-mono text-slate-500 mb-1 uppercase tracking-wider">Feedback απο Marketing:</div>
                    <div className="text-sm text-slate-300 italic">
                      "Το πρόγραμμα ξεκίνησε τον προηγούμενο μήνα με μεγάλη επιτυχία!"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
`;

if (indexOfRightPanel > -1 && lastIndexOfImpactViewEnd > -1) {
  content = content.substring(0, indexOfRightPanel) + newRightPanel + content.substring(lastIndexOfImpactViewEnd);
} else {
  console.log("Could not find sections");
}

// Add MessageSquare import
content = content.replace("Leaf, Heart, Share2, ChevronLeft", "Leaf, Heart, Share2, ChevronLeft, MessageSquare");

// Remove the score useEffect since it's no longer used
content = content.replace(/  \/\/ Animated increment for AI score \(only start when submitting\)[\s\S]*?\}, \[isSubmitting\]\);\n/, "");
content = content.replace("const [score, setScore] = useState(0);", "");


fs.writeFileSync(path, content);
console.log('ImpactView updated successfully!');
