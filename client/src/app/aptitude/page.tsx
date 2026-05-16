"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Timer, 
  Brain, 
  Trophy, 
  ChevronRight, 
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Lightbulb
} from 'lucide-react';

export default function AptitudePage() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = [
    {
      q: "A train 120m long passes a man, running at 5 km/hr in the same direction in which the train is going, in 10 seconds. The speed of the train is:",
      options: ["45 km/hr", "48.2 km/hr", "50 km/hr", "54 km/hr"],
      correct: 1
    },
    {
      q: "If 15% of 40 is greater than 25% of a number by 2, then the number is:",
      options: ["12", "16", "20", "24"],
      correct: 1
    },
    {
      q: "The average weight of 8 persons increases by 2.5 kg when a new person comes in place of one of them weighing 65 kg. What might be the weight of the new person?",
      options: ["70 kg", "75 kg", "80 kg", "85 kg"],
      correct: 3
    }
  ];

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !quizFinished) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setQuizFinished(true);
    }
  }, [quizStarted, timeLeft, quizFinished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (index: number) => {
    if (index === questions[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Aptitude <span className="text-gradient">Training Lab</span></h1>
        <p className="text-gray-400 max-w-2xl">Sharpen your quantitative, logical, and verbal skills with our timed practice quizzes.</p>
      </header>

      {!quizStarted && !quizFinished ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="glass p-12 rounded-[3rem] relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-8">
                  <Brain size={32} className="text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Ready for a Mock Test?</h2>
                <p className="text-gray-400 mb-8 max-w-lg">This test consists of 10 questions covering various aptitude topics. You have 10 minutes to complete it.</p>
                <button 
                  onClick={() => setQuizStarted(true)}
                  className="bg-primary px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-3"
                >
                  Start Quiz <ChevronRight size={20} />
                </button>
              </div>
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <Brain size={200} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Quantitative', count: '120+ Questions', icon: <BarChart3 className="text-blue-500" /> },
                { title: 'Logical Reasoning', count: '85+ Questions', icon: <Lightbulb className="text-yellow-500" /> },
              ].map((cat, i) => (
                <div key={i} className="glass p-8 rounded-[2rem] glass-hover">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">{cat.icon}</div>
                  <h3 className="text-xl font-bold mb-1">{cat.title}</h3>
                  <p className="text-sm text-gray-500">{cat.count}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass p-8 rounded-[2rem]">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Trophy size={20} className="text-yellow-500" /> Leaderboard</h3>
              <div className="space-y-4">
                {[
                  { name: 'Rahul S.', score: '980', rank: 1 },
                  { name: 'Priya K.', score: '945', rank: 2 },
                  { name: 'Amit V.', score: '910', rank: 3 },
                ].map((user) => (
                  <div key={user.rank} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-xs font-black text-gray-500">{user.rank}</span>
                      <span className="font-bold">{user.name}</span>
                    </div>
                    <span className="text-primary font-bold">{user.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : quizStarted && !quizFinished ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4 glass px-6 py-3 rounded-2xl">
              <Timer className={timeLeft < 60 ? "text-red-500 animate-pulse" : "text-primary"} size={20} />
              <span className={`text-xl font-mono font-bold ${timeLeft < 60 ? "text-red-500" : ""}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="text-gray-400 font-bold">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          <div className="glass p-12 rounded-[3rem] mb-8">
            <h2 className="text-2xl font-bold mb-12 leading-relaxed">
              {questions[currentQuestion].q}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {questions[currentQuestion].options.map((option, i) => (
                <button 
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full text-left p-6 rounded-2xl glass hover:bg-primary/10 hover:border-primary/30 transition-all font-bold flex items-center justify-between group"
                >
                  {option}
                  <div className="w-6 h-6 rounded-full border-2 border-white/10 group-hover:border-primary/50" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto text-center glass p-16 rounded-[4rem]"
        >
          <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} className="text-green-500" />
          </div>
          <h2 className="text-4xl font-black mb-4">Quiz Completed!</h2>
          <p className="text-gray-400 mb-12">Great effort! Here's how you performed today.</p>
          
          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
              <p className="text-sm text-gray-500 mb-1">Score</p>
              <h3 className="text-3xl font-black text-primary">{score}/{questions.length}</h3>
            </div>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
              <p className="text-sm text-gray-500 mb-1">Accuracy</p>
              <h3 className="text-3xl font-black text-green-500">{Math.round((score/questions.length)*100)}%</h3>
            </div>
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-primary py-4 rounded-2xl font-bold hover:scale-105 transition-transform"
          >
            Try Again
          </button>
        </motion.div>
      )}
    </div>
  );
}
