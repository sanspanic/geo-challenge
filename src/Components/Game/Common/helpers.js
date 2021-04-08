const COUNTRIES_LEN = 249;
const SELECTION_LEN = 4;

const getRandInt = (len) => {
  return Math.floor(Math.random() * len);
};

const hasDuplicates = (arr) => {
  return new Set(arr).size !== arr.length;
};

export const makeUniqueSelection = () => {
  let finalSelection = [];
  let selectionIndeces = [];
  while (selectionIndeces < 4 || hasDuplicates(selectionIndeces)) {
    for (let i = 0; i < 4; i++) {
      const num = getRandInt(COUNTRIES_LEN);
      selectionIndeces.push(num);
    }
  }
  console.log("selection:", selectionIndeces);
  finalSelection = selectionIndeces;
  console.log("final", finalSelection);
  return finalSelection;
};

export const pickWinner = (arr) => {
  const randIdx = getRandInt(SELECTION_LEN);
  return arr[randIdx];
};

export const isCorrect = (value1, value2) => {
  return value1 === value2;
};

export const gameLost = (mistakes) => {
  return mistakes.length === 5;
};

export const gameWon = (turn) => {
  return turn === 20;
};

export const nextLevel = (turn) => {
  return turn % 20 === 0;
};
