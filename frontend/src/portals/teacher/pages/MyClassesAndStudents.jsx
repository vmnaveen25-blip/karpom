import React, { useState, useMemo } from 'react';
import {
  Users,
  BookOpen,
  Search,
  ChevronRight,
  ArrowLeft,
  Clock,
  Download,
  Mail,
  CheckCircle2,
  AlertTriangle,
  X
} from 'lucide-react';

export default function MyClassesAndStudents({ teacherData, setActiveTab }) {
  // Navigation level: 'courses' | 'classes' | 'students'
  const [viewLevel, setViewLevel] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(teacherData.courses[0] || null);
  const [selectedClass, setSelectedClass] = useState(teacherData.classes[0] || null);

  // Filters & Search
  const [courseDeptFilter, setCourseDeptFilter] = useState('All');
  const [courseSearch, setCourseSearch] = useState('');
  const [studentSearch, setStudentSearch] = useState('');
  const [studentAttendanceFilter, setStudentAttendanceFilter] = useState('All');
  const [studentStatusFilter, setStudentStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Student Profile Drawer / Modal
  const [inspectedStudent, setInspectedStudent] = useState(null);

  // Courses filtered
  const filteredCourses = useMemo(() => {
    return (teacherData.courses || []).filter((course) => {
      const matchDept = courseDeptFilter === 'All' || course.department === courseDeptFilter;
      const matchSearch =
        course.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
        course.code.toLowerCase().includes(courseSearch.toLowerCase());
      return matchDept && matchSearch;
    });
  }, [teacherData.courses, courseDeptFilter, courseSearch]);

  // Classes for current course
  const courseClasses = useMemo(() => {
    if (!selectedCourse) return [];
    return (teacherData.classes || []).filter((cls) => cls.courseId === selectedCourse.id);
  }, [teacherData.classes, selectedCourse]);

  // Students in selected class
  const classStudents = useMemo(() => {
    if (!selectedClass || !selectedClass.students) return [];
    return selectedClass.students.filter((st) => {
      const matchSearch =
        st.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        st.rollNo.toLowerCase().includes(studentSearch.toLowerCase());
      const matchAttendance =
        studentAttendanceFilter === 'All' ||
        (studentAttendanceFilter === 'above85' && st.attendance >= 85) ||
        (studentAttendanceFilter === 'below85' && st.attendance < 85);
      const matchStatus =
        studentStatusFilter === 'All' || st.status === studentStatusFilter;
      return matchSearch && matchAttendance && matchStatus;
    });
  }, [selectedClass, studentSearch, studentAttendanceFilter, studentStatusFilter]);

  // Pagination for students
  const totalPages = Math.ceil(classStudents.length / pageSize) || 1;
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return classStudents.slice(start, start + pageSize);
  }, [classStudents, currentPage]);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    // find first class for this course
    const cls = (teacherData.classes || []).find((c) => c.courseId === course.id);
    if (cls) setSelectedClass(cls);
    setViewLevel('classes');
  };

  const handleSelectClass = (cls) => {
    setSelectedClass(cls);
    setCurrentPage(1);
    setViewLevel('students');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Level 1: My Courses */}
      {viewLevel === 'courses' && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 className="page-title">My Courses</h1>
              <p className="page-subtitle">
                Assigned teaching courses, department sections, and student rosters for the current academic session.
              </p>
            </div>
          </div>

          {/* Search & Department Filters */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            {/* Department Tabs */}
            <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-subtle)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
              {['All', 'CSE', 'IT', 'AI & DS'].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setCourseDeptFilter(dept)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: courseDeptFilter === dept ? 'var(--bg-card)' : 'transparent',
                    color: courseDeptFilter === dept ? 'var(--primary)' : 'var(--text-muted)',
                    fontWeight: courseDeptFilter === dept ? '600' : '500',
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: courseDeptFilter === dept ? 'var(--shadow-xs)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {dept === 'All' ? 'All Departments' : dept}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="search-input"
                placeholder="Search courses by code or title..."
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                style={{ paddingLeft: '38px', height: '38px', fontSize: '13px' }}
              />
            </div>
          </div>

          {/* Courses Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="ui-card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  borderRadius: '16px',
                  border: '1px solid var(--border)'
                }}
              >
                {/* Header badges */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'var(--primary-soft)',
                      color: 'var(--primary)',
                      fontSize: '12px',
                      fontWeight: '700',
                      letterSpacing: '0.02em'
                    }}>
                      {course.code}
                    </span>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      background: 'var(--bg-subtle)',
                      color: 'var(--text-secondary)',
                      fontSize: '11px',
                      fontWeight: '600'
                    }}>
                      {course.department}
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>
                    {course.year} • {course.semester}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
                    {course.title}
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--text-muted)',
                    lineHeight: '1.5',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {course.description}
                  </p>
                </div>

                {/* Stats Row */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '8px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: 'var(--bg-subtle)',
                  textAlign: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Credits</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>{course.credits}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Sections</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>{course.sectionsCount}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Students</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>{course.studentsCount}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Units</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>{course.unitsCount}</div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                  <button
                    onClick={() => handleSelectCourse(course)}
                    className="btn-primary"
                    style={{ flex: 1, height: '40px', padding: '0 14px', fontSize: '13px' }}
                  >
                    <Users size={16} />
                    <span>View Classes</span>
                  </button>
                  <button
                    onClick={() => {
                      if (setActiveTab) setActiveTab('teacherCourses');
                    }}
                    className="btn-outline"
                    style={{ height: '40px', padding: '0 14px', fontSize: '13px' }}
                    title="Inspect curriculum and specifications"
                  >
                    <BookOpen size={16} />
                    <span>Curriculum</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Level 2: My Classes */}
      {viewLevel === 'classes' && selectedCourse && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Breadcrumb Back */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setViewLevel('courses')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                padding: '4px 0'
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Courses</span>
            </button>
            <span style={{ color: 'var(--border)' }}>/</span>
            <span style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '600' }}>
              {selectedCourse.code} Classes
            </span>
          </div>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 className="page-title">{selectedCourse.title}</h1>
                <span style={{
                  padding: '3px 10px',
                  borderRadius: '12px',
                  background: 'var(--primary-soft)',
                  color: 'var(--primary)',
                  fontSize: '12px',
                  fontWeight: '700'
                }}>
                  {selectedCourse.code}
                </span>
              </div>
              <p className="page-subtitle">
                Class sections assigned to you for {selectedCourse.department} • {selectedCourse.year} ({selectedCourse.semester}).
              </p>
            </div>
          </div>

          {/* Quick Metrics Banner */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px',
          }}>
            <div className="ui-card" style={{ padding: '16px 20px', borderRadius: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Total Sections</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px' }}>
                {courseClasses.length}
              </div>
            </div>
            <div className="ui-card" style={{ padding: '16px 20px', borderRadius: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Enrolled Students</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px' }}>
                {selectedCourse.studentsCount}
              </div>
            </div>
            <div className="ui-card" style={{ padding: '16px 20px', borderRadius: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Avg Attendance</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--success)', marginTop: '4px' }}>
                89.4%
              </div>
            </div>
            <div className="ui-card" style={{ padding: '16px 20px', borderRadius: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Avg CGPA</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)', marginTop: '4px' }}>
                8.15
              </div>
            </div>
          </div>

          {/* Classes Cards List */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
            {courseClasses.map((cls) => (
              <div
                key={cls.id}
                className="ui-card"
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)' }}>
                      {cls.department} — {cls.section}
                    </h3>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '3px' }}>
                      {cls.classroom}
                    </div>
                  </div>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: 'var(--bg-subtle)',
                    color: 'var(--text-secondary)',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {cls.totalStudents} Students
                  </span>
                </div>

                {/* Timetable schedule badges */}
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    Weekly Schedule
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {cls.scheduleBadges.map((badge, idx) => (
                      <span
                        key={idx}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: 'var(--bg-subtle)',
                          color: 'var(--text-main)',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}
                      >
                        <Clock size={12} color="var(--primary)" />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  padding: '12px 14px',
                  background: 'var(--bg-subtle)',
                  borderRadius: '10px'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Class Attendance</div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--success)', marginTop: '2px' }}>
                      {cls.avgAttendance}%
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Class Avg CGPA</div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--primary)', marginTop: '2px' }}>
                      {cls.avgCgpa} / 10
                    </div>
                  </div>
                </div>

                {/* Action */}
                <button
                  onClick={() => handleSelectClass(cls)}
                  className="btn-primary"
                  style={{ width: '100%', height: '40px', marginTop: 'auto', fontSize: '13px' }}
                >
                  <Users size={16} />
                  <span>View Student Roster</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Level 3: Student Roster */}
      {viewLevel === 'students' && selectedClass && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Breadcrumb Back */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setViewLevel('classes')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                padding: '4px 0'
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Classes</span>
            </button>
            <span style={{ color: 'var(--border)' }}>/</span>
            <span style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '600' }}>
              {selectedClass.department} {selectedClass.section} Roster
            </span>
          </div>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 className="page-title">
                Student Roster — {selectedClass.department} ({selectedClass.section})
              </h1>
              <p className="page-subtitle">
                {selectedClass.totalStudents} enrolled students for {selectedClass.courseTitle} ({selectedClass.courseCode}).
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn-outline"
                style={{ height: '38px', padding: '0 14px', fontSize: '13px' }}
                onClick={() => alert('Exporting student roster CSV report...')}
              >
                <Download size={15} />
                <span>Export Roster CSV</span>
              </button>
            </div>
          </div>

          {/* Search & Filters Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            background: 'var(--bg-card)',
            padding: '14px 18px',
            borderRadius: '12px',
            border: '1px solid var(--border)'
          }}>
            {/* Search */}
            <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="search-input"
                placeholder="Search by student name or roll no..."
                value={studentSearch}
                onChange={(e) => {
                  setStudentSearch(e.target.value);
                  setCurrentPage(1);
                }}
                style={{ paddingLeft: '38px', height: '38px', fontSize: '13px' }}
              />
            </div>

            {/* Attendance & Status Filter dropdowns */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Attendance:</span>
                <select
                  value={studentAttendanceFilter}
                  onChange={(e) => {
                    setStudentAttendanceFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-subtle)',
                    fontSize: '13px',
                    color: 'var(--text-main)',
                    outline: 'none'
                  }}
                >
                  <option value="All">All Attendance</option>
                  <option value="above85">85% and Above</option>
                  <option value="below85">Below 85%</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Status:</span>
                <select
                  value={studentStatusFilter}
                  onChange={(e) => {
                    setStudentStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-subtle)',
                    fontSize: '13px',
                    color: 'var(--text-main)',
                    outline: 'none'
                  }}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="At Risk">At Risk</option>
                </select>
              </div>
            </div>
          </div>

          {/* Students Table */}
          <div className="ui-card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>ROLL NUMBER</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>STUDENT NAME</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>ATTENDANCE</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>CGPA</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>SUBMISSIONS</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>STATUS</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px', textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No students found matching your search and filter criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedStudents.map((st) => (
                      <tr
                        key={st.rollNo}
                        style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s ease' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-subtle)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <td style={{ padding: '14px 20px', fontWeight: '600', color: 'var(--text-main)', fontFamily: 'var(--font-mono)', fontSize: '12.5px' }}>
                          {st.rollNo}
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: 'var(--primary-soft)',
                              color: 'var(--primary)',
                              fontSize: '12px',
                              fontWeight: '700',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              {st.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                            </div>
                            <div>
                              <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{st.name}</div>
                              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{st.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                              fontWeight: '700',
                              color: st.attendance >= 85 ? 'var(--success)' : 'var(--danger)'
                            }}>
                              {st.attendance}%
                            </span>
                            <div style={{ width: '60px', height: '5px', borderRadius: '4px', background: 'var(--border)', overflow: 'hidden' }}>
                              <div style={{
                                width: `${st.attendance}%`,
                                height: '100%',
                                background: st.attendance >= 85 ? 'var(--success)' : 'var(--danger)',
                                borderRadius: '4px'
                              }} />
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '14px 20px', fontWeight: '600', color: 'var(--text-main)' }}>
                          {st.cgpa}
                        </td>
                        <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>
                          {st.assignmentsSubmitted || '2/2'}
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '3px 8px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '600',
                            background: st.status === 'Active' ? 'var(--success-soft)' : 'var(--danger-soft)',
                            color: st.status === 'Active' ? 'var(--success)' : 'var(--danger)'
                          }}>
                            {st.status === 'Active' ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                            {st.status}
                          </span>
                        </td>
                        <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            <button
                              onClick={() => setInspectedStudent(st)}
                              className="btn-outline"
                              style={{ padding: '5px 10px', fontSize: '12px', height: '30px' }}
                            >
                              Profile
                            </button>
                            <button
                              onClick={() => {
                                if (setActiveTab) setActiveTab('teacherCommunication');
                              }}
                              className="btn-outline"
                              style={{ padding: '5px 10px', fontSize: '12px', height: '30px' }}
                              title="Message student"
                            >
                              <Mail size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 20px',
              borderTop: '1px solid var(--border)',
              background: 'var(--bg-subtle)'
            }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, classStudents.length)} of {classStudents.length} students
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    background: currentPage === 1 ? 'transparent' : 'var(--bg-card)',
                    color: currentPage === 1 ? 'var(--text-disabled)' : 'var(--text-main)',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pg) => (
                  <button
                    key={pg}
                    onClick={() => setCurrentPage(pg)}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '6px',
                      border: '1px solid var(--border)',
                      background: currentPage === pg ? 'var(--primary)' : 'var(--bg-card)',
                      color: currentPage === pg ? '#ffffff' : 'var(--text-main)',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {pg}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    background: currentPage === totalPages ? 'transparent' : 'var(--bg-card)',
                    color: currentPage === totalPages ? 'var(--text-disabled)' : 'var(--text-main)',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Profile Quick Drawer / Modal */}
      {inspectedStudent && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div className="ui-card fade-in" style={{
            width: '480px',
            maxWidth: '100%',
            padding: '28px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--primary-soft)',
                  color: 'var(--primary)',
                  fontSize: '16px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {inspectedStudent.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)' }}>
                    {inspectedStudent.name}
                  </h3>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
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
              <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--bg-subtle)', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Attendance</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: inspectedStudent.attendance >= 85 ? 'var(--success)' : 'var(--danger)', marginTop: '2px' }}>
                  {inspectedStudent.attendance}%
                </div>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--bg-subtle)', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>CGPA</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--primary)', marginTop: '2px' }}>
                  {inspectedStudent.cgpa}
                </div>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--bg-subtle)', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Status</div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: inspectedStudent.status === 'Active' ? 'var(--success)' : 'var(--danger)', marginTop: '4px' }}>
                  {inspectedStudent.status}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Email Address</span>
                <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>{inspectedStudent.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Course & Section</span>
                <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>{selectedClass.courseCode} — {selectedClass.section}</span>
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

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                className="btn-primary"
                style={{ flex: 1, height: '40px' }}
                onClick={() => {
                  setInspectedStudent(null);
                  if (setActiveTab) setActiveTab('teacherCommunication');
                }}
              >
                <Mail size={16} />
                <span>Message Student</span>
              </button>
              <button
                className="btn-outline"
                style={{ height: '40px' }}
                onClick={() => setInspectedStudent(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
