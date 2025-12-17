# 🚀 Schritt-für-Schritt Installations- und Deployment-Anleitung

## Teil 1: Lokale Entwicklung (15 Minuten)

### Schritt 1: Voraussetzungen prüfen ✅

Öffne dein Terminal und überprüfe:

```bash
# Node.js Version (mindestens 18)
node --version

# npm Version
npm --version

# Git Version
git --version
```

Falls nicht installiert:
- **Node.js**: [nodejs.org](https://nodejs.org/) → LTS Version herunterladen
- **Git**: [git-scm.com](https://git-scm.com/downloads)

### Schritt 2: Projekt herunterladen 📥

```bash
# Navigiere zu deinem gewünschten Verzeichnis
cd ~/Projekte  # oder wo auch immer du arbeiten möchtest

# Klone das Repository (oder entpacke die ZIP-Datei)
git clone https://github.com/dein-username/geld-lernen.git

# Wechsle ins Projektverzeichnis
cd geld-lernen
```

### Schritt 3: Dependencies installieren 📦

```bash
npm install
```

⏱️ Das dauert 2-3 Minuten. Du solltest am Ende sehen:
```
added 513 packages in 2m
```

### Schritt 4: Environment Variables einrichten 🔐

```bash
# Kopiere die Beispiel-Datei
cp .env.example .env.local
```

Öffne `.env.local` mit einem Texteditor und füge **erstmal Platzhalter** ein:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=placeholder
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=placeholder.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=placeholder
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=placeholder.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=placeholder
```

> 💡 **Wichtig**: Firebase ist optional! Die App funktioniert erstmal auch lokal ohne echte Firebase-Daten.

### Schritt 5: Entwicklungsserver starten 🎉

```bash
npm run dev
```

Du solltest sehen:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

**Öffne deinen Browser**: [http://localhost:3000](http://localhost:3000)

🎊 **Gratulation!** Die App läuft jetzt lokal.

---

## Teil 2: Firebase Setup (20 Minuten) 🔥

Firebase ermöglicht Cloud-Speicherung und geräteübergreifendes Lernen.

### Schritt 1: Firebase Console öffnen

1. Gehe zu [console.firebase.google.com](https://console.firebase.google.com/)
2. Logge dich mit deinem Google-Konto ein
3. Klicke auf **"Projekt hinzufügen"**

### Schritt 2: Projekt erstellen

**Projekterstellung (5 Screens):**

**Screen 1: Projektname**
- Name: `geld-lernen-[dein-name]` (z.B. `geld-lernen-anna`)
- Klicke **"Weiter"**

**Screen 2: Google Analytics**
- Schalter auf **"Deaktiviert"** (nicht nötig für uns)
- Klicke **"Projekt erstellen"**

⏱️ Warte 30 Sekunden...

**Screen 3: Projekt ist bereit**
- Klicke **"Weiter"**

### Schritt 3: Web-App registrieren

Du siehst jetzt das Firebase Dashboard.

1. Klicke auf das **Web-Icon** `</>`
2. App-Nickname: `Geld Lernen Web`
3. **NICHT** "Firebase Hosting" aktivieren
4. Klicke **"App registrieren"**

### Schritt 4: Config-Werte kopieren

Du siehst jetzt einen Code-Block:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyABC123...",
  authDomain: "geld-lernen-anna.firebaseapp.com",
  projectId: "geld-lernen-anna",
  storageBucket: "geld-lernen-anna.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:abc123"
};
```

**Kopiere diese Werte** in deine `.env.local` Datei:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyABC123...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=geld-lernen-anna.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=geld-lernen-anna
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=geld-lernen-anna.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc123
```

Klicke **"Weiter zur Konsole"**

### Schritt 5: Firestore Database einrichten

**Im Firebase Dashboard:**

1. Linke Sidebar → **"Build"** → **"Firestore Database"**
2. Klicke **"Datenbank erstellen"**

**Sicherheitsregeln auswählen:**
- Wähle **"Im Testmodus starten"**
- ⚠️ Testmodus ist OK für Entwicklung, aber NICHT für Production!
- Klicke **"Weiter"**

**Standort auswählen:**
- Wähle **"europe-west6 (Zürich)"** (nächster Standort zur Schweiz)
- Klicke **"Aktivieren"**

⏱️ Warte 1-2 Minuten...

✅ **Fertig!** Du siehst jetzt eine leere Datenbank.

### Schritt 6: Entwicklungsserver neu starten

```bash
# Im Terminal: Stoppe den Server (Ctrl+C)
# Starte neu:
npm run dev
```

🎉 **Firebase ist jetzt aktiv!** (obwohl die App aktuell noch localStorage nutzt)

---

## Teil 3: GitHub Repository erstellen (10 Minuten) 📦

### Schritt 1: Repository auf GitHub erstellen

1. Gehe zu [github.com/new](https://github.com/new)
2. Repository Name: `geld-lernen`
3. Description: `Interaktive Lernplattform zu Hararis "Der Geruch des Geldes"`
4. **Private** oder **Public** (deine Wahl)
5. **NICHT** "Initialize with README" (haben wir schon)
6. Klicke **"Create repository"**

### Schritt 2: Lokales Projekt mit GitHub verbinden

```bash
# Initialisiere Git (falls noch nicht geschehen)
git init

# Füge alle Dateien hinzu
git add .

# Erstelle ersten Commit
git commit -m "Initial commit: Lernplattform Grundstruktur"

# Verbinde mit GitHub (ersetze USERNAME und REPO-NAME)
git remote add origin https://github.com/USERNAME/geld-lernen.git

# Pushe zum main Branch
git branch -M main
git push -u origin main
```

🎊 **Dein Code ist jetzt auf GitHub!**

---

## Teil 4: Vercel Deployment (15 Minuten) 🌐

### Methode A: Deployment via Vercel Website (empfohlen)

**Schritt 1: Vercel Account erstellen**

1. Gehe zu [vercel.com/signup](https://vercel.com/signup)
2. Klicke **"Continue with GitHub"**
3. Autorisiere Vercel

**Schritt 2: Projekt importieren**

1. Klicke **"Add New..."** → **"Project"**
2. Du siehst deine GitHub Repositories
3. Finde `geld-lernen` und klicke **"Import"**

**Schritt 3: Projekt konfigurieren**

- **Framework Preset**: Next.js (wird automatisch erkannt)
- **Root Directory**: `./` (Standard)
- **Build Command**: `npm run build` (Standard)
- **Output Directory**: `.next` (Standard)

**Schritt 4: Environment Variables hinzufügen**

Klicke auf **"Environment Variables"** und füge alle hinzu:

```
Name: NEXT_PUBLIC_FIREBASE_API_KEY
Value: [dein Wert aus .env.local]

Name: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
Value: [dein Wert aus .env.local]

Name: NEXT_PUBLIC_FIREBASE_PROJECT_ID
Value: [dein Wert aus .env.local]

Name: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
Value: [dein Wert aus .env.local]

Name: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
Value: [dein Wert aus .env.local]

Name: NEXT_PUBLIC_FIREBASE_APP_ID
Value: [dein Wert aus .env.local]
```

**Schritt 5: Deployment starten**

Klicke **"Deploy"**

⏱️ Warte 2-3 Minuten...

🎉 **FERTIG!** Du siehst Konfetti und einen **"Visit"** Button.

**Deine App ist jetzt live unter**: `https://geld-lernen-xxx.vercel.app`

---

### Methode B: Deployment via Vercel CLI (alternativ)

```bash
# Vercel CLI installieren
npm i -g vercel

# Login
vercel login

# Deployment
vercel

# Folge den Prompts:
# ? Set up and deploy "~/geld-lernen"? [Y/n] y
# ? Which scope? [Dein Account]
# ? Link to existing project? [y/N] n
# ? What's your project's name? geld-lernen
# ? In which directory is your code located? ./

# Environment Variables setzen
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
# ... (für jede Variable)

# Production Deployment
vercel --prod
```

---

## Teil 5: Testing & Überprüfung (5 Minuten) ✅

### Lokale Tests

**Test 1: Startseite**
- Öffne `http://localhost:3000`
- ✅ Du solltest die Landing Page sehen

**Test 2: Neues Lernen starten**
- Klicke "Lernreise beginnen"
- ✅ Du solltest zum Einstufungstest kommen

**Test 3: Lerncode-Generierung**
- Im localStorage deines Browsers (F12 → Application → Local Storage)
- ✅ Du solltest `learningCode` sehen (z.B. "ABCD-1234")

**Test 4: Lernmodul**
- Beantworte die Test-Fragen
- ✅ Du solltest zu einem Lernmodul kommen

**Test 5: Zertifikat**
- Schließe alle Module ab
- ✅ Du solltest ein druckbares Zertifikat sehen

### Production Tests

**Teste deine Vercel-URL**:
1. Öffne `https://deine-app.vercel.app`
2. Wiederhole alle Tests von oben
3. **Teste auf verschiedenen Geräten:**
   - Desktop
   - Tablet
   - Smartphone

---

## Teil 6: Continuous Deployment einrichten (bereits aktiv!) 🔄

**Das ist bereits eingerichtet!** Jedes Mal wenn du Code pushst:

```bash
git add .
git commit -m "Neue Funktion hinzugefügt"
git push
```

→ Vercel deployt automatisch neu! 🚀

**Überprüfen:**
1. Gehe zu [vercel.com/dashboard](https://vercel.com/dashboard)
2. Klicke auf dein Projekt
3. Du siehst alle Deployments

---

## Häufige Probleme & Lösungen 🔧

### Problem 1: "npm install" schlägt fehl

**Lösung:**
```bash
# Node-Module löschen und neu installieren
rm -rf node_modules package-lock.json
npm install
```

### Problem 2: "Port 3000 already in use"

**Lösung:**
```bash
# Finde den Prozess
lsof -i :3000

# Beende den Prozess (ersetze PID)
kill -9 [PID]

# Oder nutze anderen Port
PORT=3001 npm run dev
```

### Problem 3: Firebase-Fehler im Browser

**Lösung:**
1. Überprüfe `.env.local` auf Tippfehler
2. Stelle sicher, dass alle Variablen mit `NEXT_PUBLIC_` beginnen
3. Starte den Dev-Server neu

### Problem 4: Vercel Build schlägt fehl

**Lösung:**
1. Checke die Build-Logs in Vercel Dashboard
2. Überprüfe, dass alle Environment Variables in Vercel gesetzt sind
3. Teste lokal: `npm run build`

### Problem 5: Styles fehlen nach Deployment

**Lösung:**
```bash
# Überprüfe Tailwind-Config
npx tailwindcss -i ./app/globals.css -o ./test.css

# Wenn OK, rebuild
npm run build
vercel --prod
```

---

## Checkliste ✓

**Vor dem Launch:**

- [ ] Alle Tests lokal durchgeführt
- [ ] Firebase Firestore Rules auf Production eingestellt
- [ ] Alle Environment Variables in Vercel gesetzt
- [ ] Domain-Name konfiguriert (optional)
- [ ] Analytics eingerichtet (optional)
- [ ] HTTPS aktiv (automatisch durch Vercel)
- [ ] Responsive Design auf allen Geräten getestet
- [ ] Barrierefreiheit überprüft
- [ ] Datenschutzerklärung hinzugefügt (falls öffentlich)

---

## Nächste Schritte 🎯

1. **Custom Domain verbinden** (optional)
   - In Vercel: Settings → Domains
   - Füge deine eigene Domain hinzu

2. **Analytics aktivieren** (optional)
   ```bash
   npm install @vercel/analytics
   ```

3. **Monitoring einrichten** (optional)
   - Vercel Analytics für Performance
   - Sentry für Error Tracking

4. **Content erweitern**
   - Weitere Module hinzufügen
   - Mehr Fragetypen entwickeln

---

## Support & Hilfe 💬

**Dokumentation:**
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)
- Firebase: [firebase.google.com/docs](https://firebase.google.com/docs)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Tailwind CSS: [tailwindcss.com/docs](https://tailwindcss.com/docs)

**Community:**
- Next.js Discord
- Firebase Slack
- Vercel Community

---

**Viel Erfolg! 🚀**

Bei Fragen oder Problemen, erstelle ein Issue auf GitHub!
