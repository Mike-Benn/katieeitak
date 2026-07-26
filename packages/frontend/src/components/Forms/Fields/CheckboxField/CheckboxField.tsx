import { useFieldContext } from '@/hooks/useAppForm';
import { Checkbox, Field } from '@base-ui/react';

interface CheckboxFieldProps {
  label: string;
  isDisabled?: boolean;
}

export function CheckboxField({ label, isDisabled = false }: CheckboxFieldProps) {
  const field = useFieldContext<boolean>();

  return (
    <Field.Root className="flex items-center gap-2">
      <Checkbox.Root
        disabled={isDisabled}
        checked={field.state.value}
        onCheckedChange={() => field.handleChange(!field.state.value)}
        className="flex size-4 shrink-0 items-center justify-center border rounded-sm p-2 border-neutral-950 bg-white text-white data-checked:bg-neutral-950 data-checked:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
      >
        <Checkbox.Indicator className="flex data-unchecked:hidden">
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {label && (
        <Field.Label className={`${field.state.value && 'font-semibold'}`}>{label}</Field.Label>
      )}
    </Field.Root>
  );
}

function CheckIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      {...props}
      style={{ display: 'block', ...props.style }}
    >
      <path d="m2.5 8.5 4 4 7-9" />
    </svg>
  );
}
