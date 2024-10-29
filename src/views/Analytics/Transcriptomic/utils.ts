export const formatPadj = (value: number): string => {
  const valueString = value.toString();
  const exponentIndex = valueString.indexOf('e');
  if (exponentIndex != -1) {
    const splitString = valueString.split('e-');
    return `${splitString[0]}e-${splitString[1].substring(0, 2)}`;
  }
  return value?.toFixed(3);
};
