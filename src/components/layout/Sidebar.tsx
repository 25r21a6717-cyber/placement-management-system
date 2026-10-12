import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShieldCheck,
  Building2,
  Briefcase,
  CheckSquare,
  BarChart3,
  UserCheck,
  Calendar,
  Landmark,
  CalendarDays,
  BookOpen,
  HelpCircle,
  GraduationCap,
} from 'lucide-react';
import { usePlacement } from '../../context/PlacementContext';

interface SidebarProps {
  onOpenHelp?: () => void;
  onOpenSupport?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenHelp, onOpenSupport }) => {
  const { currentUser, stats } = usePlacement();

  const navItems = [
    {
      to: '/student',
      label: 'Student Dashboard',
      icon: LayoutDashboard,
      badge: stats.upcomingInterviewsCount > 0 ? `${stats.upcomingInterviewsCount}` : undefined,
      badgeColor: 'bg-primary text-white',
    },
    {
      to: '/officer',
      label: 'Placement Officer Hub',
      icon: ShieldCheck,
      badge: 'TPO',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      to: '/recruiter',
      label: 'Recruiter Portal',
      icon: Building2,
    },
    {
      to: '/jobs',
      label: 'Jobs & Drives',
      icon: Briefcase,
      badge: `${stats.eligibleDrivesCount} New`,
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      to: '/applications',
      label: 'My Applications & Status',
      icon: CheckSquare,
      badge: stats.appliedCount > 0 ? `${stats.appliedCount}` : undefined,
    },
    {
      to: '/analytics',
      label: 'Placement Analytics & Reports',
      icon: BarChart3,
    },
    {
      to: '/profile',
      label: 'Student Profile & Resume',
      icon: UserCheck,
      badge: currentUser.role === 'student' ? `${currentUser.profileCompletion || 92}%` : undefined,
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      to: '/interviews',
      label: 'Interviews & Schedules',
      icon: Calendar,
    },
    {
      to: '/companies',
      label: 'Partner Companies',
      icon: Landmark,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-white border-r border-slate-200 z-40 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col overflow-y-auto">
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center gap-3 border-b border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm shadow-blue-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 text-base leading-tight">CampusConnect</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 uppercase">
                Pulse
              </span>
            </div>
            <span className="text-xs text-slate-500 truncate">University Placement Portal</span>
          </div>
        </div>

        {/* Section title */}
        <div className="px-4 pt-4 pb-1">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">
            Portal Navigation
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 px-2.5 py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all group ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/20'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`w-5 h-5 flex-shrink-0 transition-colors ${
                          isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ml-1 ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badgeColor || 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Section */}
      <div className="flex flex-col border-t border-slate-200 p-4 gap-2 bg-slate-50/50">
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-blue-50/80 border border-blue-100">
          <div className="flex items-center gap-2">
            <CalendarDays className="text-blue-600 w-4 h-4" />
            <span className="text-xs text-slate-800 font-semibold">AY 2024-25</span>
          </div>
          <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
            Phase 1 Active
          </span>
        </div>

        <div className="flex flex-col gap-0.5 pt-1">
          <button
            type="button"
            onClick={onOpenHelp}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-xs text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left"
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>Placement Manual &amp; Guidelines</span>
          </button>
          <button
            type="button"
            onClick={onOpenSupport}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-xs text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>TPO Helpdesk &amp; Support</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
