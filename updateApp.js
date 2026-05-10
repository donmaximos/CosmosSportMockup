import fs from 'fs';

const path = 'src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

// Update State
content = content.replace("useState<'overview' | 'scouter' | 'impact'>('overview')", "useState<'overview' | 'scouter' | 'impact' | 'missions'>('overview')");

// Replace Header and Logo
content = content.replace(
`<div className="flex items-center gap-3 mb-12 w-full justify-center md:justify-start px-2">
          <Hexagon className="w-8 h-8 text-red-500 fill-red-500/20" />
          <span className="font-bold text-xl tracking-wider text-white hidden md:block">
            COSMOS<span className="text-red-500">HR</span>
          </span>
        </div>`,
`<div className="flex items-center gap-3 mb-12 w-full justify-center md:justify-start px-2">
          <img src="/LOGO.jpg" alt="Cosmos Sport" className="h-[25px] object-contain mix-blend-screen" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>`
);

// Update NavItems in Sidebar
content = content.replace(
`<NavItem icon={<Layers />} label="Squads" />`,
`<NavItem 
            icon={<Layers />} 
            label="Missions" 
            active={activeTab === 'missions'} 
            onClick={() => setActiveTab('missions')} 
          />`
);

content = content.replace(`<NavItem icon={<BarChart2 />} label="Analytics" />`, ``);
content = content.replace(`label="Settings"`, `label="Ρυθμίσεις"`);

// Add MissionsView rendering
content = content.replace(
`{activeTab === 'impact' && <ImpactView />}`,
`{activeTab === 'impact' && <ImpactView />}
        {activeTab === 'missions' && <MissionsView />}`
);

// Add Share button in PlayerCard
content = content.replace(
`<div className="absolute inset-[2px] bg-gradient-to-b from-[#111111] to-[#111111] rounded-[1.85rem] z-10 overflow-hidden flex flex-col">`,
`<div className="absolute inset-[2px] bg-gradient-to-b from-[#111111] to-[#111111] rounded-[1.85rem] z-10 overflow-hidden flex flex-col">
        <button className="absolute top-4 right-4 z-40 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/20 text-white hover:text-red-400 hover:border-red-400 transition-colors cursor-pointer active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
        </button>`
);

// Translate statsData
content = content.replace(
`const statsData = [
  { subject: 'Task Completion', skill: 'Pace', current: 92, max: 100 },
  { subject: 'UPT', skill: 'Shooting', current: 90, max: 100 },
  { subject: 'Communication', skill: 'Passing', current: 82, max: 100 },
  { subject: 'Cust. Approach', skill: 'Agility', current: 88, max: 100 },
  { subject: 'Experience', skill: 'Physical', current: 78, max: 100 },
];`,
`const statsData = [
  { subject: 'Ολοκλήρωση Task', skill: 'Pace', current: 92, max: 100 },
  { subject: 'UPT', skill: 'Shooting', current: 90, max: 100 },
  { subject: 'Επικοινωνία', skill: 'Passing', current: 82, max: 100 },
  { subject: 'Εξυπηρέτηση', skill: 'Agility', current: 88, max: 100 },
  { subject: 'Εμπειρία', skill: 'Physical', current: 78, max: 100 },
];`
);

// Translate Player Card hr labels
content = content.replace(`hrLabel="Completion"`, `hrLabel="Ολοκλήρωση"`);
content = content.replace(`hrLabel="Comm"`, `hrLabel="Επικοινωνία"`);
content = content.replace(`hrLabel="Approach"`, `hrLabel="Εξυπηρέτηση"`);
content = content.replace(`hrLabel="Experience"`, `hrLabel="Εμπειρία"`);

// Translations in OverviewView
content = content.replace(`HR Employee Analytics Control Room`, `Κέντρο Ελέγχου Αναλυτικών Δεδομένων Προσωπικού`);
content = content.replace(`Current Season`, `Τρέχουσα Σεζόν`);
content = content.replace(`XP for Missions`, `XP για Missions`);
content = content.replace(`XP & Sneakers Unlock`, `XP και Συλλεκτικά Sneakers`);
content = content.replace(`Overall Boost Potential`, `Δυνατότητα Βελτίωσης Overall`);
content = content.replace(`Matches/Projects`, `Έργα / Projects`);
content = content.replace(`Total assignments`, `Συνολικές Αναθέσεις`);
content = content.replace(`Global Rank`, `Παγκόσμια Κατάταξη`);
content = content.replace(`Top 5% of Department`, `Top 5% του Τμήματος`);
content = content.replace(`Attribute Radar`, `Ραντάρ Χαρακτηριστικών`);
content = content.replace(`Detailed Attributes`, `Αναλυτικά Χαρακτηριστικά`);
content = content.replace(`>Boost<`, `>Boost<`);

// Translations in ScouterView
content = content.replace(`Active Referral Gamification`, `Σύστημα Ανταμοιβής Συστάσεων`);
content = content.replace(`Your Referral: Chloe`, `Η Σύστασή σου: Chloe`);
content = content.replace(`Frontend Engineer Candidate`, `Υποψήφια Frontend Engineer`);
content = content.replace(`260 XP Pending`, `Εκκρεμούν 260 XP`);
content = content.replace(`Friend Chloe Submitted`, `Η σύσταση της Chloe καταχωρήθηκε`);
content = content.replace(`Interview Scheduled`, `Προγραμματίστηκε Συνέντευξη`);
content = content.replace(`"Pending"`, `"Σε εκκρεμότητα"`);
content = content.replace(`Final Interview Reached`, `Έφτασε στην Τελική Συνέντευξη`);
content = content.replace(/"Locked"/g, `"Κλειδωμένο"`);
content = content.replace(`Friend Chloe Hired`, `Η Chloe Προσλήφθηκε`);
content = content.replace(`Reward Catalog`, `Κατάλογος Ανταμοιβών`);
content = content.replace(`Cosmos Limited Sneakers`, `Συλλεκτικά Αθλητικά Cosmos`);
content = content.replace(`Extra Leave Day`, `Επιπλέον Ημέρα Άδειας`);
content = content.replace(`Scouter Bonus`, `Mπόνους Scouter`);
content = content.replace(`Refer another friend before the season ends for a 1.5x XP multiplier.`, `Πρότεινε έναν ακόμα φίλο πριν το τέλος της σεζόν για πολλαπλασιαστή 1.5x XP.`);
content = content.replace(`Submit Referral`, `Υποβολή Σύστασης`);
content = content.replace(/>Progress</g, `>Πρόοδος<`);

// Translations in ImpactView
content = content.replace(`Internal Open Innovation Platform`, `Εσωτερική Πλατφόρμα Ανοιχτής Καινοτομίας`);
content = content.replace(`Submit Your Idea`, `Υπόβαλε την Ιδέα σου`);
content = content.replace(`Idea Title`, `Τίτλος Ιδέας`);
content = content.replace(`Attachments (Optional)`, `Συνημμένα (Προαιρετικό)`);
content = content.replace(`Upload schematics`, `Άνέβασμα αρχείων`);
content = content.replace(/>Submit</, `>Υποβολή<`);
content = content.replace(`AI Filtering Process`, `Διαδικασία Ελέγχου AI`);
content = content.replace(`Real-Time Analysis & Impact Prediction`, `Ανάλυση & Πρόβλεψη σε Πραγματικό Χρόνο`);
content = content.replace(`AI Score`, `Βαθμολογία AI`);
content = content.replace(`Threshold Met`, `Το όριο επιτεύχθηκε`);
content = content.replace(/>Status</, `>Κατάσταση<`);
content = content.replace(`AI Approved`, `Εγκρίθηκε από το AI`);
content = content.replace(`Next Stage`, `Επόμενο Στάδιο`);
content = content.replace(`Forward to <br/>Operations Manager`, `Προώθηση σε <br/>Operations Manager`);
content = content.replace(`Optimize Stock Layout`, `Βελτιστοποίηση Διάταξης Αποθέματος`);
content = content.replace(`Reorganize the top-tier inventory based on the predictive seasonal demand algorithms to decrease retrieval time by 15%.`, `Αναδιοργάνωση του κορυφαίου αποθέματος με βάση τους αλγόριθμους πρόβλεψης εποχιακής ζήτησης για μείωση του χρόνου ανάκτησης κατά 15%.`);
content = content.replace(/>Description</g, `>Περιγραφή<`);

// Add MissionsView component definition (just appending to the end)
const missionsViewCode = fs.readFileSync('missions.txt', 'utf8');

content += '\n' + missionsViewCode;

fs.writeFileSync(path, content);
console.log('App.tsx Updated!');
