import { Field } from '@base-ui/react';
import { useFieldContext } from '@/hooks/useAppForm';

interface NumberFieldProps {
  label?: string;
  placeholder?: string;
  description?: string;
  isRequired?: boolean;
}

export function MoneyField({
  label = '',
  placeholder = '',
  description = '',
  isRequired = true,
}: NumberFieldProps) {
  const field = useFieldContext<string>();
  const hasError = field.state.meta.errors.length > 0;
  return (
    <Field.Root className="flex flex-col gap-1">
      {label && <Field.Label className="font-semibold">{label}</Field.Label>}
      <Field.Control
        className="bg-muted-input rounded-sm pl-4 pr-4 pt-2 pb-2 border border-muted-border"
        placeholder={placeholder}
        required={isRequired}
        value={field.state.value}
        onChange={(e) => {
          const val = e.target.value;
          if (/[^0-9.]/.test(val)) return;
          if ((val.match(/\./g) || []).length > 1) return;
          if (/\.\d{3,}/.test(val)) return;
          field.handleChange(val);
        }}
        onBlur={() => {
          const num = parseFloat(field.state.value);
          if (!isNaN(num)) field.handleChange(num.toFixed(2));
          field.handleBlur();
        }}
      />
      {hasError && <Field.Error>{field.state.meta.errors[0]}</Field.Error>}
      {description && <Field.Description>{description}</Field.Description>}
    </Field.Root>
  );
}
