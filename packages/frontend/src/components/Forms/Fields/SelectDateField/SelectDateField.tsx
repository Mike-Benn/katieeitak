import { Popover, Field } from '@base-ui/react';
import { DayPicker } from 'react-day-picker';
import { CalendarDays } from 'lucide-react';
import { useFieldContext } from '@/hooks/useAppForm';
import { format } from 'date-fns';
import { useState } from 'react';
import { CalendarNav } from './CalendarNav';

interface SelectDateFieldProps {
  label?: string;
  placeholder?: string;
  description?: string;
  isDisabled?: boolean;
}
export function SelectDateField({
  label = '',
  description = '',
  placeholder = undefined,
  isDisabled = false,
}: SelectDateFieldProps) {
  const [open, setOpen] = useState(false);
  const [monthSelected, setMonthSelected] = useState<Date>(new Date());
  const field = useFieldContext<string | undefined>();
  const hasError = field.state.meta.errors.length > 0;
  const dateValue = field.state.value ? new Date(field.state.value) : undefined;
  const displayText: string = dateValue
    ? format(dateValue, 'MMM d, yyyy')
    : (placeholder ?? 'Date');
  return (
    <Field.Root className="flex flex-col gap-1" disabled={isDisabled}>
      {label && <Field.Label className="font-semibold">{label}</Field.Label>}
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          className={`flex flex-row gap-2 w-full border ${hasError ? 'border-red-500' : 'border-muted-border'} bg-muted-input rounded-sm pt-2 pb-2 pl-3 pr-3`}
          disabled={isDisabled}
        >
          <CalendarDays />
          <span>{displayText}</span>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner>
            <Popover.Popup className="bg-muted-input border border-muted-border w-(--anchor-width) flex flex-col gap-4">
              <DayPicker
                showOutsideDays
                month={monthSelected}
                onMonthChange={setMonthSelected}
                mode="single"
                selected={dateValue}
                onSelect={(date) => {
                  if (date) {
                    field.handleChange(date.toISOString());
                    setOpen(false);
                    setMonthSelected(date);
                  }
                }}
                formatters={{
                  formatWeekdayName: (day) => format(day, 'EEEEE'),
                }}
                components={{
                  Nav: () => CalendarNav({ setOpen, setMonthSelected }),
                  MonthCaption: () => <></>,
                }}
                classNames={{
                  month: 'pl-1 pr-1',
                  months: 'flex flex-col gap-4',
                  month_grid: 'w-full h-60',
                  day: 'text-center',
                  outside: 'opacity-30',
                  day_button:
                    'w-8.5 h-8.5 mx-auto flex items-center justify-center rounded-full hover:bg-muted-input/50',
                  selected: '[&>button]:border [&>button]:border-black',
                }}
              />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
      {hasError && (
        <span className="text-red-500 text-sm">{field.state.meta.errors[0].message}</span>
      )}
      {description && <Field.Description>{description}</Field.Description>}
    </Field.Root>
  );
}
