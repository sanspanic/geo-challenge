const COUNTRIES_LEN = 249;
const SELECTION_LEN = 4;
const NUM_OF_TURNS = 15;
const NUM_OF_LEVELS = 2;
export const MAX_SCORE = NUM_OF_TURNS * NUM_OF_LEVELS * 150 + 250;

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

//must be arr to pass in as react child
export const ranks = [
  {
    1: {
      description: `Geographically speaking, you are not the sharpest tool in the shed. At
    any given moment in time, you are likely to be lost and actively
    searching for an exit door.`,
      name: "Loser",
    },
    2: {
      name: "Lost in Forest",
      description: `You are walking around a dark spooky forest, hopelessly lost. The twigs creak beneath your steps as you wonder whether you will ever see your loved ones again. Given your subpar sense of direction, you will likely not.`,
    },
    3: {
      name: "Sat-Nav-Dependant",
      description: `Ouch. You are not very good at this. You rarely leave your home without your phone and are navigationally challenged, frequently getting lost in- as well as outdoors. As a child, you were scared of supermarkets because they meant having to endure strangers shouting "if you lost your kid please come to the counter" into a radio.`,
    },
    4: {
      name: "Franklin",
      description: `You are an adventurous explorer with a soft spot for the Arctic. However, you're not as good at Geography as you think you are. In search of the Northwest Passage, you steer 2 ships into ice and question your life choices as you watch your entire crew slowly freeze and starve to death. You die wishing a TV show was made about you and your wish is granted.`,
    },
    5: {
      name: "Can Use Compass",
      description: `You're not great at this, but you are able to use a compass and have a mental model of cardinal directions. You have heard that moss only grows on one side of the trees, and would use this knowledge to your advantage, if only you remembered which side. `,
    },
    6: {
      name: "Cartographer",
      description: `Not bad! You appear to be obsessed with maps. You firmly believe that reality can and should be modelled in ways that communicate spatial information effectively. You enjoy walking and tend to establish yourself as the "maps guy" during every hike as a result your compulsive need to check a map every 2 minutes.`,
    },
    7: {
      name: "Inventor of GPS",
      description: `You're so good at geography that you invented GPS. This means you are owned by the US goverment and operated by the US Space Force. You're pretty good at providing geolocation, but require an unobstructed line of sight to 4 or more satellites. Obstacles such as mountains and buildings confuse you, and you hate them.`,
    },
    8: {
      name: "Google Maps",
      description: `Wow! You really know your stuff! Be it real-time traffic conditions, satellite imagery, or interactive panoramic views - you can do it all! With little to no concern to anyone's privacy, you can navigate your way out of any situation. Well done!`,
    },
  },
];
