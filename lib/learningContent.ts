import { LearningPath } from '@/types/learning';

// Diese Datei enthält die Lerninhalte für das alte 3-Pfad-System
// Das neue adaptive System nutzt adaptiveConcepts.ts

export const learningContent: LearningPath = {
  einfach: [
    {
      id: 'e1',
      title: 'Einführung: Was ist Geld?',
      description: 'Grundlagen des Geldes verstehen',
      estimatedMinutes: 20,
      requiredScore: 10,
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
3. **Man kann es aufbewahren** – Für später

## Das Problem des Tauschhandels

Stell dir vor, du bist Schuhmacher und willst Brot:
- Du musst einen Bäcker finden, der **gerade Schuhe braucht**
- Und der auch **genau jetzt** mit dir tauschen will
- Das ist super kompliziert!

**Mit Geld:** 
- Du verkaufst Schuhe gegen Geld
- Du kaufst Brot mit Geld
- Fertig! 🎉`,
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
        },
        {
          id: 'e1q3',
          type: 'multiple-choice',
          question: 'Was ist das Hauptproblem beim Tauschhandel?',
          options: [
            'Es gibt zu wenige Waren',
            'Man braucht doppelte Übereinstimmung der Bedürfnisse',
            'Transport ist schwierig',
            'Es ist illegal'
          ],
          correctAnswer: 'Man braucht doppelte Übereinstimmung der Bedürfnisse',
          explanation: 'Beim Tauschhandel müssen beide Parteien genau das wollen, was der andere anbietet - zur gleichen Zeit!',
          difficulty: 'einfach',
          points: 5
        }
      ]
    },
    {
      id: 'e2',
      title: 'Die Entwicklung des Geldes',
      description: 'Von Gerste über Silber zu Münzen',
      estimatedMinutes: 25,
      requiredScore: 15,
      content: `# Die Geschichte des Geldes

## Stufe 1: Gerste (3000 v.u.Z.)

Im alten Sumer (heutiger Irak) nutzten Menschen **Gerste** als Geld:
- 1 Sila = 1 Liter Gerste
- Ein Mann verdiente 60 Silas pro Monat
- Eine Frau verdiente 30 Silas pro Monat

**Vorteil:** Jeder konnte Gerste essen!
**Nachteil:** Schwer zu transportieren und kann verderben.

## Stufe 2: Silber (2500 v.u.Z.)

Dann kam der **Silberschekel**:
- 1 Schekel = 8,33 Gramm Silber
- **Wichtig:** Silber kann man nicht essen! 🤔

**Frage:** Warum akzeptierten Menschen etwas, das man nicht essen kann?
**Antwort:** Weil andere es auch akzeptierten!

## Stufe 3: Münzen (640 v.u.Z.)

König Alyattes von Lydien (Türkei) erfand die **ersten Münzen**:
- Garantiertes Gewicht
- Königliches Siegel als Garantie
- Man musste nicht mehr bei jedem Handel wiegen!

**Vorteil:** Schneller Handel ohne Waage! ⚖️

## Heute: Digitales Geld

Heute sind **über 90%** unseres Geldes digital:
- Nur Zahlen in Computern
- Keine physischen Münzen oder Scheine
- Noch abstrakter, aber noch praktischer!`,
      questions: [
        {
          id: 'e2q1',
          type: 'multiple-choice',
          question: 'Was war der Vorteil von Münzen gegenüber Silberbarren?',
          options: [
            'Sie waren schöner',
            'Sie waren leichter',
            'Garantiertes Gewicht durch königliches Siegel',
            'Sie bestanden aus Gold'
          ],
          correctAnswer: 'Garantiertes Gewicht durch königliches Siegel',
          explanation: 'Das königliche Siegel garantierte Gewicht und Reinheit - keine Waage mehr nötig!',
          difficulty: 'einfach',
          points: 5
        },
        {
          id: 'e2q2',
          type: 'sorting',
          question: 'Sortiere die Geldformen nach zeitlicher Reihenfolge (älteste zuerst):',
          options: ['Digitales Geld', 'Gerste', 'Münzen', 'Silberbarren'],
          correctAnswer: ['Gerste', 'Silberbarren', 'Münzen', 'Digitales Geld'],
          explanation: 'Die Entwicklung: Gerste (3000 v.u.Z.) → Silber (2500 v.u.Z.) → Münzen (640 v.u.Z.) → Digital (heute)',
          difficulty: 'einfach',
          points: 10
        },
        {
          id: 'e2q3',
          type: 'multiple-choice',
          question: 'Wie viel unseres heutigen Geldes ist digital?',
          options: ['30%', '50%', '70%', 'Über 90%'],
          correctAnswer: 'Über 90%',
          explanation: 'Über 90% unseres Geldes existiert nur als digitale Einträge in Computersystemen!',
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
      requiredScore: 30,
      content: `# Geld: Eine geistige Revolution

## Was ist intersubjektive Realität?

Harari unterscheidet drei Arten von Realität:

### 1. Objektive Realität
- Existiert unabhängig von uns
- Beispiel: Ein Stein, Schwerkraft
- Auch wenn alle Menschen verschwinden, existiert der Stein weiter

### 2. Subjektive Realität
- Existiert nur in deinem Kopf
- Beispiel: Deine Kopfschmerzen
- Niemand anders kann sie fühlen

### 3. Intersubjektive Realität ⭐
- Existiert im **gemeinsamen Bewusstsein** vieler Menschen
- Beispiel: **Geld**, Nationen, Gesetze, Menschenrechte
- Verschwindet, wenn alle aufhören daran zu glauben

## Das Vertrauensnetzwerk

Geld funktioniert durch ein komplexes Netzwerk:

Ich vertraue der Bäckerin
    ↓
Weil sie dem Schweizer Franken vertraut
    ↓
Weil die Bank dem Franken vertraut  
    ↓
Weil der Staat den Franken garantiert
    ↓
Weil wir alle dem Staat vertrauen

**Zirkel!** Aber funktioniert trotzdem!`,
      questions: [
        {
          id: 'm1q1',
          type: 'multiple-choice',
          question: 'Was ist "intersubjektive Realität" im Kontext des Geldes?',
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
        },
        {
          id: 'm1q2',
          type: 'text',
          question: 'Erkläre, warum der Übergang von Gerste zu Silber als "revolutionär" gilt.',
          correctAnswer: 'biologisch|kulturell|wert|essbar|nutzen|glauben',
          explanation: 'Gerste hatte biologischen Wert (essbar), Silber nicht. Menschen akzeptierten etwas ohne direkten Nutzen - rein durch kollektiven Glauben. Das war ein mentaler Durchbruch!',
          difficulty: 'mittel',
          points: 15
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
      requiredScore: 40,
      content: `# Die Ontologie und Epistemologie des Geldes

## Drei Ebenen der Realität (vertieft)

Hararis Kategorisierung basiert auf Searles "Construction of Social Reality":

### Objektive Fakten
- Existenz unabhängig vom Bewusstsein
- Beispiel: "Mount Everest ist 8849m hoch"
- Brute facts

### Subjektive Fakten
- Existenz nur im individuellen Bewusstsein
- Beispiel: "Ich habe Schmerzen"
- Nicht direkt überprüfbar

### Intersubjektive Fakten
- Existenz durch kollektiven Glauben
- Beispiel: "Dieser Schein ist 100 Fr. wert"
- Institutional facts (Searle)

## Das Vertrauensparadoxon

**Zirkuläre Kausalität:**

Ich glaube an Geld
→ Weil du daran glaubst
→ Weil sie daran glaubt
→ Weil alle daran glauben
→ Weil ich daran glaube

**Bootstrap-Problem:** Wie entsteht anfängliches Vertrauen?

**Antwort:** Historische Pfadabhängigkeit + institutionelle Verstärkung`,
      questions: [
        {
          id: 'a1q1',
          type: 'text',
          question: 'Erkläre den Unterschied zwischen objektiver, subjektiver und intersubjektiver Realität anhand eigener Beispiele.',
          correctAnswer: 'objektiv|subjektiv|intersubjektiv|kollektiv|bewusstsein|physisch|gemeinsam',
          explanation: 'Objektiv: existiert physisch unabhängig (Berg). Subjektiv: nur im eigenen Bewusstsein (Schmerz). Intersubjektiv: durch gemeinsamen Glauben (Geld, Gesetze).',
          difficulty: 'anspruchsvoll',
          points: 20
        },
        {
          id: 'a1q2',
          type: 'text',
          question: 'Was ist das "Bootstrap-Problem" des Geldes und wie wird es gelöst?',
          correctAnswer: 'vertrauen|anfang|staat|macht|historisch|institutionen',
          explanation: 'Das Bootstrap-Problem: Wie entsteht anfängliches Vertrauen in Geld? Lösung: Historische Tradition + staatliche Macht (Steuern müssen in Geld gezahlt werden) + Netzwerkeffekte.',
          difficulty: 'anspruchsvoll',
          points: 25
        }
      ]
    }
  ]
};
