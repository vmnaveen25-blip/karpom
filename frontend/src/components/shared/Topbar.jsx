import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, User, LogOut, GraduationCap, Search } from 'lucide-react';

export default function Topbar({
  setActiveTab,
  currentRole,
  setCurrentRole,
  setIsLoggedIn,
  studentProfile,
  sidebarOpen = true,
  onToggleSidebar,
  searchQuery,
  setSearchQuery
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

  const isAdmin = currentRole === 'Admin' || currentRole === 'Institution';
  const displayName = isAdmin ? (studentProfile?.name || 'Dr. R. Kumar') : (studentProfile?.name || 'User');
  const displayRole = isAdmin ? 'Institution Admin' : (studentProfile?.role || currentRole);
  const displayInitials = isAdmin ? 'RK' : (studentProfile?.initials || 'VK');

  return (
    <header className="app-topbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      {/* Left Area: Toggle (if collapsed) + Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
              padding: '2px 8px',
              borderRadius: '10px'
            }}
          >
            <div
              className="logo-icon-box"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #174BFF 0%, #1035C9 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(23, 75, 255, 0.45)',
                flexShrink: 0,
                color: '#FFFFFF'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 18V9a4 4 0 0 1 8 0v9" />
                <path d="M12 18V9a4 4 0 0 1 8 0v9" />
                <circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="16" cy="9" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '17px', fontWeight: '800', letterSpacing: '-0.02em', color: '#FFFFFF', lineHeight: '1.1' }}>
                Tutor V2
              </span>
              <span style={{ fontSize: '10px', fontWeight: '500', color: '#7B8BA6', letterSpacing: '0.01em', marginTop: '2px' }}>
                AI Learning Platform
              </span>
            </div>
          </div>
        )}

        {/* Global Search Bar with Ctrl K badge matching image */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(10, 20, 42, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '7px 14px',
            width: '280px',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)'
          }}
        >
          <Search size={16} color="#7B8BA6" style={{ flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search anything..."
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#FFFFFF',
              fontSize: '13px',
              width: '100%'
            }}
          />
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '6px',
              padding: '2px 6px',
              fontSize: '10.5px',
              fontWeight: '600',
              color: '#7B8BA6',
              whiteSpace: 'nowrap'
            }}
          >
            Ctrl K
          </div>
        </div>
      </div>

      {/* Right Actions: Notifications & Profile */}
      <div className="topbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Notifications Icon */}
        <button
          className="icon-btn-circle"
          onClick={() => setActiveTab('notifications')}
          title="Notifications"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(10, 20, 42, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#7B8BA6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          <Bell size={18} />
          <span
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#38BDF8',
              boxShadow: '0 0 6px #38BDF8'
            }}
          />
        </button>

        {/* User Profile matching reference image */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            id="user-profile-menu-btn"
            className="user-profile-btn"
            onClick={() => setProfileDropdownOpen((prev) => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 6px',
              borderRadius: '12px'
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #174BFF 0%, #1035C9 100%)',
                color: '#FFFFFF',
                fontWeight: '700',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(23, 75, 255, 0.4)'
              }}
            >
              {displayInitials}
            </div>
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#FFFFFF', lineHeight: '1.2' }}>
                {displayName}
              </div>
              <div style={{ fontSize: '11px', color: '#7B8BA6', lineHeight: '1.2', marginTop: '2px' }}>
                {displayRole}
              </div>
            </div>
            <ChevronDown size={14} color="#7B8BA6" style={{ marginLeft: '2px' }} />
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
                boxShadow: 'var(--shadow-lg)',
                background: '#0B132B',
                border: '1px solid var(--border)',
                borderRadius: '14px'
              }}
            >
              <div style={{ padding: '8px 12px 10px 12px', borderBottom: '1px solid var(--glass-border)' }}>
                <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-main)' }}>
                  {displayName}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {isAdmin ? 'rkumar@esec.ac.in' : (studentProfile?.email || '')}
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

              <div style={{ margin: '6px 0', borderTop: '1px solid var(--glass-border)' }} />

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
