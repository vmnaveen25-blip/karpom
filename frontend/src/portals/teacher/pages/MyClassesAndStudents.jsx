import React, { useState, useMemo } from 'react';
import {
  Users,
  BookOpen,
  Search,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Building2,
  ExternalLink,
  Plus,
  MoreVertical,
  Mail,
  CheckCircle2,
  AlertTriangle,
  X,
  Layers,
  Database,
  Cpu,
  Coffee,
  Code2,
  Settings,
  ChevronLeft
} from 'lucide-react';

export default function MyClassesAndStudents({ teacherData, setActiveTab }) {
  // Navigation level: 'courses' | 'classes' | 'students'
  const [viewLevel, setViewLevel] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(teacherData.courses?.[0] || null);
  const [selectedClass, setSelectedClass] = useState(teacherData.classes?.[0] || null);

  // Filters & Search
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [termFilter, setTermFilter] = useState('Fall 2026');
  const [courseSearch, setCourseSearch] = useState('');
  const [classSearch, setClassSearch] = useState('');
  const [studentSearch, setStudentSearch] = useState('');
  const [activeSubTab, setActiveSubTab] = useState('students');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Student Profile Drawer / Modal
  const [inspectedStudent, setInspectedStudent] = useState(null);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', rollNo: '', email: '' });

  // Get course list
  const coursesList = useMemo(() => {
    return teacherData.courses || [];
  }, [teacherData.courses]);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return coursesList.filter((course) => {
      const matchSearch =
        course.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
        course.code.toLowerCase().includes(courseSearch.toLowerCase()) ||
        (course.subtitle && course.subtitle.toLowerCase().includes(courseSearch.toLowerCase()));
      return matchSearch;
    });
  }, [coursesList, courseSearch]);

  // Classes for current selected course
  const courseClasses = useMemo(() => {
    if (!selectedCourse) return [];
    const all = teacherData.classes || [];
    const matching = all.filter((cls) => cls.courseId === selectedCourse.id || cls.courseCode === selectedCourse.code);
    return matching.filter((cls) => {
      if (!classSearch) return true;
      return (
        cls.department.toLowerCase().includes(classSearch.toLowerCase()) ||
        cls.section.toLowerCase().includes(classSearch.toLowerCase()) ||
        (cls.deptBadge && cls.deptBadge.toLowerCase().includes(classSearch.toLowerCase()))
      );
    });
  }, [teacherData.classes, selectedCourse, classSearch]);

  // Students in selected class
  const classStudents = useMemo(() => {
    if (!selectedClass || !selectedClass.students) return [];
    return selectedClass.students.filter((st) => {
      if (!studentSearch) return true;
      return (
        st.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        st.rollNo.toLowerCase().includes(studentSearch.toLowerCase()) ||
        st.email.toLowerCase().includes(studentSearch.toLowerCase())
      );
    });
  }, [selectedClass, studentSearch]);

  // Pagination for students
  const totalStudentsCount = classStudents.length || selectedClass?.totalStudents || 42;
  const totalPages = Math.ceil(totalStudentsCount / pageSize) || 1;
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return classStudents.slice(start, start + pageSize);
  }, [classStudents, currentPage]);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    const cls = (teacherData.classes || []).find((c) => c.courseId === course.id || c.courseCode === course.code);
    if (cls) setSelectedClass(cls);
    setClassSearch('');
    setViewLevel('classes');
  };

  const handleSelectClass = (cls) => {
    setSelectedClass(cls);
    setCurrentPage(1);
    setStudentSearch('');
    setActiveSubTab('students');
    setViewLevel('students');
  };

  const renderCourseIcon = (course) => {
    const code = course.code || course.id || '';
    const title = course.title || '';
    
    if (code.includes('301') || title.includes('Java')) {
      return (
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          background: 'var(--danger-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--danger)',
          flexShrink: 0
        }}>
          <Coffee size={28} />
        </div>
      );
    }
    if (code.includes('302') || title.includes('Python')) {
      return (
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          background: '#eff6ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#2563eb',
          flexShrink: 0
        }}>
          <Code2 size={28} />
        </div>
      );
    }
    if (code.includes('303') || title.includes('Software')) {
      return (
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          background: '#eff6ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#3b82f6',
          flexShrink: 0
        }}>
          <Settings size={28} />
        </div>
      );
    }
    if (code.includes('304') || title.includes('Database')) {
      return (
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          background: '#ecfdf5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#10b981',
          flexShrink: 0
        }}>
          <Database size={28} />
        </div>
      );
    }
    return (
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '14px',
        background: 'rgba(236, 72, 153, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ec4899',
        flexShrink: 0
      }}>
        <Cpu size={28} />
      </div>
    );
  };

  const getDeptBadgeStyle = (dept) => {
    const d = (dept || '').toUpperCase();
    if (d.includes('CSE')) {
      return { bg: 'rgba(23, 75, 255, 0.16)', text: 'var(--accent-ice)', label: 'CSE' };
    }
    if (d.includes('IT')) {
      return { bg: 'rgba(56, 189, 248, 0.15)', text: '#38bdf8', label: 'IT' };
    }
    if (d.includes('AI')) {
      return { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981', label: 'AI' };
    }
    if (d.includes('ECE')) {
      return { bg: 'rgba(245, 158, 11, 0.15)', text: '#f59e0b', label: 'ECE' };
    }
    return { bg: 'var(--bg-subtle)', text: 'var(--text-secondary)', label: dept || 'GEN' };
  };

  return (
    <div style={{ width: '100%', maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* ========================================================
          LEVEL 1: MY COURSES LIST VIEW (Reference: My Cources.png)
         ======================================================== */}
      {viewLevel === 'courses' && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Main Page Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
                My Classes & Students
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
                Your courses and the classes learning each course across departments.
              </p>
            </div>

            {/* Top Right Dropdowns */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '13.5px',
                fontWeight: '500',
                color: 'var(--text-main)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <span>{deptFilter}</span>
                <ChevronDown size={15} style={{ marginLeft: '8px', color: 'var(--text-muted)' }} />
              </div>

              <div style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '13.5px',
                fontWeight: '500',
                color: 'var(--text-main)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <span>{termFilter}</span>
                <ChevronDown size={15} style={{ marginLeft: '8px', color: 'var(--text-muted)' }} />
              </div>
            </div>
          </div>

          {/* Subheader: My Courses + Search Input */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
              My Courses
            </h2>

            <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search courses..."
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 38px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-input)',
                  fontSize: '13.5px',
                  color: 'var(--text-main)',
                  outline: 'none',
                  transition: 'border-color 0.15s ease'
                }}
              />
            </div>
          </div>

          {/* Courses List - Horizontal Cards Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredCourses.map((course) => {
              const classesCount = course.classesCount || 4;
              const deptsCount = course.departmentsCount || 3;
              const subtitleText = course.subtitle || `${course.code} • ${course.description?.slice(0, 75)}...`;

              return (
                <div
                  key={course.id}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-xs)',
                    transition: 'all 0.18s ease',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(143, 174, 255, 0.35)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(23, 75, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
                  }}
                >
                  {/* Left: Icon & Title & Code/Description */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px', minWidth: '280px', flex: '1 1 340px' }}>
                    {renderCourseIcon(course)}
                    <div>
                      <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                        {course.title}
                      </h3>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                        {subtitleText}
                      </p>
                    </div>
                  </div>

                  {/* Right: Classes & Depts Count + View Classes Button */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '36px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: 'rgba(23, 75, 255, 0.16)',
                        color: 'var(--accent-ice)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Users size={19} />
                      </div>
                      <div>
                        <div style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--text-main)' }}>
                          {classesCount} Classes
                        </div>
                        <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                          Across {deptsCount} Departments
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectCourse(course)}
                      style={{
                        background: 'rgba(23, 75, 255, 0.16)',
                        color: 'var(--accent-ice)',
                        border: '1px solid rgba(23, 75, 255, 0.35)',
                        borderRadius: '9999px',
                        padding: '10px 20px',
                        fontSize: '13.5px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--primary)';
                        e.currentTarget.style.color = '#FFFFFF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(23, 75, 255, 0.16)';
                        e.currentTarget.style.color = 'var(--accent-ice)';
                      }}
                    >
                      <span>View Classes</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          LEVEL 2: MY CLASSES VIEW (Reference: My Classes.png)
         ======================================================== */}
      {viewLevel === 'classes' && selectedCourse && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
            <span
              onClick={() => setViewLevel('courses')}
              style={{ cursor: 'pointer', color: 'var(--text-muted)', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-ice)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              Home
            </span>
            <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
            <span
              onClick={() => setViewLevel('courses')}
              style={{ cursor: 'pointer', color: 'var(--text-muted)', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-ice)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              My Classes & Students
            </span>
            <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>
              {selectedCourse.title}
            </span>
          </div>

          {/* Hero Card */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '24px 28px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            {/* Left: Icon, Title, Subtitle, Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: '1 1 450px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                {renderCourseIcon(selectedCourse)}
                <div>
                  <h1 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                    {selectedCourse.title}
                  </h1>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', margin: 0 }}>
                    {selectedCourse.subtitle || `${selectedCourse.code} • Object-oriented programming, concurrency, and JVM internals`}
                  </p>
                </div>
              </div>

              {/* Badges Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(23, 75, 255, 0.16)',
                  color: 'var(--accent-ice)',
                  border: '1px solid rgba(23, 75, 255, 0.35)',
                  borderRadius: '9999px',
                  padding: '4px 12px',
                  fontSize: '12.5px',
                  fontWeight: '600'
                }}>
                  <Users size={14} />
                  <span>{selectedCourse.classesCount || courseClasses.length || 4} Classes</span>
                </span>

                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--bg-subtle)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '9999px',
                  padding: '4px 12px',
                  fontSize: '12.5px',
                  fontWeight: '500'
                }}>
                  <Building2 size={14} />
                  <span>Departments</span>
                </span>

                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--bg-subtle)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '9999px',
                  padding: '4px 12px',
                  fontSize: '12.5px',
                  fontWeight: '500'
                }}>
                  <Calendar size={14} />
                  <span>{selectedCourse.term || 'Fall 2026'}</span>
                </span>

                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--bg-subtle)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '9999px',
                  padding: '4px 12px',
                  fontSize: '12.5px',
                  fontWeight: '500'
                }}>
                  <BookOpen size={14} />
                  <span>{selectedCourse.courseTypeBadge || 'Theory + Lab'}</span>
                </span>
              </div>
            </div>

            {/* Right: View Course Details Button */}
            <div>
              <button
                onClick={() => {
                  if (setActiveTab) setActiveTab('curriculum');
                }}
                style={{
                  background: 'var(--glass-surface)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '9px 18px',
                  fontSize: '13.5px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: 'var(--shadow-xs)',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(143, 174, 255, 0.4)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.10)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.background = 'var(--glass-surface)';
                }}
              >
                <span>View Course Details</span>
                <ExternalLink size={15} style={{ color: 'var(--text-muted)' }} />
              </button>
            </div>
          </div>

          {/* Subheader: Classes using this course + Search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 2px 0' }}>
                Classes using this course
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                This course is offered to {courseClasses.length || 4} classes across 3 departments.
              </p>
            </div>

            <div style={{ position: 'relative', width: '300px', maxWidth: '100%' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search classes..."
                value={classSearch}
                onChange={(e) => setClassSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-input)',
                  fontSize: '13px',
                  color: 'var(--text-main)',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Classes Table */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', width: '50px' }}>#</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Department</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Year</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Section</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Academic Term</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Students</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Teacher(s)</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courseClasses.map((cls, idx) => {
                    const deptBadge = getDeptBadgeStyle(cls.deptBadge || cls.department);
                    return (
                      <tr
                        key={cls.id || idx}
                        style={{ borderBottom: idx < courseClasses.length - 1 ? '1px solid var(--border-subtle)' : 'none', transition: 'background-color 0.1s ease' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <td style={{ padding: '16px 20px', fontSize: '13.5px', color: 'var(--text-muted)', fontWeight: '500' }}>
                          {idx + 1}
                        </td>

                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{
                              background: deptBadge.bg,
                              color: deptBadge.text,
                              borderRadius: '6px',
                              padding: '3px 8px',
                              fontSize: '11.5px',
                              fontWeight: '700',
                              letterSpacing: '0.02em'
                            }}>
                              {deptBadge.label}
                            </span>
                            <span style={{ fontSize: '13.5px', fontWeight: '500', color: 'var(--text-main)' }}>
                              {cls.department}
                            </span>
                          </div>
                        </td>

                        <td style={{ padding: '16px 20px', fontSize: '13.5px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                          {cls.year || 'III Year'}
                        </td>

                        <td style={{ padding: '16px 20px', fontSize: '13.5px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                          {cls.section}
                        </td>

                        <td style={{ padding: '16px 20px', fontSize: '13.5px', color: 'var(--text-muted)' }}>
                          {cls.academicTerm || cls.term || 'Fall 2026'}
                        </td>

                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', fontWeight: '600', color: 'var(--text-main)' }}>
                            <Users size={14} style={{ color: 'var(--text-muted)' }} />
                            <span>{cls.totalStudents || cls.students?.length || 40}</span>
                          </div>
                        </td>

                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              background: 'var(--primary)',
                              color: '#ffffff',
                              fontSize: '11px',
                              fontWeight: '700',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              {cls.teacherInitials || 'VV'}
                            </div>
                            <span style={{ fontSize: '13.5px', fontWeight: '500', color: 'var(--text-main)' }}>
                              {cls.teacher || 'Vijay Vikas'}
                            </span>
                          </div>
                        </td>

                        <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                          <button
                            onClick={() => handleSelectClass(cls)}
                            style={{
                              background: 'rgba(23, 75, 255, 0.16)',
                              color: 'var(--accent-ice)',
                              border: '1px solid rgba(23, 75, 255, 0.35)',
                              borderRadius: '9999px',
                              padding: '7px 16px',
                              fontSize: '13px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'var(--primary)';
                              e.currentTarget.style.color = '#FFFFFF';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(23, 75, 255, 0.16)';
                              e.currentTarget.style.color = 'var(--accent-ice)';
                            }}
                          >
                            <span>View Students</span>
                            <ArrowRight size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          LEVEL 3: MY STUDENTS VIEW (Reference: My Students.png)
         ======================================================== */}
      {viewLevel === 'students' && selectedCourse && selectedClass && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
            <span
              onClick={() => setViewLevel('courses')}
              style={{ cursor: 'pointer', color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-ice)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              Home
            </span>
            <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
            <span
              onClick={() => setViewLevel('courses')}
              style={{ cursor: 'pointer', color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-ice)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              My Classes & Students
            </span>
            <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
            <span
              onClick={() => setViewLevel('classes')}
              style={{ cursor: 'pointer', color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-ice)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {selectedCourse.title}
            </span>
            <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
            <span style={{ color: 'var(--text-muted)' }}>
              {selectedClass.deptBadge || 'CSE'} - {selectedClass.year || 'III Year'} - {selectedClass.section || 'Section A'}
            </span>
            <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>
              Students
            </span>
          </div>

          {/* Hero Card with Section Pills */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '22px 26px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            backdropFilter: 'blur(16px)'
          }}>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                {selectedCourse.title}
              </h1>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', margin: 0 }}>
                {selectedCourse.subtitle || `${selectedCourse.code} • Object-oriented programming, concurrency, and JVM internals`}
              </p>
            </div>

            {/* Badges Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{
                background: 'rgba(23, 75, 255, 0.15)',
                color: 'var(--accent-ice)',
                border: '1px solid rgba(23, 75, 255, 0.3)',
                borderRadius: '9999px',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: '700'
              }}>
                {selectedClass.deptBadge || 'CSE'}
              </span>

              <span style={{
                background: 'var(--bg-subtle)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
                borderRadius: '9999px',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {selectedClass.year || 'III Year'}
              </span>

              <span style={{
                background: 'var(--bg-subtle)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
                borderRadius: '9999px',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {selectedClass.section || 'Section A'}
              </span>

              <span style={{
                background: 'var(--bg-subtle)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
                borderRadius: '9999px',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {selectedClass.academicTerm || selectedClass.term || 'Fall 2026'}
              </span>

              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(23, 75, 255, 0.12)',
                color: 'var(--accent-ice)',
                border: '1px solid rgba(23, 75, 255, 0.25)',
                borderRadius: '9999px',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                <Users size={13} />
                <span>{selectedClass.totalStudents || selectedClass.students?.length || 42} Students</span>
              </span>
            </div>
          </div>

          {/* Sub-tabs Navigation Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '0px',
            marginTop: '4px'
          }}>
            {[
              { id: 'students', label: 'Students' },
              { id: 'assignments', label: 'Assignments' },
              { id: 'assessments', label: 'Assessments' },
              { id: 'schedule', label: 'Schedule' },
              { id: 'announcements', label: 'Announcements' }
            ].map((tab) => {
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSubTab(tab.id);
                    if (tab.id === 'assignments' && setActiveTab) setActiveTab('assignmentsAssessments');
                    if (tab.id === 'assessments' && setActiveTab) setActiveTab('assignmentsAssessments');
                    if (tab.id === 'schedule' && setActiveTab) setActiveTab('academicCalendar');
                    if (tab.id === 'announcements' && setActiveTab) setActiveTab('teacherCommunication');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '10px 4px',
                    fontSize: '14px',
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? 'var(--accent-ice)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-main)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  {tab.label}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      bottom: '-1px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--primary)',
                      boxShadow: '0 0 10px var(--primary-glow)',
                      borderRadius: '2px'
                    }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Subheader: Students (42) + Search + Add Student Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 2px 0' }}>
                Students ({selectedClass.totalStudents || selectedClass.students?.length || 42})
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                List of all students enrolled in this class section.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative', width: '280px', maxWidth: '100%' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={studentSearch}
                  onChange={(e) => {
                    setStudentSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-subtle)',
                    fontSize: '13px',
                    color: 'var(--text-main)',
                    outline: 'none'
                  }}
                />
              </div>

              <button
                onClick={() => setShowAddStudentModal(true)}
                style={{
                  background: 'var(--primary)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '9px 18px',
                  fontSize: '13.5px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(23, 75, 255, 0.35)',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
              >
                <Plus size={16} />
                <span>Add Student</span>
              </button>
            </div>
          </div>

          {/* Students Table Card */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
            backdropFilter: 'blur(16px)'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', width: '50px' }}>#</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Name</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Roll No.</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Email</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Status</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right', width: '60px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.map((student, idx) => {
                    const rowNumber = (currentPage - 1) * pageSize + idx + 1;
                    const initials = student.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('');

                    return (
                      <tr
                        key={student.rollNo || idx}
                        style={{ borderBottom: idx < paginatedStudents.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background-color 0.1s ease' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <td style={{ padding: '14px 20px', fontSize: '13.5px', color: 'var(--text-muted)', fontWeight: '500' }}>
                          {rowNumber}
                        </td>

                        <td style={{ padding: '14px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: 'var(--bg-subtle)',
                              color: 'var(--text-main)',
                              border: '1px solid var(--border)',
                              fontSize: '12px',
                              fontWeight: '600',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              {initials}
                            </div>
                            <span
                              onClick={() => setInspectedStudent(student)}
                              style={{ fontSize: '13.5px', fontWeight: '600', color: 'var(--text-main)', cursor: 'pointer' }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-ice)')}
                              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-main)')}
                            >
                              {student.name}
                            </span>
                          </div>
                        </td>

                        <td style={{ padding: '14px 20px' }}>
                          <span
                            onClick={() => setInspectedStudent(student)}
                            style={{ fontSize: '13.5px', fontWeight: '500', color: 'var(--accent-ice)', cursor: 'pointer' }}
                          >
                            {student.rollNo}
                          </span>
                        </td>

                        <td style={{ padding: '14px 20px', fontSize: '13.5px', color: 'var(--text-muted)' }}>
                          {student.email}
                        </td>

                        <td style={{ padding: '14px 20px' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: 'rgba(16, 185, 129, 0.15)',
                            color: '#10b981',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            padding: '3px 10px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            Active
                          </span>
                        </td>

                        <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                          <button
                            onClick={() => setInspectedStudent(student)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--text-muted)',
                              cursor: 'pointer',
                              padding: '6px',
                              borderRadius: '6px',
                              transition: 'color 0.15s, background-color 0.15s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = 'var(--text-main)';
                              e.currentTarget.style.background = 'var(--bg-subtle)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = 'var(--text-muted)';
                              e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Bottom Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 20px',
              borderTop: '1px solid var(--border)',
              background: 'var(--bg-card)',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalStudentsCount)} of {totalStudentsCount} students
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-subtle)',
                    color: currentPage === 1 ? 'rgba(255, 255, 255, 0.2)' : 'var(--text-muted)',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        border: isActive ? 'none' : '1px solid var(--border)',
                        background: isActive ? 'var(--primary)' : 'var(--bg-subtle)',
                        color: isActive ? '#ffffff' : 'var(--text-muted)',
                        fontSize: '13px',
                        fontWeight: isActive ? '700' : '500',
                        boxShadow: isActive ? '0 0 12px var(--primary-glow)' : 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-subtle)',
                    color: currentPage === totalPages ? 'rgba(255, 255, 255, 0.2)' : 'var(--text-muted)',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          STUDENT DETAIL MODAL / DRAWER
         ======================================================== */}
      {inspectedStudent && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 7, 13, 0.75)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div style={{
            background: 'rgba(17, 24, 39, 0.95)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '460px',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(23, 75, 255, 0.15)',
                  color: 'var(--accent-ice)',
                  border: '1px solid rgba(23, 75, 255, 0.3)',
                  fontSize: '16px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {inspectedStudent.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 2px 0' }}>
                    {inspectedStudent.name}
                  </h3>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>
                    {inspectedStudent.rollNo}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setInspectedStudent(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--bg-subtle)', textAlign: 'center', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Attendance</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: inspectedStudent.attendance >= 85 ? '#10b981' : '#ef4444', marginTop: '2px' }}>
                  {inspectedStudent.attendance || 95}%
                </div>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--bg-subtle)', textAlign: 'center', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>CGPA</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--accent-ice)', marginTop: '2px' }}>
                  {inspectedStudent.cgpa || 8.9}
                </div>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--bg-subtle)', textAlign: 'center', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Status</div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#10b981', marginTop: '4px' }}>
                  {inspectedStudent.status || 'Active'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Email Address</span>
                <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>{inspectedStudent.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Course & Section</span>
                <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>
                  {selectedCourse?.code || 'CSE301'} — {selectedClass?.section || 'Section A'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Assignments Submitted</span>
                <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>{inspectedStudent.assignmentsSubmitted || '2/2'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Last Platform Activity</span>
                <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>{inspectedStudent.lastActive || 'Today'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              <button
                style={{
                  flex: 1,
                  height: '40px',
                  background: 'var(--primary)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(23, 75, 255, 0.35)',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
                onClick={() => {
                  setInspectedStudent(null);
                  if (setActiveTab) setActiveTab('teacherCommunication');
                }}
              >
                <Mail size={16} />
                <span>Message Student</span>
              </button>
              <button
                style={{
                  height: '40px',
                  padding: '0 16px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '13.5px',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
                onClick={() => setInspectedStudent(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          ADD STUDENT MODAL
         ======================================================== */}
      {showAddStudentModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 7, 13, 0.75)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div style={{
            background: 'rgba(17, 24, 39, 0.95)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '440px',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
                Add Student to {selectedClass?.section || 'Class'}
              </h3>
              <button
                onClick={() => setShowAddStudentModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Anand R"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Roll Number</label>
                <input
                  type="text"
                  placeholder="e.g. CSE2024043"
                  value={newStudent.rollNo}
                  onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. anand.r@example.com"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                style={{
                  flex: 1,
                  height: '40px',
                  background: 'var(--primary)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(23, 75, 255, 0.35)',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
                onClick={() => {
                  if (newStudent.name && newStudent.rollNo) {
                    if (selectedClass && selectedClass.students) {
                      selectedClass.students.unshift({
                        rollNo: newStudent.rollNo,
                        name: newStudent.name,
                        email: newStudent.email || `${newStudent.rollNo.toLowerCase()}@example.com`,
                        status: 'Active',
                        attendance: 95,
                        cgpa: 8.5
                      });
                    }
                    setShowAddStudentModal(false);
                    setNewStudent({ name: '', rollNo: '', email: '' });
                  }
                }}
              >
                Add Student
              </button>
              <button
                style={{
                  height: '40px',
                  padding: '0 16px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '13.5px',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
                onClick={() => setShowAddStudentModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
