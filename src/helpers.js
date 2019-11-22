export const removeCommasFromString = value => {
  return parseFloat(value.toString().replace(/,/g, ''));
};
