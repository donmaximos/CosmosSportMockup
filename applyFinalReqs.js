import fs from 'fs';

const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove soccer terms from stats data
content = content.replace(
  `{ subject: 'Ολοκλήρωση Task', skill: 'Pace', current: 92, max: 100 }`,
  `{ subject: 'Ολοκλήρωση Task', skill: 'ΤΑΣΚ', current: 92, max: 100 }`
);
content = content.replace(
  `{ subject: 'UPT', skill: 'Shooting', current: 90, max: 100 }`,
  `{ subject: 'UPT', skill: 'ΥΠΤ', current: 90, max: 100 }`
);
content = content.replace(
  `{ subject: 'Επικοινωνία', skill: 'Passing', current: 82, max: 100 }`,
  `{ subject: 'Επικοινωνία', skill: 'ΕΠΙΚ', current: 82, max: 100 }`
);
content = content.replace(
  `{ subject: 'Εξυπηρέτηση', skill: 'Agility', current: 88, max: 100 }`,
  `{ subject: 'Εξυπηρέτηση', skill: 'ΕΞΥΠ', current: 88, max: 100 }`
);
content = content.replace(
  `{ subject: 'Εμπειρία', skill: 'Physical', current: 78, max: 100 }`,
  `{ subject: 'Εμπειρία', skill: 'ΕΜΠ', current: 78, max: 100 }`
);

// 2. Adjust CardStat calls to use the new exact short labels, and maybe remove hrLabel since it was the explanation. Or we keep the HR label as is, it's fine.
content = content.replace(
  `<CardStat label="PAC" value="92" hrLabel="Ολοκλήρωση" />`,
  `<CardStat label="ΤΑΣΚ" value="92" hrLabel="Ολοκλήρωση" />`
);
content = content.replace(
  `<CardStat label="SHO" value="90" hrLabel="UPT" />`,
  `<CardStat label="ΥΠΤ" value="90" hrLabel="UPT" />`
);
content = content.replace(
  `<CardStat label="PAS" value="82" hrLabel="Επικοινωνία" />`,
  `<CardStat label="ΕΠΙΚ" value="82" hrLabel="Επικοινωνία" />`
);
content = content.replace(
  `<CardStat label="AGI" value="88" hrLabel="Εξυπηρέτηση" />`,
  `<CardStat label="ΕΞΥΠ" value="88" hrLabel="Εξυπηρέτηση" />`
);
content = content.replace(
  `<CardStat label="PHY" value="78" hrLabel="Εμπειρία" />`,
  `<CardStat label="ΕΜΠ" value="78" hrLabel="Εμπειρία" />`
);

// 3. Impact form submit button. The user wants the submit button to still be there under the form even when writing an idea. Oh wait, it IS there! Wait, maybe the user wants it to NOT have AI analysis in the text?
content = content.replace(
  `{isSubmitting ? 'Υποβολή...' : 'Υποβολή Ιδέας'}\n                    </span>\n                    <ArrowRight className="w-5 h-5 text-white" />`,
  `{isSubmitting ? 'Υποβολη...' : 'Υποβολη'}\n                    </span>\n                    <ArrowRight className="w-5 h-5 text-white" />`
);

// We should also simulate successful form submission -> just show a success message or clear form.
// actually the current setup just resets selectedCategory when submitting. Wait, right now handleSubmit just sets `isSubmitting(true);`
const currentHandleSubmit = `  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  };`;
const newHandleSubmit = `  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedCategory(null);
      alert('Η ιδέα σας υποβλήθηκε επιτυχώς!');
    }, 1000);
  };`;
content = content.replace(currentHandleSubmit, newHandleSubmit);


// 4. Update Missions to have tabs
const oldMissionsCodeStart = `function MissionsView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 w-full max-w-6xl mx-auto"
    >
      <header className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight uppercase">
            Διαθέσιμα <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">Missions</span>
          </h1>
          <p className="text-slate-400 mt-2 font-mono text-sm tracking-widest uppercase">
            Εκπαιδεύσεις & Ανάπτυξη Δεξιοτήτων
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MissionCard 
          title="Customer Service Excellence"
          category="Agility"
          xp="+50 XP"
          progress={100}
          status="completed"
          image="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=600&q=80"
        />
        <MissionCard 
          title="Σεμινάριο Νέων Παραλαβών"
          category="Physical"
          xp="+100 XP"
          progress={45}
          status="in-progress"
          image="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=600&q=80"
        />
        <MissionCard 
          title="Leadership & Store Management"
          category="Pace"
          xp="+200 XP"
          progress={0}
          status="available"
          image="https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=600&q=80"
        />
      </div>
    </motion.div>
  );
}`;

const newMissionsCodeStart = `function MissionsView() {
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
        <div className="flex bg-[#111111]/80 backdrop-blur-md rounded-xl p-1 border border-white/10">
          <button 
            onClick={() => setActiveTab('available')}
            className={cn("px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-colors", activeTab === 'available' ? "bg-red-600 text-white" : "text-slate-400 hover:text-white")}
          >
            Διαθέσιμα
          </button>
          <button 
            onClick={() => setActiveTab('completed')}
            className={cn("px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-colors", activeTab === 'completed' ? "bg-red-600 text-white" : "text-slate-400 hover:text-white")}
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
            category="UPT"
            xp="+3 ΥΠΤ"
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
}`;

content = content.replace(oldMissionsCodeStart, newMissionsCodeStart);

fs.writeFileSync(file, content);
console.log('Final fixes applied!');
