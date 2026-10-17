import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  Landmark,
  Play,
  ArrowRight,
  RotateCw,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  X,
  Check,
  Shield,
  BookOpen
} from 'lucide-react';

export default function Login({ onLogin }) {
  // Flip state for the interactive 3D flashcard
  const [isFlipped, setIsFlipped] = useState(false);

  // Form states
  const [email, setEmail] = useState('rkumar@esec.ac.in');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState('Admin'); // 'Admin' | 'Teacher' | 'Student'

  // Video Preview Modal
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Handle Sign In submission
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    onLogin({
      email: email || 'rkumar@esec.ac.in',
      role: selectedRole
    });
  };

  // Quick sign in with Institution Account
  const handleInstitutionLogin = (e) => {
    if (e) e.preventDefault();
    onLogin({
      email: 'admin@esec.ac.in',
      role: 'Admin'
    });
  };

  return (
    <div
      className="cosmic-landing-bg"
      style={{
        height: '100vh',
        minHeight: '100vh',
        width: '100%',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}
    >
      {/* ========================================================
          BACKGROUND: Fluid glowing cosmic waves and light ribbons
          ======================================================== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 0
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <g filter="url(#glow-wave)">
            {/* Upper glowing wave ribbon */}
            <path
              d="M-100,220 C320,120 480,380 920,240 C1200,150 1360,260 1600,200"
              stroke="url(#wave-gradient-1)"
              strokeWidth="2.5"
              fill="none"
              opacity="0.65"
            />
            {/* Center flowing beam */}
            <path
              d="M-50,440 C280,360 520,580 980,480 C1280,420 1420,540 1620,490"
              stroke="url(#wave-gradient-2)"
              strokeWidth="3"
              fill="none"
              opacity="0.8"
            />
            {/* Bottom ambient wave */}
            <path
              d="M-100,560 C360,500 720,600 1140,530 C1380,490 1520,540 1650,510"
              stroke="url(#wave-gradient-1)"
              strokeWidth="2"
              fill="none"
              opacity="0.45"
            />
          </g>
          <defs>
            <filter id="glow-wave" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.2" />
              <stop offset="30%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#2563EB" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0.3" />
              <stop offset="45%" stopColor="#60A5FA" stopOpacity="0.9" />
              <stop offset="80%" stopColor="#1D4ED8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>

        {/* Ambient top and right glow spots */}
        <div
          style={{
            position: 'absolute',
            top: '8%',
            right: '18%',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.28) 0%, transparent 70%)',
            filter: 'blur(50px)',
            borderRadius: '50%'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '10%',
            width: '380px',
            height: '380px',
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.16) 0%, transparent 70%)',
            filter: 'blur(60px)',
            borderRadius: '50%'
          }}
        />

        {/* Cosmic Dot Grid Matrix (fades gracefully before floor) */}
        <div className="cosmic-dots-canvas" />

        {/* Seamless Reflective Cybernetic Floor matching Image 1 */}
        <div className="cosmic-reflective-floor">
          <div className="cosmic-horizon-laser" />
          <div className="floor-reflection-card" />
          <div className="floor-reflection-center" />
          <div className="floor-sheen-overlay" />
        </div>
      </div>

      {/* ========================================================
          TOP HEADER: Brand Bar
          ======================================================== */}
      <header
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '16px 48px 4px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1440px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        {/* Karpom Logo & Brand Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #1652f0 0%, #0c38b8 100%)',
              border: '1.5px solid rgba(56, 189, 248, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(22, 82, 240, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
              overflow: 'hidden',
              flexShrink: 0
            }}
          >
            <img
              src="/assets/karpom_logo.png"
              alt="Karpom Logo"
              style={{ width: '38px', height: '38px', objectFit: 'contain' }}
              onError={(e) => {
                // High-fidelity SVG Fallback matching Karpom's continuous dual-arch monogram
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '22px',
                fontWeight: '800',
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                lineHeight: 1.15
              }}
            >
              Karpom
            </span>
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: '500',
                color: '#8E9DB8',
                letterSpacing: '0.01em',
                marginTop: '1px'
              }}
            >
              AI Learning Platform
            </span>
          </div>
        </div>

        {/* Quick Role Helper / Portal Access Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(10, 22, 52, 0.65)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '9999px',
            padding: '4px 6px'
          }}
        >
          <span style={{ fontSize: '11.5px', color: '#8E9DB8', padding: '0 8px', fontWeight: '600' }}>
            Sign In As:
          </span>
          {[
            { id: 'Admin', label: 'Admin', icon: Landmark },
            { id: 'Teacher', label: 'Teacher', icon: Users },
            { id: 'Student', label: 'Student', icon: GraduationCap }
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setSelectedRole(r.id);
                if (r.id === 'Admin') setEmail('rkumar@esec.ac.in');
                else if (r.id === 'Teacher') setEmail('rkumar@esec.ac.in');
                else setEmail('vijay.vikas@student.edu');
              }}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                border: selectedRole === r.id ? '1px solid #38BDF8' : '1px solid transparent',
                background:
                  selectedRole === r.id
                    ? 'linear-gradient(135deg, #164BE8 0%, #0E35B8 100%)'
                    : 'transparent',
                color: selectedRole === r.id ? '#FFFFFF' : '#94A3B8',
                boxShadow:
                  selectedRole === r.id
                    ? '0 0 14px rgba(22, 75, 232, 0.6)'
                    : 'none',
                transition: 'all 0.18s ease'
              }}
            >
              <r.icon size={13} />
              <span>{r.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* ========================================================
          HERO SECTION: 2-Column Landing Page Layout
          ======================================================== */}
      <main
        style={{
          position: 'relative',
          zIndex: 5,
          flex: 1,
          maxWidth: '1440px',
          width: '100%',
          margin: '0 auto',
          padding: '0 48px 16px 48px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(420px, 470px)',
          gap: '40px',
          alignItems: 'center'
        }}
      >
        {/* ========================================================
            LEFT COLUMN: Value Proposition & Feature Pillars
            ======================================================== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '620px' }}>
          {/* Badge: AI-Powered Learning Platform */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(13, 30, 68, 0.65)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.15)',
              width: 'fit-content'
            }}
          >
            <Sparkles size={14} color="#38BDF8" />
            <span style={{ fontSize: '12.5px', fontWeight: '600', color: '#BAE6FD', letterSpacing: '0.01em' }}>
              AI-Powered Learning Platform
            </span>
          </div>

          {/* Main Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <h1
              style={{
                fontSize: '48px',
                fontWeight: '900',
                letterSpacing: '-0.03em',
                lineHeight: 1.12,
                margin: 0,
                color: '#FFFFFF'
              }}
            >
              A Smarter Way
              <br />
              to Learn,{' '}
              <span
                style={{
                  color: '#2563EB',
                  background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 60%, #1D4ED8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}
              >
                Together
              </span>
            </h1>

            <p
              style={{
                fontSize: '16.5px',
                color: '#94A3B8',
                lineHeight: 1.62,
                marginTop: '12px',
                margin: 0,
                maxWidth: '540px'
              }}
            >
              Karpom connects students, teachers, and institutions with modern tools for
              effective, personalized, and collaborative learning.
            </p>
          </div>

          {/* 3 Pillar Cards (For Students, For Teachers, For Institutions) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '14px',
              marginTop: '4px'
            }}
          >
            {/* Card 1: For Students */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(8, 18, 44, 0.65)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(56, 189, 248, 0.22)',
                borderRadius: '16px',
                padding: '12px 14px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.22)';
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #164BE8 0%, #0E35B8 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 0 12px rgba(22, 75, 232, 0.5)'
                }}
              >
                <GraduationCap size={18} color="#FFFFFF" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF', lineHeight: 1.2 }}>
                  For Students
                </span>
                <span style={{ fontSize: '11px', color: '#8E9DB8', marginTop: '2px', lineHeight: 1.35 }}>
                  Learn and grow with AI support
                </span>
              </div>
            </div>

            {/* Card 2: For Teachers */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(8, 18, 44, 0.65)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(56, 189, 248, 0.22)',
                borderRadius: '16px',
                padding: '12px 14px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.22)';
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #164BE8 0%, #0E35B8 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 0 12px rgba(22, 75, 232, 0.5)'
                }}
              >
                <Users size={18} color="#FFFFFF" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF', lineHeight: 1.2 }}>
                  For Teachers
                </span>
                <span style={{ fontSize: '11px', color: '#8E9DB8', marginTop: '2px', lineHeight: 1.35 }}>
                  Create and manage engaging learning
                </span>
              </div>
            </div>

            {/* Card 3: For Institutions */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(8, 18, 44, 0.65)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(56, 189, 248, 0.22)',
                borderRadius: '16px',
                padding: '12px 14px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.22)';
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #164BE8 0%, #0E35B8 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 0 12px rgba(22, 75, 232, 0.5)'
                }}
              >
                <Landmark size={18} color="#FFFFFF" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF', lineHeight: 1.2 }}>
                  For Institutions
                </span>
                <span style={{ fontSize: '11px', color: '#8E9DB8', marginTop: '2px', lineHeight: 1.35 }}>
                  Manage learning at scale
                </span>
              </div>
            </div>
          </div>

          {/* Action Button: Watch Video → */}
          <div style={{ marginTop: '8px' }}>
            <button
              onClick={() => setIsVideoModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                padding: '10px 28px 10px 14px',
                borderRadius: '9999px',
                background: 'linear-gradient(90deg, #164BE8 0%, #0E35B8 100%)',
                border: '1.5px solid rgba(56, 189, 248, 0.45)',
                boxShadow: '0 0 28px rgba(22, 75, 232, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 0 36px rgba(56, 189, 248, 0.65)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 0 28px rgba(22, 75, 232, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.25)';
              }}
            >
              {/* Circular Play Icon */}
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  flexShrink: 0
                }}
              >
                <Play size={16} color="#164BE8" fill="#164BE8" style={{ marginLeft: '2px' }} />
              </div>
              <span>Watch Video</span>
              <ArrowRight size={17} color="#BFDBFE" />
            </button>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: The 3D Rotating Flashcard Window
            User Request:
            "when clicking the button 'click to sign in' or wherever in
            that image window that should rotae liek flashcard animation
            shoe the login window like in the second image."
            ======================================================== */}
        <div
          className="flashcard-perspective"
          style={{
            width: '100%',
            height: '520px',
            position: 'relative'
          }}
        >
          <div
            className={`flashcard-inner ${isFlipped ? 'is-flipped' : ''}`}
            onClick={(e) => {
              // Clicking anywhere on the front side triggers flip!
              if (!isFlipped) {
                setIsFlipped(true);
              }
            }}
            style={{
              width: '100%',
              height: '100%',
              cursor: isFlipped ? 'default' : 'pointer'
            }}
          >
            {/* ========================================================
                FRONT SIDE (Image 1):
                - Glowing cyan-bordered glass card with corner lens flares
                - Student + Robot Tutor Artwork
                - "Your AI Learning Companion"
                - "↻ Click to Sign In" Button
                ======================================================== */}
            <div
              className="flashcard-face flashcard-front karpom-glowing-frame pulse-glow-card"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              {/* Corner Specular Shimmers */}
              <div className="corner-glow-tl" />
              <div className="corner-glow-tr" />
              <div className="corner-glow-bl" />
              <div className="corner-glow-br" />

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '100%',
                  padding: '24px 24px 32px 24px',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {/* Artwork: Student studying with friendly Robot Tutor */}
                <div
                  style={{
                    width: '100%',
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderRadius: '18px',
                    position: 'relative'
                  }}
                >
                  <img
                    src="/assets/ai_companion_art.png"
                    alt="Your AI Learning Companion"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      borderRadius: '16px',
                      filter: 'drop-shadow(0 0 20px rgba(56, 189, 248, 0.25))'
                    }}
                  />
                </div>

                {/* Card Title & Flip Trigger Button */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                    width: '100%',
                    marginTop: '8px'
                  }}
                >
                  <h3
                    style={{
                      fontSize: '21px',
                      fontWeight: '800',
                      color: '#FFFFFF',
                      letterSpacing: '-0.02em',
                      margin: 0,
                      textAlign: 'center'
                    }}
                  >
                    Your AI Learning Companion
                  </h3>

                  {/* "Click to Sign In" Pill Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFlipped(true);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '9px',
                      padding: '9px 24px',
                      borderRadius: '9999px',
                      background: 'rgba(10, 22, 54, 0.85)',
                      border: '1.5px solid rgba(56, 189, 248, 0.45)',
                      color: '#FFFFFF',
                      fontSize: '13.5px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: '0 0 18px rgba(56, 189, 248, 0.25)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#38BDF8';
                      e.currentTarget.style.boxShadow = '0 0 26px rgba(56, 189, 248, 0.55)';
                      e.currentTarget.style.transform = 'scale(1.04)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.45)';
                      e.currentTarget.style.boxShadow = '0 0 18px rgba(56, 189, 248, 0.25)';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    <RotateCw size={14} color="#38BDF8" />
                    <span>Click to Sign In</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ========================================================
                BACK SIDE (Image 2):
                - Exact matching glowing frame & corner flares
                - Karpom brand header
                - "Sign In" heading & subtitle
                - Email & Password fields
                - Remember me + Forgot password?
                - Primary "Sign In →" Button
                - "─ or ─"
                - "🏛️ Sign in with Institution Account" Button
                ======================================================== */}
            <div
              className="flashcard-face flashcard-back karpom-glowing-frame"
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              {/* Corner Specular Shimmers */}
              <div className="corner-glow-tl" />
              <div className="corner-glow-tr" />
              <div className="corner-glow-bl" />
              <div className="corner-glow-br" />

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  padding: '36px 36px 32px 36px',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {/* Brand Header with Flip-Back Action */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #1652f0 0%, #0c38b8 100%)',
                        border: '1.5px solid rgba(56, 189, 248, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 20px rgba(22, 82, 240, 0.65)',
                        overflow: 'hidden',
                        flexShrink: 0
                      }}
                    >
                      <img
                        src="/assets/karpom_logo.png"
                        alt="Karpom Logo"
                        style={{ width: '38px', height: '38px', objectFit: 'contain' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                        Karpom
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: '500', color: '#8E9DB8' }}>
                        AI Learning Platform
                      </span>
                    </div>
                  </div>

                  {/* Flip-Back to Companion Preview Button */}
                  <button
                    type="button"
                    onClick={() => setIsFlipped(false)}
                    title="Back to Preview"
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#BAE6FD',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.18s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(56, 189, 248, 0.25)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.color = '#BAE6FD';
                    }}
                  >
                    <RotateCw size={15} />
                  </button>
                </div>

                {/* Form Content */}
                <form
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '16px' }}
                >
                  <div>
                    <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
                      Sign In
                    </h2>
                    <p style={{ fontSize: '13.5px', color: '#94A3B8', marginTop: '4px', margin: 0 }}>
                      Welcome back! Please sign in to continue.
                    </p>
                  </div>

                  {/* Email Input Field */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: 'rgba(13, 25, 58, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                    }}
                  >
                    <Mail size={18} color="#7B8BA6" style={{ flexShrink: 0 }} />
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: '#FFFFFF',
                        fontSize: '14px',
                        width: '100%'
                      }}
                    />
                  </div>

                  {/* Password Input Field */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: 'rgba(13, 25, 58, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                    }}
                  >
                    <Lock size={18} color="#7B8BA6" style={{ flexShrink: 0 }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: '#FFFFFF',
                        fontSize: '14px',
                        width: '100%'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#7B8BA6',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        padding: 0
                      }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Remember Me & Forgot Password Row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', userSelect: 'none' }}>
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        style={{
                          width: '16px',
                          height: '16px',
                          accentColor: '#164BE8',
                          cursor: 'pointer',
                          borderRadius: '4px'
                        }}
                      />
                      <span style={{ color: '#E2E8F0', fontWeight: '500' }}>Remember me</span>
                    </label>

                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Password reset instructions will be sent to your institutional email.');
                      }}
                      style={{
                        color: '#38BDF8',
                        textDecoration: 'none',
                        fontWeight: '600'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Primary CTA: Sign In → */}
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '13px 20px',
                      borderRadius: '12px',
                      background: 'linear-gradient(90deg, #164BE8 0%, #103FE0 100%)',
                      border: 'none',
                      color: '#FFFFFF',
                      fontSize: '15px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 22px rgba(22, 75, 232, 0.65)',
                      transition: 'all 0.2s ease',
                      marginTop: '4px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 6px 28px rgba(22, 75, 232, 0.85)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 4px 22px rgba(22, 75, 232, 0.65)';
                    }}
                  >
                    <span>Sign In</span>
                    <ArrowRight size={17} />
                  </button>

                  {/* Divider: or */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: '#64748B',
                      fontSize: '12px',
                      margin: '4px 0'
                    }}
                  >
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
                    <span>or</span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
                  </div>

                  {/* Secondary CTA: Sign in with Institution Account */}
                  <button
                    type="button"
                    onClick={handleInstitutionLogin}
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      borderRadius: '12px',
                      background: 'rgba(13, 25, 58, 0.55)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      color: '#FFFFFF',
                      fontSize: '13.5px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(22, 75, 232, 0.25)';
                      e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(13, 25, 58, 0.55)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
                    }}
                  >
                    <Landmark size={16} color="#38BDF8" />
                    <span>Sign in with Institution Account</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================
          VIDEO PREVIEW MODAL
          ======================================================== */}
      {isVideoModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsVideoModalOpen(false)}
          style={{ zIndex: 1200 }}
        >
          <div
            className="karpom-glowing-frame"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '800px',
              maxWidth: '92vw',
              borderRadius: '24px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 24px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(22, 75, 232, 0.5)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#164BE8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Play size={14} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '2px' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>
                    Welcome to Karpom AI Learning Platform
                  </h3>
                  <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0, marginTop: '2px' }}>
                    Discover how AI empowers students, faculty, and institutions.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Simulated Animated Interactive Video Demo View */}
            <div
              style={{
                width: '100%',
                height: '380px',
                borderRadius: '16px',
                background: '#040816',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src="/assets/ai_companion_art.png"
                alt="Karpom Demo Preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.75
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle, rgba(0, 0, 0, 0.2) 0%, rgba(4, 8, 22, 0.85) 90%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '14px'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #164BE8 0%, #0E35B8 100%)',
                    border: '2px solid rgba(56, 189, 248, 0.8)',
                    boxShadow: '0 0 32px rgba(22, 75, 232, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    setIsFlipped(true);
                  }}
                >
                  <Play size={24} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '3px' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF' }}>
                    Interactive Platform Tour
                  </div>
                  <div style={{ fontSize: '12px', color: '#93C5FD', marginTop: '4px' }}>
                    Click to sign in and experience the live environment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
