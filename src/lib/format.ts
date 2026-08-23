export function formatMoney(value: number) {
  return new Intl.NumberFormat('de-AT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

export function challengeSavedAmount(contributions: { amount: number }[]) {
  return contributions.reduce((sum, item) => sum + item.amount, 0);
}

export function remainingDays(createdAt: string, durationDays: number) {
  const start = new Date(createdAt).getTime();
  const end = start + durationDays * 86_400_000;
  return Math.max(0, Math.ceil((end - Date.now()) / 86_400_000));
}
