import React, { useState, useMemo } from 'react';
import {
  ClipboardCheck,
  CheckSquare,
  Plus,
  Search,
  ArrowLeft,
  Download,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';

export default function AssignmentsAndAssessments({ teacherData, setTeacherData }) {
  // Tabs: 'assignments' | 'assessments'
  const [activeSubTab, setActiveSubTab] = useState('assignments');

  // Sub-views:
  // 'list' | 'inspectAssignment' | 'createAssignment' | 'reviewAI' | 'inspectAssessment' | 'createAssessment'
  const [subView, setSubView] = useState('list');
  const [selectedAssignment, setSelectedAssignment] = useState(teacherData.assignments[0] || null);
  const [selectedAssessment, setSelectedAssessment] = useState(teacherData.assessments[0] || null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');

  // Grading Drawer
  const [gradingSubmission, setGradingSubmission] = useState(null);
  const [gradeInput, setGradeInput] = useState('');
  const [remarksInput, setRemarksInput] = useState('');

  // Assignment Creation Form
  const [newAssignmentForm, setNewAssignmentForm] = useState({
    courseId: 'CSE301',
    title: '',
    section: 'Section A',
    totalMarks: 20,
    dueDate: '2026-10-25',
    dueTime: '23:59',
    instructions: '',
    attachment: ''
  });

  // Assessment Creation Form / AI Generator Modal
  const [aiGeneratorOpen, setAiGeneratorOpen] = useState(false);
  const [aiGenForm, setAiGenForm] = useState({
    courseId: 'CSE301',
    unitNumber: 3,
    groundingMaterial: 'Unit 3 Comprehensive Notes - Concurrency & Locks.pdf',
    questionCount: 6,
    difficulty: 'Balanced',
    bloomLevel: 'Apply & Analyze (L3-L4)'
  });
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Filtered Assignments
  const filteredAssignments = useMemo(() => {
    return (teacherData.assignments || []).filter((a) => {
      const matchCourse = courseFilter === 'All' || a.courseId === courseFilter;
      const matchSearch =
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCourse && matchSearch;
    });
  }, [teacherData.assignments, courseFilter, searchQuery]);

  // Filtered Assessments
  const filteredAssessments = useMemo(() => {
    return (teacherData.assessments || []).filter((ass) => {
      const matchCourse = courseFilter === 'All' || ass.courseId === courseFilter;
      const matchSearch =
        ass.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ass.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCourse && matchSearch;
    });
  }, [teacherData.assessments, courseFilter, searchQuery]);

  // Handle Save Grade
  const handleSaveGrade = () => {
    if (!selectedAssignment || !gradingSubmission) return;
    const updatedSubmissions = (selectedAssignment.submissions || []).map((s) => {
      if (s.id !== gradingSubmission.id) return s;
      return {
        ...s,
        grade: Number(gradeInput),
        remarks: remarksInput,
        status: 'Evaluated'
      };
    });

    const updatedAssignments = teacherData.assignments.map((a) => {
      if (a.id !== selectedAssignment.id) return a;
      return { ...a, submissions: updatedSubmissions };
    });

    if (setTeacherData) {
      setTeacherData((prev) => ({ ...prev, assignments: updatedAssignments }));
    }
    setSelectedAssignment((prev) => ({ ...prev, submissions: updatedSubmissions }));
    setGradingSubmission(null);
  };

  // Handle Question Approval in AI Review
  const handleToggleQuestionApproval = (questionId) => {
    if (!selectedAssessment || !selectedAssessment.reviewQuestions) return;
    const updatedQuestions = selectedAssessment.reviewQuestions.map((q) => {
      if (q.id !== questionId) return q;
      return {
        ...q,
        status: q.status === 'Approved' ? 'Pending Review' : 'Approved'
      };
    });

    const updatedAssessments = teacherData.assessments.map((ass) => {
      if (ass.id !== selectedAssessment.id) return ass;
      return { ...ass, reviewQuestions: updatedQuestions };
    });

    if (setTeacherData) {
      setTeacherData((prev) => ({ ...prev, assessments: updatedAssessments }));
    }
    setSelectedAssessment((prev) => ({ ...prev, reviewQuestions: updatedQuestions }));
  };

  // Handle Approve All & Publish
  const handleApproveAllAndPublish = () => {
    if (!selectedAssessment || !selectedAssessment.reviewQuestions) return;
    const approvedQuestions = selectedAssessment.reviewQuestions.map((q) => ({
      ...q,
      status: 'Approved'
    }));

    const updatedAssessments = teacherData.assessments.map((ass) => {
      if (ass.id !== selectedAssessment.id) return ass;
      return {
        ...ass,
        status: 'Scheduled',
        reviewQuestions: approvedQuestions
      };
    });

    if (setTeacherData) {
      setTeacherData((prev) => ({ ...prev, assessments: updatedAssessments }));
    }
    setSelectedAssessment((prev) => ({
      ...prev,
      status: 'Scheduled',
      reviewQuestions: approvedQuestions
    }));
    alert('All questions approved! Assessment published to Section A students.');
    setSubView('list');
  };

  // Handle Create Assignment
  const handleCreateAssignmentSubmit = (e) => {
    e.preventDefault();
    const crs = (teacherData.courses || []).find((c) => c.id === newAssignmentForm.courseId);
    const newAss = {
      id: `AJP-A0${(teacherData.assignments || []).length + 1}`,
      title: newAssignmentForm.title,
      courseId: newAssignmentForm.courseId,
      courseCode: crs ? crs.code : newAssignmentForm.courseId,
      courseTitle: crs ? crs.title : 'Course Study',
      section: newAssignmentForm.section,
      dueDate: `${newAssignmentForm.dueDate} • ${newAssignmentForm.dueTime}`,
      dueTimestamp: `${newAssignmentForm.dueDate}T${newAssignmentForm.dueTime}:00`,
      totalMarks: Number(newAssignmentForm.totalMarks),
      submittedCount: 0,
      totalCount: 42,
      status: 'Open',
      instructions: newAssignmentForm.instructions,
      attachment: newAssignmentForm.attachment || 'Assignment_Guidelines.pdf',
      submissions: []
    };

    if (setTeacherData) {
      setTeacherData((prev) => ({
        ...prev,
        assignments: [newAss, ...(prev.assignments || [])]
      }));
    }
    setSubView('list');
    setNewAssignmentForm({
      courseId: 'CSE301',
      title: '',
      section: 'Section A',
      totalMarks: 20,
      dueDate: '2026-10-25',
      dueTime: '23:59',
      instructions: '',
      attachment: ''
    });
  };

  return (
    <div className="fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Level 1: List View (Dual Tabs: Assignments vs Assessments) */}
      {subView === 'list' && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Main Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 className="page-title">Assignments & Assessments</h1>
              <p className="page-subtitle">
                Coursework grading, submission review, AI-grounded quiz generation, and student diagnostic analytics.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {activeSubTab === 'assignments' ? (
                <button
                  onClick={() => setSubView('createAssignment')}
                  className="btn-primary"
                  style={{ height: '40px', padding: '0 18px', fontSize: '13.5px' }}
                >
                  <Plus size={16} />
                  <span>Create Assignment</span>
                </button>
              ) : (
                <button
                  onClick={() => setAiGeneratorOpen(true)}
                  className="btn-primary"
                  style={{ height: '40px', padding: '0 18px', fontSize: '13.5px' }}
                >
                  <Sparkles size={16} />
                  <span>Generate with AI Tutor</span>
                </button>
              )}
            </div>
          </div>

          {/* Primary Dual Tab Switcher */}
          <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '2px' }}>
            <button
              onClick={() => setActiveSubTab('assignments')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                border: 'none',
                background: 'none',
                color: activeSubTab === 'assignments' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: activeSubTab === 'assignments' ? '700' : '500',
                fontSize: '15px',
                borderBottom: activeSubTab === 'assignments' ? '2.5px solid var(--primary)' : 'none',
                cursor: 'pointer'
              }}
            >
              <ClipboardCheck size={18} />
              <span>Assignments</span>
              <span style={{
                padding: '2px 8px',
                borderRadius: '10px',
                background: activeSubTab === 'assignments' ? 'var(--primary-soft)' : 'var(--bg-subtle)',
                fontSize: '12px'
              }}>
                {(teacherData.assignments || []).length}
              </span>
            </button>

            <button
              onClick={() => setActiveSubTab('assessments')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                border: 'none',
                background: 'none',
                color: activeSubTab === 'assessments' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: activeSubTab === 'assessments' ? '700' : '500',
                fontSize: '15px',
                borderBottom: activeSubTab === 'assessments' ? '2.5px solid var(--primary)' : 'none',
                cursor: 'pointer'
              }}
            >
              <CheckSquare size={18} />
              <span>Assessments & Quizzes</span>
              <span style={{
                padding: '2px 8px',
                borderRadius: '10px',
                background: activeSubTab === 'assessments' ? 'var(--primary-soft)' : 'var(--bg-subtle)',
                fontSize: '12px'
              }}>
                {(teacherData.assessments || []).length}
              </span>
            </button>
          </div>

          {/* TAB 1: ASSIGNMENTS */}
          {activeSubTab === 'assignments' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Metrics cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div className="ui-card" style={{ padding: '18px 20px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total Assignments</div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px' }}>
                    {(teacherData.assignments || []).length}
                  </div>
                </div>
                <div className="ui-card" style={{ padding: '18px 20px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Active / Open</div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)', marginTop: '4px' }}>
                    {(teacherData.assignments || []).filter((a) => a.status === 'Open').length}
                  </div>
                </div>
                <div className="ui-card" style={{ padding: '18px 20px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total Submissions</div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--success)', marginTop: '4px' }}>
                    50
                  </div>
                </div>
                <div className="ui-card" style={{ padding: '18px 20px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Pending Evaluation</div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--warning)', marginTop: '4px' }}>
                    1
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-subtle)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
                  {['All', 'CSE301', 'CSE303'].map((code) => (
                    <button
                      key={code}
                      onClick={() => setCourseFilter(code)}
                      style={{
                        padding: '7px 14px',
                        borderRadius: '8px',
                        border: 'none',
                        background: courseFilter === code ? 'var(--bg-card)' : 'transparent',
                        color: courseFilter === code ? 'var(--primary)' : 'var(--text-muted)',
                        fontWeight: courseFilter === code ? '600' : '500',
                        fontSize: '12.5px',
                        cursor: 'pointer',
                        boxShadow: courseFilter === code ? 'var(--shadow-xs)' : 'none'
                      }}
                    >
                      {code === 'All' ? 'All Courses' : code}
                    </button>
                  ))}
                </div>

                <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search assignments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ paddingLeft: '38px', height: '38px', fontSize: '13px' }}
                  />
                </div>
              </div>

              {/* Assignments List Table */}
              <div className="ui-card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                        <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>CODE & TITLE</th>
                        <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>COURSE & SECTION</th>
                        <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>DUE DATE</th>
                        <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>MARKS</th>
                        <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>SUBMISSIONS</th>
                        <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>STATUS</th>
                        <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px', textAlign: 'right' }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAssignments.map((a) => (
                        <tr
                          key={a.id}
                          style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s ease' }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-subtle)')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                          <td style={{ padding: '14px 20px' }}>
                            <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{a.title}</div>
                            <div style={{ fontSize: '12px', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>{a.id}</div>
                          </td>
                          <td style={{ padding: '14px 20px' }}>
                            <div style={{ color: 'var(--text-main)', fontWeight: '500' }}>{a.courseTitle}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{a.courseCode} • {a.section}</div>
                          </td>
                          <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                            {a.dueDate}
                          </td>
                          <td style={{ padding: '14px 20px', fontWeight: '600', color: 'var(--text-main)' }}>
                            {a.totalMarks} Marks
                          </td>
                          <td style={{ padding: '14px 20px' }}>
                            <div style={{ fontWeight: '700', color: 'var(--primary)' }}>
                              {a.submittedCount} / {a.totalCount}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                              {Math.round((a.submittedCount / a.totalCount) * 100)}% Submitted
                            </div>
                          </td>
                          <td style={{ padding: '14px 20px' }}>
                            <span style={{
                              padding: '3px 8px',
                              borderRadius: '12px',
                              fontSize: '11px',
                              fontWeight: '600',
                              background: a.status === 'Open' ? 'var(--primary-soft)' : 'var(--success-soft)',
                              color: a.status === 'Open' ? 'var(--primary)' : 'var(--success)'
                            }}>
                              {a.status}
                            </span>
                          </td>
                          <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                            <button
                              onClick={() => {
                                setSelectedAssignment(a);
                                setSubView('inspectAssignment');
                              }}
                              className="btn-primary"
                              style={{ padding: '6px 14px', fontSize: '12.5px', height: '32px' }}
                            >
                              Inspect Submissions
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ASSESSMENTS */}
          {activeSubTab === 'assessments' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div className="ui-card" style={{ padding: '18px 20px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total Assessments</div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px' }}>
                    {(teacherData.assessments || []).length}
                  </div>
                </div>
                <div className="ui-card" style={{ padding: '18px 20px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Pending AI Approval</div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--warning)', marginTop: '4px' }}>
                    1
                  </div>
                </div>
                <div className="ui-card" style={{ padding: '18px 20px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Scheduled</div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)', marginTop: '4px' }}>
                    1
                  </div>
                </div>
                <div className="ui-card" style={{ padding: '18px 20px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Avg Cohort Score</div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--success)', marginTop: '4px' }}>
                    82.0%
                  </div>
                </div>
              </div>

              {/* Assessments List Table */}
              <div className="ui-card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                        <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>ASSESSMENT TITLE</th>
                        <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>COURSE</th>
                        <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>FORMAT</th>
                        <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>DATE / TIME</th>
                        <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>TOTAL MARKS</th>
                        <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>STATUS</th>
                        <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px', textAlign: 'right' }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAssessments.map((ass) => (
                        <tr
                          key={ass.id}
                          style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s ease' }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-subtle)')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                          <td style={{ padding: '14px 20px' }}>
                            <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{ass.title}</div>
                            <div style={{ fontSize: '12px', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>{ass.id}</div>
                          </td>
                          <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>
                            {ass.courseCode}
                          </td>
                          <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>
                            {ass.type} ({ass.duration})
                          </td>
                          <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                            {ass.date}
                          </td>
                          <td style={{ padding: '14px 20px', fontWeight: '600', color: 'var(--text-main)' }}>
                            {ass.totalMarks} Marks
                          </td>
                          <td style={{ padding: '14px 20px' }}>
                            <span style={{
                              padding: '3px 8px',
                              borderRadius: '12px',
                              fontSize: '11px',
                              fontWeight: '600',
                              background:
                                ass.status === 'Completed'
                                  ? 'var(--success-soft)'
                                  : ass.status === 'Pending Teacher Approval'
                                  ? 'var(--warning-soft)'
                                  : 'var(--primary-soft)',
                              color:
                                ass.status === 'Completed'
                                  ? 'var(--success)'
                                  : ass.status === 'Pending Teacher Approval'
                                  ? 'var(--warning)'
                                  : 'var(--primary)'
                            }}>
                              {ass.status}
                            </span>
                          </td>
                          <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                            {ass.status === 'Pending Teacher Approval' ? (
                              <button
                                onClick={() => {
                                  setSelectedAssessment(ass);
                                  setSubView('reviewAI');
                                }}
                                className="btn-primary"
                                style={{ padding: '6px 14px', fontSize: '12.5px', height: '32px' }}
                              >
                                <Sparkles size={14} />
                                <span>Review AI Questions</span>
                              </button>
                            ) : ass.status === 'Completed' ? (
                              <button
                                onClick={() => {
                                  setSelectedAssessment(ass);
                                  setSubView('inspectAssessment');
                                }}
                                className="btn-primary"
                                style={{ padding: '6px 14px', fontSize: '12.5px', height: '32px' }}
                              >
                                <span>Inspect Results</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => alert(`Assessment scheduled for ${ass.date}`)}
                                className="btn-outline"
                                style={{ padding: '6px 14px', fontSize: '12.5px', height: '32px' }}
                              >
                                <span>View Schedule</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Level 2: Assignment Inspection (matches Assignment Inspection.png) */}
      {subView === 'inspectAssignment' && selectedAssignment && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Breadcrumb Back */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setSubView('list')}
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
              <span>Back to Assignments</span>
            </button>
            <span style={{ color: 'var(--border)' }}>/</span>
            <span style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '600' }}>
              {selectedAssignment.id} Submissions
            </span>
          </div>

          {/* Header Card */}
          <div className="ui-card" style={{ padding: '24px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)' }}>
                {selectedAssignment.courseCode} • {selectedAssignment.section}
              </span>
              <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px' }}>
                {selectedAssignment.title}
              </h1>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Due: {selectedAssignment.dueDate} • Max Marks: {selectedAssignment.totalMarks}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => alert('Downloading all student submission ZIP archives...')}
                className="btn-outline"
                style={{ height: '38px', padding: '0 14px', fontSize: '13px' }}
              >
                <Download size={15} />
                <span>Download All Submissions</span>
              </button>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="ui-card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>ROLL NO</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>STUDENT NAME</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>SUBMITTED ON</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>FILE</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>SIMILARITY</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>GRADE</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px', textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedAssignment.submissions || []).map((sub) => (
                    <tr
                      key={sub.id}
                      style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s ease' }}
                    >
                      <td style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-main)' }}>
                        {sub.rollNo}
                      </td>
                      <td style={{ padding: '14px 20px', fontWeight: '600', color: 'var(--text-main)' }}>
                        {sub.name}
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-muted)' }}>
                        {sub.submittedAt}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ fontSize: '12.5px', color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer' }}>
                          {sub.file}
                        </span>
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '10px',
                          fontSize: '11px',
                          fontWeight: '700',
                          background: sub.plagiarism < 5 ? 'var(--success-soft)' : 'var(--warning-soft)',
                          color: sub.plagiarism < 5 ? 'var(--success)' : 'var(--warning)'
                        }}>
                          {sub.plagiarism}% Match
                        </span>
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        {sub.grade !== null ? (
                          <div style={{ fontWeight: '700', color: 'var(--success)' }}>
                            {sub.grade} / {selectedAssignment.totalMarks}
                          </div>
                        ) : (
                          <span style={{ color: 'var(--warning)', fontSize: '12px', fontWeight: '600' }}>Pending</span>
                        )}
                      </td>
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <button
                          onClick={() => {
                            setGradingSubmission(sub);
                            setGradeInput(sub.grade !== null ? String(sub.grade) : '');
                            setRemarksInput(sub.remarks || '');
                          }}
                          className="btn-primary"
                          style={{ padding: '5px 12px', fontSize: '12px', height: '30px' }}
                        >
                          {sub.grade !== null ? 'Edit Grade' : 'Grade'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Level 3: AI Assessment Review (matches Assessment Review.png) */}
      {subView === 'reviewAI' && selectedAssessment && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Breadcrumb Back */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setSubView('list')}
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
              <span>Back to Assessments</span>
            </button>
            <span style={{ color: 'var(--border)' }}>/</span>
            <span style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '600' }}>
              AI Assessment Question Review
            </span>
          </div>

          {/* Header & Approval Controls */}
          <div className="ui-card" style={{ padding: '24px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={22} color="var(--primary)" />
                <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                  {selectedAssessment.title}
                </h1>
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginTop: '6px' }}>
                Teacher Verification Phase: 6 generated questions awaiting approval before publishing to Section A.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleApproveAllAndPublish}
                className="btn-primary"
                style={{ height: '40px', padding: '0 18px', fontSize: '13px' }}
              >
                <CheckCircle2 size={16} />
                <span>Approve All & Publish Assessment</span>
              </button>
            </div>
          </div>

          {/* Grounding Source Alert (Strict requirement) */}
          <div style={{
            padding: '16px 20px',
            borderRadius: '12px',
            background: 'var(--primary-soft)',
            border: '1px solid var(--border-active)',
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <Sparkles size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: '1.5' }}>
              <strong>Approved Grounding Material:</strong> Questions were extracted strictly from{' '}
              <span style={{ textDecoration: 'underline', fontWeight: '600' }}>
                {selectedAssessment.groundingSource}
              </span>
              . No unapproved external knowledge was consulted. Review and verify the factual citations below before release.
            </div>
          </div>

          {/* Generated Questions List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(selectedAssessment.reviewQuestions || []).map((q) => (
              <div
                key={q.id}
                className="ui-card"
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  border: q.status === 'Approved' ? '1px solid #10b981' : '1px solid var(--border)',
                  background: 'var(--bg-card)'
                }}
              >
                {/* Question Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: 'var(--primary-soft)',
                      color: 'var(--primary)',
                      fontWeight: '800',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      Q{q.number}
                    </span>
                    <span style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '6px', background: 'var(--bg-subtle)', fontWeight: '600', color: 'var(--text-secondary)' }}>
                      {q.bloom}
                    </span>
                    <span style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '6px', background: 'var(--bg-subtle)', fontWeight: '600', color: 'var(--text-secondary)' }}>
                      Difficulty: {q.difficulty}
                    </span>
                  </div>

                  {/* Status & Approval Toggle */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={() => handleToggleQuestionApproval(q.id)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        border: 'none',
                        background: q.status === 'Approved' ? 'var(--success-soft)' : 'var(--bg-subtle)',
                        color: q.status === 'Approved' ? 'var(--success)' : 'var(--text-muted)',
                        fontWeight: '700',
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <CheckCircle2 size={14} />
                      <span>{q.status === 'Approved' ? 'Approved' : 'Approve Question'}</span>
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)', lineHeight: '1.5', marginBottom: '16px' }}>
                  {q.text}
                </div>

                {/* Grounding Source Citation */}
                <div style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: 'var(--bg-subtle)',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {q.sourceCitation}
                </div>

                {/* Options List */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px', marginBottom: '14px' }}>
                  {q.options.map((opt) => (
                    <div
                      key={opt.key}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: opt.isCorrect ? '1.5px solid #10b981' : '1px solid var(--border)',
                        background: opt.isCorrect ? 'var(--success-soft)' : 'var(--bg-card)',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'flex-start'
                      }}
                    >
                      <span style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: opt.isCorrect ? 'var(--success)' : 'var(--bg-subtle)',
                        color: opt.isCorrect ? '#ffffff' : 'var(--text-main)',
                        fontWeight: '700',
                        fontSize: '11px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {opt.key}
                      </span>
                      <span style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: opt.isCorrect ? '600' : '400' }}>
                        {opt.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Explanation */}
                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
                  <strong>Pedagogical Explanation:</strong> {q.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Level 4: Assessment Inspection Results (matches Assessment Inspection Page.png) */}
      {subView === 'inspectAssessment' && selectedAssessment && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setSubView('list')}
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
              <span>Back to Assessments</span>
            </button>
            <span style={{ color: 'var(--border)' }}>/</span>
            <span style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '600' }}>
              {selectedAssessment.title} Performance
            </span>
          </div>

          {/* Performance Overview Banner */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
            <div className="ui-card" style={{ padding: '16px 20px', borderRadius: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Average Score</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)', marginTop: '4px' }}>
                {selectedAssessment.avgScore || 16.4} / {selectedAssessment.totalMarks}
              </div>
            </div>
            <div className="ui-card" style={{ padding: '16px 20px', borderRadius: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Pass Rate</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--success)', marginTop: '4px' }}>
                {selectedAssessment.passRate || '95.2%'}
              </div>
            </div>
            <div className="ui-card" style={{ padding: '16px 20px', borderRadius: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Highest Score</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px' }}>
                {selectedAssessment.highestScore || 20} / {selectedAssessment.totalMarks}
              </div>
            </div>
            <div className="ui-card" style={{ padding: '16px 20px', borderRadius: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Lowest Score</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--danger)', marginTop: '4px' }}>
                {selectedAssessment.lowestScore || 11} / {selectedAssessment.totalMarks}
              </div>
            </div>
          </div>

          {/* Student Results Table */}
          <div className="ui-card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>ROLL NO</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>STUDENT NAME</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>CORRECT</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>SCORE</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>TIME SPENT</th>
                    <th style={{ padding: '14px 20px', fontWeight: '600', fontSize: '12px' }}>SUBMITTED</th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedAssessment.results || []).map((res) => (
                    <tr key={res.rollNo} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: '12.5px', fontWeight: '600' }}>
                        {res.rollNo}
                      </td>
                      <td style={{ padding: '14px 20px', fontWeight: '600', color: 'var(--text-main)' }}>
                        {res.name}
                      </td>
                      <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>
                        {res.correctCount}
                      </td>
                      <td style={{ padding: '14px 20px', fontWeight: '700', color: 'var(--success)' }}>
                        {res.score} / {selectedAssessment.totalMarks}
                      </td>
                      <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>
                        {res.timeSpent}
                      </td>
                      <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>
                        {res.submittedAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Level 5: Create Assignment Modal */}
      {subView === 'createAssignment' && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setSubView('list')}
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
              <span>Back to Assignments</span>
            </button>
          </div>

          <div className="ui-card" style={{ padding: '32px', borderRadius: '16px' }}>
            <h1 className="page-title" style={{ fontSize: '22px', marginBottom: '4px' }}>Create New Assignment</h1>
            <p className="page-subtitle" style={{ marginBottom: '24px' }}>
              Publish coursework problem sheets, deadlines, and submission parameters to class sections.
            </p>

            <form onSubmit={handleCreateAssignmentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Target Course *
                  </label>
                  <select
                    value={newAssignmentForm.courseId}
                    onChange={(e) => setNewAssignmentForm({ ...newAssignmentForm, courseId: e.target.value })}
                    style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-input)', fontSize: '13px' }}
                  >
                    {(teacherData.courses || []).map((c) => (
                      <option key={c.id} value={c.id}>{c.code} — {c.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Section
                  </label>
                  <select
                    value={newAssignmentForm.section}
                    onChange={(e) => setNewAssignmentForm({ ...newAssignmentForm, section: e.target.value })}
                    style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-input)', fontSize: '13px' }}
                  >
                    <option value="Section A">Section A</option>
                    <option value="Section B">Section B</option>
                    <option value="Section C">Section C</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Assignment Title *
                </label>
                <input
                  type="text"
                  required
                  className="search-input"
                  placeholder="e.g. Unit 4: Java Reactive Stream Pipelines Implementation"
                  value={newAssignmentForm.title}
                  onChange={(e) => setNewAssignmentForm({ ...newAssignmentForm, title: e.target.value })}
                  style={{ height: '40px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Max Marks
                  </label>
                  <input
                    type="number"
                    className="search-input"
                    value={newAssignmentForm.totalMarks}
                    onChange={(e) => setNewAssignmentForm({ ...newAssignmentForm, totalMarks: e.target.value })}
                    style={{ height: '40px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="search-input"
                    value={newAssignmentForm.dueDate}
                    onChange={(e) => setNewAssignmentForm({ ...newAssignmentForm, dueDate: e.target.value })}
                    style={{ height: '40px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Due Time
                  </label>
                  <input
                    type="time"
                    className="search-input"
                    value={newAssignmentForm.dueTime}
                    onChange={(e) => setNewAssignmentForm({ ...newAssignmentForm, dueTime: e.target.value })}
                    style={{ height: '40px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Problem Statement & Instructions
                </label>
                <textarea
                  rows={4}
                  className="search-input"
                  placeholder="Specify problem constraints, evaluation rubrics, allowed dependencies..."
                  value={newAssignmentForm.instructions}
                  onChange={(e) => setNewAssignmentForm({ ...newAssignmentForm, instructions: e.target.value })}
                  style={{ height: 'auto', padding: '12px 14px', borderRadius: '12px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button type="submit" className="btn-primary" style={{ height: '42px', padding: '0 24px', fontSize: '13.5px' }}>
                  Publish Assignment
                </button>
                <button
                  type="button"
                  onClick={() => setSubView('list')}
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

      {/* Grading Drawer / Modal */}
      {gradingSubmission && (
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
            width: '540px',
            maxWidth: '100%',
            padding: '28px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
                  Grade Submission: {gradingSubmission.name}
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {gradingSubmission.rollNo} • {gradingSubmission.file}
                </div>
              </div>
              <button
                onClick={() => setGradingSubmission(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* AI Preliminary Evaluation note */}
            <div style={{
              padding: '14px',
              borderRadius: '10px',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              fontSize: '12.5px',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', color: 'var(--primary)', marginBottom: '4px' }}>
                <Sparkles size={14} />
                <span>AI Automated Code Analysis</span>
              </div>
              <div>{gradingSubmission.aiFeedback}</div>
              <div style={{ marginTop: '6px', fontWeight: '600' }}>
                Similarity index: {gradingSubmission.plagiarism}%
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                Assigned Grade (Max {selectedAssignment.totalMarks}) *
              </label>
              <input
                type="number"
                max={selectedAssignment.totalMarks}
                min={0}
                className="search-input"
                value={gradeInput}
                onChange={(e) => setGradeInput(e.target.value)}
                style={{ height: '40px', fontSize: '14px', fontWeight: '700' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                Teacher Remarks & Improvement Suggestions
              </label>
              <textarea
                rows={3}
                className="search-input"
                placeholder="Add constructive comments for the student..."
                value={remarksInput}
                onChange={(e) => setRemarksInput(e.target.value)}
                style={{ height: 'auto', padding: '10px 14px', borderRadius: '10px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                onClick={handleSaveGrade}
                className="btn-primary"
                style={{ flex: 1, height: '40px', fontSize: '13px' }}
              >
                Save Grade & Feedback
              </button>
              <button
                onClick={() => setGradingSubmission(null)}
                className="btn-outline"
                style={{ height: '40px', fontSize: '13px' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Assessment Generator Modal */}
      {aiGeneratorOpen && (
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
            width: '540px',
            maxWidth: '100%',
            padding: '28px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={22} color="var(--primary)" />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
                  Generate Assessment with AI Tutor
                </h3>
              </div>
              <button
                onClick={() => setAiGeneratorOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{
              padding: '12px 14px',
              borderRadius: '10px',
              background: 'var(--primary-soft)',
              fontSize: '12.5px',
              color: 'var(--text-main)',
              lineHeight: '1.5'
            }}>
              <strong>Grounding Policy:</strong> The AI assessment generator will only extract questions and correct options from your approved course materials.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Target Course
                </label>
                <select
                  value={aiGenForm.courseId}
                  onChange={(e) => setAiGenForm({ ...aiGenForm, courseId: e.target.value })}
                  style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-input)', fontSize: '13px' }}
                >
                  {(teacherData.courses || []).map((c) => (
                    <option key={c.id} value={c.id}>{c.code} — {c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Grounding Source Material
                </label>
                <select
                  value={aiGenForm.groundingMaterial}
                  onChange={(e) => setAiGenForm({ ...aiGenForm, groundingMaterial: e.target.value })}
                  style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-input)', fontSize: '13px' }}
                >
                  <option value="Unit 3 Comprehensive Notes - Concurrency & Locks.pdf">
                    Unit 3 Comprehensive Notes - Concurrency & Locks.pdf (Approved)
                  </option>
                  <option value="Java Collections Framework Complete Guide.pdf">
                    Java Collections Framework Complete Guide.pdf (Approved)
                  </option>
                  <option value="JVM Memory Architecture & Class Loader Subsystem.pdf">
                    JVM Memory Architecture & Class Loader Subsystem.pdf (Approved)
                  </option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    value={aiGenForm.questionCount}
                    onChange={(e) => setAiGenForm({ ...aiGenForm, questionCount: e.target.value })}
                    className="search-input"
                    style={{ height: '40px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Difficulty Distribution
                  </label>
                  <select
                    value={aiGenForm.difficulty}
                    onChange={(e) => setAiGenForm({ ...aiGenForm, difficulty: e.target.value })}
                    style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-input)', fontSize: '13px' }}
                  >
                    <option value="Balanced">Balanced (Easy, Med, Hard)</option>
                    <option value="Rigorous">Advanced / Rigorous</option>
                    <option value="Diagnostic">Fundamental Diagnostic</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                disabled={isGeneratingAi}
                onClick={() => {
                  setIsGeneratingAi(true);
                  setTimeout(() => {
                    setIsGeneratingAi(false);
                    setAiGeneratorOpen(false);
                    // Select AI assessment and navigate to reviewAI view
                    const aiAss = (teacherData.assessments || []).find((a) => a.id === 'AJP-AI01') || teacherData.assessments[0];
                    setSelectedAssessment(aiAss);
                    setActiveSubTab('assessments');
                    setSubView('reviewAI');
                  }, 600);
                }}
                className="btn-primary"
                style={{ flex: 1, height: '42px', fontSize: '13.5px' }}
              >
                <Sparkles size={16} />
                <span>{isGeneratingAi ? 'Extracting from Notes...' : 'Generate & Proceed to Review'}</span>
              </button>
              <button
                onClick={() => setAiGeneratorOpen(false)}
                className="btn-outline"
                style={{ height: '42px', fontSize: '13.5px' }}
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
