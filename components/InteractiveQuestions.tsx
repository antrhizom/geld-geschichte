'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, GripVertical } from 'lucide-react';

interface QuestionProps {
  question: any;
  onAnswer: (answer: any) => void;
  disabled: boolean;
  userAnswer: any;
  feedback: any;
}

export function MultipleChoiceQuestion({ question, onAnswer, disabled, userAnswer, feedback }: QuestionProps) {
  return (
    <div className="space-y-3">
      {question.options?.map((option: string, index: number) => (
        <button
          key={index}
          onClick={() => onAnswer(option)}
          disabled={disabled}
          className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
            feedback && userAnswer === option
              ? feedback.correct
                ? 'border-green-500 bg-green-50 shadow-lg'
                : 'border-red-500 bg-red-50 shadow-lg'
              : 'border-gray-200 hover:border-primary-500 hover:bg-primary-50 hover:shadow-md'
          } disabled:cursor-not-allowed`}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-lg">{option}</span>
            {feedback && userAnswer === option && (
              <div className="flex-shrink-0">
                {feedback.correct ? (
                  <CheckCircle className="w-7 h-7 text-green-600" />
                ) : (
                  <XCircle className="w-7 h-7 text-red-600" />
                )}
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}

export function TextQuestion({ question, onAnswer, disabled, userAnswer }: QuestionProps) {
  const [text, setText] = useState(userAnswer || '');

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-primary-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700">
          💡 <strong>Tipp:</strong> Nimm dir Zeit für deine Antwort. Es gibt keine "perfekte" Antwort - zeig dein Verständnis!
        </p>
      </div>
      
      <textarea
        className="w-full p-5 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 disabled:bg-gray-100 transition-all text-lg"
        rows={6}
        placeholder="Schreib deine Antwort hier... (mindestens 20 Wörter)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {text.trim().split(/\s+/).filter(Boolean).length} Wörter
        </span>
        {!disabled && (
          <button
            onClick={() => onAnswer(text)}
            disabled={text.trim().split(/\s+/).filter(Boolean).length < 20}
            className="bg-primary-600 text-white py-3 px-8 rounded-xl hover:bg-primary-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            Antwort einreichen
          </button>
        )}
      </div>
    </div>
  );
}

export function SliderQuestion({ question, onAnswer, disabled, userAnswer, feedback }: QuestionProps) {
  const [value, setValue] = useState(userAnswer ?? 5);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-50 to-orange-50 p-6 rounded-xl border border-primary-200">
        <p className="text-gray-700 mb-4">{question.prompt}</p>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 w-32">{question.labels?.min || 'Stimme nicht zu'}</span>
            <input
              type="range"
              min={question.min || 1}
              max={question.max || 10}
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value))}
              disabled={disabled}
              className="flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <span className="text-sm text-gray-600 w-32 text-right">{question.labels?.max || 'Stimme völlig zu'}</span>
          </div>
          
          <div className="text-center">
            <div className="inline-block bg-primary-600 text-white px-6 py-2 rounded-full text-2xl font-bold shadow-lg">
              {value}
            </div>
          </div>
        </div>
      </div>

      {!disabled && (
        <button
          onClick={() => onAnswer(value)}
          className="w-full bg-primary-600 text-white py-3 px-6 rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-lg"
        >
          Weiter
        </button>
      )}
    </div>
  );
}

export function CardSortingQuestion({ question, onAnswer, disabled, userAnswer, feedback }: QuestionProps) {
  const [categories, setCategories] = useState<{[key: string]: string[]}>(
    userAnswer || question.categories.reduce((acc: any, cat: string) => ({ ...acc, [cat]: [] }), {})
  );
  const [unassigned, setUnassigned] = useState<string[]>(
    userAnswer ? [] : [...question.items]
  );
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, item: string) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item);
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, category: string) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('text/plain');
    
    if (!item || disabled) return;

    // Entferne aus alter Kategorie oder unassigned
    let newCategories = { ...categories };
    let newUnassigned = unassigned.filter(i => i !== item);

    // Entferne aus allen Kategorien
    Object.keys(newCategories).forEach(cat => {
      newCategories[cat] = newCategories[cat].filter(i => i !== item);
    });

    // Füge zu neuer Kategorie hinzu
    newCategories[category] = [...newCategories[category], item];

    setCategories(newCategories);
    setUnassigned(newUnassigned);
    setDraggedItem(null);
  };

  const handleDropToUnassigned = (e: React.DragEvent) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('text/plain');
    
    if (!item || disabled) return;

    // Entferne aus allen Kategorien
    let newCategories = { ...categories };
    Object.keys(newCategories).forEach(cat => {
      newCategories[cat] = newCategories[cat].filter(i => i !== item);
    });

    // Füge zu unassigned hinzu (falls noch nicht drin)
    if (!unassigned.includes(item)) {
      setUnassigned([...unassigned, item]);
    }
    
    setCategories(newCategories);
    setDraggedItem(null);
  };

  const handleSubmit = () => {
    if (unassigned.length === 0) {
      onAnswer(categories);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-primary-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700">
          🎯 <strong>Aufgabe:</strong> Ziehe die Karten in die passenden Kategorien! (Drag & Drop)
        </p>
      </div>

      {/* Unassigned Items */}
      {unassigned.length > 0 && (
        <div 
          className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-300 min-h-[80px]"
          onDragOver={handleDragOver}
          onDrop={handleDropToUnassigned}
        >
          <h4 className="font-semibold text-gray-700 mb-3">📦 Zu sortieren:</h4>
          <div className="flex flex-wrap gap-2">
            {unassigned.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-primary-100 to-orange-100 px-4 py-3 rounded-lg cursor-grab active:cursor-grabbing hover:shadow-lg transition-all border border-primary-200"
                draggable={!disabled}
                onDragStart={(e) => handleDragStart(e, item)}
                style={{ opacity: draggedItem === item ? 0.5 : 1 }}
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-sm">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="grid md:grid-cols-2 gap-4">
        {question.categories.map((category: string, idx: number) => (
          <div
            key={idx}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, category)}
            className={`bg-white p-5 rounded-xl border-2 min-h-[150px] transition-all ${
              disabled 
                ? 'border-gray-200' 
                : 'border-primary-300 hover:border-primary-500 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {categories[category]?.length || 0}
              </div>
              <h4 className="font-bold text-lg text-primary-700">{category}</h4>
            </div>
            <div className="space-y-2">
              {categories[category]?.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  draggable={!disabled}
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="bg-gradient-to-r from-primary-50 to-orange-50 px-3 py-3 rounded-lg cursor-grab active:cursor-grabbing hover:shadow-md transition-all border border-primary-100"
                  style={{ opacity: draggedItem === item ? 0.5 : 1 }}
                >
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!disabled && (
        <div className="flex flex-col gap-2">
          <button
            onClick={handleSubmit}
            disabled={unassigned.length > 0}
            className="w-full bg-primary-600 text-white py-3 px-6 rounded-xl hover:bg-primary-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
          >
            {unassigned.length > 0 ? `Noch ${unassigned.length} Karten zu sortieren` : 'Antwort einreichen'}
          </button>
          
          {unassigned.length === 0 && (
            <p className="text-center text-sm text-green-600 font-medium">
              ✅ Alle Karten sortiert! Du kannst einreichen oder noch Änderungen vornehmen.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function ComparisonQuestion({ question, onAnswer, disabled, userAnswer, feedback }: QuestionProps) {
  const [selections, setSelections] = useState<{[key: string]: string}>(userAnswer || {});

  const handleSelect = (questionKey: string, value: string) => {
    if (disabled) return;
    setSelections({ ...selections, [questionKey]: value });
  };

  const handleSubmit = () => {
    if (Object.keys(selections).length === question.comparisons.length) {
      onAnswer(selections);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-primary-50 p-4 rounded-lg border border-purple-200">
        <p className="text-sm text-gray-700">
          ⚖️ <strong>Aufgabe:</strong> Bewerte die folgenden Aussagen!
        </p>
      </div>

      <div className="space-y-4">
        {question.comparisons.map((comp: any, idx: number) => (
          <div key={idx} className="bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-primary-300 transition-colors">
            <p className="font-medium text-gray-900 mb-4">{comp.statement}</p>
            <div className="flex gap-3">
              {comp.options.map((option: string, optIdx: number) => (
                <button
                  key={optIdx}
                  onClick={() => handleSelect(comp.id, option)}
                  disabled={disabled}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all font-medium ${
                    selections[comp.id] === option
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300'
                  } disabled:cursor-not-allowed`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!disabled && (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(selections).length < question.comparisons.length}
          className="w-full bg-primary-600 text-white py-3 px-6 rounded-xl hover:bg-primary-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
        >
          {Object.keys(selections).length < question.comparisons.length 
            ? `Noch ${question.comparisons.length - Object.keys(selections).length} Fragen beantworten`
            : 'Antwort einreichen'}
        </button>
      )}
    </div>
  );
}
