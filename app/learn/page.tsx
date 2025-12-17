'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DifficultyLevel, LearningModule, Question } from '@/types/learning';
import { learningContent } from '@/lib/learningContent';
import { CheckCircle, XCircle, ArrowRight, BookOpen, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

export default function Learn() {
  const router = useRouter();
  const [level, setLevel] = useState<DifficultyLevel>('einfach');
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showingContent, setShowingContent] = useState(true);
  const [answers, setAnswers] = useState<{[key: string]: any}>({});
  const [moduleScore, setModuleScore] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const savedLevel = localStorage.getItem('difficultyLevel') as DifficultyLevel || 'einfach';
    setLevel(savedLevel);
    setModules(learningContent[savedLevel]);

    const savedAnswers = localStorage.getItem('answers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  const currentModule = modules[currentModuleIndex];
  const currentQuestion = currentModule?.questions[currentQuestionIndex];
  const totalQuestions = currentModule?.questions.length || 0;

  const handleAnswer = (answer: any) => {
    if (!currentQuestion) return;

    const isCorrect = checkAnswer(currentQuestion, answer);
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: { answer, correct: isCorrect, timestamp: Date.now() }
    };
    
    setAnswers(newAnswers);
    localStorage.setItem('answers', JSON.stringify(newAnswers));

    if (isCorrect) {
      setModuleScore(moduleScore + currentQuestion.points);
      toast.success('Richtig! +' + currentQuestion.points + ' Punkte');
    } else {
      toast.error('Nicht ganz richtig');
    }

    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        completeModule();
      }
    }, 1500);
  };

  const checkAnswer = (question: Question, answer: any): boolean => {
    switch (question.type) {
      case 'multiple-choice':
        return answer === question.correctAnswer;
      case 'text':
        const keywords = (question.correctAnswer as string).split('|');
        return keywords.some(keyword => 
          answer.toLowerCase().includes(keyword.toLowerCase())
        );
      case 'sorting':
      case 'matching':
        return JSON.stringify(answer) === JSON.stringify(question.correctAnswer);
      default:
        return false;
    }
  };

  const completeModule = () => {
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    completedModules.push(currentModule.id);
    localStorage.setItem('completedModules', JSON.stringify(completedModules));

    const scores = JSON.parse(localStorage.getItem('moduleScores') || '{}');
    scores[currentModule.id] = moduleScore;
    localStorage.setItem('moduleScores', JSON.stringify(scores));

    const totalTime = Date.now() - parseInt(localStorage.getItem('startTime') || Date.now().toString());
    localStorage.setItem('totalTimeSpent', totalTime.toString());

    if (currentModuleIndex < modules.length - 1) {
      toast.success(`Modul abgeschlossen! ${moduleScore} Punkte`);
      setTimeout(() => {
        setCurrentModuleIndex(currentModuleIndex + 1);
        setCurrentQuestionIndex(0);
        setShowingContent(true);
        setModuleScore(0);
        setStartTime(Date.now());
      }, 2000);
    } else {
      toast.success('🎉 Alle Module abgeschlossen!');
      setTimeout(() => {
        router.push('/certificate');
      }, 2000);
    }
  };

  if (!currentModule) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>;
  }

  if (showingContent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary-600" />
                <h1 className="text-2xl font-bold text-gray-900">
                  Modul {currentModuleIndex + 1}/{modules.length}: {currentModule.title}
                </h1>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>{currentModule.estimatedMinutes} Min</span>
              </div>
            </div>
            <p className="text-gray-600">{currentModule.description}</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6 prose prose-lg max-w-none">
            <ReactMarkdown>{currentModule.content}</ReactMarkdown>
          </div>

          {/* Start Questions Button */}
          <button
            onClick={() => setShowingContent(false)}
            className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium text-lg flex items-center justify-center gap-2"
          >
            Zu den Fragen
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Frage {currentQuestionIndex + 1} von {totalQuestions}</span>
            <span>Punkte: {moduleScore}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-600 transition-all duration-500"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {currentQuestion.question}
          </h2>

          {currentQuestion.type === 'multiple-choice' && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={!!answers[currentQuestion.id]}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    answers[currentQuestion.id]
                      ? answers[currentQuestion.id].answer === option
                        ? answers[currentQuestion.id].correct
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-gray-200'
                      : 'border-gray-200 hover:border-primary-500 hover:bg-primary-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {answers[currentQuestion.id]?.answer === option && (
                      answers[currentQuestion.id].correct ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'text' && (
            <div>
              <textarea
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                rows={4}
                placeholder="Gib deine Antwort hier ein..."
                onBlur={(e) => handleAnswer(e.target.value)}
                disabled={!!answers[currentQuestion.id]}
              />
            </div>
          )}

          {answers[currentQuestion.id] && (
            <div className={`mt-6 p-4 rounded-lg ${
              answers[currentQuestion.id].correct ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'
            }`}>
              <p className="text-sm font-medium text-gray-900 mb-2">Erklärung:</p>
              <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
