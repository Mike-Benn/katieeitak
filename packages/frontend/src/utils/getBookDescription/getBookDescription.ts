interface GetBookDescriptionParams {
  description: string | { type: string; value: string };
}

export function getBookDescription({ description }: GetBookDescriptionParams) {
  if (typeof description === 'string') {
    return description;
  } else {
    return description.value;
  }
}
