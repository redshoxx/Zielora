import Storage from 'expo-sqlite/kv-store';
import { SavingsState } from '@/src/types/savings';

const STORAGE_KEY = 'zielora.state.v1';

export const defaultSavingsState: SavingsState = {
  challenges: [],
  hapticsEnabled: true,
};

export async function loadSavingsState(): Promise<SavingsState> {
  try {
    const raw = await Storage.getItem(STORAGE_KEY);
    if (!raw) return defaultSavingsState;
    const parsed = JSON.parse(raw) as Partial<SavingsState>;
    return {
      challenges: Array.isArray(parsed.challenges) ? parsed.challenges : [],
      hapticsEnabled: parsed.hapticsEnabled ?? true,
    };
  } catch {
    return defaultSavingsState;
  }
}

export async function saveSavingsState(state: SavingsState) {
  await Storage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export async function clearSavingsState() {
  await Storage.removeItem(STORAGE_KEY);
}
