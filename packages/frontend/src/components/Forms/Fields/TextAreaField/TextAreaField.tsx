import { useFieldContext } from '@/hooks/useAppForm';
import { Field, Input } from '@base-ui/react';

interface TextAreaFieldProps {
  label?: string;
  placeholder?: string;
  description?: string;
  isRequired?: boolean;
}

export function TextAreaField({
  label = '',
  placeholder = '',
  description = '',
  isRequired = true,
}: TextAreaFieldProps) {
  const field = useFieldContext<string>();
  const hasError = field.state.meta.errors.length > 0;
  return (
    <Field.Root className="flex flex-col gap-1">
      {label && <Field.Label className="font-semibold">{label}</Field.Label>}
      <Input
        placeholder={placeholder}
        required={isRequired}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="min-h-25 border border-muted-border rounded-sm bg-muted-input pl-3 pr-3 pt-2 pb-2"
        render={<textarea />}
        maxLength={300}
      />
      {hasError && <Field.Error>{field.state.meta.errors[0]}</Field.Error>}
      {description && <Field.Description>{description}</Field.Description>}
    </Field.Root>
  );
}
