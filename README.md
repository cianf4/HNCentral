# HN Central

Questo è un progetto realizzato con Ionic e Angular.

## Prerequisiti

Assicurati di avere installato Node.js e npm. Inoltre, avrai bisogno di Ionic e Angular CLI. Se non li hai già, puoi installarli con i seguenti comandi:

```bash
npm install -g @ionic/cli
npm install -g @angular/cli
```

## Installazione

1. Clona il repository:
```bash
git clone https://github.com/cianf4/HNCentral.git
```

2. Vai nella directory del progetto:
```bash
cd HNCentral
```

3. Installa le dipendenze:
```bash
npm install
```

4. Avvia l'applicazione:
```bash
ionic serve
```

Ora dovresti essere in grado di vedere l'applicazione in esecuzione all'indirizzo \`http://localhost:8100\` nel tuo browser.

## Costruire l'applicazione per Android

Se vuoi costruire l'applicazione per Android, assicurati di avere installato e configurato correttamente Android Studio e il relativo SDK. Poi esegui:

```bash
ionic build
npx cap add android
npx cap open android
```

Questo aprirà Android Studio con il tuo progetto. Da lì, puoi costruire l'applicazione e installarla sul tuo dispositivo o emulatore.

## Licenza

MIT
