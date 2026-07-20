interface GetAnxietyEventBorderColorParams {
  anxietyLevel: null | number;
}

export function getAnxietyEventBorderColor({ anxietyLevel }: GetAnxietyEventBorderColorParams) {
  if (anxietyLevel === null) return null;
  if (anxietyLevel < 4) {
    return 'border-green-500';
  }
  if (anxietyLevel < 7) {
    return 'border-amber-400';
  }
  return 'border-red-600';
}
