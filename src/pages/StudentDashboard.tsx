import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import { useOutletContext, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Upload,
  BrainCircuit,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Send,
  CalendarCheck,
  Award,
  Video,
  ExternalLink,
  Check,
  Building,
  GraduationCap,
  MapPin,
  Clock,
  Download,
  Eye,
  Megaphone,
  FileText,
  FileSpreadsheet,
  Headphones,
  Copy,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { OfferLetterModal } from '../components/modals/OfferLetterModal';
import { ApplyJobModal } from '../components/modals/ApplyJobModal';
import { JobDrive } from '../types';

export const StudentDashboard: React.FC = () => {
  const { currentUser, stats, jobs, applications, notices } = usePlacement();
  const { openSupport } = useOutletContext<{ openSupport: () => void }>() || { openSupport: () => {} };
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'all' | 'sde' | 'fintech'>('all');
  const [offerLetterOpen, setOfferLetterOpen] = useState(false);
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobDrive | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const copyMeetLink = (link: string) => {
    navigator.clipboard?.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Filter drives for the recommended section
  const recommendedDrives = jobs.filter((job) => {
    if (activeTab === 'sde') return job.roleTitle.toLowerCase().includes('engineer') || job.roleTitle.toLowerCase().includes('sde');
    if (activeTab === 'fintech') return job.companyName.toLowerCase().includes('goldman') || job.companyName.toLowerCase().includes('morgan');
    return true;
  }).slice(0, 4);

  return (
    <div className="px-6 lg:px-8 py-6 space-y-6 max-w-[1440px] mx-auto w-full">
      {/* 1. Hero / Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl pointer-events-none"></div>
        <div className="absolute right-40 -bottom-20 w-64 h-64 rounded-full bg-indigo-100/40 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Placement Season Active
              </span>
              <span className="text-xs text-slate-500 font-medium">AY 2024-25 • Phase 1</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              Welcome back, {currentUser.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-sm text-slate-600">
              {currentUser.department || 'B.Tech Computer Science & Engineering'} • {currentUser.batch || 'Class of 2025'} • Roll No:{' '}
              <span className="font-semibold text-slate-900">{currentUser.rollNumber || 'CS21B042'}</span>
            </p>

            {/* Quick Action Pill Group */}
            <div className="pt-2 flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => navigate('/jobs')}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-all text-xs font-semibold shadow-2xs group border border-blue-200/60"
              >
                <Briefcase className="w-4 h-4" />
                <span>Browse {stats.eligibleDrivesCount} New Drives</span>
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold group-hover:bg-white group-hover:text-blue-600 transition-colors">
                  {stats.eligibleDrivesCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors text-xs font-medium border border-slate-200"
              >
                <Upload className="w-4 h-4 text-slate-500" />
                <span>Update Resume (v3.2)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const elem = document.getElementById('benchmark-section');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors text-xs font-medium border border-slate-200"
              >
                <BrainCircuit className="w-4 h-4 text-slate-500" />
                <span>Practice Aptitude Test</span>
              </button>
            </div>
          </div>

          {/* Profile Completion Card */}
          <div className="w-full xl:w-80 bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-slate-800">Profile Status</span>
              </div>
              <span className="text-xs font-bold text-blue-600">{currentUser.profileCompletion || 92}% Complete</span>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${currentUser.profileCompletion || 92}%` }}
              ></div>
            </div>

            <p className="text-[11px] text-slate-500 leading-snug">
              Add <span className="font-semibold text-slate-800">AWS Certification</span> to unlock Tier-1 Super Dream drives.
            </p>

            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="w-full mt-1 py-1.5 px-3 rounded-lg bg-white text-blue-600 hover:bg-blue-600 hover:text-white text-xs font-semibold transition-all border border-slate-200 flex items-center justify-center gap-1 shadow-2xs"
            >
              <span>Complete Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Four Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Eligible Drives */}
        <div className="p-5 rounded-xl bg-white shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">Eligible Drives</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 tabular-nums">28</span>
            <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              +6 this week
            </span>
          </div>
          <span className="text-xs text-slate-500 mt-1">Matched with your CGPA &amp; branch</span>
        </div>

        {/* Applied Jobs */}
        <div className="p-5 rounded-xl bg-white shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">Applied Jobs</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Send className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 tabular-nums">09</span>
            <span className="text-[11px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full font-bold">
              3 In Tech Rounds
            </span>
          </div>
          <span className="text-xs text-slate-500 mt-1">4 under resume review</span>
        </div>

        {/* Upcoming Interviews */}
        <div className="p-5 rounded-xl bg-white shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">Upcoming Interviews</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 tabular-nums">02</span>
            <span className="text-[11px] text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full font-bold">
              Scheduled
            </span>
          </div>
          <span className="text-xs text-slate-700 font-medium mt-1 truncate">
            Next: Google Cloud • Tomorrow 10:00 AM
          </span>
        </div>

        {/* Offers Received */}
        <div className="p-5 rounded-xl bg-white shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">Offers Received</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-emerald-600 tabular-nums">01</span>
            <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Offer Secured
            </span>
          </div>
          <span className="text-xs text-slate-800 font-semibold mt-1 truncate">
            Microsoft IDC • ₹24.5 LPA
          </span>
        </div>
      </div>

      {/* 3. Main Content: Two Columns (65% / 35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (65% - 8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Live Application Status Tracker Card */}
          <div className="p-6 rounded-2xl bg-white shadow-xs border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                  <BrainCircuit className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">Cisco Systems</h3>
                    <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full">
                      Round 2 • In Progress
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Network Software Engineer • CTC ₹18.2 LPA • App ID: CS-24-8841
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/applications')}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 self-start sm:self-center"
              >
                <span>View Full Timeline</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Stepper Track */}
            <div className="pt-3 pb-1 overflow-x-auto">
              <div className="min-w-[620px] flex items-center justify-between relative px-2">
                {/* Connecting Line */}
                <div className="absolute left-8 right-8 top-4 h-0.5 bg-slate-200 z-0"></div>
                <div className="absolute left-8 w-[58%] top-4 h-0.5 bg-blue-600 z-0"></div>

                {/* Step 1 */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-xs text-slate-800 font-semibold mt-2">Applied</span>
                  <span className="text-[11px] text-slate-500">Nov 02</span>
                </div>

                {/* Step 2 */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-xs text-slate-800 font-semibold mt-2">Screened</span>
                  <span className="text-[11px] text-slate-500">CGPA ≥ 7.5</span>
                </div>

                {/* Step 3 */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-xs text-slate-800 font-semibold mt-2">Aptitude Test</span>
                  <span className="text-[11px] text-emerald-600 font-semibold">Cleared (94%)</span>
                </div>

                {/* Step 4 (Current) */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-blue-600 text-blue-600 flex items-center justify-center shadow-xs animate-pulse">
                    <Video className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-blue-600 font-bold mt-2">Tech Round</span>
                  <span className="text-[10px] text-slate-800 font-semibold bg-slate-100 px-1.5 py-0.5 rounded">
                    Tomorrow 2 PM
                  </span>
                </div>

                {/* Step 5 */}
                <div className="relative z-10 flex flex-col items-center text-center opacity-60">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
                    <span className="text-xs font-semibold">HR</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium mt-2">HR Round</span>
                  <span className="text-[11px] text-slate-400">Pending</span>
                </div>

                {/* Step 6 */}
                <div className="relative z-10 flex flex-col items-center text-center opacity-40">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium mt-2">Offer Rolled</span>
                  <span className="text-[11px] text-slate-400">Final</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Companies & Active Drives */}
          <div className="p-6 rounded-2xl bg-white shadow-xs border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Recommended Companies &amp; Drives</h2>
                <p className="text-xs text-slate-500">Tier-1 &amp; Dream opportunities prioritized for your skill profile</p>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1 text-xs rounded-md font-semibold transition-all ${
                    activeTab === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({jobs.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('sde')}
                  className={`px-3 py-1 text-xs rounded-md font-semibold transition-all ${
                    activeTab === 'sde' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Software Dev
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('fintech')}
                  className={`px-3 py-1 text-xs rounded-md font-semibold transition-all ${
                    activeTab === 'fintech' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  FinTech
                </button>
              </div>
            </div>

            {/* Cards Stack */}
            <div className="space-y-3">
              {/* Card 1: Microsoft Corporation (Accepted Offer) */}
              <div className="p-4 rounded-xl bg-blue-50/40 hover:bg-blue-50/70 border border-blue-200/60 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center font-bold text-blue-600 shrink-0">
                    <Building className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900">Microsoft Corporation</h4>
                      <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Offer Accepted
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800">Cloud Solutions Architect (Azure)</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap pt-0.5">
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        ₹24.5 LPA
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5" />
                        Min CGPA: 8.0
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        Hyderabad / Bengaluru
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0">
                  <span className="text-[11px] text-slate-500 font-medium">Letter Released</span>
                  <button
                    type="button"
                    onClick={() => setOfferLetterOpen(true)}
                    className="px-4 py-2 rounded-lg bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <Download className="w-4 h-4 text-emerald-600" />
                    <span>View Offer Letter</span>
                  </button>
                </div>
              </div>

              {/* Card 2: Goldman Sachs */}
              <div className="p-4 rounded-xl bg-white hover:bg-slate-50/60 border border-slate-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700 shrink-0">
                    <Award className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900">Goldman Sachs</h4>
                      <span className="text-[11px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-full">
                        Dream Tier
                      </span>
                      <span className="text-[11px] text-red-700 bg-red-100 px-2 py-0.5 rounded-full font-medium">
                        Closes in 2 days
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800">Software Engineering Analyst</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap pt-0.5">
                      <span className="font-bold text-slate-900">₹26.0 LPA</span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5" />
                        Min CGPA: 8.5 (Eligible ✓)
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        OA: Nov 18, 6:00 PM
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0">
                  <span className="text-[11px] text-slate-500">Deadline: Nov 17</span>
                  <button
                    type="button"
                    onClick={() => {
                      const gsJob = jobs.find(j => j.companyName.includes('Goldman')) || jobs[1];
                      setSelectedJobForApply(gsJob);
                    }}
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold transition-all shadow-xs flex items-center gap-1"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 3: Cisco Systems */}
              <div className="p-4 rounded-xl bg-white hover:bg-slate-50/60 border border-slate-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center font-bold text-blue-600 shrink-0">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900">Cisco Systems</h4>
                      <span className="text-[11px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
                        Shortlisted for Round 2
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800">Network Software Engineer</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap pt-0.5">
                      <span className="font-bold text-slate-900">₹18.2 LPA</span>
                      <span className="flex items-center gap-1">Min CGPA: 7.5</span>
                      <span className="flex items-center gap-1">Bengaluru</span>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0">
                  <span className="text-[11px] text-slate-500">Slot Assigned</span>
                  <button
                    type="button"
                    onClick={() => navigate('/applications')}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>

              {/* Card 4: Oracle */}
              <div className="p-4 rounded-xl bg-white hover:bg-slate-50/60 border border-slate-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center font-bold text-red-600 shrink-0">
                    <Building className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900">Oracle</h4>
                      <span className="text-[11px] bg-slate-100 text-slate-800 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        Fast-Track Drive
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800">Member Technical Staff (OCI)</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap pt-0.5">
                      <span className="font-bold text-slate-900">₹21.0 LPA</span>
                      <span>Min CGPA: 8.0</span>
                      <span>Drive on Nov 22</span>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0">
                  <span className="text-[11px] text-slate-500">Registration Open</span>
                  <button
                    type="button"
                    onClick={() => {
                      const oracleJob = jobs.find(j => j.companyName.includes('Oracle')) || jobs[6];
                      setSelectedJobForApply(oracleJob);
                    }}
                    className="px-5 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white text-xs font-semibold transition-all flex items-center gap-1 border border-blue-200"
                  >
                    <span>Register</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Aptitude & Coding Benchmark */}
          <div className="p-6 rounded-2xl bg-white shadow-xs border border-slate-200 space-y-4" id="benchmark-section">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Aptitude &amp; Coding Benchmark</h3>
                <p className="text-xs text-slate-500">Your mock test analytics compared to the 2025 CS Cohort</p>
              </div>
              <span className="text-xs text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full font-bold">
                Top 5% in CSE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {/* DSA */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-800">
                  <span>Algorithms &amp; DSA</span>
                  <span className="text-blue-600 font-bold">96%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '96%' }}></div>
                </div>
                <p className="text-[11px] text-slate-500">Solved 142/150 departmental questions</p>
              </div>

              {/* System Design */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-800">
                  <span>System Design</span>
                  <span className="text-indigo-600 font-bold">88%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
                <p className="text-[11px] text-slate-500">High score in Distributed Caching</p>
              </div>

              {/* Quant */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-800">
                  <span>Quant &amp; Reasoning</span>
                  <span className="text-emerald-600 font-bold">91%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                </div>
                <p className="text-[11px] text-slate-500">Speed rating: 1.14 min/question</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (35% - 4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Interview Schedule Card */}
          <div className="p-6 rounded-2xl bg-white shadow-xs border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Upcoming Interviews</h3>
              </div>
              <span className="text-xs text-slate-500 font-semibold">2 Scheduled</span>
            </div>

            {/* Google Cloud */}
            <div className="p-4 rounded-xl bg-slate-50 space-y-3 border border-slate-200/80">
              <div className="flex items-center justify-between">
                <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                  Tomorrow
                </span>
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  10:00 - 11:30 AM
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">Google Cloud</h4>
                <p className="text-xs text-slate-500">System Design &amp; Scalable Algorithms</p>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                <div className="flex items-center gap-2 min-w-0">
                  <Video className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="text-xs text-slate-800 font-mono truncate">meet.google.com/xyz-cvbn-qwe</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyMeetLink('https://meet.google.com/xyz-cvbn-qwe')}
                  className="p-1.5 rounded text-slate-500 hover:text-blue-600 transition-colors"
                  title="Copy Link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-100/70 text-xs text-slate-600 space-y-0.5">
                <span className="font-semibold text-slate-800 block text-[11px]">Preparation Notes:</span>
                <p className="text-[11px] leading-relaxed">Focus on sharding, Redis architecture, and asynchronous event queues.</p>
              </div>
            </div>

            {/* Cisco Systems */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded">
                  Nov 16, 2:00 PM
                </span>
                <span className="text-xs text-slate-700 font-medium">In-Person</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">Cisco Systems</h4>
                <p className="text-xs text-slate-500">Technical Architecture Round</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-slate-800">Lab Block 3, Room 402</span>
              </div>
            </div>
          </div>

          {/* Notice Board & Important Deadlines */}
          <div className="p-6 rounded-2xl bg-white shadow-xs border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Notices &amp; Deadlines</h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            </div>

            <div className="space-y-3">
              {notices.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 rounded-xl border-l-4 space-y-1 ${
                    n.urgency === 'high'
                      ? 'bg-red-50/60 border-red-500'
                      : n.urgency === 'medium'
                      ? 'bg-blue-50/60 border-blue-500'
                      : 'bg-slate-50 border-emerald-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        n.urgency === 'high'
                          ? 'text-red-700'
                          : n.urgency === 'medium'
                          ? 'text-blue-700'
                          : 'text-emerald-700'
                      }`}
                    >
                      {n.type}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">{n.date}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">{n.title}</p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{n.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Document Access */}
          <div className="p-6 rounded-2xl bg-white shadow-xs border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Verified Credentials</h3>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                TPO Signed
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Document 1: Resume */}
              <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between gap-2 border border-slate-200/80">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {currentUser.resumeFileName || 'Ananya_Sharma_Resume_v3.2.pdf'}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {currentUser.resumeLastUpdated || 'Updated 3 days ago • 248 KB'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => alert('Downloading official verified resume PDF.')}
                    className="p-1.5 rounded-lg text-blue-600 hover:bg-slate-200 transition-colors"
                    title="Download Resume"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/profile')}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors"
                    title="Update File"
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Document 2: Academic Transcript */}
              <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between gap-2 border border-slate-200/80">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">Official Transcript (Sem 1-6)</p>
                    <p className="text-[11px] text-slate-500">
                      Verified CGPA: <span className="font-bold text-slate-800">{currentUser.cgpa || 8.92}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => navigate('/profile')}
                    className="p-1.5 rounded-lg text-blue-600 hover:bg-slate-200 transition-colors"
                    title="View Transcript"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Campus Placement Officer Helpline Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Headphones className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h5 className="text-xs font-bold text-slate-900 truncate">Placement Officer Desk</h5>
              <p className="text-[11px] text-slate-500 truncate">Room 102, Admin Block • Ext: 4122</p>
            </div>
            <button
              type="button"
              onClick={openSupport}
              className="text-xs text-blue-600 font-bold hover:underline shrink-0"
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Offer Letter Modal */}
      <OfferLetterModal
        isOpen={offerLetterOpen}
        onClose={() => setOfferLetterOpen(false)}
        companyName="Microsoft Corporation"
        roleTitle="Cloud Solutions Architect (Azure)"
        packageLPA={24.5}
      />

      {/* Apply Modal */}
      <ApplyJobModal
        job={selectedJobForApply}
        onClose={() => setSelectedJobForApply(null)}
      />
    </div>
  );
};
