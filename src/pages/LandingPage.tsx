import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlacement } from '../context/PlacementContext';
import {
  GraduationCap,
  ShieldCheck,
  Building2,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Award,
  Users,
  Briefcase,
  Sliders,
  Sparkles,
  Lock,
} from 'lucide-react';
import { UserRole } from '../types';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = usePlacement();
  const [authModalRole, setAuthModalRole] = useState<UserRole | null>(null);

  const handleLaunchRole = (role: UserRole) => {
    switchRole(role);
    if (role === 'student') navigate('/student');
    else if (role === 'officer') navigate('/officer');
    else if (role === 'recruiter') navigate('/recruiter');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Navbar */}
      <nav className="h-18 px-6 lg:px-12 bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 text-lg leading-tight">CampusConnect</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 uppercase">
                Enterprise
              </span>
            </div>
            <span className="text-[11px] text-slate-500">Autonomous University Placement Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleLaunchRole('student')}
            className="hidden sm:inline-flex px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Student Sign-In
          </button>
          <button
            type="button"
            onClick={() => handleLaunchRole('officer')}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Launch Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative px-6 lg:px-12 pt-16 pb-20 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span>Academic Year 2024-25 Placement Operations Active</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl leading-[1.15]">
          Unified Campus Recruitment <br />
          <span className="text-blue-600">From Drive Scheduling to Final Placement</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          The centralized digital command system connecting students, university training &amp; placement cells (TPO), and Tier-1 enterprise recruiters with automated eligibility rules, real-time telemetry, and NIRF-compliant audit reporting.
        </p>

        {/* 3 Persona Launch Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full text-left">
          {/* Card 1: Student */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Student Portal</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Browse personalized eligible drives, track interview steppers, take mock tests, and download verified offer letters.
                </p>
              </div>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified CGPA 8.92 Dossier</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Live Application Stepper Pipeline</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Microsoft IDC Offer (₹24.5 LPA)</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleLaunchRole('student')}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Explore as Student (Ananya)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Placement Officer */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group ring-2 ring-blue-600/30">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">Placement Officer Hub</h3>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                    TPO Central
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Institutional command center to audit 1,240 students, broadcast announcements, configure criteria rules, and schedule drives.
                </p>
              </div>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>78.4% Batch Placed KPI Metrics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Automated Cutoff Rule Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Bulk Verification &amp; Dossier Audit</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleLaunchRole('officer')}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Enter TPO Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Recruiter */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Recruiter Portal</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Manage corporate job postings, review filtered talent pools, conduct multi-round interviews, and release offers.
                </p>
              </div>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Filter by Verified Academic CGPA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Multi-Round Evaluation Pipeline</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant Cryptographic Offer Dispatch</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleLaunchRole('recruiter')}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Explore Recruiter Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Institutional Highlights Grid */}
      <section className="bg-white py-16 px-6 lg:px-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Proven Campus Footprint</span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Engineered for Premier Universities
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-4xl font-extrabold text-blue-600 tabular-nums">1,240</span>
              <span className="text-xs text-slate-500 block mt-1 font-semibold uppercase tracking-wider">
                Graduating Candidates
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-4xl font-extrabold text-emerald-600 tabular-nums">972</span>
              <span className="text-xs text-slate-500 block mt-1 font-semibold uppercase tracking-wider">
                Offers Released
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-4xl font-extrabold text-slate-900 tabular-nums">₹48 LPA</span>
              <span className="text-xs text-slate-500 block mt-1 font-semibold uppercase tracking-wider">
                Highest CTC Package
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-4xl font-extrabold text-indigo-600 tabular-nums">86</span>
              <span className="text-xs text-slate-500 block mt-1 font-semibold uppercase tracking-wider">
                Tier-1 Companies Visited
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-8 px-6 lg:px-12 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold">
            <GraduationCap className="w-5 h-5 text-blue-400" />
            <span>CampusConnect Placement Management System</span>
          </div>
          <span>Institutional Accreditation Edition • AICTE, NIRF &amp; NBA Compliant</span>
          <span>© 2024 University Central Placement Cell. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};
