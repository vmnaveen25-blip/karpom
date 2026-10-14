import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Shuffle,
  Filter,
  Bookmark,
  RotateCw,
  ArrowRight,
  Check,
  CheckCircle,
  Clock,
  X,
  FileText,
  Layers,
  HelpCircle,
  Settings
} from 'lucide-react';

export default function Flashcards({ studentData, setActiveTab }) {
  const { flashcards } = studentData;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const card = flashcards[currentIdx] || flashcards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIdx((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIdx((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Back button */}
      <div>
        <button
          onClick={() => setActiveTab('notes')}
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
          <span>Back to Notes</span>
        </button>
      </div>

      {/* Header */}
      <div>
        <h1 className="page-title">Flashcards</h1>
        <p className="page-subtitle">Practice key concepts with flashcards. Flip, learn and test yourself.</p>
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

      {/* Mode Tabs */}
      <div className="tabs-pill-row">
        <button className="tab-pill-btn" onClick={() => setActiveTab('notes')}>Notes</button>
        <button className="tab-pill-btn active">Flashcards</button>
        <button className="tab-pill-btn">My Notes</button>
      </div>

      {/* Filter and Action Pills */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => setFilterType('all')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            background: filterType === 'all' ? '#6366f1' : 'var(--bg-card)',
            color: filterType === 'all' ? 'white' : 'var(--text-secondary)',
            border: '1px solid var(--border)',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          All Cards (120)
        </button>

        <button
          onClick={() => setFilterType('unpracticed')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-card)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Unpracticed (45)
        </button>

        <button
          onClick={() => setFilterType('learning')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            background: '#fffbeb',
            color: '#d97706',
            border: '1px solid #fde68a',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Learning (30)
        </button>

        <button
          onClick={() => setFilterType('mastered')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            background: '#ecfdf5',
            color: '#059669',
            border: '1px solid #a7f3d0',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Mastered (45)
        </button>

        <button className="btn-secondary" style={{ marginLeft: 'auto', gap: '6px' }}>
          <Shuffle size={14} />
          <span>Shuffle</span>
        </button>

        <button className="btn-secondary" style={{ gap: '6px' }}>
          <Filter size={14} />
          <span>Filter</span>
        </button>
      </div>

      {/* Main Grid: Big Center Flashcard + Right Sidebar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 340px',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left: Big Interactive Flashcard */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            className="ui-card"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              minHeight: '380px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: isFlipped ? 'var(--bg-subtle)' : 'var(--bg-card)',
              border: isFlipped ? '1.5px solid var(--primary)' : '1px solid var(--border)',
              boxShadow: isFlipped ? '0 0 20px rgba(23, 75, 255, 0.2)' : 'var(--shadow-md)',
              transition: 'all 0.3s ease'
            }}
          >
            {/* Top Bar of Card */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{
                padding: '4px 12px',
                borderRadius: '6px',
                background: 'rgba(23, 75, 255, 0.15)',
                color: 'var(--accent-ice)',
                border: '1px solid rgba(23, 75, 255, 0.3)',
                fontSize: '12px',
                fontWeight: '700'
              }}>
                {card.topic}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>
                  {currentIdx + 1} / 120
                </span>
                <Bookmark size={18} color="var(--text-muted)" />
              </div>
            </div>

            {/* Center Question / Answer text */}
            <div style={{ textAlign: 'center', padding: '30px 20px' }}>
              <div style={{
                fontSize: isFlipped ? '18px' : '24px',
                fontWeight: '800',
                color: 'var(--text-main)',
                lineHeight: 1.5,
                maxWidth: '650px',
                margin: '0 auto'
              }}>
                {isFlipped ? card.answer : card.question}
              </div>
            </div>

            {/* Bottom Flip Callout */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', color: '#6366f1', fontSize: '13px', fontWeight: '600' }}>
              <RotateCw size={15} />
              <span>{isFlipped ? 'Tap to see Question' : 'Click to flip'}</span>
            </div>
          </div>

          {/* Bottom Card Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={handlePrev}
              className="btn-secondary"
              style={{ padding: '10px 20px', minWidth: '120px' }}
            >
              ← Previous
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="btn-outline"
              style={{ padding: '10px 22px' }}
            >
              <RotateCw size={16} />
              <span>Flip Card</span>
            </button>

            <button
              onClick={handleNext}
              className="btn-primary"
              style={{ padding: '10px 24px', minWidth: '120px' }}
            >
              <span>Next</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Right Sidebar: Progress, Modes, Quick Card Actions, Topics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Flashcard Progress */}
          <div className="ui-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '16px' }}>
              Flashcard Progress
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
                    strokeDashoffset={175.9 * (1 - 0.38)}
                    strokeLinecap="round"
                    transform="rotate(-90 35 35)"
                  />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: '800' }}>
                  38%
                </div>
              </div>

              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>45 of 120 cards mastered</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '6px', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                    45 Mastered
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1' }} />
                    30 Learning
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8' }} />
                    45 Not Practiced
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Study Mode */}
          <div className="ui-card" style={{ padding: '18px' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '12px' }}>
              Study Mode
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '12px' }}>
              <div style={{ padding: '8px 4px', textAlign: 'center', borderRadius: '8px', background: 'var(--primary)', border: '1px solid var(--primary)', color: '#ffffff', fontSize: '11.5px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 0 10px var(--primary-glow)' }}>
                Learn
              </div>
              <div style={{ padding: '8px 4px', textAlign: 'center', borderRadius: '8px', background: 'var(--bg-subtle)', color: 'var(--text-secondary)', fontSize: '11.5px', cursor: 'pointer' }}>
                Quiz
              </div>
              <div style={{ padding: '8px 4px', textAlign: 'center', borderRadius: '8px', background: 'var(--bg-subtle)', color: 'var(--text-secondary)', fontSize: '11.5px', cursor: 'pointer' }}>
                Spaced Repetition
              </div>
              <div style={{ padding: '8px 4px', textAlign: 'center', borderRadius: '8px', background: 'var(--bg-subtle)', color: 'var(--text-secondary)', fontSize: '11.5px', cursor: 'pointer' }}>
                Custom
              </div>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Learn at your own pace. Flip through cards and mark your progress.
            </p>
          </div>

          {/* Card Actions (Mastered / Learning / Not Familiar) */}
          <div className="ui-card" style={{ padding: '18px' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '12px' }}>
              Card Actions
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={handleNext}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #a7f3d0',
                  background: '#ecfdf5',
                  color: '#059669',
                  fontSize: '12.5px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <Check size={16} />
                <span>Mark as Mastered</span>
              </button>

              <button
                onClick={handleNext}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #fde68a',
                  background: '#fffbeb',
                  color: '#d97706',
                  fontSize: '12.5px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <RotateCw size={15} />
                <span>Mark as Learning</span>
              </button>

              <button
                onClick={handleNext}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #fecaca',
                  background: '#fef2f2',
                  color: '#dc2626',
                  fontSize: '12.5px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <X size={15} />
                <span>Mark as Not Familiar</span>
              </button>
            </div>
          </div>

          {/* Topics in This Set */}
          <div className="ui-card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>Topics in This Set</span>
              <span style={{ fontSize: '11px', color: '#6366f1', fontWeight: '600' }}>View All →</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              {[
                { name: 'Array Basics', done: 12, total: 15 },
                { name: 'Traversal', done: 8, total: 15 },
                { name: 'Insertion & Deletion', done: 10, total: 15 },
                { name: 'Searching', done: 7, total: 15 },
                { name: 'Time Complexity', done: 5, total: 15 },
                { name: 'Applications', done: 3, total: 15 },
              ].map((tp) => (
                <div key={tp.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{tp.name}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{tp.done} / {tp.total}</span>
                  </div>
                  <div className="progress-track" style={{ height: '5px' }}>
                    <div className="progress-fill" style={{ width: `${(tp.done / tp.total) * 100}%` }} />
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
