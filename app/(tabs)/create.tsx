import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Card, colors, Pill, PrimaryButton } from '@/src/components/ui';
import { useSavings } from '@/src/context/savings-context';
import { ChallengeCategory } from '@/src/types/savings';

const presets = [
  { label: '30 Tage', days: 30 },
  { label: '90 Tage', days: 90 },
  { label: '6 Monate', days: 180 },
  { label: '1 Jahr', days: 365 },
];

export default function CreateScreen() {
  const router = useRouter();
  const { createChallenge } = useSavings();
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [description, setDescription] = useState('');
  const [days, setDays] = useState(90);
  const [emoji, setEmoji] = useState('💚');
  const [saving, setSaving] = useState(false);

  const targetNumber = Number(target.replace(',', '.'));
  const valid = title.trim().length >= 2 && Number.isFinite(targetNumber) && targetNumber > 0 && days > 0;

  const inputStyle = {
    backgroundColor: '#F8FAF8',
    borderWidth: 1,
    borderColor: colors.line,
    color: colors.ink,
    minHeight: 50,
    borderRadius: 16,
    paddingHorizontal: 14,
    fontSize: 16,
  } as const;

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 16, paddingBottom: 118, gap: 16 }}>
      <Card>
        <Text style={{ color: colors.ink, fontSize: 20, fontWeight: '900' }}>Dein eigenes Sparziel</Text>
        <Text style={{ color: colors.muted, lineHeight: 20 }}>Nur die wichtigsten Angaben. Du kannst später flexibel Beträge hinzufügen.</Text>

        <View style={{ gap: 7 }}>
          <Text style={{ color: colors.ink, fontSize: 13, fontWeight: '800' }}>Name</Text>
          <TextInput value={title} onChangeText={setTitle} placeholder="z. B. Neues Handy" placeholderTextColor="#9AA79F" style={inputStyle} returnKeyType="next" />
        </View>

        <View style={{ gap: 7 }}>
          <Text style={{ color: colors.ink, fontSize: 13, fontWeight: '800' }}>Zielbetrag in €</Text>
          <TextInput value={target} onChangeText={setTarget} placeholder="500" placeholderTextColor="#9AA79F" style={inputStyle} keyboardType="decimal-pad" />
        </View>

        <View style={{ gap: 7 }}>
          <Text style={{ color: colors.ink, fontSize: 13, fontWeight: '800' }}>Beschreibung (optional)</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Wofür möchtest du sparen?"
            placeholderTextColor="#9AA79F"
            multiline
            style={[inputStyle, { minHeight: 88, paddingTop: 13, textAlignVertical: 'top' }]}
          />
        </View>
      </Card>

      <Card>
        <Text style={{ color: colors.ink, fontSize: 17, fontWeight: '800' }}>Zeitraum</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {presets.map((preset) => (
            <Text
              key={preset.days}
              onPress={() => setDays(preset.days)}
              style={{
                overflow: 'hidden',
                borderRadius: 999,
                paddingHorizontal: 13,
                paddingVertical: 9,
                backgroundColor: days === preset.days ? colors.accent : '#EEF2EF',
                color: days === preset.days ? '#FFFFFF' : colors.muted,
                fontWeight: '800',
              }}
            >
              {preset.label}
            </Text>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={{ color: colors.ink, fontSize: 17, fontWeight: '800' }}>Symbol</Text>
        <View style={{ flexDirection: 'row', gap: 9, flexWrap: 'wrap' }}>
          {['💚', '🎯', '🏖️', '🚗', '🏠', '📱', '🎁', '🛟'].map((item) => (
            <Text
              key={item}
              onPress={() => setEmoji(item)}
              style={{
                width: 48,
                height: 48,
                textAlign: 'center',
                textAlignVertical: 'center',
                lineHeight: 48,
                fontSize: 24,
                borderRadius: 15,
                overflow: 'hidden',
                backgroundColor: emoji === item ? colors.accentSoft : '#F2F5F2',
                borderWidth: emoji === item ? 2 : 0,
                borderColor: colors.accent,
              }}
            >
              {item}
            </Text>
          ))}
        </View>
      </Card>

      <Pill>Privat · nur lokal gespeichert</Pill>
      <PrimaryButton
        title={saving ? 'Wird erstellt …' : 'Challenge erstellen'}
        disabled={!valid || saving}
        onPress={async () => {
          if (!valid) return;
          setSaving(true);
          const id = await createChallenge({
            title: title.trim(),
            description: description.trim() || 'Mein persönliches Sparziel.',
            targetAmount: targetNumber,
            durationDays: days,
            category: 'custom' as ChallengeCategory,
            emoji,
          });
          setSaving(false);
          setTitle('');
          setTarget('');
          setDescription('');
          router.push({ pathname: '/challenge/[id]', params: { id } });
        }}
      />
    </ScrollView>
  );
}
