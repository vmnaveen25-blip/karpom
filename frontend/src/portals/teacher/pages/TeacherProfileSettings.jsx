import React, { useState } from 'react';
import {
  CheckCircle2,
  Save
} from 'lucide-react';

export default function TeacherProfileSettings({ teacherData, setTeacherData }) {
  const profile = teacherData?.profile || {};
  const [form, setForm] = useState({
    name: profile.name || 'Dr. R. Kumar',
    designation: profile.designation || 'Associate Professor & Academic Coordinator',
    department: profile.department || 'Computer Science & Engineering',
    email: profile.email || 'r.kumar@college.edu',
    employeeId: profile.employeeId || 'EMP-CSE-2018-042',
    office: profile.office || 'Room 304, Academic Block B',
    phone: profile.phone || '+91 98765 43210',
    officeHours: profile.officeHours || 'Mon - Thu: 3:30 PM - 5:00 PM',
    bio: profile.bio || 'Ph.D. in Computer Science with 12+ years of teaching experience.'
  });

  const [preferences, setPreferences] = useState(
    profile.preferences || {
      emailNotifications: true,
      submissionAlerts: true,
      aiDraftAlerts: true,
      weeklyDigest: false
    }
  );

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (setTeacherData) {
      setTeacherData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          ...form,
          preferences
        }
      }));
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match.');
      return;
    }
    alert('Password updated successfully.');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 className="page-title">Profile & Settings</h1>
        <p className="page-subtitle">
          Manage faculty credentials, institutional office details, and instructional preferences.
        </p>
      </div>

      {saveSuccess && (
        <div className="fade-in" style={{
          padding: '12px 18px',
          borderRadius: '12px',
          background: 'var(--success-soft)',
          border: '1px solid var(--success)',
          color: 'var(--success)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '13.5px',
          fontWeight: '600'
        }}>
          <CheckCircle2 size={18} />
          <span>Profile information updated successfully!</span>
        </div>
      )}

      {/* Profile Form Card */}
      <div className="ui-card" style={{ padding: '32px', borderRadius: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px', borderBottom: '1px solid var(--border)', paddingBottom: '24px' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'var(--primary)',
            color: '#ffffff',
            fontWeight: '800',
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {form.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
              {form.name}
            </h2>
            <div style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '600', marginTop: '2px' }}>
              {form.designation}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {form.department} • Employee ID: {form.employeeId}
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                className="search-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{ height: '40px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Academic Designation *
              </label>
              <input
                type="text"
                required
                className="search-input"
                value={form.designation}
                onChange={(e) => setForm({ ...form, designation: e.target.value })}
                style={{ height: '40px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Department *
              </label>
              <input
                type="text"
                required
                className="search-input"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                style={{ height: '40px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Institutional Email *
              </label>
              <input
                type="email"
                required
                className="search-input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{ height: '40px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Office Location
              </label>
              <input
                type="text"
                className="search-input"
                value={form.office}
                onChange={(e) => setForm({ ...form, office: e.target.value })}
                style={{ height: '40px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Office Hours
              </label>
              <input
                type="text"
                className="search-input"
                value={form.officeHours}
                onChange={(e) => setForm({ ...form, officeHours: e.target.value })}
                style={{ height: '40px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Professional Biography & Research Interests
            </label>
            <textarea
              rows={3}
              className="search-input"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              style={{ height: 'auto', padding: '12px 14px', borderRadius: '12px' }}
            />
          </div>

          {/* Notification Preferences */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', marginTop: '10px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '14px' }}>
              Notification Preferences
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={preferences.submissionAlerts}
                  onChange={(e) => setPreferences({ ...preferences, submissionAlerts: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                />
                <span>Receive instant alert when a student submits an assignment</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={preferences.aiDraftAlerts}
                  onChange={(e) => setPreferences({ ...preferences, aiDraftAlerts: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                />
                <span>Notify when AI assessment drafts are extracted and ready for teacher approval</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={(e) => setPreferences({ ...preferences, emailNotifications: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                />
                <span>Forward direct student messages to institutional email</span>
              </label>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ height: '42px', padding: '0 24px', fontSize: '13.5px', alignSelf: 'flex-start', marginTop: '10px' }}>
            <Save size={16} />
            <span>Save Profile & Preferences</span>
          </button>
        </form>
      </div>

      {/* Password & Security Card */}
      <div className="ui-card" style={{ padding: '28px 32px', borderRadius: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
          Change Password
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '18px' }}>
          Keep your faculty account secure by updating your access passphrase regularly.
        </p>

        <form onSubmit={handlePasswordSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
              Current Password
            </label>
            <input
              type="password"
              required
              className="search-input"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              style={{ height: '40px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
              New Password
            </label>
            <input
              type="password"
              required
              className="search-input"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              style={{ height: '40px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
              Confirm Password
            </label>
            <input
              type="password"
              required
              className="search-input"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              style={{ height: '40px' }}
            />
          </div>
          <div>
            <button type="submit" className="btn-outline" style={{ height: '40px', width: '100%', fontSize: '13px' }}>
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
