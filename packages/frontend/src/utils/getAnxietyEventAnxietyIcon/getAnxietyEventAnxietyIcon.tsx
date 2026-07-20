import { CircleQuestionMark, Star, Ghost, TriangleAlert } from 'lucide-react';

interface GetAnxietyEventAnxietyIconParams {
  anxietyLevel: number | null;
  size: number;
}

export function getAnxietyEventAnxietyIcon({
  anxietyLevel,
  size,
}: GetAnxietyEventAnxietyIconParams) {
  if (anxietyLevel === null) return <CircleQuestionMark size={size} />;
  if (anxietyLevel < 4) return <Star size={size} />;
  if (anxietyLevel < 7) return <TriangleAlert size={size} />;
  return <Ghost size={size} />;
}
