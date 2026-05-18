import { useFieldContext } from '@/hooks/useAppForm';
import { Field, Input } from '@base-ui/react';

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  description?: string;
  maxLength?: number;
  isDisabled?: boolean;
}

export function TextField({
  label = '',
  placeholder = '',
  description = '',
  maxLength,
  isDisabled = false,
}: TextFieldProps) {
  const field = useFieldContext<string>();
  const hasError = field.state.meta.errors.length > 0;

  return (
    <Field.Root className="flex flex-col gap-1" disabled={isDisabled}>
      {label && <Field.Label className="font-semibold">{label}</Field.Label>}
      <Input
        placeholder={placeholder}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="border border-muted-border rounded-sm bg-muted-input pl-3 pr-3 pt-2 pb-2"
        type="text"
        maxLength={maxLength}
      />
      {hasError && (
        <span className="text-red-500 text-sm">{field.state.meta.errors[0].message}</span>
      )}
      {description && <Field.Description>{description}</Field.Description>}
    </Field.Root>
  );
}
