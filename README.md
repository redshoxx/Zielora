# Zielora

Zielora ist eine lokal arbeitende Spar-App für iPhone mit eigenen und vorgeschlagenen Spar-Challenges.

## Kernfunktionen

- Eigene Spar-Challenges
- Vorgefertigte Challenge-Vorschläge
- Zielbetrag und Zeitraum
- Einzahlungen und Fortschritt
- Lokale Speicherung auf dem Gerät
- iPhone-optimierte Navigation
- Dark UI

## Technik

- Expo / React Native
- Expo Router
- TypeScript
- expo-sqlite
- iOS Bundle ID: `com.redshoxx.zielora`

## SideStore IPA

Der GitHub-Workflow unter `.github/workflows/build-unsigned-ipa.yml` baut automatisch bei jedem Push auf `main` sowie manuell über **Actions → Build Zielora SideStore IPA → Run workflow** eine unsignierte `Zielora.ipa`.

Nach erfolgreichem Lauf liegt sie als GitHub Actions Artifact `Zielora-SideStore-IPA` bereit und kann anschließend über SideStore signiert und installiert werden.
