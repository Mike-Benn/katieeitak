import { ChevronLeft, ChevronRight, CalendarSync } from 'lucide-react';
import { useDayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { useFieldContext } from '@/hooks/useAppForm';

interface CalendarNavProps {
  setOpen: (open: boolean) => void;
  setMonthSelected: (date: Date) => void;
}

export function CalendarNav({ setOpen, setMonthSelected }: CalendarNavProps) {
  const { months, previousMonth, nextMonth, goToMonth } = useDayPicker();
  const currMonth = months[0];
  const field = useFieldContext<Date | undefined>();

  return (
    <nav className="flex flex-row items-center justify-between pt-4">
      <button onClick={() => previousMonth && goToMonth(previousMonth)}>
        <ChevronLeft />
      </button>
      <div className="flex flex-row gap-3">
        <span>{format(currMonth.date, 'MMMM yyyy')}</span>
        <button
          onClick={() => {
            const today = new Date();
            field.handleChange(today);
            setMonthSelected(today);
            setOpen(false);
          }}
        >
          <CalendarSync />
        </button>
      </div>
      <button onClick={() => nextMonth && goToMonth(nextMonth)}>
        <ChevronRight />
      </button>
    </nav>
  );
}
