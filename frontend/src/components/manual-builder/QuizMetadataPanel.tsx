import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const TAGS = ['Education', 'History'];

interface Props {
  title: string;
  setTitle: (t: string) => void;
  description: string;
  setDescription: (d: string) => void;
  tags: string[];
  setTags: (tags: string[] | ((prev: string[]) => string[])) => void;
  difficulty: string;
  setDifficulty: (diff: string) => void;
}

export function QuizMetadataPanel({ title, setTitle, description, setDescription, tags, setTags, difficulty, setDifficulty }: Props) {
  const [open, setOpen] = useState(true);
  const [tagInput, setTagInput] = useState('');

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setTags(t => [...t, tagInput.trim()]);
      setTagInput('');
    }
  };

  return (
    <div style={{
      borderRadius: '1.25rem',
      background: 'linear-gradient(145deg, rgba(17,24,39,0.92), rgba(15,23,42,0.85))',
      border: '1px solid rgba(255,255,255,0.08)',
      backdropFilter: 'blur(20px)',
      overflow: 'hidden',
    }}>
      {/* Accordion header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.1rem 1.5rem',
          background: 'none', border: 'none', cursor: 'pointer',
          borderBottom: open ? '1px solid rgba(255,255,255,0.07)' : 'none',
          transition: 'border-color 200ms',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.1rem' }}>📋</span>
          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>Quiz Details</span>
          <span style={{
            padding: '0.15rem 0.55rem', borderRadius: '999px',
            background: 'rgba(236,72,153,0.12)', border: '1px solid rgba(236,72,153,0.2)',
            color: '#f9a8d4', fontSize: '0.65rem', fontWeight: 700,
          }}>
            Setup
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ color: 'rgba(148,163,184,0.5)' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '1.5rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.25rem',
            }}
              className="metadata-grid"
            >
              {/* Left column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(203,213,225,0.7)' }}>Quiz Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. History 101: Midterm Review"
                    style={{
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
                      borderRadius: '0.7rem', padding: '0.7rem 1rem',
                      color: '#f8fafc', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(203,213,225,0.7)' }}>Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Add a short description so players know what to expect..."
                    style={{
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
                      borderRadius: '0.7rem', padding: '0.7rem 1rem',
                      color: '#f8fafc', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', resize: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Right column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(203,213,225,0.7)' }}>
                    🧠 Category Tags
                  </label>
                  <div style={{
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
                    borderRadius: '0.7rem', padding: '0.5rem 0.75rem',
                    display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center', minHeight: 46,
                  }}>
                    {tags.map(tag => (
                      <span key={tag} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '0.45rem',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#e2e8f0', fontSize: '0.8rem',
                      }}>
                        {tag}
                        <button
                          onClick={() => setTags(t => t.filter(t => t !== tag))}
                          style={{ background: 'none', border: 'none', color: 'rgba(148,163,184,0.6)', cursor: 'pointer', fontSize: '0.85rem', lineHeight: 1, padding: 0 }}
                        >×</button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="Add tag…"
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyDown={addTag}
                      style={{ background: 'transparent', border: 'none', outline: 'none', color: '#f8fafc', fontSize: '0.82rem', fontFamily: 'inherit', minWidth: 70 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(203,213,225,0.7)' }}>
                    💡 Difficulty Level
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.4rem' }}>
                    {['Beginner', 'Intermediate', 'Advanced'].map(d => (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d)}
                        style={{
                          padding: '0.55rem 0.25rem', borderRadius: '0.65rem',
                          fontSize: '0.78rem', fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
                          border: `1px solid ${difficulty === d ? 'rgba(236,72,153,0.5)' : 'rgba(255,255,255,0.09)'}`,
                          background: difficulty === d ? 'rgba(236,72,153,0.15)' : 'rgba(255,255,255,0.04)',
                          color: difficulty === d ? '#f9a8d4' : 'rgba(148,163,184,0.7)',
                          transition: 'all 180ms',
                        }}
                      >{d}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) { .metadata-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
