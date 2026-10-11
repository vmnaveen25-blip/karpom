import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  Target,
  BarChart2,
  ArrowRight,
  MoreVertical,
  Calendar,
  Clock,
  Sparkles,
  FileQuestion,
  Upload,
  Flame,
  Check,
  ChevronRight,
  BookMarked,
  Layers,
  FileText
} from 'lucide-react';

export default function Home({ studentData, setActiveTab, setSelectedCourse }) {
  const { profile, courses, schedule } = studentData;

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 340px',
        gap: '24px',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            Good evening, {profile.name.split(' ')[0]}! 👋
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Keep learning. You’re doing great!
          </p>
        </div>

        {/* Right Quote Card with soft purple gradient banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(238, 242, 255, 0.8) 0%, rgba(224, 231, 255, 0.6) 100%)',
          border: '1px solid #c7d2fe',
          borderRadius: 'var(--radius-lg)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            fontSize: '32px',
            lineHeight: 1,
            color: '#6366f1',
            fontFamily: 'serif',
            opacity: 0.8
          }}>
            “
          </div>
          <div style={{
            fontSize: '13px',
            fontWeight: '600',
            color: '#3730a3',
            lineHeight: 1.4
          }}>
            “Consistency today builds expertise tomorrow.”
          </div>
          <div style={{
            position: 'absolute',
            right: '-10px',
            top: '-10px',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            borderRadius: '50%'
          }} />
        </div>
      </div>

      {/* 4 Stat Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '16px'
      }}>
        {/* Enrolled Courses */}
        <div className="ui-card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: '#eef2ff',
            color: '#6366f1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BookOpen size={22} />
          </div>
          <div>
            <div style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-main)', lineHeight: 1 }}>
              {profile.enrolledCoursesCount}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: '500' }}>
              Enrolled Courses
            </div>
          </div>
        </div>

        {/* Completed Lessons */}
        <div className="ui-card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: '#ecfdf5',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-main)', lineHeight: 1 }}>
              {profile.completedLessonsCount}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: '500' }}>
              Completed Lessons
            </div>
          </div>
        </div>

        {/* Pending Assessments */}
        <div className="ui-card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: '#fff7ed',
            color: '#f97316',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Target size={22} />
          </div>
          <div>
            <div style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-main)', lineHeight: 1 }}>
              {profile.pendingAssessmentsCount}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: '500' }}>
              Pending Assessments
            </div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="ui-card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: '#eff6ff',
            color: '#3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BarChart2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-main)', lineHeight: 1 }}>
              {profile.overallProgress}%
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: '500' }}>
              Overall Progress
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Big Column + Right Sidebar Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 340px',
        gap: '24px'
      }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
          {/* Continue Learning */}
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '14px' }}>
              Continue Learning
            </h2>
            <div className="ui-card" style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                width: '120px',
                height: '75px',
                borderRadius: '12px',
                overflow: 'hidden',
                flexShrink: 0,
                background: '#0b1329'
              }}>
                <img
                  src="/assets/continue_dsa.png"
                  alt="DSA Continue Learning"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ flex: 1, minWidth: '220px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)' }}>
                  Data Structures and Algorithms
                </h3>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Arrays • In Progress
                </div>
                {/* Progress bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
                  <div className="progress-track" style={{ flex: 1, height: '7px' }}>
                    <div className="progress-fill" style={{ width: '65%' }} />
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>65%</span>
                </div>
              </div>

              <button
                className="btn-primary"
                onClick={() => {
                  setSelectedCourse('dsa');
                  setActiveTab('courseDetail');
                }}
                style={{ padding: '12px 22px' }}
              >
                <span>Continue Learning</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* My Courses Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)' }}>
                My Courses
              </h2>
              <button
                onClick={() => setActiveTab('courses')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'transparent',
                  border: 'none',
                  color: '#4f46e5',
                  fontSize: '13.5px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <span>View All</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Courses 3 Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px'
            }}>
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="ui-card"
                  style={{
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onClick={() => {
                    setSelectedCourse(course.id);
                    setActiveTab('courseDetail');
                  }}
                >
                  <div style={{ position: 'relative', height: '115px', background: '#0b1329', overflow: 'hidden' }}>
                    <img
                      src={course.image}
                      alt={course.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
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

                  <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)', lineHeight: 1.3 }}>
                      {course.title}
                    </h4>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {course.instructor}
                    </p>

                    <div style={{ marginTop: 'auto', paddingTop: '14px' }}>
                      <div className="progress-track" style={{ height: '6px' }}>
                        <div
                          className={`progress-fill ${course.progress === 100 ? 'green' : ''}`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)' }}>
                          {course.progress}%
                        </span>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '10px',
                        fontSize: '12px',
                        color: 'var(--text-muted)'
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <BookOpen size={14} />
                          {course.totalLessons} Lessons
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Target size={14} />
                          {course.assessmentsCount} Assessments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended For You Section */}
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '14px' }}>
              Recommended for You
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px'
            }}>
              {/* Review Weak Topics */}
              <div
                className="ui-card"
                onClick={() => setActiveTab('practice')}
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: '#eef2ff',
                  color: '#6366f1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <BookOpen size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>
                    Review Weak Topics
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Based on recent quizzes
                  </div>
                </div>
                <ArrowRight size={15} color="#6366f1" style={{ alignSelf: 'flex-end' }} />
              </div>

              {/* AI Generated Notes */}
              <div
                className="ui-card"
                onClick={() => setActiveTab('notes')}
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: '#eff6ff',
                  color: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <FileText size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>
                    AI Generated Notes
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    From your materials
                  </div>
                </div>
                <ArrowRight size={15} color="#3b82f6" style={{ alignSelf: 'flex-end' }} />
              </div>

              {/* Mock Test */}
              <div
                className="ui-card"
                onClick={() => setActiveTab('assessments')}
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: '#fef2f2',
                  color: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Target size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>
                    Mock Test
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Full length practice
                  </div>
                </div>
                <ArrowRight size={15} color="#ef4444" style={{ alignSelf: 'flex-end' }} />
              </div>

              {/* Learning Plan */}
              <div
                className="ui-card"
                onClick={() => setActiveTab('progress')}
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: '#ecfdf5',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <BarChart2 size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>
                    Learning Plan
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Personalized for you
                  </div>
                </div>
                <ArrowRight size={15} color="#10b981" style={{ alignSelf: 'flex-end' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Today's Schedule Card */}
          <div className="ui-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>
                Today's Schedule
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                <span>Tue, 15 Sep 2026</span>
                <Calendar size={14} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {schedule.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: item.status === 'Ongoing' ? '#6366f1' : 'transparent',
                      border: item.status === 'Ongoing' ? 'none' : '2px solid #cbd5e1'
                    }} />
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.time}</div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)', marginTop: '1px' }}>
                        {item.title}
                      </div>
                    </div>
                  </div>

                  <span style={{
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    background: item.status === 'Ongoing' ? '#ede9fe' : 'var(--bg-subtle)',
                    color: item.status === 'Ongoing' ? '#6366f1' : 'var(--text-muted)'
                  }}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="ui-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '16px' }}>
              Quick Actions
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {/* Ask AI Tutor */}
              <button
                onClick={() => setActiveTab('aiTutor')}
                className="btn-secondary"
                style={{
                  padding: '14px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  textAlign: 'center',
                  borderRadius: '12px'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#6366f1',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Sparkles size={18} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-main)' }}>Ask AI Tutor</span>
              </button>

              {/* Practice Questions */}
              <button
                onClick={() => setActiveTab('practice')}
                className="btn-secondary"
                style={{
                  padding: '14px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  textAlign: 'center',
                  borderRadius: '12px'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#3b82f6',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileQuestion size={18} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-main)' }}>Practice Questions</span>
              </button>

              {/* Upload Notes */}
              <button
                onClick={() => setActiveTab('notes')}
                className="btn-secondary"
                style={{
                  padding: '14px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  textAlign: 'center',
                  borderRadius: '12px'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#10b981',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Upload size={18} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-main)' }}>Upload Notes</span>
              </button>

              {/* Take Mock Test */}
              <button
                onClick={() => setActiveTab('assessments')}
                className="btn-secondary"
                style={{
                  padding: '14px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  textAlign: 'center',
                  borderRadius: '12px'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#f97316',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Target size={18} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-main)' }}>Take Mock Test</span>
              </button>
            </div>
          </div>

          {/* Learning Streak Card */}
          <div className="ui-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                  Learning Streak
                </div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', marginTop: '2px' }}>
                  {profile.streakDays} days
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Keep it up! <Flame size={15} color="#f97316" />
                </div>
              </div>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#fff7ed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Flame size={26} color="#f97316" />
              </div>
            </div>

            {/* Streak days circles */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '18px',
              paddingTop: '14px',
              borderTop: '1px solid var(--border)'
            }}>
              {[
                { day: 'Mon', checked: true },
                { day: 'Tue', checked: true },
                { day: 'Wed', checked: true },
                { day: 'Thu', checked: true },
                { day: 'Fri', checked: true },
                { day: 'Sat', checked: false },
                { day: 'Sun', checked: false },
              ].map((item) => (
                <div key={item.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: item.checked ? '#6366f1' : 'transparent',
                    border: item.checked ? 'none' : '2px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    {item.checked && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
