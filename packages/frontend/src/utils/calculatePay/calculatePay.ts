import { calculateDifferentialPay } from '@/utils/calculatePay/calculateDifferentialPay';

const BASE_RATE = 46.8;
const WEEKEND_DIFFERENTIAL = 5.5;
const NIGHTSHIFT_DIFFERENTIAL = 5.5;
const HOLIDAY_DIFFERENTIAL = 10;
const TAX_RATE = 0.638;

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
  const regularPay = calculateDifferentialPay({ hours: regularHours, differential: BASE_RATE });
  // OT pay
  const overtimePay = calculateDifferentialPay({
    hours: overtimeHours,
    differential: BASE_RATE * 1.5,
  });
  // NS pay
  const nightshiftPay = calculateDifferentialPay({
    hours: nightshiftHours,
    differential: NIGHTSHIFT_DIFFERENTIAL,
  });
  // Weekend pay
  const weekendPay = calculateDifferentialPay({
    hours: weekendHours,
    differential: WEEKEND_DIFFERENTIAL,
  });
  // Holiday pay
  const holidayPay = calculateDifferentialPay({
    hours: holidayHours,
    differential: HOLIDAY_DIFFERENTIAL,
  });
  //
  const gross = regularPay + overtimePay + nightshiftPay + weekendPay + holidayPay;
  const net = gross * TAX_RATE;

  return {
    net: net.toFixed(2),
    gross: gross.toFixed(2),
  };
}
