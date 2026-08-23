import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ChallengeCard } from '@/src/components/challenge-card';
import { Card, colors, Pill, PrimaryButton, SectionTitle } from '@/src/components/ui';
import { suggestedChallenges } from '@/src/data/suggested-challenges';
import { useSavings } from '@/src/context/savings-context';
import { formatMoney } from '@/src/lib/format';

export default function ChallengesScreen() {
  const router = useRouter();
  const { challenges, activateSuggested } = useSavings();
  const activeTemplateIds = new Set(challenges.map((item) => item.templateId).filter(Boolean));

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: 16, paddingBottom: 118, gap: 18 }}>
      {challenges.length > 0 && (
        <View style={{ gap: 12 }}>
          <SectionTitle title="Aktiv" />
          {challenges.map((challenge) => <ChallengeCard key={challenge.id} challenge={challenge} />)}
        </View>
      )}

      <View style={{ gap: 12 }}>
        <SectionTitle title="Vorgeschlagen" />
        <Text style={{ color: colors.muted, lineHeight: 20 }}>Einfach auswählen und starten. Alle Beträge lassen sich später flexibel eintragen.</Text>
        {suggestedChallenges.map((template) => {
          const active = activeTemplateIds.has(template.id);
          return (
            <Card key={template.id}>
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                <View style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: colors.accentSoft, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 25 }}>{template.emoji}</Text>
                </View>
                <View style={{ flex: 1, gap: 5 }}>
                  <Text style={{ color: colors.ink, fontSize: 17, fontWeight: '800' }}>{template.title}</Text>
                  <Text style={{ color: colors.muted, fontSize: 13.5, lineHeight: 19 }}>{template.description}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                <Pill>{formatMoney(template.targetAmount)}</Pill>
                <Pill tone="neutral">{template.durationDays} Tage</Pill>
              </View>
              {active ? (
                <View style={{ minHeight: 48, borderRadius: 16, backgroundColor: '#EEF3EF', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: colors.muted, fontWeight: '800' }}>Bereits aktiv</Text>
                </View>
              ) : (
                <PrimaryButton
                  title="Challenge starten"
                  onPress={async () => {
                    const id = await activateSuggested(template.id);
                    if (id) router.push({ pathname: '/challenge/[id]', params: { id } });
                  }}
                />
              )}
            </Card>
          );
        })}
      </View>

      <Pressable onPress={() => router.push('/(tabs)/create')} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
        <Card style={{ borderWidth: 1, borderColor: colors.line, backgroundColor: '#FAFCFA' }}>
          <Text style={{ color: colors.ink, fontSize: 17, fontWeight: '800' }}>Nichts Passendes dabei?</Text>
          <Text style={{ color: colors.muted, lineHeight: 20 }}>Erstelle in weniger als einer Minute deine eigene Challenge.</Text>
          <Text style={{ color: colors.accent, fontWeight: '800' }}>Eigene Challenge erstellen →</Text>
        </Card>
      </Pressable>
    </ScrollView>
  );
}
