const COUNTRIES_LEN = 249;

const getRandInt = () => {
  return Math.floor(Math.random() * COUNTRIES_LEN);
};

const hasDuplicates = (arr) => {
  return new Set(arr).size !== arr.length;
};

export const makeUniqueSelection = () => {
  let finalSelection = [];
  let selectionIndeces = [];
  while (selectionIndeces < 4 || hasDuplicates(selectionIndeces)) {
    for (let i = 0; i < 4; i++) {
      const num = getRandInt();
      selectionIndeces.push(num);
    }
  }
  console.log("selection:", selectionIndeces);
  finalSelection = selectionIndeces;
  console.log("final", finalSelection);
  return finalSelection;
};
