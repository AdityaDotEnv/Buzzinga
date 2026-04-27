import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store/store';
import { setQuizTitle, setQuizDescription } from '../../../store/slices/createQuizSlice';
import styles from '../CreateQuizPage.module.css';

interface ManualStudioSectionProps {
  onStart: () => void;
}

export function ManualStudioSection({ onStart }: ManualStudioSectionProps) {
  const dispatch = useDispatch();
  const { quizTitle, quizDescription } = useSelector((state: RootState) => state.createQuiz);

  return (
    <section id="scratch" className="py-16 px-4 max-w-4xl mx-auto">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/50">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Build from Scratch</h2>
          <p className="text-gray-600 dark:text-gray-400">Craft your questions exactly how you want them.</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="quizTitle" className="block text-sm font-medium">Quiz Title</label>
            <input
              id="quizTitle"
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-[rgb(225,86,124)] focus:border-transparent outline-none transition-all"
              placeholder="e.g. JavaScript Basics"
              value={quizTitle}
              onChange={(e) => dispatch(setQuizTitle(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="quizDescription" className="block text-sm font-medium">Description (Optional)</label>
            <textarea
              id="quizDescription"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-[rgb(225,86,124)] focus:border-transparent outline-none transition-all min-h-[100px]"
              placeholder="What is this quiz about?"
              value={quizDescription}
              onChange={(e) => dispatch(setQuizDescription(e.target.value))}
            />
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Questions</h3>
              <button className="px-4 py-2 bg-[rgb(225,86,124)] text-white rounded-lg font-medium hover:bg-[rgb(205,66,104)] transition-colors shadow-md shadow-[rgb(225,86,124)]/20">
                + Add Question
              </button>
            </div>
            
            {/* Placeholder Question Card */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 border-dashed relative group">
              <div className="absolute top-4 right-4 opacity-50 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-2">
                  <div className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center cursor-pointer">🗑️</div>
                </div>
              </div>
              
              <div className="w-1/3 mb-4">
                <select className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm">
                  <option>Multiple Choice</option>
                  <option>True / False</option>
                  <option>Short Answer</option>
                </select>
              </div>
              
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 mb-4 text-lg font-medium"
                placeholder="Type your question here..."
              />
              
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(num => (
                  <div key={num} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <input type="radio" name="correctAnswer" className="w-5 h-5 accent-[rgb(225,86,124)]" />
                    <input type="text" className="w-full bg-transparent outline-none" placeholder={`Answer option ${num}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-gradient-to-r from-[rgb(225,86,124)] to-[rgb(180,60,100)] text-white font-bold rounded-xl shadow-lg shadow-[rgb(225,86,124)]/30 hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            Create Quiz
          </button>
        </div>
      </div>
    </section>
  );
}
