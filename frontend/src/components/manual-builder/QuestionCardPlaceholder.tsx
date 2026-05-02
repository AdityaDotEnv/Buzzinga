import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GripVertical, Image as ImageIcon, Copy, Trash2,
  Check, Sigma, Clock, Zap, X
} from 'lucide-react';

type QuestionType = 'multiple' | 'truefalse' | 'poll';
type PointMode = 'standard' | 'double' | 'none';

interface QuestionCardProps {
  index: number;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

const OPTION_META = [
  { label: 'A', grad: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.25)', color: '#fca5a5' },
  { label: 'B', grad: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.25)', color: '#93c5fd' },
  { label: 'C', grad: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.25)', color: '#fcd34d' },
  { label: 'D', grad: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.25)', color: '#c4b5fd' },
];

const TIME_OPTIONS = ['10s', '20s', '30s', '45s', '60s', '90s', '120s'];
const POINT_OPTIONS: { key: PointMode; label: string; color: string }[] = [
  { key: 'standard', label: 'Standard', color: '#94a3b8' },
  { key: 'double', label: '2× Points', color: '#fbbf24' },
  { key: 'none', label: 'No Points', color: '#f87171' },
];

const TF_OPTIONS = [
  { label: 'True', color: '#34d399', border: 'rgba(52,211,153,0.3)', bg: 'rgba(52,211,153,0.08)' },
  { label: 'False', color: '#f87171', border: 'rgba(248,113,113,0.3)', bg: 'rgba(248,113,113,0.08)' },
];

export function QuestionCardPlaceholder({ index = 1, onDelete, onDuplicate }: QuestionCardProps) {
  const [qType, setQType] = useState<QuestionType>('multiple');
  const [question, setQuestion] = useState(
    index === 1 ? 'What is the primary function of a mitochondria?' : ''
  );
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctIdx, setCorrectIdx] = useState<number | null>(3);
  const [timeLimit, setTimeLimit] = useState('30s');
  const [pointMode, setPointMode] = useState<PointMode>('standard');
  const [isActive, setIsActive] = useState(false);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [showMediaInput, setShowMediaInput] = useState(false);
  const [mediaInputVal, setMediaInputVal] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    const ta = textareaRef.current;
    if (ta) { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; }
  };

  const handleMediaFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setMediaUrl(URL.createObjectURL(file)); setShowMediaInput(false); }
  };

  const handleMediaUrl = () => {
    if (mediaInputVal.trim()) { setMediaUrl(mediaInputVal.trim()); setShowMediaInput(false); }
  };

  const visibleOptions = qType === 'truefalse' ? 2 : 4;
  const isPoll = qType === 'poll';

  return (
    <div
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      style={{
        borderRadius: '1.15rem',
        overflow: 'hidden',
        border: `1px solid ${isActive ? 'rgba(236,72,153,0.6)' : 'rgba(255,255,255,0.08)'}`,
        background: 'linear-gradient(145deg, rgba(17,24,39,0.95), rgba(15,23,42,0.9))',
        backdropFilter: 'blur(20px)',
        boxShadow: isActive ? '0 0 0 3px rgba(236,72,153,0.12), 0 24px 60px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.25)',
        transition: 'border-color 200ms, box-shadow 300ms',
      }}
    >
      {/* ── Card header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.6rem 1rem',
        background: 'rgba(255,255,255,0.025)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Drag handle */}
          <button
            style={{ color: 'rgba(148,163,184,0.4)', cursor: 'grab', background: 'none', border: 'none', display: 'flex', padding: '0.1rem' }}
            title="Drag to reorder"
          >
            <GripVertical size={16} />
          </button>

          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(203,213,225,0.7)' }}>
            Q{index}
          </span>

          <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.08)' }} />

          {/* Type pills */}
          <div style={{ display: 'flex', gap: '0.2rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', padding: '0.2rem', borderRadius: '0.6rem' }}>
            {([['multiple', 'Multiple Choice'], ['truefalse', 'True/False'], ['poll', 'Poll']] as [QuestionType, string][]).map(([key, label]) => (
              <button key={key} onClick={() => setQType(key)} style={{
                padding: '0.2rem 0.6rem', borderRadius: '0.4rem',
                fontSize: '0.72rem', fontWeight: 600,
                background: qType === key ? 'rgba(236,72,153,0.25)' : 'transparent',
                color: qType === key ? '#f9a8d4' : 'rgba(148,163,184,0.6)',
                border: 'none', fontFamily: 'inherit', cursor: 'pointer', transition: 'all 150ms',
              }}>{label}</button>
            ))}
          </div>
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
          {/* Sigma / LaTeX indicator */}
          <button title="Wrap in LaTeX (coming soon)" style={{ padding: '0.35rem', borderRadius: '0.5rem', background: 'none', border: 'none', color: 'rgba(148,163,184,0.4)', cursor: 'pointer', display: 'flex' }}>
            <Sigma size={14} />
          </button>

          <button onClick={onDuplicate} title="Duplicate"
            style={{ padding: '0.35rem', borderRadius: '0.5rem', background: 'none', border: 'none', color: 'rgba(148,163,184,0.5)', cursor: 'pointer', transition: 'color 150ms, background 150ms' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#e2e8f0'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(148,163,184,0.5)'; e.currentTarget.style.background = 'none'; }}
          ><Copy size={14} /></button>

          <button onClick={onDelete} title="Delete"
            style={{ padding: '0.35rem', borderRadius: '0.5rem', background: 'none', border: 'none', color: 'rgba(148,163,184,0.5)', cursor: 'pointer', transition: 'color 150ms, background 150ms' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(148,163,184,0.5)'; e.currentTarget.style.background = 'none'; }}
          ><Trash2 size={14} /></button>
        </div>
      </div>

      {/* ── Content area ── */}
      <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Question textarea + Media */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <textarea
            ref={textareaRef}
            rows={2}
            placeholder="Type your question here..."
            value={question}
            onChange={e => { setQuestion(e.target.value); autoResize(); }}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: '#f8fafc', fontSize: '1.05rem', fontWeight: 600,
              fontFamily: 'inherit', resize: 'none', lineHeight: 1.55,
              minHeight: 48, overflow: 'hidden',
            }}
          />

          {/* Media button */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <button onClick={() => setShowMediaInput(s => !s)} style={{
              width: 56, height: 56, flexShrink: 0, borderRadius: '0.75rem',
              background: mediaUrl ? 'transparent' : 'rgba(255,255,255,0.04)',
              border: mediaUrl ? 'none' : '1px dashed rgba(255,255,255,0.12)',
              padding: 0, overflow: 'hidden',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.2rem',
              color: 'rgba(148,163,184,0.45)', cursor: 'pointer',
            }}>
              {mediaUrl
                ? <img src={mediaUrl} alt="preview" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: '0.75rem' }} />
                : <><ImageIcon size={18} /><span style={{ fontSize: '0.6rem', fontWeight: 600 }}>Media</span></>
              }
            </button>
            {mediaUrl && (
              <button onClick={() => setMediaUrl(null)} style={{ width: 56, padding: '0.15rem', borderRadius: '0.4rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer' }}>
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Media URL/file input panel */}
        <AnimatePresence>
          {showMediaInput && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <input
                  type="text" placeholder="Paste image URL..."
                  value={mediaInputVal} onChange={e => setMediaInputVal(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleMediaUrl()}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#f8fafc', fontSize: '0.85rem', fontFamily: 'inherit' }}
                />
                <button onClick={handleMediaUrl} style={{ padding: '0.3rem 0.75rem', borderRadius: '0.5rem', background: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.3)', color: '#f9a8d4', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                  Use URL
                </button>
                <button onClick={() => fileInputRef.current?.click()} style={{ padding: '0.3rem 0.75rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                  Upload
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleMediaFile} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Answers ── */}
        <AnimatePresence mode="wait">
          {qType === 'truefalse' ? (
            <motion.div key="tf" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {TF_OPTIONS.map((opt, i) => (
                <button key={opt.label} onClick={() => setCorrectIdx(i)}
                  style={{
                    padding: '1rem', borderRadius: '0.85rem', cursor: 'pointer',
                    background: correctIdx === i ? opt.bg : 'rgba(255,255,255,0.04)',
                    border: `2px solid ${correctIdx === i ? opt.border : 'rgba(255,255,255,0.08)'}`,
                    color: correctIdx === i ? opt.color : '#94a3b8',
                    fontSize: '1rem', fontWeight: 700, fontFamily: 'inherit',
                    transition: 'all 180ms', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                  }}>
                  {correctIdx === i && <Check size={16} />}
                  {opt.label}
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.div key="choices" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              {OPTION_META.slice(0, visibleOptions).map((ans, i) => (
                <div key={ans.label} style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.35rem 0.75rem 0.35rem 0.35rem', borderRadius: '0.7rem',
                  background: (!isPoll && correctIdx === i) ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${(!isPoll && correctIdx === i) ? 'rgba(16,185,129,0.35)' : 'rgba(255,255,255,0.07)'}`,
                  boxShadow: (!isPoll && correctIdx === i) ? '0 0 14px rgba(16,185,129,0.12)' : 'none',
                  transition: 'all 200ms',
                }}>
                  <div style={{
                    width: 34, height: 34, flexShrink: 0, borderRadius: '0.5rem',
                    background: ans.grad, border: `1px solid ${ans.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: ans.color, fontWeight: 800, fontSize: '0.88rem',
                  }}>{ans.label}</div>
                  <input
                    type="text" placeholder={`Answer ${ans.label}...`}
                    value={answers[i]} onChange={e => setAnswers(a => a.map((v, j) => j === i ? e.target.value : v))}
                    style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#f8fafc', fontSize: '0.88rem', fontFamily: 'inherit', padding: '0.5rem 0' }}
                  />
                  {!isPoll && (
                    <button onClick={() => setCorrectIdx(correctIdx === i ? null : i)}
                      style={{
                        width: 20, height: 20, borderRadius: '50%', flexShrink: 0, cursor: 'pointer',
                        border: `2px solid ${correctIdx === i ? '#10b981' : 'rgba(255,255,255,0.2)'}`,
                        background: correctIdx === i ? '#10b981' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 180ms',
                      }}>
                      {correctIdx === i && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', display: 'block' }} />}
                    </button>
                  )}
                  {isPoll && (
                    <div style={{ width: 20, height: 20, borderRadius: '0.3rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: 'rgba(148,163,184,0.5)' }}>
                      %
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Per-card settings: Time + Points ── */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Time limit */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={13} style={{ color: 'rgba(148,163,184,0.5)', flexShrink: 0 }} />
            <select value={timeLimit} onChange={e => setTimeLimit(e.target.value)}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '0.5rem', padding: '0.25rem 0.6rem', color: '#cbd5e1', fontSize: '0.78rem', fontFamily: 'inherit', outline: 'none', cursor: 'pointer', appearance: 'none' }}>
              {TIME_OPTIONS.map(t => <option key={t} style={{ background: '#0f172a' }}>{t}</option>)}
            </select>
          </div>

          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.08)' }} />

          {/* Point multiplier */}
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            {POINT_OPTIONS.map(p => (
              <button key={p.key} onClick={() => setPointMode(p.key)}
                style={{
                  padding: '0.25rem 0.65rem', borderRadius: '0.45rem', fontSize: '0.72rem', fontWeight: 600,
                  cursor: 'pointer', border: 'none', fontFamily: 'inherit', transition: 'all 180ms',
                  background: pointMode === p.key ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: pointMode === p.key ? p.color : 'rgba(148,163,184,0.45)',
                }}>
                <Zap size={10} style={{ marginRight: '0.2rem', verticalAlign: 'middle' }} />
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
