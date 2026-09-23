import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import notificationApi from '../services/notificationApi';
import { Bell, LogOut, Menu, X, Check, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../components/common/Badge';

export const Header = ({ title, onMenuToggle, isMobileMenuOpen }) => {
  const { user, role, logout } = useAuth();
  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef(null);
  const queryClient = useQueryClient();

  const { data: notifData } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationApi.getNotifications(),
    refetchInterval: 15000,
  });

  const notifications = notifData?.notifications || [];
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllMutation = useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  // Close notifications dropdown on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifs(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-2xs h-16 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile Menu button & Page Title */}
      <div className="flex items-center gap-3">
        {onMenuToggle && (
          <button
            type="button"
            onClick={onMenuToggle}
            className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}
        <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          {title}
        </h1>
      </div>

      {/* Right: Notifications, User Info, Logout */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notification Bell Popover */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white animate-pulse" />
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95">
              <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[11px] font-semibold bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={() => markAllMutation.mutate()}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500">
                    No new notifications
                  </div>
                ) : (
                  notifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 text-xs transition hover:bg-slate-50 ${!n.read ? 'bg-indigo-50/40' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-slate-900">{n.title}</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(n.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{n.message}</p>
                      {n.link && (
                        <Link
                          to={n.link}
                          onClick={() => setShowNotifs(false)}
                          className="inline-flex items-center gap-1 text-indigo-600 font-medium mt-1.5 hover:underline"
                        >
                          View Details <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  ))
                )}
              </div>

              {role === 'STUDENT' && (
                <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-center">
                  <Link
                    to="/student/notifications"
                    onClick={() => setShowNotifs(false)}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    View all notifications
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Identity */}
        <div className="hidden sm:flex flex-col text-right">
          <span className="text-xs font-semibold text-slate-900 leading-tight">
            {user?.name}
          </span>
          <span className="text-[11px] text-slate-500">
            {role === 'STUDENT'
              ? `${user?.branch || 'CSE'} • ${user?.rollNumber || ''}`
              : role === 'ADMIN'
              ? 'T&P Admin'
              : user?.companyName || 'Recruiter'}
          </span>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100"
          title="Sign out of your account"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
