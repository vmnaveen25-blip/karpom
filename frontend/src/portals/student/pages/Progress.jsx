import React, { useState } from 'react';
import {
  BookOpen,
  Target,
  ClipboardList,
  Clock,
  TrendingUp,
  ChevronRight,
  Sparkles,
  CheckCircle,
  FileText,
  Code
} from 'lucide-react';

export default function Progress({ studentData }) {
  const [activityRange, setActivityRange] = useState('30');

  // Heatmap matrix simulated 7 days x 12 weeks
  const heatMapGrid = [
    [0, 0, 1, 0, 2, 0, 3, 2, 0, 3, 0, 2, 3, 2], // Mon
    [0, 1, 0, 1, 0, 0, 2, 0, 1, 0, 1, 2, 0, 1], // Tue
    [0, 0, 1, 0, 0, 2, 3, 2, 0, 3, 1, 3, 2, 3], // Wed
    [0, 0, 0, 1, 2, 1, 0, 2, 1, 3, 0, 2, 1, 2], // Thu
    [0, 1, 1, 0, 2, 2, 3, 3, 2, 3, 1, 3, 3, 1], // Fri
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 2, 0, 0, 0], // Sat
    [0, 0, 1, 0, 1, 0, 2, 0, 1, 2, 0, 1, 0, 0], // Sun
  ];

  const getColorByIntensity = (val) => {
    switch (val) {
      case 1: return '#ddd6fe';
      case 2: return '#8b5cf6';
      case 3: return '#5b21b6';
      default: return 'var(--bg-subtle)';
    }
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Title */}
      <div>
        <h1 className="page-title">Learning Progress</h1>
        <p className="page-subtitle">Track your progress, identify strengths and areas for improvement, and stay on top of your learning journey.</p>
      </div>

      {/* Select Course */}
      <div className="ui-card" style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'rgba(23, 75, 255, 0.15)',
          color: 'var(--accent-ice)',
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

      {/* 4 Stat Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        {/* Course Completion */}
        <div className="ui-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative', width: '60px', height: '60px', flexShrink: 0 }}>
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="24" fill="none" stroke="var(--border)" strokeWidth="6" />
              <circle
                cx="30"
                cy="30"
                r="24"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="6"
                strokeDasharray="150.8"
                strokeDashoffset={150.8 * (1 - 0.68)}
                strokeLinecap="round"
                transform="rotate(-90 30 30)"
              />
            </svg>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '800' }}>
              68%
            </div>
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>Course Completion</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>34 of 50 topics completed</div>
          </div>
        </div>

        {/* Topic Mastery */}
        <div className="ui-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Target size={24} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', lineHeight: 1 }}>72%</div>
            <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)', marginTop: '4px' }}>Topic Mastery</div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Average score across topics</div>
          </div>
        </div>

        {/* Assessment Performance */}
        <div className="ui-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(23, 75, 255, 0.15)', color: 'var(--accent-ice)', border: '1px solid rgba(23, 75, 255, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ClipboardList size={24} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', lineHeight: 1 }}>78%</div>
            <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)', marginTop: '4px' }}>Assessment Performance</div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Average score in tests</div>
          </div>
        </div>

        {/* Study Time */}
        <div className="ui-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Clock size={24} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', lineHeight: 1 }}>42 hrs</div>
            <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)', marginTop: '4px' }}>Study Time</div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Total time spent learning</div>
          </div>
        </div>
      </div>

      {/* Middle 3 Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {/* Course Progress Breakdown */}
        <div className="ui-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>Course Progress</h3>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>34 of 50 topics completed</div>
            </div>
            <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--accent-ice)' }}>68%</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { id: 1, name: 'Introduction to DSA', pct: 100, color: '#10b981' },
              { id: 2, name: 'Array and String', pct: 80, color: '#174BFF' },
              { id: 3, name: 'Linked Lists', pct: 60, color: '#3565FF' },
              { id: 4, name: 'Stacks and Queues', pct: 40, color: '#174BFF' },
              { id: 5, name: 'Trees', pct: 20, color: '#8FAEFF' },
              { id: 6, name: 'Graphs', pct: 0, color: '#94a3b8' },
            ].map((topic) => (
              <div key={topic.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12.5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '4px', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '11px' }}>
                    {topic.id}
                  </span>
                  <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{topic.name}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '70px', height: '6px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${topic.pct}%`, height: '100%', background: topic.color }} />
                  </div>
                  <span style={{ width: '35px', textAlign: 'right', fontWeight: '700', color: 'var(--text-main)', fontSize: '11.5px' }}>
                    {topic.pct}%
                  </span>
                  <ChevronRight size={14} color="var(--text-muted)" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Topic Mastery Bars */}
        <div className="ui-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>Topic Mastery</h3>
            <span style={{ fontSize: '12px', color: 'var(--accent-ice)', fontWeight: '600', cursor: 'pointer' }}>View All →</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { name: 'Arrays', pct: 90, color: '#10b981' },
              { name: 'Strings', pct: 75, color: '#3b82f6' },
              { name: 'Linked Lists', pct: 60, color: '#174BFF' },
              { name: 'Stacks', pct: 55, color: '#3565FF' },
              { name: 'Queues', pct: 50, color: '#174BFF' },
              { name: 'Trees', pct: 30, color: '#8FAEFF' },
              { name: 'Graphs', pct: 10, color: 'rgba(143, 174, 255, 0.4)' },
            ].map((tp) => (
              <div key={tp.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{tp.name}</span>
                  <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{tp.pct}%</span>
                </div>
                <div className="progress-track" style={{ height: '6px' }}>
                  <div style={{ width: `${tp.pct}%`, height: '100%', borderRadius: '99px', background: tp.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assessment Performance Line Chart SVG */}
        <div className="ui-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>Assessment Performance</h3>
            <span style={{ fontSize: '12px', color: 'var(--accent-ice)', fontWeight: '600', cursor: 'pointer' }}>View All →</span>
          </div>

          <div style={{ display: 'flex', gap: '16px', fontSize: '11.5px', marginBottom: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 6px var(--primary)' }} />
              Your Score
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-muted)' }} />
              Class Average
            </span>
          </div>

          {/* SVG Line Chart */}
          <div style={{ width: '100%', height: '180px' }}>
            <svg width="100%" height="100%" viewBox="0 0 320 160">
              {/* Grid lines */}
              <line x1="30" y1="20" x2="310" y2="20" stroke="var(--border)" strokeDasharray="3 3" />
              <line x1="30" y1="60" x2="310" y2="60" stroke="var(--border)" strokeDasharray="3 3" />
              <line x1="30" y1="100" x2="310" y2="100" stroke="var(--border)" strokeDasharray="3 3" />
              <line x1="30" y1="140" x2="310" y2="140" stroke="var(--border)" />

              {/* Y Axis labels */}
              <text x="10" y="24" fontSize="9" fill="var(--text-muted)">100</text>
              <text x="10" y="64" fontSize="9" fill="var(--text-muted)">75</text>
              <text x="10" y="104" fontSize="9" fill="var(--text-muted)">50</text>
              <text x="10" y="144" fontSize="9" fill="var(--text-muted)">0</text>

              {/* Class Average Line (grey) */}
              <polyline
                fill="none"
                stroke="var(--text-muted)"
                strokeWidth="2"
                points="50,110 110,120 170,95 230,105 290,85"
              />
              {[ [50, 110], [110, 120], [170, 95], [230, 105], [290, 85] ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="3" fill="var(--text-muted)" />
              ))}

              {/* Your Score Line (cobalt) */}
              <polyline
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2.5"
                points="50,100 110,88 170,70 230,82 290,45"
              />
              {[ [50, 100], [110, 88], [170, 70], [230, 82], [290, 45] ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="4" fill="var(--primary)" stroke="white" strokeWidth="1.5" />
              ))}

              {/* X Axis labels */}
              <text x="40" y="156" fontSize="9" fill="var(--text-muted)">Test 1</text>
              <text x="100" y="156" fontSize="9" fill="var(--text-muted)">Test 2</text>
              <text x="160" y="156" fontSize="9" fill="var(--text-muted)">Test 3</text>
              <text x="220" y="156" fontSize="9" fill="var(--text-muted)">Test 4</text>
              <text x="280" y="156" fontSize="9" fill="var(--text-muted)">Test 5</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom 3 Cards Row: Study Activity matrix + Recent Activity + Suggestions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px',
        alignItems: 'start'
      }}>
        {/* Study Activity Contribution Matrix */}
        <div className="ui-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>Study Activity</h3>
            <select
              className="selector-select"
              value={activityRange}
              onChange={(e) => setActivityRange(e.target.value)}
              style={{ padding: '4px 26px 4px 10px', fontSize: '12px' }}
            >
              <option value="30">Last 30 Days</option>
              <option value="60">Last 60 Days</option>
              <option value="90">Last 90 Days</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '10px', color: 'var(--text-muted)' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                <div key={d} style={{ height: '14px', lineHeight: '14px' }}>{d}</div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {heatMapGrid[0].map((_, colIdx) => (
                <div key={colIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {heatMapGrid.map((row, rowIdx) => (
                    <div
                      key={rowIdx}
                      style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '3px',
                        background: getColorByIntensity(row[colIdx])
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)', marginTop: '16px' }}>
            <span>No activity</span>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--bg-subtle)' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#ddd6fe' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#8b5cf6' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#5b21b6' }} />
            <span>High</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="ui-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>Recent Activity</h3>
            <span style={{ fontSize: '12px', color: '#6366f1', fontWeight: '600', cursor: 'pointer' }}>View All →</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px' }}>
            {[
              { icon: BookOpen, color: '#10b981', title: 'Completed: Array Operations Notes', time: '2 hours ago' },
              { icon: FileText, color: '#6366f1', title: 'Attempted: Quiz on Arrays', time: '5 hours ago' },
              { icon: Sparkles, color: '#3b82f6', title: 'Viewed: Sorting Algorithms Slides', time: '1 day ago' },
              { icon: Target, color: '#f59e0b', title: 'Completed: Linked List Assignment', time: '2 days ago' },
              { icon: Code, color: '#6366f1', title: 'Viewed: Tree Traversal Code', time: '3 days ago' },
            ].map((act, i) => {
              const Icon = act.icon;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--bg-subtle)', color: act.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{act.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{act.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Personalized Suggestions */}
        <div className="ui-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '16px' }}>
            💡 Personalized Suggestions
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '14px', borderRadius: '10px', background: '#fef2f2', border: '1px solid #fee2e2' }}>
              <div style={{ fontWeight: '700', fontSize: '13px', color: '#dc2626' }}>Focus on Trees and Graphs</div>
              <div style={{ fontSize: '12px', color: '#991b1b', marginTop: '4px', lineHeight: 1.4 }}>
                These topics have lower mastery. Spend more time practicing and reviewing notes.
              </div>
            </div>

            <div style={{ padding: '14px', borderRadius: '10px', background: '#eff6ff', border: '1px solid #dbeafe' }}>
              <div style={{ fontWeight: '700', fontSize: '13px', color: '#2563eb' }}>Take More Practice Tests</div>
              <div style={{ fontSize: '12px', color: '#1e40af', marginTop: '4px', lineHeight: 1.4 }}>
                Regular practice can improve your assessment performance.
              </div>
            </div>

            <div style={{ padding: '14px', borderRadius: '10px', background: '#ecfdf5', border: '1px solid #d1fae5' }}>
              <div style={{ fontWeight: '700', fontSize: '13px', color: '#059669' }}>Maintain Consistency</div>
              <div style={{ fontSize: '12px', color: '#065f46', marginTop: '4px', lineHeight: 1.4 }}>
                Try to study at least 1 hour daily to stay on track.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
