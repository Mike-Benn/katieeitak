import { describe, it, expect } from 'vitest';
import { convertIntegerStringToNumber } from '@/utils/convertIntegerStringToNumber/convertIntegerStringToNumber.js';

describe('convertStringToNumber', () => {
  it('handles undefined', () => {
    expect(convertIntegerStringToNumber({ str: undefined })).toBe(0);
  });

  it('handles non-numbered strings', () => {
    expect(convertIntegerStringToNumber({ str: '12345abc' })).toBe(0);
  });

  it('handles integer strings', () => {
    expect(convertIntegerStringToNumber({ str: '12345' })).toBe(12345);
  });

  it('handled decimal strings', () => {
    expect(convertIntegerStringToNumber({ str: '123.45' })).toBe(0);
  });
});
