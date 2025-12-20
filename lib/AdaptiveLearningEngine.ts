import { AdaptivePath, LearningConcept, adaptiveConcepts } from './adaptiveConcepts';
import { Question } from './learning';

export class AdaptiveLearningEngine {
  private path: AdaptivePath;
  private concepts: LearningConcept[];

  constructor(userId: string) {
    this.concepts = adaptiveConcepts;
    this.path = {
      currentConcept: 'c1',
      performanceHistory: [],
      answeredQuestions: [],
      difficultyLevel: 5,
      learningStyle: undefined
    };
    this.loadProgress(userId);
  }

  private loadProgress(userId: string) {
    const saved = localStorage.getItem(`adaptive_path_${userId}`);
    if (saved) {
      const loadedPath = JSON.parse(saved);
      // Ensure answeredQuestions exists (for backward compatibility)
      if (!loadedPath.answeredQuestions) {
        loadedPath.answeredQuestions = [];
      }
      this.path = loadedPath;
    }
  }

  private saveProgress(userId: string) {
    localStorage.setItem(`adaptive_path_${userId}`, JSON.stringify(this.path));
  }

  getCurrentConcept(): LearningConcept | undefined {
    return this.concepts.find(c => c.id === this.path.currentConcept);
  }

  getContentForCurrentLevel(): string {
    const concept = this.getCurrentConcept();
    if (!concept) return '';

    const level = this.path.difficultyLevel;

    if (level <= 3) {
      return concept.coreContent + '\n\n---\n\n' + concept.deepening.easy;
    } else if (level <= 7) {
      return concept.coreContent + '\n\n---\n\n' + concept.deepening.medium;
    } else {
      return concept.coreContent + '\n\n---\n\n' + concept.deepening.advanced;
    }
  }

  getAlternativeExplanation(): string {
    const concept = this.getCurrentConcept();
    if (!concept) return '';

    if (this.path.learningStyle) {
      return concept.alternativeExplanations[this.path.learningStyle];
    }

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

  getExamples(): string[] {
    const concept = this.getCurrentConcept();
    if (!concept) return [];

    if (this.path.difficultyLevel <= 5) {
      return concept.examples.simple;
    } else {
      return [...concept.examples.simple, ...concept.examples.complex];
    }
  }

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

    // **NEU**: Tracke diese spezifische Frage
    const alreadyAnswered = this.path.answeredQuestions.some(
      q => q.conceptId === concept.id && q.questionId === questionId
    );
    
    if (!alreadyAnswered) {
      this.path.answeredQuestions.push({
        conceptId: concept.id,
        questionId: questionId,
        correct
      });
    }

    // Update Performance History
    const existing = this.path.performanceHistory.find(p => p.conceptId === concept.id);
    if (existing) {
      existing.score = (existing.score + score) / 2;
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
      if (timeSpent < 30000) {
        this.path.difficultyLevel = Math.min(10, this.path.difficultyLevel + 1);
      } else {
        this.path.difficultyLevel = Math.min(10, this.path.difficultyLevel + 0.5);
      }
    } else {
      this.path.difficultyLevel = Math.max(1, this.path.difficultyLevel - 1);
    }

    // **VERBESSERT**: Entscheide nächste Aktion basierend auf beantworteten Fragen
    let nextAction: 'continue' | 'deepen' | 'alternative' | 'next_concept';

    const answeredForThisConcept = this.path.answeredQuestions.filter(
      q => q.conceptId === concept.id
    );
    const totalQuestions = concept.checkQuestions.length;
    const allQuestionsAnswered = answeredForThisConcept.length >= totalQuestions;

    console.log(`Concept ${concept.id}: ${answeredForThisConcept.length}/${totalQuestions} questions answered`);

    if (correct) {
      if (allQuestionsAnswered) {
        const avgScore = existing?.score || score;
        console.log(`All questions answered! Avg score: ${avgScore}`);
        
        if (avgScore >= 80) {
          nextAction = 'next_concept';
        } else if (avgScore >= 50) {
          nextAction = 'deepen';
        } else {
          nextAction = 'alternative';
        }
      } else {
        nextAction = 'continue';
      }
    } else {
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
        const target = question.correctAnswer as number;
        return Math.abs(answer - target) <= 2;
      
      case 'card-sorting':
        if (!answer || typeof answer !== 'object') return false;
        
        const correctCategories = question.correctAnswer as {[key: string]: string[]};
        let correctPlacements = 0;
        let totalItems = 0;
        
        Object.keys(correctCategories).forEach(category => {
          totalItems += correctCategories[category].length;
        });
        
        Object.keys(correctCategories).forEach(category => {
          const correctItems = correctCategories[category];
          const userItems = answer[category] || [];
          
          correctItems.forEach((item: string) => {
            if (userItems.includes(item)) {
              correctPlacements++;
            }
          });
        });
        
        const score = totalItems > 0 ? (correctPlacements / totalItems) : 0;
        return score >= 0.6;
      
      case 'comparison':
        const correctComparisons = question.correctAnswer as {[key: string]: string};
        let correctAnswers = 0;
        let totalQuestions = Object.keys(correctComparisons).length;
        
        Object.keys(correctComparisons).forEach(key => {
          if (answer[key] === correctComparisons[key]) {
            correctAnswers++;
          }
        });
        
        return (correctAnswers / totalQuestions) >= 0.7;
      
      case 'sorting':
      case 'matching':
        return JSON.stringify(answer) === JSON.stringify(question.correctAnswer);
      
      default:
        return false;
    }
  }

  moveToNextConcept(userId: string): boolean {
    const current = this.getCurrentConcept();
    if (!current || !current.followUp || current.followUp.length === 0) {
      console.log('No more concepts!');
      return false;
    }

    this.path.currentConcept = current.followUp[0];
    console.log(`Moving to concept: ${this.path.currentConcept}`);
    this.saveProgress(userId);
    return true;
  }

  detectLearningStyle(preferredExplanation: 'narrative' | 'visual' | 'analytical') {
    this.path.learningStyle = preferredExplanation;
  }

  isComplete(): boolean {
    return this.path.performanceHistory.length >= this.concepts.length &&
           this.path.performanceHistory.every(p => !p.needsReview);
  }

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

  getConceptsNeedingReview(): LearningConcept[] {
    const needReviewIds = this.path.performanceHistory
      .filter(p => p.needsReview)
      .map(p => p.conceptId);

    return this.concepts.filter(c => needReviewIds.includes(c.id));
  }
}
