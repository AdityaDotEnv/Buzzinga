import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import styles from '../home/HomePage.module.css';
import { Trophy, Medal, Crown } from 'lucide-react';
import '../../App.css';

interface LeaderboardEntry {
  userId: string;
  username: string;
  score: number;
  quizzesPlayed: number;
}

export function LeaderboardsPage() {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/leaderboard/global')
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          setData(res.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown size={28} color="#fbbf24" />;
      case 1: return <Medal size={26} color="#94a3b8" />;
      case 2: return <Medal size={26} color="#b45309" />;
      default: return <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>#{index + 1}</span>;
    }
  };

  return (
    <div className={styles.appShell}>
      {/* Background Orbs & Grid */}
      <div className={styles.appBackground}>
        <div className={styles.orbOne} />
        <div className={styles.orbTwo} />
        <div className={styles.grid} />
      </div>

      <Navbar mobileMenuOpen={false} onToggleMobileMenu={() => {}} onLaunch={() => {}} brandHref="/" />

      <main style={{ padding: '2rem 1rem', maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '1rem', background: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(168,85,247,0.15))', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem' }}>
            <Trophy size={32} color="#f9a8d4" />
          </div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '0.5rem', background: 'linear-gradient(135deg, #f8fafc, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>
            Global Leaderboard
          </h1>
          <p style={{ color: 'rgba(226, 232, 240, 0.6)', fontSize: '1.1rem' }}>Top performers across the Buzzinga platform</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
              <Trophy size={48} color="#06b6d4" />
            </motion.div>
          </div>
        ) : (
          <div style={{ 
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.8), rgba(8, 12, 24, 0.9))', 
            borderRadius: '1.5rem', 
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 24px 80px rgba(2, 6, 23, 0.4)',
            backdropFilter: 'blur(24px)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {data.length === 0 && <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '2rem 0' }}>No scores recorded yet.</p>}
            
            {data.map((entry, index) => (
              <motion.div 
                key={entry.userId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.04)' }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr auto',
                  alignItems: 'center',
                  padding: '1.25rem',
                  background: index === 0 ? 'linear-gradient(90deg, rgba(251, 191, 36, 0.1), rgba(251, 191, 36, 0.02))' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${index === 0 ? 'rgba(251, 191, 36, 0.25)' : 'rgba(255,255,255,0.05)'}`,
                  borderRadius: '1.2rem',
                  gap: '1rem',
                  transition: 'background 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {getRankIcon(index)}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.2rem', fontWeight: 800, color: index === 0 ? '#fbbf24' : '#f8fafc' }}>
                    {entry.username}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                    {entry.quizzesPlayed} quizzes played
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: 900, color: index === 0 ? '#fbbf24' : '#e2e8f0', letterSpacing: '-0.02em' }}>
                    {entry.score?.toLocaleString() || 0}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginLeft: '0.3rem', fontWeight: 600 }}>pts</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
