import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Clock, Users, Search, Filter, Play } from 'lucide-react';
import { quizApi, roomApi } from '../../services/api';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { LaunchModal } from '../../components/shared/LaunchModal';
import styles from '../home/HomePage.module.css';

const CARD_GRADIENTS = [
  'linear-gradient(135deg, #f472b6, #8b5cf6)',
  'linear-gradient(135deg, #06b6d4, #6366f1)',
  'linear-gradient(135deg, #f59e0b, #ef4444)',
  'linear-gradient(135deg, #10b981, #06b6d4)',
  'linear-gradient(135deg, #ec4899, #f97316)',
  'linear-gradient(135deg, #8b5cf6, #06b6d4)',
  'linear-gradient(135deg, #f43f5e, #8b5cf6)',
  'linear-gradient(135deg, #22d3ee, #4ade80)',
  'linear-gradient(135deg, #a78bfa, #f472b6)',
  'linear-gradient(135deg, #fb923c, #facc15)',
];

function pickGradient(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) & 0xffff;
  }
  return CARD_GRADIENTS[hash % CARD_GRADIENTS.length];
}

export function ExploreQuizzesPage() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [launchingQuiz, setLaunchingQuiz] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const data = await quizApi.list();
        console.log('Fetched quizzes:', data);
        setQuizzes(data);
      } catch (err) {
        console.error('Failed to fetch quizzes:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuizzes();
  }, []);

  return (
    <div className={styles.appShell}>
      <div className={styles.appBackground} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.grid} />
      </div>

      <Navbar 
        mobileMenuOpen={mobileMenuOpen} 
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} 
        onLaunch={() => {}} 
      />

      <main style={{ padding: '2rem 0', gap: '3rem' }}>
        <header style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ color: '#06b6d4', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem' }}>Explore</span>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, margin: '0.5rem 0 1.5rem', letterSpacing: '-0.02em' }}>
            Find your next <span style={{ color: '#06b6d4' }}>Challenge</span>
          </h1>
          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <Search style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} size={20} />
            <input 
              type="text" 
              placeholder="Search quizzes, topics, or creators..." 
              style={{ width: '100%', padding: '1rem 1rem 1rem 3.5rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '1rem', outline: 'none' }}
            />
          </div>
        </header>

        <section>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                <Zap size={48} color="#06b6d4" />
              </motion.div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              
              {/* Community Quizzes Section */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Community Quizzes</h2>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '0.75rem', color: '#fff', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <Filter size={16} /> Filter
                  </button>
                </div>
                {quizzes.filter(q => q.creator?.username && q.creator.username !== 'admin').length === 0 ? (
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>No community quizzes yet. Be the first to create one!</p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {quizzes.filter(q => q.creator?.username && q.creator.username !== 'admin').map((quiz) => (
                      <motion.article 
                        key={quiz._id}
                        whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                        style={{ 
                          background: 'rgba(15,23,42,0.6)', 
                          borderRadius: '1.5rem', 
                          overflow: 'hidden', 
                          border: '1px solid rgba(255,255,255,0.08)',
                          backdropFilter: 'blur(20px)',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <div style={{ height: '160px', background: pickGradient(quiz._id || quiz.title), padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <span style={{ background: 'rgba(0,0,0,0.2)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800, width: 'fit-content', textTransform: 'uppercase', letterSpacing: '0.05em' }}>By {quiz.creator?.username}</span>
                          <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, lineHeight: 1.2 }}>{quiz.title}</h3>
                        </div>
                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{quiz.description || 'No description provided.'}</p>
                          <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', opacity: 0.6 }}>
                              <Users size={14} /> 0 plays
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', opacity: 0.6 }}>
                              <Clock size={14} /> {quiz.timeLimit}s
                            </div>
                          </div>
                        </div>
                        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                          <button 
                            className="primary-button" 
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            onClick={() => setLaunchingQuiz(quiz)}
                          >
                            <Play size={16} fill="currentColor" /> Play Now
                          </button>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}
              </div>

              {/* Seeded Quizzes Section */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Seeded Quizzes</h2>
                </div>
                {quizzes.filter(q => !q.creator?.username || q.creator.username === 'admin').length === 0 ? (
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>No seeded quizzes available.</p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {quizzes.filter(q => !q.creator?.username || q.creator.username === 'admin').map((quiz) => (
                      <motion.article 
                        key={quiz._id}
                        whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                        style={{ 
                          background: 'rgba(15,23,42,0.6)', 
                          borderRadius: '1.5rem', 
                          overflow: 'hidden', 
                          border: '1px solid rgba(255,255,255,0.08)',
                          backdropFilter: 'blur(20px)',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <div style={{ height: '160px', background: pickGradient(quiz._id || quiz.title), padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <span style={{ background: 'rgba(0,0,0,0.2)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800, width: 'fit-content', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trivia</span>
                          <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, lineHeight: 1.2 }}>{quiz.title}</h3>
                        </div>
                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{quiz.description || 'No description provided.'}</p>
                          <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', opacity: 0.6 }}>
                              <Users size={14} /> 0 plays
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', opacity: 0.6 }}>
                              <Clock size={14} /> {quiz.timeLimit}s
                            </div>
                          </div>
                        </div>
                        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                          <button 
                            className="primary-button" 
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            onClick={() => setLaunchingQuiz(quiz)}
                          >
                            <Play size={16} fill="currentColor" /> Play Now
                          </button>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}
        </section>
      </main>

      {launchingQuiz && (
        <LaunchModal 
          onClose={() => setLaunchingQuiz(null)}
          quizTitle={launchingQuiz.title}
          questionCount={launchingQuiz.questions?.length || 0}
          quizId={launchingQuiz._id || launchingQuiz.id}
        />
      )}

      <Footer />
    </div>
  );
}
