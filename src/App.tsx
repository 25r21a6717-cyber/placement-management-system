import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PlacementProvider } from './context/PlacementContext';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { OfficerDashboard } from './pages/OfficerDashboard';
import { JobsDrives } from './pages/JobsDrives';
import { PlacementAnalytics } from './pages/PlacementAnalytics';
import { MyApplications } from './pages/MyApplications';
import { StudentProfile } from './pages/StudentProfile';
import { RecruiterPortal } from './pages/RecruiterPortal';
import { InterviewsCalendar } from './pages/InterviewsCalendar';
import { CompaniesDirectory } from './pages/CompaniesDirectory';

export default function App() {
  return (
    <PlacementProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Authenticated Dashboard App Layout */}
          <Route element={<AppLayout />}>
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/officer" element={<OfficerDashboard />} />
            <Route path="/recruiter" element={<RecruiterPortal />} />
            <Route path="/jobs" element={<JobsDrives />} />
            <Route path="/applications" element={<MyApplications />} />
            <Route path="/analytics" element={<PlacementAnalytics />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/interviews" element={<InterviewsCalendar />} />
            <Route path="/companies" element={<CompaniesDirectory />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/student" replace />} />
        </Routes>
      </BrowserRouter>
    </PlacementProvider>
  );
}
