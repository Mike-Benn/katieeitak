import { isValid, format, parseISO } from 'date-fns';

interface CreateReadableDateParams {
  dateString: string | null | undefined;
  dateStyle: 'MM/dd/yy';
  altText?: string;
}

export function createReadableDate({
  dateString,
  dateStyle,
  altText = 'Unknown',
}: CreateReadableDateParams) {
  if (!dateString) {
    return altText;
  }
  const parsedDateString = parseISO(dateString);
  return isValid(parsedDateString) ? format(parsedDateString, dateStyle) : altText;
}
