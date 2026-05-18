"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Search, 
  Filter, 
  Eye, 
  Clock, 
  ThumbsUp, 
  Share2,
  Bookmark,
  ChevronRight
} from 'lucide-react';

const companies = ['All', 'Google', 'Amazon', 'Microsoft', 'TCS', 'Infosys', 'Accenture'];

const mockVideos = [
  { id: 1, title: 'Amazon SDE Interview Experience | My Story', company: 'Amazon', role: 'SDE-1', views: '12K', date: '2 days ago', thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60', link: 'https://www.youtube.com/results?search_query=Amazon+SDE+Interview+Experience' },
  { id: 2, title: 'Google Internship Interview Prep Guide', company: 'Google', role: 'SWE Intern', views: '25K', date: '1 week ago', thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60', link: 'https://www.youtube.com/results?search_query=Google+Internship+Interview+Prep+Guide' },
  { id: 3, title: 'TCS Ninja vs Digital | Complete Roadmap', company: 'TCS', role: 'System Engineer', views: '8K', date: '3 days ago', thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60', link: 'https://www.youtube.com/results?search_query=TCS+Ninja+vs+Digital' },
  { id: 4, title: 'How I Cracked Microsoft (Off-Campus)', company: 'Microsoft', role: 'SDE', views: '42K', date: '1 month ago', thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60', link: 'https://www.youtube.com/results?search_query=How+I+Cracked+Microsoft+Off-Campus' },
  { id: 5, title: 'Accenture Cognitive Assessment Strategy', company: 'Accenture', role: 'ASE', views: '15K', date: '5 days ago', thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60', link: 'https://www.youtube.com/results?search_query=Accenture+Cognitive+Assessment+Strategy' },
  { id: 6, title: 'Infosys Certification Exam Tips 2024', company: 'Infosys', role: 'SES', views: '5K', date: '2 weeks ago', thumbnail: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&auto=format&fit=crop&q=60', link: 'https://www.youtube.com/results?search_query=Infosys+Certification+Exam+Tips' },
  { id: 7, title: 'Google L4 Software Engineer Mock Interview', company: 'Google', role: 'SDE-2', views: '102K', date: '2 months ago', thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60', link: 'https://www.youtube.com/results?search_query=Google+Mock+Interview' },
  { id: 8, title: 'Amazon System Design Round Explained', company: 'Amazon', role: 'SDE-2', views: '65K', date: '3 weeks ago', thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60', link: 'https://www.youtube.com/results?search_query=Amazon+System+Design' },
  { id: 9, title: 'TCS Interview Experience 2024 | Latest Pattern', company: 'TCS', role: 'Ninja', views: '18K', date: '4 days ago', thumbnail: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&auto=format&fit=crop&q=60', link: 'https://www.youtube.com/results?search_query=TCS+Interview+Experience+2024' }
];

export default function VideosPage() {
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = mockVideos.filter(v => {
    const companyMatch = selectedCompany === 'All' || v.company === selectedCompany;
    const searchMatch = v.title.toLowerCase().includes(searchQuery.toLowerCase());
    return companyMatch && searchMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Interview <span className="text-gradient">Experience Videos</span></h1>
        <p className="text-gray-400 max-w-2xl">Learn from the journey of students who cracked top companies. Get insights into rounds, questions, and strategies.</p>
      </header>

      {/* Hero Featured Video */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full aspect-[21/9] rounded-[2.5rem] overflow-hidden relative glass mb-12 group"
      >
        <img 
          src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&auto=format&fit=crop&q=80" 
          alt="Featured" 
          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Featured</span>
            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">1.2M Views</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 max-w-3xl leading-tight">Mastering Technical Interviews: The 2024 Strategy Guide</h2>
          <div className="flex items-center gap-6">
            <a href="https://www.youtube.com/results?search_query=Mastering+Technical+Interviews" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform">
              <Play fill="black" size={20} /> Watch Now
            </a>
            <button className="glass p-4 rounded-2xl hover:bg-white/10 transition-colors">
              <Bookmark size={24} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
        <div className="flex flex-wrap gap-2">
          {companies.map(c => (
            <button 
              key={c}
              onClick={() => setSelectedCompany(c)}
              className={`px-6 py-2 rounded-2xl font-semibold transition-all ${
                selectedCompany === c 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'glass text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search interviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 focus:outline-none focus:border-primary/50 w-64 md:w-80"
          />
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode='popLayout'>
          {filteredVideos.map((video, i) => (
            <motion.div
              key={video.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-[2rem] overflow-hidden glass-hover group"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <a href={video.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                    <Play fill="white" size={24} />
                  </div>
                </a>
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold pointer-events-none">
                  12:45
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-tighter bg-primary/10 text-primary px-2 py-0.5 rounded">
                    {video.company}
                  </span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase">
                    {video.role}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-4 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[11px] text-gray-500 font-medium">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Eye size={12} /> {video.views}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {video.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="hover:text-white"><ThumbsUp size={14} /></button>
                    <button className="hover:text-white"><Share2 size={14} /></button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-20 glass p-12 rounded-[3rem] text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-4">Have an Interview Experience to Share?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Help thousands of students by sharing your interview journey. Get rewarded with badges and XP!</p>
          <a href="mailto:nipurnkumar295@gmail.com?subject=Interview%20Experience%20Submission" className="bg-primary px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 mx-auto hover:scale-105 transition-transform w-fit text-white">
            Upload Your Experience <ChevronRight size={20} />
          </a>
        </div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
