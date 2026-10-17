import React from 'react';
import {
  Home,
  BookOpen,
  Bot,
  FileText,
  CheckSquare,
  BookMarked,
  Library,
  TrendingUp,
  Calendar,
  Bell,
  Settings,
  Users,
  FolderOpen,
  ClipboardCheck,
  MessageSquare,
  HelpCircle,
  GraduationCap,
  Layers,
  Building,
  ChevronDown
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  currentRole = 'Admin',
  sidebarOpen = true,
  onToggleSidebar
}) {
  const isTeacher = currentRole === 'Teacher';
  const isAdmin = currentRole === 'Admin' || currentRole === 'Institution';

  const studentNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'aiTutor', label: 'AI Tutor', icon: Bot },
    { id: 'practice', label: 'Practice', icon: FileText },
    { id: 'assessments', label: 'Assessments', icon: CheckSquare },
    { id: 'notes', label: 'Notes', icon: BookMarked },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  const teacherNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'teacherClasses', label: 'My Classes & Students', icon: Users },
    { id: 'teacherCourses', label: 'Courses & Curriculum', icon: BookOpen },
    { id: 'teacherMaterials', label: 'Teaching Materials', icon: FolderOpen },
    { id: 'teacherAssignments', label: 'Assignments & Assessments', icon: ClipboardCheck },
    { id: 'teacherSchedule', label: 'Schedule', icon: Calendar },
    { id: 'teacherCommunication', label: 'Communication', icon: MessageSquare },
    { id: 'teacherProgress', label: 'Student Progress', icon: TrendingUp },
  ];

  // Admin Navigation strictly matching uploaded reference image
  const adminNavItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'adminAcademic', label: 'Academic Management', icon: GraduationCap },
    { id: 'adminCourses', label: 'Courses', icon: BookOpen },
    { id: 'adminSections', label: 'Class Sections', icon: Layers },
  ];

  const navItems = isAdmin ? adminNavItems : isTeacher ? teacherNavItems : studentNavItems;

  return (
    <aside className={`app-sidebar ${!sidebarOpen ? 'closed' : ''}`} style={{ display: 'flex', flexDirection: 'column' }}>
      {/* 1. Header Branding */}
      <div className="sidebar-logo" style={{ padding: '4px 6px 14px 6px', borderBottom: 'none', marginBottom: '4px' }}>
        <div
          id="sidebar-brand-toggle"
          className="sidebar-brand-wrapper"
          onClick={onToggleSidebar}
          title="Click logo to collapse sidebar"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onToggleSidebar && onToggleSidebar();
            }
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', width: '100%' }}
        >
          <div
            className="logo-icon-box"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #174BFF 0%, #1035C9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 18px rgba(23, 75, 255, 0.50)',
              flexShrink: 0,
              color: '#FFFFFF'
            }}
          >
            {/* Tutor V2 dual curve logo */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18V9a4 4 0 0 1 8 0v9" />
              <path d="M12 18V9a4 4 0 0 1 8 0v9" />
              <circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none" />
              <circle cx="16" cy="9" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.02em', color: '#FFFFFF', lineHeight: '1.1' }}>
              Tutor V2
            </span>
            <span style={{ fontSize: '11px', fontWeight: '500', color: '#7B8BA6', letterSpacing: '0.01em', marginTop: '3px' }}>
              AI Learning Platform
            </span>
          </div>
        </div>
      </div>

      {/* 2. Institution Admin Selector Card */}
      {isAdmin && (
        <div
          style={{
            margin: '0 4px 14px 4px',
            padding: '10px 12px',
            borderRadius: '14px',
            background: 'rgba(14, 25, 48, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(23, 75, 255, 0.16)',
              border: '1px solid rgba(23, 75, 255, 0.32)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4D82FF',
              flexShrink: 0
            }}
          >
            <Building size={16} />
          </div>
          <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#7B8BA6', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              INSTITUTION ADMIN
            </div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#FFFFFF', lineHeight: '1.25' }}>
              Erode Sengunthar<br />Engineering College
            </div>
          </div>
          <ChevronDown size={14} color="#7B8BA6" style={{ flexShrink: 0 }} />
        </div>
      )}

      {/* 3. Navigation Links */}
      <nav className="sidebar-nav" style={{ flex: 1, overflowY: 'auto' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeTab === item.id ||
            (item.id === 'users' && (activeTab === 'adminStudents' || activeTab === 'adminTeachers')) ||
            (!isTeacher && !isAdmin && item.id === 'courses' && activeTab === 'courseDetail') ||
            (!isTeacher && !isAdmin && item.id === 'assessments' && activeTab === 'assessmentResult') ||
            (!isTeacher && !isAdmin && item.id === 'notes' && activeTab === 'flashcards');

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-link-btn ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.4 : 1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}

        <div style={{ margin: '10px 4px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }} />

        {!isTeacher && !isAdmin && (
          <button
            onClick={() => setActiveTab('notifications')}
            className={`nav-link-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          >
            <Bell size={18} strokeWidth={activeTab === 'notifications' ? 2.4 : 1.8} />
            <span>Notifications</span>
          </button>
        )}

        {(isAdmin || isTeacher) && (
          <button
            onClick={() => setActiveTab(isTeacher ? 'teacherHelp' : 'adminHelp')}
            className={`nav-link-btn ${activeTab === (isTeacher ? 'teacherHelp' : 'adminHelp') ? 'active' : ''}`}
          >
            <HelpCircle size={18} strokeWidth={activeTab === (isTeacher ? 'teacherHelp' : 'adminHelp') ? 2.4 : 1.8} />
            <span>Help & Support</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('profile')}
          className={`nav-link-btn ${activeTab === 'profile' ? 'active' : ''}`}
        >
          <Settings size={18} strokeWidth={activeTab === 'profile' ? 2.4 : 1.8} />
          <span>Profile & Settings</span>
        </button>
      </nav>

      {/* 4. Bottom Promotional / Slogan Banner */}
      {isAdmin && (
        <div
          style={{
            margin: '14px 4px 0 4px',
            padding: '16px',
            borderRadius: '16px',
            background: 'linear-gradient(180deg, rgba(14, 25, 54, 0.7) 0%, rgba(8, 14, 32, 0.95) 100%)',
            border: '1px solid rgba(23, 75, 255, 0.25)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle blue aurora glow in background */}
          <div
            style={{
              position: 'absolute',
              bottom: '-25px',
              right: '-25px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(23, 75, 255, 0.4) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#FFFFFF', lineHeight: '1.3' }}>
              Make Learning<br />Better Together
            </div>
            <div style={{ fontSize: '11px', color: '#7B8BA6', marginTop: '6px', lineHeight: '1.4' }}>
              Manage your institution<br />for a smarter future.
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
