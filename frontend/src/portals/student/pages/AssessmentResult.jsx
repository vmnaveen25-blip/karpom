import React, { useState } from 'react';
import {
  ArrowLeft,
  Download,
  RotateCcw,
  Clock,
  CheckCircle,
  XCircle,
  MinusCircle,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  FileText,
  Hourglass,
  ArrowRight
} from 'lucide-react';

export default function AssessmentResult({ setActiveTab }) {
  const [selectedQ, setSelectedQ] = useState(3);
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Back button */}
      <div>
        <button
          onClick={() => setActiveTab('assessments')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'transparent',
            border: 'none',
            color: '#4f46e5',
            fontSize: '13.5px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Assessments</span>
        </button>
      </div>

      {/* Header Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="page-title">Unit 1 - Fundamentals Quiz</h1>
            <span style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              background: '#ecfdf5',
              color: '#059669',
              fontSize: '12px',
              fontWeight: '700'
            }}>
              Completed
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
            <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(23, 75, 255, 0.15)', color: 'var(--accent-ice)', border: '1px solid rgba(23, 75, 255, 0.3)', fontSize: '12px', fontWeight: '600' }}>
              Data Structures and Algorithms
            </span>
            <span style={{ padding: '2px 8px', borderRadius: '4px', background: '#eff6ff', color: '#3b82f6', fontSize: '12px', fontWeight: '600' }}>
              Quiz
            </span>
            <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'var(--bg-subtle)', color: 'var(--text-secondary)', fontSize: '12px' }}>
              Unit 1
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Oct 10, 2026 10:00 AM – 11:00 AM
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-outline">
            <Download size={15} />
            <span>Download Report</span>
          </button>
          <button className="btn-primary">
            <RotateCcw size={15} />
            <span>Review Answers</span>
          </button>
        </div>
      </div>

      {/* 5 Stats Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '14px'
      }}>
        {/* Total Marks */}
        <div className="ui-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--warning-soft)', color: 'var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Hourglass size={20} />
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)' }}>24 / 30</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total Marks (80%)</div>
          </div>
        </div>

        {/* Correct */}
        <div className="ui-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--success-soft)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)' }}>24</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Correct</div>
          </div>
        </div>

        {/* Incorrect */}
        <div className="ui-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--danger-soft)', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XCircle size={20} />
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)' }}>5</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Incorrect</div>
          </div>
        </div>

        {/* Not Attempted */}
        <div className="ui-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--bg-subtle)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MinusCircle size={20} />
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)' }}>1</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Not Attempted</div>
          </div>
        </div>

        {/* Time Taken */}
        <div className="ui-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(23, 75, 255, 0.15)', color: 'var(--accent-ice)', border: '1px solid rgba(23, 75, 255, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)' }}>58 mins</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Time Taken (out of 60 mins)</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '2px' }}>
        <button style={{
          padding: '8px 4px',
          border: 'none',
          background: 'transparent',
          borderBottom: '2px solid var(--primary)',
          color: 'var(--accent-ice)',
          fontWeight: '700',
          fontSize: '14px',
          cursor: 'pointer'
        }}>
          Question Review
        </button>
        <button style={{
          padding: '8px 4px',
          border: 'none',
          background: 'transparent',
          color: 'var(--text-muted)',
          fontWeight: '500',
          fontSize: '14px',
          cursor: 'pointer'
        }}>
          Performance Analysis
        </button>
      </div>

      {/* Filter Row */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        {[
          { id: 'all', label: 'All Questions (30)' },
          { id: 'correct', label: 'Correct (24)', color: '#10b981' },
          { id: 'incorrect', label: 'Incorrect (5)', color: '#ef4444' },
          { id: 'unattempted', label: 'Not Attempted (1)', color: '#94a3b8' },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActiveFilter(btn.id)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: activeFilter === btn.id ? '1px solid var(--primary)' : '1px solid var(--border)',
              background: activeFilter === btn.id ? 'var(--primary)' : 'var(--bg-card)',
              color: activeFilter === btn.id ? '#ffffff' : 'var(--text-main)',
              boxShadow: activeFilter === btn.id ? '0 0 12px var(--primary-glow)' : 'none',
              fontSize: '12.5px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {btn.label}
          </button>
        ))}

        <select className="selector-select" style={{ marginLeft: 'auto', padding: '6px 30px 6px 12px', fontSize: '12.5px' }}>
          <option>All Topics</option>
          <option>Array Operations</option>
          <option>Two Pointers</option>
          <option>Sorting</option>
        </select>
      </div>

      {/* Main 3 Section Grid: Palette (Left) + Detail (Center) + Topic Breakdown (Right) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '220px minmax(0, 1fr) 280px',
        gap: '20px',
        alignItems: 'start'
      }}>
        {/* Left: 30 Question Blocks Palette */}
        <div className="ui-card" style={{ padding: '16px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '8px'
          }}>
            {Array.from({ length: 30 }, (_, i) => i + 1).map((qNum) => {
              const isSelected = selectedQ === qNum;
              const isIncorrect = [3, 5, 11, 17, 25, 28].includes(qNum);
              const isUnattempted = qNum === 30;
              const isCorrect = !isIncorrect && !isUnattempted;

              let bg = '#ecfdf5';
              let text = '#059669';
              let border = '1px solid #a7f3d0';

              if (isIncorrect) {
                bg = '#fef2f2';
                text = '#dc2626';
                border = '1px solid #fecaca';
              } else if (isUnattempted) {
                bg = 'var(--bg-subtle)';
                text = 'var(--text-muted)';
                border = '1px solid var(--border)';
              }

              if (isSelected) {
                border = '2px solid #6366f1';
              }

              return (
                <button
                  key={qNum}
                  onClick={() => setSelectedQ(qNum)}
                  style={{
                    height: '34px',
                    borderRadius: '8px',
                    background: bg,
                    border: border,
                    color: text,
                    fontSize: '12.5px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {qNum}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)', fontSize: '11px', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
              Correct (24)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
              Incorrect (5)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8' }} />
              Not Attempted (1)
            </span>
          </div>
        </div>

        {/* Center: Selected Question Review */}
        <div className="ui-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main)' }}>
              Question {selectedQ} of 30
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setSelectedQ(Math.max(1, selectedQ - 1))}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setSelectedQ(Math.min(30, selectedQ + 1))}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(23, 75, 255, 0.15)', color: 'var(--accent-ice)', border: '1px solid rgba(23, 75, 255, 0.3)', fontSize: '11px', fontWeight: '700' }}>
              Array Operations
            </span>
            <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'var(--success-soft)', color: 'var(--success)', fontSize: '11px', fontWeight: '700' }}>
              Easy
            </span>
            <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'var(--primary-soft)', color: 'var(--primary)', fontSize: '11px', fontWeight: '700' }}>
              MCQ
            </span>
            <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'var(--danger-soft)', color: 'var(--danger)', fontSize: '11px', fontWeight: '700', marginLeft: 'auto' }}>
              Incorrect
            </span>
            <Bookmark size={16} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
          </div>

          <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>
            What will be the output of the following code?
          </div>

          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            lineHeight: 1.6,
            color: 'var(--text-main)'
          }}>
            1&nbsp;&nbsp;int[] arr = &#123;1, 2, 3, 4, 5&#125;;<br />
            2&nbsp;&nbsp;System.out.println(arr[3]);
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '13px' }}>
              A. 3
            </div>

            {/* Selected Incorrect Answer */}
            <div style={{
              padding: '12px 14px',
              borderRadius: '8px',
              border: '1.5px solid var(--danger)',
              background: 'var(--danger-soft)',
              color: 'var(--danger)',
              fontSize: '13px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>B. 4</span>
              <XCircle size={16} color="#ef4444" />
            </div>

            {/* Correct Answer highlight */}
            <div style={{ padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '13px' }}>
              C. 5
            </div>

            <div style={{ padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '13px' }}>
              D. Compilation Error
            </div>
          </div>

          {/* Explanation Box */}
          <div style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: 'var(--radius-md)',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: '700', fontSize: '13.5px' }}>
              <CheckCircle size={16} />
              <span>Correct Answer: C. 5</span>
            </div>
            <div style={{ fontSize: '13px', color: '#065f46', marginTop: '6px', lineHeight: 1.5 }}>
              <strong>Explanation:</strong> Array indexing starts from 0 in Java. So arr[0] = 1, arr[1] = 2, arr[2] = 3, and arr[3] = 4 (or 5 depending on the test indexing). In 0-indexed systems arr[3] is the 4th element.
            </div>
          </div>
        </div>

        {/* Right Sidebar: Performance by topic, Time analysis, Next Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Performance by Topic */}
          <div className="ui-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>Performance by Topic</span>
              <span style={{ fontSize: '11px', color: '#6366f1', fontWeight: '600' }}>View All →</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'Array Operations', pct: 90, ratio: '9 / 10' },
                { name: 'Two Pointers', pct: 80, ratio: '4 / 5' },
                { name: 'Sorting Algorithms', pct: 75, ratio: '3 / 4' },
                { name: 'Searching in Arrays', pct: 100, ratio: '4 / 4' },
                { name: 'Time Complexity', pct: 50, ratio: '2 / 4' },
                { name: 'Recursion Basics', pct: 100, ratio: '2 / 2' },
                { name: 'Linked Lists', pct: 100, ratio: '0 / 1' },
              ].map((topic) => (
                <div key={topic.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{topic.name}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{topic.pct}% &nbsp; {topic.ratio}</span>
                  </div>
                  <div className="progress-track" style={{ height: '5px' }}>
                    <div className="progress-fill" style={{ width: `${topic.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Analysis */}
          <div className="ui-card" style={{ padding: '16px' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '12px' }}>
              Time Analysis
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
              <div>
                <div style={{ color: 'var(--text-muted)' }}>Total Time</div>
                <div style={{ fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>58 mins</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)' }}>Avg per Question</div>
                <div style={{ fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>1.9 mins</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)' }}>Fastest Answer</div>
                <div style={{ fontWeight: '700', color: '#10b981', marginTop: '2px' }}>12 secs (Q. 8)</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)' }}>Slowest Answer</div>
                <div style={{ fontWeight: '700', color: '#ef4444', marginTop: '2px' }}>4.5 mins (Q. 17)</div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="ui-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>
              Next Steps
            </h4>
            <button
              onClick={() => setActiveTab('practice')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: '8px',
                background: '#ede9fe',
                border: 'none',
                color: '#6366f1',
                fontSize: '12.5px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <span>Practice Incorrect Questions</span>
              <ArrowRight size={14} />
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: '8px',
                background: 'var(--bg-subtle)',
                border: 'none',
                color: 'var(--text-main)',
                fontSize: '12.5px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <span>View Detailed Report</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
