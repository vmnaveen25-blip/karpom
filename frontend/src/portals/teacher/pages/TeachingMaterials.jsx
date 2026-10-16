import React, { useState, useMemo } from 'react';
import {
  FolderOpen,
  FileText,
  Video,
  Download,
  Trash2,
  Plus,
  Search,
  Sparkles,
  Clock,
  UploadCloud,
  X,
  Eye
} from 'lucide-react';

export default function TeachingMaterials({ teacherData, setTeacherData }) {
  const [selectedCourseId, setSelectedCourseId] = useState('CSE301');
  const [selectedUnit, setSelectedUnit] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Upload Modal State
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    unitNumber: 1,
    type: 'pdf',
    description: '',
    enableAiIndex: true,
    fileAttached: false,
    fileName: ''
  });
  const [isUploading, setIsUploading] = useState(false);

  // Preview Drawer
  const [previewMaterial, setPreviewMaterial] = useState(null);

  const currentCourse = useMemo(() => {
    return (teacherData.courses || []).find((c) => c.id === selectedCourseId) || teacherData.courses[0];
  }, [teacherData.courses, selectedCourseId]);

  // Filter materials
  const filteredMaterials = useMemo(() => {
    return (teacherData.materials || []).filter((mat) => {
      const matchCourse = mat.courseId === selectedCourseId;
      const matchUnit = selectedUnit === 'All' || mat.unitNumber === Number(selectedUnit);
      const matchType = selectedType === 'All' || mat.type === selectedType;
      const matchSearch =
        mat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (mat.summary && mat.summary.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCourse && matchUnit && matchType && matchSearch;
    });
  }, [teacherData.materials, selectedCourseId, selectedUnit, selectedType, searchQuery]);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      const newMat = {
        id: `mat_${Date.now()}`,
        courseId: selectedCourseId,
        unitNumber: Number(uploadForm.unitNumber),
        unitTitle: `Unit ${uploadForm.unitNumber}`,
        title: uploadForm.title || (uploadForm.fileName || 'New_Course_Resource.pdf'),
        type: uploadForm.type,
        size: '3.4 MB',
        uploadDate: 'Just now',
        downloads: 0,
        aiStatus: uploadForm.enableAiIndex ? 'Processed (AI Indexed)' : 'Uploaded',
        summary: uploadForm.description || 'Uploaded course teaching document and study material.'
      };

      if (setTeacherData) {
        setTeacherData((prev) => ({
          ...prev,
          materials: [newMat, ...(prev.materials || [])]
        }));
      }

      setIsUploading(false);
      setUploadModalOpen(false);
      setUploadForm({
        title: '',
        unitNumber: 1,
        type: 'pdf',
        description: '',
        enableAiIndex: true,
        fileAttached: false,
        fileName: ''
      });
    }, 600);
  };

  const handleDeleteMaterial = (id) => {
    if (!confirm('Are you sure you want to remove this teaching material?')) return;
    if (setTeacherData) {
      setTeacherData((prev) => ({
        ...prev,
        materials: (prev.materials || []).filter((m) => m.id !== id)
      }));
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'pdf':
        return { label: 'PDF Document', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' };
      case 'ppt':
        return { label: 'Presentation (PPT)', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' };
      case 'video':
        return { label: 'Video Lecture', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' };
      case 'docx':
        return { label: 'Source / Document', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' };
      default:
        return { label: 'Resource', color: 'var(--primary)', bg: 'var(--primary-soft)' };
    }
  };

  return (
    <div className="fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="page-title">Teaching Materials</h1>
          <p className="page-subtitle">
            Course reference repository, syllabus readings, lecture slides, and AI-grounded source documents.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="btn-primary"
          style={{ height: '40px', padding: '0 18px', fontSize: '13.5px' }}
        >
          <UploadCloud size={16} />
          <span>Upload Material</span>
        </button>
      </div>

      {/* Course Selector & Search Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px',
        padding: '16px 20px',
        background: 'var(--bg-card)',
        borderRadius: '16px',
        border: '1px solid var(--border)'
      }}>
        {/* Course Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Select Course:</span>
          <select
            value={selectedCourseId}
            onChange={(e) => {
              setSelectedCourseId(e.target.value);
              setSelectedUnit('All');
            }}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              background: 'var(--bg-subtle)',
              fontSize: '13.5px',
              fontWeight: '600',
              color: 'var(--text-main)',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {(teacherData.courses || []).map((crs) => (
              <option key={crs.id} value={crs.id}>
                {crs.code} — {crs.title}
              </option>
            ))}
          </select>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="search-input"
            placeholder="Search material title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '38px', height: '38px', fontSize: '13px' }}
          />
        </div>
      </div>

      {/* Unit Filter Tabs & Type Chips */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        {/* Unit Tabs */}
        <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-subtle)', padding: '4px', borderRadius: '12px', overflowX: 'auto' }}>
          {['All', '1', '2', '3', '4', '5'].map((u) => (
            <button
              key={u}
              onClick={() => setSelectedUnit(u)}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                border: 'none',
                background: selectedUnit === u ? 'var(--bg-card)' : 'transparent',
                color: selectedUnit === u ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: selectedUnit === u ? '600' : '500',
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: selectedUnit === u ? 'var(--shadow-xs)' : 'none',
                whiteSpace: 'nowrap'
              }}
            >
              {u === 'All' ? 'All Units' : `Unit ${u}`}
            </button>
          ))}
        </div>

        {/* Resource Type Filter */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'All', label: 'All Formats' },
            { id: 'pdf', label: 'PDF' },
            { id: 'ppt', label: 'Slides' },
            { id: 'docx', label: 'Code/Docs' },
            { id: 'video', label: 'Videos' }
          ].map((tp) => (
            <button
              key={tp.id}
              onClick={() => setSelectedType(tp.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: selectedType === tp.id ? 'var(--primary-soft)' : 'var(--bg-card)',
                color: selectedType === tp.id ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: selectedType === tp.id ? '700' : '500',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              {tp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {filteredMaterials.length === 0 ? (
          <div className="ui-card" style={{ gridColumn: '1 / -1', padding: '60px 20px', textAlign: 'center', borderRadius: '16px' }}>
            <FolderOpen size={44} color="var(--text-disabled)" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)' }}>No materials found</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '420px', margin: '6px auto 16px auto' }}>
              No uploaded documents or slides match your selected unit and format filters for {currentCourse?.code}.
            </p>
            <button onClick={() => setUploadModalOpen(true)} className="btn-primary" style={{ height: '38px', fontSize: '13px' }}>
              <Plus size={15} />
              <span>Upload New Material</span>
            </button>
          </div>
        ) : (
          filteredMaterials.map((mat) => {
            const badge = getTypeBadge(mat.type);
            return (
              <div
                key={mat.id}
                className="ui-card"
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  border: '1px solid var(--border)'
                }}
              >
                {/* Header Icon & Type */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: badge.bg,
                      color: badge.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {mat.type === 'video' ? <Video size={22} /> : <FileText size={22} />}
                    </div>
                    <div>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: badge.bg,
                        color: badge.color,
                        fontSize: '11px',
                        fontWeight: '700'
                      }}>
                        {badge.label}
                      </span>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Unit {mat.unitNumber} • {mat.size}
                      </div>
                    </div>
                  </div>

                  {/* AI Status Badge */}
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    background: mat.aiStatus.includes('Processed') ? 'var(--success-soft)' : 'var(--warning-soft)',
                    color: mat.aiStatus.includes('Processed') ? 'var(--success)' : 'var(--warning)',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}>
                    {mat.aiStatus.includes('Processed') ? <Sparkles size={11} /> : <Clock size={11} />}
                    {mat.aiStatus}
                  </span>
                </div>

                {/* Title & Summary */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', lineHeight: '1.4', marginBottom: '6px' }}>
                    {mat.title}
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--text-muted)',
                    lineHeight: '1.5',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {mat.summary}
                  </p>
                </div>

                {/* Metadata details */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  borderTop: '1px solid var(--border)',
                  paddingTop: '12px'
                }}>
                  <span>Uploaded {mat.uploadDate}</span>
                  <span>{mat.downloads} student downloads</span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                  <button
                    onClick={() => setPreviewMaterial(mat)}
                    className="btn-primary"
                    style={{ flex: 1, height: '36px', fontSize: '12.5px' }}
                  >
                    <Eye size={14} />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => alert(`Downloading ${mat.title}...`)}
                    className="btn-outline"
                    style={{ height: '36px', padding: '0 12px', fontSize: '12.5px' }}
                    title="Download file"
                  >
                    <Download size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteMaterial(mat.id)}
                    className="btn-outline"
                    style={{ height: '36px', padding: '0 10px', fontSize: '12.5px', color: 'var(--danger)' }}
                    title="Delete resource"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Upload Material Modal */}
      {uploadModalOpen && (
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
            width: '540px',
            maxWidth: '100%',
            padding: '28px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <UploadCloud size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
                  Upload Teaching Material
                </h3>
              </div>
              <button
                onClick={() => setUploadModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Course & Unit Selectors */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Course
                  </label>
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-input)', fontSize: '13px' }}
                  >
                    {(teacherData.courses || []).map((c) => (
                      <option key={c.id} value={c.id}>{c.code} — {c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Curriculum Unit
                  </label>
                  <select
                    value={uploadForm.unitNumber}
                    onChange={(e) => setUploadForm({ ...uploadForm, unitNumber: e.target.value })}
                    style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-input)', fontSize: '13px' }}
                  >
                    {[1, 2, 3, 4, 5].map((u) => (
                      <option key={u} value={u}>Unit {u}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Material Title *
                </label>
                <input
                  type="text"
                  required
                  className="search-input"
                  placeholder="e.g. Unit 3 Concurrency & Thread Synchronization Notes.pdf"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  style={{ height: '40px' }}
                />
              </div>

              {/* Format selection */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Resource Format
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {[
                    { id: 'pdf', label: 'PDF Document' },
                    { id: 'ppt', label: 'Slides (PPT)' },
                    { id: 'docx', label: 'Code/Docx' },
                    { id: 'video', label: 'Video Lecture' }
                  ].map((fmt) => (
                    <button
                      key={fmt.id}
                      type="button"
                      onClick={() => setUploadForm({ ...uploadForm, type: fmt.id })}
                      style={{
                        padding: '8px 4px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        background: uploadForm.type === fmt.id ? 'var(--primary-soft)' : 'var(--bg-subtle)',
                        color: uploadForm.type === fmt.id ? 'var(--primary)' : 'var(--text-secondary)',
                        fontSize: '11.5px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* File Dropzone Simulated */}
              <div
                onClick={() => setUploadForm({ ...uploadForm, fileAttached: true, fileName: uploadForm.title || 'Attached_Curriculum_Doc.pdf' })}
                style={{
                  border: '2px dashed var(--border)',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center',
                  background: uploadForm.fileAttached ? 'var(--primary-soft)' : 'var(--bg-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <UploadCloud size={28} color={uploadForm.fileAttached ? 'var(--primary)' : 'var(--text-muted)'} style={{ margin: '0 auto 6px auto' }} />
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>
                  {uploadForm.fileAttached ? `Selected: ${uploadForm.fileName}` : 'Click to select or drag document here'}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Supports PDF, PPTX, MP4, ZIP, DOCX (up to 50 MB)
                </div>
              </div>

              {/* AI Index Checkbox */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-main)' }}>
                <input
                  type="checkbox"
                  checked={uploadForm.enableAiIndex}
                  onChange={(e) => setUploadForm({ ...uploadForm, enableAiIndex: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                />
                <span>
                  <strong>Ground with AI Assistant</strong> (index text strictly for verified assessment generation and student tutoring).
                </span>
              </label>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="btn-primary"
                  style={{ flex: 1, height: '42px', fontSize: '13.5px' }}
                >
                  {isUploading ? 'Uploading & Indexing...' : 'Upload & Index Material'}
                </button>
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
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

      {/* Preview Drawer */}
      {previewMaterial && (
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
            width: '600px',
            maxWidth: '100%',
            padding: '28px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '700' }}>
                  {previewMaterial.unitTitle}
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', marginTop: '4px' }}>
                  {previewMaterial.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewMaterial(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{
              padding: '20px',
              borderRadius: '12px',
              background: 'var(--bg-subtle)',
              fontSize: '13.5px',
              color: 'var(--text-secondary)',
              lineHeight: '1.6'
            }}>
              <strong>Grounding Summary:</strong>
              <p style={{ marginTop: '6px', margin: 0 }}>{previewMaterial.summary}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: 'var(--text-muted)' }}>
              <span>File size: {previewMaterial.size}</span>
              <span>AI Status: {previewMaterial.aiStatus}</span>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                onClick={() => {
                  alert(`Downloading file: ${previewMaterial.title}`);
                  setPreviewMaterial(null);
                }}
                className="btn-primary"
                style={{ flex: 1, height: '40px' }}
              >
                <Download size={16} />
                <span>Download Document</span>
              </button>
              <button
                onClick={() => setPreviewMaterial(null)}
                className="btn-outline"
                style={{ height: '40px' }}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
