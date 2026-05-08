import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import styles from '../home/HomePage.module.css';

interface MockPageProps {
  title: string;
  subtitle: string;
  icon: string;
  accentColor?: string;
  sections?: { heading: string; body: string }[];
}

export function MockPage({ title, subtitle, icon, accentColor = '#06b6d4', sections = [] }: MockPageProps) {
  return (
    <div className={styles.appShell}>
      <div className={styles.appBackground} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.grid} />
      </div>

      <Navbar mobileMenuOpen={false} onToggleMobileMenu={() => {}} onLaunch={() => {}} />

      <main style={{ padding: '4rem 0 6rem', maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
        >
          <div style={{
            width: 80, height: 80, borderRadius: '1.5rem',
            background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}11)`,
            border: `1px solid ${accentColor}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5rem',
          }}>
            {icon}
          </div>
          <div
            style={{
              display: 'inline-block',
              background: `${accentColor}18`,
              border: `1px solid ${accentColor}35`,
              borderRadius: '999px',
              padding: '0.25rem 1rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: accentColor,
              marginBottom: '0.25rem',
            }}
          >
            Coming Soon
          </div>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            margin: 0,
            background: `linear-gradient(135deg, #f8fafc, ${accentColor})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {title}
          </h1>
          <p style={{ color: 'rgba(226,232,240,0.65)', fontSize: '1.1rem', maxWidth: '55ch', lineHeight: 1.7, margin: 0 }}>
            {subtitle}
          </p>
          <Link to="/" style={{
            marginTop: '0.5rem',
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.7rem 1.75rem',
            borderRadius: '0.9rem',
            background: `linear-gradient(135deg, ${accentColor}cc, ${accentColor}88)`,
            border: 'none', color: '#fff', fontWeight: 700, fontSize: '0.95rem',
            textDecoration: 'none', cursor: 'pointer',
            boxShadow: `0 6px 28px ${accentColor}33`,
          }}>
            ← Back to Buzzinga
          </Link>
        </motion.header>

        {/* Placeholder sections */}
        {sections.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {sections.map((s, i) => (
              <motion.div
                key={s.heading}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                style={{
                  background: 'linear-gradient(145deg, rgba(15,23,42,0.85), rgba(8,12,24,0.9))',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '1.25rem',
                  padding: '1.5rem',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem', fontWeight: 700, color: accentColor }}>{s.heading}</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(226,232,240,0.55)', lineHeight: 1.65 }}>{s.body}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              background: 'linear-gradient(145deg, rgba(15,23,42,0.85), rgba(8,12,24,0.9))',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '1.5rem',
              padding: '4rem 2rem',
              textAlign: 'center',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚧</div>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.5rem', fontWeight: 800 }}>Under Construction</h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', margin: 0 }}>
              This page is being built. Check back soon!
            </p>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
