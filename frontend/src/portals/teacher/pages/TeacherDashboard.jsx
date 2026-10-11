import React from 'react';
import { GraduationCap, Sparkles, BookOpen, Users, Clock } from 'lucide-react';

export default function TeacherDashboard() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 0' }}>
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '16px',
        border: '1px solid var(--border)',
        padding: '36px',
        boxShadow: 'var(--shadow-sm)',
        textAlign: 'center'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          background: 'rgba(99, 102, 241, 0.1)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px auto'
        }}>
          <GraduationCap size={36} />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '10px' }}>
          Teacher Portal
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 28px auto', lineHeight: '1.6' }}>
          Teacher module scaffolding initialized. Curriculum management, classroom analytics, and AI teaching assistant features will be connected in Phase 2.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '32px',
          textAlign: 'left'
        }}>
          <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600', marginBottom: '6px' }}>
              <BookOpen size={18} />
              <span>Course Authoring</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Create modules, lesson plans, and interactive quizzes.</p>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)', fontWeight: '600', marginBottom: '6px' }}>
              <Users size={18} />
              <span>Student Tracking</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Review student progress, mastery scores, and submissions.</p>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: '600', marginBottom: '6px' }}>
              <Sparkles size={18} />
              <span>AI Teaching Assistant</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Automated quiz generation and diagnostic insights.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
