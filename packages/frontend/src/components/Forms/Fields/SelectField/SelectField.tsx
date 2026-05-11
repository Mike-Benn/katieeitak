import { Check, ChevronDown } from 'lucide-react';
import { Select, Field } from '@base-ui/react';
import { useFieldContext } from '@/hooks/useAppForm';
import type { SelectOption } from '@katieeitak/shared';

interface SelectFieldProps {
  items: readonly SelectOption[];
  description?: string;
  label?: string;
  isRequired?: boolean;
}

export function SelectField({
  items,
  description = '',
  label = '',
  isRequired = true,
}: SelectFieldProps) {
  const field = useFieldContext<string>();
  const hasError = field.state.meta.errors.length > 0;
  return (
    <Field.Root className="flex flex-col gap-1">
      {label && <Field.Label className="font-semibold">{label}</Field.Label>}
      <Select.Root
        items={items}
        value={field.state.value}
        onValueChange={(value) => field.handleChange(value ?? '')}
        required={isRequired}
      >
        <Select.Trigger className="flex justify-between w-full rounded-sm border border-muted-border bg-muted-input select-none pt-2 pb-2 pl-3 pr-3">
          <Select.Value placeholder="Select type" className="data-placeholder:opacity-60" />
          <Select.Icon>
            <ChevronDown />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner className="select-none z-10" alignItemWithTrigger={false}>
            <Select.Popup className="group min-w-(--anchor-width) origin-(--transform-origin) bg-clip-padding border border-muted-border rounded-sm bg-[canvas] shadow-lg shadow-gray-200 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0">
              <Select.List className="relative py-1 scroll-py-6 overflow-y-auto max-h-(--available-height)">
                {items.map((item) => (
                  <Select.Item
                    key={item.label}
                    value={item.value}
                    className="grid cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 leading-4 select-none data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-highlighted:before:bg-gray-900"
                  >
                    <Select.ItemIndicator className="col-start-1">
                      <Check size={16} />
                    </Select.ItemIndicator>
                    <Select.ItemText className="col-start-2">{item.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
      {hasError && <Field.Error>{field.state.meta.errors[0]}</Field.Error>}
      {description && <Field.Description>{description}</Field.Description>}
    </Field.Root>
  );
}
