import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Target,
  BarChart2,
  User,
  CheckCircle,
  PlayCircle,
  Lock,
  ChevronDown,
  ChevronUp,
  Download,
  Bot,
  FileQuestion,
  Check,
  Clock,
  FileText,
  Code,
  Volume2,
  Maximize2,
  Settings,
  Pause,
  Play
} from 'lucide-react';

export default function CourseOverview({ setActiveTab, selectedCourseId = 'dsa' }) {
  const [activeTabSub, setActiveTabSub] = useState('overview');
  const [activeLessonTab, setActiveLessonTab] = useState('details');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Accordion state
  const [openUnits, setOpenUnits] = useState({ u1: false, u2: true, u3: false, u4: false });

  const toggleUnit = (u) => {
    setOpenUnits((prev) => ({ ...prev, [u]: !prev[u] }));
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Back button */}
      <div>
        <button
          onClick={() => setActiveTab('courses')}
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
          <span>Back to My Courses</span>
        </button>
      </div>

      {/* Hero Banner Card */}
      <div className="ui-card" style={{ padding: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Thumbnail */}
        <div style={{
          width: '240px',
          height: '140px',
          borderRadius: '14px',
          overflow: 'hidden',
          background: '#0b1329',
          position: 'relative',
          flexShrink: 0
        }}>
          <img
            src="/assets/course_overview_banner.png"
            alt="Course Banner"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(99, 102, 241, 0.9)',
            color: 'white',
            fontSize: '11px',
            fontWeight: '700'
          }}>
            In Progress
          </div>
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            Data Structures and Algorithms
          </h1>
          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 1.5, maxWidth: '650px' }}>
            Learn fundamental to advanced data structures and algorithms with hands-on practice and real-world applications.
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            marginTop: '16px',
            fontSize: '13px',
            color: 'var(--text-secondary)'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={15} color="#6366f1" />
              Prof. R. Kumar
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BarChart2 size={15} color="#10b981" />
              Intermediate
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={15} color="#3b82f6" />
              24 Lessons
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Target size={15} color="#f97316" />
              6 Assessments
            </span>
          </div>
        </div>

        {/* Progress Donut & Continue Button */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Donut Circle */}
            <div style={{ position: 'relative', width: '65px', height: '65px' }}>
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
                65%
              </div>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>Course Progress</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>16 of 24 lessons completed</div>
            </div>
          </div>

          <button className="btn-primary" style={{ width: '100%' }}>
            <span>Continue Learning</span>
            <Play size={14} fill="white" />
          </button>
        </div>
      </div>

      {/* Course Sub Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '2px' }}>
        {[
          { id: 'overview', label: 'Overview', icon: BookOpen },
          { id: 'lessons', label: 'Lessons', icon: PlayCircle },
          { id: 'assessments', label: 'Assessments', icon: Target },
          { id: 'notes', label: 'Notes', icon: FileText },
          { id: 'resources', label: 'Resources', icon: Download },
          { id: 'discussions', label: 'Discussions', icon: Bot },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTabSub === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabSub(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                border: 'none',
                background: 'transparent',
                borderBottom: isActive ? '3px solid #4f46e5' : '3px solid transparent',
                color: isActive ? '#4f46e5' : 'var(--text-secondary)',
                fontWeight: isActive ? '700' : '500',
                fontSize: '13.5px',
                cursor: 'pointer'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3 Columns Layout: Course Content (Left) + Player & Details (Center) + Resources & Actions (Right) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '290px minmax(0, 1fr) 280px',
        gap: '20px',
        alignItems: 'start'
      }}>
        {/* Left Column: Course Content Accordion */}
        <div className="ui-card" style={{ padding: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '14px' }}>
            Course Content
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Unit 1 */}
            <div style={{ border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
              <div
                onClick={() => toggleUnit('u1')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  background: 'var(--bg-subtle)',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                <span>1. Introduction</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>3/3</span>
                  <CheckCircle size={15} color="#10b981" />
                </div>
              </div>
              {openUnits.u1 && (
                <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                    <span>1.1 What are Data Structures?</span>
                    <span>12 min</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                    <span>1.2 Why Learn DSA?</span>
                    <span>10 min</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                    <span>1.3 Time & Space Complexity</span>
                    <span>15 min</span>
                  </div>
                </div>
              )}
            </div>

            {/* Unit 2: Arrays (Open) */}
            <div style={{ border: '1px solid #c7d2fe', borderRadius: '10px', overflow: 'hidden' }}>
              <div
                onClick={() => toggleUnit('u2')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  background: '#eef2ff',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#4f46e5'
                }}
              >
                <span>2. Arrays</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '11px' }}>2/5</span>
                  {openUnits.u2 ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </div>

              {openUnits.u2 && (
                <div style={{ padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: '#ede9fe',
                    color: '#4f46e5',
                    fontSize: '12.5px',
                    fontWeight: '600'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <PlayCircle size={14} />
                      2.1 Introduction to Arrays
                    </span>
                    <span>14 min</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    fontSize: '12.5px',
                    color: 'var(--text-secondary)'
                  }}>
                    <span>2.2 Array Operations</span>
                    <span>18 min</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    fontSize: '12.5px',
                    color: 'var(--text-secondary)'
                  }}>
                    <span>2.3 Problems on Arrays</span>
                    <span>25 min</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    fontSize: '12.5px',
                    color: 'var(--text-disabled)'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Lock size={13} />
                      2.4 Two Pointers Technique
                    </span>
                    <span>20 min</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    fontSize: '12.5px',
                    color: 'var(--text-disabled)'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Lock size={13} />
                      2.5 Sliding Window
                    </span>
                    <span>22 min</span>
                  </div>
                </div>
              )}
            </div>

            {/* Other Units */}
            {['3. Linked Lists', '4. Stacks and Queues', '5. Trees', '6. Graphs'].map((unit, idx) => (
              <div
                key={unit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                <span>{unit}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>0/{idx + 5}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center Column: Video Player & Lesson Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Header Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)' }}>
              2.1 Introduction to Arrays
            </h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12.5px' }}>
                ← Previous
              </button>
              <button className="btn-primary" style={{ padding: '6px 14px', fontSize: '12.5px' }}>
                Next →
              </button>
            </div>
          </div>

          {/* Interactive Simulated Video Player Box */}
          <div style={{
            background: '#090d16',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            color: 'white',
            position: 'relative'
          }}>
            {/* Simulated Video Slide Frame */}
            <div style={{
              height: '340px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '30px 40px',
              background: 'radial-gradient(circle at 70% 50%, #1e293b 0%, #090d16 80%)',
              position: 'relative'
            }}>
              <div style={{ maxWidth: '360px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#f8fafc', marginBottom: '14px' }}>
                  Introduction to Arrays
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#cbd5e1' }}>
                  <li>• What is an Array?</li>
                  <li>• Types of Arrays</li>
                  <li>• Memory Representation</li>
                  <li>• Real-world Examples</li>
                </ul>
              </div>

              {/* Graphic Array Visual on Right */}
              <div style={{
                position: 'absolute',
                right: '40px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', gap: '4px', textAlign: 'center' }}>
                  {['10', '20', '30', '40', '50'].map((val, i) => (
                    <div key={i} style={{ width: '40px' }}>
                      <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>{i}</div>
                      <div style={{
                        padding: '10px 0',
                        background: '#1e293b',
                        border: '1px solid #4f46e5',
                        borderRadius: '6px',
                        fontWeight: '700',
                        color: 'white'
                      }}>
                        {val}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '10px', fontFamily: 'monospace' }}>
                  int[] arr = &#123;10, 20, 30, 40, 50&#125;;
                </div>
              </div>

              {/* Center Play Button Overlay */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(99, 102, 241, 0.9)',
                  border: 'none',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 0 25px rgba(99, 102, 241, 0.6)'
                }}
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '4px' }} fill="white" />}
              </button>
            </div>

            {/* Video Controls Bar */}
            <div style={{
              background: '#0f172a',
              padding: '10px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              borderTop: '1px solid #1e293b'
            }}>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} fill="white" />}
              </button>

              <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'monospace' }}>
                {isPlaying ? '03:14' : '0:00'} / 14:32
              </span>

              {/* Scrub line */}
              <div style={{ flex: 1, height: '4px', background: '#334155', borderRadius: '4px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: isPlaying ? '22%' : '0%', height: '100%', background: '#6366f1', borderRadius: '4px' }} />
              </div>

              <Volume2 size={16} color="#94a3b8" />
              <Settings size={16} color="#94a3b8" />
              <Maximize2 size={16} color="#94a3b8" />
            </div>
          </div>

          {/* Lesson Tabs */}
          <div className="ui-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
              {['Lesson Details', 'Transcript', 'AI Notes'].map((tab) => {
                const isActive = activeLessonTab === tab.toLowerCase().replace(' ', '');
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveLessonTab(tab.toLowerCase().replace(' ', ''))}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: isActive ? '#4f46e5' : 'var(--text-muted)',
                      fontWeight: isActive ? '700' : '500',
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      paddingBottom: '4px',
                      borderBottom: isActive ? '2px solid #4f46e5' : 'none'
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>
                About This Lesson
              </h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.6 }}>
                In this lesson, we will learn what an array is, its types, memory representation, and common operations.
                You'll also see real-world examples and a hands-on demonstration using Java.
              </p>

              <div style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: '12.5px',
                color: 'var(--text-secondary)'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={15} color="#6366f1" />
                  14 minutes
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={15} color="#3b82f6" />
                  PDF Notes
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Code size={15} color="#10b981" />
                  Code Examples
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <BarChart2 size={15} color="#f97316" />
                  Beginner Friendly
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Resources & Lesson Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Lesson Resources */}
          <div className="ui-card" style={{ padding: '18px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '14px' }}>
              Lesson Resources
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'Lecture Slides (PDF)', size: '2.4 MB' },
                { name: 'Code Examples (ZIP)', size: '156 KB' },
                { name: 'Additional Reading', size: '1.8 MB' },
                { name: 'Cheat Sheet', size: '980 KB' },
              ].map((res, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: 'var(--bg-subtle)'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-main)' }}>
                      {res.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{res.size}</div>
                  </div>
                  <button style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#6366f1',
                    cursor: 'pointer',
                    padding: '4px'
                  }}>
                    <Download size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Practice This Lesson */}
          <div className="ui-card" style={{ padding: '18px' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>
              Practice This Lesson
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
              Solve practice questions to strengthen your understanding.
            </p>
            <button
              onClick={() => setActiveTab('practice')}
              className="btn-outline"
              style={{ width: '100%', marginTop: '12px', padding: '8px', fontSize: '12.5px' }}
            >
              <FileQuestion size={15} />
              <span>Start Practice →</span>
            </button>
          </div>

          {/* Ask AI Tutor */}
          <div className="ui-card" style={{ padding: '18px' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>
              Ask AI Tutor
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
              Have doubts about this lesson? Ask our AI Tutor for instant help.
            </p>
            <button
              onClick={() => setActiveTab('aiTutor')}
              className="btn-outline"
              style={{ width: '100%', marginTop: '12px', padding: '8px', fontSize: '12.5px' }}
            >
              <Bot size={15} />
              <span>Ask a Question →</span>
            </button>
          </div>

          {/* Lesson Status Mark */}
          <button
            onClick={() => setIsCompleted(!isCompleted)}
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #10b981',
              background: isCompleted ? '#10b981' : '#ecfdf5',
              color: isCompleted ? 'white' : '#059669',
              fontWeight: '700',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <Check size={16} />
            <span>{isCompleted ? 'Completed!' : 'Mark as Complete'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
