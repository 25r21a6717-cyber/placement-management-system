import React, { useState } from 'react';
import { Calendar, X, PlusCircle, Building2 } from 'lucide-react';
import { usePlacement } from '../../context/PlacementContext';
import { JobDrive, JobTier, JobType } from '../../types';

interface ScheduleDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleDriveModal: React.FC<ScheduleDriveModalProps> = ({ isOpen, onClose }) => {
  const { addJob } = usePlacement();

  const [companyName, setCompanyName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [tier, setTier] = useState<JobTier>('Super Dream');
  const [packageLPA, setPackageLPA] = useState<number>(20.0);
  const [packageDetails, setPackageDetails] = useState('Base CTC + Performance Bonus + Health Allowance');
  const [location, setLocation] = useState('Bengaluru / Hyderabad');
  const [minCgpa, setMinCgpa] = useState<number>(7.5);
  const [branches, setBranches] = useState<string[]>(['CSE', 'IT', 'ECE']);
  const [deadline, setDeadline] = useState('30 Nov 2024');
  const [driveDate, setDriveDate] = useState('05 Dec 2024');
  const [jobType, setJobType] = useState<JobType>('Full-Time (FTE)');
  const [skills, setSkills] = useState('Data Structures, Algorithms, System Design, React/Node');
  const [description, setDescription] = useState('Engineering leadership role delivering high scalability cloud systems.');

  if (!isOpen) return null;

  const toggleBranch = (b: string) => {
    setBranches(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !roleTitle) return;

    const newDrive: JobDrive = {
      id: `job_${Date.now()}`,
      companyName,
      companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&auto=format&fit=crop&q=80',
      roleTitle,
      tier,
      packageLPA: Number(packageLPA),
      packageDetails,
      location,
      minCgpa: Number(minCgpa),
      allowedBranches: branches.length > 0 ? branches : ['CSE', 'IT'],
      maxBacklogsAllowed: 0,
      requiredSkills: skills.split(',').map(s => s.trim()).filter(Boolean),
      deadline,
      driveDate,
      jobType,
      status: 'Open',
      description,
      hiringPipeline: ['Online Assessment', 'Technical Round 1', 'Technical Round 2', 'HR / Executive Interview'],
      currentStageIndex: 0,
      totalApplicants: 0,
      postedDate: 'Today',
      interviewMode: 'Hybrid',
    };

    addJob(newDrive);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl p-6 max-w-xl w-full shadow-2xl flex flex-col gap-4 border border-slate-200 my-8">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Schedule Placement Drive</h3>
              <p className="text-xs text-slate-500">Add corporate recruitment drive with eligibility constraints</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Company Name</label>
              <input
                type="text"
                placeholder="e.g. Atlassian, Uber, Salesforce"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Job Role Title</label>
              <input
                type="text"
                placeholder="e.g. Software Engineer (Backend)"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                required
                className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Category / Tier</label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as JobTier)}
                className="w-full h-9 px-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              >
                <option value="Super Dream">Super Dream (&gt;20 LPA)</option>
                <option value="Dream">Dream (12-20 LPA)</option>
                <option value="Core/Product">Core/Product (7-12 LPA)</option>
                <option value="Standard">Standard (&lt;7 LPA)</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Package (₹ LPA)</label>
              <input
                type="number"
                step="0.5"
                value={packageLPA}
                onChange={(e) => setPackageLPA(Number(e.target.value))}
                required
                className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Min. CGPA Cutoff</label>
              <input
                type="number"
                step="0.1"
                max="10.0"
                min="5.0"
                value={minCgpa}
                onChange={(e) => setMinCgpa(Number(e.target.value))}
                required
                className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value as JobType)}
                className="w-full h-9 px-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              >
                <option value="Full-Time (FTE)">Full-Time (FTE)</option>
                <option value="Summer Internship">Summer Internship</option>
                <option value="6-Month Internship">6-Month Internship</option>
                <option value="FTE + Internship">FTE + Internship</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Work Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Eligible Academic Branches</label>
            <div className="flex gap-2 flex-wrap">
              {['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL'].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => toggleBranch(b)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold border transition-colors ${
                    branches.includes(b)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {b} {branches.includes(b) ? '✓' : '+'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Registration Deadline</label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Scheduled Drive Date</label>
              <input
                type="text"
                value={driveDate}
                onChange={(e) => setDriveDate(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Required Key Skills (Comma separated)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Role Brief / Overview</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-sm flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Drive &amp; Notify Students</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
