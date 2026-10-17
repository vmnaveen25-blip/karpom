import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  Play,
  Lightbulb,
  Bookmark,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  XCircle,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

export default function Practice({ studentData }) {
  const { practiceQuestions } = studentData;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({ 0: 'C', 1: 'C', 2: 'B' });
  const [showHint, setShowHint] = useState(false);
  const [activeTabSub, setActiveTabSub] = useState('practice');

  const question = practiceQuestions[currentIdx] || practiceQuestions[0];
  const selected = selectedAnswers[currentIdx];

  const handleSelectOption = (key) => {
    setSelectedAnswers({ ...selectedAnswers, [currentIdx]: key });
  };

  const handleNext = () => {
    if (currentIdx < practiceQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setShowHint(false);
    }
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Header */}
      <div>
        <h1 className="page-title">Practice</h1>
        <p className="page-subtitle">Strengthen your understanding with curated practice questions.</p>
      </div>

      {/* Select Course & Material */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px'
      }}>
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
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>Select Course</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>Data Structures and Algorithms</div>
          </div>
        </div>

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
            <FileText size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>Select Material</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>Arrays</div>
          </div>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="tabs-pill-row">
        {[
          { id: 'practice', label: 'Practice Questions' },
          { id: 'topic', label: 'Topic-wise Practice' },
          { id: 'mixed', label: 'Mixed Practice' },
          { id: 'incorrect', label: 'Incorrect Questions' }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`tab-pill-btn ${activeTabSub === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTabSub(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter Row */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
        <select className="selector-select">
          <option>All Levels</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <select className="selector-select">
          <option>All Types</option>
          <option>Multiple Choice</option>
          <option>Code Snippet</option>
        </select>
        <select className="selector-select">
          <option>Recommended</option>
          <option>Most Solved</option>
          <option>Hardest First</option>
        </select>

        <button className="btn-primary" style={{ marginLeft: 'auto' }}>
          <Play size={15} fill="white" />
          <span>Start Practice</span>
        </button>
      </div>

      {/* Main Practice Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 330px',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left: Question Box */}
        <div className="ui-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Question Info */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main)' }}>
              Question {question.number} of {question.total}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: '700',
                background: 'var(--warning-soft)',
                color: 'var(--warning)'
              }}>
                {question.difficulty}
              </span>
              <span style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: '700',
                background: 'rgba(23, 75, 255, 0.15)',
                color: 'var(--accent-ice)',
                border: '1px solid rgba(23, 75, 255, 0.3)'
              }}>
                {question.badge}
              </span>
              <span style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: '700',
                background: 'rgba(59, 130, 246, 0.15)',
                color: '#60a5fa',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}>
                MCQ
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)', lineHeight: 1.5 }}>
            {question.title}
          </div>

          {/* Code / Sample Box */}
          {question.sampleCode && (
            <div style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap'
            }}>
              {question.sampleCode}
            </div>
          )}

          {/* Radio Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {question.options.map((opt) => {
              const isSelected = selected === opt.key;
              return (
                <div
                  key={opt.key}
                  onClick={() => handleSelectOption(opt.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                    background: isSelected ? 'rgba(23, 75, 255, 0.15)' : 'var(--bg-card)',
                    boxShadow: isSelected ? '0 0 14px rgba(23, 75, 255, 0.2)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: isSelected ? '5px solid var(--primary)' : '2px solid var(--border)',
                    background: isSelected ? 'var(--primary)' : 'var(--bg-app)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }} />
                  <span style={{ fontSize: '14px', fontWeight: isSelected ? '700' : '500', color: 'var(--text-main)' }}>
                    {opt.key}. {opt.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Hint Card */}
          {showHint && (
            <div style={{
              padding: '14px 16px',
              background: 'var(--warning-soft)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--warning)',
              fontSize: '13px',
              lineHeight: 1.5
            }}>
              <strong>Hint:</strong> {question.hint || 'Think about Kadane\'s standard dynamic programming approach.'}
            </div>
          )}

          {/* Action Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px',
            borderTop: '1px solid var(--border)'
          }}>
            <button
              onClick={() => setShowHint(!showHint)}
              className="btn-outline"
              style={{ padding: '8px 14px', fontSize: '13px' }}
            >
              <Lightbulb size={16} />
              <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
            </button>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <Bookmark size={15} />
                <span>Save for Later</span>
              </button>

              <button
                onClick={handleNext}
                className="btn-primary"
                style={{ padding: '10px 20px' }}
              >
                <span>Next Question</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Progress, Palette, Details, Related Topics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Practice Progress Card */}
          <div className="ui-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '16px' }}>
              Practice Progress
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* Circular 20% ring */}
              <div style={{ position: 'relative', width: '68px', height: '68px', flexShrink: 0 }}>
                <svg width="68" height="68" viewBox="0 0 68 68">
                  <circle cx="34" cy="34" r="28" fill="none" stroke="var(--border)" strokeWidth="6" />
                  <circle
                    cx="34"
                    cy="34"
                    r="28"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="6"
                    strokeDasharray="175.9"
                    strokeDashoffset={175.9 * (1 - 0.20)}
                    strokeLinecap="round"
                    transform="rotate(-90 34 34)"
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
                  fontSize: '14px',
                  fontWeight: '800',
                  color: 'var(--text-main)'
                }}>
                  20%
                </div>
              </div>

              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>
                  2 of 10 questions solved
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  marginTop: '8px'
                }}>
                  <span style={{ color: '#10b981', fontWeight: '600' }}>1 Correct</span>
                  <span>|</span>
                  <span style={{ color: '#ef4444', fontWeight: '600' }}>1 Incorrect</span>
                </div>
              </div>
            </div>
          </div>

          {/* Question Palette */}
          <div className="ui-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>Question Palette</span>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', border: '1px solid #94a3b8' }} />
                Not Attempted
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                Correct
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                Incorrect
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1' }} />
                Current
              </span>
            </div>

            {/* 10 Question Blocks Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '8px'
            }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, i) => {
                const isCurrent = i === currentIdx;
                const isCorrect = i === 1;
                const isIncorrect = i === 2;

                let bg = 'var(--bg-subtle)';
                let border = '1px solid var(--border)';
                let color = 'var(--text-main)';

                if (isCurrent) {
                  bg = 'rgba(23, 75, 255, 0.2)';
                  border = '1.5px solid var(--primary)';
                  color = 'var(--accent-ice)';
                } else if (isCorrect) {
                  bg = '#ecfdf5';
                  border = '1px solid #10b981';
                  color = '#059669';
                } else if (isIncorrect) {
                  bg = '#fef2f2';
                  border = '1px solid #ef4444';
                  color = '#dc2626';
                }

                return (
                  <button
                    key={num}
                    onClick={() => setCurrentIdx(i < practiceQuestions.length ? i : 0)}
                    style={{
                      height: '38px',
                      borderRadius: '8px',
                      background: bg,
                      border: border,
                      color: color,
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topic Details */}
          <div className="ui-card" style={{ padding: '18px', fontSize: '13px' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '12px' }}>
              Topic Details
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Topic</span>
                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{question.topic}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Concepts</span>
                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{question.concepts}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>Difficulty</span>
                <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'var(--warning-soft)', color: 'var(--warning)', fontWeight: '700', fontSize: '11px' }}>
                  {question.difficulty}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Question Type</span>
                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{question.questionType}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Time Limit</span>
                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{question.timeLimit}</span>
              </div>
            </div>
          </div>

          {/* Related Topics */}
          <div className="ui-card" style={{ padding: '18px' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '12px' }}>
              Related Topics
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Prefix Sum', 'Sliding Window', 'Subarray Problems', 'Dynamic Programming on Arrays'].map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: 'var(--bg-subtle)',
                    fontSize: '12.5px',
                    fontWeight: '600',
                    color: 'var(--text-main)',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={14} color="#6366f1" />
                    {item}
                  </span>
                  <ChevronRight size={14} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
