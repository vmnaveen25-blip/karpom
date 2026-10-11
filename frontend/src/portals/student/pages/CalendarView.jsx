import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  FileText,
  Target,
  Sparkles,
  RotateCw,
  Bell,
  ArrowRight
} from 'lucide-react';

export default function CalendarView({ studentData }) {
  const { calendarEvents } = studentData;
  const [selectedDay, setSelectedDay] = useState(15);
  const [activeFilter, setActiveFilter] = useState('All');

  // October 2026 days (starts on Thursday Oct 1)
  // Calendar days grid starting from Sunday Sep 27 to Saturday Oct 31
  const calendarCells = [
    { day: 27, inMonth: false }, { day: 28, inMonth: false }, { day: 29, inMonth: false }, { day: 30, inMonth: false },
    { day: 1, inMonth: true },
    { day: 2, inMonth: true, event: { title: '10:00 AM Lecture: Arrays', color: '#3b82f6', bg: '#eff6ff' } },
    { day: 3, inMonth: true },
    { day: 4, inMonth: true },
    { day: 5, inMonth: true },
    { day: 6, inMonth: true, event: { title: '11:00 AM Quiz: Unit 1', color: '#6366f1', bg: '#ede9fe' } },
    { day: 7, inMonth: true },
    { day: 8, inMonth: true, event: { title: '7:00 PM Self Study', color: '#10b981', bg: '#ecfdf5' } },
    { day: 9, inMonth: true },
    { day: 10, inMonth: true, event: { title: '11:59 PM Assignment 1 Deadline', color: '#ef4444', bg: '#fef2f2' } },
    { day: 11, inMonth: true },
    { day: 12, inMonth: true },
    { day: 13, inMonth: true, event: { title: '10:00 AM Lecture: Linked Lists', color: '#3b82f6', bg: '#eff6ff' } },
    { day: 14, inMonth: true },
    { day: 15, inMonth: true, isCurrent: true, event: { title: '2:00 PM Practice Test', color: '#f59e0b', bg: '#fffbeb' } },
    { day: 16, inMonth: true },
    { day: 17, inMonth: true, event: { title: '10:00 AM Lecture: Stacks & Queues', color: '#3b82f6', bg: '#eff6ff' } },
    { day: 18, inMonth: true },
    { day: 19, inMonth: true },
    { day: 20, inMonth: true, event: { title: '7:00 PM Revision Session', color: '#10b981', bg: '#ecfdf5' } },
    { day: 21, inMonth: true },
    { day: 22, inMonth: true, event: { title: '11:59 PM Assignment 2 Deadline', color: '#ef4444', bg: '#fef2f2' } },
    { day: 23, inMonth: true },
    { day: 24, inMonth: true, event: { title: '1:00 PM Mid Term Test', color: '#6366f1', bg: '#ede9fe' } },
    { day: 25, inMonth: true },
    { day: 26, inMonth: true },
    { day: 27, inMonth: true, event: { title: '10:00 AM Lecture: Trees', color: '#3b82f6', bg: '#eff6ff' } },
    { day: 28, inMonth: true },
    { day: 29, inMonth: true, event: { title: '7:00 PM Self Study', color: '#10b981', bg: '#ecfdf5' } },
    { day: 30, inMonth: true },
    { day: 31, inMonth: true, event: { title: '10:00 AM Lecture: Graphs', color: '#3b82f6', bg: '#eff6ff' } },
    { day: 1, inMonth: false }
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Title */}
      <div>
        <h1 className="page-title">Calendar</h1>
        <p className="page-subtitle">Stay organized with your classes, assessments, deadlines and personal study plan.</p>
      </div>

      {/* Select Course */}
      <div className="ui-card" style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: '#eef2ff',
          color: '#6366f1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <BookOpen size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>Select Course</div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>Data Structures and Algorithms</div>
        </div>
      </div>

      {/* Event Category Filters + Add button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'All', label: 'All Events', bg: '#6366f1', text: 'white' },
            { id: 'Lectures', label: '✓ Lectures', bg: '#eff6ff', text: '#3b82f6' },
            { id: 'Assessments', label: '✓ Assessments', bg: '#ede9fe', text: '#6366f1' },
            { id: 'Assignments', label: '✓ Assignments', bg: '#fffbeb', text: '#f59e0b' },
            { id: 'Deadlines', label: '✓ Deadlines', bg: '#fef2f2', text: '#ef4444' },
            { id: 'Study', label: '✓ Study Plan', bg: '#ecfdf5', text: '#10b981' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveFilter(item.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                border: activeFilter === item.id ? 'none' : '1px solid var(--border)',
                background: activeFilter === item.id ? item.bg : 'var(--bg-card)',
                color: activeFilter === item.id ? item.text : 'var(--text-secondary)',
                fontSize: '12.5px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button className="btn-outline" style={{ gap: '6px', fontSize: '12.5px', padding: '8px 14px' }}>
          <Plus size={15} />
          <span>Add to Personal Plan</span>
        </button>
      </div>

      {/* Month Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12.5px' }}>Today</button>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button className="icon-btn-circle" style={{ width: '32px', height: '32px' }}><ChevronLeft size={16} /></button>
            <button className="icon-btn-circle" style={{ width: '32px', height: '32px' }}><ChevronRight size={16} /></button>
          </div>
          <span style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-main)', marginLeft: '6px' }}>October 2026</span>
        </div>

        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-subtle)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
          <button style={{ padding: '6px 14px', borderRadius: '6px', background: '#6366f1', color: 'white', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Month</button>
          <button style={{ padding: '6px 14px', borderRadius: '6px', background: 'transparent', color: 'var(--text-muted)', border: 'none', fontSize: '12px', cursor: 'pointer' }}>Week</button>
          <button style={{ padding: '6px 14px', borderRadius: '6px', background: 'transparent', color: 'var(--text-muted)', border: 'none', fontSize: '12px', cursor: 'pointer' }}>Day</button>
          <button style={{ padding: '6px 14px', borderRadius: '6px', background: 'transparent', color: 'var(--text-muted)', border: 'none', fontSize: '12px', cursor: 'pointer' }}>List View</button>
        </div>
      </div>

      {/* Calendar Grid & Sidebar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 300px',
        gap: '20px',
        alignItems: 'start'
      }}>
        {/* Main Month Grid */}
        <div className="ui-card" style={{ padding: '16px', overflow: 'hidden' }}>
          {/* Weekday headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: '700',
            color: 'var(--text-muted)',
            paddingBottom: '12px',
            borderBottom: '1px solid var(--border)'
          }}>
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Day Cells Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '1px',
            background: 'var(--border)',
            marginTop: '1px'
          }}>
            {calendarCells.map((cell, idx) => {
              const isSelected = selectedDay === cell.day && cell.inMonth;
              return (
                <div
                  key={idx}
                  onClick={() => cell.inMonth && setSelectedDay(cell.day)}
                  style={{
                    minHeight: '88px',
                    padding: '8px',
                    background: isSelected ? '#faf5ff' : 'var(--bg-card)',
                    opacity: cell.inMonth ? 1 : 0.4,
                    cursor: cell.inMonth ? 'pointer' : 'default',
                    border: isSelected ? '1.5px solid #6366f1' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{
                    fontSize: '12px',
                    fontWeight: cell.isCurrent ? '800' : '600',
                    color: cell.isCurrent ? '#6366f1' : 'var(--text-main)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: cell.isCurrent ? '50%' : 'none',
                    background: cell.isCurrent ? '#ede9fe' : 'transparent'
                  }}>
                    {cell.day}
                  </div>

                  {cell.event && (
                    <div style={{
                      padding: '4px 6px',
                      borderRadius: '4px',
                      background: cell.event.bg,
                      color: cell.event.color,
                      fontSize: '10.5px',
                      fontWeight: '700',
                      lineHeight: 1.2,
                      marginTop: '4px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {cell.event.title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Upcoming Events + Mini Calendar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Upcoming Events */}
          <div className="ui-card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>Upcoming Events</span>
              <span style={{ fontSize: '11px', color: '#6366f1', fontWeight: '600', cursor: 'pointer' }}>View All →</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              {[
                { title: 'Quiz: Unit 1 - Arrays', date: 'Mon, Oct 6, 2026 • 11:00 AM', color: '#6366f1' },
                { title: 'Assignment 1 Deadline', date: 'Fri, Oct 10, 2026 • 11:59 PM', color: '#ef4444' },
                { title: 'Practice Test', date: 'Wed, Oct 15, 2026 • 2:00 PM', color: '#f59e0b' },
                { title: 'Lecture: Stacks & Queues', date: 'Fri, Oct 17, 2026 • 10:00 AM', color: '#3b82f6' },
                { title: 'Assignment 2 Deadline', date: 'Wed, Oct 22, 2026 • 11:59 PM', color: '#ef4444' },
              ].map((ev, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: ev.color }} />
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{ev.title}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{ev.date}</div>
                    </div>
                  </div>
                  <ChevronRight size={14} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          </div>

          {/* Mini Calendar Widget */}
          <div className="ui-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontSize: '13px', fontWeight: '700' }}>
              <span>October 2026</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <ChevronLeft size={14} style={{ cursor: 'pointer' }} />
                <ChevronRight size={14} style={{ cursor: 'pointer' }} />
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              textAlign: 'center',
              fontSize: '11px',
              gap: '4px',
              color: 'var(--text-muted)'
            }}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i} style={{ fontWeight: '700' }}>{d}</span>)}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <span
                  key={d}
                  style={{
                    padding: '3px 0',
                    borderRadius: '50%',
                    background: d === 15 ? '#6366f1' : 'transparent',
                    color: d === 15 ? 'white' : 'inherit',
                    fontWeight: d === 15 ? '700' : 'normal'
                  }}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 3 Cards: Today's Schedule + Weekly Goals + Quick Actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {/* Today's Schedule */}
        <div className="ui-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>Today's Schedule</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Thu, Oct 15, 2026</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderRadius: '8px', background: 'var(--bg-subtle)' }}>
              <div>
                <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>Practice Test</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>2:00 PM – 3:00 PM</div>
              </div>
              <button className="btn-primary" style={{ padding: '4px 12px', fontSize: '11.5px' }}>Start</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderRadius: '8px', background: 'var(--bg-subtle)' }}>
              <div>
                <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>Self Study (Suggested)</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>7:00 PM – 8:00 PM</div>
              </div>
              <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '11.5px' }}>Add to Plan</button>
            </div>
          </div>
        </div>

        {/* Weekly Goals */}
        <div className="ui-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>Weekly Goals</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Oct 12 – Oct 18</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>Complete 3 practice tests</span>
                <span style={{ fontWeight: '700' }}>1 / 3</span>
              </div>
              <div className="progress-track"><div className="progress-fill" style={{ width: '33%' }} /></div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>Study 5 hours</span>
                <span style={{ fontWeight: '700' }}>3.5 / 5</span>
              </div>
              <div className="progress-track"><div className="progress-fill" style={{ width: '70%' }} /></div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>Revise Unit 1 concepts</span>
                <span style={{ fontWeight: '700' }}>1 / 2</span>
              </div>
              <div className="progress-track"><div className="progress-fill" style={{ width: '50%' }} /></div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="ui-card" style={{ padding: '18px' }}>
          <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '12px' }}>
            Quick Actions
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button className="btn-secondary" style={{ padding: '8px', fontSize: '11px', gap: '6px' }}>
              <CalendarIcon size={14} color="#6366f1" />
              <span>Add Study Session</span>
            </button>
            <button className="btn-secondary" style={{ padding: '8px', fontSize: '11px', gap: '6px' }}>
              <Bell size={14} color="#f59e0b" />
              <span>Add Reminder</span>
            </button>
            <button className="btn-secondary" style={{ padding: '8px', fontSize: '11px', gap: '6px' }}>
              <Target size={14} color="#ef4444" />
              <span>View Assessments</span>
            </button>
            <button className="btn-secondary" style={{ padding: '8px', fontSize: '11px', gap: '6px' }}>
              <RotateCw size={14} color="#10b981" />
              <span>Sync Calendar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
