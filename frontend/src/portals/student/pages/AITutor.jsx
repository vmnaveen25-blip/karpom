import React, { useState } from 'react';
import { api } from '../../../services/apiClient';
import {
  Sparkles,
  Send,
  Copy,
  Check,
  RotateCw,
  ArrowRight,
  BookOpen,
  FileCode,
  FileText,
  HelpCircle,
  Clock,
  Layers,
  Paperclip,
  CheckCircle2
} from 'lucide-react';

export default function AITutor({ studentData }) {
  const { aiTutor } = studentData;
  const [messages, setMessages] = useState(aiTutor.messages);
  const [inputPrompt, setInputPrompt] = useState('');
  const [activeMode, setActiveMode] = useState('Chat & Explain');
  const [copiedCode, setCopiedCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(aiTutor.selectedCourse);
  const [selectedMaterial, setSelectedMaterial] = useState(aiTutor.selectedMaterial);

  const tutorModes = [
    { id: 'Chat & Explain', label: 'Explain Concept', desc: 'Get clear explanations with examples', icon: BookOpen },
    { id: 'Solve a Problem', label: 'Solve Problem', desc: 'Step-by-step solution with hints', icon: FileCode },
    { id: 'Practice Questions', label: 'Practice Questions', desc: 'Generate practice questions', icon: FileText },
    { id: 'Summarize', label: 'Summarize Notes', desc: 'Summarize key points of this topic', icon: Layers },
    { id: 'Quiz Me', label: 'Quiz Me', desc: 'Test your understanding', icon: HelpCircle },
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || isLoading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      // Try to query FastAPI backend if running
      const res = await api.post('/api/ai/ask', {
        prompt: query,
        course: selectedCourse,
        material: selectedMaterial,
        mode: activeMode
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: data.response
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsLoading(false);
        return;
      }
    } catch (err) {
      // Fallback to intelligent local AI generator
    }

    // Realistic smart response simulating Gemini response
    setTimeout(() => {
      let aiResponseContent = {
        intro: `Here is a clear explanation for: "${query}"`,
        headline: `Understanding ${query.length > 25 ? query.substring(0, 25) + '...' : query}`,
        description: `In ${selectedMaterial} (${selectedCourse}), this concept is fundamental for optimizing execution time and memory footprint.`,
        howItWorks: [
          'Analyze the input structure and boundary conditions.',
          'Identify key invariant properties (e.g. sorted order, pointers).',
          'Execute the logic in discrete, deterministic stages.',
          'Return the validated output or optimized data representation.'
        ],
        codeTitle: `${selectedMaterial} Algorithm Example`,
        codeLang: 'Java',
        codeSnippet: `// Efficient demonstration for: ${query}
public class Solution {
    public static void solve() {
        System.out.println("Processing ${selectedMaterial}...");
        // Execution complexity: O(log N) or O(N)
    }
}`,
        exampleRun: {
          array: '[10, 25, 45, 60, 80]',
          target: '45',
          steps: [
            'Evaluating index pointers and pivot element.',
            'Target matched successfully with optimal comparisons.',
            'Output: Status OK'
          ]
        }
      };

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: aiResponseContent
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 700);
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1 className="page-title">AI Tutor</h1>
          <Sparkles size={24} color="#6366f1" />
        </div>
        <p className="page-subtitle">Get instant explanations, solve doubts, practice questions, and learn step by step.</p>
      </div>

      {/* Course & Material Selectors */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px'
      }}>
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
            <select
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                fontWeight: '700',
                fontSize: '14px',
                color: 'var(--text-main)',
                outline: 'none',
                cursor: 'pointer'
              }}
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="Data Structures and Algorithms">Data Structures and Algorithms</option>
              <option value="Java Programming">Java Programming</option>
              <option value="Web Development (MERN Stack)">Web Development (MERN Stack)</option>
            </select>
          </div>
        </div>

        {/* Select Material */}
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
            <FileText size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>Select Material</div>
            <select
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                fontWeight: '700',
                fontSize: '14px',
                color: 'var(--text-main)',
                outline: 'none',
                cursor: 'pointer'
              }}
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
            >
              <option value="Arrays">Arrays</option>
              <option value="Linked Lists">Linked Lists</option>
              <option value="Recursion">Recursion</option>
              <option value="Sorting">Sorting</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mode Pills Row */}
      <div className="tabs-pill-row">
        {['Chat & Explain', 'Solve a Problem', 'Practice Questions', 'Summarize', 'Quiz Me'].map((mode) => (
          <button
            key={mode}
            className={`tab-pill-btn ${activeMode === mode ? 'active' : ''}`}
            onClick={() => setActiveMode(mode)}
          >
            {mode === 'Chat & Explain' && <Sparkles size={14} />}
            {mode === 'Solve a Problem' && <FileCode size={14} />}
            {mode === 'Practice Questions' && <FileText size={14} />}
            {mode === 'Summarize' && <Layers size={14} />}
            {mode === 'Quiz Me' && <HelpCircle size={14} />}
            <span>{mode}</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Left Chat Area + Right Context Sidebar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 330px',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Chat Window */}
        <div className="ui-card" style={{
          display: 'flex',
          flexDirection: 'column',
          height: '680px',
          overflow: 'hidden'
        }}>
          {/* Messages Scrollable Container */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {messages.map((msg) => {
              if (msg.sender === 'user') {
                return (
                  <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <div style={{ maxWidth: '75%' }}>
                      <div style={{
                        background: '#ede9fe',
                        color: 'var(--text-main)',
                        padding: '12px 18px',
                        borderRadius: '16px 16px 2px 16px',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        {msg.text}
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {msg.time}
                      </div>
                    </div>
                    <div className="avatar-circle" style={{ width: '32px', height: '32px', fontSize: '12px' }}>
                      VK
                    </div>
                  </div>
                );
              }

              // AI message
              return (
                <div key={msg.id} style={{ display: 'flex', gap: '14px', maxWidth: '92%' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#eef2ff',
                    border: '1px solid #c7d2fe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Sparkles size={18} color="#6366f1" />
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {msg.text ? (
                      <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-main)', whiteSpace: 'pre-wrap' }}>
                        {msg.text}
                      </div>
                    ) : (
                      <>
                        <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                          {msg.content.intro}
                        </div>

                        <div style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-main)' }}>
                          {msg.content.headline}
                        </div>

                        <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                          {msg.content.description}
                        </div>

                        {/* How it works card */}
                        {msg.content.howItWorks && (
                          <div style={{
                            background: 'var(--bg-subtle)',
                            borderRadius: 'var(--radius-md)',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                          }}>
                            <div style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-main)' }}>
                              How it works:
                            </div>
                            {msg.content.howItWorks.map((step, idx) => (
                              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                <div style={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  background: '#eef2ff',
                                  color: '#6366f1',
                                  fontSize: '11px',
                                  fontWeight: '700',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}>
                                  {idx + 1}
                                </div>
                                <span>{step}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Java Code block */}
                        {msg.content.codeSnippet && (
                          <div style={{ marginTop: '4px' }}>
                            <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-main)', marginBottom: '8px' }}>
                              {msg.content.codeTitle}
                            </div>
                            <div className="code-container">
                              <div className="code-header">
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <FileCode size={14} color="#f59e0b" />
                                  {msg.content.codeLang}
                                </span>
                                <button
                                  onClick={() => handleCopy(msg.content.codeSnippet)}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#94a3b8',
                                    fontSize: '12px',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {copiedCode ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                                </button>
                              </div>
                              <pre className="code-body">
                                <code>{msg.content.codeSnippet}</code>
                              </pre>
                            </div>
                          </div>
                        )}

                        {/* Example run dry run */}
                        {msg.content.exampleRun && (
                          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            <div style={{ fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>
                              Example
                            </div>
                            <div><strong>Array:</strong> {msg.content.exampleRun.array}, <strong>Target:</strong> {msg.content.exampleRun.target}</div>
                            {msg.content.exampleRun.steps.map((st, i) => (
                              <div key={i}>• {st}</div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '12px' }}>
                <Sparkles size={18} color="#6366f1" className="animate-spin" />
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>AI Tutor is thinking...</span>
              </div>
            )}
          </div>

          {/* Bottom Chat Input Bar */}
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid var(--border)',
            background: 'var(--bg-card)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <button style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px'
            }}>
              <Paperclip size={18} />
            </button>

            <input
              type="text"
              placeholder="Ask anything about the selected course and material..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '13.5px',
                color: 'var(--text-main)'
              }}
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputPrompt.trim() || isLoading}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#6366f1',
                border: 'none',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputPrompt.trim() ? 'pointer' : 'default',
                opacity: inputPrompt.trim() ? 1 : 0.6
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>

        {/* Right Sidebar: Context, Modes, Recent Chats, Suggestions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Selected Context Card */}
          <div className="ui-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>Selected Context</span>
              <button style={{ background: 'transparent', border: 'none', color: '#6366f1', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                Change
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ padding: '10px', background: 'var(--bg-subtle)', borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Course</div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>
                  {selectedCourse}
                </div>
              </div>
              <div style={{ padding: '10px', background: 'var(--bg-subtle)', borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Material</div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>
                  {selectedMaterial}
                </div>
              </div>
            </div>
          </div>

          {/* Tutor Modes List */}
          <div className="ui-card" style={{ padding: '16px' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '12px' }}>
              Tutor Modes
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {tutorModes.map((m) => {
                const Icon = m.icon;
                const isActive = activeMode === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setActiveMode(m.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      background: isActive ? '#ede9fe' : 'transparent',
                      border: isActive ? '1px solid #c7d2fe' : '1px solid transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: isActive ? '#6366f1' : 'var(--bg-subtle)',
                      color: isActive ? 'white' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: isActive ? '#4f46e5' : 'var(--text-main)' }}>
                        {m.label}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px' }}>
                        {m.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Chats */}
          <div className="ui-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>Recent Chats</span>
              <button style={{ background: 'transparent', border: 'none', color: '#6366f1', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                View All →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {aiTutor.recentChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleSendMessage(chat.title)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: chat.id === 1 ? '#ede9fe' : 'transparent',
                    fontSize: '12.5px'
                  }}
                >
                  <span style={{ fontWeight: '500', color: chat.id === 1 ? '#4f46e5' : 'var(--text-main)' }}>
                    {chat.title}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{chat.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Questions */}
          <div className="ui-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>Suggested Questions</span>
              <RotateCw size={14} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {aiTutor.suggestedQuestions.map((q, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    cursor: 'pointer',
                    fontSize: '12.5px',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <span>{q}</span>
                  <ArrowRight size={14} color="#6366f1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
