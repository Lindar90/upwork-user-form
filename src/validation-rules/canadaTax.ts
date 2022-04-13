// TODO I'm not sure that I understood the requirements correctly
// It's implemented for the following for numbers:
// - 1234567890-DF
// - ABDABDABDA-ZX

const canadaTax = (
  message = 'For Canada it must be [10 symbols digits or letters A,B or D]-[2 letters]',
) => (
  value: string,
) => (!/^(\d{10}|[ABD]{10})-[a-zA-Z]{2}$/.test(value) ? message : '');

export default canadaTax;
