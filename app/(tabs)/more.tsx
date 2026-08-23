import React, { useState } from 'react';
import { Alert, ScrollView, Switch, Text, View } from 'react-native';
import { Card, colors, Pill } from '@/src/components/ui';
import { useSavings } from '@/src/context/savings-context';

export default function MoreScreen() {
  const { challenges, hapticsEnabled, setHapticsEnabled, resetAll } = useSavings();
  const [busy, setBusy] = useState(false);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: 16, paddingBottom: 118, gap: 16 }}>
      <Card>
        <Pill>Offline-first</Pill>
        <Text style={{ color: colors.ink, fontSize: 20, fontWeight: '900' }}>Einfach und privat</Text>
        <Text style={{ color: colors.muted, lineHeight: 21 }}>Zielora speichert deine Challenges lokal auf dem iPhone. Es gibt in dieser Version kein Konto und keine Bankverbindung.</Text>
      </Card>

      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
          <View style={{ flex: 1, gap: 3 }}>
            <Text style={{ color: colors.ink, fontSize: 16, fontWeight: '800' }}>Haptisches Feedback</Text>
            <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 18 }}>Kurzes iPhone-Feedback bei erfolgreichen Aktionen.</Text>
          </View>
          <Switch value={hapticsEnabled} onValueChange={setHapticsEnabled} trackColor={{ false: '#D6DDD8', true: '#78B995' }} />
        </View>
      </Card>

      <Card>
        <Text style={{ color: colors.ink, fontSize: 16, fontWeight: '800' }}>Lokale Daten</Text>
        <Text style={{ color: colors.muted, lineHeight: 20 }}>{challenges.length} Challenge{challenges.length === 1 ? '' : 's'} gespeichert.</Text>
        <Text
          onPress={() => {
            Alert.alert('Alle Daten löschen?', 'Alle Challenges und Einzahlungen werden dauerhaft von diesem Gerät entfernt.', [
              { text: 'Abbrechen', style: 'cancel' },
              {
                text: 'Löschen',
                style: 'destructive',
                onPress: async () => {
                  setBusy(true);
                  await resetAll();
                  setBusy(false);
                },
              },
            ]);
          }}
          style={{ color: busy ? colors.muted : colors.danger, fontWeight: '800', paddingVertical: 6 }}
        >
          {busy ? 'Wird gelöscht …' : 'Alle Daten löschen'}
        </Text>
      </Card>

      <Text style={{ textAlign: 'center', color: '#98A59D', fontSize: 12 }}>Zielora 1.0 · für iPhone optimiert</Text>
    </ScrollView>
  );
}
