"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Settings, 
  Users, 
  Database, 
  Video, 
  FileText,
  BarChart,
  ShieldCheck,
  Search,
  MoreVertical
} from 'lucide-react';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('questions');

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: <BarChart size={20} /> },
    { id: 'questions', label: 'DSA Questions', icon: <Database size={20} /> },
    { id: 'videos', label: 'Videos', icon: <Video size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <ShieldCheck className="text-primary" size={40} />
            Admin <span className="text-gradient">Control Center</span>
          </h1>
          <p className="text-gray-400">Manage questions, users, and platform content.</p>
        </div>
        <button className="bg-primary hover:bg-primary-dark px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all">
          <Plus size={20} /> Add New Content
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                activeTab === tab.id 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'glass text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
          <div className="mt-8 pt-8 border-t border-white/5">
            <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-gray-400 hover:text-white transition-all">
              <Settings size={20} /> Settings
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Total Users', value: '1,284', change: '+12%', color: 'text-blue-500' },
              { label: 'Questions', value: '450', change: '+5', color: 'text-green-500' },
              { label: 'Avg Time', value: '42m', change: '-2%', color: 'text-purple-500' },
            ].map((stat, i) => (
              <div key={i} className="glass p-6 rounded-3xl">
                <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-black">{stat.value}</h3>
                  <span className={`text-xs font-bold ${stat.color}`}>{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table Area */}
          <div className="glass rounded-[2rem] overflow-hidden">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-xl font-bold">Recent {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Filter..."
                  className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-sm border-b border-white/5">
                    <th className="px-8 py-4 font-semibold">Title / Name</th>
                    <th className="px-8 py-4 font-semibold">Status</th>
                    <th className="px-8 py-4 font-semibold">Date</th>
                    <th className="px-8 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item} className="hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-4 font-bold">Example Item #{item}</td>
                      <td className="px-8 py-4">
                        <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase">Active</span>
                      </td>
                      <td className="px-8 py-4 text-sm text-gray-400">May 15, 2024</td>
                      <td className="px-8 py-4 text-right">
                        <button className="p-2 hover:text-white text-gray-500 transition-colors"><MoreVertical size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
