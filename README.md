# Zielora

**Zielora** ist eine lokale iPhone-Spar-App für eigene und vorgeschlagene Spar-Challenges.
Sie ist bewusst einfach gehalten: Ziel auswählen, Betrag sparen, Fortschritt verfolgen.

## Funktionen

- Eigene Spar-Challenges erstellen
- Vorgeschlagene Challenge-Vorlagen
- Zielbetrag und Zeitraum festlegen
- Einzahlungen lokal erfassen
- Fortschritt und Restbetrag anzeigen
- Übersicht über aktive Ziele
- iPhone-optimierte Bottom-Navigation
- Haptisches Feedback
- Lokale SQLite-Speicherung
- Kein Konto, keine Cloud und keine Bankanbindung erforderlich

## Technologie

- Expo / React Native
- TypeScript
- Expo Router
- Expo SQLite
- iOS-first UI

## App-Identität

- App-Name: `Zielora`
- Expo-Slug: `zielora`
- iOS Bundle Identifier: `com.redshoxx.zielora`
- IPA-Datei: `Zielora.ipa`

## Lokal starten

```bash
npm install
npx expo start
```

Zum schnellen UI-Test zuerst Expo Go verwenden.

## SideStore-IPA über GitHub Actions

Der Workflow `.github/workflows/build-unsigned-ipa.yml` erzeugt auf einem macOS-Runner eine unsigned iPhone-App und verpackt sie als Standard-IPA.

1. Repository auf GitHub öffnen.
2. **Actions** öffnen.
3. **Build Zielora SideStore IPA** auswählen.
4. **Run workflow** starten.
5. Nach erfolgreichem Lauf das Artifact `Zielora-SideStore-IPA` laden.
6. `Zielora.ipa` über SideStore installieren.

SideStore signiert die IPA mit dem dort verwendeten Apple-Account.

## Datenschutz

Die Challenge-Daten werden lokal auf dem Gerät gespeichert. Diese Version benötigt keinen eigenen Server und keine Benutzeranmeldung.

## Hinweis zum Namen

`Zielora` ist als Produktname für dieses Projekt gewählt. Eine vollständige rechtliche Markenrecherche ist nicht Bestandteil des Projekts.
