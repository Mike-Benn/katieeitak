import type { SelectOption } from '../types/options.js';
export const anxietyEventTypeOptions: SelectOption[] = [
  {
    label: 'Work',
    value: 'work',
  },
  {
    label: 'Restaurant',
    value: 'restaurant',
  },
  {
    label: 'Shopping',
    value: 'shopping',
  },
  {
    label: 'Event',
    value: 'event',
  },
  {
    label: 'Family',
    value: 'family',
  },
  {
    label: 'Friends',
    value: 'friends',
  },
  {
    label: 'Future',
    value: 'future',
  },
] as const;
