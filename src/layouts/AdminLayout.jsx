import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  FileCheck,
  BarChart3,
  Download,
  ScrollText,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../utils/cn';

export const AdminLayout = () => {
  const { logout, user } = useAuth();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/admin/students', icon: Users },
    { name: 'Companies', path: '/admin/companies', icon: Building2 },
    { name: 'Job Drives', path: '/admin/jobs', icon: Briefcase },
    { name: 'Applications', path: '/admin/applications', icon: FileCheck },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Exports', path: '/admin/exports', icon: Download },
    { name: 'Audit Logs', path: '/admin/audit', icon: ScrollText },
  ];

  const currentNav = navItems.find(item => location.pathname.startsWith(item.path));
  const pageTitle = currentNav ? `T&P Cell — ${currentNav.name}` : 'T&P Administration';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 shrink-0 sticky top-0 h-screen border-r border-slate-800">
        {/* Brand Banner */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-white tracking-tight text-sm block">DCRUST Admin</span>
            <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider block">T&P Central Office</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-colors",
                    isActive
                      ? "bg-indigo-600 text-white font-bold shadow-xs"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                  )
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Card & Logout Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          <div className="px-3 py-2">
            <p className="text-xs font-semibold text-slate-200 truncate">{user?.name}</p>
            <p className="text-[11px] text-slate-400 truncate">Head, T&P Cell</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3 py-2 mt-1 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title={pageTitle}
          onMenuToggle={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
          isMobileMenuOpen={isMobileDrawerOpen}
        />

        {/* Mobile Collapsible Drawer */}
        {isMobileDrawerOpen && (
          <div className="md:hidden bg-slate-900 text-slate-300 border-b border-slate-800 px-4 py-3 space-y-1 animate-in slide-in-from-top-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium",
                      isActive ? "bg-indigo-600 text-white font-bold" : "text-slate-400 hover:bg-slate-800"
                    )
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        )}

        {/* Nested Page Routes */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
