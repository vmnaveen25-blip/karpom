import React, { useState } from 'react';
import {
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Paperclip,
  Send,
  CheckCircle2,
  HelpCircle,
  User,
  Shield,
  Key
} from 'lucide-react';

export default function ProfileSettings({ studentData }) {
  const { profile } = studentData;
  const [requestType, setRequestType] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'How do I reset my password?',
      a: 'Go to your account settings or contact the administrator at support@erode-sengunthar.ac.in with your student roll number.'
    },
    {
      q: 'I can’t access my course materials.',
      a: 'Verify that your semester enrollment is active. If your course status is pending, contact your faculty advisor.'
    },
    {
      q: 'How do I submit an assignment?',
      a: 'Navigate to the Library or Assessments tab, select your course assignment, upload your file and click Submit.'
    },
    {
      q: 'My assessment is not loading.',
      a: 'Check your internet connection, clear your browser cache, or reload the page. Assessments auto-save your answers.'
    },
    {
      q: 'Who do I contact for academic related queries?',
      a: 'Contact your respective course professor during campus office hours or send a message through the AI Tutor portal.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSubject('');
      setMessage('');
      setRequestType('');
    }, 3000);
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Title */}
      <div>
        <h1 className="page-title">Help & Support</h1>
        <p className="page-subtitle">Get help, report issues or share your feedback with your institution.</p>
      </div>

      {/* Main Grid: Left Request Form + Right Contact & FAQ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 380px',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left: Send a Request Card */}
        <div className="ui-card" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)' }}>
            Send a Request
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Tell us your issue, question or feedback. Our team will get back to you.
          </p>

          {submitted ? (
            <div style={{
              marginTop: '24px',
              padding: '24px',
              borderRadius: '12px',
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}>
              <CheckCircle2 size={36} color="#059669" />
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#065f46' }}>Request Submitted!</div>
              <p style={{ fontSize: '13px', color: '#047857' }}>
                Your ticket has been forwarded to the college administration team. We will notify you via email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
                  Request Type
                </label>
                <select
                  className="selector-select"
                  style={{ width: '100%' }}
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="tech">Technical & Portal Bug</option>
                  <option value="course">Course Content & Materials</option>
                  <option value="assessment">Assessment & Grading Query</option>
                  <option value="account">Student Profile & Login</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Enter a short subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-input)',
                    fontSize: '13.5px',
                    color: 'var(--text-main)',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Describe your issue, question or feedback in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-input)',
                    fontSize: '13.5px',
                    color: 'var(--text-main)',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Attachments */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
                  Attachments (Optional)
                </label>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-input)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <Paperclip size={18} color="var(--text-muted)" />
                  <input type="file" id="ticket-file" style={{ display: 'none' }} />
                  <label
                    htmlFor="ticket-file"
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '12px', cursor: 'pointer' }}
                  >
                    Choose Files
                  </label>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No file chosen</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  You can attach images, PDFs or other relevant files (Max 5 MB each).
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="submit" className="btn-primary" style={{ padding: '12px 24px' }}>
                  <Send size={15} />
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Contact Information & FAQ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Contact Information */}
          <div className="ui-card" style={{ padding: '22px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)' }}>
              Contact Information
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', marginBottom: '16px' }}>
              For urgent matters, you can also reach out directly.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ede9fe', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Email</div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>
                    support@erode-sengunthar.ac.in
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ede9fe', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Phone</div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>
                    +91 424 123 4567 (College Office)
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px' }}>
                    Mon - Fri, 9:00 AM - 5:00 PM
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="ui-card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)' }}>
                Frequently Asked Questions
              </h3>
              <span style={{ fontSize: '11.5px', color: '#6366f1', fontWeight: '700', cursor: 'pointer' }}>View All</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                    <div
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      style={{
                        padding: '10px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        fontSize: '12.5px',
                        fontWeight: '600',
                        color: 'var(--text-main)',
                        background: isOpen ? 'var(--bg-subtle)' : 'var(--bg-card)'
                      }}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </div>

                    {isOpen && (
                      <div style={{ padding: '10px 12px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, background: 'var(--bg-subtle)' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
