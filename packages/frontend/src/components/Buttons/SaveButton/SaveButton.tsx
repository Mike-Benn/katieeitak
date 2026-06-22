import { Button } from '@base-ui/react';
import { useFormContext } from '@/hooks/useAppForm';

interface SaveButtonProps {
  children: React.ReactNode;
  className: string;
}

export function SaveButton({ children, className }: SaveButtonProps) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => [state.isDefaultValue, state.canSubmit]}>
      {([isDefaultValue, canSubmit]) => (
        <Button
          type="submit"
          onClick={() => void form.handleSubmit()}
          className={className}
          disabled={isDefaultValue || !canSubmit}
        >
          {children}
        </Button>
      )}
    </form.Subscribe>
  );
}
