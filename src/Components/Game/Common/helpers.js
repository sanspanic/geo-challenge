const COUNTRIES_LEN = 249;
const SELECTION_LEN = 4;
const NUM_OF_TURNS = 5;
const NUM_OF_LEVELS = 2;
export const MAX_SCORE = NUM_OF_TURNS * NUM_OF_LEVELS * 150;

const getRandInt = (len) => {
  return Math.floor(Math.random() * len);
};

const hasDuplicates = (arr) => {
  return new Set(arr).size !== arr.length;
};

export const getPercentile = (score) => {
  return (score / MAX_SCORE) * 100;
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
  return mistakes === 0;
};

export const gameWon = (turn) => {
  return turn === NUM_OF_TURNS;
};

export const nextLevel = (turn) => {
  return turn % NUM_OF_TURNS === 0;
};
