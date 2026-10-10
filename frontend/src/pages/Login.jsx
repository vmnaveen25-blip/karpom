import React, { useState } from 'react';
import {
  BookOpen,
  TrendingUp,
  FileText,
  ShieldCheck,
  Users,
  GraduationCap,
  Building,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Globe,
  ArrowRight,
  Info
} from 'lucide-react';

export default function Login({ onLogin, theme, setTheme }) {
  const [email, setEmail] = useState('vijay.vikas@college.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Student');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, role: selectedRole });
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eef2ff 0%, #f8fafc 50%, #e0e7ff 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 40px'
    }}>
      {/* Top Bar */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(99, 102, 241, 0.4)'
          }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ffffff' }} />
          </div>
          <span style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.02em', color: '#0f172a' }}>
            Tutor <span style={{ color: '#4f46e5' }}>V2</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={toggleTheme}
            className="icon-btn-circle"
            style={{ width: '36px', height: '36px', background: 'white' }}
          >
            {theme === 'dark' ? <Sun size={17} color="#f59e0b" /> : <Moon size={17} color="#64748b" />}
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: 'var(--radius-full)',
            background: 'white',
            border: '1px solid var(--border)',
            fontSize: '13px',
            fontWeight: '600',
            color: '#1e293b'
          }}>
            <Globe size={15} color="#64748b" />
            <span>English</span>
          </div>
        </div>
      </header>

      {/* Main 2-Column Split */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: '40px',
        alignItems: 'center',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Left Column: Branding, Robot, Features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: '#ede9fe',
              color: '#6366f1',
              fontSize: '12px',
              fontWeight: '700',
              marginBottom: '14px'
            }}>
              AI-Powered Learning Platform
            </div>

            <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.03em' }}>
              Welcome Back <br />
              to <span style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tutor V2</span>
            </h1>

            <p style={{ fontSize: '15px', color: '#64748b', marginTop: '10px' }}>
              Sign in to continue your personalized learning journey with AI.
            </p>
          </div>

          {/* 4 Feature Points */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ede9fe', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <BookOpen size={18} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>AI Tutor</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Step-by-step help</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <TrendingUp size={18} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>Track Progress</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Visual learning journey</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileText size={18} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>Learn from Materials</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Upload PDFs & notes</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fffbeb', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldCheck size={18} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>Secure & Trusted</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Campus accredited</div>
              </div>
            </div>
          </div>

          {/* Center Mascot Artwork */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '6px 0' }}>
            <img
              src="/assets/login_robot.png"
              alt="Tutor V2 Learning AI"
              style={{ maxHeight: '200px', objectFit: 'contain', filter: 'drop-shadow(0 15px 25px rgba(99, 102, 241, 0.2))' }}
            />
          </div>

          {/* Social Proof Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            background: 'white',
            padding: '14px 20px',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Users size={22} color="#6366f1" />
              <div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>10K+</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Active Learners</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GraduationCap size={22} color="#3b82f6" />
              <div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>500+</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Courses Created</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Building size={22} color="#10b981" />
              <div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>100+</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Institutions Trust Us</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sign In Card */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          position: 'relative'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.02em' }}>
            Sign In
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
            Access your Tutor V2 account
          </p>

          {/* Quick Role Picker for Testing Mini-Project roles */}
          <div style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px', textTransform: 'uppercase' }}>
              Select Portal Role
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {['Student', 'Teacher', 'Admin', 'Super Admin'].map((role) => (
                <button
                  type="button"
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  style={{
                    padding: '8px 2px',
                    borderRadius: '8px',
                    border: selectedRole === role ? '1.5px solid #6366f1' : '1px solid #e2e8f0',
                    background: selectedRole === role ? '#ede9fe' : '#f8fafc',
                    color: selectedRole === role ? '#4f46e5' : '#475569',
                    fontSize: '11.5px',
                    fontWeight: selectedRole === role ? '700' : '500',
                    cursor: 'pointer'
                  }}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Email Address */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your institution email"
                  required
                  style={{
                    width: '100%',
                    height: '46px',
                    padding: '0 16px 0 42px',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    fontSize: '13.5px',
                    color: '#0f172a',
                    outline: 'none'
                  }}
                />
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                e.g. yourname@college.edu
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Please contact institution admin to reset credentials.'); }} style={{ fontSize: '12px', color: '#6366f1', textDecoration: 'none', fontWeight: '600' }}>
                  Forgot password?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{
                    width: '100%',
                    height: '46px',
                    padding: '0 42px 0 42px',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    fontSize: '13.5px',
                    color: '#0f172a',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="btn-primary"
              style={{
                height: '48px',
                fontSize: '15px',
                fontWeight: '700',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                marginTop: '6px'
              }}
            >
              <span>Sign In</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* OR Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            margin: '24px 0',
            color: '#94a3b8',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            <span style={{ padding: '0 12px' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          </div>

          {/* Institution Notice Box */}
          <div style={{
            background: '#f1f5f9',
            borderRadius: '12px',
            padding: '14px 16px',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
          }}>
            <Info size={18} color="#6366f1" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
              <strong>Accounts are created and managed by your institution administrator.</strong> If you don't have an account, please contact your college office.
            </div>
          </div>

          {/* Slogan */}
          <div style={{
            textAlign: 'right',
            marginTop: '20px',
            fontFamily: 'cursive',
            fontSize: '16px',
            color: '#6366f1',
            transform: 'rotate(-2deg)'
          }}>
            Smarter Learning, Brighter Futures
          </div>
        </div>
      </div>
    </div>
  );
}
