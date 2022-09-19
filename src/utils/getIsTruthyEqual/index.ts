type TIsEqualValue = number | undefined | null;

const getIsTruthyEqual = (
  number1: TIsEqualValue,
  number2: TIsEqualValue,
  shouldReturnFalse: boolean,
) => {
  if (shouldReturnFalse) return false;
  return number1 && number2 && number1 === number2;
};

export default getIsTruthyEqual;
