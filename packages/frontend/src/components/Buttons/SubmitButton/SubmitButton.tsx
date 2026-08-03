import { Button } from '@base-ui/react';
import { useFormContext } from '@/hooks/useAppForm';

interface SubmitButtonProps {
  buttonText: string;
  className?: string;
  isPending: boolean;
}

export function SubmitButton({ buttonText, className, isPending }: SubmitButtonProps) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => [state.isDefaultValue]}>
      {([isDefaultValue]) => (
        <Button
          type="submit"
          disabled={isDefaultValue || isPending}
          className={`text-sm rounded-sm px-3 py-1 ${className}`}
        >
          {buttonText}
        </Button>
      )}
    </form.Subscribe>
  );
}
