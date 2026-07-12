import { Button } from '@base-ui/react';
import { useFormContext } from '@/hooks/useAppForm';

interface SaveButtonProps {
  children: React.ReactNode;
  className: string;
}

export function SaveButton({ children, className }: SaveButtonProps) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => [state.canSubmit]}>
      {([canSubmit]) => (
        <Button
          onClick={() => void form.handleSubmit()}
          className={className}
          disabled={!canSubmit}
        >
          {children}
        </Button>
      )}
    </form.Subscribe>
  );
}
