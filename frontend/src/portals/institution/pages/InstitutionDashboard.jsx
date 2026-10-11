import React from 'react';
import { Building, Award, BarChart3, Globe, ShieldAlert } from 'lucide-react';

export default function InstitutionDashboard() {
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
          background: 'rgba(16, 185, 129, 0.1)',
          color: '#10b981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px auto'
        }}>
          <Building size={36} />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '10px' }}>
          Institution Portal
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 28px auto', lineHeight: '1.6' }}>
          Campus-wide governance and multi-department analytics module scaffolding. Department provisioning and accreditation reporting will be linked in Phase 2.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '32px',
          textAlign: 'left'
        }}>
          <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: '600', marginBottom: '6px' }}>
              <BarChart3 size={18} />
              <span>Campus Analytics</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Cross-department pass rates, retention metrics, and engagement.</p>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600', marginBottom: '6px' }}>
              <Award size={18} />
              <span>Accreditation & Audits</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Automated compliance documentation and NAAC/ABET exports.</p>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)', fontWeight: '600', marginBottom: '6px' }}>
              <Globe size={18} />
              <span>Multi-Tenant Tenants</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Manage branches, faculties, and licensing boundaries.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
