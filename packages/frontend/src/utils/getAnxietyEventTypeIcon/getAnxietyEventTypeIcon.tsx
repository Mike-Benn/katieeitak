import type { AnxietyEventType } from '@katieeitak/shared';
import type { LucideIcon } from 'lucide-react';
import {
  Bug,
  Hospital,
  Briefcase,
  ChefHat,
  Tickets,
  Heart,
  Handshake,
  ShoppingCart,
  Atom,
  CircleQuestionMark,
} from 'lucide-react';

interface GetAnxietyEventTypeParams {
  eventType?: AnxietyEventType;
}

export function getAnxietyEventTypeIcon({ eventType }: GetAnxietyEventTypeParams) {
  const EVENT_ICON_MAP: Record<AnxietyEventType, LucideIcon> = {
    bugs: Bug,
    health: Hospital,
    work: Briefcase,
    restaurant: ChefHat,
    event: Tickets,
    family: Heart,
    friends: Handshake,
    shopping: ShoppingCart,
    future: Atom,
  };
  if (!eventType) {
    return <CircleQuestionMark size={14} />;
  } else {
    const Icon = EVENT_ICON_MAP[eventType];
    return <Icon size={14} />;
  }
}
