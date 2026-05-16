"use client";
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Rocket, Code, Brain, Video } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-8 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-primary font-medium"
        >
          <Rocket size={18} />
          <span>Launch your career today</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          Master Your <span className="text-gradient">Placements</span> <br /> 
          with PlaceMint
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl"
        >
          The all-in-one platform for B.Tech students to practice DSA, master aptitude, 
          and learn from real interview experiences.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mt-4"
        >
          <Link href="/dashboard" className="bg-primary hover:bg-primary-dark px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 transition-all group">
            Get Started Free
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/dsa" className="glass hover:bg-white/5 px-8 py-4 rounded-2xl font-bold text-lg transition-all">
            Browse DSA Sheets
          </Link>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20">
        {[
          { title: 'DSA Preparation', desc: 'Hand-picked questions from top companies like Amazon, Google & Microsoft.', icon: <Code className="text-blue-500" size={32} /> },
          { title: 'Aptitude Tests', desc: 'Timed quizzes and mock tests to improve your speed and accuracy.', icon: <Brain className="text-purple-500" size={32} /> },
          { title: 'Interview Archive', desc: 'Watch real-world interview experiences and learn from the experts.', icon: <Video className="text-red-500" size={32} /> },
        ].map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-3xl glass glass-hover group"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Trust Banner */}
      <section className="text-center py-20 border-t border-white/5 mt-20">
        <h2 className="text-gray-500 font-semibold tracking-widest uppercase mb-12">Trusted by students at</h2>
        <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
          {['TCS', 'Infosys', 'Wipro', 'Accenture', 'Amazon'].map((company) => (
            <span key={company} className="text-3xl font-black text-white">{company}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
