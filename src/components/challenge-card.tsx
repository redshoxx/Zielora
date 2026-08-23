import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Card, colors, Pill, ProgressBar } from '@/src/components/ui';
import { challengeSavedAmount, formatMoney, remainingDays } from '@/src/lib/format';
import type { SavingsChallenge } from '@/src/types/savings';

export function ChallengeCard({ challenge }: { challenge: SavingsChallenge }) {
  const saved = challengeSavedAmount(challenge.contributions);
  const progress = challenge.targetAmount > 0 ? saved / challenge.targetAmount : 0;
  const days = remainingDays(challenge.createdAt, challenge.durationDays);

  return (
    <Link href={{ pathname: '/challenge/[id]', params: { id: challenge.id } }} asChild>
      <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.82 : 1 })}>
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
            <View style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: colors.accentSoft, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 25 }}>{challenge.emoji}</Text>
            </View>
            <View style={{ flex: 1, gap: 5 }}>
              <Text style={{ color: colors.ink, fontSize: 17, fontWeight: '800' }}>{challenge.title}</Text>
              <Text style={{ color: colors.muted, fontSize: 13.5, lineHeight: 19 }} numberOfLines={2}>{challenge.description}</Text>
            </View>
          </View>

          <ProgressBar value={progress} />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <View>
              <Text style={{ color: colors.ink, fontSize: 15, fontWeight: '800', fontVariant: ['tabular-nums'] }}>{formatMoney(saved)}</Text>
              <Text style={{ color: colors.muted, fontSize: 12 }}>von {formatMoney(challenge.targetAmount)}</Text>
            </View>
            <Pill tone={days === 0 ? 'gold' : 'neutral'}>{days === 0 ? 'Zeitraum vorbei' : `${days} Tage`}</Pill>
          </View>
        </Card>
      </Pressable>
    </Link>
  );
}
