import React, { useMemo, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Card, colors, Pill, PrimaryButton, ProgressBar, SectionTitle } from '@/src/components/ui';
import { useSavings } from '@/src/context/savings-context';
import { challengeSavedAmount, formatMoney, remainingDays } from '@/src/lib/format';

export default function ChallengeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { challenges, addContribution, deleteChallenge } = useSavings();
  const challenge = challenges.find((item) => item.id === id);
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);

  const saved = useMemo(() => challenge ? challengeSavedAmount(challenge.contributions) : 0, [challenge]);

  if (!challenge) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 }}>
        <Text style={{ color: colors.ink, fontSize: 19, fontWeight: '800' }}>Challenge nicht gefunden</Text>
        <Text onPress={() => router.back()} style={{ color: colors.accent, fontWeight: '800' }}>Zurück</Text>
      </View>
    );
  }

  const progress = challenge.targetAmount > 0 ? saved / challenge.targetAmount : 0;
  const days = remainingDays(challenge.createdAt, challenge.durationDays);
  const amountNumber = Number(amount.replace(',', '.'));

  return (
    <>
      <Stack.Screen options={{ title: challenge.title }} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: 16, paddingBottom: 40, gap: 16 }}>
        <Card style={{ backgroundColor: colors.nav, padding: 22 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14 }}>
            <View style={{ width: 58, height: 58, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.10)', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 30 }}>{challenge.emoji}</Text>
            </View>
            <Pill>{days === 0 ? 'Zeitraum vorbei' : `${days} Tage übrig`}</Pill>
          </View>
          <Text style={{ color: '#BFD0C5', fontSize: 14, lineHeight: 20 }}>{challenge.description}</Text>
          <Text selectable style={{ color: '#FFFFFF', fontSize: 36, fontWeight: '900', letterSpacing: -1.2, fontVariant: ['tabular-nums'] }}>{formatMoney(saved)}</Text>
          <Text style={{ color: '#BFD0C5', marginTop: -8 }}>von {formatMoney(challenge.targetAmount)}</Text>
          <ProgressBar value={progress} />
          <Text style={{ color: '#DCE6DF', fontWeight: '700' }}>{Math.min(100, Math.round(progress * 100))}% erreicht</Text>
        </Card>

        <PrimaryButton title="Sparbetrag hinzufügen" onPress={() => setModalOpen(true)} />

        <View style={{ gap: 12 }}>
          <SectionTitle title="Einzahlungen" />
          {challenge.contributions.length === 0 ? (
            <Card>
              <Text style={{ fontSize: 30 }}>🪙</Text>
              <Text style={{ color: colors.ink, fontWeight: '800', fontSize: 17 }}>Noch keine Einzahlung</Text>
              <Text style={{ color: colors.muted, lineHeight: 20 }}>Füge den ersten Betrag hinzu – auch kleine Schritte zählen.</Text>
            </Card>
          ) : (
            challenge.contributions.map((entry) => (
              <Card key={entry.id} style={{ padding: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text selectable style={{ color: colors.ink, fontSize: 16, fontWeight: '800', fontVariant: ['tabular-nums'] }}>{formatMoney(entry.amount)}</Text>
                    <Text style={{ color: colors.muted, fontSize: 12 }}>{new Date(entry.createdAt).toLocaleDateString('de-AT')}</Text>
                  </View>
                  {entry.note ? <Text numberOfLines={1} style={{ color: colors.muted, maxWidth: '48%', fontSize: 13 }}>{entry.note}</Text> : null}
                </View>
              </Card>
            ))
          )}
        </View>

        <Pressable
          onPress={() => {
            Alert.alert('Challenge löschen?', 'Die Challenge inklusive aller Einzahlungen wird gelöscht.', [
              { text: 'Abbrechen', style: 'cancel' },
              {
                text: 'Löschen',
                style: 'destructive',
                onPress: async () => {
                  await deleteChallenge(challenge.id);
                  router.replace('/(tabs)');
                },
              },
            ]);
          }}
          style={({ pressed }) => ({ alignItems: 'center', padding: 14, opacity: pressed ? 0.65 : 1 })}
        >
          <Text style={{ color: colors.danger, fontWeight: '800' }}>Challenge löschen</Text>
        </Pressable>
      </ScrollView>

      <Modal visible={modalOpen} transparent animationType="slide" onRequestClose={() => setModalOpen(false)}>
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(8,20,13,0.35)' }}>
          <View style={{ backgroundColor: colors.bg, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, paddingBottom: 34, gap: 16 }}>
            <View style={{ width: 44, height: 5, borderRadius: 99, backgroundColor: '#C9D1CB', alignSelf: 'center' }} />
            <Text style={{ color: colors.ink, fontSize: 22, fontWeight: '900' }}>Betrag hinzufügen</Text>
            <View style={{ gap: 7 }}>
              <Text style={{ color: colors.ink, fontWeight: '800' }}>Betrag in €</Text>
              <TextInput
                autoFocus
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                placeholder="10"
                placeholderTextColor="#9AA79F"
                style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: colors.line, borderRadius: 17, minHeight: 54, paddingHorizontal: 15, fontSize: 22, fontWeight: '800', color: colors.ink }}
              />
            </View>
            <View style={{ gap: 7 }}>
              <Text style={{ color: colors.ink, fontWeight: '800' }}>Notiz (optional)</Text>
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="z. B. Essen selbst gekocht"
                placeholderTextColor="#9AA79F"
                style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: colors.line, borderRadius: 17, minHeight: 50, paddingHorizontal: 15, fontSize: 15, color: colors.ink }}
              />
            </View>
            <PrimaryButton
              title={busy ? 'Wird gespeichert …' : 'Speichern'}
              disabled={!Number.isFinite(amountNumber) || amountNumber <= 0 || busy}
              onPress={async () => {
                if (!Number.isFinite(amountNumber) || amountNumber <= 0) return;
                setBusy(true);
                await addContribution(challenge.id, amountNumber, note);
                setBusy(false);
                setAmount('');
                setNote('');
                setModalOpen(false);
              }}
            />
            <Text onPress={() => setModalOpen(false)} style={{ textAlign: 'center', color: colors.muted, fontWeight: '800', padding: 4 }}>Abbrechen</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}
