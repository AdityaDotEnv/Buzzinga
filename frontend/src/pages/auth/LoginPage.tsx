import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./AuthPage.module.css";
import { Navbar } from "../../components/layout/Navbar";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLaunch = (message: string) => {
    setNotice(message);
    setMobileMenuOpen(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
            <div className={styles.iconWrap} aria-hidden="true">
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className={styles.eyebrowRow}>
              <span className={styles.eyebrow}>Welcome back</span>
            </div>
            <h1 className={styles.cardTitle}>Log in to Buzzinga</h1>
            <p className={styles.cardSubtitle}>Continue your quiz journey</p>
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
          <form onSubmit={handleLogin} className={styles.authForm} noValidate>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="login-username">
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
                  id="login-username"
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
              <div className={styles.fieldLabelRow}>
                <label className={styles.fieldLabel} htmlFor="login-password">
                  Password
                </label>
                <button type="button" className={styles.forgotLink}>
                  Forgot password?
                </button>
              </div>
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
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.authInput}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className={styles.submitBtn}
            >
              {loading ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  Logging in…
                </>
              ) : (
                <>
                  Log In
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
          </form>

          {/* Divider */}
          <div className={styles.divider} aria-hidden="true">
            <span>or</span>
          </div>

          {/* Footer link */}
          <p className={styles.authFooterText}>
            Don't have an account?{" "}
            <Link to="/signup" className={styles.authLink}>
              Create one free
            </Link>
          </p>
          <p className={styles.termsNote} style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            By continuing you agree to our{" "}
            <Link to="/terms" className={styles.termsLink}>
              Terms
            </Link>{" "}
            &amp;{" "}
            <Link to="/privacy" className={styles.termsLink}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Floating accent cards */}
        <div className={styles.accentCardLeft} aria-hidden="true">
          <span className={styles.accentDot} />
          <span className={styles.accentLabel}>Secure login</span>
        </div>
        <div className={styles.accentCardRight} aria-hidden="true">
          <span className={styles.accentStat}>12k+</span>
          <span className={styles.accentLabel}>active hosts</span>
        </div>
      </div>
    </div>
  );
}
