import React, { useState, useEffect } from 'react';
import { Sparkles, Wand2, GraduationCap, Hash, ClipboardCopy, Play, CheckCircle2, Loader2, Globe, Brain, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import { useNavigate } from 'react-router-dom';
import { LaunchModal } from '../../components/shared/LaunchModal';
import '../../App.css';

type GenState = 'idle' | 'generating' | 'done';

const SUGGESTIONS = ['Biology Review', 'JavaScript Trivia', 'World History', 'Pop Culture'];
const TONES = ['Fun', 'Academic', 'Challenging', 'Quickfire'];
const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Hindi'];
const DEMO_QS = [
  { q: 'What planet is known as the "Red Planet"?', opts: ['A. Venus','B. Mars','C. Jupiter','D. Saturn'], correct: 1 },
  { q: 'Who was the first person to walk on the Moon?', opts: ['A. Yuri Gagarin','B. Buzz Aldrin','C. Neil Armstrong','D. Michael Collins'], correct: 2 },
  { q: 'What is the largest galaxy in the Local Group?', opts: ['A. Milky Way','B. Andromeda','C. Triangulum','D. Centaurus A'], correct: 1 },
];

/* ── Confetti ── */
function Confetti({ active }: { active: boolean }) {
  const colors = ['#ec4899','#f97316','#67e8f9','#a78bfa','#fbbf24','#34d399'];
  const pieces = Array.from({ length: 30 }, (_, i) => i);
  if (!active) return null;
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden', zIndex:20 }}>
      {pieces.map(i => (
        <motion.div key={i}
          initial={{ y: 0, x: Math.random()*100+'%', opacity: 1, rotate: 0, scale: 1 }}
          animate={{ y: 400 + Math.random()*200, rotate: Math.random()*360, opacity: 0, scale: 0.4 }}
          transition={{ duration: 1.2 + Math.random()*0.8, delay: Math.random()*0.4, ease:'easeIn' }}
          style={{ position:'absolute', top:0, width:8, height:8, borderRadius: i%3===0?'50%':2, background: colors[i%colors.length] }}
        />
      ))}
    </div>
  );
}

/* ── Toast ── */
function Toast({ message, type }: { message: string; type: 'info'|'success' }) {
  return (
    <motion.div
      initial={{ opacity:0, y:-30, scale:0.9 }}
      animate={{ opacity:1, y:0, scale:1 }}
      exit={{ opacity:0, y:-20, scale:0.9 }}
      transition={{ type:'spring', stiffness:300, damping:25 }}
      style={{
        position:'fixed', top:'6rem', right:'1.5rem', zIndex:100,
        display:'flex', alignItems:'center', gap:'0.6rem',
        padding:'0.75rem 1.25rem',
        borderRadius:'1rem',
        background: type==='success' ? 'rgba(16,185,129,0.15)' : 'rgba(249,115,22,0.15)',
        border: `1px solid ${type==='success' ? 'rgba(16,185,129,0.35)' : 'rgba(249,115,22,0.35)'}`,
        backdropFilter:'blur(20px)',
        boxShadow:'0 16px 40px rgba(0,0,0,0.35)',
        color:'#f8fafc', fontSize:'0.88rem', fontWeight:600,
      }}
    >
      <span style={{ fontSize:'1rem' }}>{type==='success' ? '🚀' : '✨'}</span>
      {message}
    </motion.div>
  );
}

/* ── Skeleton rows ── */
function Skeleton() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem', padding:'1.5rem' }}>
      {[80,60,90,70].map((w,i) => (
        <motion.div key={i}
          animate={{ opacity:[0.3,0.7,0.3] }}
          transition={{ duration:1.4, repeat:Infinity, delay:i*0.15 }}
          style={{ height:14, width:`${w}%`, borderRadius:7, background:'rgba(255,255,255,0.08)' }}
        />
      ))}
      <motion.div animate={{ opacity:[0.3,0.7,0.3] }} transition={{ duration:1.4, repeat:Infinity, delay:0.6 }}
        style={{ height:80, borderRadius:12, background:'rgba(255,255,255,0.06)', marginTop:8 }} />
    </div>
  );
}

/* ── Select style ── */
const SEL: React.CSSProperties = {
  width:'100%', background:'rgba(255,255,255,0.05)',
  border:'1px solid rgba(255,255,255,0.1)', borderRadius:'0.75rem',
  padding:'0.65rem 1rem', color:'#f8fafc',
  fontFamily:'inherit', fontSize:'0.88rem', outline:'none', cursor:'pointer',
  appearance:'none',
};

export function AIQuizGeneratorPage() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('Intermediate');
  const [tone, setTone] = useState('Fun');
  const [lang, setLang] = useState('English');
  const [qCount, setQCount] = useState(5);
  const [genState, setGenState] = useState<GenState>('idle');
  const [toast, setToast] = useState<{msg:string;type:'info'|'success'}|null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLaunch, setShowLaunch] = useState(false);

  const generate = async () => {
    if (genState==='generating') return;
    setGenState('generating');
    setToast({ msg:'Summoning questions from the void...', type:'info' });
    setTimeout(() => setToast(null), 2800);
    await new Promise(r => setTimeout(r, 3000));
    setGenState('done');
    setShowConfetti(true);
    setToast({ msg:'Quiz Draft Generated! 🚀', type:'success' });
    setTimeout(() => { setToast(null); setShowConfetti(false); }, 3000);
  };

  const isGenerating = genState === 'generating';
  const isDone = genState === 'done';

  return (
    <div style={{ minHeight:'100vh', background:'#080c18', color:'#f8fafc', display:'flex', flexDirection:'column', position:'relative', isolation:'isolate' }}>
      {/* bg */}
      <div aria-hidden="true" style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(249,115,22,0.12),transparent 70%)', top:-250, right:-150, filter:'blur(60px)' }} />
        <div style={{ position:'absolute', width:700, height:700, borderRadius:'50%', background:'radial-gradient(circle,rgba(236,72,153,0.1),transparent 70%)', bottom:-300, left:-200, filter:'blur(60px)' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(148,163,184,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.04) 1px,transparent 1px)', backgroundSize:'40px 40px' }} />
      </div>

      <AnimatePresence>{toast && <Toast message={toast.msg} type={toast.type} />}</AnimatePresence>

      <Navbar mobileMenuOpen={false} onToggleMobileMenu={()=>{}} onLaunch={()=>{}} brandHref="/"
        rightContent={<button onClick={()=>navigate('/create-quiz')} className="ghost-button">Exit AI Studio</button>}
      />

      <div style={{ position:'relative', zIndex:10, flex:1, display:'flex', flexDirection:'column', alignItems:'center', width:'100%', maxWidth:1200, margin:'0 auto', padding:'3rem 1.5rem 4rem', boxSizing:'border-box' }}>

        {/* Hero */}
        <motion.section initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}} transition={{duration:0.55}}
          style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:'1rem', marginBottom:'3.5rem' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', padding:'0.35rem 1rem', borderRadius:'999px', background:'rgba(249,115,22,0.1)', border:'1px solid rgba(249,115,22,0.25)', color:'#fb923c', fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase' }}>
            <Sparkles size={12} /> AI Studio
          </span>
          <h1 style={{ margin:0, fontSize:'clamp(2.2rem,5vw,3.5rem)', fontWeight:800, color:'#f8fafc', lineHeight:1.1, letterSpacing:'-0.03em', maxWidth:'none' }}>
            Generate a Quiz with AI
          </h1>
          <p style={{ margin:0, maxWidth:'42ch', color:'rgba(148,163,184,0.85)', fontSize:'1rem', lineHeight:1.65 }}>
            Describe your topic, pick a tone, and let our AI build a complete quiz in seconds.
          </p>
        </motion.section>

        {/* Grid */}
        <div style={{ width:'100%', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:'2.5rem', alignItems:'start' }}>

          {/* ── Left: Prompt Card ── */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.1}} whileHover={{scale:1.005}}
            style={{ display:'flex', flexDirection:'column', gap:'1.4rem', padding:'2rem', borderRadius:'1.5rem', background:'linear-gradient(145deg,rgba(17,24,39,0.92),rgba(15,23,42,0.85))', border:'1px solid rgba(255,255,255,0.08)', backdropFilter:'blur(20px)', boxShadow:'0 24px 80px rgba(2,6,23,0.35)', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at top left,rgba(249,115,22,0.06),transparent 60%)', pointerEvents:'none', borderRadius:'1.5rem' }} />

            <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', gap:'1.4rem' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div>
                  <h2 style={{ margin:'0 0 0.3rem', fontSize:'1.25rem', fontWeight:700, color:'#f8fafc', letterSpacing:'-0.02em' }}>Quiz Prompt</h2>
                  <p style={{ margin:0, fontSize:'0.82rem', color:'rgba(148,163,184,0.7)' }}>Tell the AI exactly what you want.</p>
                </div>
                {/* Mascot - Celebration animation on done */}
                <motion.div
                  animate={isDone ? { y:[0,-20,0], rotate:[0,-10,10,0] } : { rotate:[0,-5,5,0] }}
                  transition={isDone ? { duration:0.6, repeat:1 } : { duration:3, repeat:Infinity }}
                  style={{ fontSize:'2.2rem', lineHeight:1, filter:'drop-shadow(0 0 10px rgba(249,115,22,0.4))' }}
                >
                  {isGenerating ? '🤔' : isDone ? '🥳' : '🤖'}
                </motion.div>
              </div>

              {/* Topic */}
              <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                <label style={{ fontSize:'0.75rem', fontWeight:600, color:'rgba(203,213,225,0.75)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Topic or Subject</label>
                <div style={{ position:'relative' }}>
                  <textarea rows={4} value={topic} onChange={e=>setTopic(e.target.value)}
                    placeholder="e.g. Space Exploration, JavaScript Trivia, World History..."
                    style={{ width:'100%', boxSizing:'border-box', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'0.75rem', padding:'0.9rem 2.5rem 0.9rem 1rem', fontSize:'0.95rem', color:'#f8fafc', outline:'none', resize:'none', fontFamily:'inherit', lineHeight:1.6 }}
                  />
                  <Sparkles size={15} style={{ position:'absolute', bottom:'0.75rem', right:'0.75rem', color:'rgba(148,163,184,0.35)', pointerEvents:'none' }} />
                </div>
              </div>

              {/* Clickable chips */}
              <div style={{ display:'flex', flexDirection:'column', gap:'0.45rem' }}>
                <span style={{ fontSize:'0.68rem', fontWeight:600, color:'rgba(148,163,184,0.55)', letterSpacing:'0.1em', textTransform:'uppercase' }}>Try these</span>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.45rem' }}>
                  {SUGGESTIONS.map(s => (
                    <button key={s} onClick={()=>setTopic(s)}
                      style={{ padding:'0.3rem 0.85rem', borderRadius:'999px', background: topic===s ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.05)', border:`1px solid ${topic===s ? 'rgba(249,115,22,0.4)' : 'rgba(255,255,255,0.1)'}`, color: topic===s ? '#fb923c' : 'rgba(203,213,225,0.8)', fontSize:'0.8rem', fontWeight:500, cursor:'pointer', transition:'all 180ms', fontFamily:'inherit' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2x2 grid */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.85rem', paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                  <label style={{ display:'flex', alignItems:'center', gap:'0.35rem', fontSize:'0.75rem', fontWeight:600, color:'rgba(203,213,225,0.75)', textTransform:'uppercase', letterSpacing:'0.07em' }}>
                    <GraduationCap size={13} /> Grade
                  </label>
                  <select value={grade} onChange={e=>setGrade(e.target.value)} style={SEL}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                  <label style={{ display:'flex', alignItems:'center', gap:'0.35rem', fontSize:'0.75rem', fontWeight:600, color:'rgba(203,213,225,0.75)', textTransform:'uppercase', letterSpacing:'0.07em' }}>
                    <Sparkles size={13} /> Tone
                  </label>
                  <select value={tone} onChange={e=>setTone(e.target.value)} style={SEL}>
                    {TONES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                  <label style={{ display:'flex', alignItems:'center', gap:'0.35rem', fontSize:'0.75rem', fontWeight:600, color:'rgba(203,213,225,0.75)', textTransform:'uppercase', letterSpacing:'0.07em' }}>
                    <Hash size={13} /> Questions
                  </label>
                  <div style={{ display:'flex', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'0.75rem', padding:'0.2rem', gap:'0.2rem' }}>
                    {[5,10,15].map(n => (
                      <button key={n} onClick={()=>setQCount(n)}
                        style={{ flex:1, padding:'0.45rem 0', borderRadius:'0.55rem', fontSize:'0.85rem', fontWeight:600, cursor:'pointer', background: qCount===n ? 'rgba(255,255,255,0.14)' : 'transparent', color: qCount===n ? '#f8fafc' : 'rgba(148,163,184,0.65)', border:'none', fontFamily:'inherit', transition:'all 180ms' }}>{n}</button>
                    ))}
                  </div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                  <label style={{ display:'flex', alignItems:'center', gap:'0.35rem', fontSize:'0.75rem', fontWeight:600, color:'rgba(203,213,225,0.75)', textTransform:'uppercase', letterSpacing:'0.07em' }}>
                    <Globe size={13} /> Language
                  </label>
                  <select value={lang} onChange={e=>setLang(e.target.value)} style={SEL}>
                    {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <motion.button onClick={generate} disabled={isGenerating} whileTap={!isGenerating ? { scale:0.97 } : {}}
                style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem', width:'100%', padding:'1rem', background: isGenerating ? 'rgba(249,115,22,0.35)' : 'linear-gradient(135deg,#f97316,#ec4899)', border:'none', borderRadius:'0.85rem', color:'#fff', fontSize:'1rem', fontWeight:700, cursor: isGenerating ? 'not-allowed' : 'pointer', fontFamily:'inherit', boxShadow:'0 0 24px rgba(249,115,22,0.3)', transition:'background 300ms' }}>
                {isGenerating ? <><Loader2 size={18} style={{ animation:'spin 1s linear infinite' }} /> AI is thinking...</> : <><Wand2 size={18} /> Generate Quiz</>}
              </motion.button>
            </div>
          </motion.div>

          {/* ── Right: Preview Card ── */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.2}} layout
            style={{ display:'flex', flexDirection:'column', borderRadius:'1.5rem', background:'linear-gradient(145deg,rgba(17,24,39,0.92),rgba(15,23,42,0.85))', border:'1px solid rgba(255,255,255,0.08)', backdropFilter:'blur(20px)', boxShadow:'0 24px 80px rgba(2,6,23,0.35)', overflow:'hidden', position:'relative' }}>
            <Confetti active={showConfetti} />
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.2rem 1.75rem', borderBottom:'1px solid rgba(255,255,255,0.07)', background:'rgba(255,255,255,0.015)', flexShrink:0 }}>
              <h3 style={{ margin:0, fontSize:'1rem', fontWeight:700, color:'#f8fafc' }}>Quiz Draft Preview</h3>
              <AnimatePresence>
                {isDone && (
                  <motion.span initial={{scale:0}} animate={{scale:1}} style={{ display:'flex', alignItems:'center', gap:'0.35rem', padding:'0.25rem 0.75rem', borderRadius:'999px', background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.2)', color:'#34d399', fontSize:'0.72rem', fontWeight:600 }}><CheckCircle2 size={12} /> Draft ready</motion.span>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div key="loading" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{ padding:'3rem 2rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'1.25rem' }}>
                  <motion.div animate={{ scale:[1,1.12,1], opacity:[0.6,1,0.6] }} transition={{ duration:1.6, repeat:Infinity }}><Brain size={48} style={{ color:'rgba(249,115,22,0.7)' }} /></motion.div>
                  <p style={{ margin:0, fontSize:'0.9rem', color:'rgba(148,163,184,0.7)', fontWeight:500 }}>Building your quiz…</p>
                  <Skeleton />
                </motion.div>
              ) : isDone ? (
                <motion.div key="done" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="custom-scrollbar" style={{ display:'flex', flexDirection:'column', gap:'0.85rem', padding:'1.4rem 1.75rem', overflowY:'auto', maxHeight:420 }}>
                  {DEMO_QS.map((item, qi) => (
                    <motion.div key={qi} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:qi*0.1}} style={{ padding:'1rem', borderRadius:'0.85rem', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', opacity: qi===2 ? 0.55 : 1 }}>
                      <div style={{ fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(148,163,184,0.6)', marginBottom:'0.4rem' }}>Question {qi+1}</div>
                      <div style={{ fontSize:'0.9rem', fontWeight:600, color:'#f8fafc', marginBottom:'0.75rem', lineHeight:1.45 }}>{item.q}</div>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.4rem' }}>
                        {item.opts.map((opt, oi) => (
                          <div key={oi} style={{ padding:'0.4rem 0.65rem', borderRadius:'0.5rem', fontSize:'0.8rem', fontWeight: oi===item.correct ? 600 : 400, background: oi===item.correct ? 'rgba(16,185,129,0.18)' : 'rgba(255,255,255,0.04)', border:`1px solid ${oi===item.correct ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.06)'}`, color: oi===item.correct ? '#34d399' : 'rgba(203,213,225,0.8)' }}>{opt}{oi===item.correct ? ' ✓' : ''}</div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{ padding:'4rem 2rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.85rem', color:'rgba(148,163,184,0.4)' }}>
                  <Wand2 size={40} style={{ opacity:0.3 }} />
                  <p style={{ margin:0, fontSize:'0.88rem', textAlign:'center' }}>Fill in the prompt and click<br/><strong style={{color:'rgba(249,115,22,0.7)'}}>Generate Quiz</strong> to see your draft here.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isDone && (
                <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} style={{ padding:'1rem 1.75rem', borderTop:'1px solid rgba(255,255,255,0.07)', background:'rgba(255,255,255,0.01)', display:'flex', gap:'0.75rem', flexShrink:0 }}>
                  <button style={{ flex:1, padding:'0.7rem', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'0.75rem', color:'rgba(203,213,225,0.85)', fontSize:'0.85rem', fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.4rem', fontFamily:'inherit' }}>
                    <ClipboardCopy size={15} /> Copy to Builder
                  </button>
                  <motion.button
                    whileHover={{ scale:1.02, boxShadow:'0 0 24px rgba(16,185,129,0.4)' }}
                    whileTap={{ scale:0.98 }}
                    onClick={()=>setShowLaunch(true)}
                    style={{ flex:1.2, padding:'0.7rem', background:'linear-gradient(135deg,#10b981,#06b6d4)', border:'none', borderRadius:'0.75rem', color:'#022c22', fontSize:'0.85rem', fontWeight:800, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.4rem', fontFamily:'inherit', boxShadow:'0 0 18px rgba(16,185,129,0.3)' }}
                  >
                    <Rocket size={16} /> Launch Live Game
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showLaunch && (
          <LaunchModal
            onClose={()=>setShowLaunch(false)}
            quizTitle={topic || 'AI Quiz'}
            questionCount={qCount}
            grade={grade}
            topic={topic}
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        select option { background: #0f172a; color: #f8fafc; }
      `}</style>
    </div>
  );
}
