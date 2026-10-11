import React, { useState, useMemo } from 'react';
import {
  MessageSquare,
  Bell,
  Send,
  Paperclip,
  Search,
  Plus,
  Eye,
  X,
  User
} from 'lucide-react';

export default function TeacherCommunication({ teacherData, setTeacherData }) {
  // Tabs: 'messages' | 'announcements'
  const [activeTab, setActiveTab] = useState('messages');

  // Messages State
  const [activeMessageId, setActiveMessageId] = useState('msg_1');
  const [messageSearch, setMessageSearch] = useState('');
  const [replyText, setReplyText] = useState('');

  // Announcements State
  const [announcementFilter, setAnnouncementFilter] = useState('All');
  const [createAnnouncementOpen, setCreateAnnouncementOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    courseCode: 'CSE301',
    courseTitle: 'Advanced Java Programming',
    section: 'Section A & B',
    priority: 'General',
    body: '',
    attachment: ''
  });

  const activeConversation = useMemo(() => {
    return (teacherData.communication?.messages || []).find((m) => m.id === activeMessageId) || teacherData.communication?.messages?.[0];
  }, [teacherData.communication?.messages, activeMessageId]);

  const filteredConversations = useMemo(() => {
    return (teacherData.communication?.messages || []).filter((m) => {
      return (
        m.studentName.toLowerCase().includes(messageSearch.toLowerCase()) ||
        m.studentId.toLowerCase().includes(messageSearch.toLowerCase())
      );
    });
  }, [teacherData.communication?.messages, messageSearch]);

  const filteredAnnouncements = useMemo(() => {
    return (teacherData.communication?.announcements || []).filter((ann) => {
      return announcementFilter === 'All' || ann.courseCode === announcementFilter;
    });
  }, [teacherData.communication?.announcements, announcementFilter]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeConversation) return;

    const newMsg = {
      id: `m_${Date.now()}`,
      sender: 'teacher',
      text: replyText.trim(),
      time: 'Just now'
    };

    const updatedMessages = (teacherData.communication?.messages || []).map((c) => {
      if (c.id !== activeConversation.id) return c;
      return {
        ...c,
        lastMessageTime: 'Just now',
        unreadCount: 0,
        conversation: [...(c.conversation || []), newMsg]
      };
    });

    if (setTeacherData) {
      setTeacherData((prev) => ({
        ...prev,
        communication: {
          ...prev.communication,
          messages: updatedMessages
        }
      }));
    }
    setReplyText('');
  };

  const handleCreateAnnouncementSubmit = (e) => {
    e.preventDefault();
    const crs = (teacherData.courses || []).find((c) => c.code === newAnnouncement.courseCode);
    const annObj = {
      id: `ann_${Date.now()}`,
      title: newAnnouncement.title,
      priority: newAnnouncement.priority,
      courseCode: newAnnouncement.courseCode,
      courseTitle: crs ? crs.title : 'Course Study',
      section: newAnnouncement.section,
      publishedDate: 'Just now',
      author: teacherData.profile?.name || 'Dr. R. Kumar',
      views: 0,
      body: newAnnouncement.body,
      attachment: newAnnouncement.attachment || ''
    };

    if (setTeacherData) {
      setTeacherData((prev) => ({
        ...prev,
        communication: {
          ...prev.communication,
          announcements: [annObj, ...(prev.communication?.announcements || [])]
        }
      }));
    }
    setCreateAnnouncementOpen(false);
    setNewAnnouncement({
      title: '',
      courseCode: 'CSE301',
      courseTitle: 'Advanced Java Programming',
      section: 'Section A & B',
      priority: 'General',
      body: '',
      attachment: ''
    });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="page-title">Communication</h1>
          <p className="page-subtitle">
            Direct student message exchanges, academic counseling threads, and class announcements.
          </p>
        </div>

        {activeTab === 'announcements' && (
          <button
            onClick={() => setCreateAnnouncementOpen(true)}
            className="btn-primary"
            style={{ height: '40px', padding: '0 18px', fontSize: '13.5px' }}
          >
            <Plus size={16} />
            <span>Create Announcement</span>
          </button>
        )}
      </div>

      {/* Primary Tab Switcher */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '2px' }}>
        <button
          onClick={() => setActiveTab('messages')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            border: 'none',
            background: 'none',
            color: activeTab === 'messages' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: activeTab === 'messages' ? '700' : '500',
            fontSize: '15px',
            borderBottom: activeTab === 'messages' ? '2.5px solid var(--primary)' : 'none',
            cursor: 'pointer'
          }}
        >
          <MessageSquare size={18} />
          <span>Direct Messages</span>
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            border: 'none',
            background: 'none',
            color: activeTab === 'announcements' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: activeTab === 'announcements' ? '700' : '500',
            fontSize: '15px',
            borderBottom: activeTab === 'announcements' ? '2.5px solid var(--primary)' : 'none',
            cursor: 'pointer'
          }}
        >
          <Bell size={18} />
          <span>Announcements Feed</span>
        </button>
      </div>

      {/* TAB 1: DIRECT MESSAGES (matches Messages.png) */}
      {activeTab === 'messages' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr 280px',
          gap: '20px',
          minHeight: '620px',
          alignItems: 'stretch'
        }}>
          {/* Left Column: Conversations List */}
          <div className="ui-card" style={{ borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ position: 'relative' }}>
                <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search student messages..."
                  value={messageSearch}
                  onChange={(e) => setMessageSearch(e.target.value)}
                  style={{ paddingLeft: '36px', height: '36px', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filteredConversations.map((c) => {
                const isSelected = c.id === activeMessageId;
                const lastMsg = c.conversation?.[c.conversation.length - 1];
                return (
                  <div
                    key={c.id}
                    onClick={() => setActiveMessageId(c.id)}
                    style={{
                      padding: '14px 16px',
                      borderBottom: '1px solid var(--border)',
                      background: isSelected ? 'var(--bg-subtle)' : 'transparent',
                      borderLeft: isSelected ? '3.5px solid var(--primary)' : '3.5px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'var(--primary-soft)',
                          color: 'var(--primary)',
                          fontWeight: '700',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {c.studentInitials}
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', fontSize: '13.5px', color: 'var(--text-main)' }}>
                            {c.studentName}
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                            {c.studentId}
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {c.lastMessageTime}
                      </span>
                    </div>

                    <div style={{
                      fontSize: '12.5px',
                      color: 'var(--text-secondary)',
                      marginTop: '6px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {lastMsg?.text || 'No messages'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center Column: Chat Thread */}
          <div className="ui-card" style={{ borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {activeConversation ? (
              <>
                {/* Chat Header */}
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-subtle)' }}>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
                      {activeConversation.studentName}
                    </h3>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {activeConversation.course} • {activeConversation.section}
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--success)', fontWeight: '600' }}>Active Now</span>
                </div>

                {/* Message Bubbles Area */}
                <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {(activeConversation.conversation || []).map((m) => {
                    const isMe = m.sender === 'teacher';
                    return (
                      <div
                        key={m.id}
                        style={{
                          alignSelf: isMe ? 'flex-end' : 'flex-start',
                          maxWidth: '75%'
                        }}
                      >
                        <div style={{
                          padding: '12px 16px',
                          borderRadius: isMe ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                          background: isMe ? 'var(--primary)' : 'var(--bg-subtle)',
                          color: isMe ? '#ffffff' : 'var(--text-main)',
                          fontSize: '13.5px',
                          lineHeight: '1.5',
                          boxShadow: 'var(--shadow-xs)'
                        }}>
                          {m.text}
                        </div>
                        <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '4px', textAlign: isMe ? 'right' : 'left' }}>
                          {m.time}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Message Input Form */}
                <form onSubmit={handleSendMessage} style={{ padding: '16px', borderTop: '1px solid var(--border)', display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Write a message to student..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    style={{ flex: 1, height: '42px', fontSize: '13.5px' }}
                  />
                  <button type="submit" className="btn-primary" style={{ height: '42px', width: '42px', padding: 0, borderRadius: '50%' }}>
                    <Send size={16} />
                  </button>
                </form>
              </>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                Select a student conversation to view messages.
              </div>
            )}
          </div>

          {/* Right Column: Student Quick Profile */}
          {activeConversation && (
            <div className="ui-card" style={{ padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--primary-soft)',
                  color: 'var(--primary)',
                  fontWeight: '800',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto'
                }}>
                  {activeConversation.studentInitials}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                  {activeConversation.studentName}
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '3px' }}>
                  {activeConversation.studentId}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', textAlign: 'center' }}>
                <div style={{ padding: '10px', borderRadius: '10px', background: 'var(--bg-subtle)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Attendance</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--success)', marginTop: '2px' }}>
                    {activeConversation.attendance}%
                  </div>
                </div>
                <div style={{ padding: '10px', borderRadius: '10px', background: 'var(--bg-subtle)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>CGPA</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--primary)', marginTop: '2px' }}>
                    {activeConversation.cgpa}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Email:</span>
                  <div style={{ fontWeight: '500', color: 'var(--text-main)' }}>{activeConversation.studentEmail}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Class Section:</span>
                  <div style={{ fontWeight: '500', color: 'var(--text-main)' }}>{activeConversation.section}</div>
                </div>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <button
                  onClick={() => alert(`Opening official student record for ${activeConversation.studentName}`)}
                  className="btn-outline"
                  style={{ width: '100%', height: '36px', fontSize: '12.5px' }}
                >
                  <User size={14} />
                  <span>View Full Record</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ANNOUNCEMENTS FEED (matches Announcements.png) */}
      {activeTab === 'announcements' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Filter Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-subtle)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
              {['All', 'CSE301', 'CSE302'].map((c) => (
                <button
                  key={c}
                  onClick={() => setAnnouncementFilter(c)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    background: announcementFilter === c ? 'var(--bg-card)' : 'transparent',
                    color: announcementFilter === c ? 'var(--primary)' : 'var(--text-muted)',
                    fontWeight: announcementFilter === c ? '700' : '500',
                    fontSize: '12.5px',
                    cursor: 'pointer',
                    boxShadow: announcementFilter === c ? 'var(--shadow-xs)' : 'none'
                  }}
                >
                  {c === 'All' ? 'All Course Announcements' : c}
                </button>
              ))}
            </div>

            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Showing {filteredAnnouncements.length} published announcements
            </div>
          </div>

          {/* Announcements Feed Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredAnnouncements.map((ann) => {
              const isUrgent = ann.priority === 'Urgent';
              return (
                <div
                  key={ann.id}
                  className="ui-card"
                  style={{
                    padding: '24px',
                    borderRadius: '16px',
                    border: isUrgent ? '1.5px solid #ef4444' : '1px solid var(--border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background:
                          ann.priority === 'Urgent'
                            ? 'var(--danger-soft)'
                            : ann.priority === 'Important'
                            ? 'var(--warning-soft)'
                            : 'var(--primary-soft)',
                        color:
                          ann.priority === 'Urgent'
                            ? 'var(--danger)'
                            : ann.priority === 'Important'
                            ? 'var(--warning)'
                            : 'var(--primary)',
                        fontSize: '11px',
                        fontWeight: '700'
                      }}>
                        {ann.priority}
                      </span>
                      <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                        {ann.courseCode} ({ann.courseTitle}) • {ann.section}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <span>{ann.publishedDate}</span>
                      <span>•</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Eye size={13} /> {ann.views} views
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
                      {ann.title}
                    </h3>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                      {ann.body}
                    </p>
                  </div>

                  {ann.attachment && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'var(--bg-subtle)',
                      fontSize: '12.5px',
                      color: 'var(--primary)',
                      fontWeight: '600',
                      cursor: 'pointer',
                      alignSelf: 'flex-start'
                    }}
                    onClick={() => alert(`Downloading attachment: ${ann.attachment}`)}
                    >
                      <Paperclip size={14} />
                      <span>{ann.attachment}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Create Announcement Modal (matches Announcement Creation.png) */}
      {createAnnouncementOpen && (
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
            width: '560px',
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
                <Bell size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
                  Create Class Announcement
                </h3>
              </div>
              <button
                onClick={() => setCreateAnnouncementOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncementSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Target Course
                  </label>
                  <select
                    value={newAnnouncement.courseCode}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, courseCode: e.target.value })}
                    style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-input)', fontSize: '13px' }}
                  >
                    {(teacherData.courses || []).map((c) => (
                      <option key={c.id} value={c.code}>{c.code} — {c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Priority
                  </label>
                  <select
                    value={newAnnouncement.priority}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value })}
                    style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-input)', fontSize: '13px' }}
                  >
                    <option value="General">General</option>
                    <option value="Important">Important</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Announcement Title *
                </label>
                <input
                  type="text"
                  required
                  className="search-input"
                  placeholder="e.g. Unit 3 Concurrency Practice Problems & Lab Session"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  style={{ height: '40px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Announcement Message Content *
                </label>
                <textarea
                  rows={4}
                  required
                  className="search-input"
                  placeholder="Type announcement instructions, agenda, and requirements..."
                  value={newAnnouncement.body}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, body: e.target.value })}
                  style={{ height: 'auto', padding: '12px 14px', borderRadius: '10px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Attachment Name (Optional)
                </label>
                <input
                  type="text"
                  className="search-input"
                  placeholder="e.g. Lab_Practice_Guide.pdf"
                  value={newAnnouncement.attachment}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, attachment: e.target.value })}
                  style={{ height: '40px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, height: '42px', fontSize: '13.5px' }}>
                  Publish Announcement
                </button>
                <button
                  type="button"
                  onClick={() => setCreateAnnouncementOpen(false)}
                  className="btn-outline"
                  style={{ height: '42px', fontSize: '13.5px' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
