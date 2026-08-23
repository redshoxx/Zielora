import React from 'react';
import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/src/components/ui';

const meta: Record<string, { label: string; icon: string; activeIcon: string }> = {
  index: { label: 'Übersicht', icon: 'sf:house', activeIcon: 'sf:house.fill' },
  challenges: { label: 'Challenges', icon: 'sf:flag', activeIcon: 'sf:flag.fill' },
  create: { label: 'Neu', icon: 'sf:plus.circle', activeIcon: 'sf:plus.circle.fill' },
  more: { label: 'Mehr', icon: 'sf:ellipsis.circle', activeIcon: 'sf:ellipsis.circle.fill' },
};

export function BottomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 14, paddingBottom: Math.max(8, insets.bottom) }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.nav,
          borderRadius: 28,
          borderCurve: 'continuous',
          padding: 7,
          boxShadow: '0 14px 35px rgba(12, 34, 23, 0.28)',
        }}
      >
        {state.routes.map((route: any, index: number) => {
          const focused = state.index === index;
          const item = meta[route.name] ?? { label: route.name, icon: 'sf:circle', activeIcon: 'sf:circle.fill' };

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={descriptors[route.key]?.options?.tabBarAccessibilityLabel}
              onPress={onPress}
              style={({ pressed }) => ({
                flex: 1,
                minHeight: 54,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                borderRadius: 21,
                backgroundColor: focused ? '#E8F5EC' : 'transparent',
                opacity: pressed ? 0.72 : 1,
              })}
            >
              <Image source={focused ? item.activeIcon : item.icon} style={{ width: 21, height: 21, tintColor: focused ? colors.accent : '#CFD9D2' }} />
              <Text style={{ fontSize: 10.5, fontWeight: '800', color: focused ? colors.accent : '#CFD9D2' }}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
