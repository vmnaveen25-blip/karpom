import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Plus,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  VideoOff,
  X
} from 'lucide-react';

export default function LiveTeachingAndSchedule({ teacherData, setTeacherData }) {
  const [selectedDateStr, setSelectedDateStr] = useState('2026-10-16');
  const [statusFilter, setStatusFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // New Schedule Form
  const [newScheduleForm, setNewScheduleForm] = useState({
    courseId: 'CSE301',
    section: 'Section A',
    date: '2026-10-23',
    startTime: '10:00',
    endTime: '11:30',
    venue: 'LH-302 (Academic Block B)',
    topic: 'Unit 4 Java Streams Practical Lab',
    mode: 'On Campus'
  });

  // Calendar matrix calculation for October 2026
  // October 1, 2026 was a Thursday.
  const daysInMonth = 31;
  const startDayOffset = 3; // 0=Mon, 1=Tue, 2=Wed, 3=Thu...

  const calendarDays = useMemo(() => {
    const cells = [];
    for (let i = 0; i < startDayOffset; i++) {
      cells.push({ day: null, dateStr: '' });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `2026-10-${String(d).padStart(2, '0')}`;
      const sessionsOnDay = (teacherData.schedule || []).filter((s) => s.date === dateStr);
      cells.push({
        day: d,
        dateStr,
        hasSession: sessionsOnDay.length > 0,
        sessions: sessionsOnDay
      });
    }
    return cells;
  }, [teacherData.schedule]);

  // Filtered Sessions List
  const filteredSessions = useMemo(() => {
    return (teacherData.schedule || []).filter((s) => {
      const matchStatus = statusFilter === 'All' || s.status === statusFilter;
      const matchCourse = courseFilter === 'All' || s.courseCode === courseFilter;
      const matchDate = !selectedDateStr || s.date === selectedDateStr;
      return matchStatus && matchCourse && matchDate;
    });
  }, [teacherData.schedule, statusFilter, courseFilter, selectedDateStr]);

  const handleCreateSchedule = (e) => {
    e.preventDefault();
    const crs = (teacherData.courses || []).find((c) => c.id === newScheduleForm.courseId);
    const newSession = {
      id: `sch_${Date.now()}`,
      courseCode: crs ? crs.code : newScheduleForm.courseId,
      courseTitle: crs ? crs.title : 'Lecture Session',
      section: newScheduleForm.section,
      date: newScheduleForm.date,
      dayOfWeek: 'Friday',
      timeSlot: `${newScheduleForm.startTime} - ${newScheduleForm.endTime}`,
      venue: newScheduleForm.venue,
      topic: newScheduleForm.topic,
      mode: 'On Campus',
      status: 'Upcoming',
      attendees: 'Scheduled'
    };

    if (setTeacherData) {
      setTeacherData((prev) => ({
        ...prev,
        schedule: [newSession, ...(prev.schedule || [])]
      }));
    }
    setSelectedDateStr(newScheduleForm.date);
    setCreateModalOpen(false);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="page-title">Live Teaching & Schedule</h1>
          <p className="page-subtitle">
            College classroom timetable, venue allocations, lecture hours, and academic calendar sessions.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="btn-primary"
          style={{ height: '40px', padding: '0 18px', fontSize: '13.5px' }}
        >
          <Plus size={16} />
          <span>Schedule Class Session</span>
        </button>
      </div>

      {/* Campus Policy Alert for Modes */}
      <div style={{
        padding: '12px 18px',
        borderRadius: '12px',
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '13px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <MapPin size={16} color="var(--primary)" />
          <span>
            <strong>Classroom Scheduling Mode:</strong> All teaching sessions are conducted in designated physical lecture halls.
          </span>
        </div>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '3px 10px',
          borderRadius: '12px',
          background: 'var(--bg-card)',
          color: 'var(--text-muted)',
          fontSize: '11px',
          fontWeight: '600',
          border: '1px solid var(--border)'
        }}>
          <VideoOff size={12} />
          Online mode disabled (Campus Policy)
        </span>
      </div>

      {/* Main Layout: Calendar Grid + Day Agenda List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 480px) 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left Column: Interactive Month Calendar */}
        <div className="ui-card" style={{ padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Month Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
              October 2026
            </h3>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button className="icon-btn-circle" style={{ width: '32px', height: '32px' }}>
                <ChevronLeft size={16} />
              </button>
              <button className="icon-btn-circle" style={{ width: '32px', height: '32px' }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Day of Week Labels */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} style={{ padding: '6px 0' }}>{day}</div>
            ))}
          </div>

          {/* Calendar Day Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
            {calendarDays.map((cell, idx) => {
              if (!cell.day) {
                return <div key={`empty_${idx}`} style={{ height: '42px' }} />;
              }
              const isSelected = selectedDateStr === cell.dateStr;
              return (
                <button
                  key={cell.dateStr}
                  onClick={() => setSelectedDateStr(cell.dateStr)}
                  style={{
                    height: '42px',
                    borderRadius: '10px',
                    border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                    background: isSelected ? 'var(--primary-soft)' : cell.hasSession ? 'var(--bg-subtle)' : 'var(--bg-card)',
                    color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                    fontWeight: isSelected ? '800' : '500',
                    fontSize: '13px',
                    cursor: 'pointer',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{cell.day}</span>
                  {cell.hasSession && (
                    <span style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: isSelected ? 'var(--primary)' : '#10b981',
                      marginTop: '2px'
                    }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Clear Filter */}
          {selectedDateStr && (
            <button
              onClick={() => setSelectedDateStr('')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '12.5px',
                fontWeight: '600',
                cursor: 'pointer',
                textAlign: 'center',
                padding: '4px'
              }}
            >
              Show all dates this month
            </button>
          )}
        </div>

        {/* Right Column: Sessions Feed / Agenda */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Filters Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            background: 'var(--bg-card)',
            padding: '14px 18px',
            borderRadius: '14px',
            border: '1px solid var(--border)'
          }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>
              {selectedDateStr ? `Sessions on ${selectedDateStr}` : 'All October Sessions'}
            </div>

            {/* Status Tabs */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {['All', 'Upcoming', 'Completed'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: statusFilter === st ? 'var(--primary-soft)' : 'transparent',
                    color: statusFilter === st ? 'var(--primary)' : 'var(--text-muted)',
                    fontWeight: statusFilter === st ? '700' : '500',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Sessions List */}
          {filteredSessions.length === 0 ? (
            <div className="ui-card" style={{ padding: '40px 20px', textAlign: 'center', borderRadius: '16px' }}>
              <CalendarIcon size={36} color="var(--text-disabled)" style={{ margin: '0 auto 10px auto' }} />
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>No scheduled sessions</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 14px 0' }}>
                No classroom lectures are currently scheduled for this selection.
              </p>
              <button onClick={() => setCreateModalOpen(true)} className="btn-primary" style={{ height: '36px', fontSize: '12.5px' }}>
                <Plus size={14} />
                <span>Schedule Session</span>
              </button>
            </div>
          ) : (
            filteredSessions.map((ses) => (
              <div
                key={ses.id}
                className="ui-card"
                style={{
                  padding: '20px 24px',
                  borderRadius: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '16px',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: 'var(--primary-soft)',
                      color: 'var(--primary)',
                      fontSize: '11px',
                      fontWeight: '700'
                    }}>
                      {ses.courseCode}
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>
                      {ses.courseTitle}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      ({ses.section})
                    </span>
                  </div>

                  <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>
                    {ses.topic}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <CalendarIcon size={13} color="var(--primary)" />
                      {ses.date} ({ses.dayOfWeek})
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={13} color="var(--primary)" />
                      {ses.timeSlot}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={13} color="var(--primary)" />
                      {ses.venue}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '700',
                    background: ses.status === 'Completed' ? 'var(--success-soft)' : 'var(--primary-soft)',
                    color: ses.status === 'Completed' ? 'var(--success)' : 'var(--primary)'
                  }}>
                    {ses.status}
                  </span>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    Mode: {ses.mode}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Schedule Class Session Modal (matches Shedule Creation.png) */}
      {createModalOpen && (
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
            gap: '18px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CalendarIcon size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
                  Schedule Class Session
                </h3>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateSchedule} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Course *
                  </label>
                  <select
                    value={newScheduleForm.courseId}
                    onChange={(e) => setNewScheduleForm({ ...newScheduleForm, courseId: e.target.value })}
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
                    value={newScheduleForm.section}
                    onChange={(e) => setNewScheduleForm({ ...newScheduleForm, section: e.target.value })}
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
                  Date *
                </label>
                <input
                  type="date"
                  required
                  className="search-input"
                  value={newScheduleForm.date}
                  onChange={(e) => setNewScheduleForm({ ...newScheduleForm, date: e.target.value })}
                  style={{ height: '40px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Start Time *
                  </label>
                  <input
                    type="time"
                    required
                    className="search-input"
                    value={newScheduleForm.startTime}
                    onChange={(e) => setNewScheduleForm({ ...newScheduleForm, startTime: e.target.value })}
                    style={{ height: '40px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    End Time *
                  </label>
                  <input
                    type="time"
                    required
                    className="search-input"
                    value={newScheduleForm.endTime}
                    onChange={(e) => setNewScheduleForm({ ...newScheduleForm, endTime: e.target.value })}
                    style={{ height: '40px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Classroom / Venue *
                </label>
                <input
                  type="text"
                  required
                  className="search-input"
                  placeholder="e.g. LH-302 (Academic Block B)"
                  value={newScheduleForm.venue}
                  onChange={(e) => setNewScheduleForm({ ...newScheduleForm, venue: e.target.value })}
                  style={{ height: '40px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Lecture Topic / Syllabus Agenda *
                </label>
                <input
                  type="text"
                  required
                  className="search-input"
                  placeholder="e.g. Unit 3 Concurrency: ForkJoinPool & Parallel Streams"
                  value={newScheduleForm.topic}
                  onChange={(e) => setNewScheduleForm({ ...newScheduleForm, topic: e.target.value })}
                  style={{ height: '40px' }}
                />
              </div>

              {/* Mode Selection (Explicit requirement: Online mode disabled) */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Delivery Mode
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid var(--primary)',
                    background: 'var(--primary-soft)',
                    color: 'var(--primary)',
                    fontWeight: '700',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <CheckCircle2 size={16} />
                    <span>On Campus Class</span>
                  </div>

                  <div
                    title="Online teaching mode is disabled per institutional campus guidelines."
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-subtle)',
                      color: 'var(--text-disabled)',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'not-allowed'
                    }}
                  >
                    <VideoOff size={16} />
                    <span>Online (Disabled)</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, height: '42px', fontSize: '13.5px' }}>
                  Confirm Schedule
                </button>
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
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
