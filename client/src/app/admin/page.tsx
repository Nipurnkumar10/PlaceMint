"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Settings, 
  Users, 
  Database, 
  Video, 
  BarChart,
  ShieldCheck,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  Trash2,
  FileText
} from 'lucide-react';

const ADMIN_EMAIL = 'nipurnkumar295@gmail.com';

export default function AdminPanel() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('experiences');
  const [experiences, setExperiences] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: <BarChart size={20} /> },
    { id: 'questions', label: 'DSA Questions', icon: <Database size={20} /> },
    { id: 'videos', label: 'Videos', icon: <Video size={20} /> },
    { id: 'experiences', label: 'Experiences', icon: <FileText size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
  ];

  useEffect(() => {
    if (isLoaded && (!user || user.emailAddresses[0].emailAddress !== ADMIN_EMAIL)) {
      router.push('/');
    }
  }, [user, isLoaded, router]);

  useEffect(() => {
    if (user?.emailAddresses[0].emailAddress === ADMIN_EMAIL) {
      if (activeTab === 'experiences') {
        fetchExperiences();
      } else if (activeTab === 'users') {
        fetchUsers();
      }
    }
  }, [activeTab, user]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsersList(data);
      }
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://placemint-backend-lsxb.onrender.com/api/experiences/all');
      const data = await res.json();
      setExperiences(data);
    } catch (err) {
      console.error("Failed to fetch experiences", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`https://placemint-backend-lsxb.onrender.com/api/experiences/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchExperiences();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const deleteExperience = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    try {
      await fetch(`https://placemint-backend-lsxb.onrender.com/api/experiences/${id}`, {
        method: 'DELETE'
      });
      fetchExperiences();
    } catch (err) {
      console.error("Failed to delete experience", err);
    }
  };

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user || user.emailAddresses[0].emailAddress !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <ShieldCheck size={64} className="mx-auto text-red-500 mb-6" />
          <h1 className="text-4xl font-black mb-4">Unauthorized Access</h1>
          <p className="text-gray-400">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

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
          {activeTab === 'experiences' ? (
            <div className="glass rounded-[2rem] overflow-hidden">
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xl font-bold">Interview Experiences Moderation</h3>
                <button onClick={fetchExperiences} className="text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-colors">
                  Refresh
                </button>
              </div>
              
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-8 text-center text-gray-400">Loading experiences...</div>
                ) : experiences.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">No experiences found.</div>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-gray-500 text-sm border-b border-white/5 bg-black/20">
                        <th className="px-6 py-4 font-semibold">Student</th>
                        <th className="px-6 py-4 font-semibold">Role & Company</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Date Submitted</th>
                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {experiences.map((exp) => (
                        <tr key={exp._id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4 font-bold">{exp.studentName}</td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            <span className="font-semibold text-white">{exp.role}</span> <br/>
                            <span className="text-xs text-primary">{exp.company}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                              exp.status === 'approved' ? 'bg-green-500/10 text-green-500' :
                              exp.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                              'bg-yellow-500/10 text-yellow-500'
                            }`}>
                              {exp.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-400">
                            {new Date(exp.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                            {exp.status !== 'approved' && (
                              <button onClick={() => updateStatus(exp._id, 'approved')} title="Approve" className="p-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-500 transition-colors">
                                <CheckCircle size={18} />
                              </button>
                            )}
                            {exp.status !== 'rejected' && (
                              <button onClick={() => updateStatus(exp._id, 'rejected')} title="Reject" className="p-2 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 transition-colors">
                                <XCircle size={18} />
                              </button>
                            )}
                            <button onClick={() => deleteExperience(exp._id)} title="Delete" className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ) : activeTab === 'users' ? (
            <div className="glass rounded-[2rem] overflow-hidden">
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xl font-bold">Registered Users</h3>
                <button onClick={fetchUsers} className="text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-colors">
                  Refresh
                </button>
              </div>
              
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-8 text-center text-gray-400">Loading users...</div>
                ) : usersList.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">No users found.</div>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-gray-500 text-sm border-b border-white/5 bg-black/20">
                        <th className="px-6 py-4 font-semibold">User</th>
                        <th className="px-6 py-4 font-semibold">Email</th>
                        <th className="px-6 py-4 font-semibold">Joined Date</th>
                        <th className="px-6 py-4 font-semibold">Last Login</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {usersList.map((u) => (
                        <tr key={u.id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4 flex items-center gap-3">
                            <img src={u.imageUrl} alt="Avatar" className="w-8 h-8 rounded-full border border-white/10" />
                            <span className="font-bold">{u.firstName} {u.lastName}</span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">{u.email}</td>
                          <td className="px-6 py-4 text-xs text-gray-400">
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-400">
                            {u.lastSignInAt ? new Date(u.lastSignInAt).toLocaleString() : 'Never'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ) : (
            <div className="glass p-12 text-center rounded-[2rem] text-gray-400">
              Select the "Experiences" or "Users" tab to view data.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
