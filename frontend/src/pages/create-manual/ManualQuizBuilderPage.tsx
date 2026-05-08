import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BuilderHero } from '../../components/manual-builder/BuilderHero';
import { QuizMetadataPanel } from '../../components/manual-builder/QuizMetadataPanel';
import { QuestionCanvas } from '../../components/manual-builder/QuestionCanvas';
import { QuestionSettingsSidebar } from '../../components/manual-builder/QuestionSettingsSidebar';
import { Navbar } from '../../components/layout/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { SuccessToast } from '../../components/join/SuccessToast';
import { ErrorToast } from '../../components/shared/ErrorToast';
import '../../App.css';

export function ManualQuizBuilderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>(['Education', 'History']);
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [timeLimit, setTimeLimit] = useState(30);
  const [questions, setQuestions] = useState<any[]>([
    { id: '1', text: 'What is the primary function of a mitochondria?', options: ['Photosynthesis', 'Protein synthesis', 'Cell division', 'Powerhouse of the cell'], correct: 3 },
  ]);

  useEffect(() => {
    if (id) {
      const fetchQuiz = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/quizzes/${id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (res.ok) {
            const data = await res.json();
            setTitle(data.title);
            setDescription(data.description);
            setTags(data.tags || []);
            setDifficulty(data.difficulty || 'Intermediate');
            setTimeLimit(data.timeLimit || 30);
            if (data.questions && data.questions.length > 0) {
              setQuestions(data.questions.map((q: any, idx: number) => ({
                id: q._id || String(idx + 1),
                text: q.text,
                options: q.options,
                correct: q.correct
              })));
            }
          }
        } catch (err) {
          console.error('Failed to fetch quiz', err);
        }
      };
      fetchQuiz();
    }
  }, [id]);

  const handleSaveDraft = async () => {
    if (isSaving) return;
    
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Save Draft Failed: No auth token found in localStorage');
      setErrorToast('You must be logged in to save a quiz.');
      setTimeout(() => navigate('/login'), 3000);
      return;
    }

    setIsSaving(true);
    try {
      const url = id 
        ? `http://localhost:5000/api/quizzes/${id}` 
        : 'http://localhost:5000/api/quizzes';
      
      const res = await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title || 'Untitled Quiz',
          description: description || 'No description',
          tags,
          difficulty,
          timeLimit,
          questions: questions.map(q => ({
            text: q.text || 'Untitled Question',
            options: q.options || ['A', 'B', 'C', 'D'],
            correct: q.correct !== null ? q.correct : 0
          }))
        })
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Quiz saved successfully:', data);
        setShowToast(true);
        // If it was a new quiz, update the URL to include the ID
        if (!id && data._id) {
          window.history.replaceState(null, '', `/create/manual/${data._id}`);
        }
        setTimeout(() => navigate('/explore'), 2000);
      } else {
        const errorMsg = data.message || 'Unknown server error';
        console.error(`Save Draft Failed (${res.status}):`, data);
        setErrorToast(`Failed to save draft: ${errorMsg}`);
      }
    } catch (e: any) {
      console.error('Save Draft Error:', e);
      setErrorToast(`Error saving draft: ${e.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    /*
      Plain div — NOT app-shell/main — avoids the global
      "main { display: grid }" rule that causes layout collapse.
    */
    <div style={{
      minHeight: '100vh',
      background: '#080c18',
      color: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      isolation: 'isolate',
    }}>
      {/* Background layer */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', borderRadius: '50%',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(236,72,153,0.1), transparent 70%)',
          top: -200, right: -100, filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', borderRadius: '50%',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(103,232,249,0.07), transparent 70%)',
          bottom: -300, left: -200, filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(148,163,184,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      {/* Navbar */}
      <div style={{ position: 'relative', zIndex: 20 }}>
        <Navbar
          mobileMenuOpen={false}
          onToggleMobileMenu={() => {}}
          onLaunch={() => {}}
          brandHref="/"
          rightContent={
            <button onClick={() => navigate('/create-quiz')} className="ghost-button">
              Exit Builder
            </button>
          }
        />
      </div>

      {/* Content — flex-col vertical flow, no <main> */}
      <div style={{
        position: 'relative', zIndex: 10,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 1400,
        margin: '0 auto',
        padding: '2.5rem 1.5rem 5rem',
        boxSizing: 'border-box',
        gap: '2rem',
      }}>
        {/* Row 1: Builder Hero */}
        <BuilderHero />

        {/* Row 2: Canvas + Sidebar grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 350px',
          gap: '1.75rem',
          alignItems: 'start',
        }}
          className="builder-grid"
        >
          {/* Left: metadata accordion + canvas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <QuizMetadataPanel 
              title={title} setTitle={setTitle} 
              description={description} setDescription={setDescription} 
              tags={tags} setTags={setTags}
              difficulty={difficulty} setDifficulty={setDifficulty}
            />
            <QuestionCanvas questions={questions} setQuestions={setQuestions} />
          </div>

          {/* Right: sticky control tower */}
          <QuestionSettingsSidebar 
            onSaveDraft={handleSaveDraft} 
            isSaving={isSaving} 
            timeLimit={timeLimit}
            setTimeLimit={setTimeLimit}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .builder-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Success Toast Overlay */}
      <AnimatePresence>
        {showToast && (
          <SuccessToast 
            message="Draft saved successfully!" 
            onClose={() => setShowToast(false)} 
          />
        )}
        {errorToast && (
          <ErrorToast 
            message={errorToast} 
            onClose={() => setErrorToast(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
