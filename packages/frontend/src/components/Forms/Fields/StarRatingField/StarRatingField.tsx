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
  const hasError = field.state.meta.errors.length > 0;
  return (
    <Field.Root>
      {label && <Field.Label className="font-semibold">{label}</Field.Label>}
      {[2, 4, 6, 8, 10].map((starIndex) => (
        <span key={starIndex} className="relative inline-block">
          <SvgStar size={size} fill={getStarFill({ starIndex, currRating: field.state.value })} />
          <label className="absolute left-0 top-0 w-1/2 h-full cursor-pointer">
            <Input
              type="radio"
              name="rating"
              value={starIndex - 1}
              className="hidden"
              checked={field.state.value === starIndex - 1}
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
      <div className="min-h-5">
        {hasError && (
          <p className="text-sm text-red-500 text-center">
            {field.state.meta.errors[0]?.message ?? field.state.meta.errors[0]}
          </p>
        )}
      </div>
    </Field.Root>
  );
}
