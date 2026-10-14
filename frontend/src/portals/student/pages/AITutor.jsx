import React, { useState, useRef, useEffect } from 'react';
import { api } from '../../../services/apiClient';
import {
  MessageSquare,
  BookOpen,
  Code2,
  Bug,
  FileQuestion,
  Search,
  Plus,
  Send,
  Paperclip,
  Copy,
  Check,
  ChevronDown,
  MoreHorizontal,
  ArrowRight
} from 'lucide-react';

const initialConversations = {
  c1: {
    id: 'c1',
    title: 'What is inheritance in ...',
    fullTitle: 'What is inheritance in Java?',
    category: 'Today',
    course: 'Java Programming',
    messages: [
      {
        id: 'msg-u1',
        sender: 'user',
        text: 'What is inheritance in Java?'
      },
      {
        id: 'msg-a1',
        sender: 'ai',
        intro: 'Inheritance in Java is a feature of Object-Oriented Programming that allows a new class (child class) to acquire the properties and behaviours (fields and methods) of an existing class (parent class).',
        keyPoints: [
          'Promotes code reusability',
          'Helps in method overriding',
          'Supports hierarchical and multilevel relationships',
          'Achieved using the extends keyword'
        ],
        codeSnippet: `class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Dog barks");
    }
}`,
        language: 'Java'
      }
    ]
  },
  c2: {
    id: 'c2',
    title: 'Explain polymorphism',
    fullTitle: 'Explain polymorphism in Java',
    category: 'Today',
    course: 'Java Programming',
    messages: [
      {
        id: 'msg-u2',
        sender: 'user',
        text: 'Explain polymorphism in Java'
      },
      {
        id: 'msg-a2',
        sender: 'ai',
        intro: 'Polymorphism allows objects of different classes to be treated as objects of a common superclass, allowing one interface to represent multiple underlying forms (compile-time and runtime).',
        keyPoints: [
          'Compile-time polymorphism is achieved via Method Overloading',
          'Runtime polymorphism is achieved via Method Overriding',
          'Improves program flexibility and dynamic binding'
        ],
        codeSnippet: `class Shape {
    void draw() { System.out.println("Drawing shape"); }
}

class Circle extends Shape {
    @Override
    void draw() { System.out.println("Drawing circle"); }
}`,
        language: 'Java'
      }
    ]
  },
  c3: {
    id: 'c3',
    title: 'Difference between JDK ...',
    fullTitle: 'Difference between JDK, JRE, and JVM',
    category: 'Today',
    course: 'Java Programming',
    messages: [
      {
        id: 'msg-u3',
        sender: 'user',
        text: 'What is the difference between JDK, JRE, and JVM?'
      },
      {
        id: 'msg-a3',
        sender: 'ai',
        intro: 'The Java execution ecosystem consists of three interconnected layers designed for development, standard libraries, and bytecode virtualization.',
        keyPoints: [
          'JVM (Java Virtual Machine): Executes Java bytecode line by line.',
          'JRE (Java Runtime Environment): JVM + Core libraries needed to run apps.',
          'JDK (Java Development Kit): JRE + Development tools like javac and debugger.'
        ],
        codeSnippet: `// Verify Java installation environment
public class VersionCheck {
    public static void main(String[] args) {
        System.out.println(System.getProperty("java.version"));
    }
}`,
        language: 'Java'
      }
    ]
  },
  c4: {
    id: 'c4',
    title: 'How to use ArrayList?',
    fullTitle: 'How to use ArrayList in Java?',
    category: 'Today',
    course: 'Java Programming',
    messages: [
      {
        id: 'msg-u4',
        sender: 'user',
        text: 'How to use ArrayList in Java?'
      },
      {
        id: 'msg-a4',
        sender: 'ai',
        intro: 'ArrayList is a resizable array implementation in the java.util package that allows dynamic insertion, indexing, and automatic resizing.',
        keyPoints: [
          'Dynamic capacity expansion without manual array copying',
          'Maintains insertion order and allows duplicates',
          'Fast random access with O(1) time complexity for get()'
        ],
        codeSnippet: `import java.util.ArrayList;

ArrayList<String> list = new ArrayList<>();
list.add("Java");
list.add("Python");
System.out.println(list.get(0)); // Java`,
        language: 'Java'
      }
    ]
  }
};

const historyList = [
  {
    group: 'Today',
    items: [
      { id: 'c1', title: 'What is inheritance in ...', fullTitle: 'What is inheritance in Java?' },
      { id: 'c2', title: 'Explain polymorphism', fullTitle: 'Explain polymorphism' },
      { id: 'c3', title: 'Difference between JDK ...', fullTitle: 'Difference between JDK and JRE' },
      { id: 'c4', title: 'How to use ArrayList?', fullTitle: 'How to use ArrayList?' }
    ]
  },
  {
    group: 'Yesterday',
    items: [
      { id: 'c5', title: 'Explain multithreading', fullTitle: 'Explain multithreading in Java' },
      { id: 'c6', title: 'What is JDBC?', fullTitle: 'What is JDBC?' },
      { id: 'c7', title: 'Exception handling exa...', fullTitle: 'Exception handling examples' },
      { id: 'c8', title: 'Explain lambda expression', fullTitle: 'Explain lambda expressions' }
    ]
  },
  {
    group: 'This Week',
    items: [
      { id: 'c9', title: 'Compare Array vs ArrayList', fullTitle: 'Compare Array vs ArrayList' },
      { id: 'c10', title: 'What is Spring Boot?', fullTitle: 'What is Spring Boot?' },
      { id: 'c11', title: 'Binary search time comple...', fullTitle: 'Binary search time complexity' }
    ]
  }
];

export default function AITutor({ studentData }) {
  const [activeChatId, setActiveChatId] = useState('c1');
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedCourse, setSelectedCourse] = useState('Java Programming');
  const [inputPrompt, setInputPrompt] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [searchHistoryQuery, setSearchHistoryQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef(null);
  const isFirstRender = useRef(true);

  const activeConversation = conversations[activeChatId] || {
    id: activeChatId,
    title: 'New Conversation',
    messages: []
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    scrollToBottom();
  }, [activeConversation.messages, isLoading]);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSelectHistory = (item) => {
    if (!conversations[item.id]) {
      // Create template conversation for this history entry if not yet populated
      setConversations((prev) => ({
        ...prev,
        [item.id]: {
          id: item.id,
          title: item.title,
          fullTitle: item.fullTitle,
          category: 'Past',
          course: selectedCourse,
          messages: [
            {
              id: `user-${item.id}`,
              sender: 'user',
              text: item.fullTitle
            },
            {
              id: `ai-${item.id}`,
              sender: 'ai',
              intro: `Here is a clear, concise overview and code demonstration for "${item.fullTitle}".`,
              keyPoints: [
                `Essential foundation in ${selectedCourse}`,
                'Promotes clean architecture and memory efficiency',
                'Frequently tested in technical assessments and interviews'
              ],
              codeSnippet: `// Solution example for: ${item.fullTitle}
public class Demo {
    public static void main(String[] args) {
        System.out.println("Executed successfully");
    }
}`,
              language: 'Java'
            }
          ]
        }
      }));
    }
    setActiveChatId(item.id);
  };

  const handleNewChat = () => {
    const newId = `c_${Date.now()}`;
    const newChat = {
      id: newId,
      title: 'New Conversation',
      fullTitle: 'New Conversation',
      category: 'Today',
      course: selectedCourse,
      messages: []
    };
    setConversations((prev) => ({
      ...prev,
      [newId]: newChat
    }));
    setActiveChatId(newId);
    setInputPrompt('');
  };

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputPrompt).trim();
    if (!query || isLoading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query
    };

    // Update active conversation immediately with user message
    setConversations((prev) => {
      const current = prev[activeChatId] || { id: activeChatId, title: query, messages: [] };
      return {
        ...prev,
        [activeChatId]: {
          ...current,
          title: current.title === 'New Conversation' ? (query.length > 24 ? query.slice(0, 24) + '...' : query) : current.title,
          fullTitle: query,
          messages: [...current.messages, userMsg]
        }
      };
    });

    setInputPrompt('');
    setIsLoading(true);

    try {
      const res = await api.post('/api/ai/ask', {
        prompt: query,
        course: selectedCourse
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          intro: data.response || 'Here is the detailed response from Karpom AI:',
          keyPoints: [
            'Directly maps to your current curriculum milestones',
            'Follows standard enterprise best practices',
            'Ready to test and practice in your IDE'
          ],
          codeSnippet: `// Generated for: ${query}
public class PracticeSolution {
    public static void run() {
        System.out.println("Karpom AI verification complete.");
    }
}`,
          language: 'Java'
        };

        setConversations((prev) => {
          const current = prev[activeChatId];
          return {
            ...prev,
            [activeChatId]: {
              ...current,
              messages: [...current.messages, aiMsg]
            }
          };
        });
        setIsLoading(false);
        return;
      }
    } catch (err) {
      // fallback to high quality local response
    }

    setTimeout(() => {
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        intro: `Here is a structured explanation for "${query}" in ${selectedCourse}:`,
        keyPoints: [
          'Deconstructs the core principles and underlying mechanics',
          'Enforces safe edge-case handling and optimal runtime complexity',
          'Key topic for academic coursework and industry coding rounds'
        ],
        codeSnippet: `// Implementation demonstration for: ${query}
public class KarpomExample {
    public static void execute() {
        // Core implementation logic
        System.out.println("Optimal solution executed for ${query}");
    }
}`,
        language: 'Java'
      };

      setConversations((prev) => {
        const current = prev[activeChatId];
        return {
          ...prev,
          [activeChatId]: {
            ...current,
            messages: [...current.messages, aiMsg]
          }
        };
      });
      setIsLoading(false);
    }, 600);
  };

  const handleQuickPrompt = (promptType) => {
    switch (promptType) {
      case 'concept':
        handleSendMessage(`Explain ${selectedCourse} core concept with examples`);
        break;
      case 'problem':
        handleSendMessage(`Give me a practice problem in ${selectedCourse} to solve`);
        break;
      case 'debug':
        handleSendMessage(`Help me debug common runtime errors in ${selectedCourse}`);
        break;
      case 'mcqs':
        handleSendMessage(`Generate 4 multiple choice assessment questions for ${selectedCourse}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 1. Page Header matching Reference Image */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Left: Icon + Title Stack */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'rgba(23, 75, 255, 0.08)',
            border: '1.5px solid rgba(23, 75, 255, 0.22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-neu-btn)'
          }}>
            <MessageSquare size={22} color="var(--primary)" />
          </div>
          <div>
            <div style={{
              fontSize: '11.5px',
              fontWeight: '800',
              color: 'var(--primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              AI Tutor
            </div>
            <h1 style={{
              fontSize: '22px',
              fontWeight: '800',
              color: 'var(--text-main)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em'
            }}>
              Your Personal Learning Companion
            </h1>
            <p style={{
              fontSize: '13px',
              color: 'var(--text-muted)',
              marginTop: '3px'
            }}>
              Ask questions, get explanations, practice problems, and explore concepts with Karpom AI.
            </p>
          </div>
        </div>

        {/* Right: Select Course Widget Card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-neu-btn)',
          padding: '10px 18px',
          minWidth: '220px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            background: 'rgba(23, 75, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)'
          }}>
            <BookOpen size={17} />
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{
              fontSize: '10px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--text-muted)'
            }}>
              Select Course
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontWeight: '700',
                  fontSize: '13.5px',
                  color: 'var(--text-main)',
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                  width: '100%',
                  paddingRight: '18px'
                }}
              >
                <option value="Java Programming">Java Programming</option>
                <option value="Data Structures and Algorithms">Data Structures & Algorithms</option>
                <option value="Web Development (MERN Stack)">Web Development</option>
              </select>
              <ChevronDown size={14} color="var(--primary)" style={{ pointerEvents: 'none', marginLeft: '-14px' }} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '290px minmax(0, 1fr)',
        gap: '22px',
        alignItems: 'start'
      }}>
        {/* ========================================================
            LEFT COLUMN: Chat History Sidebar Panel
            ======================================================== */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-neu-raised)',
          padding: '20px 16px',
          display: 'flex',
          flexDirection: 'column',
          height: '760px'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h2 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)' }}>
              Chat History
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setIsSearchOpen((prev) => !prev)}
                className="icon-btn-circle"
                style={{ width: '32px', height: '32px' }}
                title="Search History"
              >
                <Search size={14} />
              </button>
              <button
                onClick={handleNewChat}
                className="icon-btn-circle"
                style={{ width: '32px', height: '32px', color: 'var(--primary)' }}
                title="New Chat"
              >
                <Plus size={15} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Optional slide-down search bar */}
          {isSearchOpen && (
            <div style={{ marginBottom: '14px' }}>
              <input
                type="text"
                placeholder="Search history..."
                value={searchHistoryQuery}
                onChange={(e) => setSearchHistoryQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 12px',
                  fontSize: '12px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-input)',
                  boxShadow: 'var(--shadow-neu-inset)'
                }}
              />
            </div>
          )}

          {/* Grouped History Items List */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            paddingRight: '4px'
          }}>
            {historyList.map((group) => {
              const filteredItems = group.items.filter((item) =>
                item.fullTitle.toLowerCase().includes(searchHistoryQuery.toLowerCase())
              );

              if (filteredItems.length === 0) return null;

              return (
                <div key={group.group}>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: 'var(--text-muted)',
                    marginBottom: '8px',
                    paddingLeft: '6px'
                  }}>
                    {group.group}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {filteredItems.map((item) => {
                      const isActive = activeChatId === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectHistory(item)}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px',
                            padding: '9px 12px',
                            borderRadius: '12px',
                            border: isActive ? '1px solid rgba(23, 75, 255, 0.25)' : '1px solid transparent',
                            background: isActive ? '#EFF5FF' : 'transparent',
                            color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                            fontWeight: isActive ? '700' : '500',
                            fontSize: '12.5px',
                            textAlign: 'left',
                            cursor: 'pointer',
                            boxShadow: isActive ? 'var(--shadow-neu-btn)' : 'none',
                            transition: 'all 0.18s ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                            <MessageSquare
                              size={14}
                              color={isActive ? 'var(--primary)' : 'var(--text-muted)'}
                              style={{ flexShrink: 0 }}
                            />
                            <span style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {item.title}
                            </span>
                          </div>

                          <MoreHorizontal
                            size={14}
                            color={isActive ? 'var(--primary)' : 'var(--text-muted)'}
                            style={{ flexShrink: 0, opacity: 0.7 }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer View All History */}
          <div style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '14px',
            marginTop: '8px',
            textAlign: 'center'
          }}>
            <button
              onClick={() => {}}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '13px',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <span>View All History</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: Main Chat & Mascot Interaction Window
            ======================================================== */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '760px',
          gap: '16px'
        }}>
          {/* A. Mascot Welcome Card */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-neu-raised)',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px'
          }}>
            {/* 3D Cat Mascot Image */}
            <div style={{
              width: '110px',
              height: '110px',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src="/assets/cat_mascot.png"
                alt="Karpom Learning Buddy Mascot"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 6px 14px rgba(23, 75, 255, 0.18))'
                }}
              />
            </div>

            {/* Speech Bubble Card */}
            <div style={{
              flex: 1,
              background: '#F8FAFD',
              borderRadius: '16px',
              border: '1px solid rgba(215, 224, 237, 0.8)',
              boxShadow: 'var(--shadow-neu-btn)',
              padding: '16px 20px'
            }}>
              <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '2px' }}>
                Hi! 👋
              </div>
              <div style={{ fontSize: '13.5px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                I'm your <span style={{ color: 'var(--primary)', fontWeight: '800' }}>Karpom</span> learning buddy!
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Ask me anything and let's learn together!
              </div>
            </div>
          </div>

          {/* B. 4 Quick Action Prompts */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px'
          }}>
            <button
              onClick={() => handleQuickPrompt('concept')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 14px',
                borderRadius: '14px',
                background: '#FFFFFF',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-neu-btn)',
                color: 'var(--text-main)',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-neu-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--shadow-neu-btn)';
              }}
            >
              <BookOpen size={16} color="var(--primary)" />
              <span>Explain Concept</span>
            </button>

            <button
              onClick={() => handleQuickPrompt('problem')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 14px',
                borderRadius: '14px',
                background: '#FFFFFF',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-neu-btn)',
                color: 'var(--text-main)',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-neu-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--shadow-neu-btn)';
              }}
            >
              <Code2 size={16} color="var(--primary)" />
              <span>Solve Problem</span>
            </button>

            <button
              onClick={() => handleQuickPrompt('debug')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 14px',
                borderRadius: '14px',
                background: '#FFFFFF',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-neu-btn)',
                color: 'var(--text-main)',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-neu-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--shadow-neu-btn)';
              }}
            >
              <Bug size={16} color="#EF4444" />
              <span>Debug Code</span>
            </button>

            <button
              onClick={() => handleQuickPrompt('mcqs')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 14px',
                borderRadius: '14px',
                background: '#FFFFFF',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-neu-btn)',
                color: 'var(--text-main)',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-neu-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--shadow-neu-btn)';
              }}
            >
              <FileQuestion size={16} color="var(--primary)" />
              <span>Generate MCQs</span>
            </button>
          </div>

          {/* C. Scrollable Chat Stream */}
          <div
            ref={messagesContainerRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              paddingRight: '6px'
            }}
          >
            {activeConversation.messages.map((msg) => {
              if (msg.sender === 'user') {
                return (
                  <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      background: 'var(--primary)',
                      color: '#FFFFFF',
                      padding: '12px 22px',
                      borderRadius: '20px 20px 4px 20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      boxShadow: '0 4px 14px rgba(23, 75, 255, 0.35)',
                      maxWidth: '75%'
                    }}>
                      {msg.text}
                    </div>

                    {/* User Avatar */}
                    <div className="avatar-circle" style={{ width: '36px', height: '36px', fontSize: '13px', flexShrink: 0 }}>
                      {studentData?.profile?.initials || 'VK'}
                    </div>
                  </div>
                );
              }

              // AI Message
              return (
                <div key={msg.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', maxWidth: '92%' }}>
                  {/* Cat Mascot Avatar */}
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '1.5px solid rgba(23, 75, 255, 0.25)',
                    boxShadow: 'var(--shadow-neu-btn)',
                    overflow: 'hidden',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img
                      src="/assets/cat_mascot.png"
                      alt="AI"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>

                  {/* AI Response Card */}
                  <div style={{
                    flex: 1,
                    background: '#FFFFFF',
                    borderRadius: '20px',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-neu-raised)',
                    padding: '22px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                  }}>
                    {msg.intro && (
                      <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {msg.intro}
                      </div>
                    )}

                    {msg.keyPoints && msg.keyPoints.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--text-main)' }}>
                          Key points:
                        </div>
                        <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          {msg.keyPoints.map((point, idx) => (
                            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }} />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {msg.codeSnippet && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--text-main)' }}>
                          Example:
                        </div>
                        {/* Formatted Code Block with Copy Button */}
                        <div style={{
                          background: '#F8FAFD',
                          borderRadius: '14px',
                          border: '1px solid var(--border)',
                          boxShadow: 'var(--shadow-neu-inset)',
                          overflow: 'hidden'
                        }}>
                          {/* Code Header */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 14px',
                            borderBottom: '1px solid var(--border-subtle)',
                            background: '#F1F5F9'
                          }}>
                            <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)' }}>
                              {msg.language || 'Java'}
                            </span>
                            <button
                              onClick={() => handleCopy(msg.codeSnippet)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                background: 'transparent',
                                border: 'none',
                                color: copiedCode ? 'var(--success)' : 'var(--text-muted)',
                                fontSize: '11.5px',
                                fontWeight: '600',
                                cursor: 'pointer'
                              }}
                            >
                              {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                              <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>

                          {/* Code Body */}
                          <pre style={{
                            padding: '14px 16px',
                            margin: 0,
                            fontFamily: 'var(--font-mono)',
                            fontSize: '13px',
                            lineHeight: 1.6,
                            color: '#0F172A',
                            overflowX: 'auto'
                          }}>
                            <code>{msg.codeSnippet}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '48px' }}>
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '10px 18px',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-neu-btn)',
                  fontSize: '13px',
                  color: 'var(--primary)',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    animation: 'pulse 1s infinite'
                  }} />
                  <span>Karpom AI is thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* D. Bottom Floating Input Bar matching Reference Image */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '9999px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-neu-raised)',
            padding: '6px 8px 6px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            {/* Attachment Button */}
            <button
              type="button"
              className="icon-btn-circle"
              style={{
                width: '36px',
                height: '36px',
                border: 'none',
                boxShadow: 'none',
                background: 'transparent',
                color: 'var(--text-muted)'
              }}
              title="Attach File or Code"
            >
              <Paperclip size={18} />
            </button>

            {/* Inset Text Field */}
            <input
              type="text"
              placeholder="Ask me anything..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                boxShadow: 'none',
                fontSize: '14px',
                color: 'var(--text-main)',
                outline: 'none',
                padding: '8px 4px'
              }}
            />

            {/* Send Button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputPrompt.trim() || isLoading}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'var(--primary-gradient)',
                border: 'none',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputPrompt.trim() && !isLoading ? 'pointer' : 'not-allowed',
                boxShadow: '0 4px 14px rgba(23, 75, 255, 0.45)',
                opacity: inputPrompt.trim() && !isLoading ? 1 : 0.6,
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              title="Send Prompt"
            >
              <Send size={18} style={{ transform: 'translateX(1px)' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
