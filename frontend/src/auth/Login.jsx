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
      backgroundColor: 'var(--obsidian)',
      backgroundImage: 'radial-gradient(circle at 18% 15%, rgba(23, 75, 255, 0.16) 0%, transparent 45%), radial-gradient(circle at 82% 82%, rgba(16, 53, 201, 0.12) 0%, transparent 50%)',
      color: 'var(--text-main)',
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
            background: 'linear-gradient(135deg, #174BFF 0%, #1035C9 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(23, 75, 255, 0.45)'
          }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ffffff' }} />
          </div>
          <span style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
            Tutor <span style={{ color: 'var(--primary)' }}>V2</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={toggleTheme}
            className="icon-btn-circle"
            style={{ width: '38px', height: '38px' }}
          >
            {theme === 'dark' ? <Sun size={17} color="#f59e0b" /> : <Moon size={17} color="var(--text-muted)" />}
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--glass-surface)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border)',
            fontSize: '13px',
            fontWeight: '600',
            color: 'var(--text-main)'
          }}>
            <Globe size={15} color="var(--accent-ice)" />
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
              background: 'var(--primary-soft)',
              border: '1px solid rgba(23, 75, 255, 0.35)',
              color: 'var(--accent-ice)',
              fontSize: '12px',
              fontWeight: '700',
              marginBottom: '14px'
            }}>
              AI-Powered Learning Platform
            </div>

            <h1 style={{ fontSize: '42px', fontWeight: '900', color: 'var(--text-main)', lineHeight: 1.15, letterSpacing: '-0.03em' }}>
              Welcome Back <br />
              to <span style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #8FAEFF 50%, #174BFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tutor V2</span>
            </h1>

            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '10px' }}>
              Sign in to continue your personalized learning journey with AI.
            </p>
          </div>

          {/* 4 Feature Points */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: 'var(--glass-surface)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(14px)', borderRadius: '14px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--primary-soft)', color: 'var(--accent-ice)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <BookOpen size={18} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>AI Tutor</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Step-by-step help</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: 'var(--glass-surface)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(14px)', borderRadius: '14px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <TrendingUp size={18} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>Track Progress</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Visual learning journey</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: 'var(--glass-surface)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(14px)', borderRadius: '14px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--primary-soft)', color: 'var(--accent-ice)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileText size={18} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>Learn from Materials</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Upload PDFs & notes</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: 'var(--glass-surface)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(14px)', borderRadius: '14px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldCheck size={18} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>Secure & Trusted</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Campus accredited</div>
              </div>
            </div>
          </div>

          {/* Center Mascot Artwork */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '6px 0' }}>
            <img
              src="/assets/login_robot.png"
              alt="Tutor V2 Learning AI"
              style={{ maxHeight: '200px', objectFit: 'contain', filter: 'drop-shadow(0 15px 30px rgba(23, 75, 255, 0.35))' }}
            />
          </div>

          {/* Social Proof Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            background: 'var(--bg-card)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--glass-border)',
            padding: '16px 20px',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Users size={22} color="var(--accent-ice)" />
              <div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main)' }}>10K+</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Active Learners</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GraduationCap size={22} color="var(--primary)" />
              <div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main)' }}>500+</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Courses Created</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Building size={22} color="#10b981" />
              <div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main)' }}>100+</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Institutions Trust Us</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sign In Card */}
        <div style={{
          background: 'var(--bg-card)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: 'var(--shadow-lg), 0 0 32px rgba(23, 75, 255, 0.2)',
          border: '1px solid var(--glass-border)',
          position: 'relative'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            Sign In
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Access your Tutor V2 account
          </p>

          {/* Quick Role Picker */}
          <div style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Select Portal Role
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {['Student', 'Teacher', 'Admin', 'Institution'].map((role) => (
                <button
                  type="button"
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  style={{
                    padding: '8px 2px',
                    borderRadius: '8px',
                    border: selectedRole === role ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                    background: selectedRole === role ? 'rgba(23, 75, 255, 0.24)' : 'var(--glass-surface)',
                    color: selectedRole === role ? '#FFFFFF' : 'var(--text-secondary)',
                    boxShadow: selectedRole === role ? 'var(--shadow-glow-sm)' : 'none',
                    fontSize: '11.5px',
                    fontWeight: selectedRole === role ? '700' : '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ marginTop: '22px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Email Address */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
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
                    border: '1px solid var(--border)',
                    background: 'var(--bg-input)',
                    fontSize: '13.5px',
                    color: 'var(--text-main)',
                    outline: 'none'
                  }}
                />
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                e.g. yourname@college.edu
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Please contact institution admin to reset credentials.'); }} style={{ fontSize: '12px', color: 'var(--accent-ice)', textDecoration: 'none', fontWeight: '600' }}>
                  Forgot password?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
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
                    border: '1px solid var(--border)',
                    background: 'var(--bg-input)',
                    fontSize: '13.5px',
                    color: 'var(--text-main)',
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
                    color: 'var(--text-muted)',
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
                background: 'linear-gradient(135deg, #174BFF 0%, #1035C9 100%)',
                boxShadow: '0 4px 18px rgba(23, 75, 255, 0.45)',
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
            color: 'var(--text-secondary)',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            <span style={{ padding: '0 12px' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
          </div>

          {/* Institution Notice Box */}
          <div style={{
            background: 'rgba(23, 75, 255, 0.08)',
            border: '1px solid rgba(23, 75, 255, 0.22)',
            borderRadius: '12px',
            padding: '14px 16px',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
          }}>
            <Info size={18} color="var(--accent-ice)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--text-main)' }}>Accounts are created and managed by your institution administrator.</strong> If you don't have an account, please contact your college office.
            </div>
          </div>

          {/* Slogan */}
          <div style={{
            textAlign: 'right',
            marginTop: '20px',
            fontFamily: 'cursive',
            fontSize: '16px',
            color: 'var(--accent-ice)',
            transform: 'rotate(-2deg)'
          }}>
            Smarter Learning, Brighter Futures
          </div>
        </div>
      </div>
    </div>
  );
}
