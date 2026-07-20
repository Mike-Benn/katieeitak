interface CalculateDifferentialPayParams {
  hours: string;
  differential: number;
}

export function calculateDifferentialPay({ hours, differential }: CalculateDifferentialPayParams) {
  const parsedHours = Number(hours);
  return isNaN(parsedHours) ? 0 : parsedHours * differential;
}
