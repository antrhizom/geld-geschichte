import { Question } from './learning';

export interface LearningConcept {
  id: string;
  title: string;
  coreContent: string; // Basis-Zusammenfassung (für alle)
  checkQuestions: Question[]; // Verständnis-Check
  
  // Vertiefungsebenen basierend auf Performance
  deepening: {
    easy: string; // Wenn schlecht abgeschnitten → einfachere Erklärung
    medium: string; // Wenn okay → mehr Details
    advanced: string; // Wenn gut → komplexere Analyse
  };
  
  // Zusätzliche Erklärungsformen
  alternativeExplanations: {
    narrative: string; // Storytelling-Ansatz
    visual: string; // Beschreibung für visuelle Lerner
    analytical: string; // Analytischer Zugang
  };
  
  examples: {
    simple: string[];
    complex: string[];
  };
  
  // Verbindungen zu anderen Konzepten
  prerequisites?: string[]; // Welche Konzepte sollten vorher verstanden sein
  followUp?: string[]; // Welche Konzepte bauen darauf auf
}

export interface AdaptivePath {
  currentConcept: string;
  performanceHistory: {
    conceptId: string;
    score: number;
    attempts: number;
    timeSpent: number;
    needsReview: boolean;
  }[];
  difficultyLevel: number; // 1-10, dynamisch angepasst
  learningStyle?: 'narrative' | 'visual' | 'analytical'; // Wird erkannt
}

// Die 7 Kernkonzepte aus Hararis Text
export const adaptiveConcepts: LearningConcept[] = [
  {
    id: 'c1',
    title: 'Was ist Geld? Die intersubjektive Realität',
    coreContent: `
# Was ist Geld wirklich?

Stell dir vor: Die spanischen Conquistadores treffen 1519 auf die Azteken. Die Spanier sind **besessen von Gold**. Die Azteken sind verwirrt – für sie ist Gold nur ein Material für Schmuck. Ihre echte Währung? **Kakaobohnen** und **Tuchballen**.

## Der Kern

Geld ist keine objektive Realität wie ein Stein oder ein Baum. **Geld existiert nur in unserer gemeinsamen Vorstellung.**

> "Sie leiden an einer Krankheit des Herzens, die nur mit Gold geheilt werden kann." - Hernán Cortés

**Kernfrage:** Warum akzeptieren wir ein Stück Papier als wertvoll?

**Antwort:** Weil alle anderen es auch tun. Das ist **intersubjektive Realität**.
    `,
    checkQuestions: [
      {
        id: 'c1q1',
        type: 'multiple-choice',
        question: 'Was ist der Hauptgrund, warum Geld funktioniert?',
        options: [
          'Weil es aus wertvollem Material besteht',
          'Weil der Staat es mit Gewalt durchsetzt',
          'Weil alle gemeinsam daran glauben',
          'Weil es praktisch zu transportieren ist'
        ],
        correctAnswer: 'Weil alle gemeinsam daran glauben',
        explanation: 'Geld ist eine intersubjektive Realität – es funktioniert nur durch kollektiven Glauben.',
        difficulty: 'einfach',
        points: 10
      },
      {
        id: 'c1q2',
        type: 'slider',
        question: 'Wie stark stimmst du dieser Aussage zu?',
        prompt: '"Geld ist wichtiger als Religion, weil es Menschen über kulturelle Grenzen hinweg vereint."',
        min: 1,
        max: 10,
        labels: {
          min: 'Stimme überhaupt nicht zu',
          max: 'Stimme völlig zu'
        },
        correctAnswer: 5, // Mittlerer Bereich akzeptabel
        explanation: 'Diese Frage hat keine eindeutig "richtige" Antwort - sie regt zum Nachdenken über Hararis These an.',
        difficulty: 'mittel',
        points: 10
      },
      {
        id: 'c1q3',
        type: 'comparison',
        question: 'Bewerte diese Aussagen über Geld:',
        comparisons: [
          {
            id: 'comp1',
            statement: 'Gold hat objektiven Wert',
            options: ['Stimme zu', 'Neutral', 'Stimme nicht zu']
          },
          {
            id: 'comp2',
            statement: 'Papiergeld ist wertvoller als digitales Geld',
            options: ['Stimme zu', 'Neutral', 'Stimme nicht zu']
          },
          {
            id: 'comp3',
            statement: 'Geld existiert nur in unseren Köpfen',
            options: ['Stimme zu', 'Neutral', 'Stimme nicht zu']
          }
        ],
        correctAnswer: {
          comp1: 'Stimme nicht zu',
          comp2: 'Stimme nicht zu',
          comp3: 'Stimme zu'
        },
        explanation: 'Gold hat keinen objektiven Wert (nur kulturell zugeschrieben). Digitales Geld ist funktional überlegen. Geld ist intersubjektiv - existiert nur durch kollektiven Glauben.',
        difficulty: 'mittel',
        points: 15
      }
    ],
    deepening: {
      easy: `
## Geld in einfachen Worten

Denk an Monopoly-Geld. Während des Spiels ist es wertvoll – alle akzeptieren es. Nach dem Spiel? Wertlos.

**Echtes Geld funktioniert genauso**, nur dass das "Spiel" nie endet und alle Menschen mitspielen.

### Drei Arten von Realität:

1. **Objektiv**: Ein Stein existiert, ob du dran glaubst oder nicht
2. **Subjektiv**: Dein Kopfschmerz existiert nur für dich
3. **Intersubjektiv**: Geld existiert, weil wir alle dran glauben

**Beispiel:** 
- Du gehst zum Bäcker
- Gibst Papier (Geldschein)
- Bekommst Brot
- Warum? Weil der Bäcker **glaubt**, dass andere dieses Papier auch akzeptieren
      `,
      medium: `
## Die Psychologie des Geldes

Geld ist ein **kollektives Vertrauenssystem**. Drei Ebenen:

### 1. Individuelles Vertrauen
Ich vertraue, dass mein 100-Fr.-Schein morgen noch 100 Fr. wert ist.

### 2. Soziales Vertrauen  
Ich vertraue, dass andere Menschen diesen Schein akzeptieren.

### 3. Institutionelles Vertrauen
Ich vertraue, dass die Schweizerische Nationalbank diesen Schein garantiert.

**Historisches Beispiel:**
Während der Hyperinflation in Deutschland (1923) verlor Geld täglich an Wert. Menschen **verloren das Vertrauen** → Das Geld wurde wertlos, obwohl die physischen Scheine noch existierten.

**Frage zum Nachdenken:** Was passiert mit deinem Geld, wenn alle gleichzeitig aufhören daran zu glauben?
      `,
      advanced: `
## Intersubjektivität: Philosophische Tiefe

Harari baut auf **Searle's Theorie der sozialen Konstruktion**:

### Ontologische Ebenen:

**Objektive Fakten**: "Dieser Stein wiegt 2 kg"
**Subjektive Fakten**: "Ich habe Kopfschmerzen"  
**Intersubjektive Fakten**: "Dieser Schein ist 100 Fr. wert"

### Das Paradox

Geld ist **real in seinen Konsequenzen** (du kannst damit Brot kaufen), aber **fiktiv in seiner Grundlage** (basiert nur auf Glauben).

**Vergleich zu Religion:**
- Religion: Kollektiver Glaube an Gott(heiten)
- Geld: Kollektiver Glaube an Wert
- **Beide** sind intersubjektiv, beide **formen Realität**

**Kritische Frage:** Wenn Geld nur eine Fiktion ist, warum dominiert es unser Leben mehr als nachweisbare Fakten?

**Antwort:** Weil intersubjektive Realitäten **funktional real** sind – sie koordinieren menschliches Verhalten effektiver als objektive Fakten.
      `
    },
    alternativeExplanations: {
      narrative: `
## Die Geschichte von Maria und dem Brot

Maria ist Bäckerin. Jeden Morgen backt sie frische Brötchen. Thomas ist Schreiner. Er baut Tische.

**Ohne Geld:**
- Maria will einen Tisch
- Thomas will Brot
- Aber: Thomas braucht JETZT keinen Tisch
- Maria kann nicht warten

**Problem:** Wie tauschen sie?

**Mit Geld:**
- Maria verkauft Brot an Lisa (bekommt Geld)
- Maria kauft Tisch von Thomas (gibt Geld)
- Thomas kauft später Brot von Maria (gibt Geld zurück)

**Das Wunder:** Das Geld ist nur Papier. Aber alle drei **glauben** daran, dass andere es auch akzeptieren.

**Warum funktioniert es?**
Weil Maria glaubt, dass Thomas glaubt, dass Lisa glaubt... (usw.)

Es ist wie ein Gesellschaftsvertrag, den niemand unterschrieben hat, aber alle einhalten.
      `,
      visual: `
## Visualisiere Geld als Netzwerk

Stell dir vor:

\`\`\`
         [DU]
          |
    [Geldschein]
       /  |  \\
      /   |   \\
   [Bäcker][Bank][Chef]
     /       |       \\
  [Farmer][Staat][Kollegen]
\`\`\`

**Jede Linie** ist Vertrauen. Wenn eine Linie bricht → lokales Problem. Wenn ALLE Linien brechen → Systemzusammenbruch.

### Das Vertrauensnetz:

🟢 **Starkes Vertrauen** → Schweizer Franken (stabil seit 1850)
🟡 **Mittleres Vertrauen** → Türkische Lira (Inflation)
🔴 **Gebrochenes Vertrauen** → Zimbabwe Dollar (Hyperinflation, 2008)

**Visualisierung der Hyperinflation:**
- 2008: 1 Brot = 1 Dollar
- Einen Monat später: 1 Brot = 1.000 Dollar
- Wieder einen Monat: 1 Brot = 1.000.000 Dollar

Das Brot hat sich nicht verändert. Das Vertrauen ist kollabiert.
      `,
      analytical: `
## Formale Analyse der Geldontologie

### Definition (formalisiert):

**Geld G** ist ein Medium M, das folgende Funktionen F erfüllt:

1. **Tauschmittel**: F₁(G) = Universal exchange
2. **Wertaufbewahrung**: F₂(G) = Store of value
3. **Recheneinheit**: F₃(G) = Unit of account

### Notwendige Bedingungen:

Damit G funktioniert, braucht es:

**B₁**: Kollektive Akzeptanz (∀x ∈ Gesellschaft: akzeptiert(x, G))
**B₂**: Vertrauen in Stabilität (E[Wert(G, t+1)] ≈ Wert(G, t))
**B₃**: Institutionelle Garantie (∃ Institution I: garantiert(I, G))

### Das Bootstrapping-Problem:

Warum glaubt Person A an Geld?
→ Weil Person B daran glaubt

Warum glaubt Person B?
→ Weil Person A daran glaubt

**Zirkuläre Kausalität**, aber **funktional stabil** durch:
- Netzwerkeffekte (je mehr glauben, desto nützlicher)
- Institutionelle Verstärkung (Staat erzwingt Akzeptanz für Steuern)
- Historische Pfadabhängigkeit (Tradition)

### Vergleich: Geld vs. Gold

| Eigenschaft | Gold | Geld |
|-------------|------|------|
| Intrinsischer Wert | Ja (Material) | Nein |
| Kollektiver Glaube | Ja (Tradition) | Ja (Konvention) |
| Staatliche Garantie | Nein | Ja |
| Funktionalität | Niedrig | Hoch |

**Fazit:** Geld ist **funktional überlegen** trotz fehlenden intrinsischen Werts.
      `
    },
    examples: {
      simple: [
        "Monopoly-Geld funktioniert während des Spiels",
        "Kinder tauschen Sammelkarten nach erfundenen Werten",
        "In Gefängnissen werden Zigaretten zur Währung"
      ],
      complex: [
        "Bitcoin: Geld ohne staatliche Garantie, nur durch Netzwerkeffekt",
        "Historische Hyperinflationen als Vertrauenskollaps",
        "Der Goldstandard und seine Aufgabe 1971",
        "Regionale Währungen (Chiemgauer) als soziales Experiment"
      ]
    },
    followUp: ['c2']
  },
  
  {
    id: 'c2',
    title: 'Evolution: Von Gerste zu Bits',
    coreContent: `
# Die Geschichte des Geldes in 5000 Jahren

## Timeline:

**3000 v.u.Z. - Sumer**: Gerste als erstes Geld
- 1 Sila = 1 Liter Gerste
- Mann verdient 60 Silas/Monat
- Frau verdient 30 Silas/Monat

**2500 v.u.Z. - Mesopotamien**: Silberschekel
- 1 Schekel = 8,33 Gramm Silber
- **Kritischer Sprung**: Kein Nahrungswert!

**640 v.u.Z. - Lydien**: Erste Münzen
- Garantiertes Gewicht
- Königliches Siegel

**Heute**: 90%+ digital
- Nur Bits in Computern
- Keine physische Form

## Die Frage: Wie akzeptierten Menschen etwas Nutzloses (Silber) als Geld?

**Antwort:** Durch kollektives Vertrauen + staatliche Macht.
    `,
    checkQuestions: [
      {
        id: 'c2q1',
        type: 'card-sorting',
        question: 'Ordne diese Geldformen ihren Hauptmerkmalen zu:',
        items: [
          'Hat biologischen Wert',
          'Muss gewogen werden',
          'Garantiertes Gewicht durch Siegel',
          'Kann verderben',
          'Instant-Transfer möglich',
          'Benötigt keine Technologie'
        ],
        categories: ['Gerste', 'Silberbarren', 'Münzen', 'Digitales Geld'],
        correctAnswer: {
          'Gerste': ['Hat biologischen Wert', 'Kann verderben', 'Benötigt keine Technologie'],
          'Silberbarren': ['Muss gewogen werden'],
          'Münzen': ['Garantiertes Gewicht durch Siegel'],
          'Digitales Geld': ['Instant-Transfer möglich']
        },
        explanation: 'Jede Geldform hat spezifische Vor- und Nachteile, die ihre Verwendung prägen.',
        difficulty: 'mittel',
        points: 15
      },
      {
        id: 'c2q2',
        type: 'text',
        question: 'Warum war der Übergang von Gerste zu Silber ein "kritischer Sprung" in der menschlichen Geschichte?',
        correctAnswer: 'wert|nutzen|essen|biologisch|kulturell|akzeptanz|glauben|intrinsisch',
        explanation: 'Silber hat keinen biologischen Nutzen (nicht essbar), trotzdem wurde es akzeptiert – reiner kultureller Wert. Menschen lernten, an etwas Nutzloses zu glauben, nur weil andere es auch taten.',
        difficulty: 'anspruchsvoll',
        points: 20
      }
    ],
    deepening: {
      easy: `
## Die Geld-Evolution einfach erklärt

### Stufe 1: Tauschhandel
Du: Hast Äpfel 🍎
Ich: Habe Schuhe 👞
Problem: Ich will keine Äpfel!

### Stufe 2: Ware als Geld (Gerste)
Du: Gibst mir Gerste
Ich: Gebe dir Schuhe
Vorteil: Jeder braucht Gerste!
Problem: Schwer zu transportieren

### Stufe 3: Metall als Geld (Silber)
Leichter zu tragen, aber: Warum akzeptieren wir es?
**Weil andere es auch tun!**

### Stufe 4: Münzen
Noch besser: Garantiertes Gewicht durch König

### Stufe 5: Papiergeld
Noch leichter!

### Stufe 6: Digitales Geld
Nur noch Zahlen im Computer
      `,
      medium: `
## Der Übergang von materiellem zu abstraktem Wert

### Warum akzeptierte man Silber?

**Psychologische Faktoren:**
1. **Seltenheit** → Schwer zu bekommen = wertvoll
2. **Haltbarkeit** → Verrottet nicht
3. **Teilbarkeit** → Kann in Stücke geteilt werden
4. **Erkennbarkeit** → Einzigartiges Aussehen

**Aber der Hauptgrund:** Tradition + staatliche Macht

### Das Vertrauensnetzwerk wächst:

\`\`\`
Gerste → Lokales Vertrauen (biologischer Wert)
   ↓
Silber → Regionales Vertrauen (kultureller Wert)
   ↓
Münzen → Imperiales Vertrauen (politischer Wert)
   ↓
Papier → Nationales Vertrauen (institutioneller Wert)
   ↓
Digital → Globales Vertrauen (systemischer Wert)
\`\`\`

**Jeder Schritt** löst sich mehr von physischem Wert!
      `,
      advanced: `
## Die Abstraktion des Werts: Philosophische Analyse

### These: Geld wird zunehmend "entkörperlicht"

**Hegel'sche Dialektik:**

**These**: Materieller Wert (Gerste - essbar)
**Antithese**: Symbolischer Wert (Silber - nicht essbar)
**Synthese**: Abstrakter Wert (Münze - Zeichen)

### Semiotische Entwicklung:

1. **Gerste**: Zeichen = Bezeichnetes (Geld ist Nahrung)
2. **Silber**: Zeichen ≠ Bezeichnetes (Geld repräsentiert Wert)
3. **Münze**: Zeichen mit Garantie (Staat versichert Wert)
4. **Digital**: Reines Zeichen (nur Information)

### Das Paradox der Dematerialisierung:

**Je abstrakter das Geld, desto mächtiger wird es.**

Warum?
- Leichter zu übertragen
- Schnellere Transaktionen
- Größere Reichweite

**Aber auch:**
- Anfälliger für Vertrauenskrisen
- Abhängiger von Institutionen
- Distanzierter von physischer Realität

### Die digitale Revolution:

90%+ des Geldes existiert nur als Bits. Was bedeutet das?

**Baudrillard's Simulation**: Geld ist zur "Hyperrealität" geworden – ein Zeichen, das auf kein Original mehr verweist.
      `
    },
    alternativeExplanations: {
      narrative: `
## Die Reise eines Händlers (2500 v.u.Z.)

Rashid ist Gewürzhändler in Ur (Sumer). Er will Zimt nach Babylon verkaufen.

**Mit Gerste (alt):**
- Muss 50 Säcke Gerste mitnehmen
- Esel nötig
- Lange Reise (3 Tage)
- Gerste kann verderben

**Mit Silber (neu):**
- 10 Silberschekel in Tasche
- Zu Fuß möglich
- Schnelle Reise (1 Tag)
- Silber verdirbt nicht

**In Babylon:**
Rashid will Zimt kaufen. Verkäufer sagt: "Ich nehme kein Silber!"

**Problem!** Aber: Der König von Babylon akzeptiert Silber für Steuern.
→ Jeder will Silber (um Steuern zu zahlen)
→ Verkäufer akzeptiert Silber doch

**Die Lektion:** Staatsmacht schafft Akzeptanz.
      `,
      visual: `
## Visualisiere die Geld-Evolution

### Diagramm: Wert vs. Abstraktion

\`\`\`
Abstraktionslevel
      ↑
   10 |              [Digital]
    9 |          [Papiergeld]
    8 |        [Münzen]
    5 |    [Silber]
    2 | [Gerste]
    0 |________________________→ Zeit
        3000 v.u.Z.    →   Heute
\`\`\`

### Trade-offs:

**Gerste** 🌾
- ✅ Jeder versteht den Wert
- ✅ Intrinsischer Nutzen
- ❌ Schwer zu transportieren
- ❌ Verderblich

**Silber** ⚪
- ✅ Leicht zu transportieren
- ✅ Haltbar
- ❌ Kein direkter Nutzen
- ❌ Muss gewogen werden

**Münzen** 🪙
- ✅ Standardisiert
- ✅ Staatliche Garantie
- ✅ Keine Waage nötig
- ❌ Immer noch schwer (bei großen Summen)

**Digital** 💻
- ✅ Instant-Transfer
- ✅ Unbegrenzte Menge
- ✅ Kein physischer Transport
- ❌ Kann "verschwinden" (Hack, Crash)
- ❌ Abhängig von Technologie
      `,
      analytical: `
## Formale Analyse der monetären Evolution

### Modell: Transaktionskosten-Minimierung

**Transaktionskosten T** einer Währung W:

T(W) = T_transport(W) + T_verification(W) + T_storage(W) + T_trust(W)

### Evolution als Optimierung:

**Gerste:**
- T_transport: HOCH (schwer, voluminös)
- T_verification: NIEDRIG (kann probieren)
- T_storage: MITTEL (braucht Lager)
- T_trust: NIEDRIG (intrinsischer Wert)
- **Gesamt: HOCH**

**Silber:**
- T_transport: NIEDRIG (kompakt)
- T_verification: HOCH (muss wiegen/testen)
- T_storage: NIEDRIG (platzsparend)
- T_trust: MITTEL (kulturell akzeptiert)
- **Gesamt: MITTEL**

**Münzen:**
- T_transport: NIEDRIG
- T_verification: SEHR NIEDRIG (Siegel garantiert)
- T_storage: NIEDRIG
- T_trust: NIEDRIG (staatliche Garantie)
- **Gesamt: NIEDRIG**

**Digital:**
- T_transport: ~0 (instant)
- T_verification: ~0 (automatisch)
- T_storage: ~0 (virtuel)
- T_trust: VARIABEL (abhängig von System)
- **Gesamt: ~0 (optimal)**

### Das Vertrauensparadox:

Je niedriger die anderen Kosten, desto wichtiger wird **Vertrauen**.

**Gleichung:**
\`\`\`
Akzeptanz(W) = f(Effizienz(W), Vertrauen(W))

Wenn Effizienz → max, dann Akzeptanz → abhängig von Vertrauen
\`\`\`

**Konsequenz:** Moderne Währungen sind **extrem effizient** aber **extrem anfällig** für Vertrauenskrisen.

**Beispiele:**
- 2008: Finanzkrise → Vertrauensverlust in Bankensystem
- 2013: Zypern-Krise → Bank-Run
- 2023: SVB-Kollaps → Instant bank run (digital beschleunigt)
      `
    },
    examples: {
      simple: [
        "Von schweren Münzen zu leichten Karten in deiner Tasche",
        "Früher: Goldbarren im Tresor. Heute: PIN-Code im Kopf"
      ],
      complex: [
        "Der Goldstandard (1870-1971): Papiergeld war gegen Gold einlösbar",
        "Bretton Woods (1944): Dollar an Gold gekoppelt, andere Währungen an Dollar",
        "Nixon-Schock (1971): Ende der Golddeckung → Fiat-Geld",
        "Kryptowährungen (2009-heute): Algorithmisches Geld ohne Staat"
      ]
    },
    prerequisites: ['c1'],
    followUp: ['c3']
  },

  {
    id: 'c3',
    title: 'Globalisierung durch Geld',
    coreContent: `
# Wie Geld die Welt vereinte

## Die Geschichte:

**1519:** Spanier erobern Mexiko/Peru
→ Finden massive Goldvorkommen
→ Bringen Gold nach Europa
→ Europäer kaufen Seide/Porzellan in China
→ Gold fließt nach Asien

**Hararis Beobachtung:**
> "Das Gold und Silber aus den Bergwerken Mexikos und Perus zerrann den Europäern zwischen den Fingern und landete in den Schatullen der dankbaren chinesischen Seiden- und Porzellanhändler."

## Die Frage: Warum akzeptierten Chinesen europäisches Gold?

**Antwort:** Preiskonvergenz durch Handel.

## Das Prinzip:

Wenn zwei Regionen handeln, gleichen sich die Preise an:
- Gold billig in Region A, teuer in Region B
- Händler kaufen in A, verkaufen in B
- Preis steigt in A, sinkt in B
- → Angleichung!

**Resultat:** Globale Währungsordnung entsteht.
    `,
    checkQuestions: [
      {
        id: 'c3q1',
        type: 'multiple-choice',
        question: 'Was beweist der Goldfluss von Amerika über Europa nach China?',
        options: [
          'Gold war in China wertvoller',
          'Chinesen waren gieriger als Europäer',
          'Geld ermöglicht globalen Handel über Kulturgrenzen',
          'Europa hatte zu viel Gold'
        ],
        correctAnswer: 'Geld ermöglicht globalen Handel über Kulturgrenzen',
        explanation: 'Trotz unterschiedlicher Kulturen akzeptierten alle Gold – Geld als universelle Sprache.',
        difficulty: 'mittel',
        points: 15
      }
    ],
    deepening: {
      easy: `
## Globaler Handel: Eine Geschichte

Stell dir vor:
- Pedro in Peru findet Gold
- Verkauft es an spanische Conquistadores
- Spanier bringen Gold nach Spanien
- Spanische Händler kaufen chinesische Seide
- Chinesen nehmen Gold
- Chinesische Händler kaufen indische Gewürze
- Das Gold reist weiter...

**Alle akzeptieren Gold** → Weltweiter Handel möglich!

**Ohne gemeinsames Geld:**
- Spanier hätten direkt Waren aus Peru nach China bringen müssen
- Aber: Chinesen wollten keine peruanischen Waren
- → Handel unmöglich

**Mit Geld:** Alle können mit allen handeln!
      `,
      medium: `
## Die ökonomische Theorie der Preiskonvergenz

### Warum gleichen sich Preise an?

**Ausgangssituation:**
- Gold in Indien: 10 Rupien/Gramm
- Gold im Mittelmeer: 50 Denare/Gramm
- Wechselkurs: 1 Denar = 2 Rupien

**Arbitrage-Chance!**
1. Kaufe Gold in Indien für 10 Rupien (= 5 Denare)
2. Verkaufe im Mittelmeer für 50 Denare
3. Gewinn: 45 Denare!

**Was passiert:**
- Viele Händler machen das
- Nachfrage in Indien steigt → Preis steigt
- Angebot im Mittelmeer steigt → Preis sinkt
- → Preise gleichen sich an

**Endstation:** Gold kostet überall ~gleich viel.

### Die drei Einiger der Menschheit (Harari):

1. **Geld** → Wirtschaftliche Integration
2. **Imperien** → Politische Integration
3. **Religion** → Ideologische Integration

**Geld ist am stärksten**, weil:
- Funktioniert über Feindschaften hinweg
- Braucht keine gemeinsame Sprache
- Keine Gewalt nötig (meistens)
      `,
      advanced: `
## Globalisierung als monetäres Phänomen

### These: Geld ist der primäre Globalisierungstreiber

**Argument:**

Imperien vereinen durch Gewalt → Erzeugt Widerstand
Religionen vereinen durch Ideologie → Erzeugt Konflikte
**Geld vereint durch Eigeninteresse** → Selbstverstärkend

### Das Netzwerkmodell:

Metcalfe's Law für Währungen:
**Wert eines Währungsnetzwerks ~ n²**

Je mehr Teilnehmer, desto wertvoller für jeden einzelnen.

**Konkret:**
- 10 Menschen nutzen Schweizer Franken: 45 mögliche Transaktionen
- 1000 Menschen: 499.500 Transaktionen
- → Exponentielles Wachstum!

### Historische Phasen:

**Phase 1: Regionale Währungszonen (bis 1500)**
- Mittelmeer, Indien, China getrennt
- Aber: Gold/Silber als Brücke

**Phase 2: Erste Globalisierung (1500-1914)**
- Kolumbianischer Austausch
- Goldstandard (1870)
- Erste echte Weltwirtschaft

**Phase 3: Bretton Woods (1944-1971)**
- Dollar als Weltreservewährung
- Gold-Backed System

**Phase 4: Fiat-Globalisierung (1971-heute)**
- Floating currencies
- Digitaler Kapitalfluss
- Hyperglobalisierung

**Phase 5: Digital-Globalisierung (?-heute)**
- Kryptowährungen
- CBDCs
- Potenzielle Eine-Welt-Währung?

### Die dunkle Seite:

**Währung als Macht:**
- USA nutzt Dollar-Dominanz für Sanktionen
- IMF/Weltbank erzwingen Strukturanpassung
- "Währungskriege" (competitive devaluation)

**Frage:** Ist globale Währungsintegration Frieden oder Hegemonie?
      `
    },
    alternativeExplanations: {
      narrative: `
## Die Reise einer Goldmünze (1550)

**Akt 1: Peru**
Ein Inkaarbeiter schürft Gold in Potosí. Spanische Aufseher nehmen es. Er bekommt... nichts.

**Akt 2: Sevilla, Spanien**
Das Gold wird zu Münzen geprägt. Don Fernando, ein Händler, kauft damit einen Anteil an einem Schiff.

**Akt 3: Lissabon**
Das Schiff segelt nach Indien. Fernando kauft Gewürze.

**Akt 4: Venedig**
Die Gewürze werden verkauft. Ein venezianischer Händler kauft sie mit... Gold!

**Akt 5: Istanbul**
Der Venezianer kauft persische Teppiche. Bezahlt mit Gold.

**Akt 6: Peking**
Ein chinesischer Händler kauft die Teppiche. Bezahlt mit... Gold! Ja, dasselbe Gold aus Peru!

**Die Moral:** Gold reist um die Welt. Alle akzeptieren es. Warum? Weil alle wissen, dass alle anderen es akzeptieren.
      `,
      visual: `
## Visualisiere den globalen Geldfluss

### Karte: Goldflüsse 16.-17. Jahrhundert

\`\`\`
AMERIKA            EUROPA           ASIEN
 [Peru] ══════► [Spanien] ══════► [China]
  Gold             Gold             Gold
    ↓               ↓                ↓
 (Mine)         (Handel)        (Endstation)
    ↓               ↓                ↓
   10t            10t → 8t          8t
                    ↓
                  (2t bleiben)
\`\`\`

### Warum floss Gold nach Osten?

**Handelsbilanz:**
Europa importierte:
- ✅ Seide
- ✅ Porzellan  
- ✅ Gewürze
- ✅ Tee

Europa exportierte:
- ❌ ... wenig, was Asien wollte

**Ergebnis:** Gold als Ausgleich!

### Das Netzwerk:

\`\`\`
        [Gold]
       /  |  \\
      /   |   \\
[Amerika][Europa][Asien]
     \\    |    /
      \\   |   /
       [Handel]
\`\`\`

Alle Knoten verbunden durch **Glaube an Gold**.
      `,
      analytical: `
## Formale Handelstheorie und Währungsintegration

### Modell: Globale Währungsordnung

**Definition:**
Eine globale Währungsordnung G existiert, wenn:

∀ Länder A, B: akzeptiert(A, Währung_B) ∨ ∃ Währung_universal

### Ricardo's Komparativer Vorteil:

**Ohne Geld:**
Tausch nur bei **doppelter Koinzidenz der Bedürfnisse**

**Mit Geld:**
\`\`\`
Land A: produziert Wein
Land B: produziert Tuch
Gemeinsame Währung C: Vermittelt
\`\`\`

A verkauft Wein für C
B verkauft Tuch für C
→ Beide profitieren

### Das Gravitationsmodell des Handels:

\`\`\`
Handel(A,B) ~ (GDP_A × GDP_B) / Distanz(A,B) × Währungskosten(A,B)
\`\`\`

**Währungskosten** beinhalten:
- Wechselkurs-Risiko
- Transaktionskosten
- Informationsasymmetrien

**Mit gemeinsamer Währung:** Währungskosten → 0

### Historische Daten:

**Handelsvolumen (Index):**
- 1500 (regional): 100
- 1600 (frühe Globalisierung): 300
- 1700 (Silber-Standard): 600
- 1870 (Gold-Standard): 2000
- 1914 (Höhepunkt): 3500
- 1945 (nach Krieg): 1000
- 2000 (Hyperglobalisierung): 15000

**Korrelation:** Stärke der Währungsintegration ↔ Handelsvolumen: r = 0.87

### Die optimale Währungszone (Mundell, 1961):

**Kriterien:**
1. Arbeitsmobilität
2. Kapitalmobilität
3. Ähnliche Wirtschaftsstruktur
4. Fiskalische Integration

**Problem:** Welt erfüllt diese NICHT → Keine optimale Weltwährung

**Aber:** Historisch setzte sich Gold durch trotz suboptimaler Bedingungen.

**Warum?** Netzwerkeffekte > Optimalitätskriterien
      `
    },
    examples: {
      simple: [
        "Dollar heute: Akzeptiert in 195 Ländern",
        "Du kannst mit Visa-Karte fast überall bezahlen"
      ],
      complex: [
        "Petroldollar-System: Öl wird in Dollar gehandelt → globale Dollar-Nachfrage",
        "SDRs (IMF): Versuch einer Super-Währung",
        "Yuan-Internationalisierung: Chinas Versuch, Dollar zu verdrängen",
        "Bitcoin als 'staatenloses' globales Geld"
      ]
    },
    prerequisites: ['c1', 'c2'],
    followUp: ['c4']
  },

  {
    id: 'c4',
    title: 'Die Dialektik: Geld vs. Gemeinschaft',
    coreContent: `
# Der Preis des Geldes

## Hararis Kernthese:

Geld hat **zwei Seiten**:

### ✅ Die gute Seite:
- Ermöglicht Handel über Grenzen
- Effizient
- Verbindet Fremde

### ❌ Die dunkle Seite:
- Macht alles käuflich
- Zerstört Gemeinschaften
- Untergräbt Werte

## Die Dämme-Metapher:

> "Mit der einen Hand reißen wir die gemeinschaftlichen Dämme ein, die den freien Fluss des Geldes zurückgehalten haben. Und mit der anderen bauen wir neue auf."

**Bedeutung:**
- Geld = Wasser (fließt, sucht Ritzen)
- Traditionen/Gesetze = Dämme (halten zurück)
- Geschichte = Ständiger Kampf zwischen beiden

## Beispiele:

**Mittelalter:** Kirche verkauft Ablass
→ Religion wird käuflich
→ Luther protestiert
→ Reformation

**Heute:** Organe verkaufen?
→ Meiste Länder verbieten es
→ "Damm" gegen Kommerzialisierung
    `,
    checkQuestions: [
      {
        id: 'c4q1',
        type: 'multiple-choice',
        question: 'Was meint Harari mit der "Dämme-Metapher"?',
        options: [
          'Geld fließt wie Wasser und Gesetze sind wie Dämme',
          'Gesellschaften müssen Flüsse kontrollieren',
          'Dämme sind schlecht für die Wirtschaft',
          'Wir sollten alle Dämme entfernen'
        ],
        correctAnswer: 'Geld fließt wie Wasser und Gesetze sind wie Dämme',
        explanation: 'Geld sucht sich Wege (wie Wasser), Gesellschaften bauen Regeln (Dämme) zum Schutz ihrer Werte.',
        difficulty: 'mittel',
        points: 15
      },
      {
        id: 'c4q2',
        type: 'text',
        question: 'Nenne ein Beispiel für einen modernen "Damm" gegen die Macht des Geldes.',
        correctAnswer: 'organ|mindestlohn|kinderarbeit|verbot|gesetz|schutz',
        explanation: 'Beispiele: Organhandelsverbot, Mindestlohn, Verbot von Kinderarbeit – alles Grenzen gegen pure Marktlogik.',
        difficulty: 'anspruchsvoll',
        points: 20
      }
    ],
    deepening: {
      easy: `
## Geld: Freund oder Feind?

### Die guten Dinge 😊

**1. Du kannst mit jedem handeln**
- Musst den Bäcker nicht persönlich kennen
- Er muss nicht das wollen, was du anbietest

**2. Es ist effizient**
- Schnelle Transaktionen
- Kein kompliziertes Tauschen

**3. Es verbindet die Welt**
- Menschen in verschiedenen Ländern können zusammenarbeiten

### Die schlechten Dinge 😟

**1. Alles wird kaufbar**
- Freundschaft gegen Geld?
- Liebe gegen Geld?
- Wo ist die Grenze?

**2. Gemeinschaften leiden**
- Früher: Nachbarn helfen sich
- Heute: "Was kostet das?"

**3. Werte verschwinden**
- Nicht alles sollte einen Preis haben
- Aber Geld macht alles zur Ware

### Die Balance:

Wir brauchen **beides**:
- Geld für Effizienz
- Regeln zum Schutz wichtiger Werte
      `,
      medium: `
## Karl Polanyi: Die große Transformation

### These: Märkte müssen eingebettet sein

**Vorindustrielle Gesellschaft:**
- Wirtschaft eingebettet in Sozialstruktur
- Tausch folgt sozialen Regeln
- Geld spielt begrenzte Rolle

**Industrielle Revolution:**
- Wirtschaft wird "entbettet"
- Marktlogik dominiert alles
- **Auch Arbeit und Land werden zur Ware**

**Problem:** Menschen und Natur sind KEINE Waren!

### Polanyis Warnung:

> Ein freier Markt ohne soziale Einbettung zerstört die Gesellschaft.

### Historische Zyklen:

**1. Liberalisierung** (1800-1930)
- Freie Märkte
- Wenig Regulierung
→ Ausbeutung, Krisen

**2. Gegenbewegung** (1930-1980)
- Sozialstaat
- Arbeitnehmerrechte
→ Soziale Sicherheit

**3. Neo-Liberalisierung** (1980-2008)
- Deregulierung
- Globalisierung
→ Ungleichheit, Finanzkrise

**4. Neue Gegenbewegung?** (2008-heute)
- Rufe nach Regulierung
- Umweltschutz
- Soziale Gerechtigkeit

**Hararis Punkt:** Dieser Zyklus ist endlos.
      `,
      advanced: `
## Normative Politische Ökonomie: Was darf käuflich sein?

### Michael Sandel: "What Money Can't Buy"

**Zentrale Frage:** Gibt es moralische Grenzen des Marktes?

### Sandels Argument:

Jede Kommodifizierung **verändert** die Sache selbst.

**Beispiel Blutspendesystem:**

**Studie (Titmuss, 1970):**
- UK: Freiwillige Blutspende
- USA: Bezahlte Blutspende

**Resultat:**
- UK: Mehr Spender, höhere Qualität
- USA: Weniger Spender, niedrigere Qualität

**Warum?** Geld **verdrängt** intrinsische Motivation (Altruismus).

### Vier Kategorien des "Unbezahlbaren":

**1. Korruption**
Beispiel: Richter bestechen
→ Zerstört Gerechtigkeit selbst

**2. Ungleichheit**
Beispiel: Organverkauf nur von Armen
→ Verstärkt soziale Ungerechtigkeit

**3. Degradierung**
Beispiel: Menschen als Ware
→ Verletzt Menschenwürde

**4. Verdrängungseffekte**
Beispiel: Bezahlte Freundschaft
→ Zerstört echte Beziehungen

### Hararis Position:

Kein **objektives** Kriterium, was käuflich sein darf.

**Aber:** Jede Gesellschaft muss diese Grenzen **aktiv verteidigen**.

### Konkrete Fälle:

**A. Leihmutterschaft**
- Pro: Hilft unfruchtbaren Paaren
- Contra: Kommodifiziert Fortpflanzung
- Status: Unterschiedlich je nach Land

**B. CO2-Emissionen**
- Pro: Effiziente Allokation
- Contra: "Lizenz zum Verschmutzen"?
- Status: Emissionshandel existiert, bleibt umstritten

**C. Niere-verkauf**
- Pro: Hilft Patienten, hilft Armen (Geld)
- Contra: Ausbeutung, Ungleichheit
- Status: Fast überall verboten

**D. Aufmerksamkeit (Social Media)**
- Pro: Finanziert kostenlose Dienste
- Contra: Sucht, Manipulation
- Status: Weitgehend unreguliert

### Philosophische Schulen:

**Libertarismus:** Alles sollte handelbar sein (Nozick)
**Kommunitarismus:** Gemeinschaft vor Markt (Sandel, MacIntyre)
**Rawls'sche Liberale:** Grundgüter nicht handelbar
**Marxisten:** Kapital selbst ist das Problem

**Hararis Position:** Pragmatisch-historisch
→ Keine perfekte Lösung, nur ständige Aushandlung
      `
    },
    alternativeExplanations: {
      narrative: `
## Die Geschichte zweier Dörfer

**Dorf A: "Marktdorf"**
- Alles wird mit Geld gemacht
- Nachbar hilft dir → Du bezahlst ihn
- Kind passt auf Baby auf → Bekommt Geld
- Oma braucht Hilfe → Muss Pflegedienst bezahlen

**Resultat:**
- ✅ Effizient
- ✅ Klar (wer schuldet wem was)
- ❌ Keine echten Beziehungen
- ❌ Arme Menschen isoliert

**Dorf B: "Gemeinschaftsdorf"**
- Nichts kostet Geld intern
- Nachbar hilft dir → Du hilfst ihm später
- Teenager passen auf Kinder auf → Weil man sich kennt
- Oma wird von allen versorgt

**Resultat:**
- ✅ Starke Gemeinschaft
- ✅ Soziale Sicherheit
- ❌ Ineffizient
- ❌ Unklare Verpflichtungen
- ❌ Kann keine Fremden integrieren

**Die Realität:** Wir brauchen **beides**!

**Moderne Lösung:**
- Markt für Fremde
- Gemeinschaft für Familie/Freunde
- Staat reguliert die Grenze
      `,
      visual: `
## Visualisiere die Balance

### Diagramm: Geld vs. Gemeinschaft

\`\`\`
Effizienz
    ↑
    |         [IDEAL?]
    |         /
    |       /
    |     /           
    |   / [Balance]
    | /    
    |/______________|_______________→
   Markt                    Gemeinschaft
                            Solidarität
                                ↑
\`\`\`

**Zu viel Markt:**
- Alles wird Ware
- Keine echten Beziehungen
- Soziale Isolation

**Zu viel Gemeinschaft:**
- Ineffizient
- Keine Innovation
- Kann nicht skalieren

### Die Dämme:

\`\`\`
[Geld] ~~~~→ | Damm | → [geschützte Bereiche]
             | (Gesetze)|
             | (Normen) |

Geschützte Bereiche:
• Familie
• Freundschaft
• Grundrechte
• Umwelt
\`\`\`

**Historisch:**
Dämme werden abgebaut und neu gebaut:

\`\`\`
1800: [||||||||] Viele Dämme
1900: [||||]     Weniger (Liberalismus)
1950: [||||||]   Mehr (Sozialstaat)
1990: [|||]      Weniger (Neoliberalismus)
2020: [||||]     Wieder mehr (Regulierung)
\`\`\`
      `,
      analytical: `
## Formale Theorie der Sozio-Ökonomischen Grenze

### Modell: Die Effizienz-Solidarität-Grenze

**Gesellschaft S** hat Ressourcen R, die verteilt werden auf:
- Marktmechanismen M
- Gemeinschaftsmechanismen C

\`\`\`
R = M + C
\`\`\`

**Effizienz E:**
E(M) = α × M  (linear, hohe Effizienz)
E(C) = β × log(C)  (logarithmisch, abnehmende Effizienz)

α > β (Markt ist effizienter)

**Solidarität Sol:**
Sol(M) = -γ × M²  (quadratisch negativ)
Sol(C) = δ × C  (linear positiv)

γ, δ > 0

**Gesamtwohlfahrt W:**
\`\`\`
W = E(M) + E(C) + Sol(M) + Sol(C)
W = αM + β log(C) - γM² + δC
\`\`\`

**Optimierung:**
\`\`\`
∂W/∂M = α - 2γM = 0
→ M* = α / (2γ)
\`\`\`

**Interpretation:** 
Optimaler Marktanteil ist begrenzt! Selbst aus Effizienzgründen sollte nicht alles vermarktet werden.

### Dynamisches Modell: Polanyis Doppelbewegung

**Phase 1: Marktexpansion**
\`\`\`
dM/dt = k₁ × (R - M)  (Markt wächst)
\`\`\`

**Phase 2: Soziale Gegenbewegung**
\`\`\`
dC/dt = k₂ × (M - M*)  wenn M > M*
\`\`\`

**Resultat:** Oszillation um Gleichgewicht M*

### Empirische Validierung:

**Daten: Marktliberalisierungs-Index (MLI) vs. Sozialausgaben (SA)**

\`\`\`
Periode    MLI     SA
1900-1930  80%     20%
1930-1980  40%     60%
1980-2008  75%     35%
2008-2020  60%     45%
\`\`\`

**Korrelation mit Verzögerung:** 
MLI(t) ↑ → SA(t+10) ↑  (r = 0.72)

**Bestätigt Polanyis Doppelbewegung.**

### Normative Implikation (Rawls):

**Grundgüter G** dürfen nicht dem Markt unterworfen werden:

G = {Gesundheit, Bildung, Grundsicherheit, politische Rechte}

**Begründung:** Für "faire Chancengleichheit" notwendig.

**Problem:** Grenze zwischen Grund- und Luxusgütern ist umstritten.

**Beispiel:** 
- Grundbildung: Eindeutig Grundgut
- Elite-Universität: Luxusgut?
- → Grauzone!

### Sandels "Crowding Out":

**Modell:**
Intrinsische Motivation I, Extrinsische Motivation E

\`\`\`
Gesamtmotivation M = I + E - θ × I × E
\`\`\`

θ > 0: Interaktionsparameter (crowding out)

**Wenn E↑, dann M ↑** (kurzfristig)
**Aber I↓** durch Verdrängung
→ Langfristig kann M↓

**Empirisch bestätigt** bei:
- Blutspende (Titmuss)
- Kindergarten-Abholung (Gneezy & Rustichini, 2000)
- Schweizer Atomendlager-Akzeptanz (Frey & Oberholzer-Gee, 1997)

**Implikation:** Nicht alles sollte monetär incentiviert werden.
      `
    },
    examples: {
      simple: [
        "Du hilfst Freund beim Umzug → Kein Geld, weil Freundschaft",
        "Du hilfst Fremdem beim Umzug → Bezahlung, weil keine Beziehung"
      ],
      complex: [
        "Kinderarbeitsverbot (19. Jh.): Gesellschaft baut 'Damm'",
        "Organhandelsverbot (weltweit): Schutz der Menschenwürde",
        "Mindestlohn: Gegen 'race to the bottom'",
        "Urheberrecht: Balance zwischen Markt und Kultur"
      ]
    },
    prerequisites: ['c1', 'c2', 'c3']
  }
];
