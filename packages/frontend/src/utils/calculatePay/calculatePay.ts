const BASE_RATE = 46.1;
const WEEKEND_DIFFERENTIAL = 5;
const NIGHTSHIFT_DIFFERENTIAL = 4.5;
const HOLIDAY_DIFFERENTIAL = 10;
const TAX_RATE = 0.65;

interface CalculatePayParams {
  regularHours: string;
  overtimeHours: string;
  nightshiftHours: string;
  weekendHours: string;
  holidayHours: string;
}

export function calculatePay({
  regularHours,
  overtimeHours,
  nightshiftHours,
  weekendHours,
  holidayHours,
}: CalculatePayParams) {
  // Reg pay
  const parsedRegHours = Number(regularHours);
  const regularPay = isNaN(parsedRegHours) ? 0 : parsedRegHours * BASE_RATE;
  // OT pay
  const parsedOvertimeHours = Number(overtimeHours);
  const overtimePay = isNaN(parsedOvertimeHours) ? 0 : parsedOvertimeHours * BASE_RATE * 1.5;
  // NS pay
  const parsedNightshiftHours = Number(nightshiftHours);
  const nightshiftPay = isNaN(parsedNightshiftHours)
    ? 0
    : parsedNightshiftHours * NIGHTSHIFT_DIFFERENTIAL;
  // Weekend pay
  const parsedWeekendHours = Number(weekendHours);
  const weekendPay = isNaN(parsedWeekendHours) ? 0 : parsedWeekendHours * WEEKEND_DIFFERENTIAL;
  // Holiday pay
  const parsedHolidayHours = Number(holidayHours);
  const holidayPay = isNaN(parsedHolidayHours) ? 0 : parsedHolidayHours * HOLIDAY_DIFFERENTIAL;

  const gross = regularPay + overtimePay + nightshiftPay + weekendPay + holidayPay;
  const net = (gross * TAX_RATE).toFixed(2);

  return {
    net,
    gross: gross.toFixed(2),
  };
}
