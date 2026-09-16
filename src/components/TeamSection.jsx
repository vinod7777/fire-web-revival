import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import TeamCard from "./TeamCard";

const teamMembers = [
  { id: 1, role: 'Convener', name: 'G. Chinmay', dept: 'CSM', image: '/team/G_Chinmay.jpg' },
  { id: 2, role: 'Co Convener', name: 'Niranjan Muddada', dept: 'EEE', image: '/team/Niranjan_Muddada.jpg' },
  { id: 3, role: 'Co Convener', name: 'Smruti Sabujima', dept: 'CSE', image: '/team/Smruti_Sabujima.jpg' },
  { id: 4, role: 'Corporate Relations', name: 'Ruppa Kritika', dept: 'CSE', image: '/team/Ruppa_Krithika.jpg' },
  { id: 5, role: 'Corporate Relations', name: 'Kanthuri Yamini', dept: 'IT' },
  { id: 6, role: 'Finance', name: 'Korrayi Yuvraju', dept: 'CSD', image: '/team/Korrayi_Yuvraju.jpg' },
  { id: 7, role: 'Promotions', name: 'Jaddu Pavani', dept: 'ECE', image: '/team/Jaddu_Pavani.jpg' },
  { id: 8, role: 'Promotions', name: 'Sanapala Pavan Kumar', dept: 'CIVIL', image: '/team/SANAPALA_PAVANKUMAR.jpg' },
  { id: 9, role: 'Promotions', name: 'Nalla Madhulatha', dept: 'CSM', image: '/team/Nalla_Madhulatha.jpg' },
  { id: 10, role: 'Design', name: 'Magam Blesson', dept: 'CSE', image: '/team/Magam_Blesson.jpg' },
  { id: 11, role: 'Design', name: 'Chennamsetty Chaitanya Sai Koushik', dept: 'IT', image: '/team/Chennamsetty_Chaitanya_Sai_Koushik.jpg' },
  { id: 12, role: 'Media', name: 'R. Srinivas Naidu', dept: 'CSM' },
  { id: 13, role: 'Media', name: 'Nadiminti kali prasanna', dept: 'ECE' },
  { id: 14, role: 'Outreach', name: 'Abdul Rehman', dept: 'IT', image: '/team/Abdul_Rehman.jpg' },
  { id: 15, role: 'Outreach', name: 'Bonthu Yamini Gayatri', dept: 'ECE', image: '/team/Bonthu_Yamini_Gayatri.jpg' },
  { id: 16, role: 'Outreach', name: 'Sripurushottama Mohan Sai', dept: 'CSE', image: '/team/Sripurushottama_Mohan_Sai.jpg' },
  { id: 17, role: 'Sponsorships', name: 'Potnuru Joshitha', dept: 'IT', image: '/team/Potnuru_Joshitha.jpg' },
  { id: 18, role: 'Sponsorships', name: 'Medepalli Vamsi', dept: 'CSE', image: '/team/Vamsi_Sharma.jpg' },
  { id: 19, role: 'Art & Creative', name: 'Tampa Likhitha', dept: 'CSM', image: '/team/Tampa_Likhitha.jpg' },
  { id: 20, role: 'Art & Creative', name: 'Yogendra korada', dept: 'ECE' },
  { id: 21, role: 'Entertainment', name: 'Korla Niharika', dept: 'CSM', image: '/team/Korla_Niharika.jpg' },
  { id: 22, role: 'Entertainment', name: 'Macharala Anand Kumar', dept: 'IT', image: '/team/MACHARLA_ANANDKUMAR.jpg' },
  { id: 23, role: 'Web', name: 'Sanapala Vinod Kumar', dept: 'CSE', image: '/team/sanapala_vinod_kumar.jpg' },
  { id: 24, role: 'Tech Team', name: 'Tudumu Omkar', dept: 'ECE', image: '/team/TUDUMU_OMKAR.jpg' },
  { id: 25, role: 'Tech Team', name: 'Allu Dhilleswara Rao', dept: 'CSM', image: '/team/Allu_Dhilleswara_Rao.jpg' },
  { id: 26, role: 'Food & Logistics', name: 'Gorribanda Tarun Kumar', dept: 'IT', image: '/team/Gorribanda_Tarun_Kumar.jpg' },
  { id: 27, role: 'Food & Logistics', name: 'Balli Sai Kiran', dept: 'CSE', image: '/team/Balli_Sai_Kiran.jpg' },
  { id: 28, role: 'Travel', name: 'Gunttamukkala Santosh Kumar', dept: 'IT', image: '/team/Gunttamukkala_Santosh_Kumar.jpg' },
  { id: 29, role: 'Travel', name: 'Sahukari Sidhartha', dept: 'MCA' },
  { id: 30, role: 'Hospitality', name: 'Behera Samira Patnaik', dept: 'ECE', image: '/team/Behera_Samira_Patnaik.jpg' },
  { id: 31, role: 'Hospitality', name: 'Sai Sravan', dept: 'IT', image: '/team/Sai_sravan.jpg' },
  { id: 32, role: 'Registration', name: 'Annepu Pujitha', dept: 'CSM', image: '/team/Annepu_Pujitha.jpg' },
  { id: 33, role: 'Registration', name: 'Kintali Reshma Sree', dept: 'IT', image: '/team/Kintali_Reshma_Sree.jpg' },
  { id: 34, role: 'Registration', name: 'Gudla Swaroopa', dept: 'IT', image: '/team/Gudla_Swaroopa.jpg' },
  { id: 35, role: 'Registration', name: 'Killamsetti Venkata Sree Sai charishma', dept: 'CSE', image: '/team/Killamsetti_Venkata_Sree_Sai_charishma.jpg' },
  { id: 36, role: 'Quality Assurance', name: 'Pavitra Pasala', dept: 'EEE', image: '/team/Pavitra_Pasala.jpg' },
  { id: 37, role: 'Quality Assurance', name: 'Reddy Durga Pavan Kumar', dept: 'CSE', image: '/team/Reddy_Durga_Pavan_Kumar.jpg' },
  { id: 38, role: 'Reporting', name: 'Inkuri Benarji Kumar', dept: 'CSD', image: '/team/INKURI_BENARJI_KUMAR.jpg' },
  { id: 39, role: 'Reporting', name: 'Vakamullu Tejaswi', dept: 'CSE', image: '/team/Vakamullu_tejaswi.jpg' },
  { id: 40, role: 'Operation', name: 'Pragada Surya Santosh', dept: 'IT', image: '/team/Pragada_Surya_Santosh.jpg' },
  { id: 41, role: 'Operation', name: 'Kola Vivekanandu', dept: 'CSM' },
];

const getCategory = (role) => {
  if (/Convener/i.test(role)) return 'Leads';
  if (/Web|Tech/i.test(role)) return 'Tech & Web';
  if (/Design|Media|Art|Entertainment/i.test(role)) return 'Design & Media';
  if (/Corporate|Outreach|Sponsorship|Promotion/i.test(role)) return 'Promotions & Outreach';
  return 'Operations & Logistics';
};

const CATEGORIES = [
  'All',
  'Leads',
  'Tech & Web',
  'Design & Media',
  'Promotions & Outreach',
  'Operations & Logistics',
];

const TeamSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = useMemo(() => {
    return teamMembers.filter((member) => {
      const matchesCategory =
        selectedCategory === 'All' || getCategory(member.role) === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        member.name.toLowerCase().includes(q) ||
        member.role.toLowerCase().includes(q) ||
        member.dept.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden min-h-screen" id="team">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Title & Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-display font-black text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.7)] tracking-wide mb-4">
            OUR TEAM
          </h2>
          <div className="w-28 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full mb-4" />
          <p className="text-cyan-300/70 font-mono text-xs md:text-sm tracking-widest max-w-xl mx-auto uppercase">
            The visionary minds orchestrating AVISHKAAR Season 4
          </p>
        </div>

        {/* Controls: Search Bar + Category Pills */}
        <div className="max-w-4xl mx-auto mb-12 flex flex-col gap-5 items-center">
          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search team member, role, or department..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-900/80 border border-cyan-500/30 focus:border-cyan-400 rounded-full text-white placeholder-slate-400 font-mono text-xs md:text-sm outline-none transition-all shadow-[0_0_15px_rgba(34,211,238,0.08)] focus:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300 text-xs font-bold px-2 py-0.5"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {CATEGORIES.map((cat) => {
              const count =
                cat === 'All'
                  ? teamMembers.length
                  : teamMembers.filter((m) => getCategory(m.role) === cat).length;
              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-display font-bold tracking-wider transition-all duration-200 border ${
                    isSelected
                      ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                      : 'bg-slate-900/60 border-cyan-500/20 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300'
                  }`}
                >
                  {cat} <span className="opacity-60 text-[10px] ml-1 font-mono">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Members Grid - High Performance, No Layout Thrashing */}
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            {filteredMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400 font-mono text-sm">
            No team members found matching "{searchQuery}"
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
