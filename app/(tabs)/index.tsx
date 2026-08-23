import React, { useMemo } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { ChallengeCard } from '@/src/components/challenge-card';
import { Card, colors, Pill, SectionTitle } from '@/src/components/ui';
import { useSavings } from '@/src/context/savings-context';
import { challengeSavedAmount, formatMoney } from '@/src/lib/format';

export default function HomeScreen() {
  const { challenges, hydrated } = useSavings();

  const stats = useMemo(() => {
    const saved = challenges.reduce((sum, item) => sum + challengeSavedAmount(item.contributions), 0);
    const target = challenges.reduce((sum, item) => sum + item.targetAmount, 0);
    const deposits = challenges.reduce((sum, item) => sum + item.contributions.length, 0);
    return { saved, target, deposits };
  }, [challenges]);

  if (!hydrated) {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color={colors.accent} /></View>;
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: 16, paddingBottom: 118, gap: 18 }}>
      <Card style={{ backgroundColor: colors.nav, padding: 22 }}>
        <Pill>Dein Sparstand</Pill>
        <View style={{ gap: 3 }}>
          <Text selectable style={{ color: '#FFFFFF', fontSize: 38, fontWeight: '900', letterSpacing: -1.4, fontVariant: ['tabular-nums'] }}>{formatMoney(stats.saved)}</Text>
          <Text style={{ color: '#BFD0C5', fontSize: 14 }}>über alle aktiven Challenges</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flex: 1, padding: 13, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.08)' }}>
            <Text style={{ color: '#BFD0C5', fontSize: 11 }}>Zielsumme</Text>
            <Text selectable style={{ color: '#FFFFFF', fontSize: 17, fontWeight: '800', fontVariant: ['tabular-nums'] }}>{formatMoney(stats.target)}</Text>
          </View>
          <View style={{ flex: 1, padding: 13, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.08)' }}>
            <Text style={{ color: '#BFD0C5', fontSize: 11 }}>Einzahlungen</Text>
            <Text selectable style={{ color: '#FFFFFF', fontSize: 17, fontWeight: '800', fontVariant: ['tabular-nums'] }}>{stats.deposits}</Text>
          </View>
        </View>
      </Card>

      <SectionTitle
        title="Deine Challenges"
        action={<Link href="/(tabs)/challenges" style={{ color: colors.accent, fontWeight: '800' }}>Alle ansehen</Link>}
      />

      {challenges.length === 0 ? (
        <Card>
          <Text style={{ fontSize: 34 }}>🌱</Text>
          <Text style={{ color: colors.ink, fontSize: 19, fontWeight: '800' }}>Starte mit einem kleinen Ziel</Text>
          <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 21 }}>Wähle eine vorgeschlagene Challenge oder erstelle dein eigenes Sparziel. Du kannst später jederzeit Beträge hinzufügen.</Text>
          <Link href="/(tabs)/challenges" style={{ color: colors.accent, fontSize: 15, fontWeight: '800' }}>Challenge auswählen →</Link>
        </Card>
      ) : (
        challenges.slice(0, 3).map((challenge) => <ChallengeCard key={challenge.id} challenge={challenge} />)
      )}

      <Card style={{ backgroundColor: '#FFF7E9' }}>
        <Pill tone="gold">Tipp</Pill>
        <Text style={{ color: colors.ink, fontSize: 17, fontWeight: '800' }}>Klein schlägt perfekt.</Text>
        <Text style={{ color: '#806B48', fontSize: 14, lineHeight: 21 }}>Trage auch 1 €, 2 € oder 5 € ein. Die App soll Fortschritt sichtbar machen – nicht zusätzlichen Druck erzeugen.</Text>
      </Card>
    </ScrollView>
  );
}
