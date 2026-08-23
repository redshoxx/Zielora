import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { clamp } from '@/src/lib/format';

export const colors = {
  bg: '#F4F7F2',
  card: '#FFFFFF',
  ink: '#12221A',
  muted: '#708076',
  line: '#E2E9E3',
  accent: '#1D7A4A',
  accentSoft: '#DFF3E7',
  nav: '#10261B',
  danger: '#B54545',
  gold: '#C88A20',
};

export function Card({ children, style }: { children: React.ReactNode; style?: object }) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: 24,
          borderCurve: 'continuous',
          padding: 18,
          boxShadow: '0 10px 30px rgba(16, 38, 27, 0.07)',
          gap: 12,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function ProgressBar({ value }: { value: number }) {
  const progress = clamp(value);
  return (
    <View style={{ height: 10, borderRadius: 999, backgroundColor: '#E9EEE9', overflow: 'hidden' }}>
      <View style={{ width: `${progress * 100}%`, height: '100%', borderRadius: 999, backgroundColor: colors.accent }} />
    </View>
  );
}

export function Pill({ children, tone = 'green' }: { children: React.ReactNode; tone?: 'green' | 'neutral' | 'gold' }) {
  const backgroundColor = tone === 'green' ? colors.accentSoft : tone === 'gold' ? '#F9EDD7' : '#EEF1EF';
  const color = tone === 'green' ? colors.accent : tone === 'gold' ? colors.gold : colors.muted;
  return (
    <View style={{ alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor }}>
      <Text style={{ fontSize: 12, fontWeight: '700', color }}>{children}</Text>
    </View>
  );
}

export function PrimaryButton({ title, onPress, disabled = false }: { title: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 52,
        borderRadius: 18,
        borderCurve: 'continuous',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: disabled ? '#AAB7AF' : colors.accent,
        opacity: pressed ? 0.82 : 1,
        paddingHorizontal: 18,
      })}
    >
      <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '800' }}>{title}</Text>
    </Pressable>
  );
}

export function SectionTitle({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <Text style={{ color: colors.ink, fontSize: 20, fontWeight: '800', letterSpacing: -0.4 }}>{title}</Text>
      {action}
    </View>
  );
}
