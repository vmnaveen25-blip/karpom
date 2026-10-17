import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  BookOpen,
  Layers,
  Building2,
  Calendar,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Search,
  X,
  CheckCircle2
} from 'lucide-react';

export default function AdminDashboard({ setActiveTab }) {
  const [selectedTerm, setSelectedTerm] = useState('Fall 2026');
  const [termDropdownOpen, setTermDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'allUsers' | 'academic' | 'recent' | 'pending' | null
  const [userFilter, setUserFilter] = useState('all');
  const [userSearch, setUserSearch] = useState('');

  const metrics = [
    {
      id: 'students',
      label: 'Students',
      value: '1,248',
      icon: Users,
      color: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.12)'
    },
    {
      id: 'teachers',
      label: 'Teachers',
      value: '86',
      icon: GraduationCap,
      color: '#0284C7',
      bgColor: 'rgba(2, 132, 199, 0.12)'
    },
    {
      id: 'courses',
      label: 'Courses',
      value: '42',
      icon: BookOpen,
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.12)'
    },
    {
      id: 'sections',
      label: 'Class Sections',
      value: '128',
      icon: Layers,
      color: '#F97316',
      bgColor: 'rgba(249, 115, 22, 0.12)'
    },
    {
      id: 'departments',
      label: 'Departments',
      value: '5',
      icon: Building2,
      color: '#EC4899',
      bgColor: 'rgba(236, 72, 153, 0.12)'
    }
  ];

  const academicStructure = [
    {
      id: 'departments',
      label: 'Departments',
      value: '5',
      description: 'Manage academic departments',
      icon: Building2,
      color: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.1)'
    },
    {
      id: 'courses',
      label: 'Courses',
      value: '42',
      description: 'Manage courses and curriculum',
      icon: BookOpen,
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)'
    },
    {
      id: 'sections',
      label: 'Class Sections',
      value: '128',
      description: 'Manage class sections and enrollments',
      icon: Layers,
      color: '#0284C7',
      bgColor: 'rgba(2, 132, 199, 0.1)'
    },
    {
      id: 'year',
      label: 'Academic Year',
      value: '2026-27',
      description: 'Current academic year and term',
      icon: Calendar,
      color: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.1)'
    }
  ];

  const accountStatus = [
    {
      role: 'Students',
      count: '1,248',
      pct: 93,
      icon: Users,
      color: '#8B5CF6',
      barColor: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.12)'
    },
    {
      role: 'Teachers',
      count: '86',
      pct: 90,
      icon: GraduationCap,
      color: '#0284C7',
      barColor: '#0284C7',
      bgColor: 'rgba(2, 132, 199, 0.12)'
    },
    {
      role: 'Admins',
      count: '5',
      pct: 100,
      icon: ShieldCheck,
      color: '#10B981',
      barColor: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.12)'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'New student registered',
      details: 'Arjun Mehta (CSE)',
      date: 'Sep 25, 2026 10:24 AM',
      icon: Users,
      color: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.12)'
    },
    {
      id: 2,
      action: 'New teacher added',
      details: 'Dr. Neha Singh (IT)',
      date: 'Sep 24, 2026 04:18 PM',
      icon: GraduationCap,
      color: '#0284C7',
      bgColor: 'rgba(2, 132, 199, 0.12)'
    },
    {
      id: 3,
      action: 'Course created',
      details: 'Machine Learning (CSE)',
      date: 'Sep 24, 2026 11:06 AM',
      icon: BookOpen,
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.12)'
    },
    {
      id: 4,
      action: 'Class section created',
      details: 'CSE - III Year - Section A',
      date: 'Sep 23, 2026 03:42 PM',
      icon: Layers,
      color: '#F97316',
      bgColor: 'rgba(249, 115, 22, 0.12)'
    },
    {
      id: 5,
      action: 'Department updated',
      details: 'Electronics & Communication',
      date: 'Sep 22, 2026 01:15 PM',
      icon: Building2,
      color: '#EC4899',
      bgColor: 'rgba(236, 72, 153, 0.12)'
    }
  ];

  const pendingItems = [
    {
      id: 1,
      title: 'Support Requests',
      subtitle: 'New support requests from students and teachers',
      badge: 6,
      badgeColor: '#EF4444',
      badgeBg: 'rgba(239, 68, 68, 0.12)',
      icon: HelpCircle,
      iconColor: '#EC4899',
      iconBg: 'rgba(236, 72, 153, 0.12)'
    },
    {
      id: 2,
      title: 'Inactive Student Accounts',
      subtitle: 'Students not logged in for 30+ days',
      badge: 14,
      badgeColor: '#F97316',
      badgeBg: 'rgba(249, 115, 22, 0.12)',
      icon: Users,
      iconColor: '#8B5CF6',
      iconBg: 'rgba(139, 92, 246, 0.12)'
    },
    {
      id: 3,
      title: 'Inactive Teacher Accounts',
      subtitle: 'Teachers not logged in for 30+ days',
      badge: 3,
      badgeColor: '#F97316',
      badgeBg: 'rgba(249, 115, 22, 0.12)',
      icon: GraduationCap,
      iconColor: '#0284C7',
      iconBg: 'rgba(2, 132, 199, 0.12)'
    },
    {
      id: 4,
      title: 'Unassigned Courses',
      subtitle: 'Courses without class sections',
      badge: 2,
      badgeColor: '#EAB308',
      badgeBg: 'rgba(234, 179, 8, 0.14)',
      icon: BookOpen,
      iconColor: '#10B981',
      iconBg: 'rgba(16, 185, 129, 0.12)'
    }
  ];

  // Comprehensive user list data for "View All Users" modal
  const sampleUsers = [
    { id: 'u1', name: 'Arjun Mehta', email: 'arjun.mehta@inst.edu', role: 'Student', dept: 'Computer Science', status: 'Active', lastLogin: 'Sep 25, 2026' },
    { id: 'u2', name: 'Dr. Neha Singh', email: 'neha.singh@inst.edu', role: 'Teacher', dept: 'Information Technology', status: 'Active', lastLogin: 'Sep 24, 2026' },
    { id: 'u3', name: 'Prof. R. Kumar', email: 'r.kumar@inst.edu', role: 'Teacher', dept: 'Computer Science', status: 'Active', lastLogin: 'Sep 24, 2026' },
    { id: 'u4', name: 'Vijay Vikas', email: 'vijay.vikas@student.edu', role: 'Student', dept: 'Computer Science', status: 'Active', lastLogin: 'Today' },
    { id: 'u5', name: 'Dr. Sarah Jenkins', email: 's.jenkins@inst.edu', role: 'Admin', dept: 'Academic Operations', status: 'Active', lastLogin: 'Today' },
    { id: 'u6', name: 'Kavita Iyer', email: 'kavita.i@student.edu', role: 'Student', dept: 'Electronics', status: 'Inactive', lastLogin: 'Aug 14, 2026' },
    { id: 'u7', name: 'Prof. A. Nandhini', email: 'a.nandhini@inst.edu', role: 'Teacher', dept: 'Computer Science', status: 'Active', lastLogin: 'Sep 23, 2026' },
    { id: 'u8', name: 'Rohan Sharma', email: 'rohan.s@student.edu', role: 'Student', dept: 'Mechanical', status: 'Active', lastLogin: 'Sep 21, 2026' },
    { id: 'u9', name: 'Dr. M. Sridhar', email: 'm.sridhar@inst.edu', role: 'Teacher', dept: 'Mathematics', status: 'Active', lastLogin: 'Sep 24, 2026' },
    { id: 'u10', name: 'Priya Patel', email: 'priya.p@student.edu', role: 'Student', dept: 'Civil', status: 'Inactive', lastLogin: 'Aug 29, 2026' },
    { id: 'u11', name: 'Marcus Vance', email: 'm.vance@inst.edu', role: 'Admin', dept: 'IT Infrastructure', status: 'Active', lastLogin: 'Yesterday' },
  ];

  const filteredUsers = sampleUsers.filter((u) => {
    if (userFilter === 'students' && u.role !== 'Student') return false;
    if (userFilter === 'teachers' && u.role !== 'Teacher') return false;
    if (userFilter === 'admins' && u.role !== 'Admin') return false;
    if (userSearch && !u.name.toLowerCase().includes(userSearch.toLowerCase()) && !u.email.toLowerCase().includes(userSearch.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Header Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: 'var(--text-main)',
            letterSpacing: '-0.025em',
            margin: 0
          }}>
            Good morning, Admin!
          </h1>
          <p style={{
            fontSize: '14.5px',
            color: 'var(--text-muted)',
            marginTop: '4px',
            margin: 0
          }}>
            Manage your institution's academic structure, users and operations.
          </p>
        </div>

        {/* Academic Term Selector Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setTermDropdownOpen((prev) => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 16px',
              borderRadius: '12px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
              fontSize: '13.5px',
              fontWeight: '600',
              color: 'var(--text-main)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Calendar size={16} color="var(--primary)" />
            <span>{selectedTerm}</span>
            <ChevronDown size={14} color="var(--text-muted)" style={{ transform: termDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
          </button>

          {termDropdownOpen && (
            <div
              className="fade-in"
              style={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 6px)',
                width: '180px',
                background: 'var(--bg-elevated)',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-lg)',
                padding: '6px',
                zIndex: 50
              }}
            >
              {['Fall 2026', 'Spring 2027', 'Summer 2026'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSelectedTerm(term);
                    setTermDropdownOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: selectedTerm === term ? 'rgba(23, 75, 255, 0.08)' : 'transparent',
                    color: selectedTerm === term ? 'var(--primary)' : 'var(--text-main)',
                    fontSize: '13px',
                    fontWeight: selectedTerm === term ? '700' : '500',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span>{term}</span>
                  {selectedTerm === term && <CheckCircle2 size={14} color="var(--primary)" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. Top 5 Metric Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px'
      }}>
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.id}
              onClick={() => {
                if (m.id === 'students' || m.id === 'teachers') {
                  setUserFilter(m.id);
                  setActiveModal('allUsers');
                } else {
                  setActiveModal('academic');
                }
              }}
              style={{
                background: 'var(--bg-card)',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md), var(--shadow-glow-sm)';
                e.currentTarget.style.borderColor = 'rgba(23, 75, 255, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: m.bgColor,
                  color: m.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={22} />
                </div>
                <div>
                  <div style={{
                    fontSize: '22px',
                    fontWeight: '800',
                    color: 'var(--text-main)',
                    lineHeight: '1.1'
                  }}>
                    {m.value}
                  </div>
                  <div style={{
                    fontSize: '12.5px',
                    fontWeight: '600',
                    color: 'var(--text-muted)',
                    marginTop: '4px'
                  }}>
                    {m.label}
                  </div>
                </div>
              </div>
              <ChevronRight size={18} color="var(--text-disabled)" />
            </div>
          );
        })}
      </div>

      {/* 3. Middle Section: Academic Structure (left) & Account Status (right) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.45fr) minmax(0, 1fr)',
        gap: '20px',
        alignItems: 'stretch'
      }}>
        {/* Left: Academic Structure */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '18px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-md), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          padding: '22px 24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}>
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                Academic Structure
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
                Overview of your institution's organization.
              </p>
            </div>
            <button
              onClick={() => setActiveModal('academic')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(23, 75, 255, 0.08)',
                color: 'var(--primary)',
                fontSize: '12.5px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span>View Academic Management</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* 4 Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '14px'
          }}>
            {academicStructure.map((item) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={item.id}
                  style={{
                    background: 'var(--bg-input)',
                    borderRadius: '14px',
                    border: '1px solid var(--border-subtle)',
                    padding: '16px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '136px'
                  }}
                >
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: item.bgColor,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px'
                  }}>
                    <ItemIcon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)', margin: '2px 0 4px 0' }}>
                      {item.value}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.3' }}>
                      {item.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Account Status */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '18px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-md), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          padding: '22px 24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}>
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                Account Status
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
                Overview of user accounts and their status.
              </p>
            </div>
            <button
              onClick={() => {
                setUserFilter('all');
                setActiveModal('allUsers');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(23, 75, 255, 0.08)',
                color: 'var(--primary)',
                fontSize: '12.5px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span>View All Users</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* 3 Progress Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {accountStatus.map((row) => {
              const RowIcon = row.icon;
              return (
                <div key={row.role} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '8px',
                        background: row.bgColor,
                        color: row.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <RowIcon size={16} />
                      </div>
                      <span style={{ fontSize: '13.5px', fontWeight: '600', color: 'var(--text-main)' }}>
                        {row.role}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>
                        {row.count}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', width: '38px', textAlign: 'right' }}>
                        {row.pct}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Line Bar */}
                  <div style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '6px',
                    background: 'var(--bg-subtle)',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${row.pct}%`,
                      height: '100%',
                      borderRadius: '6px',
                      background: row.barColor,
                      transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Recent Activity (left) & Pending Items (right) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.45fr) minmax(0, 1fr)',
        gap: '20px',
        alignItems: 'stretch'
      }}>
        {/* Left: Recent Activity Table */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '18px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-md), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          padding: '22px 24px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                Recent Activity
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
                Latest important actions in the system.
              </p>
            </div>
            <button
              onClick={() => setActiveModal('recent')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(23, 75, 255, 0.08)',
                color: 'var(--primary)',
                fontSize: '12.5px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto', flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(6, 13, 29, 0.75)', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '10px 8px', fontWeight: '700', width: '32px' }}>#</th>
                  <th style={{ padding: '10px 12px', fontWeight: '700' }}>Action</th>
                  <th style={{ padding: '10px 12px', fontWeight: '700' }}>Details</th>
                  <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'right' }}>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((row) => {
                  const RowIcon = row.icon;
                  return (
                    <tr
                      key={row.id}
                      style={{
                        borderBottom: '1px solid var(--border-subtle)',
                        fontSize: '13px',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <td style={{ padding: '12px 8px', color: 'var(--text-muted)', fontWeight: '600' }}>
                        {row.id}
                      </td>
                      <td style={{ padding: '12px', fontWeight: '600', color: 'var(--text-main)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '6px',
                            background: row.bgColor,
                            color: row.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <RowIcon size={13} />
                          </div>
                          <span>{row.action}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                        {row.details}
                      </td>
                      <td style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '12px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                        {row.date}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Pending Items */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '18px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-md), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          padding: '22px 24px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                Pending Items
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
                Items that may need your attention.
              </p>
            </div>
            <button
              onClick={() => setActiveModal('pending')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(23, 75, 255, 0.08)',
                color: 'var(--primary)',
                fontSize: '12.5px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Pending List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {pendingItems.map((item) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveModal('pending')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(2px)';
                    e.currentTarget.style.borderColor = 'rgba(23, 75, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: item.iconBg,
                      color: item.iconColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <ItemIcon size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '24px',
                      height: '24px',
                      padding: '0 8px',
                      borderRadius: '12px',
                      background: item.badgeBg,
                      color: item.badgeColor,
                      fontSize: '12px',
                      fontWeight: '800'
                    }}>
                      {item.badge}
                    </span>
                    <ChevronRight size={16} color="var(--text-muted)" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================
          INTERACTIVE MODAL: VIEW ALL USERS
          ======================================================== */}
      {activeModal === 'allUsers' && (
        <div
          className="fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px'
          }}
          onClick={() => setActiveModal(null)}
        >
          <div
            style={{
              background: 'var(--bg-elevated)',
              borderRadius: '20px',
              border: '1px solid var(--glass-border-hover)',
              boxShadow: '0 24px 70px rgba(0, 0, 0, 0.8), var(--shadow-glow)',
              width: '100%',
              maxWidth: '920px',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                  Institution User Directory
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
                  Manage accounts, verify credentials, and view active portal access across all roles.
                </p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="icon-btn-circle"
                style={{ width: '34px', height: '34px' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Controls: Search & Tabs */}
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              {/* Role Filter Tabs */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { id: 'all', label: 'All Users (1,339)' },
                  { id: 'students', label: 'Students (1,248)' },
                  { id: 'teachers', label: 'Teachers (86)' },
                  { id: 'admins', label: 'Admins (5)' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setUserFilter(t.id)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      border: userFilter === t.id ? '1px solid var(--primary)' : '1px solid var(--border)',
                      background: userFilter === t.id ? 'var(--primary)' : 'var(--bg-input)',
                      color: userFilter === t.id ? '#FFFFFF' : 'var(--text-secondary)',
                      fontSize: '12.5px',
                      fontWeight: userFilter === t.id ? '700' : '500',
                      cursor: 'pointer',
                      boxShadow: userFilter === t.id ? '0 0 12px rgba(23, 75, 255, 0.35)' : 'none'
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div style={{ position: 'relative', width: '260px' }}>
                <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search user name or email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '7px 12px 7px 34px',
                    borderRadius: '20px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-app)',
                    fontSize: '12.5px',
                    color: 'var(--text-main)',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Users Table */}
            <div style={{ overflowY: 'auto', flex: 1, padding: '0 24px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    <th style={{ padding: '12px 8px', fontWeight: '700' }}>User Name</th>
                    <th style={{ padding: '12px 8px', fontWeight: '700' }}>Role</th>
                    <th style={{ padding: '12px 8px', fontWeight: '700' }}>Department</th>
                    <th style={{ padding: '12px 8px', fontWeight: '700' }}>Status</th>
                    <th style={{ padding: '12px 8px', fontWeight: '700', textAlign: 'right' }}>Last Login</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '13px' }}
                    >
                      <td style={{ padding: '12px 8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: u.role === 'Admin' ? 'rgba(16, 185, 129, 0.15)' : u.role === 'Teacher' ? 'rgba(2, 132, 199, 0.15)' : 'rgba(139, 92, 246, 0.15)',
                            color: u.role === 'Admin' ? '#10B981' : u.role === 'Teacher' ? '#0284C7' : '#8B5CF6',
                            fontWeight: '700',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {u.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{u.name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '700',
                          background: u.role === 'Admin' ? 'rgba(16, 185, 129, 0.12)' : u.role === 'Teacher' ? 'rgba(2, 132, 199, 0.12)' : 'rgba(139, 92, 246, 0.12)',
                          color: u.role === 'Admin' ? '#10B981' : u.role === 'Teacher' ? '#0284C7' : '#8B5CF6'
                        }}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>
                        {u.dept}
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: u.status === 'Active' ? '#10B981' : '#F97316'
                        }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: u.status === 'Active' ? '#10B981' : '#F97316' }} />
                          {u.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'right', color: 'var(--text-muted)', fontSize: '12px' }}>
                        {u.lastLogin}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '14px 24px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--bg-app)'
            }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Showing {filteredUsers.length} of {sampleUsers.length} institutional accounts
              </span>
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  padding: '7px 18px',
                  borderRadius: '10px',
                  background: 'var(--primary)',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Close Directory
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          INTERACTIVE MODAL: ACADEMIC STRUCTURE
          ======================================================== */}
      {activeModal === 'academic' && (
        <div
          className="fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px'
          }}
          onClick={() => setActiveModal(null)}
        >
          <div
            style={{
              background: 'var(--bg-elevated)',
              borderRadius: '20px',
              border: '1px solid var(--glass-border-hover)',
              boxShadow: '0 24px 70px rgba(0, 0, 0, 0.8), var(--shadow-glow)',
              width: '100%',
              maxWidth: '680px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                  Academic Management Overview
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
                  Manage departmental structures, active curriculum tiers, and section caps.
                </p>
              </div>
              <button onClick={() => setActiveModal(null)} className="icon-btn-circle" style={{ width: '34px', height: '34px' }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
              {[
                { title: 'Computer Science & Engineering', courses: '14 Courses', students: '420 Students', sections: '6 Sections' },
                { title: 'Information Technology', courses: '10 Courses', students: '310 Students', sections: '4 Sections' },
                { title: 'Electronics & Communication', courses: '8 Courses', students: '240 Students', sections: '3 Sections' },
                { title: 'Mechanical Engineering', courses: '6 Courses', students: '180 Students', sections: '2 Sections' },
                { title: 'Civil Engineering', courses: '4 Courses', students: '98 Students', sections: '2 Sections' },
              ].map((dept, i) => (
                <div key={i} style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-app)', border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: '700', fontSize: '13.5px', color: 'var(--text-main)', marginBottom: '6px' }}>{dept.title}</div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    <span>{dept.courses}</span> • <span>{dept.students}</span> • <span>{dept.sections}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '10px',
                  background: 'var(--primary)',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          INTERACTIVE MODAL: PENDING ITEMS INSPECTION
          ======================================================== */}
      {activeModal === 'pending' && (
        <div
          className="fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px'
          }}
          onClick={() => setActiveModal(null)}
        >
          <div
            style={{
              background: 'var(--bg-elevated)',
              borderRadius: '20px',
              border: '1px solid var(--glass-border-hover)',
              boxShadow: '0 24px 70px rgba(0, 0, 0, 0.8), var(--shadow-glow)',
              width: '100%',
              maxWidth: '620px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                  Pending Institutional Items
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
                  Items requiring administrative approval, review, or course assignment.
                </p>
              </div>
              <button onClick={() => setActiveModal(null)} className="icon-btn-circle" style={{ width: '34px', height: '34px' }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { title: 'Support Ticket #1042 — Login OAuth2 sync error', from: 'Prof. R. Kumar', time: 'Today 11:20 AM', priority: 'High' },
                { title: 'Support Ticket #1039 — Assessment deadline extension', from: 'Arjun Mehta', time: 'Yesterday 04:15 PM', priority: 'Medium' },
                { title: 'Course Unassigned — Quantum Computing & Algorithms', from: 'Curriculum Office', time: '2 days ago', priority: 'High' },
                { title: 'Course Unassigned — Advanced Microcontroller Lab', from: 'ECE Department', time: '3 days ago', priority: 'Low' },
              ].map((p, idx) => (
                <div key={idx} style={{ padding: '12px 14px', borderRadius: '12px', background: 'var(--bg-app)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-main)' }}>{p.title}</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>{p.from} • {p.time}</div>
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    background: p.priority === 'High' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(234, 179, 8, 0.14)',
                    color: p.priority === 'High' ? '#EF4444' : '#CA8A04'
                  }}>
                    {p.priority}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '10px',
                  background: 'var(--primary)',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
