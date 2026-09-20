import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { setSession } from '../../store/authSlice';
import { authApi } from '../../services/api';
import styles from "./AuthPage.module.css";
import { Navbar } from "../../components/layout/Navbar";

export function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setNotice] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const handleLaunch = (message: string) => {
    setNotice(message);
    setMobileMenuOpen(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanUsername = username.trim();
    const cleanEmail = email.trim();
    if (cleanUsername.length < 3) {
      setError('Username must contain at least 3 characters.');
      return;
    }
    if (password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }
    if (cleanEmail && !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      setError('Enter a valid email address or leave it blank.');
      return;
    }

    setLoading(true);

    try {
      const data = await authApi.signup({ username: cleanUsername, email: cleanEmail, password });
      dispatch(setSession(data));
      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = (() => {
    if (password.length === 0) return null;
    if (password.length < 8) return "weak";
    if (password.length < 10) return "fair";
    return "strong";
  })();

  return (
    <div className={styles.authShell}>
      {/* Background — mirrors HomePage */}
      <div className={styles.authBackground} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.grid} />
      </div>

      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((v) => !v)}
        onLaunch={handleLaunch}
      />

      <div className={styles.authStage}>
        {/* Decorative orbit rings */}
        <span className={styles.ringOuter} aria-hidden="true" />
        <span className={styles.ringInner} aria-hidden="true" />

        <div className={styles.authCard}>
          {/* Header */}
          <div className={styles.cardHeader}>
            <div
              className={`${styles.iconWrap} ${styles.iconWrapGreen}`}
              aria-hidden="true"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </div>
            <div className={styles.eyebrowRow}>
              <span className={`${styles.eyebrow} ${styles.eyebrowGlow}`}>
                Free forever
              </span>
            </div>
            <h1 className={styles.cardTitle}>Join Buzzinga</h1>
            <p className={styles.cardSubtitle}>
              Host and save unlimited quizzes
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className={styles.errorBanner} role="alert">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className={styles.authForm} noValidate>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="signup-username">
                Username
              </label>
              <div className={styles.inputWrap}>
                <svg
                  className={styles.inputIcon}
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  id="signup-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.authInput}
                  placeholder="quizmaster99"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="signup-email">
                Email Address <span style={{ opacity: 0.45, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
              </label>
              <div className={styles.inputWrap}>
                <svg
                  className={styles.inputIcon}
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.authInput}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="signup-password">
                Password
              </label>
              <div className={styles.inputWrap}>
                <svg
                  className={styles.inputIcon}
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.authInput}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className={styles.eyeToggle}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Password strength meter */}
              {passwordStrength && (
                <div className={styles.strengthMeter} aria-live="polite">
                  <div className={styles.strengthBars}>
                    <span
                      className={`${styles.strengthBar} ${passwordStrength === "weak" || passwordStrength === "fair" || passwordStrength === "strong" ? styles.strengthBarFilled : ""} ${passwordStrength === "weak" ? styles.strengthBarWeak : ""}`}
                    />
                    <span
                      className={`${styles.strengthBar} ${passwordStrength === "fair" || passwordStrength === "strong" ? styles.strengthBarFilled : ""} ${passwordStrength === "fair" ? styles.strengthBarFair : ""}`}
                    />
                    <span
                      className={`${styles.strengthBar} ${passwordStrength === "strong" ? styles.strengthBarFilled : ""} ${passwordStrength === "strong" ? styles.strengthBarStrong : ""}`}
                    />
                  </div>
                  <span
                    className={`${styles.strengthLabel} ${
                      passwordStrength === "weak"
                        ? styles.strengthLabelWeak
                        : passwordStrength === "fair"
                          ? styles.strengthLabelFair
                          : styles.strengthLabelStrong
                    }`}
                  >
                    {passwordStrength === "weak"
                      ? "Too short"
                      : passwordStrength === "fair"
                        ? "Fair"
                        : "Strong"}
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`${styles.submitBtn} ${styles.submitBtnGreen}`}
            >
              {loading ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  Creating account…
                </>
              ) : (
                <>
                  Create Account
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>

            <p className={styles.termsNote}>
              By signing up you agree to our{" "}
              <Link to="/terms" className={styles.termsLink}>
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className={styles.termsLink}>
                Privacy Policy
              </Link>
              .
            </p>
          </form>

          {/* Divider */}
          <div className={styles.divider} aria-hidden="true">
            <span>or</span>
          </div>

          {/* Footer link */}
          <p className={styles.authFooterText}>
            Already have an account?{" "}
            <Link to="/login" className={styles.authLink}>
              Log in
            </Link>
          </p>
        </div>

        {/* Floating accent cards */}
        <div className={styles.accentCardLeft} aria-hidden="true">
          <span
            className={styles.accentDot}
            style={{
              background: "var(--color-success, #4ade80)",
              boxShadow: "0 0 12px rgba(74,222,128,0.4)",
            }}
          />
          <span className={styles.accentLabel}>Free to start</span>
        </div>
        <div className={styles.accentCardRight} aria-hidden="true">
          <span className={styles.accentStat}>∞</span>
          <span className={styles.accentLabel}>quizzes saved</span>
        </div>
      </div>
    </div>
  );
}
