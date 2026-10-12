import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  GraduationCap,
  ShieldCheck,
  Building2,
  CheckCircle,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { usePlacement } from '../../context/PlacementContext';
import { UserRole } from '../../types';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onOpenBroadcast?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const { currentUser, switchRole, notices, searchQuery, setSearchQuery } = usePlacement();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const roleDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // ⌘K hotkey listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(e.target as Node)) {
        setRoleMenuOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(e.target as Node)) {
        setNotifMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectRole = (role: UserRole) => {
    switchRole(role);
    setRoleMenuOpen(false);
    if (role === 'student') navigate('/student');
    else if (role === 'officer') navigate('/officer');
    else if (role === 'recruiter') navigate('/recruiter');
  };

  const getRoleLabel = () => {
    if (currentUser.role === 'student') return 'Student View';
    if (currentUser.role === 'officer') return 'Placement Officer';
    return 'Recruiter Portal';
  };

  const getRoleIcon = () => {
    if (currentUser.role === 'student') return <GraduationCap className="w-4 h-4 text-blue-600" />;
    if (currentUser.role === 'officer') return <ShieldCheck className="w-4 h-4 text-blue-600" />;
    return <Building2 className="w-4 h-4 text-blue-600" />;
  };

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 z-30 px-6 flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
      {/* Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search drives, companies, roles, roll numbers..."
            className="w-full h-10 pl-9 pr-14 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[11px] font-semibold bg-white text-slate-500 rounded border border-slate-200 shadow-xs pointer-events-none">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Drive Tag */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/80 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-slate-700 font-medium">Fall 2024 Placement Drive</span>
        </div>

        {/* Role Switcher Dropdown */}
        <div className="relative" ref={roleDropdownRef}>
          <button
            type="button"
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-slate-700 transition-colors"
          >
            <div className="flex items-center gap-1.5">
              {getRoleIcon()}
              <span className="text-xs font-semibold">{getRoleLabel()}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                Switch Perspective
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <button
                  type="button"
                  onClick={() => handleSelectRole('student')}
                  className={`flex items-start gap-2.5 px-3 py-2 rounded-lg text-left text-xs transition-colors ${
                    currentUser.role === 'student'
                      ? 'bg-blue-50 text-blue-900 font-semibold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold">Student Portal (Ananya)</div>
                    <div className="text-[11px] text-slate-500">B.Tech CS · CGPA 8.92</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectRole('officer')}
                  className={`flex items-start gap-2.5 px-3 py-2 rounded-lg text-left text-xs transition-colors ${
                    currentUser.role === 'officer'
                      ? 'bg-blue-50 text-blue-900 font-semibold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold">Placement Officer (TPO Hub)</div>
                    <div className="text-[11px] text-slate-500">Central Command &amp; Dossier</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectRole('recruiter')}
                  className={`flex items-start gap-2.5 px-3 py-2 rounded-lg text-left text-xs transition-colors ${
                    currentUser.role === 'recruiter'
                      ? 'bg-blue-50 text-blue-900 font-semibold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold">Recruiter Portal</div>
                    <div className="text-[11px] text-slate-500">Postings &amp; Shortlisting</div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <div className="relative" ref={notifDropdownRef}>
          <button
            type="button"
            onClick={() => setNotifMenuOpen(!notifMenuOpen)}
            className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-white text-[10px] font-bold">
              {notices.length}
            </span>
          </button>

          {notifMenuOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in duration-100">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-semibold text-slate-900 text-sm">Notifications &amp; Alerts</span>
                <span className="text-[11px] text-blue-600 font-medium cursor-pointer hover:underline">
                  Mark all as read
                </span>
              </div>
              <div className="flex flex-col gap-2 mt-2 max-h-72 overflow-y-auto">
                {notices.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition-colors flex flex-col gap-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{n.title}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{n.date}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{n.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-7 w-[1px] bg-slate-200"></div>

        {/* Profile Avatar Pill */}
        <div
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2.5 pl-1 cursor-pointer group"
          title="View Student Profile & Credentials"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-blue-400 transition-all"
          />
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {currentUser.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <span className="text-[11px] text-slate-500">
              {currentUser.role === 'student'
                ? `${currentUser.branch || 'B.Tech CS'} · CGPA ${currentUser.cgpa || '8.92'}`
                : currentUser.department || 'Placement Cell'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
