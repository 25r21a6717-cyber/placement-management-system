import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import {
  UserCheck,
  ShieldCheck,
  FileText,
  Upload,
  Download,
  Award,
  Sparkles,
  Phone,
  Mail,
  Linkedin,
  Github,
  CheckCircle2,
  Edit2,
  Plus,
  Trash2,
} from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const { currentUser, updateCurrentUser, showToast } = usePlacement();
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState(currentUser.phone || '+91 98765 43210');
  const [linkedIn, setLinkedIn] = useState(currentUser.linkedIn || 'linkedin.com/in/ananya-sharma-cs');
  const [github, setGithub] = useState(currentUser.github || 'github.com/ananya-sharma-dev');
  const [newSkill, setNewSkill] = useState('');

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      phone,
      linkedIn,
      github,
    });
    setEditing(false);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    const currentSkills = currentUser.skills || [];
    if (!currentSkills.includes(newSkill.trim())) {
      updateCurrentUser({
        skills: [...currentSkills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const currentSkills = currentUser.skills || [];
    updateCurrentUser({
      skills: currentSkills.filter(s => s !== skillToRemove),
    });
  };

  const handleUploadResume = () => {
    showToast('Resume uploaded! Updating version to v3.3 (256 KB) and queuing for automated TPO parser check.');
    updateCurrentUser({
      resumeFileName: 'Ananya_Sharma_Resume_v3.3.pdf',
      resumeLastUpdated: 'Just Now • 256 KB',
      profileCompletion: 98,
    });
  };

  return (
    <div className="px-6 lg:px-8 py-6 space-y-6 max-w-[1440px] mx-auto w-full">
      {/* Header Profile Hero Card */}
      <div className="p-6 rounded-2xl bg-white shadow-xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-50 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-slate-900">{currentUser.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                TPO Verified
              </span>
            </div>
            <p className="text-xs text-slate-600">
              {currentUser.department} • Roll No: <span className="font-semibold text-slate-900">{currentUser.rollNumber}</span>
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
              <span className="font-bold text-blue-600">CGPA: {currentUser.cgpa} / 10.0</span>
              <span>Standing Backlogs: <strong>{currentUser.activeBacklogs || 0}</strong></span>
              <span>Batch: <strong>{currentUser.batch || 'Class of 2025'}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="text-xs font-semibold text-slate-500">
            Profile Strength: <strong className="text-blue-600">{currentUser.profileCompletion || 92}%</strong>
          </span>
          <div className="w-44 bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full"
              style={{ width: `${currentUser.profileCompletion || 92}%` }}
            ></div>
          </div>
          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className="mt-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{editing ? 'Close Edit Mode' : 'Edit Contact Details'}</span>
          </button>
        </div>
      </div>

      {/* Grid: Resume & Documents vs Academic Skills & Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Official Verified Documents & Contact */}
        <div className="lg:col-span-7 space-y-6">
          {/* Resume Card */}
          <div className="p-6 rounded-2xl bg-white shadow-xs border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-slate-900">Official Placement Resume</h2>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                TPO Locked v3.2
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{currentUser.resumeFileName}</h4>
                  <p className="text-[11px] text-slate-500">{currentUser.resumeLastUpdated}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => showToast('Downloading verified student resume PDF...')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  onClick={handleUploadResume}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload New Version</span>
                </button>
              </div>
            </div>

            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-slate-600">
              <span className="font-bold text-blue-900 block text-[11px]">University Placement Cell Notice:</span>
              <p className="text-[11px] leading-relaxed mt-0.5">
                Uploaded resumes are automatically verified for academic credits, project URLs, and zero standing arrears before being transmitted to Tier-1 recruiters.
              </p>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="p-6 rounded-2xl bg-white shadow-xs border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Communication &amp; Profiles</h3>
            {editing ? (
              <form onSubmit={handleSaveContact} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 mb-1 block">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 mb-1 block">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 mb-1 block">GitHub Portfolio</label>
                  <input
                    type="text"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs"
                >
                  Save Details
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Email</span>
                    <span className="font-bold text-slate-800">{currentUser.email}</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Mobile</span>
                    <span className="font-bold text-slate-800">{currentUser.phone}</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-blue-700" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">LinkedIn</span>
                    <span className="font-bold text-slate-800 truncate">{currentUser.linkedIn}</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 flex items-center gap-3">
                  <Github className="w-4 h-4 text-slate-800" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">GitHub</span>
                    <span className="font-bold text-slate-800 truncate">{currentUser.github}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Verified Technical Skills & Certifications */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white shadow-xs border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Verified Technical Skills</h3>
              </div>
              <span className="text-xs text-slate-500 font-semibold">{currentUser.skills?.length || 0} Skills</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {currentUser.skills?.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200/60 text-xs font-semibold flex items-center gap-1.5 group"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-blue-400 hover:text-red-600 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Add skill form */}
            <form onSubmit={handleAddSkill} className="flex gap-2 pt-2 border-t border-slate-100">
              <input
                type="text"
                placeholder="Add skill (e.g. Kubernetes, Golang)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                type="submit"
                className="px-3.5 h-9 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </form>
          </div>

          {/* Certifications Card */}
          <div className="p-6 rounded-2xl bg-white shadow-xs border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900">Industry Certifications</h3>
              </div>
            </div>

            <div className="space-y-3">
              {currentUser.certifications?.map((cert, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 text-xs block leading-snug">{cert}</span>
                    <span className="text-[11px] text-slate-500">Credly Verified • Badge Linked</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
