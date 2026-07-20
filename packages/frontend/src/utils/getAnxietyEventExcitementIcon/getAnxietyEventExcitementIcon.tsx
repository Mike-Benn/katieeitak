import { Smile, Frown, Meh, CircleQuestionMark } from 'lucide-react';

interface GetAnxietyEventExcitementIconParams {
  excitementLevel: number | null;
  size: number;
  status: 'pre' | 'post';
}

export function getAnxietyEventExcitementIcon({
  excitementLevel,
  size,
  status,
}: GetAnxietyEventExcitementIconParams) {
  if (excitementLevel === null) return <CircleQuestionMark size={size} />;
  if (excitementLevel < 4)
    return <Frown size={size} color={status === 'pre' ? 'black' : '#dc2626'} />;
  if (excitementLevel < 7)
    return <Meh size={size} color={status === 'pre' ? 'black' : '#fbbf24'} />;
  return <Smile size={size} color={status === 'pre' ? 'black' : '#22c55e'} />;
}
