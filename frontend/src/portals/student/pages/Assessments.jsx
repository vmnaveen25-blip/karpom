import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  HelpCircle,
  FileText,
  BarChart2,
  CheckCircle,
  XCircle,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

export default function Assessments({ studentData, setActiveTab, setSelectedAssessment }) {
  const { assessments } = studentData;
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = assessments.filter((a) => {
    if (activeFilter === 'upcoming' && a.statusType !== 'upcoming') return false;
    if (activeFilter === 'attempted' && a.statusType !== 'completed' && a.statusType !== 'graded') return false;
    if (activeFilter === 'graded' && a.statusType !== 'graded') return false;
    if (searchQuery && !a.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Title */}
      <div>
        <h1 className="page-title">Assessments</h1>
        <p className="page-subtitle">Take tests assigned by your teachers and track your performance.</p>
      </div>

      {/* Select Course */}
      <div className="ui-card" style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: '#eef2ff',
          color: '#6366f1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <BookOpen size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>Select Course</div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>Data Structures and Algorithms</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-pill-row">
        {[
          { id: 'all', label: 'All Assessments' },
          { id: 'upcoming', label: 'Upcoming' },
          { id: 'attempted', label: 'Attempted' },
          { id: 'graded', label: 'Graded' },
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

      {/* Search & Filters */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="search-input"
            style={{ borderRadius: 'var(--radius-md)', paddingLeft: '40px' }}
            placeholder="Search assessments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select className="selector-select">
          <option>All Types</option>
          <option>Quiz</option>
          <option>Exam</option>
          <option>Test</option>
        </select>

        <select className="selector-select">
          <option>All Status</option>
          <option>Upcoming</option>
          <option>Completed</option>
          <option>Graded</option>
        </select>
      </div>

      {/* 2 Column Layout: Assessments List (Left) + Overview/Stats (Right) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 330px',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left: List of Assessment Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filtered.map((item) => (
            <div
              key={item.id}
              className="ui-card"
              style={{
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              {/* Left Details */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: '#eef2ff',
                  color: '#6366f1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <FileText size={20} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>
                      {item.title}
                    </h3>

                    {/* Status Badge */}
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '700',
                      background: item.statusType === 'completed' ? '#ecfdf5' :
                                  item.statusType === 'graded' ? '#ede9fe' :
                                  item.statusType === 'upcoming' ? '#fffbeb' : 'var(--bg-subtle)',
                      color: item.statusType === 'completed' ? '#059669' :
                             item.statusType === 'graded' ? '#6366f1' :
                             item.statusType === 'upcoming' ? '#d97706' : 'var(--text-muted)'
                    }}>
                      {item.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '600',
                      background: '#ede9fe',
                      color: '#6366f1'
                    }}>
                      {item.category}
                    </span>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '600',
                      background: '#eff6ff',
                      color: '#3b82f6'
                    }}>
                      {item.unit}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                    <Calendar size={13} />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>

              {/* Middle Metrics / Action Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {item.score ? (
                  <div style={{ display: 'flex', gap: '20px', textAlign: 'right', fontSize: '12.5px' }}>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>Score</div>
                      <div style={{ fontWeight: '800', color: 'var(--text-main)', fontSize: '14px' }}>{item.score}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>Percentage</div>
                      <div style={{ fontWeight: '800', color: '#10b981', fontSize: '14px' }}>{item.percentage}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>Attempted On</div>
                      <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{item.attemptedOn}</div>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '20px', textAlign: 'right', fontSize: '12.5px' }}>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>Duration</div>
                      <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{item.duration}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>Questions</div>
                      <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{item.questionsCount}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>Total Marks</div>
                      <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{item.totalMarks}</div>
                    </div>
                  </div>
                )}

                {/* Button */}
                {item.hasResult ? (
                  <button
                    onClick={() => {
                      if (setSelectedAssessment) setSelectedAssessment(item.id);
                      setActiveTab('assessmentResult');
                    }}
                    className="btn-outline"
                    style={{ padding: '8px 16px', fontSize: '13px' }}
                  >
                    <BarChart2 size={15} />
                    <span>View Result</span>
                  </button>
                ) : item.canStart ? (
                  <button
                    onClick={() => {
                      if (setSelectedAssessment) setSelectedAssessment(item.id);
                      setActiveTab('assessmentResult');
                    }}
                    className="btn-primary"
                    style={{ padding: '8px 16px', fontSize: '13px' }}
                  >
                    <span>Start Assessment</span>
                    <ArrowRight size={15} />
                  </button>
                ) : (
                  <button
                    disabled
                    style={{
                      padding: '8px 16px',
                      fontSize: '13px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-disabled)',
                      cursor: 'not-allowed'
                    }}
                  >
                    Not Available
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar: Overview ring, upcoming, results, topic mastery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Assessment Overview */}
          <div className="ui-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '14px' }}>
              Assessment Overview
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <div style={{ position: 'relative', width: '70px', height: '70px', flexShrink: 0 }}>
                <svg width="70" height="70" viewBox="0 0 70 70">
                  <circle cx="35" cy="35" r="28" fill="none" stroke="var(--border)" strokeWidth="6" />
                  <circle
                    cx="35"
                    cy="35"
                    r="28"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="6"
                    strokeDasharray="175.9"
                    strokeDashoffset={175.9 * (1 - 0.60)}
                    strokeLinecap="round"
                    transform="rotate(-90 35 35)"
                  />
                </svg>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15px',
                  fontWeight: '800',
                  color: 'var(--text-main)'
                }}>
                  60%
                </div>
              </div>

              <div>
                <div style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-main)' }}>
                  3 / 5 assessments completed
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                    2 Passed
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                    1 Failed
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8' }} />
                    2 Yet to Attempt
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Assessments */}
          <div className="ui-card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>Upcoming Assessments</span>
              <span style={{ fontSize: '12px', color: '#6366f1', fontWeight: '600', cursor: 'pointer' }}>View All →</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { title: 'Unit 1 - Fundamentals Quiz', date: 'Oct 10, 2026', badge: 'Upcoming' },
                { title: 'Mid Term Examination', date: 'Nov 2, 2026', badge: 'Upcoming' },
                { title: 'Unit 3 - Searching & Sorting', date: 'Oct 20, 2026', badge: 'Not Attempted' },
                { title: 'Final Assessment', date: 'Dec 15, 2026', badge: 'Not Attempted' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={15} color="#6366f1" />
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{item.title}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{item.date}</div>
                    </div>
                  </div>
                  <span style={{
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: '700',
                    background: item.badge === 'Upcoming' ? '#fffbeb' : 'var(--bg-subtle)',
                    color: item.badge === 'Upcoming' ? '#d97706' : 'var(--text-muted)'
                  }}>
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Results */}
          <div className="ui-card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>Recent Results</span>
              <span style={{ fontSize: '12px', color: '#6366f1', fontWeight: '600', cursor: 'pointer' }}>View All →</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { title: 'Arrays - Practice Test', date: 'Oct 5, 2026', score: '24 / 30', pct: '80%' },
                { title: 'Unit 2 - Arrays Assessment', date: 'Sep 28, 2026', score: '18 / 25', pct: '72%' },
                { title: 'Unit 1 - Concept Quiz', date: 'Sep 15, 2026', score: '9 / 20', pct: '45%' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                  <div>
                    <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{item.title}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{item.date}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{item.score}</div>
                    <div style={{ fontWeight: '700', color: parseInt(item.pct) >= 60 ? '#10b981' : '#ef4444' }}>{item.pct}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance by Topic */}
          <div className="ui-card" style={{ padding: '18px' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '14px' }}>
              Performance by Topic
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Array Operations', pct: 80 },
                { name: 'Two Pointers', pct: 60 },
                { name: 'Sorting Algorithms', pct: 40 },
                { name: 'Searching in Arrays', pct: 75 }
              ].map((topic) => (
                <div key={topic.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{topic.name}</span>
                    <span style={{ color: 'var(--text-muted)', fontWeight: '700' }}>{topic.pct}%</span>
                  </div>
                  <div className="progress-track" style={{ height: '6px' }}>
                    <div className="progress-fill" style={{ width: `${topic.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
