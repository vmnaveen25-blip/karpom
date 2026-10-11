import React from 'react';
import { ShieldCheck, Users, Server, Database, Activity } from 'lucide-react';

export default function AdminDashboard() {
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
          background: 'rgba(14, 165, 233, 0.1)',
          color: 'var(--secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px auto'
        }}>
          <ShieldCheck size={36} />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '10px' }}>
          Admin Portal
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 28px auto', lineHeight: '1.6' }}>
          Administrative console scaffolding initialized. User lifecycle, role permissions, and system configurations will be integrated in Phase 2.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '32px',
          textAlign: 'left'
        }}>
          <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)', fontWeight: '600', marginBottom: '6px' }}>
              <Users size={18} />
              <span>User Administration</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Manage accounts, credentials, and role assignments.</p>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600', marginBottom: '6px' }}>
              <Server size={18} />
              <span>System Health</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Monitor API latencies, worker tasks, and uptime metrics.</p>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: '600', marginBottom: '6px' }}>
              <Database size={18} />
              <span>Database Sync</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Audit logs, backups, and data migration pipelines.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
