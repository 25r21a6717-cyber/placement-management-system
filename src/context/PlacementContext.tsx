import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  JobDrive,
  Application,
  InterviewSchedule,
  Notice,
  EligibilityRules,
  DepartmentStats,
  UserRole,
} from '../types';
import {
  initialCurrentUser,
  initialOfficers,
  initialRecruiters,
  initialJobDrives,
  initialApplications,
  initialInterviews,
  initialNotices,
  initialStudentsRoster,
  initialEligibilityRules,
  initialDepartmentStats,
} from '../services/placementData';

interface PlacementContextType {
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  switchRole: (role: UserRole) => void;
  updateCurrentUser: (updates: Partial<UserProfile>) => void;
  
  jobs: JobDrive[];
  applyToJob: (jobId: string) => boolean;
  addJob: (job: JobDrive) => void;
  updateJob: (jobId: string, updates: Partial<JobDrive>) => void;
  
  applications: Application[];
  updateApplicationStatus: (appId: string, status: Application['status'], notes?: string) => void;
  acceptOffer: (appId: string) => void;
  
  interviews: InterviewSchedule[];
  scheduleInterview: (interview: Omit<InterviewSchedule, 'id'>) => void;
  
  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id'>) => void;
  
  eligibilityRules: EligibilityRules;
  updateEligibilityRules: (rules: EligibilityRules) => void;
  resetEligibilityRules: () => void;
  
  studentsRoster: typeof initialStudentsRoster;
  updateStudentClearance: (studentId: string, clearance: typeof initialStudentsRoster[0]['clearanceStatus']) => void;
  
  departmentStats: DepartmentStats[];
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Helpers
  isStudentEligible: (job: JobDrive, user?: UserProfile) => { eligible: boolean; reasons: string[] };
  stats: {
    eligibleDrivesCount: number;
    appliedCount: number;
    upcomingInterviewsCount: number;
    offersCount: number;
    highestOfferLPA: number;
    acceptedOfferCompany?: string;
  };
  
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const PlacementContext = createContext<PlacementContextType | undefined>(undefined);

const LOCAL_STORAGE_PREFIX = 'campusconnect_v1_';

export const PlacementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Current User
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}user`);
    return saved ? JSON.parse(saved) : initialCurrentUser;
  });

  // 2. Jobs
  const [jobs, setJobs] = useState<JobDrive[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}jobs`);
    return saved ? JSON.parse(saved) : initialJobDrives;
  });

  // 3. Applications
  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}applications`);
    return saved ? JSON.parse(saved) : initialApplications;
  });

  // 4. Interviews
  const [interviews, setInterviews] = useState<InterviewSchedule[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}interviews`);
    return saved ? JSON.parse(saved) : initialInterviews;
  });

  // 5. Notices
  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}notices`);
    return saved ? JSON.parse(saved) : initialNotices;
  });

  // 6. Eligibility Rules
  const [eligibilityRules, setEligibilityRules] = useState<EligibilityRules>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}rules`);
    return saved ? JSON.parse(saved) : initialEligibilityRules;
  });

  // 7. Students Roster
  const [studentsRoster, setStudentsRoster] = useState<typeof initialStudentsRoster>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}students`);
    return saved ? JSON.parse(saved) : initialStudentsRoster;
  });

  // 8. Dept Stats
  const [departmentStats] = useState<DepartmentStats[]>(initialDepartmentStats);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}user`, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}jobs`, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}applications`, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}interviews`, JSON.stringify(interviews));
  }, [interviews]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}notices`, JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}rules`, JSON.stringify(eligibilityRules));
  }, [eligibilityRules]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}students`, JSON.stringify(studentsRoster));
  }, [studentsRoster]);

  // Switch role helper
  const switchRole = (newRole: UserRole) => {
    if (newRole === 'student') {
      setCurrentUser(initialCurrentUser);
      showToast('Switched to Student Persona (Ananya Sharma)');
    } else if (newRole === 'officer') {
      setCurrentUser(initialOfficers[0]);
      showToast('Switched to Placement Officer Hub (Dr. K. Radhakrishnan)');
    } else if (newRole === 'recruiter') {
      setCurrentUser(initialRecruiters[0]);
      showToast('Switched to Recruiter Portal (Priya Narayanan - Microsoft IDC)');
    }
  };

  const updateCurrentUser = (updates: Partial<UserProfile>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
    showToast('Profile updated successfully');
  };

  // Eligibility check
  const isStudentEligible = (job: JobDrive, user: UserProfile = currentUser): { eligible: boolean; reasons: string[] } => {
    const reasons: string[] = [];
    const studentCgpa = user.cgpa || 0;
    const studentBranch = user.branch || 'CSE';
    const backlogs = user.activeBacklogs || 0;

    if (studentCgpa < job.minCgpa) {
      reasons.push(`CGPA is ${studentCgpa}, requires minimum ${job.minCgpa}`);
    }

    if (!job.allowedBranches.includes(studentBranch)) {
      reasons.push(`Branch '${studentBranch}' is not in allowed departments [${job.allowedBranches.join(', ')}]`);
    }

    if (backlogs > job.maxBacklogsAllowed) {
      reasons.push(`Standing backlogs (${backlogs}) exceed allowed maximum (${job.maxBacklogsAllowed})`);
    }

    return {
      eligible: reasons.length === 0,
      reasons,
    };
  };

  // Apply to job
  const applyToJob = (jobId: string): boolean => {
    const targetJob = jobs.find(j => j.id === jobId);
    if (!targetJob) return false;

    // Check if already applied
    const alreadyApplied = applications.some(a => a.jobId === jobId && a.studentId === currentUser.id);
    if (alreadyApplied) {
      showToast(`Already applied to ${targetJob.companyName}!`);
      return false;
    }

    // Eligibility check
    const check = isStudentEligible(targetJob, currentUser);
    if (!check.eligible) {
      showToast(`Cannot apply: ${check.reasons[0]}`);
      return false;
    }

    const newApp: Application = {
      id: `app_${Date.now()}`,
      jobId: targetJob.id,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentRoll: currentUser.rollNumber || 'CS21B042',
      studentBranch: currentUser.branch || 'CSE',
      studentCgpa: currentUser.cgpa || 8.5,
      companyName: targetJob.companyName,
      roleTitle: targetJob.roleTitle,
      appliedDate: 'Just Now',
      status: 'Applied',
      stageProgress: 15,
      nextAction: 'Application submitted • Under resume screening',
      prepNotes: `Prepare for initial assessment for ${targetJob.roleTitle}`,
    };

    setApplications(prev => [newApp, ...prev]);
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, totalApplicants: j.totalApplicants + 1 } : j));
    showToast(`Successfully applied to ${targetJob.companyName} (${targetJob.roleTitle})!`);
    return true;
  };

  const addJob = (newJob: JobDrive) => {
    setJobs(prev => [newJob, ...prev]);
    showToast(`New recruitment drive for ${newJob.companyName} scheduled!`);
  };

  const updateJob = (jobId: string, updates: Partial<JobDrive>) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, ...updates } : j));
    showToast('Job details updated');
  };

  const updateApplicationStatus = (appId: string, status: Application['status'], notes?: string) => {
    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        let progress = 25;
        if (status === 'Screened') progress = 35;
        if (status === 'Aptitude Test') progress = 50;
        if (status === 'Technical Interview 1') progress = 65;
        if (status === 'Technical Interview 2') progress = 80;
        if (status === 'HR Round') progress = 90;
        if (status === 'Offer Extended' || status === 'Offer Accepted') progress = 100;
        return {
          ...a,
          status,
          stageProgress: progress,
          prepNotes: notes || a.prepNotes,
        };
      }
      return a;
    }));
    showToast(`Candidate status updated to: ${status}`);
  };

  const acceptOffer = (appId: string) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'Offer Accepted' } : a));
    showToast('Offer officially accepted! Placement record recorded.');
  };

  const scheduleInterview = (intData: Omit<InterviewSchedule, 'id'>) => {
    const newInterview: InterviewSchedule = {
      ...intData,
      id: `int_${Date.now()}`,
    };
    setInterviews(prev => [newInterview, ...prev]);
    showToast(`Interview scheduled with ${intData.companyName}`);
  };

  const addNotice = (noticeData: Omit<Notice, 'id'>) => {
    const newNotice: Notice = {
      ...noticeData,
      id: `ntc_${Date.now()}`,
    };
    setNotices(prev => [newNotice, ...prev]);
    showToast('Announcement broadcasted to student portals and emails!');
  };

  const updateEligibilityRules = (newRules: EligibilityRules) => {
    setEligibilityRules(newRules);
    showToast('Eligibility criteria engine updated and enforced across upcoming drives.');
  };

  const resetEligibilityRules = () => {
    setEligibilityRules(initialEligibilityRules);
    showToast('Reset rules to university standard baseline.');
  };

  const updateStudentClearance = (studentId: string, clearance: typeof initialStudentsRoster[0]['clearanceStatus']) => {
    setStudentsRoster(prev => prev.map(s => s.id === studentId ? { ...s, clearanceStatus: clearance } : s));
    showToast(`Updated student clearance to ${clearance}`);
  };

  // Quick stats calculation
  const eligibleDrivesCount = jobs.filter(j => isStudentEligible(j, currentUser).eligible).length;
  const appliedCount = applications.filter(a => a.studentId === currentUser.id).length;
  const upcomingInterviewsCount = interviews.filter(i => i.status === 'Scheduled').length;
  const offers = applications.filter(a => a.studentId === currentUser.id && (a.status === 'Offer Extended' || a.status === 'Offer Accepted'));
  const offersCount = offers.length;
  const highestOfferLPA = offers.reduce((max, cur) => Math.max(max, cur.offerLPA || 0), 0);
  const acceptedOfferCompany = offers.find(o => o.status === 'Offer Accepted')?.companyName || offers[0]?.companyName;

  return (
    <PlacementContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        updateCurrentUser,
        jobs,
        applyToJob,
        addJob,
        updateJob,
        applications,
        updateApplicationStatus,
        acceptOffer,
        interviews,
        scheduleInterview,
        notices,
        addNotice,
        eligibilityRules,
        updateEligibilityRules,
        resetEligibilityRules,
        studentsRoster,
        updateStudentClearance,
        departmentStats,
        searchQuery,
        setSearchQuery,
        isStudentEligible,
        stats: {
          eligibleDrivesCount,
          appliedCount,
          upcomingInterviewsCount,
          offersCount,
          highestOfferLPA,
          acceptedOfferCompany,
        },
        toastMessage,
        showToast,
      }}
    >
      {children}
    </PlacementContext.Provider>
  );
};

export const usePlacement = () => {
  const context = useContext(PlacementContext);
  if (!context) {
    throw new Error('usePlacement must be used within a PlacementProvider');
  }
  return context;
};
