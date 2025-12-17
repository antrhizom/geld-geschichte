import { AdaptivePath, LearningConcept, adaptiveConcepts } from './adaptiveConcepts';
import { Question } from './learning';

export class AdaptiveLearningEngine {
  private path: AdaptivePath;
  private concepts: LearningConcept[];

  constructor(userId: string) {
    this.concepts = adaptiveConcepts;
    this.path = {
      currentConcept: 'c1', // Start mit erstem Konzept
      performanceHistory: [],
      difficultyLevel: 5, // Start bei mittlerem Niveau (1-10)
      learningStyle: undefined // Wird erkannt
    };
    this.loadProgress(userId);
  }

  // Lädt Fortschritt aus localStorage
  private loadProgress(userId: string) {
    const saved = localStorage.getItem(`adaptive_path_${userId}`);
    if (saved) {
      this.path = JSON.parse(saved);
    }
  }

  // Speichert Fortschritt
  private saveProgress(userId: string) {
    localStorage.setItem(`adaptive_path_${userId}`, JSON.stringify(this.path));
  }

  // Aktuelles Konzept holen
  getCurrentConcept(): LearningConcept | undefined {
    return this.concepts.find(c => c.id === this.path.currentConcept);
  }

  // Bestimme welchen Content zu zeigen (basierend auf aktuellem Level)
  getContentForCurrentLevel(): string {
    const concept = this.getCurrentConcept();
    if (!concept) return '';

    const level = this.path.difficultyLevel;

    // Level 1-3: Einfach
    if (level <= 3) {
      return concept.coreContent + '\n\n---\n\n' + concept.deepening.easy;
    }
    // Level 4-7: Mittel
    else if (level <= 7) {
      return concept.coreContent + '\n\n---\n\n' + concept.deepening.medium;
    }
    // Level 8-10: Anspruchsvoll
    else {
      return concept.coreContent + '\n\n---\n\n' + concept.deepening.advanced;
    }
  }

  // Alternative Erklärung holen (wenn nicht verstanden)
  getAlternativeExplanation(): string {
    const concept = this.getCurrentConcept();
    if (!concept) return '';

    // Wenn Lernstil schon erkannt: bevorzuge diesen
    if (this.path.learningStyle) {
      return concept.alternativeExplanations[this.path.learningStyle];
    }

    // Sonst: gib alle Optionen
    return `
## Verschiedene Zugänge zu diesem Thema:

### 📖 Narrativer Zugang
${concept.alternativeExplanations.narrative}

### 📊 Visueller Zugang
${concept.alternativeExplanations.visual}

### 🔬 Analytischer Zugang
${concept.alternativeExplanations.analytical}
    `;
  }

  // Beispiele holen (basierend auf Level)
  getExamples(): string[] {
    const concept = this.getCurrentConcept();
    if (!concept) return [];

    if (this.path.difficultyLevel <= 5) {
      return concept.examples.simple;
    } else {
      return [...concept.examples.simple, ...concept.examples.complex];
    }
  }

  // Verarbeite Antwort und passe System an
  processAnswer(questionId: string, answer: any, timeSpent: number, userId: string): {
    correct: boolean;
    explanation: string;
    nextAction: 'continue' | 'deepen' | 'alternative' | 'next_concept';
    newLevel?: number;
  } {
    const concept = this.getCurrentConcept();
    if (!concept) return { correct: false, explanation: '', nextAction: 'continue' };

    const question = concept.checkQuestions.find(q => q.id === questionId);
    if (!question) return { correct: false, explanation: '', nextAction: 'continue' };

    const correct = this.checkAnswer(question, answer);
    const score = correct ? 100 : 0;

    // Update Performance History
    const existing = this.path.performanceHistory.find(p => p.conceptId === concept.id);
    if (existing) {
      existing.score = (existing.score + score) / 2; // Durchschnitt
      existing.attempts++;
      existing.timeSpent += timeSpent;
      existing.needsReview = existing.score < 70;
    } else {
      this.path.performanceHistory.push({
        conceptId: concept.id,
        score,
        attempts: 1,
        timeSpent,
        needsReview: score < 70
      });
    }

    // Adjust difficulty level
    if (correct) {
      // Schnell + richtig = Level steigt stärker
      if (timeSpent < 30000) { // < 30 Sekunden
        this.path.difficultyLevel = Math.min(10, this.path.difficultyLevel + 1);
      } else {
        this.path.difficultyLevel = Math.min(10, this.path.difficultyLevel + 0.5);
      }
    } else {
      // Falsch = Level sinkt
      this.path.difficultyLevel = Math.max(1, this.path.difficultyLevel - 1);
    }

    // Entscheide nächste Aktion
    let nextAction: 'continue' | 'deepen' | 'alternative' | 'next_concept';

    if (correct) {
      // Alle Fragen beantwortet?
      const answeredAll = concept.checkQuestions.every(q => 
        this.path.performanceHistory.some(p => p.conceptId === concept.id)
      );

      if (answeredAll) {
        const avgScore = existing?.score || score;
        if (avgScore >= 80) {
          nextAction = 'next_concept'; // Weiter zum nächsten Konzept
        } else {
          nextAction = 'deepen'; // Vertiefung nötig
        }
      } else {
        nextAction = 'continue'; // Nächste Frage
      }
    } else {
      // Falsch → Alternative Erklärung
      nextAction = 'alternative';
    }

    this.saveProgress(userId);

    return {
      correct,
      explanation: question.explanation,
      nextAction,
      newLevel: this.path.difficultyLevel
    };
  }

  // Hilfsfunktion: Antwort checken
  private checkAnswer(question: Question, answer: any): boolean {
    switch (question.type) {
      case 'multiple-choice':
        return answer === question.correctAnswer;
      
      case 'text':
        const keywords = (question.correctAnswer as string).split('|');
        return keywords.some(keyword => 
          answer.toLowerCase().includes(keyword.toLowerCase())
        );
      
      case 'slider':
        // Slider: Akzeptiere Werte nahe dem Ziel (±2)
        const target = question.correctAnswer as number;
        return Math.abs(answer - target) <= 2;
      
      case 'card-sorting':
        // Card Sorting: Prüfe ob Kategorien korrekt
        const correctCategories = question.correctAnswer as {[key: string]: string[]};
        let correctCount = 0;
        let totalItems = 0;
        
        Object.keys(correctCategories).forEach(category => {
          const correctItems = correctCategories[category];
          const userItems = answer[category] || [];
          totalItems += correctItems.length;
          correctItems.forEach((item: string) => {
            if (userItems.includes(item)) correctCount++;
          });
        });
        
        return (correctCount / totalItems) >= 0.7; // 70% richtig = akzeptiert
      
      case 'comparison':
        // Comparison: Prüfe jede Einzelantwort
        const correctComparisons = question.correctAnswer as {[key: string]: string};
        let correctAnswers = 0;
        let totalQuestions = Object.keys(correctComparisons).length;
        
        Object.keys(correctComparisons).forEach(key => {
          if (answer[key] === correctComparisons[key]) {
            correctAnswers++;
          }
        });
        
        return (correctAnswers / totalQuestions) >= 0.7; // 70% richtig
      
      case 'sorting':
      case 'matching':
        return JSON.stringify(answer) === JSON.stringify(question.correctAnswer);
      
      default:
        return false;
    }
  }

  // Gehe zum nächsten Konzept
  moveToNextConcept(userId: string): boolean {
    const current = this.getCurrentConcept();
    if (!current || !current.followUp || current.followUp.length === 0) {
      return false; // Kein nächstes Konzept
    }

    // Nimm das erste Follow-up Konzept
    this.path.currentConcept = current.followUp[0];
    this.saveProgress(userId);
    return true;
  }

  // Erkenne Lernstil (basierend auf Performance bei verschiedenen Erklärungstypen)
  detectLearningStyle(preferredExplanation: 'narrative' | 'visual' | 'analytical') {
    this.path.learningStyle = preferredExplanation;
  }

  // Prüfe ob alle Konzepte abgeschlossen
  isComplete(): boolean {
    return this.path.performanceHistory.length >= this.concepts.length &&
           this.path.performanceHistory.every(p => !p.needsReview);
  }

  // Statistiken für Zertifikat
  getStatistics() {
    const totalScore = this.path.performanceHistory.reduce((sum, p) => sum + p.score, 0);
    const avgScore = totalScore / this.path.performanceHistory.length || 0;
    const totalTime = this.path.performanceHistory.reduce((sum, p) => sum + p.timeSpent, 0);

    return {
      conceptsCompleted: this.path.performanceHistory.length,
      totalConcepts: this.concepts.length,
      averageScore: Math.round(avgScore),
      finalDifficultyLevel: this.path.difficultyLevel,
      totalTimeMinutes: Math.round(totalTime / 1000 / 60),
      learningStyle: this.path.learningStyle || 'mixed'
    };
  }

  // Hole Konzepte, die Review brauchen
  getConceptsNeedingReview(): LearningConcept[] {
    const needReviewIds = this.path.performanceHistory
      .filter(p => p.needsReview)
      .map(p => p.conceptId);

    return this.concepts.filter(c => needReviewIds.includes(c.id));
  }
}
