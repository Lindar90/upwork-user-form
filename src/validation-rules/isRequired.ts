const isRequired = (message = 'Value is required') => (value?: string) => (!value ? message : '');

export default isRequired;
