import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthScreen = () => {
  const { loginWithEmail, registerWithEmail, loginWithGoogle } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignUp) {
        if (!name.trim()) throw new Error('Name is required');
        await registerWithEmail(email, password, name.trim());
      } else {
        await loginWithEmail(email, password);
      }
    } catch (err) {
      console.error(err);
      let msg = err.message || 'Authentication failed';
      const lowMsg = msg.toLowerCase();
      if (lowMsg.includes('invalid login credentials') || lowMsg.includes('invalid-credential')) {
        msg = 'Invalid email or password.';
      } else if (lowMsg.includes('user already registered') || lowMsg.includes('already exists') || lowMsg.includes('email-already-in-use')) {
        msg = 'Email is already registered.';
      } else if (lowMsg.includes('password should be') || lowMsg.includes('weak-password') || lowMsg.includes('weak password')) {
        msg = 'Password should be at least 6 characters.';
      } else if (lowMsg.includes('invalid email') || lowMsg.includes('invalid-email')) {
        msg = 'Please enter a valid email address.';
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Google authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <style>{`
        .auth-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: var(--font-sans);
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        /* Abstract ambient background glow */
        .auth-glow-1 {
          position: absolute;
          top: -10%;
          left: -10%;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 70%);
          border-radius: 50%;
          z-index: 1;
          pointer-events: none;
        }

        .auth-glow-2 {
          position: absolute;
          bottom: -10%;
          right: -10%;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 70%);
          border-radius: 50%;
          z-index: 1;
          pointer-events: none;
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
          background: var(--bg-glass);
          backdrop-filter: var(--blur-glass);
          -webkit-backdrop-filter: var(--blur-glass);
          border: var(--border-premium);
          border-radius: 16px;
          padding: var(--space-xl);
          box-shadow: var(--shadow-premium);
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          transition: transform var(--transition-medium), opacity var(--transition-medium);
        }

        .auth-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-xs);
          text-align: center;
        }

        .auth-logo {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.03em;
          margin: 0;
          color: var(--text-primary);
        }

        .auth-tagline {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .auth-input-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .auth-label {
          font-size: 12px;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .auth-input {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 12px 16px;
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 14px;
          outline: none;
          transition: border-color var(--transition-fast), background var(--transition-fast);
        }

        .auth-input:focus {
          border-color: var(--border-color-active);
          background: rgba(255, 255, 255, 0.05);
        }

        .auth-btn-primary {
          background: var(--text-primary);
          color: var(--bg-primary);
          border: none;
          border-radius: 8px;
          padding: 14px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity var(--transition-fast), transform var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: var(--space-sm);
        }

        .auth-btn-primary:hover {
          opacity: 0.9;
        }

        .auth-btn-primary:active {
          transform: scale(0.98);
        }

        .auth-btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          color: var(--text-muted);
          font-size: 11px;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          gap: var(--space-md);
        }

        .auth-divider::before,
        .auth-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid var(--border-color);
        }

        .auth-btn-google {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          border-radius: 8px;
          padding: 12px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background var(--transition-fast), border-color var(--transition-fast);
        }

        .auth-btn-google:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: var(--border-color-active);
        }

        .auth-btn-google:active {
          transform: scale(0.98);
        }

        .auth-footer {
          text-align: center;
          font-size: 13px;
          color: var(--text-secondary);
        }

        .auth-switch-link {
          color: var(--text-primary);
          font-weight: 600;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          font-family: inherit;
          font-size: inherit;
          text-decoration: underline;
        }

        .auth-error {
          background: rgba(255, 0, 0, 0.05);
          border: 1px solid rgba(255, 0, 0, 0.2);
          color: #ff6b6b;
          font-size: 13px;
          padding: 10px 14px;
          border-radius: 8px;
          text-align: center;
          line-height: 1.4;
        }
      `}</style>

      <div className="auth-glow-1"></div>
      <div className="auth-glow-2"></div>

      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-logo">StudentOS</h1>
          <p className="auth-tagline">
            {isSignUp ? 'Create your minimalist space' : 'Welcome back to your space'}
          </p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="auth-input-group">
              <label className="auth-label">Full Name</label>
              <input
                className="auth-input"
                type="text"
                placeholder="Shubham"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          )}

          <div className="auth-input-group">
            <label className="auth-label">Email Address</label>
            <input
              className="auth-input"
              type="email"
              placeholder="name@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Password</label>
            <input
              className="auth-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button className="auth-btn-primary" type="submit" disabled={loading}>
            {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="auth-divider">or</div>

        <button className="auth-btn-google" onClick={handleGoogleSignIn} disabled={loading}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.49h4.84c-.21 1.12-.84 2.07-1.79 2.7l2.8 2.17c1.63-1.51 2.58-3.73 2.58-6.39z"
              fill="#4285F4"
            />
            <path
              d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.8-2.17c-.78.52-1.78.83-2.96.83-2.28 0-4.21-1.54-4.9-3.61L1.4 13.06C2.88 16 5.7 18 9 18z"
              fill="#34A853"
            />
            <path
              d="M4.1 10.88c-.18-.52-.28-1.07-.28-1.63 0-.56.1-1.11.28-1.63L1.4 5.44C.5 7.23 0 9.24 0 11.37c0 2.13.5 4.14 1.4 5.93l2.7-2.17c-.69-2.07-.69-4.17 0-6.25z"
              fill="#FBBC05"
            />
            <path
              d="M9 3.58c1.32-.03 2.59.48 3.51 1.4l2.63-2.63C13.48.89 11.3-.04 9 0 5.7 0 2.88 2 1.4 4.93l2.7 2.17c.69-2.07 2.62-3.52 4.9-3.52z"
              fill="#EA4335"
            />
          </svg>
          {isSignUp ? 'Sign up with Google' : 'Continue with Google'}
        </button>

        <div className="auth-footer">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <button className="auth-switch-link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Sign In' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
