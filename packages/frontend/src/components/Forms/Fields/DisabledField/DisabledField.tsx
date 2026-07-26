import { Field } from '@base-ui/react';
interface DisabledFieldProps {
  label?: string;
  description?: string;
  value: string;
  className?: string;
}

export function DisabledField({
  label = '',
  description = '',
  value = '',
  className = '',
}: DisabledFieldProps) {
  return (
    <Field.Root className={`flex flex-col gap-1 ${className}`}>
      {label && <Field.Label className="font-semibold">{label}</Field.Label>}
      <Field.Control
        disabled
        value={value}
        className="bg-muted-input rounded-sm pl-4 pr-4 pt-2 pb-2 border border-muted-border text-gray-400"
      />
      {description && <Field.Description>{description}</Field.Description>}
    </Field.Root>
  );
}
