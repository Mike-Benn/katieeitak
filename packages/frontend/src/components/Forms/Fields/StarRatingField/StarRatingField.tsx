import { Field, Input } from '@base-ui/react';
import { useFieldContext } from '@/hooks/useAppForm';
import { SvgStar } from '@/components/Forms/Fields/StarRatingField/SvgStar';
import { getStarFill } from '@/utils/getStarFill';

interface StarRatingFieldProps {
  label?: string;
  size?: number;
}

export function StarRatingField({ label = undefined, size = 32 }: StarRatingFieldProps) {
  const field = useFieldContext<number | undefined>();
  return (
    <Field.Root>
      {label && <Field.Label className="font-semibold">{label}</Field.Label>}
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <span key={starIndex} className="relative inline-block">
          <SvgStar size={size} fill={getStarFill({ starIndex, currRating: field.state.value })} />
          <label className="absolute left-0 top-0 w-1/2 h-full cursor-pointer">
            <Input
              type="radio"
              name="rating"
              value={starIndex - 0.5}
              className="hidden"
              checked={field.state.value === starIndex - 0.5}
              onValueChange={(value) => field.handleChange(Number(value))}
            />
          </label>

          <label className="absolute right-0 top-0 w-1/2 h-full cursor-pointer">
            <Input
              type="radio"
              name="rating"
              value={starIndex}
              checked={field.state.value === starIndex}
              className="hidden"
              onValueChange={(value) => field.handleChange(Number(value))}
            />
          </label>
        </span>
      ))}
    </Field.Root>
  );
}
