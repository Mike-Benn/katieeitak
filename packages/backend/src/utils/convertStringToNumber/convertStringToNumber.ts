interface ConvertStringToNumberParams {
  str: string | undefined;
}

export function convertStringToNumber({ str = undefined }: ConvertStringToNumberParams) {
  if (!str) {
    return 0;
  }
  const parsedVal = Number(str);
  if (isNaN(parsedVal)) {
    return 0;
  }
  return parsedVal;
}
