import { Button } from '@base-ui/react';
import { useFormContext } from '@/hooks/useAppForm';

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  isPending: boolean;
}

export function SubmitButton({ children, className, isPending }: SubmitButtonProps) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => [state.isDefaultValue]}>
      {([isDefaultValue]) => (
        <Button
          type="submit"
          disabled={isDefaultValue || isPending}
          className={`rounded-sm px-3 py-1 ${className}`}
          onClick={() => void form.handleSubmit()}
        >
          {children}
        </Button>
      )}
    </form.Subscribe>
  );
}
