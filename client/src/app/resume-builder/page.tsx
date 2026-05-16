"use client";
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Download, 
  Briefcase, 
  GraduationCap, 
  Code, 
  User
} from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

export default function ResumeBuilder() {
  const [resume, setResume] = useState({
    personal: { name: 'John Doe', email: 'john@example.com', phone: '+91 9876543210', linkedin: 'linkedin.com/in/johndoe', github: 'github.com/johndoe' },
    education: [{ school: 'IIT Bombay', degree: 'B.Tech in Computer Science', year: '2020 - 2024', grade: '9.2 CGPA' }],
    skills: ['React.js', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    experience: [{ company: 'Tech Corp', role: 'SDE Intern', duration: 'May 2023 - July 2023', details: 'Worked on building scalable microservices and improved system performance by 30%.' }],
    projects: [{ title: 'PlaceMint Platform', tech: 'Next.js, Express, MongoDB', details: 'Built a full-stack placement preparation platform with real-time tracking.' }]
  });

  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  const updatePersonal = (field: string, value: string) => {
    setResume({ ...resume, personal: { ...resume.personal, [field]: value } });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold mb-4">ATS <span className="text-gradient">Resume Builder</span></h1>
          <p className="text-gray-400">Create a professional, ATS-friendly resume in minutes.</p>
        </div>
        <button 
          onClick={() => handlePrint()}
          className="bg-primary hover:bg-primary-dark px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <Download size={20} /> Download PDF
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Editor Side */}
        <div className="space-y-8 h-[75vh] overflow-y-auto pr-4 custom-scrollbar">
          {/* Personal Info */}
          <section className="glass p-8 rounded-[2rem]">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><User size={20} className="text-primary" /> Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="bg-white/5 border border-white/10 p-3 rounded-xl focus:outline-none" value={resume.personal.name} onChange={(e) => updatePersonal('name', e.target.value)} />
              <input type="text" placeholder="Email" className="bg-white/5 border border-white/10 p-3 rounded-xl focus:outline-none" value={resume.personal.email} onChange={(e) => updatePersonal('email', e.target.value)} />
              <input type="text" placeholder="Phone" className="bg-white/5 border border-white/10 p-3 rounded-xl focus:outline-none" value={resume.personal.phone} onChange={(e) => updatePersonal('phone', e.target.value)} />
              <input type="text" placeholder="LinkedIn" className="bg-white/5 border border-white/10 p-3 rounded-xl focus:outline-none" value={resume.personal.linkedin} onChange={(e) => updatePersonal('linkedin', e.target.value)} />
            </div>
          </section>

          {/* Education */}
          <section className="glass p-8 rounded-[2rem]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2"><GraduationCap size={20} className="text-primary" /> Education</h3>
              <button className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20"><Plus size={18} /></button>
            </div>
            {resume.education.map((edu, i) => (
              <div key={i} className="space-y-4 mb-4 pb-4 border-b border-white/5 last:border-0">
                <input type="text" placeholder="School/University" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:outline-none" value={edu.school} readOnly />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Degree" className="bg-white/5 border border-white/10 p-3 rounded-xl focus:outline-none" value={edu.degree} readOnly />
                  <input type="text" placeholder="Year" className="bg-white/5 border border-white/10 p-3 rounded-xl focus:outline-none" value={edu.year} readOnly />
                </div>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section className="glass p-8 rounded-[2rem]">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Code size={20} className="text-primary" /> Skills</h3>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, i) => (
                <span key={i} className="bg-white/5 px-4 py-2 rounded-xl flex items-center gap-2 text-sm border border-white/10 group">
                  {skill}
                  <button className="text-gray-600 group-hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </span>
              ))}
              <button className="bg-primary/10 text-primary px-4 py-2 rounded-xl border border-primary/20 text-sm font-bold flex items-center gap-2">
                <Plus size={16} /> Add Skill
              </button>
            </div>
          </section>

          {/* Experience */}
          <section className="glass p-8 rounded-[2rem]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2"><Briefcase size={20} className="text-primary" /> Experience</h3>
              <button className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20"><Plus size={18} /></button>
            </div>
            {resume.experience.map((exp, i) => (
              <div key={i} className="space-y-4 mb-4 pb-4 border-b border-white/5 last:border-0">
                <input type="text" placeholder="Company" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:outline-none" value={exp.company} readOnly />
                <textarea placeholder="Details" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:outline-none h-24" value={exp.details} readOnly></textarea>
              </div>
            ))}
          </section>
        </div>

        {/* Preview Side */}
        <div className="bg-white rounded-3xl p-12 text-black min-h-[1100px] shadow-2xl relative overflow-hidden" ref={componentRef}>
          {/* Resume Header */}
          <div className="text-center border-b-2 border-black pb-8 mb-8">
            <h1 className="text-4xl font-black uppercase tracking-tight mb-2">{resume.personal.name}</h1>
            <div className="flex justify-center gap-4 text-sm font-medium">
              <span>{resume.personal.email}</span> • 
              <span>{resume.personal.phone}</span> • 
              <span>{resume.personal.linkedin}</span>
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-8">
            <h2 className="text-lg font-black uppercase tracking-widest border-b border-gray-200 pb-1 mb-4">Education</h2>
            {resume.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold">{edu.school}</h3>
                  <p className="text-sm">{edu.degree}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{edu.year}</p>
                  <p className="text-sm italic">{edu.grade}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <h2 className="text-lg font-black uppercase tracking-widest border-b border-gray-200 pb-1 mb-4">Skills</h2>
            <p className="text-sm leading-relaxed">
              <span className="font-bold">Technical Skills:</span> {resume.skills.join(', ')}
            </p>
          </div>

          {/* Experience Section */}
          <div className="mb-8">
            <h2 className="text-lg font-black uppercase tracking-widest border-b border-gray-200 pb-1 mb-4">Experience</h2>
            {resume.experience.map((exp, i) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold">{exp.company}</h3>
                  <span className="text-sm font-medium">{exp.duration}</span>
                </div>
                <p className="text-sm italic mb-2">{exp.role}</p>
                <p className="text-sm text-gray-700 leading-relaxed">• {exp.details}</p>
              </div>
            ))}
          </div>

          {/* Projects Section */}
          <div className="mb-8">
            <h2 className="text-lg font-black uppercase tracking-widest border-b border-gray-200 pb-1 mb-4">Projects</h2>
            {resume.projects.map((proj, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold">{proj.title}</h3>
                  <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">{proj.tech}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">• {proj.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
