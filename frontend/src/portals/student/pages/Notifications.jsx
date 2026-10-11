import React, { useState } from 'react';
import {
  Bell,
  Check,
  MoreVertical,
  BookOpen,
  FileText,
  Clock,
  Sparkles,
  Download,
  ExternalLink,
  User,
  ArrowRight
} from 'lucide-react';

export default function Notifications({ studentData, setActiveTab }) {
  const { notifications } = studentData;
  const [selectedNotif, setSelectedNotif] = useState(notifications[0]);
  const [activeTabSub, setActiveTabSub] = useState('All');

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Title & Mark as read */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">Stay updated with important announcements, assignments, and more.</p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-secondary" style={{ gap: '6px' }}>
            <Check size={15} />
            <span>Mark all as read</span>
          </button>
          <button className="icon-btn-circle">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="tabs-pill-row">
        {[
          { id: 'All', label: 'All (4)' },
          { id: 'Course Updates', label: 'Course Updates' },
          { id: 'Assignments', label: 'Assignments' },
          { id: 'Assessments', label: 'Assessments' },
          { id: 'Announcements', label: 'Announcements' }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`tab-pill-btn ${activeTabSub === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTabSub(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Left List + Right Detail View */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 380px',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left: Notifications List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.map((n) => {
            const isSelected = selectedNotif?.id === n.id;
            return (
              <div
                key={n.id}
                onClick={() => setSelectedNotif(n)}
                className="ui-card"
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  cursor: 'pointer',
                  border: isSelected ? '1.5px solid #6366f1' : '1px solid var(--border)',
                  background: isSelected ? 'var(--bg-card)' : 'var(--bg-card)'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#ede9fe',
                  color: '#6366f1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <BookOpen size={20} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--text-main)' }}>
                      {n.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{n.time}</span>
                      {n.unread && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1' }} />}
                    </div>
                  </div>

                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                    {n.body.length > 80 ? n.body.substring(0, 80) + '...' : n.body}
                  </p>

                  <div style={{ display: 'flex', gap: '12px', fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '8px' }}>
                    <span>{n.course}</span>
                    <span>•</span>
                    <span>{n.sender}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Notification Detail */}
        {selectedNotif && (
          <div className="ui-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#ede9fe',
                color: '#6366f1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <BookOpen size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main)' }}>
                  {selectedNotif.title}
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {selectedNotif.course}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px' }}>
                  {selectedNotif.date || selectedNotif.time}
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div style={{
              fontSize: '13.5px',
              lineHeight: 1.6,
              color: 'var(--text-main)',
              whiteSpace: 'pre-wrap',
              borderTop: '1px solid var(--border)',
              paddingTop: '16px'
            }}>
              {selectedNotif.body}
            </div>

            {/* Sender card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--bg-subtle)', borderRadius: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={20} color="#475569" />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>
                  {selectedNotif.sender}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  {selectedNotif.role || 'Professor, CSE'}
                </div>
              </div>
            </div>

            {/* Attachments */}
            {selectedNotif.attachments && (
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '10px' }}>
                  Attachments ({selectedNotif.attachments.length})
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedNotif.attachments.map((att, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-card)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FileText size={18} color="#ef4444" />
                        <div>
                          <div style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-main)' }}>{att.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{att.size}</div>
                        </div>
                      </div>
                      <button style={{ background: 'transparent', border: 'none', color: '#6366f1', cursor: 'pointer', padding: '4px' }}>
                        <Download size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action button */}
            <button
              onClick={() => setActiveTab('courses')}
              className="btn-primary"
              style={{ width: '100%', marginTop: '6px' }}
            >
              <span>Open in Course</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
