import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { suggestedChallenges } from '@/src/data/suggested-challenges';
import {
  ChallengeCategory,
  SavingsChallenge,
  SavingsState,
} from '@/src/types/savings';
import {
  clearSavingsState,
  defaultSavingsState,
  loadSavingsState,
  saveSavingsState,
} from '@/src/lib/storage';

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

type CreateChallengeInput = {
  title: string;
  description: string;
  targetAmount: number;
  durationDays: number;
  category: ChallengeCategory;
  emoji: string;
};

type SavingsContextValue = SavingsState & {
  hydrated: boolean;
  activateSuggested: (templateId: string) => Promise<string | null>;
  createChallenge: (input: CreateChallengeInput) => Promise<string>;
  addContribution: (challengeId: string, amount: number, note?: string) => Promise<void>;
  deleteChallenge: (challengeId: string) => Promise<void>;
  setHapticsEnabled: (value: boolean) => Promise<void>;
  resetAll: () => Promise<void>;
};

export const SavingsContext = createContext<SavingsContextValue | null>(null);

export function SavingsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SavingsState>(defaultSavingsState);
  const stateRef = useRef<SavingsState>(defaultSavingsState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    loadSavingsState().then((next) => {
      stateRef.current = next;
      setState(next);
      setHydrated(true);
    });
  }, []);

  const commit = useCallback(async (updater: (current: SavingsState) => SavingsState) => {
    const nextState = updater(stateRef.current);
    stateRef.current = nextState;
    setState(nextState);
    await saveSavingsState(nextState);
  }, []);

  const tap = useCallback(async (kind: 'light' | 'success' = 'light') => {
    if (!stateRef.current.hapticsEnabled || process.env.EXPO_OS !== 'ios') return;
    if (kind === 'success') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return;
    }
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const activateSuggested = useCallback(async (templateId: string) => {
    const template = suggestedChallenges.find((item) => item.id === templateId);
    if (!template) return null;

    const existing = stateRef.current.challenges.find((item) => item.templateId === templateId);
    if (existing) return existing.id;

    const id = makeId();
    const challenge: SavingsChallenge = {
      ...template,
      id,
      templateId: template.id,
      source: 'suggested',
      createdAt: new Date().toISOString(),
      contributions: [],
    };

    await commit((current) => ({
      ...current,
      challenges: [challenge, ...current.challenges],
    }));
    await tap('success');
    return id;
  }, [commit, tap]);

  const createChallenge = useCallback(async (input: CreateChallengeInput) => {
    const id = makeId();
    const challenge: SavingsChallenge = {
      id,
      ...input,
      source: 'custom',
      createdAt: new Date().toISOString(),
      contributions: [],
    };
    await commit((current) => ({
      ...current,
      challenges: [challenge, ...current.challenges],
    }));
    await tap('success');
    return id;
  }, [commit, tap]);

  const addContribution = useCallback(async (challengeId: string, amount: number, note?: string) => {
    if (!Number.isFinite(amount) || amount <= 0) return;
    await commit((current) => ({
      ...current,
      challenges: current.challenges.map((challenge) =>
        challenge.id === challengeId
          ? {
              ...challenge,
              contributions: [
                {
                  id: makeId(),
                  amount,
                  note: note?.trim() || undefined,
                  createdAt: new Date().toISOString(),
                },
                ...challenge.contributions,
              ],
            }
          : challenge,
      ),
    }));
    await tap('success');
  }, [commit, tap]);

  const deleteChallenge = useCallback(async (challengeId: string) => {
    await commit((current) => ({
      ...current,
      challenges: current.challenges.filter((challenge) => challenge.id !== challengeId),
    }));
    await tap();
  }, [commit, tap]);

  const setHapticsEnabled = useCallback(async (value: boolean) => {
    await commit((current) => ({ ...current, hapticsEnabled: value }));
  }, [commit]);

  const resetAll = useCallback(async () => {
    await clearSavingsState();
    stateRef.current = defaultSavingsState;
    setState(defaultSavingsState);
    await tap();
  }, [tap]);

  const value = useMemo<SavingsContextValue>(() => ({
    ...state,
    hydrated,
    activateSuggested,
    createChallenge,
    addContribution,
    deleteChallenge,
    setHapticsEnabled,
    resetAll,
  }), [
    state,
    hydrated,
    activateSuggested,
    createChallenge,
    addContribution,
    deleteChallenge,
    setHapticsEnabled,
    resetAll,
  ]);

  return <SavingsContext.Provider value={value}>{children}</SavingsContext.Provider>;
}

export function useSavings() {
  const context = React.use(SavingsContext);
  if (!context) throw new Error('useSavings must be used inside SavingsProvider');
  return context;
}
