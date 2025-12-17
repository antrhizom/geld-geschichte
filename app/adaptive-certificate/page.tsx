'use client';

import { useEffect, useState } from 'react';
import { Award, Download, TrendingUp, Clock, Target } from 'lucide-react';
import { AdaptiveLearningEngine } from '@/lib/AdaptiveLearningEngine';

export default function AdaptiveCertificate() {
  const [learnerName, setLearnerName] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [learningCode, setLearningCode] = useState('');
  const [completionDate, setCompletionDate] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('learnerName') || 'Lernende/r';
    const code = localStorage.getItem('learningCode') || '';
    
    setLearnerName(name);
    setLearningCode(code);
    
    const engine = new AdaptiveLearningEngine(code);
    setStats(engine.getStatistics());

    setCompletionDate(
      new Date().toLocaleDateString('de-CH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    );
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const getLevelDescription = (level: number) => {
    if (level <= 3) return 'Grundlagen-Niveau';
    if (level <= 6) return 'Fortgeschrittenes Niveau';
    if (level <= 8) return 'Expert:innen-Niveau';
    return 'Master-Niveau';
  };

  const getLearningStyleDescription = (style: string) => {
    switch (style) {
      case 'narrative':
        return 'Narrativ (Geschichten & Beispiele)';
      case 'visual':
        return 'Visuell (Diagramme & Modelle)';
      case 'analytical':
        return 'Analytisch (Theorien & Modelle)';
      default:
        return 'Multimodal';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Actions (no-print) */}
        <div className="flex justify-end gap-4 mb-6 no-print">
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Zur Startseite
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
              Adaptives Lernzertifikat
            </h1>
            <div className="h-1 w-32 bg-primary-600 mx-auto"></div>
          </div>

          {/* Content */}
          <div className="text-center space-y-6 mb-8">
            <p className="text-xl text-gray-700">Hiermit wird bescheinigt, dass</p>

            <p className="text-3xl font-bold text-primary-600">{learnerName}</p>

            <p className="text-xl text-gray-700">
              das adaptive interaktive Lernmodul
            </p>

            <p className="text-2xl font-semibold text-gray-900">
              &quot;Der Geruch des Geldes&quot;
            </p>

            <p className="text-lg text-gray-600">
              nach Yuval Noah Hararis Analyse erfolgreich absolviert hat.
              <br />
              Das Lernsystem hat sich kontinuierlich an das individuelle
              <br />
              Lernniveau und den Lernstil angepasst.
            </p>
          </div>

          {/* Adaptive Stats Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8 pt-8 border-t border-gray-200">
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-primary-600" />
                <div className="text-3xl font-bold text-primary-600">
                  {stats.finalDifficultyLevel.toFixed(1)}/10
                </div>
              </div>
              <div className="text-sm text-gray-600">Erreichtes Niveau</div>
              <div className="text-xs text-gray-500 mt-1">
                {getLevelDescription(stats.finalDifficultyLevel)}
              </div>
            </div>

            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-6 h-6 text-primary-600" />
                <div className="text-3xl font-bold text-primary-600">
                  {stats.averageScore}%
                </div>
              </div>
              <div className="text-sm text-gray-600">Durchschnittliche Punktzahl</div>
              <div className="text-xs text-gray-500 mt-1">
                {stats.conceptsCompleted} Konzepte abgeschlossen
              </div>
            </div>

            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-6 h-6 text-primary-600" />
                <div className="text-3xl font-bold text-primary-600">
                  {stats.totalTimeMinutes} Min
                </div>
              </div>
              <div className="text-sm text-gray-600">Gesamte Lernzeit</div>
            </div>

            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-3xl font-bold text-primary-600 mb-2">🎯</div>
              <div className="text-sm text-gray-600">Bevorzugter Lernstil</div>
              <div className="text-xs text-gray-500 mt-1">
                {getLearningStyleDescription(stats.learningStyle)}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gradient-to-r from-primary-50 to-orange-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              🏆 Besondere Leistungen
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>
                  Adaptives Lernen auf {stats.conceptsCompleted} Konzepten
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>
                  Schwierigkeitsgrad dynamisch angepasst
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>
                  Individueller Lernpfad durchlaufen
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>
                  {stats.averageScore >= 80 ? 'Exzellente' : 'Sehr gute'} Performance
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Ausgestellt am: {completionDate}
            </p>
            <p className="text-sm text-gray-500">Lerncode: {learningCode}</p>
            <p className="text-xs text-gray-400 mt-4">
              Adaptive Lernplattform • Sek II Berufsbildung Schweiz
            </p>
          </div>
        </div>

        {/* Info Section (no-print) */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 no-print">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Was bedeutet "adaptives Lernen"?
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              ✅ Das System hat sich kontinuierlich an dein Lerntempo angepasst
            </p>
            <p>
              ✅ Bei richtigen Antworten wurde der Schwierigkeitsgrad erhöht
            </p>
            <p>
              ✅ Bei Schwierigkeiten wurden alternative Erklärungen angeboten
            </p>
            <p>
              ✅ Dein bevorzugter Lernstil wurde erkannt und berücksichtigt
            </p>
            <p>
              ✅ Die Inhalte wurden dynamisch an dein Niveau angepasst
            </p>
          </div>

          <div className="mt-6 p-4 bg-primary-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Dein erreichtes Niveau {stats.finalDifficultyLevel.toFixed(1)}/10</strong> bedeutet:
              Du hast Inhalte auf <strong>{getLevelDescription(stats.finalDifficultyLevel)}</strong> erfolgreich gemeistert!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
