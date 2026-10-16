import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Edit2,
  CheckCircle2,
  Clock,
  FileText,
  X
} from 'lucide-react';

export default function CoursesAndCurriculum({ teacherData, setTeacherData, setActiveTab }) {
  // Views: 'list' | 'details' | 'curriculum' | 'create' | 'createSuccess'
  const [currentView, setCurrentView] = useState('list');
  const [selectedCourse, setSelectedCourse] = useState(teacherData.courses[0] || null);

  // Filters & Search
  const [deptFilter, setDeptFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Curriculum State
  const [expandedUnits, setExpandedUnits] = useState({ u1: true, u2: true, u3: false, u4: false, u5: false });
  const [editingTopic, setEditingTopic] = useState(null); // { unitId, topic }
  const [newTopicUnitId, setNewTopicUnitId] = useState(null);
  const [addingUnit, setAddingUnit] = useState(false);
  const [unitTitleInput, setUnitTitleInput] = useState('');
  const [unitHoursInput, setUnitHoursInput] = useState(12);

  // Course Creation Wizard State
  const [newCourseForm, setNewCourseForm] = useState({
    code: '',
    title: '',
    department: 'CSE',
    year: '3rd Year',
    semester: 'Semester V',
    regulation: 'R-2022',
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 2,
    courseType: 'Core Professional',
    description: '',
    prerequisites: '',
    objectives: '',
    outcomes: ''
  });
  const [createdCourseObj, setCreatedCourseObj] = useState(null);

  // Topic Edit Form
  const [topicForm, setTopicForm] = useState({
    title: '',
    hours: 3,
    status: 'Planned',
    keyConcepts: ''
  });

  const toggleUnit = (unitId) => {
    setExpandedUnits((prev) => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  const handleOpenEditTopic = (unitId, topic) => {
    setEditingTopic({ unitId, topicId: topic.id });
    setTopicForm({
      title: topic.title,
      hours: topic.hours,
      status: topic.status || 'Planned',
      keyConcepts: topic.keyConcepts || ''
    });
  };

  const handleSaveTopic = () => {
    if (!selectedCourse || !editingTopic) return;
    const updatedCourses = teacherData.courses.map((crs) => {
      if (crs.id !== selectedCourse.id) return crs;
      const updatedUnits = (crs.units || []).map((u) => {
        if (u.id !== editingTopic.unitId) return u;
        const updatedTopics = (u.topics || []).map((t) => {
          if (t.id !== editingTopic.topicId) return t;
          return {
            ...t,
            title: topicForm.title,
            hours: Number(topicForm.hours),
            status: topicForm.status,
            keyConcepts: topicForm.keyConcepts
          };
        });
        return { ...u, topics: updatedTopics };
      });
      return { ...crs, units: updatedUnits };
    });

    if (setTeacherData) {
      setTeacherData((prev) => ({ ...prev, courses: updatedCourses }));
    }
    const updatedSelected = updatedCourses.find((c) => c.id === selectedCourse.id);
    if (updatedSelected) setSelectedCourse(updatedSelected);
    setEditingTopic(null);
  };

  const handleAddTopic = (unitId) => {
    if (!selectedCourse || !topicForm.title) return;
    const newTopic = {
      id: `t_${Date.now()}`,
      title: topicForm.title,
      hours: Number(topicForm.hours) || 2,
      status: 'Planned',
      keyConcepts: topicForm.keyConcepts
    };

    const updatedCourses = teacherData.courses.map((crs) => {
      if (crs.id !== selectedCourse.id) return crs;
      const updatedUnits = (crs.units || []).map((u) => {
        if (u.id !== unitId) return u;
        return { ...u, topics: [...(u.topics || []), newTopic] };
      });
      return { ...crs, units: updatedUnits };
    });

    if (setTeacherData) {
      setTeacherData((prev) => ({ ...prev, courses: updatedCourses }));
    }
    const updatedSelected = updatedCourses.find((c) => c.id === selectedCourse.id);
    if (updatedSelected) setSelectedCourse(updatedSelected);
    setNewTopicUnitId(null);
    setTopicForm({ title: '', hours: 3, status: 'Planned', keyConcepts: '' });
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    const newCourse = {
      id: newCourseForm.code || `CRS_${Date.now()}`,
      code: newCourseForm.code,
      title: newCourseForm.title,
      department: newCourseForm.department,
      year: newCourseForm.year,
      semester: newCourseForm.semester,
      regulation: newCourseForm.regulation,
      credits: Number(newCourseForm.credits),
      totalHours: (Number(newCourseForm.lectureHours) + Number(newCourseForm.practicalHours)) * 15,
      lectureHours: Number(newCourseForm.lectureHours),
      tutorialHours: Number(newCourseForm.tutorialHours),
      practicalHours: Number(newCourseForm.practicalHours),
      courseType: newCourseForm.courseType,
      sectionsCount: 1,
      studentsCount: 0,
      unitsCount: 5,
      materialsCount: 0,
      status: 'Active',
      description: newCourseForm.description || 'Master syllabus course for academic curriculum.',
      prerequisites: newCourseForm.prerequisites || 'None',
      objectives: newCourseForm.objectives ? newCourseForm.objectives.split('\n').filter(Boolean) : [
        'Understand core fundamental principles',
        'Analyze practical computational workflows'
      ],
      outcomes: [
        { id: 'CO1', text: 'Demonstrate comprehension of theoretical foundations.', bloom: 'Understand (L2)', po: 'PO1, PO2' },
        { id: 'CO2', text: 'Implement applied technical problem solving pipelines.', bloom: 'Apply (L3)', po: 'PO3, PO5' }
      ],
      books: {
        textbooks: ['Prescribed Standard Curriculum Text (Latest Edition)'],
        references: ['Academic Reference Manual and Standard Guidelines']
      },
      units: [
        { id: `u1_${Date.now()}`, unitNumber: 1, title: 'Unit 1: Fundamentals & Conceptual Architecture', hours: 12, topics: [] },
        { id: `u2_${Date.now()}`, unitNumber: 2, title: 'Unit 2: Core Methodologies & Algorithms', hours: 12, topics: [] },
        { id: `u3_${Date.now()}`, unitNumber: 3, title: 'Unit 3: Advanced Implementation Techniques', hours: 12, topics: [] },
        { id: `u4_${Date.now()}`, unitNumber: 4, title: 'Unit 4: Integration & Optimization Protocols', hours: 12, topics: [] },
        { id: `u5_${Date.now()}`, unitNumber: 5, title: 'Unit 5: Case Studies & Industry Applications', hours: 12, topics: [] }
      ]
    };

    if (setTeacherData) {
      setTeacherData((prev) => ({
        ...prev,
        courses: [newCourse, ...(prev.courses || [])]
      }));
    }
    setCreatedCourseObj(newCourse);
    setSelectedCourse(newCourse);
    setCurrentView('createSuccess');
  };

  const filteredCourses = (teacherData.courses || []).filter((c) => {
    const matchDept = deptFilter === 'All' || c.department === deptFilter;
    const matchSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <div className="fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* View 1: Course Catalog */}
      {currentView === 'list' && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 className="page-title">Courses & Curriculum</h1>
              <p className="page-subtitle">
                Master course catalog, academic regulations, syllabi units, and learning outcomes across departments.
              </p>
            </div>

            <button
              onClick={() => setCurrentView('create')}
              className="btn-primary"
              style={{ height: '40px', padding: '0 18px', fontSize: '13.5px' }}
            >
              <Plus size={16} />
              <span>Create New Course</span>
            </button>
          </div>

          {/* Search & Filters */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-subtle)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
              {['All', 'CSE', 'IT', 'AI & DS'].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setDeptFilter(dept)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: deptFilter === dept ? 'var(--bg-card)' : 'transparent',
                    color: deptFilter === dept ? 'var(--primary)' : 'var(--text-muted)',
                    fontWeight: deptFilter === dept ? '600' : '500',
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: deptFilter === dept ? 'var(--shadow-xs)' : 'none'
                  }}
                >
                  {dept === 'All' ? 'All Departments' : dept}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="search-input"
                placeholder="Search course title or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '38px', height: '38px', fontSize: '13px' }}
              />
            </div>
          </div>

          {/* Master Courses Table */}
          <div className="ui-card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>COURSE CODE</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>COURSE TITLE</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>DEPARTMENT</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>REGULATION</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>CREDITS</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>UNITS</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>MATERIALS</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px', textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((c) => (
                    <tr
                      key={c.id}
                      style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s ease' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-subtle)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '14px 20px', fontWeight: '700', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                        {c.code}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{c.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{c.year} • {c.semester}</div>
                      </td>
                      <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>
                        {c.department}
                      </td>
                      <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>
                        {c.regulation}
                      </td>
                      <td style={{ padding: '14px 20px', fontWeight: '600', color: 'var(--text-main)' }}>
                        {c.credits}
                      </td>
                      <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>
                        {(c.units || []).length || c.unitsCount} Units
                      </td>
                      <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>
                        {c.materialsCount} Items
                      </td>
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button
                            onClick={() => {
                              setSelectedCourse(c);
                              setCurrentView('details');
                            }}
                            className="btn-outline"
                            style={{ padding: '5px 12px', fontSize: '12px', height: '32px' }}
                          >
                            Course Specs
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCourse(c);
                              setCurrentView('curriculum');
                            }}
                            className="btn-primary"
                            style={{ padding: '5px 12px', fontSize: '12px', height: '32px' }}
                          >
                            Curriculum
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* View 2: Course Details Specification */}
      {currentView === 'details' && selectedCourse && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setCurrentView('list')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Course Catalog</span>
            </button>
            <span style={{ color: 'var(--border)' }}>/</span>
            <span style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '600' }}>
              {selectedCourse.code} Specifications
            </span>
          </div>

          {/* Header Card */}
          <div className="ui-card" style={{ padding: '28px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'var(--primary-soft)',
                  color: 'var(--primary)',
                  fontSize: '13px',
                  fontWeight: '700'
                }}>
                  {selectedCourse.code}
                </span>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                  {selectedCourse.title}
                </h1>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px', maxWidth: '780px', lineHeight: '1.6' }}>
                {selectedCourse.description}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setCurrentView('curriculum')}
                className="btn-primary"
                style={{ height: '40px', padding: '0 16px', fontSize: '13px' }}
              >
                <BookOpen size={16} />
                <span>Open Curriculum Units</span>
              </button>
              <button
                onClick={() => {
                  if (setActiveTab) setActiveTab('teacherMaterials');
                }}
                className="btn-outline"
                style={{ height: '40px', padding: '0 16px', fontSize: '13px' }}
              >
                <span>Teaching Materials</span>
              </button>
            </div>
          </div>

          {/* Specs Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div className="ui-card" style={{ padding: '20px', borderRadius: '14px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>ACADEMIC DETAILS</div>
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Department</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{selectedCourse.department}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Regulation</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{selectedCourse.regulation}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Course Type</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{selectedCourse.courseType || 'Core Professional'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Year / Semester</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{selectedCourse.year} • {selectedCourse.semester}</span>
                </div>
              </div>
            </div>

            <div className="ui-card" style={{ padding: '20px', borderRadius: '14px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>HOURS & CREDITS (L - T - P - C)</div>
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Total Credits</span>
                  <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{selectedCourse.credits} Credits</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Lecture Hours (L)</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{selectedCourse.lectureHours || 3} Hours / Week</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Tutorial Hours (T)</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{selectedCourse.tutorialHours || 1} Hours / Week</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Practical Hours (P)</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{selectedCourse.practicalHours || 2} Hours / Week</span>
                </div>
              </div>
            </div>

            <div className="ui-card" style={{ padding: '20px', borderRadius: '14px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>PREREQUISITES & SCOPE</div>
              <div style={{ marginTop: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {selectedCourse.prerequisites || 'Basic Programming Fundamentals'}
              </div>
              <div style={{ marginTop: '14px', padding: '10px 12px', background: 'var(--bg-subtle)', borderRadius: '8px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                Total Syllabus Hours: <strong>{selectedCourse.totalHours || 60} Lecture Hours</strong> across 5 Units.
              </div>
            </div>
          </div>

          {/* Course Objectives */}
          <div className="ui-card" style={{ padding: '24px', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '14px' }}>
              Course Objectives
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(selectedCourse.objectives || []).map((obj, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <span style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'var(--primary-soft)',
                    color: 'var(--primary)',
                    fontWeight: '700',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </span>
                  <span style={{ lineHeight: '1.5' }}>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Outcomes */}
          <div className="ui-card" style={{ padding: '24px', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '14px' }}>
              Course Outcomes (CO) & Bloom's Taxonomy Mapping
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '10px 14px', width: '80px' }}>CO ID</th>
                    <th style={{ padding: '10px 14px' }}>COURSE OUTCOME STATEMENT</th>
                    <th style={{ padding: '10px 14px', width: '140px' }}>BLOOM'S LEVEL</th>
                    <th style={{ padding: '10px 14px', width: '120px' }}>PO MAPPING</th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedCourse.outcomes || []).map((co) => (
                    <tr key={co.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: '700', color: 'var(--primary)' }}>{co.id}</td>
                      <td style={{ padding: '12px 14px', color: 'var(--text-main)' }}>{co.text}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ padding: '3px 8px', borderRadius: '6px', background: 'var(--bg-subtle)', fontSize: '11px', fontWeight: '600' }}>
                          {co.bloom}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{co.po}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Prescribed Books */}
          {selectedCourse.books && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="ui-card" style={{ padding: '20px', borderRadius: '14px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '10px' }}>Prescribed Textbooks</h4>
                <ul style={{ paddingLeft: '18px', fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {(selectedCourse.books.textbooks || []).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
              <div className="ui-card" style={{ padding: '20px', borderRadius: '14px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '10px' }}>Reference Books</h4>
                <ul style={{ paddingLeft: '18px', fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {(selectedCourse.books.references || []).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* View 3: Curriculum Units & Topics Tree */}
      {currentView === 'curriculum' && selectedCourse && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setCurrentView('list')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Courses</span>
            </button>
            <span style={{ color: 'var(--border)' }}>/</span>
            <span style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '600' }}>
              {selectedCourse.code} Curriculum Units
            </span>
          </div>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 className="page-title">{selectedCourse.title} Curriculum</h1>
                <span style={{ padding: '3px 8px', borderRadius: '6px', background: 'var(--primary-soft)', color: 'var(--primary)', fontWeight: '700', fontSize: '12px' }}>
                  {selectedCourse.code}
                </span>
              </div>
              <p className="page-subtitle">
                {(selectedCourse.units || []).length} syllabus units with topic delivery outlines and estimated teaching hours.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setAddingUnit(true)}
                className="btn-outline"
                style={{ height: '38px', padding: '0 14px', fontSize: '13px' }}
              >
                <Plus size={15} />
                <span>Add Unit</span>
              </button>
              <button
                onClick={() => setCurrentView('details')}
                className="btn-outline"
                style={{ height: '38px', padding: '0 14px', fontSize: '13px' }}
              >
                <span>View Full Specs</span>
              </button>
            </div>
          </div>

          {/* Add Unit Inline Form */}
          {addingUnit && (
            <div className="ui-card fade-in" style={{ padding: '20px', borderRadius: '14px', background: 'var(--bg-subtle)' }}>
              <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '12px', color: 'var(--text-main)' }}>
                Add New Curriculum Unit
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px auto', gap: '12px', alignItems: 'center' }}>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Unit Title (e.g. Unit 6: Advanced Cloud Microservices)"
                  value={unitTitleInput}
                  onChange={(e) => setUnitTitleInput(e.target.value)}
                  style={{ height: '38px', fontSize: '13px' }}
                />
                <input
                  type="number"
                  className="search-input"
                  placeholder="Hours (12)"
                  value={unitHoursInput}
                  onChange={(e) => setUnitHoursInput(e.target.value)}
                  style={{ height: '38px', fontSize: '13px' }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="btn-primary"
                    style={{ height: '38px', padding: '0 14px', fontSize: '13px' }}
                    onClick={() => {
                      if (!unitTitleInput) return;
                      const newUnit = {
                        id: `u_${Date.now()}`,
                        unitNumber: (selectedCourse.units || []).length + 1,
                        title: unitTitleInput,
                        hours: Number(unitHoursInput) || 12,
                        topics: []
                      };
                      const updatedCourses = teacherData.courses.map((crs) => {
                        if (crs.id !== selectedCourse.id) return crs;
                        return { ...crs, units: [...(crs.units || []), newUnit] };
                      });
                      if (setTeacherData) setTeacherData((p) => ({ ...p, courses: updatedCourses }));
                      setSelectedCourse((p) => ({ ...p, units: [...(p.units || []), newUnit] }));
                      setAddingUnit(false);
                      setUnitTitleInput('');
                    }}
                  >
                    Save Unit
                  </button>
                  <button
                    className="btn-outline"
                    style={{ height: '38px', padding: '0 12px', fontSize: '13px' }}
                    onClick={() => setAddingUnit(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Units Accordion List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(selectedCourse.units || []).map((unit) => {
              const isOpen = !!expandedUnits[unit.id];
              return (
                <div key={unit.id} className="ui-card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                  {/* Unit Accordion Header */}
                  <div
                    onClick={() => toggleUnit(unit.id)}
                    style={{
                      padding: '18px 24px',
                      background: isOpen ? 'var(--bg-subtle)' : 'var(--bg-card)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      borderBottom: isOpen ? '1px solid var(--border)' : 'none',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'var(--primary-soft)',
                        color: 'var(--primary)',
                        fontWeight: '700',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {unit.unitNumber || 'U'}
                      </div>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)' }}>
                          {unit.title}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {unit.hours || 12} Teaching Hours • {(unit.topics || []).length} Topics
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {isOpen ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                    </div>
                  </div>

                  {/* Unit Topics Content */}
                  {isOpen && (
                    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {unit.description && (
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, fontStyle: 'italic' }}>
                          {unit.description}
                        </p>
                      )}

                      {/* Topics List */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {(unit.topics || []).map((topic, idx) => (
                          <div
                            key={topic.id}
                            style={{
                              padding: '14px 18px',
                              borderRadius: '10px',
                              border: '1px solid var(--border)',
                              background: 'var(--bg-card)',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: '12px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', marginTop: '2px' }}>
                                {unit.unitNumber}.{idx + 1}
                              </span>
                              <div>
                                <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '14px' }}>
                                  {topic.title}
                                </div>
                                {topic.keyConcepts && (
                                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                                    <strong>Concepts:</strong> {topic.keyConcepts}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '12px',
                                color: 'var(--text-muted)',
                                background: 'var(--bg-subtle)',
                                padding: '4px 8px',
                                borderRadius: '6px'
                              }}>
                                <Clock size={12} />
                                {topic.hours}h
                              </span>

                              <span style={{
                                padding: '3px 8px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: '600',
                                background:
                                  topic.status === 'Completed'
                                    ? 'var(--success-soft)'
                                    : topic.status === 'In Progress'
                                    ? 'var(--warning-soft)'
                                    : 'var(--bg-subtle)',
                                color:
                                  topic.status === 'Completed'
                                    ? 'var(--success)'
                                    : topic.status === 'In Progress'
                                    ? 'var(--warning)'
                                    : 'var(--text-muted)'
                              }}>
                                {topic.status || 'Planned'}
                              </span>

                              <button
                                onClick={() => handleOpenEditTopic(unit.id, topic)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: 'var(--primary)',
                                  cursor: 'pointer',
                                  padding: '4px'
                                }}
                                title="Edit topic"
                              >
                                <Edit2 size={15} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Topic Inline trigger / form */}
                      {newTopicUnitId === unit.id ? (
                        <div style={{
                          padding: '16px',
                          borderRadius: '10px',
                          background: 'var(--bg-subtle)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          border: '1px dashed var(--border)'
                        }}>
                          <div style={{ fontWeight: '600', fontSize: '13px', color: 'var(--text-main)' }}>Add New Topic to {unit.title}</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '10px' }}>
                            <input
                              type="text"
                              className="search-input"
                              placeholder="Topic title (e.g. Sockets & NIO Multiplexing)"
                              value={topicForm.title}
                              onChange={(e) => setTopicForm({ ...topicForm, title: e.target.value })}
                              style={{ height: '36px', fontSize: '13px' }}
                            />
                            <input
                              type="number"
                              className="search-input"
                              placeholder="Hours (3)"
                              value={topicForm.hours}
                              onChange={(e) => setTopicForm({ ...topicForm, hours: e.target.value })}
                              style={{ height: '36px', fontSize: '13px' }}
                            />
                          </div>
                          <input
                            type="text"
                            className="search-input"
                            placeholder="Key concepts & learning objectives"
                            value={topicForm.keyConcepts}
                            onChange={(e) => setTopicForm({ ...topicForm, keyConcepts: e.target.value })}
                            style={{ height: '36px', fontSize: '13px' }}
                          />
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => handleAddTopic(unit.id)}
                              className="btn-primary"
                              style={{ height: '34px', padding: '0 12px', fontSize: '12px' }}
                            >
                              Add Topic
                            </button>
                            <button
                              onClick={() => setNewTopicUnitId(null)}
                              className="btn-outline"
                              style={{ height: '34px', padding: '0 12px', fontSize: '12px' }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setNewTopicUnitId(unit.id);
                            setTopicForm({ title: '', hours: 3, status: 'Planned', keyConcepts: '' });
                          }}
                          style={{
                            alignSelf: 'flex-start',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'none',
                            border: 'none',
                            color: 'var(--primary)',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            padding: '6px 0'
                          }}
                        >
                          <Plus size={15} />
                          <span>Add Topic to this Unit</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View 4: Course Creation Wizard */}
      {currentView === 'create' && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setCurrentView('list')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Course Catalog</span>
            </button>
          </div>

          <div className="ui-card" style={{ padding: '32px', borderRadius: '16px' }}>
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '16px', marginBottom: '24px' }}>
              <h1 className="page-title" style={{ fontSize: '22px' }}>Create Master Course Specification</h1>
              <p className="page-subtitle">
                Define course metadata, credits, academic regulation, and curriculum units for university approval.
              </p>
            </div>

            <form onSubmit={handleCreateCourse} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Course Code *
                  </label>
                  <input
                    type="text"
                    required
                    className="search-input"
                    placeholder="e.g. CSE305"
                    value={newCourseForm.code}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, code: e.target.value.toUpperCase() })}
                    style={{ height: '40px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Course Title *
                  </label>
                  <input
                    type="text"
                    required
                    className="search-input"
                    placeholder="e.g. Distributed Operating Systems"
                    value={newCourseForm.title}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, title: e.target.value })}
                    style={{ height: '40px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Department *
                  </label>
                  <select
                    value={newCourseForm.department}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, department: e.target.value })}
                    style={{ width: '100%', height: '40px', padding: '0 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', background: 'var(--bg-input)', fontSize: '13px' }}
                  >
                    <option value="CSE">Computer Science & Engineering (CSE)</option>
                    <option value="IT">Information Technology (IT)</option>
                    <option value="AI & DS">Artificial Intelligence & Data Science</option>
                    <option value="ECE">Electronics & Communication</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Regulation
                  </label>
                  <input
                    type="text"
                    className="search-input"
                    value={newCourseForm.regulation}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, regulation: e.target.value })}
                    style={{ height: '40px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Credits
                  </label>
                  <input
                    type="number"
                    className="search-input"
                    value={newCourseForm.credits}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, credits: e.target.value })}
                    style={{ height: '40px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Lecture Hours (L)
                  </label>
                  <input
                    type="number"
                    className="search-input"
                    value={newCourseForm.lectureHours}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, lectureHours: e.target.value })}
                    style={{ height: '40px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Practical Hours (P)
                  </label>
                  <input
                    type="number"
                    className="search-input"
                    value={newCourseForm.practicalHours}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, practicalHours: e.target.value })}
                    style={{ height: '40px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Course Description & Scope
                </label>
                <textarea
                  rows={3}
                  className="search-input"
                  placeholder="Outline key focus areas, pedagogical methodology, and target competencies..."
                  value={newCourseForm.description}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, description: e.target.value })}
                  style={{ height: 'auto', padding: '12px 16px', borderRadius: '12px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Prerequisites
                </label>
                <input
                  type="text"
                  className="search-input"
                  placeholder="e.g. CS201 Data Structures, CS208 Operating Systems"
                  value={newCourseForm.prerequisites}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, prerequisites: e.target.value })}
                  style={{ height: '40px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="submit" className="btn-primary" style={{ height: '42px', padding: '0 24px', fontSize: '13.5px' }}>
                  <Plus size={16} />
                  <span>Create Course & Generate Units</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView('list')}
                  className="btn-outline"
                  style={{ height: '42px', padding: '0 20px', fontSize: '13.5px' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View 5: Course Creation Success (matches course creation info page.png) */}
      {currentView === 'createSuccess' && createdCourseObj && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', textAlign: 'center', padding: '40px 0' }}>
          <div className="ui-card" style={{
            maxWidth: '620px',
            width: '100%',
            padding: '40px 32px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--success-soft)',
              color: 'var(--success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)' }}>
                Course Successfully Initialized!
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '6px', maxWidth: '480px' }}>
                <strong>{createdCourseObj.code} — {createdCourseObj.title}</strong> has been added to the master department catalog with 5 initialized syllabus units.
              </p>
            </div>

            {/* Badges summary */}
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              padding: '14px 20px',
              background: 'var(--bg-subtle)',
              borderRadius: '12px',
              width: '100%'
            }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}><strong>Department:</strong> {createdCourseObj.department}</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>•</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}><strong>Credits:</strong> {createdCourseObj.credits}</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>•</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}><strong>Regulation:</strong> {createdCourseObj.regulation}</span>
            </div>

            {/* Direct Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', marginTop: '10px' }}>
              <button
                onClick={() => setCurrentView('curriculum')}
                className="btn-primary"
                style={{ height: '42px', fontSize: '13.5px', justifyContent: 'center' }}
              >
                <BookOpen size={16} />
                <span>Configure Curriculum Units & Topics</span>
              </button>
              <button
                onClick={() => {
                  if (setActiveTab) setActiveTab('teacherMaterials');
                }}
                className="btn-outline"
                style={{ height: '42px', fontSize: '13.5px', justifyContent: 'center' }}
              >
                <FileText size={16} />
                <span>Upload Teaching Materials</span>
              </button>
              <button
                onClick={() => setCurrentView('list')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  padding: '8px 0'
                }}
              >
                Back to Master Course Catalog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Topic Edit Modal (matches Topic Editing.png) */}
      {editingTopic && (
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
            width: '520px',
            maxWidth: '100%',
            padding: '28px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)' }}>
                Edit Curriculum Topic
              </h3>
              <button
                onClick={() => setEditingTopic(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Topic Title *
                </label>
                <input
                  type="text"
                  className="search-input"
                  value={topicForm.title}
                  onChange={(e) => setTopicForm({ ...topicForm, title: e.target.value })}
                  style={{ height: '40px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Teaching Hours
                  </label>
                  <input
                    type="number"
                    className="search-input"
                    value={topicForm.hours}
                    onChange={(e) => setTopicForm({ ...topicForm, hours: e.target.value })}
                    style={{ height: '40px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Status
                  </label>
                  <select
                    value={topicForm.status}
                    onChange={(e) => setTopicForm({ ...topicForm, status: e.target.value })}
                    style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', background: 'var(--bg-input)', fontSize: '13px' }}
                  >
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Key Concepts & Specific Learning Objectives
                </label>
                <textarea
                  rows={3}
                  className="search-input"
                  placeholder="e.g. Memory barriers, Peterson's algorithm, CAS operations"
                  value={topicForm.keyConcepts}
                  onChange={(e) => setTopicForm({ ...topicForm, keyConcepts: e.target.value })}
                  style={{ height: 'auto', padding: '10px 14px', borderRadius: '10px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                onClick={handleSaveTopic}
                className="btn-primary"
                style={{ flex: 1, height: '40px', fontSize: '13px' }}
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingTopic(null)}
                className="btn-outline"
                style={{ height: '40px', fontSize: '13px' }}
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
