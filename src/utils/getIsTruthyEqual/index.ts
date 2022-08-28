type TIsEqualValue = number | undefined | null;

const getIsTruthyEqual = (number1: TIsEqualValue, number2: TIsEqualValue) => {
  return number1 && number2 && number1 === number2;
};

export default getIsTruthyEqual;
