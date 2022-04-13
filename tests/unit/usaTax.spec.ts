import usaTax from '@/validation-rules/usaTax';

const defaultMessage = 'For USA it must be [4 digits]-[3 letters]-[5 or 7 digits]';

describe('USA TAX id', () => {
  it('is valid', () => {
    const fn = usaTax();

    expect(fn('1234-ABC-12345')).toBe('');
    expect(fn('1234-DEF-1234567')).toBe('');
  });

  it('is invalid', () => {
    const fn = usaTax();

    expect(fn('12345-ABC-12345')).toBe(defaultMessage);
    expect(fn('12345-ABC-123456')).toBe(defaultMessage);
    expect(fn('1234-ABC-12345678')).toBe(defaultMessage);
    expect(fn('1234-111-1234567')).toBe(defaultMessage);
    expect(fn('1234-AB-1234567')).toBe(defaultMessage);
  });

  it('has custom message', () => {
    const customMessage = 'Custom message';
    const fn = usaTax(customMessage);

    expect(fn('1234567ABS-AB')).toBe(customMessage);
  });
});
