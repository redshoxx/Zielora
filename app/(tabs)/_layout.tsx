import React from 'react';
import { Tabs } from 'expo-router';
import { BottomTabBar } from '@/src/components/bottom-tab-bar';
import { colors } from '@/src/components/ui';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerShadowVisible: false,
        headerTintColor: colors.ink,
        sceneStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Zielora' }} />
      <Tabs.Screen name="challenges" options={{ title: 'Challenges' }} />
      <Tabs.Screen name="create" options={{ title: 'Neue Challenge' }} />
      <Tabs.Screen name="more" options={{ title: 'Mehr' }} />
    </Tabs>
  );
}
