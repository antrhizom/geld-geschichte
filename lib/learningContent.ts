import { LearningPath } from '@/types/learning';

export const learningContent: LearningPath = {
  einfach: [
    {
      id: 'e1',
      title: 'Einführung: Was ist Geld?',
      description: 'Grundlagen des Geldes verstehen',
      estimatedMinutes: 20,
      content: `# Was ist Geld?

Geld ist etwas Besonderes – es hat nur Wert, weil wir **alle daran glauben**. 

## Die Geschichte mit den Azteken

Als die Spanier 1519 nach Mexiko kamen, bemerkten die Azteken etwas Seltsames: Die Fremden waren **besessen von Gold**! 

Die Azteken nutzten als Währung:
- **Kakaobohnen** ☕
- **Tuchballen** 🧵

Sie fragten Cortés: "Warum wollt ihr dieses gelbe Metall so sehr?" 
Seine Antwort: "Sie leiden an einer Krankheit des Herzens, die nur mit Gold geheilt werden kann."

## Warum funktioniert Geld?

Geld funktioniert, weil:
1. **Alle daran glauben** – Du glaubst daran, weil dein Nachbar daran glaubt
2. **Man kann es tauschen** – Gegen fast alles!
3. **Man kann es aufbewahren** – Für später`,
      questions: [
        {
          id: 'e1q1',
          type: 'multiple-choice',
          question: 'Was nutzten die Azteken als Währung?',
          options: ['Gold und Silber', 'Kakaobohnen und Tuchballen', 'Münzen', 'Papier'],
          correctAnswer: 'Kakaobohnen und Tuchballen',
          explanation: 'Die Azteken verwendeten Kakaobohnen und Tuchballen als ihre Währung, nicht Gold.',
          difficulty: 'einfach',
          points: 5
        },
        {
          id: 'e1q2',
          type: 'multiple-choice',
          question: 'Warum funktioniert Geld?',
          options: [
            'Weil es aus Gold ist',
            'Weil alle daran glauben',
            'Weil der König es sagt',
            'Weil es schön aussieht'
          ],
          correctAnswer: 'Weil alle daran glauben',
          explanation: 'Geld funktioniert, weil wir alle gemeinsam daran glauben und es akzeptieren.',
          difficulty: 'einfach',
          points: 5
        }
      ]
    }
  ],
  mittel: [
    {
      id: 'm1',
      title: 'Die intersubjektive Realität des Geldes',
      description: 'Geld als kollektive Vorstellung',
      estimatedMinutes: 30,
      content: `# Geld: Eine geistige Revolution

## Was ist intersubjektive Realität?

Geld ist keine **objektive** Realität (wie ein Stein), sondern eine **intersubjektive** Realität.

Geld existiert nur durch den **gemeinsamen Glauben** vieler Menschen.`,
      questions: [
        {
          id: 'm1q1',
          type: 'multiple-choice',
          question: 'Was bedeutet "intersubjektive Realität" im Kontext des Geldes?',
          options: [
            'Geld existiert nur in der Vorstellung einzelner Personen',
            'Geld existiert in der gemeinsamen Vorstellung vieler Menschen',
            'Geld ist ein physisches Objekt mit intrinsischem Wert',
            'Geld ist eine natürliche Ressource'
          ],
          correctAnswer: 'Geld existiert in der gemeinsamen Vorstellung vieler Menschen',
          explanation: 'Intersubjektive Realität bedeutet, dass Geld nur durch den kollektiven Glauben vieler Menschen existiert und Wert hat.',
          difficulty: 'mittel',
          points: 10
        }
      ]
    }
  ],
  anspruchsvoll: [
    {
      id: 'a1',
      title: 'Epistemologie des Geldes',
      description: 'Philosophische Grundlagen monetärer Systeme',
      estimatedMinutes: 35,
      content: `# Die Ontologie und Epistemologie des Geldes

## Drei Ebenen der Realität

Geld ist eine **intersubjektive Realität** - es existiert im geteilten Bewusstsein einer Gruppe.`,
      questions: [
        {
          id: 'a1q1',
          type: 'text',
          question: 'Erkläre den Unterschied zwischen objektiver, subjektiver und intersubjektiver Realität.',
          correctAnswer: 'objektiv|subjektiv|intersubjektiv|kollektiv|bewusstsein|physisch',
          explanation: 'Objektiv: physisch existent. Subjektiv: nur im individuellen Bewusstsein. Intersubjektiv: durch kollektiven Glauben existent.',
          difficulty: 'anspruchsvoll',
          points: 20
        }
      ]
    }
  ]
};
