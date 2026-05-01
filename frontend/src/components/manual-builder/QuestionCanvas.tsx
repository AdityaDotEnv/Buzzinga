import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionCardPlaceholder } from './QuestionCardPlaceholder';
import { Plus } from 'lucide-react';

interface QuestionItem { id: number }

export function QuestionCanvas() {
  const [questions, setQuestions] = useState<QuestionItem[]>([{ id: 1 }, { id: 2 }]);
  const [nextId, setNextId] = useState(3);

  const addQuestion = () => {
    setQuestions(q => [...q, { id: nextId }]);
    setNextId(n => n + 1);
  };

  const removeQuestion = (id: number) => {
    setQuestions(q => q.filter(q => q.id !== id));
  };

  const duplicateQuestion = (id: number) => {
    const idx = questions.findIndex(q => q.id === id);
    if (idx === -1) return;
    const newQ = { id: nextId };
    setNextId(n => n + 1);
    setQuestions(q => [
      ...q.slice(0, idx + 1),
      newQ,
      ...q.slice(idx + 1),
    ]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.01em' }}>
          Questions{' '}
          <span style={{ color: 'rgba(148,163,184,0.5)', fontWeight: 400, fontSize: '0.95rem' }}>
            ({questions.length})
          </span>
        </h2>
        <span style={{ fontSize: '0.72rem', color: 'rgba(148,163,184,0.45)', fontWeight: 500 }}>
          Drag handle to reorder
        </span>
      </div>

      {/* Drafting table */}
      <div style={{
        borderRadius: '1.25rem', padding: '1.25rem',
        background: 'rgba(255,255,255,0.015)',
        border: '1px solid rgba(255,255,255,0.06)',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        display: 'flex', flexDirection: 'column', gap: '1rem',
      }}>
        <AnimatePresence mode="popLayout">
          {questions.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -12 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            >
              <QuestionCardPlaceholder
                index={idx + 1}
                onDelete={() => removeQuestion(item.id)}
                onDuplicate={() => duplicateQuestion(item.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add question */}
        <motion.button
          whileHover={{ borderColor: 'rgba(236,72,153,0.5)', background: 'rgba(236,72,153,0.04)', color: '#f9a8d4' }}
          whileTap={{ scale: 0.98 }}
          onClick={addQuestion}
          style={{
            width: '100%', padding: '1.4rem', borderRadius: '1rem',
            border: '2px dashed rgba(255,255,255,0.1)',
            background: 'transparent', color: 'rgba(148,163,184,0.6)',
            fontSize: '0.95rem', fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
            transition: 'color 200ms',
          }}
        >
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Plus size={18} strokeWidth={2.5} />
          </div>
          Add Question
        </motion.button>
      </div>
    </div>
  );
}
