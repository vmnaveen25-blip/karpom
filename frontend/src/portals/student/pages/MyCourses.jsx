import React, { useState } from 'react';
import {
  Search,
  LayoutGrid,
  List,
  BookOpen,
  Target,
  Play,
  Eye,
  GraduationCap,
  Trophy,
  CheckCircle,
  Clock,
  Rocket,
  Bot,
  Calendar,
  MoreVertical,
  ArrowRight
} from 'lucide-react';

export default function MyCourses({ studentData, setActiveTab, setSelectedCourse }) {
  const { courses } = studentData;
  const [activeFilter, setActiveFilter] = useState('all');
  const [courseSearch, setCourseSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredCourses = courses.filter((c) => {
    if (activeFilter === 'in-progress' && c.status !== 'in-progress') return false;
    if (activeFilter === 'completed' && c.status !== 'completed') return false;
    if (courseSearch && !c.title.toLowerCase().includes(courseSearch.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header Row with Journey banner */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 380px',
        gap: '24px',
        alignItems: 'center'
      }}>
        <div>
          <h1 className="page-title">My Courses</h1>
          <p className="page-subtitle">Access your enrolled courses and continue learning where you left off.</p>
        </div>

        {/* Your Learning Journey Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #174BFF 0%, #1035C9 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '18px 24px',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 8px 24px rgba(23, 75, 255, 0.35)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <GraduationCap size={26} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '800' }}>Your Learning Journey</div>
            <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '2px' }}>
              3 courses • 65% overall progress
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs Row */}
      <div className="tabs-pill-row">
        {[
          { id: 'all', label: 'All Courses (3)' },
          { id: 'in-progress', label: 'In Progress (2)' },
          { id: 'completed', label: 'Completed (1)' }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`tab-pill-btn ${activeFilter === tab.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search & Selectors Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="search-input"
            style={{ borderRadius: 'var(--radius-md)', paddingLeft: '40px' }}
            placeholder="Search your courses..."
            value={courseSearch}
            onChange={(e) => setCourseSearch(e.target.value)}
          />
        </div>

        <select
          className="selector-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="cs">Computer Science</option>
          <option value="prog">Programming</option>
          <option value="web">Web Development</option>
        </select>

        <select className="selector-select">
          <option value="all">All Status</option>
          <option value="ongoing">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-subtle)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
          <button style={{
            background: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <LayoutGrid size={16} />
          </button>
          <button style={{
            background: 'transparent',
            color: 'var(--text-muted)',
            border: 'none',
            borderRadius: '6px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="ui-card"
            style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Image Banner with Badge */}
            <div style={{ position: 'relative', height: '150px', background: '#0b1329', overflow: 'hidden' }}>
              <img
                src={course.image}
                alt={course.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Status Badge */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '11px',
                fontWeight: '700',
                background: course.status === 'completed' ? 'rgba(16, 185, 129, 0.18)' : 'rgba(23, 75, 255, 0.22)',
                color: course.status === 'completed' ? '#10b981' : 'var(--accent-ice)',
                border: course.status === 'completed' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(23, 75, 255, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {course.status === 'completed' && <CheckCircle size={12} />}
                {course.status === 'completed' ? 'Completed' : 'In Progress'}
              </div>

              <button
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(0,0,0,0.4)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                <MoreVertical size={15} />
              </button>
            </div>

            {/* Course Content */}
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-main)' }}>
                {course.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 1.4 }}>
                {course.description}
              </p>

              <div style={{ marginTop: 'auto', paddingTop: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Progress</span>
                  <span style={{ color: 'var(--text-main)', fontWeight: '700' }}>{course.progress}%</span>
                </div>

                <div className="progress-track" style={{ height: '6px' }}>
                  <div
                    className={`progress-fill ${course.progress === 100 ? 'green' : ''}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '12px',
                  fontSize: '12px',
                  color: 'var(--text-muted)'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <BookOpen size={14} />
                    {course.totalLessons} Lessons
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Target size={14} />
                    {course.assessmentsCount} Assessments
                  </span>
                </div>

                <div style={{ marginTop: '16px' }}>
                  {course.status === 'completed' ? (
                    <button
                      className="btn-outline"
                      style={{ width: '100%', borderColor: '#6366f1' }}
                      onClick={() => {
                        setSelectedCourse(course.id);
                        setActiveTab('courseDetail');
                      }}
                    >
                      <Eye size={16} />
                      <span>View Course</span>
                    </button>
                  ) : (
                    <button
                      className="btn-primary"
                      style={{ width: '100%' }}
                      onClick={() => {
                        setSelectedCourse(course.id);
                        setActiveTab('courseDetail');
                      }}
                    >
                      <Play size={16} fill="white" />
                      <span>Continue Learning</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section: Course Summary (Left) + Quick Actions (Right) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 340px',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Course Summary Stat Cards */}
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '14px' }}>
            Course Summary
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '14px'
          }}>
            {/* Enrolled Courses */}
            <div className="ui-card" style={{ padding: '18px 16px', textAlign: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#eef2ff',
                color: '#6366f1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px auto'
              }}>
                <BookOpen size={20} />
              </div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)' }}>3</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Enrolled Courses</div>
            </div>

            {/* In Progress */}
            <div className="ui-card" style={{ padding: '18px 16px', textAlign: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#ecfdf5',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px auto'
              }}>
                <CheckCircle size={20} />
              </div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)' }}>2</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>In Progress</div>
            </div>

            {/* Completed */}
            <div className="ui-card" style={{ padding: '18px 16px', textAlign: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'var(--warning-soft)',
                color: 'var(--warning)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px auto'
              }}>
                <Trophy size={20} />
              </div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)' }}>1</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Completed</div>
            </div>

            {/* Overall Progress */}
            <div className="ui-card" style={{ padding: '18px 16px', textAlign: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#eff6ff',
                color: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px auto'
              }}>
                <Clock size={20} />
              </div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)' }}>65%</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Overall Progress</div>
            </div>
          </div>
        </div>

        {/* Quick Actions Right Box */}
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '14px' }}>
            Quick Actions
          </h3>
          <div className="ui-card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('courses')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'transparent',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Rocket size={17} color="#6366f1" />
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>Browse More Courses</span>
              </div>
              <ArrowRight size={15} color="var(--text-muted)" />
            </button>

            <button
              onClick={() => setActiveTab('aiTutor')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'transparent',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bot size={17} color="#6366f1" />
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>Open AI Tutor</span>
              </div>
              <ArrowRight size={15} color="var(--text-muted)" />
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'transparent',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={17} color="#6366f1" />
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>View Calendar</span>
              </div>
              <ArrowRight size={15} color="var(--text-muted)" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
