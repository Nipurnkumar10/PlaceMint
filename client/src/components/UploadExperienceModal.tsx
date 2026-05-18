import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Send } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

interface UploadExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadExperienceModal({ isOpen, onClose }: UploadExperienceModalProps) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    studentName: user?.fullName || '',
    company: '',
    role: '',
    dateOfInterview: '',
    rounds: [{ roundName: '', details: '' }],
    tips: ['']
  });

  const handleRoundChange = (index: number, field: string, value: string) => {
    const newRounds = [...formData.rounds];
    newRounds[index] = { ...newRounds[index], [field]: value };
    setFormData({ ...formData, rounds: newRounds });
  };

  const addRound = () => setFormData({ ...formData, rounds: [...formData.rounds, { roundName: '', details: '' }] });
  const removeRound = (index: number) => {
    const newRounds = formData.rounds.filter((_, i) => i !== index);
    setFormData({ ...formData, rounds: newRounds });
  };

  const handleTipChange = (index: number, value: string) => {
    const newTips = [...formData.tips];
    newTips[index] = value;
    setFormData({ ...formData, tips: newTips });
  };

  const addTip = () => setFormData({ ...formData, tips: [...formData.tips, ''] });
  const removeTip = (index: number) => {
    const newTips = formData.tips.filter((_, i) => i !== index);
    setFormData({ ...formData, tips: newTips });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to submit an experience.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        userId: user.id, // Using Clerk ID
        studentName: formData.studentName || 'Anonymous',
        company: formData.company,
        role: formData.role,
        dateOfInterview: formData.dateOfInterview,
        rounds: formData.rounds.filter(r => r.roundName || r.details),
        tips: formData.tips.filter(t => t.trim() !== '')
      };

      const res = await fetch('https://placemint-backend-lsxb.onrender.com/api/experiences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Failed to submit experience');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        // Reset form
        setFormData({
          studentName: user.fullName || '',
          company: '',
          role: '',
          dateOfInterview: '',
          rounds: [{ roundName: '', details: '' }],
          tips: ['']
        });
      }, 3000);

    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass p-8 rounded-3xl z-10"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>

          <h2 className="text-3xl font-black mb-2">Share Your Experience</h2>
          <p className="text-gray-400 mb-8">Help others by sharing the details of your interview process.</p>

          {success ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
              className="bg-green-500/20 border border-green-500/50 text-green-400 p-6 rounded-2xl text-center"
            >
              <h3 className="text-xl font-bold mb-2">Thank you! 🎉</h3>
              <p>Your experience has been submitted successfully and is pending approval.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-4 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Company Name *</label>
                  <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50" placeholder="e.g. Amazon, Google" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Role / Title *</label>
                  <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50" placeholder="e.g. SDE-1, Intern" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Your Name</label>
                  <input type="text" value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50" placeholder="Leave empty for Anonymous" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Date of Interview</label>
                  <input type="date" value={formData.dateOfInterview} onChange={e => setFormData({...formData, dateOfInterview: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-white scheme-dark" />
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold mb-4 border-b border-white/10 pb-2">Interview Rounds</label>
                {formData.rounds.map((round, index) => (
                  <div key={index} className="bg-white/5 p-4 rounded-2xl mb-4 relative group">
                    {formData.rounds.length > 1 && (
                      <button type="button" onClick={() => removeRound(index)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400">
                        <Trash2 size={18} />
                      </button>
                    )}
                    <input type="text" placeholder={`Round ${index + 1} Name (e.g. Technical Assessment)`} value={round.roundName} onChange={e => handleRoundChange(index, 'roundName', e.target.value)} className="w-full bg-transparent border-b border-white/10 px-2 py-2 mb-3 focus:outline-none focus:border-primary/50 font-semibold" />
                    <textarea placeholder="Questions asked, topics covered, difficulty level..." value={round.details} onChange={e => handleRoundChange(index, 'details', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 min-h-[100px]" />
                  </div>
                ))}
                <button type="button" onClick={addRound} className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                  <Plus size={16} /> Add Another Round
                </button>
              </div>

              <div>
                <label className="block text-lg font-bold mb-4 border-b border-white/10 pb-2">Tips & Advice</label>
                {formData.tips.map((tip, index) => (
                  <div key={index} className="flex items-center gap-2 mb-3">
                    <input type="text" value={tip} onChange={e => handleTipChange(index, e.target.value)} placeholder="Tip for future candidates..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50" />
                    {formData.tips.length > 1 && (
                      <button type="button" onClick={() => removeTip(index)} className="p-3 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-xl transition-colors">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addTip} className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                  <Plus size={16} /> Add Another Tip
                </button>
              </div>

              <div className="pt-6">
                <button type="submit" disabled={loading} className="w-full bg-gradient-primary text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? 'Submitting...' : <><Send size={18} /> Submit Experience</>}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
