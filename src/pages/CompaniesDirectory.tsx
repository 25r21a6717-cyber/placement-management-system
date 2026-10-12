import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import { Building2, MapPin, Briefcase, ExternalLink, Search, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CompaniesDirectory: React.FC = () => {
  const { jobs } = usePlacement();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Distinct companies
  const companyList = [
    {
      name: 'Microsoft IDC',
      domain: 'Cloud Infrastructure & Enterprise Systems',
      tier: 'Super Dream',
      maxPackage: '₹48.0 LPA',
      headquarters: 'Redmond & Hyderabad',
      hiresTotal: 42,
      openings: 2,
    },
    {
      name: 'Goldman Sachs',
      domain: 'Investment Banking & Quantitative Technology',
      tier: 'Super Dream',
      maxPackage: '₹32.0 LPA',
      headquarters: 'Bengaluru & New York',
      hiresTotal: 28,
      openings: 1,
    },
    {
      name: 'Cisco Systems',
      domain: 'Networking Hardware, SD-WAN & Cloud Security',
      tier: 'Dream',
      maxPackage: '₹24.0 LPA',
      headquarters: 'San Jose & Bengaluru',
      hiresTotal: 34,
      openings: 2,
    },
    {
      name: 'Amazon AWS',
      domain: 'Distributed Cloud Compute & Applied ML',
      tier: 'Super Dream',
      maxPackage: '₹44.0 LPA',
      headquarters: 'Seattle & Hyderabad',
      hiresTotal: 38,
      openings: 3,
    },
    {
      name: 'Tata Consultancy Services',
      domain: 'Global Digital Transformation & IT Solutions',
      tier: 'Core/Product',
      maxPackage: '₹9.0 LPA',
      headquarters: 'Mumbai & Chennai',
      hiresTotal: 120,
      openings: 4,
    },
    {
      name: 'Adobe Systems',
      domain: 'Creative Cloud Software & Experience Tech',
      tier: 'Super Dream',
      maxPackage: '₹28.0 LPA',
      headquarters: 'San Jose & Noida',
      hiresTotal: 16,
      openings: 1,
    },
    {
      name: 'Qualcomm',
      domain: 'Wireless Telecommunications & Semiconductor R&D',
      tier: 'Super Dream',
      maxPackage: '₹21.5 LPA',
      headquarters: 'San Diego & Bengaluru',
      hiresTotal: 22,
      openings: 1,
    },
    {
      name: 'Oracle (OCI)',
      domain: 'Autonomous Databases & Cloud Infrastructure',
      tier: 'Super Dream',
      maxPackage: '₹21.0 LPA',
      headquarters: 'Austin & Hyderabad',
      hiresTotal: 30,
      openings: 2,
    },
  ];

  const filtered = companyList.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-6 lg:px-8 py-6 space-y-6 max-w-[1440px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold uppercase tracking-wider">
              Corporate Partnerships
            </span>
            <span className="text-xs text-slate-500 font-medium">86 Active Corporate Partners</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Visiting Recruiting Partners
          </h1>
          <p className="text-xs text-slate-500">
            Enterprise organizations actively participating in university campus placement cycles.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search company or industry..."
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {filtered.map((comp) => (
          <div
            key={comp.name}
            className="p-5 rounded-2xl bg-white shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-600">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {comp.tier}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">{comp.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{comp.domain}</p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Max CTC</span>
                  <span className="font-bold text-blue-600">{comp.maxPackage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Recruited</span>
                  <span className="font-semibold text-slate-800">{comp.hiresTotal} candidates</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Locations</span>
                  <span className="text-slate-600 text-[11px] truncate max-w-[130px]">{comp.headquarters}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/jobs')}
              className="w-full py-2 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1 border border-slate-200"
            >
              <span>View Open Drives ({comp.openings})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
