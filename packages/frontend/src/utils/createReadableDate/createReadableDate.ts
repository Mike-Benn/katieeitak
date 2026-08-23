import { isValid, format, parseISO } from 'date-fns';

interface CreateReadableDateParams {
  dateString: string | null | undefined;
  dateStyle: 'MM/dd/yy';
}

export function createReadableDate({ dateString, dateStyle }: CreateReadableDateParams) {
  if (!dateString) {
    return 'Unknown';
  }
  const parsedDateString = parseISO(dateString);
  return isValid(parsedDateString) ? format(parsedDateString, dateStyle) : 'Unknown';
}
