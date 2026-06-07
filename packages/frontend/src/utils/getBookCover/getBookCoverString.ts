interface GetBookCoverStringParams {
  cover_i: number;
  size: 'S' | 'M' | 'L';
}

export function getBookCoverString({ cover_i, size }: GetBookCoverStringParams) {
  return `https://covers.openlibrary.org/b/id/${cover_i}-${size}.jpg`;
}
