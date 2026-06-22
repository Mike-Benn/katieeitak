interface GetStarFillParams {
  starIndex: number;
  currRating: number | undefined;
}
type StarFill = '#f5a623' | 'url(#half-fill)' | 'transparent';

export function getStarFill({ starIndex, currRating }: GetStarFillParams): StarFill {
  if (currRating) {
    if (currRating >= starIndex) return '#f5a623';
    if (currRating >= starIndex - 0.5) return 'url(#half-fill)';
  }
  return 'transparent';
}
