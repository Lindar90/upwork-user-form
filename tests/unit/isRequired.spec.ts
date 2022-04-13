import isRequired from '@/validation-rules/isRequired';

describe('Is required validation', () => {
  it('is valid', () => {
    const fn = isRequired();

    expect(fn('not empty')).toBe('');
  });

  it('is invalid', () => {
    const fn = isRequired();

    expect(fn('')).toBe('Value is required');
  });

  it('has custom message', () => {
    const customMessage = 'Custom message';
    const fn = isRequired(customMessage);

    expect(fn('')).toBe(customMessage);
  });
});
