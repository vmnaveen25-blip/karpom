import React from 'react';
import {
  TrendingUp,
  BarChart3,
  AlertTriangle,
  Award
} from 'lucide-react';

export default function StudentProgressOnHold() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 0' }}>
      <div className="ui-card" style={{
        padding: '48px 36px',
        borderRadius: '20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          background: 'var(--primary-soft)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <TrendingUp size={38} />
        </div>

        <div>
          <span style={{
            padding: '4px 12px',
            borderRadius: '12px',
            background: 'var(--warning-soft)',
            color: 'var(--warning)',
            fontWeight: '700',
            fontSize: '12px',
            display: 'inline-block',
            marginBottom: '10px'
          }}>
            FEATURE ON HOLD • PHASE 2
          </span>
          <h1 className="page-title" style={{ fontSize: '24px' }}>
            Student Progress & Analytics
          </h1>
          <p className="page-subtitle" style={{ maxWidth: '580px', margin: '8px auto 0 auto', lineHeight: '1.6' }}>
            Comprehensive student cohort mastery analytics, diagnostic test performance heatmaps, and early at-risk intervention tools are scheduled for upcoming integration.
          </p>
        </div>

        {/* Feature Preview Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          width: '100%',
          marginTop: '16px',
          textAlign: 'left'
        }}>
          <div style={{ padding: '18px', borderRadius: '12px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '700', marginBottom: '6px' }}>
              <BarChart3 size={18} />
              <span>Cohort Mastery</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.45' }}>
              Real-time distribution curves across units, topics, and Bloom's taxonomy cognitive levels.
            </p>
          </div>

          <div style={{ padding: '18px', borderRadius: '12px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontWeight: '700', marginBottom: '6px' }}>
              <AlertTriangle size={18} />
              <span>At-Risk Detection</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.45' }}>
              Early warning indicators tracking students falling below 80% attendance or assessment thresholds.
            </p>
          </div>

          <div style={{ padding: '18px', borderRadius: '12px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: '700', marginBottom: '6px' }}>
              <Award size={18} />
              <span>Outcome Mapping</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.45' }}>
              Direct alignment between student assessment scores and Course Outcomes (CO1 to CO5).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
