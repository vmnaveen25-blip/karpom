import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Headphones,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';

export default function TeacherHelpSupport() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState({ 0: true });

  const faqs = [
    {
      q: 'How does the AI Assessment Generator guarantee factual grounding in course notes?',
      a: 'The system uses strict retrieval augmented generation (RAG) bounded exclusively to the documents you have uploaded and marked as approved in Teaching Materials. The AI model is constrained from synthesizing unverified external facts, and every generated question includes a page-level citation for teacher review and verification before publishing.'
    },
    {
      q: 'Why is the Online Class mode disabled when creating classroom sessions?',
      a: 'Per the university academic regulations and institutional attendance policies, core semester courses require in-person, on-campus delivery in assigned lecture halls. The online mode is disabled by design to comply with campus requirements.'
    },
    {
      q: 'How do I review and release assignment grades to students?',
      a: 'In Assignments & Assessments, click "Inspect Submissions" on any open or evaluated assignment. You can inspect student code, view automated plagiarism indices and preliminary AI analysis, adjust marks, input qualitative remarks, and save the grade.'
    },
    {
      q: 'Can I reorder topics and change teaching hour allocations in the curriculum?',
      a: 'Yes. In Courses & Curriculum, select any course and navigate to "Curriculum". You can expand each unit accordion, edit individual topics, update estimated teaching hours, and adjust learning outcomes.'
    },
    {
      q: 'How can I broadcast announcements to multiple class sections at once?',
      a: 'In the Communication portal under "Announcements Feed", click "Create Announcement" and select "All Sections" under the target audience dropdown. The notice will be delivered instantly to the students’ portal and notification feed.'
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (idx) => {
    setExpandedFaq((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 className="page-title">Help & Support</h1>
        <p className="page-subtitle">
          Faculty documentation, instructional best practices, grading guidelines, and technical helpdesk.
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', width: '100%' }}>
        <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          type="text"
          className="search-input"
          placeholder="Search support articles, AI generation policies, grading workflows..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ paddingLeft: '44px', height: '46px', fontSize: '14px' }}
        />
      </div>

      {/* Quick Help Contact Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <div className="ui-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary-soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <Headphones size={20} />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>
            Campus IT Helpdesk
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: '1.45' }}>
            Support for LMS access, portal roles, and classroom equipment.
          </p>
          <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span><strong>Email:</strong> helpdesk@college.edu</span>
            <span><strong>Ext:</strong> 4402 (Mon - Fri: 8 AM - 6 PM)</span>
          </div>
        </div>

        <div className="ui-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <BookOpen size={20} />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>
            Academic Dean Office
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: '1.45' }}>
            Course syllabus regulations, NBA accreditation, and exam audits.
          </p>
          <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span><strong>Coordinator:</strong> academic.dean@college.edu</span>
            <span><strong>Room:</strong> Administrative Tower, 2nd Floor</span>
          </div>
        </div>

        <div className="ui-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <Sparkles size={20} />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>
            AI Assistant Guidelines
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: '1.45' }}>
            Institutional protocols for teacher verification and source grounding.
          </p>
          <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span><strong>Rule:</strong> 100% human-in-the-loop approval</span>
            <span><strong>Grounding:</strong> Syllabus documents only</span>
          </div>
        </div>
      </div>

      {/* Expandable FAQs */}
      <div className="ui-card" style={{ padding: '28px 32px', borderRadius: '16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '16px' }}>
          Frequently Asked Questions
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredFaqs.map((faq, idx) => {
            const isOpen = !!expandedFaq[idx];
            return (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: 'var(--bg-card)'
                }}
              >
                <div
                  onClick={() => toggleFaq(idx)}
                  style={{
                    padding: '16px 20px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: isOpen ? 'var(--bg-subtle)' : 'transparent',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>
                    {faq.q}
                  </span>
                  {isOpen ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                </div>

                {isOpen && (
                  <div style={{
                    padding: '16px 20px',
                    fontSize: '13.5px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    borderTop: '1px solid var(--border)'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
