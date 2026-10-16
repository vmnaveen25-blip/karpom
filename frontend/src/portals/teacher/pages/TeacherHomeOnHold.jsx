import React from 'react';
import {
  Home,
  Users,
  BookOpen,
  ClipboardCheck,
  Calendar,
  ArrowRight
} from 'lucide-react';

export default function TeacherHomeOnHold({ teacherData, setActiveTab }) {
  return (
    <div className="fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Welcome Banner */}
      <div className="ui-card" style={{
        padding: '36px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)',
        border: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '12px', background: 'var(--primary-soft)', color: 'var(--primary)', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>
            TEACHER PORTAL V2
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
            Welcome, {teacherData.profile?.name || 'Professor'}!
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '580px', lineHeight: '1.5' }}>
            Home feed overview is currently on hold. Use the navigation sidebar or quick shortcuts below to manage classes, curriculums, and grounded AI assessments.
          </p>
        </div>

        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'var(--primary-soft)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Home size={30} />
        </div>
      </div>

      {/* Quick Access Modules */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <div
          onClick={() => setActiveTab('teacherClasses')}
          className="ui-card"
          style={{ padding: '24px', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s ease' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </div>
            <ArrowRight size={18} color="var(--text-muted)" />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>
            My Classes & Students
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            Inspect class sections, student rosters, attendance ratios, and individual records.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('teacherCourses')}
          className="ui-card"
          style={{ padding: '24px', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s ease' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={20} />
            </div>
            <ArrowRight size={18} color="var(--text-muted)" />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>
            Courses & Curriculum
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            Manage master department syllabi, unit topics, Bloom's outcomes, and course specs.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('teacherAssignments')}
          className="ui-card"
          style={{ padding: '24px', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s ease' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ClipboardCheck size={20} />
            </div>
            <ArrowRight size={18} color="var(--text-muted)" />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>
            Assignments & Assessments
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            Review student submissions, grade coursework, and verify AI-generated question banks.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('teacherSchedule')}
          className="ui-card"
          style={{ padding: '24px', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s ease' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={20} />
            </div>
            <ArrowRight size={18} color="var(--text-muted)" />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>
            Live Teaching & Schedule
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            College classroom timetable, lecture halls, and scheduled academic dates.
          </p>
        </div>
      </div>
    </div>
  );
}
