import { useFormContext } from '@/hooks/useAppForm';
import { Button } from '@base-ui/react';

interface SubscribeButtonProps {
  buttonText: string;
  bgColor?: string;
  textColor?: string;
}

export function SubscribeButton({ buttonText, bgColor, textColor }: SubscribeButtonProps) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isDefaultValue}>
      {(isDefaultValue) => (
        <Button
          disabled={isDefaultValue}
          className={`inline-block border border-muted-border ${bgColor ? bgColor : 'bg-muted-input'} rounded-md font-semibold pt-2 pb-2 pl-3 pr-3 disabled:opacity-50 ${textColor}`}
        >
          {buttonText}
        </Button>
      )}
    </form.Subscribe>
  );
}
