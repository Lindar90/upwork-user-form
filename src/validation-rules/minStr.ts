const minStr = (
  min: number,
  message = 'Value must contain more then $min characters.',
) => (value: string) => {
  if (value.length < min) {
    return message.replace('$min', min.toString());
  }

  return '';
};

export default minStr;
