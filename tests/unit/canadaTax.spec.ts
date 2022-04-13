import canadaTax from '@/validation-rules/canadaTax';

const defaultMessage = 'For Canada it must be [10 symbols digits or letters A,B or D]-[2 letters]';

describe('Canada TAX id', () => {
  it('is valid', () => {
    const fn = canadaTax();

    expect(fn('1234567890-AB')).toBe('');
    expect(fn('1234567890-cd')).toBe('');
    expect(fn('ABDABDBDAA-cd')).toBe('');
  });

  it('is invalid', () => {
    const fn = canadaTax();

    expect(fn('1234567ABS-AB')).toBe(defaultMessage);
    expect(fn('ZQWERTYUIO-cd')).toBe(defaultMessage);
    expect(fn('123456-cd')).toBe(defaultMessage);
    expect(fn('1234567890-11')).toBe(defaultMessage);
  });

  it('has custom message', () => {
    const customMessage = 'Custom message';
    const fn = canadaTax(customMessage);

    expect(fn('1234567ABS-AB')).toBe(customMessage);
  });
});
