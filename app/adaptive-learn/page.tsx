'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdaptiveLearningEngine } from '@/lib/AdaptiveLearningEngine';
import { CheckCircle, XCircle, Lightbulb, TrendingUp, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import { 
  MultipleChoiceQuestion, 
  TextQuestion, 
  SliderQuestion, 
  CardSortingQuestion,
  ComparisonQuestion 
} from '@/components/InteractiveQuestions';

export default function AdaptiveLearn() {
  const router = useRouter();
  const [engine, setEngine] = useState<AdaptiveLearningEngine | null>(null);
  const [userId, setUserId] = useState('');
  const [showingContent, setShowingContent] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const [showAlternative, setShowAlternative] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  useEffect(() => {
    const code = localStorage.getItem('learningCode') || 'demo-user';
    setUserId(code);
    const eng = new AdaptiveLearningEngine(code);
    setEngine(eng);
  }, []);

  if (!engine) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const concept = engine.getCurrentConcept();
  if (!concept) {
    router.push('/adaptive-certificate');
    return null;
  }

  const stats = engine.getStatistics();

  const handleAnswer = (answer: any) => {
    const timeSpent = Date.now() - questionStartTime;
    const question = concept.checkQuestions[currentQuestionIndex];
    
    const result = engine.processAnswer(question.id, answer, timeSpent, userId);
    
    setUserAnswer(answer);
    setFeedback(result);

    if (result.correct) {
      toast.success(`Richtig! ${result.newLevel ? `Dein Level: ${result.newLevel.toFixed(1)}/10` : ''}`);
    } else {
      toast.error('Nicht ganz richtig - lass uns das nochmal anders erklären');
    }

    // Nach 2 Sekunden nächste Aktion
    setTimeout(() => {
      handleNextAction(result.nextAction);
    }, 2000);
  };

  const handleNextAction = (action: 'continue' | 'deepen' | 'alternative' | 'next_concept') => {
    switch (action) {
      case 'continue':
        // Nächste Frage
        if (currentQuestionIndex < concept.checkQuestions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setUserAnswer(null);
          setFeedback(null);
          setQuestionStartTime(Date.now());
        } else {
          // Alle Fragen beantwortet
          setShowingContent(true);
          setCurrentQuestionIndex(0);
          setUserAnswer(null);
          setFeedback(null);
        }
        break;

      case 'deepen':
        // Zeige Vertiefung
        toast('📚 Lass uns tiefer eintauchen...', { icon: '🎓' });
        setShowingContent(true);
        setShowAlternative(false);
        setUserAnswer(null);
        setFeedback(null);
        break;

      case 'alternative':
        // Zeige alternative Erklärung
        toast('💡 Hier ist eine andere Perspektive...');
        setShowAlternative(true);
        setUserAnswer(null);
        setFeedback(null);
        break;

      case 'next_concept':
        // Zum nächsten Konzept
        const hasNext = engine.moveToNextConcept(userId);
        if (hasNext) {
          toast.success('🎉 Konzept abgeschlossen! Weiter zum nächsten!');
          setShowingContent(true);
          setCurrentQuestionIndex(0);
          setUserAnswer(null);
          setFeedback(null);
          setShowAlternative(false);
          // Force re-render
          setEngine(new AdaptiveLearningEngine(userId));
        } else {
          toast.success('🏆 Alle Konzepte abgeschlossen!');
          router.push('/adaptive-certificate');
        }
        break;
    }
  };

  if (showAlternative) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8 text-yellow-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Alternative Erklärung
              </h1>
            </div>
            <p className="text-gray-600">
              Manchmal hilft eine andere Perspektive. Wähle den Zugang, der dir am besten liegt:
            </p>
          </div>

          {/* Alternative Explanations */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8 prose prose-lg max-w-none">
              <ReactMarkdown>{engine.getAlternativeExplanation()}</ReactMarkdown>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowAlternative(false);
                  setFeedback(null);
                  setUserAnswer(null);
                }}
                className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Jetzt habe ich's verstanden! Nochmal versuchen
              </button>
              <button
                onClick={() => {
                  handleNextAction('continue');
                  setShowAlternative(false);
                }}
                className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Weiter zur nächsten Frage
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showingContent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{concept.title}</h1>
                <p className="text-gray-600">{concept.description}</p>
              </div>
              <div className="flex items-center gap-2 text-primary-600">
                <TrendingUp className="w-6 h-6" />
                <span className="text-2xl font-bold">
                  {stats.finalDifficultyLevel.toFixed(1)}/10
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Fortschritt</span>
                <span>
                  {stats.conceptsCompleted} / {stats.totalConcepts} Konzepte
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-600 transition-all duration-500"
                  style={{
                    width: `${(stats.conceptsCompleted / stats.totalConcepts) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 mb-6">
            {/* Main Content Card */}
            <div className="bg-gradient-to-br from-white to-primary-50 rounded-xl shadow-lg p-8 border border-primary-100">
              <div className="prose prose-lg max-w-none prose-headings:text-primary-900 prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b-2 prose-h2:border-primary-200 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-primary-700 prose-li:text-gray-700">
                <ReactMarkdown>{engine.getContentForCurrentLevel()}</ReactMarkdown>
              </div>
            </div>

            {/* Examples Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Konkrete Beispiele</h3>
              </div>
              <div className="grid gap-3">
                {engine.getExamples().map((example, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-primary-50 to-orange-50 p-4 rounded-lg border border-primary-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </div>
                      <p className="text-gray-800 flex-1">{example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Start Questions Button */}
          <button
            onClick={() => {
              setShowingContent(false);
              setQuestionStartTime(Date.now());
            }}
            className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium text-lg flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Verständnis überprüfen
          </button>
        </div>
      </div>
    );
  }

  // Question View
  const question = concept.checkQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Frage {currentQuestionIndex + 1} von {concept.checkQuestions.length}
            </span>
            <span className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary-600" />
              Level: {stats.finalDifficultyLevel.toFixed(1)}/10
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 transition-all duration-500"
              style={{
                width: `${((currentQuestionIndex + 1) / concept.checkQuestions.length) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{question.question}</h2>

          {/* Dynamische Fragentypen */}
          {question.type === 'multiple-choice' && (
            <MultipleChoiceQuestion
              question={question}
              onAnswer={handleAnswer}
              disabled={feedback !== null}
              userAnswer={userAnswer}
              feedback={feedback}
            />
          )}

          {question.type === 'text' && (
            <TextQuestion
              question={question}
              onAnswer={handleAnswer}
              disabled={feedback !== null}
              userAnswer={userAnswer}
              feedback={feedback}
            />
          )}

          {question.type === 'slider' && (
            <SliderQuestion
              question={question}
              onAnswer={handleAnswer}
              disabled={feedback !== null}
              userAnswer={userAnswer}
              feedback={feedback}
            />
          )}

          {question.type === 'card-sorting' && (
            <CardSortingQuestion
              question={question}
              onAnswer={handleAnswer}
              disabled={feedback !== null}
              userAnswer={userAnswer}
              feedback={feedback}
            />
          )}

          {question.type === 'comparison' && (
            <ComparisonQuestion
              question={question}
              onAnswer={handleAnswer}
              disabled={feedback !== null}
              userAnswer={userAnswer}
              feedback={feedback}
            />
          )}

          {feedback && (
            <div
              className={`mt-6 p-5 rounded-xl border-2 ${
                feedback.correct
                  ? 'bg-green-50 border-green-300'
                  : 'bg-blue-50 border-blue-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {feedback.correct ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <Lightbulb className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">
                    {feedback.correct ? '✅ Gut gemacht!' : '💡 Lass uns das vertiefen:'}
                  </p>
                  <p className="text-gray-700">{feedback.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
