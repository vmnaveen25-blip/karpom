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
          background: '#fef2f2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ef4444',
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
        background: '#fdf2f8',
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
      return { bg: '#ede9fe', text: '#6366f1', label: 'CSE' };
    }
    if (d.includes('IT')) {
      return { bg: '#e0f2fe', text: '#0284c7', label: 'IT' };
    }
    if (d.includes('AI')) {
      return { bg: '#dcfce7', text: '#16a34a', label: 'AI' };
    }
    if (d.includes('ECE')) {
      return { bg: '#fef3c7', text: '#d97706', label: 'ECE' };
    }
    return { bg: '#f1f5f9', text: '#475569', label: dept || 'GEN' };
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
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
                My Classes & Students
              </h1>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Your courses and the classes learning each course across departments.
              </p>
            </div>

            {/* Top Right Dropdowns */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '13.5px',
                fontWeight: '500',
                color: '#334155',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
              }}>
                <span>{deptFilter}</span>
                <ChevronDown size={15} style={{ marginLeft: '8px', color: '#64748b' }} />
              </div>

              <div style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '13.5px',
                fontWeight: '500',
                color: '#334155',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
              }}>
                <span>{termFilter}</span>
                <ChevronDown size={15} style={{ marginLeft: '8px', color: '#64748b' }} />
              </div>
            </div>
          </div>

          {/* Subheader: My Courses + Search Input */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
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
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  fontSize: '13.5px',
                  color: '#0f172a',
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
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    transition: 'all 0.18s ease',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#cbd5e1';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.02)';
                  }}
                >
                  {/* Left: Icon & Title & Code/Description */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px', minWidth: '280px', flex: '1 1 340px' }}>
                    {renderCourseIcon(course)}
                    <div>
                      <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>
                        {course.title}
                      </h3>
                      <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0, lineHeight: 1.4 }}>
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
                        background: '#f5f3ff',
                        color: '#6366f1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Users size={19} />
                      </div>
                      <div>
                        <div style={{ fontSize: '14.5px', fontWeight: '700', color: '#0f172a' }}>
                          {classesCount} Classes
                        </div>
                        <div style={{ fontSize: '12.5px', color: '#64748b' }}>
                          Across {deptsCount} Departments
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectCourse(course)}
                      style={{
                        background: '#f5f3ff',
                        color: '#6366f1',
                        border: 'none',
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
                        e.currentTarget.style.background = '#ede9fe';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#f5f3ff';
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}>
            <span
              onClick={() => setViewLevel('courses')}
              style={{ cursor: 'pointer', color: '#64748b', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
            >
              Home
            </span>
            <ChevronRight size={14} style={{ color: '#94a3b8' }} />
            <span
              onClick={() => setViewLevel('courses')}
              style={{ cursor: 'pointer', color: '#64748b', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
            >
              My Classes & Students
            </span>
            <ChevronRight size={14} style={{ color: '#94a3b8' }} />
            <span style={{ fontWeight: '600', color: '#0f172a' }}>
              {selectedCourse.title}
            </span>
          </div>

          {/* Hero Card */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '24px 28px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
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
                  <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>
                    {selectedCourse.title}
                  </h1>
                  <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
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
                  background: '#f5f3ff',
                  color: '#6366f1',
                  border: '1px solid #e0e7ff',
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
                  background: '#f8fafc',
                  color: '#475569',
                  border: '1px solid #e2e8f0',
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
                  background: '#f8fafc',
                  color: '#475569',
                  border: '1px solid #e2e8f0',
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
                  background: '#f8fafc',
                  color: '#475569',
                  border: '1px solid #e2e8f0',
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
                  background: '#ffffff',
                  color: '#334155',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '9px 18px',
                  fontSize: '13.5px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#94a3b8';
                  e.currentTarget.style.background = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.background = '#ffffff';
                }}
              >
                <span>View Course Details</span>
                <ExternalLink size={15} style={{ color: '#64748b' }} />
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
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  fontSize: '13px',
                  color: '#0f172a',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Classes Table */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', width: '50px' }}>#</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Department</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Year</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Section</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Academic Term</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Students</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Teacher(s)</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courseClasses.map((cls, idx) => {
                    const deptBadge = getDeptBadgeStyle(cls.deptBadge || cls.department);
                    return (
                      <tr
                        key={cls.id || idx}
                        style={{ borderBottom: idx < courseClasses.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background-color 0.1s ease' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafafa')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                      >
                        <td style={{ padding: '16px 20px', fontSize: '13.5px', color: '#64748b', fontWeight: '500' }}>
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
                            <span style={{ fontSize: '13.5px', fontWeight: '500', color: '#0f172a' }}>
                              {cls.department}
                            </span>
                          </div>
                        </td>

                        <td style={{ padding: '16px 20px', fontSize: '13.5px', color: '#334155', fontWeight: '500' }}>
                          {cls.year || 'III Year'}
                        </td>

                        <td style={{ padding: '16px 20px', fontSize: '13.5px', color: '#334155', fontWeight: '500' }}>
                          {cls.section}
                        </td>

                        <td style={{ padding: '16px 20px', fontSize: '13.5px', color: '#64748b' }}>
                          {cls.academicTerm || cls.term || 'Fall 2026'}
                        </td>

                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', fontWeight: '600', color: '#0f172a' }}>
                            <Users size={14} style={{ color: '#64748b' }} />
                            <span>{cls.totalStudents || cls.students?.length || 40}</span>
                          </div>
                        </td>

                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              background: '#6366f1',
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
                            <span style={{ fontSize: '13.5px', fontWeight: '500', color: '#0f172a' }}>
                              {cls.teacher || 'Vijay Vikas'}
                            </span>
                          </div>
                        </td>

                        <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                          <button
                            onClick={() => handleSelectClass(cls)}
                            style={{
                              background: '#f5f3ff',
                              color: '#6366f1',
                              border: 'none',
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
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#ede9fe')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = '#f5f3ff')}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', flexWrap: 'wrap' }}>
            <span
              onClick={() => setViewLevel('courses')}
              style={{ cursor: 'pointer', color: '#64748b' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
            >
              Home
            </span>
            <ChevronRight size={14} style={{ color: '#94a3b8' }} />
            <span
              onClick={() => setViewLevel('courses')}
              style={{ cursor: 'pointer', color: '#64748b' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
            >
              My Classes & Students
            </span>
            <ChevronRight size={14} style={{ color: '#94a3b8' }} />
            <span
              onClick={() => setViewLevel('classes')}
              style={{ cursor: 'pointer', color: '#64748b' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
            >
              {selectedCourse.title}
            </span>
            <ChevronRight size={14} style={{ color: '#94a3b8' }} />
            <span style={{ color: '#64748b' }}>
              {selectedClass.deptBadge || 'CSE'} - {selectedClass.year || 'III Year'} - {selectedClass.section || 'Section A'}
            </span>
            <ChevronRight size={14} style={{ color: '#94a3b8' }} />
            <span style={{ fontWeight: '600', color: '#0f172a' }}>
              Students
            </span>
          </div>

          {/* Hero Card with Section Pills */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '22px 26px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>
                {selectedCourse.title}
              </h1>
              <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
                {selectedCourse.subtitle || `${selectedCourse.code} • Object-oriented programming, concurrency, and JVM internals`}
              </p>
            </div>

            {/* Badges Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{
                background: '#ede9fe',
                color: '#6366f1',
                borderRadius: '9999px',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: '700'
              }}>
                {selectedClass.deptBadge || 'CSE'}
              </span>

              <span style={{
                background: '#f1f5f9',
                color: '#475569',
                borderRadius: '9999px',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {selectedClass.year || 'III Year'}
              </span>

              <span style={{
                background: '#f1f5f9',
                color: '#475569',
                borderRadius: '9999px',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {selectedClass.section || 'Section A'}
              </span>

              <span style={{
                background: '#f1f5f9',
                color: '#475569',
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
                background: '#f5f3ff',
                color: '#6366f1',
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
            borderBottom: '1px solid #e2e8f0',
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
                    color: isActive ? '#6366f1' : '#64748b',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#0f172a';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#64748b';
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
                      background: '#6366f1',
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
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 2px 0' }}>
                Students ({selectedClass.totalStudents || selectedClass.students?.length || 42})
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                List of all students enrolled in this class section.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative', width: '280px', maxWidth: '100%' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
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
                    border: '1px solid #e2e8f0',
                    background: '#ffffff',
                    fontSize: '13px',
                    color: '#0f172a',
                    outline: 'none'
                  }}
                />
              </div>

              <button
                onClick={() => setShowAddStudentModal(true)}
                style={{
                  background: '#6366f1',
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
                  boxShadow: '0 1px 3px rgba(99,102,241,0.25)',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4f46e5')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6366f1')}
              >
                <Plus size={16} />
                <span>Add Student</span>
              </button>
            </div>
          </div>

          {/* Students Table Card */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', width: '50px' }}>#</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Name</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Roll No.</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Email</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Status</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right', width: '60px' }}>Actions</th>
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
                        style={{ borderBottom: idx < paginatedStudents.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background-color 0.1s ease' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafafa')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                      >
                        <td style={{ padding: '14px 20px', fontSize: '13.5px', color: '#64748b', fontWeight: '500' }}>
                          {rowNumber}
                        </td>

                        <td style={{ padding: '14px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: '#f1f5f9',
                              color: '#475569',
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
                              style={{ fontSize: '13.5px', fontWeight: '600', color: '#0f172a', cursor: 'pointer' }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
                              onMouseLeave={(e) => (e.currentTarget.style.color = '#0f172a')}
                            >
                              {student.name}
                            </span>
                          </div>
                        </td>

                        <td style={{ padding: '14px 20px' }}>
                          <span
                            onClick={() => setInspectedStudent(student)}
                            style={{ fontSize: '13.5px', fontWeight: '500', color: '#2563eb', cursor: 'pointer' }}
                          >
                            {student.rollNo}
                          </span>
                        </td>

                        <td style={{ padding: '14px 20px', fontSize: '13.5px', color: '#64748b' }}>
                          {student.email}
                        </td>

                        <td style={{ padding: '14px 20px' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: '#ecfdf5',
                            color: '#10b981',
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
                              color: '#94a3b8',
                              cursor: 'pointer',
                              padding: '6px',
                              borderRadius: '6px',
                              transition: 'color 0.15s, background-color 0.15s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#0f172a';
                              e.currentTarget.style.background = '#f1f5f9';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#94a3b8';
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
              borderTop: '1px solid #e2e8f0',
              background: '#ffffff',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ fontSize: '13px', color: '#64748b' }}>
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
                    border: '1px solid #e2e8f0',
                    background: '#ffffff',
                    color: currentPage === 1 ? '#cbd5e1' : '#64748b',
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
                        border: isActive ? 'none' : '1px solid #e2e8f0',
                        background: isActive ? '#6366f1' : '#ffffff',
                        color: isActive ? '#ffffff' : '#475569',
                        fontSize: '13px',
                        fontWeight: isActive ? '700' : '500',
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
                    border: '1px solid #e2e8f0',
                    background: '#ffffff',
                    color: currentPage === totalPages ? '#cbd5e1' : '#64748b',
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
          background: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '460px',
            padding: '24px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
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
                  background: '#f5f3ff',
                  color: '#6366f1',
                  fontSize: '16px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {inspectedStudent.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 2px 0' }}>
                    {inspectedStudent.name}
                  </h3>
                  <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>
                    {inspectedStudent.rollNo}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setInspectedStudent(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', background: '#f8fafc', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Attendance</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: inspectedStudent.attendance >= 85 ? '#10b981' : '#ef4444', marginTop: '2px' }}>
                  {inspectedStudent.attendance || 95}%
                </div>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', background: '#f8fafc', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>CGPA</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#6366f1', marginTop: '2px' }}>
                  {inspectedStudent.cgpa || 8.9}
                </div>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', background: '#f8fafc', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Status</div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#10b981', marginTop: '4px' }}>
                  {inspectedStudent.status || 'Active'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Email Address</span>
                <span style={{ fontWeight: '500', color: '#0f172a' }}>{inspectedStudent.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Course & Section</span>
                <span style={{ fontWeight: '500', color: '#0f172a' }}>
                  {selectedCourse?.code || 'CSE301'} — {selectedClass?.section || 'Section A'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Assignments Submitted</span>
                <span style={{ fontWeight: '500', color: '#0f172a' }}>{inspectedStudent.assignmentsSubmitted || '2/2'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Last Platform Activity</span>
                <span style={{ fontWeight: '500', color: '#0f172a' }}>{inspectedStudent.lastActive || 'Today'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              <button
                style={{
                  flex: 1,
                  height: '40px',
                  background: '#6366f1',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
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
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '13.5px',
                  color: '#475569',
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
          background: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '440px',
            padding: '24px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                Add Student to {selectedClass?.section || 'Class'}
              </h3>
              <button
                onClick={() => setShowAddStudentModal(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Anand R"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Roll Number</label>
                <input
                  type="text"
                  placeholder="e.g. CSE2024043"
                  value={newStudent.rollNo}
                  onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. anand.r@example.com"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                style={{
                  flex: 1,
                  height: '40px',
                  background: '#6366f1',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '13.5px',
                  cursor: 'pointer'
                }}
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
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '13.5px',
                  color: '#475569',
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
