import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, User, LogOut, GraduationCap } from 'lucide-react';

export default function Topbar({
  setActiveTab,
  currentRole,
  setCurrentRole,
  setIsLoggedIn,
  studentProfile,
  sidebarOpen = true,
  onToggleSidebar
}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="app-topbar" style={{ justifyContent: sidebarOpen ? 'flex-end' : 'space-between' }}>
      {/* If sidebar is collapsed, show the brand logo button at top-left to expand it */}
      {!sidebarOpen && (
        <div
          id="sidebar-expand-toggle"
          className="sidebar-toggle-logo-btn"
          onClick={onToggleSidebar}
          title="Click logo to expand sidebar"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onToggleSidebar && onToggleSidebar();
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            padding: '2px 6px',
            borderRadius: '14px'
          }}
        >
          <div
            className="logo-icon-box"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #174BFF 0%, #1035C9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(23, 75, 255, 0.45)',
              flexShrink: 0,
              color: '#FFFFFF'
            }}
          >
            <GraduationCap size={22} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--text-main)', lineHeight: '1.1' }}>
              Karpom
            </span>
            <span style={{ fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '0.01em', marginTop: '2px' }}>
              {currentRole === 'Teacher' ? 'Teacher Portal' : 'Learn · Practice · Grow'}
            </span>
          </div>
        </div>
      )}

      {/* Right Actions */}
      <div className="topbar-actions">
        {/* Notifications Icon */}
        <button
          className="icon-btn-circle"
          onClick={() => setActiveTab('notifications')}
          title="Notifications"
        >
          <Bell size={18} />
          <span className="badge-dot" />
        </button>

        {/* User Profile */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            id="user-profile-menu-btn"
            className="user-profile-btn"
            onClick={() => setProfileDropdownOpen((prev) => !prev)}
          >
            <div className="avatar-circle">
              {studentProfile?.initials || 'VK'}
            </div>
            <div className="user-profile-info">
              <div className="user-name">{studentProfile?.name || 'User'}</div>
              <div className="user-role">{currentRole}</div>
            </div>
            <ChevronDown size={15} color="var(--text-muted)" style={{ marginLeft: '4px' }} />
          </button>

          {/* Profile & Role Switcher Dropdown */}
          {profileDropdownOpen && (
            <div
              id="user-profile-dropdown"
              className="ui-card fade-in"
              style={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 8px)',
                width: '240px',
                padding: '8px',
                zIndex: 100,
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <div style={{ padding: '8px 12px 10px 12px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-main)' }}>
                  {studentProfile?.name || 'User'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {studentProfile?.email || ''}
                </div>
                <div style={{
                  display: 'inline-block',
                  marginTop: '6px',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: 'var(--primary-soft)',
                  color: 'var(--primary)',
                  fontSize: '11px',
                  fontWeight: '600'
                }}>
                  {currentRole.toUpperCase()} PORTAL
                </div>
              </div>

              {/* Role Selection */}
              <div style={{ padding: '8px 12px 4px 12px', fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Switch Portal Role
              </div>

              {['Student', 'Teacher', 'Admin', 'Institution'].map((role) => (
                <button
                  key={role}
                  id={`role-switch-${role.toLowerCase()}`}
                  onClick={() => {
                    setCurrentRole(role);
                    setProfileDropdownOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: currentRole === role ? '1px solid rgba(23, 75, 255, 0.4)' : '1px solid transparent',
                    background: currentRole === role ? 'rgba(23, 75, 255, 0.18)' : 'transparent',
                    color: currentRole === role ? '#FFFFFF' : 'var(--text-main)',
                    fontWeight: currentRole === role ? '600' : '500',
                    fontSize: '13px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span>{role}</span>
                  {currentRole === role && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 8px var(--primary)' }} />}
                </button>
              ))}

              <div style={{ margin: '6px 0', borderTop: '1px solid var(--border)' }} />

              <button
                onClick={() => {
                  setActiveTab('profile');
                  setProfileDropdownOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-main)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <User size={15} />
                <span>Profile & Settings</span>
              </button>

              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setProfileDropdownOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--danger)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
