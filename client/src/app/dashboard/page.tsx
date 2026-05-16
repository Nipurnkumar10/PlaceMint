"use client";
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Flame, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Star,
  ChevronRight,
  BookMarked
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const stats = [
    { label: 'Daily Streak', value: '12 Days', icon: <Flame className="text-orange-500" />, color: 'bg-orange-500/10' },
    { label: 'Solved', value: '142', icon: <CheckCircle2 className="text-green-500" />, color: 'bg-green-500/10' },
    { label: 'Avg Score', value: '85%', icon: <Star className="text-yellow-500" />, color: 'bg-yellow-500/10' },
    { label: 'XP Points', value: '2,450', icon: <Trophy className="text-blue-500" />, color: 'bg-blue-500/10' },
  ];

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        fill: true,
        label: 'Questions Solved',
        data: [5, 8, 4, 12, 15, 6, 9],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { display: false },
      x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Welcome back, <span className="text-gradient">Student!</span></h1>
        <p className="text-gray-400">Here's your progress for this week.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-3xl flex items-center gap-4"
          >
            <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass p-8 rounded-3xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" />
              Weekly Progress
            </h3>
            <span className="text-xs font-bold bg-white/5 px-3 py-1 rounded-full text-gray-400">THIS WEEK</span>
          </div>
          <div className="h-64">
            <Line data={chartData} options={options} />
          </div>
        </motion.div>

        {/* Daily Challenge Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-8 rounded-3xl bg-gradient-primary relative overflow-hidden group"
        >
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">Daily Challenge</h3>
            <p className="text-white/80 text-sm mb-6">Complete today's challenge and earn 50 bonus XP!</p>
            
            <div className="bg-black/20 backdrop-blur-md p-4 rounded-2xl mb-6">
              <h4 className="font-bold mb-1">Implement a LRU Cache</h4>
              <p className="text-xs text-white/60">Medium • Linked List, Hash Map</p>
            </div>

            <button className="w-full bg-white text-primary font-bold py-3 rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
              Start Now <ChevronRight size={18} />
            </button>
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500" />
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Recent Activity</h3>
        <div className="grid grid-cols-1 gap-4">
          {[
            { task: 'Solved "Reverse Linked List"', type: 'DSA', time: '2 hours ago', icon: <CheckCircle2 className="text-green-500" size={18} /> },
            { task: 'Completed "Logical Reasoning Quiz"', type: 'Aptitude', time: '5 hours ago', icon: <Clock className="text-blue-500" size={18} /> },
            { task: 'Saved "Amazon SDE Roadmap"', type: 'Roadmap', time: 'Yesterday', icon: <BookMarked className="text-purple-500" size={18} /> },
          ].map((activity, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  {activity.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{activity.task}</h4>
                  <p className="text-xs text-gray-400">{activity.type}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
