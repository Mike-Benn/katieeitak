import { Slider } from '@base-ui/react';
import { useFieldContext } from '@/hooks/useAppForm';
export function SliderField() {
  const field = useFieldContext<number>();

  return (
    <Slider.Root
      min={0}
      max={10}
      step={1}
      value={field.state.value}
      onValueChange={(value) => field.handleChange(value)}
    >
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator />
          <Slider.Thumb aria-label="Anxiety" />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}
