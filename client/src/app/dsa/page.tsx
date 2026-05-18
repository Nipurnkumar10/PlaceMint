"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  ExternalLink, 
  MessageSquare,
  Tag,
  ChevronDown,
  LayoutGrid,
  List
} from 'lucide-react';

const categories = ['All', 'Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'DP', 'Recursion'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

const mockQuestions = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', category: 'Arrays', companies: ['Amazon', 'Google'], solved: false, link: 'https://leetcode.com/problems/two-sum/' },
  { id: 2, title: 'Longest Palindromic Substring', difficulty: 'Medium', category: 'Strings', companies: ['Microsoft', 'Amazon'], solved: false, link: 'https://leetcode.com/problems/longest-palindromic-substring/' },
  { id: 3, title: 'Merge k Sorted Lists', difficulty: 'Hard', category: 'Linked Lists', companies: ['Google', 'Facebook'], solved: false, link: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
  { id: 4, title: 'Validate Binary Search Tree', difficulty: 'Medium', category: 'Trees', companies: ['Amazon', 'Apple'], solved: false, link: 'https://leetcode.com/problems/validate-binary-search-tree/' },
  { id: 5, title: 'Number of Islands', difficulty: 'Medium', category: 'Graphs', companies: ['Google', 'Bloomberg'], solved: false, link: 'https://leetcode.com/problems/number-of-islands/' },
  { id: 6, title: 'Climbing Stairs', difficulty: 'Easy', category: 'DP', companies: ['Adobe', 'Goldman Sachs'], solved: false, link: 'https://leetcode.com/problems/climbing-stairs/' },
];

export default function DSAPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const filteredQuestions = mockQuestions.filter(q => {
    const categoryMatch = selectedCategory === 'All' || q.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    const searchMatch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && difficultyMatch && searchMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">DSA <span className="text-gradient">Preparation Sheet</span></h1>
        <p className="text-gray-400 max-w-2xl">Master the most frequently asked Data Structures and Algorithms questions from top-tier tech companies.</p>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 focus:outline-none focus:border-primary/50 w-64 md:w-80"
            />
          </div>
          
          <div className="flex items-center glass rounded-2xl p-1">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-500 hover:text-white'}`}
            >
              <List size={20} />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-500 hover:text-white'}`}
            >
              <LayoutGrid size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-2xl">
            <Filter size={16} className="text-gray-400" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-sm font-medium focus:outline-none"
            >
              {categories.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2 glass px-4 py-2 rounded-2xl">
            <select 
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-transparent text-sm font-medium focus:outline-none"
            >
              {difficulties.map(d => <option key={d} value={d} className="bg-slate-900">{d}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="glass p-6 rounded-3xl mb-12">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold">Total Progress</span>
          <span className="text-primary font-bold">0%</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '0%' }}
            className="h-full bg-gradient-primary rounded-full"
          />
        </div>
      </div>

      {/* Questions List */}
      <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        <AnimatePresence mode='popLayout'>
          {filteredQuestions.map((q) => (
            <motion.div
              key={q.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`glass p-6 rounded-3xl glass-hover group flex ${viewMode === 'list' ? 'items-center justify-between' : 'flex-col gap-4'}`}
            >
              <div className="flex items-center gap-6">
                <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${q.solved ? 'bg-green-500/20 text-green-500' : 'bg-white/5 text-gray-600 hover:text-white'}`}>
                  <CheckCircle size={24} />
                </button>
                <div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{q.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      q.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' : 
                      q.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' : 
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {q.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">{q.category}</span>
                  </div>
                </div>
              </div>

              <div className={`flex items-center gap-4 ${viewMode === 'grid' ? 'mt-4 pt-4 border-t border-white/5 w-full justify-between' : ''}`}>
                <div className="flex -space-x-2">
                  {q.companies.map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold" title={c}>
                      {c[0]}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 transition-all">
                    <MessageSquare size={18} />
                  </button>
                  <a href={q.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-all flex items-center justify-center">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold text-gray-500">No questions found matching your criteria.</h3>
        </div>
      )}
    </div>
  );
}
