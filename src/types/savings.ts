export type ChallengeCategory = 'daily' | 'weekly' | 'goal' | 'habit' | 'custom';

export type Contribution = {
  id: string;
  amount: number;
  note?: string;
  createdAt: string;
};

export type SavingsChallenge = {
  id: string;
  templateId?: string;
  title: string;
  description: string;
  targetAmount: number;
  durationDays: number;
  category: ChallengeCategory;
  emoji: string;
  source: 'suggested' | 'custom';
  createdAt: string;
  contributions: Contribution[];
};

export type ChallengeTemplate = Omit<
  SavingsChallenge,
  'id' | 'templateId' | 'createdAt' | 'contributions' | 'source'
> & {
  id: string;
};

export type SavingsState = {
  challenges: SavingsChallenge[];
  hapticsEnabled: boolean;
};
