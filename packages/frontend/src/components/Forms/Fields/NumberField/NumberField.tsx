import { Field } from '@base-ui/react';
import { useFieldContext } from '@/hooks/useAppForm';

interface NumberFieldProps {
  label?: string;
  placeholder?: string;
  description?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}

export function NumberField({
  label = '',
  placeholder = '',
  description = '',
  isRequired = true,
  isDisabled = false,
}: NumberFieldProps) {
  const field = useFieldContext<string>();
  const hasError = field.state.meta.errors.length > 0;
  return (
    <Field.Root className="flex flex-col gap-1" disabled={isDisabled}>
      {label && <Field.Label className="font-semibold">{label}</Field.Label>}
      <Field.Control
        className="bg-muted-input rounded-sm pl-3 pr-3 pt-2 pb-2 border border-muted-border"
        placeholder={placeholder}
        required={isRequired}
        value={field.state.value}
        onChange={(e) => {
          const val = e.target.value.replace(/[^0-9]/g, '');
          field.handleChange(val);
        }}
      />
      {hasError && <Field.Error>{field.state.meta.errors[0]}</Field.Error>}
      {description && <Field.Description>{description}</Field.Description>}
    </Field.Root>
  );
}
