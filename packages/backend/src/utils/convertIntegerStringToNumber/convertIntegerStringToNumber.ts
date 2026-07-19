interface ConvertStringToNumberParams {
  str: string | undefined;
}

// Converts a string type number to a number type number
export function convertIntegerStringToNumber({ str = undefined }: ConvertStringToNumberParams) {
  if (!str) {
    return 0;
  }
  if (!/^-?\d+$/.test(str)) {
    return 0;
  }
  const parsedVal = Number(str);
  return parsedVal;
}
