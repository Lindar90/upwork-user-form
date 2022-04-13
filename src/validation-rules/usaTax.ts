const usaTax = (
  message = 'For USA it must be [4 digits]-[3 letters]-[5 or 7 digits]',
) => (
  value: string,
) => (!/^\d{4}-[a-zA-Z]{3}-(\d{5}|\d{7})$/.test(value) ? message : '');

export default usaTax;
