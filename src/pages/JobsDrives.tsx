import React, { useState, useMemo } from 'react';
import { usePlacement } from '../context/PlacementContext';
import { JobDrive } from '../types';
import {
  Search,
  Building,
  MapPin,
  Clock,
  ArrowRight,
  SlidersHorizontal,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
  Info,
  Calendar,
  Video,
  Download,
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { ApplyJobModal } from '../components/modals/ApplyJobModal';
import { useNavigate } from 'react-router-dom';

export const JobsDrives: React.FC = () => {
  const { jobs, currentUser, isStudentEligible, searchQuery, setSearchQuery } = usePlacement();
  const navigate = useNavigate();

  // Filters
  const [onlyEligible, setOnlyEligible] = useState(true);
  const [deptFilter, setDeptFilter] = useState('All');
  const [tierFilter, setTierFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobDrive | null>(null);

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search
      const search = searchQuery.toLowerCase();
      const matchSearch =
        search === '' ||
        job.companyName.toLowerCase().includes(search) ||
        job.roleTitle.toLowerCase().includes(search) ||
        job.requiredSkills.some(s => s.toLowerCase().includes(search)) ||
        job.location.toLowerCase().includes(search);

      // Eligibility
      const eligibility = isStudentEligible(job, currentUser);
      if (onlyEligible && !eligibility.eligible) {
        return false;
      }

      // Dept
      if (deptFilter !== 'All' && !job.allowedBranches.includes(deptFilter)) {
        return false;
      }

      // Tier
      if (tierFilter !== 'All' && job.tier !== tierFilter) {
        return false;
      }

      // Role
      if (roleFilter !== 'All' && !job.jobType.toLowerCase().includes(roleFilter.toLowerCase())) {
        return false;
      }

      return matchSearch;
    });
  }, [jobs, searchQuery, onlyEligible, deptFilter, tierFilter, roleFilter, currentUser, isStudentEligible]);

  const fteCount = jobs.filter(j => j.jobType.includes('FTE')).length;
  const internCount = jobs.filter(j => j.jobType.includes('Internship')).length;

  return (
    <div className="px-6 lg:px-8 py-6 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      {/* 1. Top Header & Live KPI Metric Bar */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
        <div className="flex flex-col max-w-3xl gap-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              Campus Recruitment AY 2024-25
            </span>
            <span className="text-slate-500 text-xs">Updated 14 mins ago</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Explore Campus Drives &amp; Job Opportunities
          </h1>
          <p className="text-sm text-slate-600">
            Discover <span className="font-semibold text-slate-900">{jobs.length} active</span> on-campus recruitment drives, off-campus institutional referrals, and vetted summer tech internships tailored to your profile.
          </p>
        </div>

        {/* Quick Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/80">
          <div className="px-4 py-2 flex flex-col bg-white rounded-lg shadow-2xs border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium">Active Drives</span>
            <span className="text-xl font-bold text-blue-600 tabular-nums">{jobs.length}</span>
          </div>
          <div className="px-4 py-2 flex flex-col bg-white rounded-lg shadow-2xs border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium">Full-Time FTE</span>
            <span className="text-xl font-bold text-slate-900 tabular-nums">{fteCount}</span>
          </div>
          <div className="px-4 py-2 flex flex-col bg-white rounded-lg shadow-2xs border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium">Internships</span>
            <span className="text-xl font-bold text-slate-900 tabular-nums">{internCount}</span>
          </div>
          <div className="px-4 py-2 flex flex-col bg-white rounded-lg shadow-2xs border border-slate-100">
            <span className="text-[11px] text-emerald-700 font-medium">Avg. CTC</span>
            <span className="text-xl font-bold text-emerald-700 tabular-nums">
              ₹14.2 <span className="text-xs font-normal">LPA</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Live Filter & Omnisearch Toolbar */}
      <div className="flex flex-col gap-4 bg-white p-5 rounded-2xl shadow-xs border border-slate-200">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full lg:max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company, role title, keyword, or tech stack..."
              className="w-full h-11 pl-11 pr-24 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-500 bg-slate-200 px-2 py-0.5 rounded font-medium">
                Filtered
              </span>
            )}
          </div>

          {/* Eligibility Toggle Switch */}
          <div className="flex items-center justify-between w-full lg:w-auto gap-4 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
            <div
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={() => setOnlyEligible(!onlyEligible)}
            >
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900">Show Only Eligible Drives</span>
                <span className="text-[11px] text-slate-500">
                  Matches {currentUser.branch} · CGPA {currentUser.cgpa}
                </span>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={onlyEligible}
              onClick={() => setOnlyEligible(!onlyEligible)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                onlyEligible ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out mt-0.5 ${
                  onlyEligible ? 'translate-x-5.5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Filter Dropdowns & Category Pills */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
          {/* Dept */}
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2.5 h-9">
            <span className="text-slate-500 mr-1">Dept:</span>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="bg-transparent font-bold text-blue-600 focus:outline-none cursor-pointer"
            >
              <option value="All">All Departments</option>
              <option value="CSE">CSE / IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">Mechanical</option>
            </select>
          </div>

          {/* Tier */}
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2.5 h-9">
            <span className="text-slate-500 mr-1">CTC Band:</span>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="All">All Tiers</option>
              <option value="Super Dream">&gt; 20 LPA (Super Dream)</option>
              <option value="Dream">12 - 20 LPA (Dream)</option>
              <option value="Core/Product">7 - 12 LPA (Core/Product)</option>
            </select>
          </div>

          {/* Role */}
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2.5 h-9">
            <span className="text-slate-500 mr-1">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="All">All (FTE &amp; Interns)</option>
              <option value="Full-Time">Full-Time (FTE Only)</option>
              <option value="Internship">Internships Only</option>
            </select>
          </div>

          <div className="h-6 w-[1px] bg-slate-200 hidden sm:block mx-1"></div>

          {/* Quick Tag Pills */}
          <button
            type="button"
            onClick={() => setTierFilter(tierFilter === 'Super Dream' ? 'All' : 'Super Dream')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors ${
              tierFilter === 'Super Dream'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Tier-1 Super Dream {tierFilter === 'Super Dream' ? '✕' : ''}
          </button>

          <button
            type="button"
            onClick={() => setOnlyEligible(true)}
            className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold transition-colors"
          >
            No Active Backlogs
          </button>

          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setDeptFilter('All');
              setTierFilter('All');
              setRoleFilter('All');
              setOnlyEligible(false);
            }}
            className="text-blue-600 hover:underline text-xs font-semibold ml-2"
          >
            Reset All
          </button>
        </div>
      </div>

      {/* 3. Job Cards 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJobs.map((job) => {
          const eligibility = isStudentEligible(job, currentUser);

          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden border border-slate-200 group"
            >
              <div className="p-6 flex flex-col gap-4">
                {/* Top Row: Logo & Status Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 p-2 flex items-center justify-center shrink-0">
                      <Building className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-slate-900 text-sm truncate">{job.companyName}</span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {job.location}
                      </span>
                    </div>
                  </div>

                  {eligibility.eligible ? (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      Eligible &amp; Open
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-[11px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                      Not Eligible
                    </span>
                  )}
                </div>

                {/* Role & CTC Highlight */}
                <div className="flex flex-col gap-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900 truncate">{job.roleTitle}</span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider shrink-0">
                      {job.tier}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold text-blue-600 tabular-nums">
                      ₹{job.packageLPA.toFixed(2)}{' '}
                      <span className="text-xs font-normal text-slate-500">LPA</span>
                    </span>
                    <span className="text-xs text-slate-500 truncate">({job.packageDetails})</span>
                  </div>
                </div>

                {/* Criteria Badges */}
                <div className="flex flex-col gap-1.5 text-xs">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    Eligibility Requirements
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                      Min. CGPA ≥ {job.minCgpa}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                      {job.allowedBranches.join(', ')}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                      {job.maxBacklogsAllowed === 0 ? '0 Backlogs' : `≤ ${job.maxBacklogsAllowed} Backlogs`}
                    </span>
                  </div>
                </div>

                {/* Pipeline Progress Track */}
                <div className="flex flex-col gap-1.5 pt-1 text-xs">
                  <div className="flex justify-between items-center text-slate-500 text-[11px]">
                    <span className="font-semibold text-slate-800">
                      Hiring Pipeline ({job.hiringPipeline.length} Stages)
                    </span>
                    <span className="text-blue-600 font-bold">Stage 1 Approaching</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {job.hiringPipeline.slice(0, 4).map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full ${
                          idx <= job.currentStageIndex ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500 truncate">
                    {job.hiringPipeline.join(' → ')}
                  </span>
                </div>

                {/* Ineligibility Warning if not eligible */}
                {!eligibility.eligible && (
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-start gap-1.5">
                    <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{eligibility.reasons[0]}</span>
                  </div>
                )}
              </div>

              {/* Footer / Deadline & Actions */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs w-full sm:w-auto">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  <span className="font-medium text-[11px]">Deadline: {job.deadline}</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => alert(`Job Description: ${job.description}\nLocation: ${job.location}\nSkills: ${job.requiredSkills.join(', ')}`)}
                    className="h-8 px-3 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Job Spec
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedJobForModal(job)}
                    className="h-8 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold transition-all shadow-xs flex items-center gap-1"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Pagination & Assistance Banner */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-2 pb-4">
        <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-start text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-900">1 - {filteredJobs.length}</strong> of{' '}
            <strong className="text-slate-900">{jobs.length}</strong> Campus Drives
          </span>
          <div className="flex items-center gap-1">
            <button type="button" disabled className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-400">
              ‹
            </button>
            <span className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold">1</span>
            <button type="button" className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700">
              2
            </button>
            <button type="button" className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700">
              3
            </button>
            <button type="button" className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700">
              ›
            </button>
          </div>
        </div>

        {/* Quick Assistance Callout */}
        <div className="w-full lg:w-auto flex items-center justify-between sm:justify-start gap-4 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900">Eligibility Mismatch?</span>
              <span className="text-[11px] text-slate-500">Facing issues with verified credits or criteria?</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors flex items-center gap-1"
          >
            <span>Audit Dossier</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Apply Modal */}
      <ApplyJobModal
        job={selectedJobForModal}
        onClose={() => setSelectedJobForModal(null)}
      />
    </div>
  );
};
