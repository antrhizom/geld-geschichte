'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Coins, BookOpen, Target, Clock } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [learningCode, setLearningCode] = useState('');
  const [name, setName] = useState('');

  const generateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
      if (i === 3) code += '-';
    }
    return code;
  };

  const startLearning = () => {
    const code = generateCode();
    localStorage.setItem('learningCode', code);
    localStorage.setItem('learnerName', name || 'Lernende/r');
    localStorage.setItem('startTime', Date.now().toString());
    router.push('/adaptive-learn');
  };

  const continueLearning = () => {
    if (learningCode.trim()) {
      localStorage.setItem('learningCode', learningCode.toUpperCase());
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Coins className="w-16 h-16 text-primary-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Der Geruch des Geldes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Eine interaktive Lernreise durch Yuval Hararis Analyse der Geschichte und Bedeutung des Geldes
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BookOpen className="w-10 h-10 text-primary-600 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Echte Adaptivität</h3>
            <p className="text-gray-600">
              Das System passt sich kontinuierlich an dein Lerntempo an - bei richtigen Antworten steigt der Schwierigkeitsgrad, bei Schwierigkeiten werden alternative Erklärungen angeboten
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Target className="w-10 h-10 text-primary-600 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Lernprotokoll</h3>
            <p className="text-gray-600">
              Dein Fortschritt wird automatisch gespeichert und geräteübergreifend synchronisiert
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Clock className="w-10 h-10 text-primary-600 mb-3" />
            <h3 className="text-lg font-semibold mb-2">~3 Stunden Lerndauer</h3>
            <p className="text-gray-600">
              Strukturiert für Sek II Berufsbildung Schweiz, mit druckbarem Abschlusszertifikat
            </p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Neues Lernen */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Neues Lernen starten</h2>
            <p className="text-gray-600 mb-6">
              Erhalte einen persönlichen Lerncode und beginne deine Reise durch die Geschichte des Geldes
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dein Name (optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="z.B. Anna Müller"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={startLearning}
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Lernreise beginnen
              </button>
            </div>
          </div>

          {/* Fortsetzen */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Lernen fortsetzen</h2>
            <p className="text-gray-600 mb-6">
              Gib deinen Lerncode ein, um auf einem anderen Gerät weiterzumachen
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lerncode (z.B. ABCD-1234)
                </label>
                <input
                  type="text"
                  value={learningCode}
                  onChange={(e) => setLearningCode(e.target.value.toUpperCase())}
                  placeholder="XXXX-XXXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent uppercase"
                  maxLength={9}
                />
              </div>
              <button
                onClick={continueLearning}
                disabled={learningCode.length < 8}
                className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Fortsetzen
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-gray-600">
          <p className="mb-2">
            Basierend auf Yuval Noah Hararis Kapitel &quot;Der Geruch des Geldes&quot; aus &quot;Eine kurze Geschichte der Menschheit&quot;
          </p>
          <p className="text-sm">
            Entwickelt für Sek II Berufsbildung Schweiz • Firebase + Vercel + Next.js
          </p>
        </div>
      </div>
    </div>
  );
}
