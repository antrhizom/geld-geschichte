'use client';

import { useEffect, useState } from 'react';
import { Award, Download, Share2, Clock } from 'lucide-react';
import { DifficultyLevel } from '@/types/learning';

export default function Certificate() {
  const [learnerName, setLearnerName] = useState('');
  const [level, setLevel] = useState<DifficultyLevel>('einfach');
  const [totalScore, setTotalScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [completionDate, setCompletionDate] = useState('');
  const [learningCode, setLearningCode] = useState('');

  useEffect(() => {
    setLearnerName(localStorage.getItem('learnerName') || 'Lernende/r');
    setLevel(localStorage.getItem('difficultyLevel') as DifficultyLevel || 'einfach');
    setLearningCode(localStorage.getItem('learningCode') || '');
    
    const scores = JSON.parse(localStorage.getItem('moduleScores') || '{}');
    const total = Object.values(scores).reduce((sum: number, score) => sum + (score as number), 0);
    setTotalScore(total);

    const time = parseInt(localStorage.getItem('totalTimeSpent') || '0');
    setTimeSpent(Math.round(time / 1000 / 60)); // Convert to minutes

    setCompletionDate(new Date().toLocaleDateString('de-CH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  }, []);

  const levelNames = {
    'einfach': 'Einstiegsniveau',
    'mittel': 'Fortgeschrittenes Niveau',
    'anspruchsvoll': 'Expert:innenniveau'
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Lernzertifikat: Der Geruch des Geldes',
      text: `Ich habe das Lernmodul "Der Geruch des Geldes" abgeschlossen! ${totalScore} Punkte auf ${levelNames[level]}.`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Fehler beim Teilen');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Actions (no-print) */}
        <div className="flex justify-end gap-4 mb-6 no-print">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Teilen
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Als PDF speichern
          </button>
        </div>

        {/* Certificate */}
        <div className="bg-white rounded-xl shadow-2xl p-12 border-8 border-primary-100">
          {/* Header */}
          <div className="text-center mb-8">
            <Award className="w-20 h-20 text-primary-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Lernzertifikat
            </h1>
            <div className="h-1 w-32 bg-primary-600 mx-auto"></div>
          </div>

          {/* Content */}
          <div className="text-center space-y-6 mb-8">
            <p className="text-xl text-gray-700">
              Hiermit wird bescheinigt, dass
            </p>
            
            <p className="text-3xl font-bold text-primary-600">
              {learnerName}
            </p>

            <p className="text-xl text-gray-700">
              das interaktive Lernmodul
            </p>

            <p className="text-2xl font-semibold text-gray-900">
              &quot;Der Geruch des Geldes&quot;
            </p>

            <p className="text-lg text-gray-600">
              basierend auf Yuval Noah Hararis Analyse der Geschichte und <br />
              Bedeutung des Geldes erfolgreich absolviert hat
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">
                {levelNames[level]}
              </div>
              <div className="text-sm text-gray-600">Schwierigkeitsstufe</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">
                {totalScore}
              </div>
              <div className="text-sm text-gray-600">Gesamtpunkte</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1 flex items-center justify-center gap-2">
                <Clock className="w-6 h-6" />
                {timeSpent} Min
              </div>
              <div className="text-sm text-gray-600">Lernzeit</div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Ausgestellt am: {completionDate}
            </p>
            <p className="text-sm text-gray-500">
              Lerncode: {learningCode}
            </p>
            <p className="text-xs text-gray-400 mt-4">
              Entwickelt für Sek II Berufsbildung Schweiz
            </p>
          </div>
        </div>

        {/* Feedback Section (no-print) */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 no-print">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Was kommt als Nächstes?
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              ✓ Speichere dieses Zertifikat als PDF für deine Unterlagen
            </p>
            <p>
              ✓ Teile deine Lernerfolge mit deinen Lehrpersonen oder Mitschüler:innen
            </p>
            <p>
              ✓ Vertiefe dein Wissen mit Yuval Hararis Buch &quot;Eine kurze Geschichte der Menschheit&quot;
            </p>
          </div>
          
          <div className="mt-6">
            <a
              href="/"
              className="inline-block bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Zurück zur Startseite
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
