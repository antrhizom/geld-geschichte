# Der Geruch des Geldes - Interaktive Lernumgebung

Eine lernadaptive, interaktive Plattform basierend auf Yuval Noah Hararis Kapitel "Der Geruch des Geldes" aus "Eine kurze Geschichte der Menschheit". Entwickelt für Sek II Berufsbildung Schweiz.

## 🎯 Projektübersicht

### Features

- **🎓 Adaptive Lernpfade**: Drei Schwierigkeitsstufen (Einfach, Mittel, Anspruchsvoll)
- **📊 Lernprotokollierung**: Automatische Speicherung des Fortschritts
- **🔑 Lerncode-System**: Geräteübergreifendes Lernen mit persönlichem Code
- **⏱️ Zeittracking**: Automatische Erfassung der Lernzeit
- **🏆 Zertifikat**: Druckbares Abschlusszertifikat mit persönlichen Statistiken
- **💾 Lokale Speicherung**: Nutzt localStorage für sofortigen Zugriff
- **🎨 Modernes UI**: Responsive Design mit Tailwind CSS

### Lernstruktur

**Einfach (Einstiegsniveau)**
- 4 Module à 15-25 Minuten
- Grundlegende Konzepte
- Multiple-Choice und einfache Textfragen
- Gesamtdauer: ~1,5 Stunden

**Mittel (Fortgeschritten)**
- 4 Module à 25-30 Minuten
- Tiefergehende Analysen
- Historische Kontexte
- Gesamtdauer: ~2 Stunden

**Anspruchsvoll (Expert:innen)**
- 4 Module à 35-40 Minuten
- Philosophische Perspektiven
- Kritische Auseinandersetzung
- Gesamtdauer: ~2,5-3 Stunden

## 🚀 Installation & Setup

### Voraussetzungen

- Node.js 18+ und npm
- Git
- Firebase Account (optional für Cloud-Synchronisation)
- Vercel Account (für Deployment)

### Lokale Installation

1. **Repository klonen**
```bash
git clone https://github.com/dein-username/geld-lernen.git
cd geld-lernen
```

2. **Dependencies installieren**
```bash
npm install
```

3. **Environment Variables einrichten**
```bash
cp .env.example .env.local
```

Öffne `.env.local` und trage deine Firebase Credentials ein:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=dein_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dein-projekt.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=dein-projekt-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=dein-projekt.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=deine_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=deine_app_id
```

4. **Entwicklungsserver starten**
```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## 🔥 Firebase Setup

### 1. Firebase Projekt erstellen

1. Gehe zu [Firebase Console](https://console.firebase.google.com/)
2. Klicke auf "Projekt hinzufügen"
3. Gib einen Projektnamen ein (z.B. "geld-lernen")
4. Google Analytics ist optional
5. Klicke auf "Projekt erstellen"

### 2. Web-App registrieren

1. Im Firebase Projekt, klicke auf "Web" (</> Icon)
2. Gib einen App-Namen ein
3. Firebase Hosting ist optional
4. Klicke auf "App registrieren"
5. **Kopiere die Config-Werte** in deine `.env.local`

### 3. Firestore Database einrichten (optional)

Wenn du Cloud-Synchronisation möchtest:

1. Gehe zu "Build" > "Firestore Database"
2. Klicke auf "Datenbank erstellen"
3. Wähle "Im Produktionsmodus starten"
4. Wähle eine Region (z.B. europe-west6 für Zürich)
5. Klicke auf "Aktivieren"

**Sicherheitsregeln** (für Entwicklung):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if true;
    }
    match /progress/{progressId} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **Wichtig**: Für Production solltest du strengere Regeln verwenden!

## 🌐 Vercel Deployment

### Automatisches Deployment mit Vercel CLI

1. **Vercel CLI installieren**
```bash
npm i -g vercel
```

2. **Login bei Vercel**
```bash
vercel login
```

3. **Projekt deployen**
```bash
vercel
```

Folge den Prompts:
- Set up and deploy? → Yes
- Which scope? → Dein Account
- Link to existing project? → No
- Project name? → geld-lernen
- In which directory? → ./
- Override settings? → No

4. **Environment Variables setzen**
```bash
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
```

5. **Production Deployment**
```bash
vercel --prod
```

### Automatisches Deployment via GitHub

1. **Repository auf GitHub pushen**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/dein-username/geld-lernen.git
git push -u origin main
```

2. **Mit Vercel verbinden**
- Gehe zu [vercel.com/new](https://vercel.com/new)
- Importiere dein GitHub Repository
- Konfiguriere Environment Variables
- Klicke auf "Deploy"

### Kontinuierliche Deployments

Jeder Push auf `main` triggert automatisch ein neues Deployment!

## 📁 Projektstruktur

```
geld-lernen/
├── app/
│   ├── page.tsx              # Landing Page (Start)
│   ├── level-test/
│   │   └── page.tsx          # Einstufungstest
│   ├── learn/
│   │   └── page.tsx          # Hauptlernseite
│   ├── certificate/
│   │   └── page.tsx          # Zertifikatsseite
│   ├── layout.tsx            # Root Layout
│   └── globals.css           # Globale Styles
├── components/               # Wiederverwendbare Komponenten
├── lib/
│   ├── firebase.ts           # Firebase Konfiguration
│   └── learningContent.ts    # Alle Lerninhalte
├── types/
│   └── learning.ts           # TypeScript Typen
├── public/                   # Statische Assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎓 Pädagogisches Konzept

### Lernadaptivität

Die Plattform passt sich dem Lernenden an:

1. **Einstufungstest**: 4 Fragen bestimmen das Niveau
   - 0-1 richtig → Einfach
   - 2-3 richtig → Mittel
   - 4 richtig → Anspruchsvoll

2. **Verzweigte Module**: Jedes Niveau hat eigene Inhalte
   - Einfach: Narrative, Beispiele, klare Struktur
   - Mittel: Analysen, Kontextualisierung, Vergleiche
   - Anspruchsvoll: Theorien, Kritik, Synthese

3. **Verschiedene Fragetypen**
   - Multiple Choice
   - Offene Textfragen
   - Sortieraufgaben
   - Zuordnungsaufgaben

### Lernziele (nach Bloom)

**Einfach**
- Erinnern: Grundbegriffe benennen
- Verstehen: Konzepte in eigenen Worten erklären

**Mittel**
- Anwenden: Konzepte auf neue Situationen übertragen
- Analysieren: Zusammenhänge und Ursachen erkennen

**Anspruchsvoll**
- Evaluieren: Kritisch bewerten und argumentieren
- Erschaffen: Eigene Positionen entwickeln

## 🔧 Technische Details

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Sprache**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (optional)
- **Deployment**: Vercel
- **State Management**: React Hooks + localStorage
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Datenstruktur (localStorage)

```typescript
{
  learningCode: string,          // "ABCD-1234"
  learnerName: string,           // "Anna Müller"
  difficultyLevel: string,       // "einfach" | "mittel" | "anspruchsvoll"
  completedModules: string[],    // ["e1", "e2", ...]
  moduleScores: {                // { "e1": 15, "e2": 20, ... }
    [moduleId: string]: number
  },
  answers: {                     // { "e1q1": { answer: "...", correct: true, ... }, ... }
    [questionId: string]: {
      answer: any,
      correct: boolean,
      timestamp: number
    }
  },
  startTime: string,             // Unix timestamp
  totalTimeSpent: string         // Milliseconds
}
```

## 📝 Inhaltliche Quellen

Basiert auf:
- **Yuval Noah Harari**: "Eine kurze Geschichte der Menschheit", Kapitel 10: "Der Geruch des Geldes"

Erweitert durch:
- Karl Polanyi: "The Great Transformation"
- David Graeber: "Debt: The First 5,000 Years"
- Michael Sandel: "What Money Can't Buy"

## 🎨 Anpassungen & Erweiterungen

### Neue Module hinzufügen

1. Öffne `lib/learningContent.ts`
2. Füge ein neues Modul zum entsprechenden Niveau hinzu:

```typescript
{
  id: 'e5',
  title: 'Neues Modul',
  description: 'Beschreibung',
  estimatedMinutes: 20,
  content: `# Markdown Content hier`,
  questions: [
    {
      id: 'e5q1',
      type: 'multiple-choice',
      question: 'Frage?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 'A',
      explanation: 'Erklärung',
      difficulty: 'einfach',
      points: 5
    }
  ]
}
```

### Styling anpassen

Tailwind Farben in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#fef7ee',
        // ... bis 900
      }
    }
  }
}
```

### Firebase Integration erweitern

Siehe `lib/firebase.ts` für Firestore-Operationen:

```typescript
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Fortschritt speichern
await setDoc(doc(db, 'progress', learningCode), {
  userId: learningCode,
  level: level,
  completed: completedModules,
  timestamp: new Date()
});

// Fortschritt laden
const docSnap = await getDoc(doc(db, 'progress', learningCode));
```

## 🐛 Troubleshooting

### Problem: "Firebase not initialized"

**Lösung**: Überprüfe `.env.local` und stelle sicher, dass alle Variablen korrekt gesetzt sind.

### Problem: Build-Fehler bei Vercel

**Lösung**: 
1. Stelle sicher, dass alle Environment Variables in Vercel gesetzt sind
2. Überprüfe `next.config.js` auf Syntax-Fehler
3. Checke die Build-Logs in Vercel Dashboard

### Problem: Styles werden nicht geladen

**Lösung**:
```bash
# Tailwind CSS neu kompilieren
npm run build
```

### Problem: localStorage funktioniert nicht

**Lösung**: Manche Browser blockieren localStorage im Inkognito-Modus. Teste im normalen Browserfenster.

## 📊 Analytics & Monitoring (optional)

### Vercel Analytics hinzufügen

```bash
npm install @vercel/analytics
```

In `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## 🤝 Contribution

Contributions sind willkommen! Bitte:

1. Forke das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Pushe zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 📄 Lizenz

Dieses Projekt ist für Bildungszwecke entwickelt. Die Inhalte basieren auf Yuval Noah Hararis Werk "Eine kurze Geschichte der Menschheit".

## 👤 Autor

Entwickelt für Sek II Berufsbildung Schweiz

## 🙏 Danksagungen

- Yuval Noah Harari für die inspirierende Arbeit
- Anthropic Claude für Entwicklungsunterstützung
- Die Open-Source Community für die verwendeten Tools

---

**Viel Erfolg beim Lernen! 📚💰**
