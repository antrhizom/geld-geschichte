'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle } from 'lucide-react';
import { DifficultyLevel } from '@/types/learning';

const testQuestions = [
  {
    question: 'Welches Konzept beschreibt am besten, wie Geld funktioniert?',
    options: [
      'Physischer Wert des Materials',
      'Kollektiver Glaube und Vertrauen',
      'Staatliche Macht allein',
      'Natürliche Notwendigkeit'
    ],
    correct: 1,
    difficulty: 'basic'
  },
  {
    question: 'Was war das Hauptproblem des Tauschhandels?',
    options: [
      'Zu viele Waren',
      'Zu komplizierte Berechnungen',
      'Doppelte Übereinstimmung der Bedürfnisse nötig',
      'Mangel an Transportmitteln'
    ],
    correct: 2,
    difficulty: 'basic'
  },
  {
    question: 'Welchen Vorteil hatten Münzen gegenüber unmarkierten Metallbarren?',
    options: [
      'Sie waren schöner',
      'Sie waren leichter',
      'Sie garantierten Gewicht und Reinheit durch königliches Siegel',
      'Sie waren billiger herzustellen'
    ],
    correct: 2,
    difficulty: 'medium'
  },
  {
    question: 'Was bedeutet "intersubjektive Realität" im Kontext des Geldes?',
    options: [
      'Geld existiert nur für Einzelpersonen',
      'Geld existiert physisch in der Welt',
      'Geld existiert durch gemeinsamen Glauben vieler Menschen',
      'Geld ist eine wissenschaftliche Tatsache'
    ],
    correct: 2,
    difficulty: 'advanced'
  }
];

export default function LevelTest() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < testQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 500);
    }
  };

  const calculateLevel = (): DifficultyLevel => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === testQuestions[index].correct) {
        correct++;
      }
    });

    const percentage = (correct / testQuestions.length) * 100;

    if (percentage >= 75) return 'anspruchsvoll';
    if (percentage >= 50) return 'mittel';
    return 'einfach';
  };

  const startLearning = () => {
    const level = calculateLevel();
    localStorage.setItem('difficultyLevel', level);
    localStorage.setItem('completedModules', JSON.stringify([]));
    localStorage.setItem('moduleScores', JSON.stringify({}));
    router.push('/learn');
  };

  if (showResult) {
    const level = calculateLevel();
    const correct = answers.filter((answer, index) => answer === testQuestions[index].correct).length;

    const levelDescriptions = {
      'einfach': {
        title: 'Einstiegsniveau',
        description: 'Du beginnst mit grundlegenden Konzepten und einfachen Erklärungen.',
        color: 'bg-green-500'
      },
      'mittel': {
        title: 'Fortgeschritten',
        description: 'Du erhältst tiefergehende Analysen mit historischen Kontexten.',
        color: 'bg-blue-500'
      },
      'anspruchsvoll': {
        title: 'Expert:innenniveau',
        description: 'Du wirst mit philosophischen und wissenschaftlichen Perspektiven herausgefordert.',
        color: 'bg-purple-500'
      }
    };

    const info = levelDescriptions[level];

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl p-8 animate-fade-in">
          <div className="text-center mb-8">
            <div className={`w-20 h-20 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Test abgeschlossen!</h2>
            <p className="text-lg text-gray-600">
              Du hast {correct} von {testQuestions.length} Fragen richtig beantwortet
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-2">Dein Lernniveau: {info.title}</h3>
            <p className="text-gray-700">{info.description}</p>
          </div>

          <button
            onClick={startLearning}
            className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium text-lg"
          >
            Zum personalisierten Lernpfad
          </button>
        </div>
      </div>
    );
  }

  const question = testQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / testQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Frage {currentQuestion + 1} von {testQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all hover:border-primary-500 hover:bg-primary-50 ${
                  answers[currentQuestion] === index
                    ? index === question.correct
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-200'
                }`}
                disabled={answers[currentQuestion] !== undefined}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {answers[currentQuestion] === index && (
                    index === question.correct ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
