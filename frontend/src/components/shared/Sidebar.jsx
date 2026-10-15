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
  GraduationCap
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, currentRole = 'Student' }) {
  const isTeacher = currentRole === 'Teacher';

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

  const navItems = isTeacher ? teacherNavItems : studentNavItems;

  return (
    <aside className="app-sidebar">
      <div className="sidebar-logo">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setActiveTab('home')}>
          <div style={{
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
          }}>
            <GraduationCap size={22} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--text-main)', lineHeight: '1.1' }}>
              Karpom
            </span>
            <span style={{ fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '0.01em', marginTop: '2px' }}>
              {isTeacher ? 'Teacher Portal' : 'Learn · Practice · Grow'}
            </span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || 
            (!isTeacher && item.id === 'courses' && activeTab === 'courseDetail') ||
            (!isTeacher && item.id === 'assessments' && activeTab === 'assessmentResult') ||
            (!isTeacher && item.id === 'notes' && activeTab === 'flashcards');

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-link-btn ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.3 : 1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}

        <div style={{ margin: '8px 0', borderTop: '1px solid var(--border)' }} />

        {!isTeacher && (
          <button
            onClick={() => setActiveTab('notifications')}
            className={`nav-link-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          >
            <Bell size={18} strokeWidth={activeTab === 'notifications' ? 2.3 : 1.8} />
            <span>Notifications</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('profile')}
          className={`nav-link-btn ${activeTab === 'profile' ? 'active' : ''}`}
        >
          <Settings size={18} strokeWidth={activeTab === 'profile' ? 2.3 : 1.8} />
          <span>Profile & Settings</span>
        </button>

        {isTeacher && (
          <button
            onClick={() => setActiveTab('teacherHelp')}
            className={`nav-link-btn ${activeTab === 'teacherHelp' ? 'active' : ''}`}
          >
            <HelpCircle size={18} strokeWidth={activeTab === 'teacherHelp' ? 2.3 : 1.8} />
            <span>Help & Support</span>
          </button>
        )}
      </nav>
    </aside>
  );
}
