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
  Settings
} from 'lucide-react';

const quotesByTab = {
  home: '“Learn a little every day, grow a lot.”',
  courses: '“Keep Learning! You’re one step closer to your goals.”',
  courseDetail: '“Consistent learning today builds tomorrow.”',
  aiTutor: '“Ask. Learn. Practice. Improve. Your AI study companion.”',
  practice: '“Practice today builds expertise tomorrow.”',
  assessments: '“Assess. Improve. Achieve. Your next milestone is closer.”',
  assessmentResult: '“Every answer today is a step towards a stronger tomorrow.”',
  notes: '“Good notes create better understanding today and bigger opportunities tomorrow.”',
  flashcards: '“Small steps today, big concepts tomorrow.”',
  library: '“Good resources today build stronger skills tomorrow.”',
  progress: '“Consistent learning today builds bigger opportunities tomorrow.”',
  calendar: '“Plan today, learn better tomorrow.”',
  notifications: '“Stay updated, stay ahead.”',
  profile: '“We’re here to support your learning journey.”'
};

export default function Sidebar({ activeTab, setActiveTab }) {
  const currentQuote = quotesByTab[activeTab] || quotesByTab.home;

  const navItems = [
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

  return (
    <aside className="app-sidebar">
      <div className="sidebar-logo">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setActiveTab('home')}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(99, 102, 241, 0.4)'
          }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ffffff' }} />
          </div>
          <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
            Tutor <span style={{ color: '#4f46e5' }}>V2</span>
          </span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || 
            (item.id === 'courses' && activeTab === 'courseDetail') ||
            (item.id === 'assessments' && activeTab === 'assessmentResult') ||
            (item.id === 'notes' && activeTab === 'flashcards');

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

        <button
          onClick={() => setActiveTab('notifications')}
          className={`nav-link-btn ${activeTab === 'notifications' ? 'active' : ''}`}
        >
          <Bell size={18} strokeWidth={activeTab === 'notifications' ? 2.3 : 1.8} />
          <span>Notifications</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`nav-link-btn ${activeTab === 'profile' ? 'active' : ''}`}
        >
          <Settings size={18} strokeWidth={activeTab === 'profile' ? 2.3 : 1.8} />
          <span>Profile & Settings</span>
        </button>
      </nav>

      {/* Mascot Graphic at bottom */}
      <div className="sidebar-mascot">
        <div className="sidebar-mascot-img-wrap">
          <img src="/assets/mascot.png" alt="Tutor V2 AI Mascot" />
        </div>
        <div className="mascot-quote-box">
          <div className="mascot-quote-text">{currentQuote}</div>
          <div className="mascot-quote-indicator" />
        </div>
      </div>
    </aside>
  );
}
