import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  FileText,
  Copy,
  ArrowLeft,
  ArrowRight,
  PlusCircle,
  MinusCircle,
  Compass,
  Search as SearchIcon,
  Edit3,
  Layers,
  Download,
  ChevronRight,
  Eye
} from 'lucide-react';

export default function Notes({ setActiveTab }) {
  const [activeTabSub, setActiveTabSub] = useState('notes');
  const [selectedTopic, setSelectedTopic] = useState('overview');
  const [isRead, setIsRead] = useState(false);
  const [flippedCard, setFlippedCard] = useState(false);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Title */}
      <div>
        <h1 className="page-title">Notes & Flashcards</h1>
        <p className="page-subtitle">Read, create and revise your notes. Practice with flashcards to remember key concepts better.</p>
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

      {/* Tabs Row */}
      <div className="tabs-pill-row">
        {[
          { id: 'notes', label: 'Notes', icon: FileText },
          { id: 'flashcards', label: 'Flashcards', icon: Layers },
          { id: 'my-notes', label: 'My Notes', icon: Edit3 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTabSub === tab.id;
          return (
            <button
              key={tab.id}
              className={`tab-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => {
                setActiveTabSub(tab.id);
                if (tab.id === 'flashcards') setActiveTab('flashcards');
              }}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3 Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '260px minmax(0, 1fr) 300px',
        gap: '20px',
        alignItems: 'start'
      }}>
        {/* Left: Course Notes Tree */}
        <div className="ui-card" style={{ padding: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '12px' }}>
            Course Notes
          </h3>

          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search notes..."
              style={{
                width: '100%',
                padding: '6px 10px 6px 30px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: 'var(--bg-subtle)',
                fontSize: '12px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              <span>1. Introduction</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>3 notes</span>
            </div>

            {/* Array Operations (Expanded) */}
            <div style={{ background: 'var(--bg-subtle)', borderRadius: '8px', padding: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', fontWeight: '700', color: 'var(--text-main)' }}>
                <span>2. Array Operations</span>
                <span style={{ fontSize: '11px', color: '#6366f1' }}>5 notes</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                <div
                  onClick={() => setSelectedTopic('overview')}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '6px',
                    background: selectedTopic === 'overview' ? 'rgba(23, 75, 255, 0.18)' : 'transparent',
                    color: selectedTopic === 'overview' ? 'var(--accent-ice)' : 'var(--text-secondary)',
                    fontWeight: selectedTopic === 'overview' ? '700' : '500',
                    border: selectedTopic === 'overview' ? '1px solid rgba(23, 75, 255, 0.3)' : '1px solid transparent',
                    cursor: 'pointer'
                  }}
                >
                  Overview and Basics
                </div>
                <div style={{ padding: '6px 10px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  Insertion and Deletion
                </div>
                <div style={{ padding: '6px 10px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  Traversal Techniques
                </div>
                <div style={{ padding: '6px 10px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  Searching in Arrays
                </div>
                <div style={{ padding: '6px 10px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  Practice Problems
                </div>
              </div>
            </div>

            {['3. Two Pointers', '4. Sliding Window', '5. Sorting Algorithms', '6. Searching Algorithms', '7. Recursion'].map((sec, i) => (
              <div key={sec} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <span>{sec}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{4 + (i % 3)} notes</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Note Reader */}
        <div className="ui-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)' }}>
              Array Operations - Overview and Basics
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => setIsRead(!isRead)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: isRead ? '1px solid #10b981' : '1px solid var(--border)',
                  background: isRead ? '#ecfdf5' : 'var(--bg-subtle)',
                  color: isRead ? '#059669' : 'var(--text-secondary)',
                  fontSize: '12px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <CheckCircle size={14} />
                <span>{isRead ? 'Read' : 'Mark as Read'}</span>
              </button>

              <MoreVertical size={16} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            </div>
          </div>

          {/* Badges */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ padding: '3px 10px', borderRadius: '4px', background: 'var(--primary-soft)', color: 'var(--primary)', border: '1px solid rgba(23, 75, 255, 0.25)', fontSize: '11px', fontWeight: '700' }}>
              Arrays
            </span>
            <span style={{ padding: '3px 10px', borderRadius: '4px', background: 'var(--primary-soft)', color: 'var(--primary)', fontSize: '11px', fontWeight: '700' }}>
              Basics
            </span>
            <span style={{ padding: '3px 10px', borderRadius: '4px', background: 'var(--bg-subtle)', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '600' }}>
              Data Structures
            </span>
            <span style={{ padding: '3px 10px', borderRadius: '4px', background: 'var(--danger-soft)', color: 'var(--danger)', fontSize: '11px', fontWeight: '700' }}>
              Unit 1
            </span>
          </div>

          {/* Note content */}
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '8px' }}>
              What is an Array?
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              An array is a linear data structure that stores a fixed number of elements of the same data type in contiguous memory locations. Each element is accessed using an index, starting from 0.
            </p>
          </div>

          {/* Code snippet */}
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            lineHeight: 1.6,
            color: 'var(--text-main)',
            position: 'relative'
          }}>
            int[] arr = &#123;1, 2, 3, 4, 5&#125;;<br />
            System.out.println(arr[0]);&nbsp;&nbsp;// Output: 1<br />
            System.out.println(arr[3]);&nbsp;&nbsp;// Output: 4
            <Copy size={14} color="var(--text-muted)" style={{ position: 'absolute', top: '14px', right: '14px', cursor: 'pointer' }} />
          </div>

          {/* Key points */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '10px' }}>
              Key Points
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1' }} />
                <span>Arrays store elements of the same data type.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1' }} />
                <span>Indexing starts from 0.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1' }} />
                <span>The size of an array is fixed.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1' }} />
                <span>Elements can be accessed in O(1) time using the index.</span>
              </div>
            </div>
          </div>

          {/* Types of Array Operations */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '12px' }}>
              Types of Array Operations
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px'
            }}>
              <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--bg-subtle)', textAlign: 'center' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto' }}>
                  <PlusCircle size={18} />
                </div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>Insertion</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Add elements at a specific position</div>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--bg-subtle)', textAlign: 'center' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--danger-soft)', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto' }}>
                  <MinusCircle size={18} />
                </div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>Deletion</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Remove elements from a specific position</div>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--bg-subtle)', textAlign: 'center' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-soft)', color: 'var(--primary)', border: '1px solid rgba(23, 75, 255, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto' }}>
                  <Compass size={18} />
                </div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>Traversal</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Access all elements one by one</div>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--bg-subtle)', textAlign: 'center' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--warning-soft)', color: 'var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto' }}>
                  <SearchIcon size={18} />
                </div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>Searching</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Find an element in the array</div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            <button className="btn-secondary">
              <ArrowLeft size={15} />
              <span>Previous Note</span>
            </button>
            <button className="btn-primary">
              <span>Next Note</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Right: Study Progress, Actions, Flashcard Preview, Recent Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Study Progress */}
          <div className="ui-card" style={{ padding: '18px' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '14px' }}>
              Study Progress
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ position: 'relative', width: '65px', height: '65px', flexShrink: 0 }}>
                <svg width="65" height="65" viewBox="0 0 65 65">
                  <circle cx="32.5" cy="32.5" r="28" fill="none" stroke="var(--border)" strokeWidth="6" />
                  <circle
                    cx="32.5"
                    cy="32.5"
                    r="28"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="6"
                    strokeDasharray="175.9"
                    strokeDashoffset={175.9 * (1 - 0.65)}
                    strokeLinecap="round"
                    transform="rotate(-90 32.5 32.5)"
                  />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '800' }}>
                  65%
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12.5px', fontWeight: '700' }}>24 of 37 topics completed</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                  <span>● 22 Notes Read</span>
                  <span>● 8 Flashcards Practiced</span>
                  <span>● 15 Notes to Read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="ui-card" style={{ padding: '16px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '12px' }}>
              Quick Actions
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <button className="btn-secondary" style={{ padding: '10px 4px', flexDirection: 'column', fontSize: '11px', gap: '4px' }}>
                <Edit3 size={15} color="#6366f1" />
                <span>Take Notes</span>
              </button>
              <button
                onClick={() => setActiveTab('flashcards')}
                className="btn-secondary"
                style={{ padding: '10px 4px', flexDirection: 'column', fontSize: '11px', gap: '4px' }}
              >
                <Layers size={15} color="#3b82f6" />
                <span>Flashcards</span>
              </button>
              <button className="btn-secondary" style={{ padding: '10px 4px', flexDirection: 'column', fontSize: '11px', gap: '4px' }}>
                <Download size={15} color="#10b981" />
                <span>PDF</span>
              </button>
            </div>
          </div>

          {/* Related Flashcards Widget */}
          <div className="ui-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>Related Flashcards</span>
              <span onClick={() => setActiveTab('flashcards')} style={{ fontSize: '11px', color: '#6366f1', fontWeight: '600', cursor: 'pointer' }}>
                View All →
              </span>
            </div>

            <div
              onClick={() => setFlippedCard(!flippedCard)}
              style={{
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '18px 14px',
                textAlign: 'center',
                cursor: 'pointer',
                background: flippedCard ? 'rgba(23, 75, 255, 0.15)' : 'var(--bg-subtle)',
                border: flippedCard ? '1px solid rgba(23, 75, 255, 0.4)' : '1px solid var(--border)',
                minHeight: '120px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: flippedCard ? '0 0 15px rgba(23, 75, 255, 0.2)' : 'none'
              }}
            >
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>1 / 8</div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', lineHeight: 1.4 }}>
                {flippedCard ? 'Answer: 0 (Zero-indexed array element in Java/C++)' : 'What is the index of the first element in an array?'}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--accent-ice)', marginTop: '10px' }}>
                {flippedCard ? '✓ Tap to flip back' : '👆 Tap to reveal answer'}
              </div>
            </div>
          </div>

          {/* Recent Notes */}
          <div className="ui-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>Recent Notes</span>
              <span style={{ fontSize: '11px', color: 'var(--accent-ice)', fontWeight: '600', cursor: 'pointer' }}>View All →</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              {[
                { title: 'Array Operations - Overview and Basics', date: 'Oct 10, 2026' },
                { title: 'Two Pointers - Concept and Examples', date: 'Oct 9, 2026' },
                { title: 'Recursion - Introduction', date: 'Oct 8, 2026' },
                { title: 'Sorting Algorithms - Quick Sort', date: 'Oct 7, 2026' },
              ].map((n, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={14} color="#6366f1" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{n.title}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{n.date}</div>
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
