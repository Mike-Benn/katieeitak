import { Slider, Field } from '@base-ui/react';
import { useFieldContext } from '@/hooks/useAppForm';

interface SliderFieldProps {
  min: number;
  max: number;
  step: number;
  description?: string;
  label?: string;
  minLabel?: string;
  maxLabel?: string;
}

export function SliderField({
  min,
  max,
  step,
  description = '',
  label = '',
  minLabel = '',
  maxLabel = '',
}: SliderFieldProps) {
  const field = useFieldContext<number>();
  const hasError = field.state.meta.errors.length > 0;
  return (
    <Field.Root className="flex flex-col items-center">
      {label && <Field.Label className="font-semibold">{label}</Field.Label>}
      <Slider.Root
        className="flex gap-4"
        min={min}
        max={max}
        step={step}
        value={field.state.value}
        onValueChange={(value) => field.handleChange(value)}
      >
        <span>{minLabel}</span>
        <Slider.Control className="flex gap-4 w-54 touch-none items-center select-none">
          <Slider.Track className="h-1 w-full rounded-sm bg-gray-200 shadow-[inset_0_0_0_1px] shadow-gray-200 select-none">
            <Slider.Indicator className="rounded-sm bg-gray-700 select-none" />
            <Slider.Thumb
              aria-label="Anxiety"
              className="group relative size-4 rounded-full bg-white outline-1 outline-gray-300 select-none data-focus-visible:outline-2 ata-focus-visible:outline-blue-800"
            >
              <Slider.Value
                className="absolute -top-6.75 left-1/2 -translate-x-1/2
                      rounded bg-gray-800 px-1.5 py-0.5 text-xs text-white whitespace-nowrap
                      w-6.5 text-center
                      after:absolute after:content-['']
                      after:left-1/2 after:-translate-x-1/2
                      after:top-full
                      after:border-4 after:border-transparent after:border-t-gray-800
                      opacity-0 transition-opacity duration-200
                      group-hover:opacity-100
                      group-data-dragging:opacity-100
                      group-data-focus-visible:opacity-100
                  "
              />
            </Slider.Thumb>
          </Slider.Track>
        </Slider.Control>
        <span>{maxLabel}</span>
      </Slider.Root>
      {hasError && <Field.Error>{field.state.meta.errors[0]}</Field.Error>}
      {description && <Field.Description>{description}</Field.Description>}
    </Field.Root>
  );
}
