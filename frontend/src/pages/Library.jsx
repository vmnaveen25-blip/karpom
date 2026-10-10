import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Download,
  ExternalLink,
  FileText,
  Code,
  Link as LinkIcon,
  Folder,
  LayoutGrid,
  List,
  ChevronRight,
  MessageSquare,
  Sparkles,
  MoreVertical
} from 'lucide-react';

export default function Library({ studentData }) {
  const { libraryResources } = studentData;
  const [activeTabSub, setActiveTabSub] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = libraryResources.filter((res) => {
    if (activeTabSub === 'slides' && res.category !== 'slides') return false;
    if (activeTabSub === 'assignments' && res.category !== 'assignments') return false;
    if (activeTabSub === 'reference' && res.category !== 'reference') return false;
    if (activeTabSub === 'code' && res.category !== 'code') return false;
    if (searchQuery && !res.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Title */}
      <div>
        <h1 className="page-title">Library</h1>
        <p className="page-subtitle">Access all learning materials shared by your teachers. Explore slides, assignments, references and code files.</p>
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

      {/* Tabs Row */}
      <div className="tabs-pill-row">
        {[
          { id: 'all', label: 'All Resources' },
          { id: 'slides', label: 'Lecture Slides' },
          { id: 'assignments', label: 'Assignments' },
          { id: 'reference', label: 'Reference Materials' },
          { id: 'code', label: 'Code Files' },
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

      {/* Search & Sort Controls */}
      <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="search-input"
            style={{ borderRadius: 'var(--radius-md)', paddingLeft: '40px' }}
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select className="selector-select">
          <option>Sort by: Latest</option>
          <option>Sort by: Size</option>
          <option>Sort by: Name</option>
        </select>

        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-subtle)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
          <button style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LayoutGrid size={16} />
          </button>
          <button style={{ background: 'transparent', color: 'var(--text-muted)', border: 'none', borderRadius: '6px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Main Grid: Resources (Left) + Storage & Categories (Right) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 320px',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left: 9 Resource Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          {filtered.map((res) => (
            <div
              key={res.id}
              className="ui-card"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Header Icon + Badge + Menu */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: res.category === 'slides' ? '#fef2f2' :
                                res.category === 'assignments' ? '#ede9fe' :
                                res.category === 'code' ? '#ecfdf5' : '#eff6ff',
                    color: res.category === 'slides' ? '#ef4444' :
                           res.category === 'assignments' ? '#6366f1' :
                           res.category === 'code' ? '#10b981' : '#3b82f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {res.category === 'code' ? <Code size={18} /> :
                     res.category === 'reference' ? <LinkIcon size={18} /> :
                     <FileText size={18} />}
                  </div>

                  <span style={{
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '11px',
                    fontWeight: '700',
                    background: res.category === 'slides' ? '#fff1f2' :
                                res.category === 'assignments' ? '#ede9fe' :
                                res.category === 'code' ? '#ecfdf5' : '#eff6ff',
                    color: res.category === 'slides' ? '#e11d48' :
                           res.category === 'assignments' ? '#6366f1' :
                           res.category === 'code' ? '#059669' : '#2563eb'
                  }}>
                    {res.type}
                  </span>

                  <MoreVertical size={16} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
                </div>

                <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)', lineHeight: 1.3 }}>
                  {res.title}
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {res.fileName}
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  <span>{res.date}</span>
                  <span>{res.size}</span>
                </div>

                {res.action === 'Open Link' ? (
                  <a
                    href={res.url || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline"
                    style={{ width: '100%', textDecoration: 'none', padding: '8px' }}
                  >
                    <ExternalLink size={15} />
                    <span>Open Link</span>
                  </a>
                ) : (
                  <button
                    className="btn-outline"
                    style={{ width: '100%', padding: '8px' }}
                    onClick={() => alert(`Downloading ${res.fileName}...`)}
                  >
                    <Download size={15} />
                    <span>Download</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar: Storage Usage, Categories, Recently Added, Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Storage Usage Donut */}
          <div className="ui-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '16px' }}>
              Storage Usage
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ position: 'relative', width: '70px', height: '70px', flexShrink: 0 }}>
                <svg width="70" height="70" viewBox="0 0 70 70">
                  <circle cx="35" cy="35" r="28" fill="none" stroke="var(--border)" strokeWidth="6" />
                  <circle
                    cx="35"
                    cy="35"
                    r="28"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="6"
                    strokeDasharray="175.9"
                    strokeDashoffset={175.9 * (1 - 0.65)}
                    strokeLinecap="round"
                    transform="rotate(-90 35 35)"
                  />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '800' }}>
                  65%
                </div>
              </div>

              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>1.3 GB used of 2 GB</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px', fontSize: '11.5px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                      PDFs
                    </span>
                    <strong>820 MB</strong>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                      Code Files
                    </span>
                    <strong>320 MB</strong>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8' }} />
                      Others
                    </span>
                    <strong>160 MB</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Resource Categories List */}
          <div className="ui-card" style={{ padding: '18px' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '14px' }}>
              Resource Categories
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              {[
                { name: 'Lecture Slides', count: 24, icon: FileText, color: '#ef4444' },
                { name: 'Assignments', count: 12, icon: FileText, color: '#6366f1' },
                { name: 'Reference Materials', count: 10, icon: LinkIcon, color: '#3b82f6' },
                { name: 'Code Files', count: 16, icon: Code, color: '#10b981' },
              ].map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      background: 'var(--bg-subtle)',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
                      <Icon size={15} color={cat.color} />
                      {cat.name}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '12px' }}>
                      {cat.count}
                      <ChevronRight size={14} />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recently Added */}
          <div className="ui-card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>Recently Added</span>
              <span style={{ fontSize: '11px', color: '#6366f1', fontWeight: '600', cursor: 'pointer' }}>View All →</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              {[
                { title: 'Unit 3 - Recursion Slides', date: 'Oct 10, 2026', icon: FileText, color: '#ef4444' },
                { title: 'Algorithm Visualization Tool', date: 'Oct 8, 2026', icon: LinkIcon, color: '#3b82f6' },
                { title: 'Assignment 2 - Sorting', date: 'Oct 5, 2026', icon: FileText, color: '#6366f1' },
                { title: 'Array Practice Programs', date: 'Oct 1, 2026', icon: Code, color: '#10b981' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={15} color={item.color} />
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{item.title}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{item.date}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="ui-card" style={{ padding: '16px', display: 'flex', gap: '8px' }}>
            <button className="btn-secondary" style={{ flex: 1, padding: '10px 4px', fontSize: '12px' }}>
              <MessageSquare size={14} color="#6366f1" />
              <span>Request Resource</span>
            </button>
            <button className="btn-secondary" style={{ flex: 1, padding: '10px 4px', fontSize: '12px' }}>
              <Sparkles size={14} color="#f59e0b" />
              <span>Suggest Material</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
