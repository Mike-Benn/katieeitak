import { Smile, Frown, Meh, CircleQuestionMark } from 'lucide-react';

interface GetAnxietyEventExcitementIconParams {
  excitementLevel: number | null;
  size: number;
}

export function getAnxietyEventExcitementIcon({
  excitementLevel,
  size,
}: GetAnxietyEventExcitementIconParams) {
  if (!excitementLevel) return <CircleQuestionMark size={size} />;
  if (excitementLevel < 4) return <Frown size={size} />;
  if (excitementLevel < 7) return <Meh size={size} />;
  return <Smile size={size} />;
}
