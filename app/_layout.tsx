import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { SavingsProvider } from '@/src/context/savings-context';
import { colors } from '@/src/components/ui';

export default function RootLayout() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SavingsProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.bg },
            headerShadowVisible: false,
            headerTintColor: colors.ink,
            contentStyle: { backgroundColor: colors.bg },
            headerBackTitle: 'Zurück',
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="challenge/[id]" options={{ title: 'Challenge' }} />
        </Stack>
      </SavingsProvider>
    </SafeAreaProvider>
  );
}
