# Zielora

Zielora ist eine iPhone-optimierte Spar-App für eigene und vorgeschlagene Spar-Challenges.

## Funktionen

- eigene Spar-Challenges
- vorgeschlagene Challenges
- beliebige Einzahlungen
- Fortschrittsanzeige
- lokale Speicherung auf dem iPhone
- eigene Bottom-Navigation
- kein Konto und kein Backend

## Technik

- Expo SDK 56
- React Native 0.85
- JavaScript
- expo-sqlite KV Store
- Bundle-ID `com.redshoxx.zielora`

## SideStore

Der GitHub-Workflow `.github/workflows/build-ios.yml` baut auf macOS 26 eine unsigned `Zielora.ipa`, die anschließend mit SideStore signiert und installiert werden kann.
