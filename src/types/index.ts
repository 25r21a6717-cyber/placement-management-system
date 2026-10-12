export type UserRole = 'student' | 'officer' | 'recruiter';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  rollNumber?: string;
  department?: string;
  branch?: string;
  batch?: string;
  cgpa?: number;
  activeBacklogs?: number;
  historyOfArrears?: number;
  avatar?: string;
  profileCompletion?: number;
  skills?: string[];
  certifications?: string[];
  resumeUrl?: string;
  resumeFileName?: string;
  resumeLastUpdated?: string;
  phone?: string;
  linkedIn?: string;
  github?: string;
  verifiedByTPO?: boolean;
}

export type JobTier = 'Super Dream' | 'Dream' | 'Core/Product' | 'Standard';
export type JobType = 'Full-Time (FTE)' | 'Summer Internship' | '6-Month Internship' | 'FTE + Internship';
export type JobStatus = 'Open' | 'Shortlisting' | 'In Progress' | 'Closed' | 'Interviewing';

export interface JobDrive {
  id: string;
  companyName: string;
  companyLogo: string;
  roleTitle: string;
  tier: JobTier;
  packageLPA: number;
  packageDetails: string;
  location: string;
  minCgpa: number;
  allowedBranches: string[];
  maxBacklogsAllowed: number;
  requiredSkills: string[];
  deadline: string;
  driveDate?: string;
  jobType: JobType;
  status: JobStatus;
  description: string;
  hiringPipeline: string[];
  currentStageIndex: number;
  totalApplicants: number;
  postedDate: string;
  slotsDetails?: string;
  interviewMode?: 'Virtual (Webex/Meet)' | 'In-Person (Campus Lab)' | 'Hybrid';
}

export type ApplicationStage = 
  | 'Applied' 
  | 'Screened' 
  | 'Aptitude Test' 
  | 'Technical Interview 1' 
  | 'Technical Interview 2' 
  | 'HR Round' 
  | 'Offer Extended' 
  | 'Offer Accepted' 
  | 'Rejected';

export interface Application {
  id: string;
  jobId: string;
  studentId: string;
  studentName: string;
  studentRoll: string;
  studentBranch: string;
  studentCgpa: number;
  companyName: string;
  roleTitle: string;
  appliedDate: string;
  status: ApplicationStage;
  stageProgress: number; // 0 to 100
  nextAction?: string;
  nextSchedule?: string;
  scoreAptitude?: number;
  interviewLink?: string;
  interviewVenue?: string;
  prepNotes?: string;
  offerLPA?: number;
  offerLetterUrl?: string;
}

export interface InterviewSchedule {
  id: string;
  applicationId: string;
  companyName: string;
  roleTitle: string;
  roundName: string;
  dateTime: string;
  timeSlot: string;
  mode: 'Virtual' | 'In-Person';
  meetLink?: string;
  venue?: string;
  prepNotes: string;
  status: 'Scheduled' | 'Completed' | 'Rescheduled';
}

export interface Notice {
  id: string;
  title: string;
  type: 'Urgent Deadline' | 'Policy Alert' | 'Career Cell Event' | 'Company Announcement';
  date: string;
  description: string;
  urgency: 'high' | 'medium' | 'low';
}

export interface EligibilityRules {
  minCgpa: number;
  maxBacklogs: number;
  eligibleBranches: string[];
  passingYear: string;
  oneOfferPerTier: boolean;
}

export interface DepartmentStats {
  department: string;
  shortName: string;
  batchSize: number;
  eligibleCount: number;
  placedCount: number;
  placementPercentage: number;
  averageLPA: number;
  highestLPA: number;
  color: string;
}
