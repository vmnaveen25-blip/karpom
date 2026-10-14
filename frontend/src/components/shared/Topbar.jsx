import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, User, LogOut } from 'lucide-react';

export default function Topbar({
  searchQuery,
  setSearchQuery,
  setActiveTab,
  currentRole,
  setCurrentRole,
  setIsLoggedIn,
  studentProfile
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
    <header className="app-topbar">
      {/* Search Input */}
      <div className="search-box-wrap" style={{ position: 'relative' }}>
        <Search size={17} />
        <input
          type="text"
          className="search-input"
          placeholder="Search for courses, topics, or resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ paddingRight: '60px' }}
        />
        <div style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '11px',
          fontWeight: '700',
          color: 'var(--text-muted)',
          background: 'rgba(23, 75, 255, 0.08)',
          border: '1px solid rgba(23, 75, 255, 0.2)',
          borderRadius: '6px',
          padding: '2px 7px',
          pointerEvents: 'none'
        }}>
          Ctrl K
        </div>
      </div>

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
