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

type EventTypeColor = 'red' | 'brown' | 'silver' | 'wheat' | 'dodgerblue' | 'black' | 'orchid';

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
  const EVENT_COLOR_MAP: Record<AnxietyEventType, EventTypeColor> = {
    work: 'brown',
    health: 'red',
    restaurant: 'silver',
    family: 'wheat',
    friends: 'wheat',
    event: 'orchid',
    bugs: 'black',
    shopping: 'silver',
    future: 'dodgerblue',
  };
  if (!eventType) {
    return <CircleQuestionMark size={size} />;
  } else {
    const Icon = EVENT_ICON_MAP[eventType];
    const color = EVENT_COLOR_MAP[eventType];
    return <Icon size={size} color={color} />;
  }
}
