import type { AnxietyEventType } from '@katieeitak/shared';
import type { LucideIcon } from 'lucide-react';
import {
  Bug,
  HeartPulse,
  BriefcaseBusiness,
  Utensils,
  Tickets,
  UsersRound,
  Handshake,
  ShoppingCart,
  Infinity as Infinitee,
  CircleQuestionMark,
} from 'lucide-react';

interface GetAnxietyEventTypeParams {
  eventType?: AnxietyEventType;
  size: number;
}

export function getAnxietyEventTypeIcon({ eventType, size }: GetAnxietyEventTypeParams) {
  const EVENT_ICON_MAP: Record<AnxietyEventType, LucideIcon> = {
    bugs: Bug,
    health: HeartPulse,
    work: BriefcaseBusiness,
    restaurant: Utensils,
    event: Tickets,
    family: UsersRound,
    friends: Handshake,
    shopping: ShoppingCart,
    future: Infinitee,
  };
  if (!eventType) {
    return <CircleQuestionMark size={14} />;
  } else {
    const Icon = EVENT_ICON_MAP[eventType];
    return <Icon size={size} />;
  }
}
