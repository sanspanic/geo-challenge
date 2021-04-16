import {
  isCorrect,
  gameLost,
  nextLevel,
  getPercentile,
  makeUniqueSelection,
  pickWinner,
  pickOnlyOne,
  evaluateMapGuess,
  calculateRank,
} from "./helpers";

describe("isCorrect", function () {
  test("works: if match", function () {
    const res = isCorrect("value", "value");
    expect(res).toEqual(true);
  });
  test("works: if no match", function () {
    const res = isCorrect("value", "diffvalue");
    expect(res).toEqual(false);
  });
});

describe("gameLost", function () {
  test("works: if lives = 0", function () {
    const res = gameLost(0);
    expect(res).toEqual(true);
  });
  test("works: if lives != 0", function () {
    const res = gameLost(2);
    expect(res).toEqual(false);
  });
});

describe("nextLevel", function () {
  test("works: if turn = 10", function () {
    const res = nextLevel(10);
    expect(res).toEqual(true);
  });
  test("works: if turn != 10", function () {
    const res = nextLevel(2);
    expect(res).toEqual(false);
  });
});

describe("getPercentile", function () {
  test("works: if percentile max", function () {
    const res = getPercentile(4250);
    expect(res).toEqual(100);
  });
  test("works: if percentile mid", function () {
    const res = getPercentile(2125);
    expect(res).toEqual(50);
  });
  test("works: if percentile min", function () {
    const res = getPercentile(0);
    expect(res).toEqual(0);
  });
});

describe("makeUniqueSelection", function () {
  test("works: selection right length", function () {
    const res = makeUniqueSelection();
    expect(new Set(res).size).toEqual(4);
  });
});

describe("pickWinner", function () {
  test("works: selects winner", function () {
    const res = pickWinner([1, 2, 3, 4]);
    expect([1, 2, 3, 4]).toContain(res);
  });
});

describe("pickOnlyOne", function () {
  test("works: selects only one from bigger array", function () {
    let countryArr = Array.from({ length: 249 });
    countryArr = countryArr.map((i) => "country");
    const res = pickOnlyOne(countryArr);
    expect(res).toEqual("country");
  });
});

describe("evaluate map guess", function () {
  test("works: score 10 if distance 1100", function () {
    const res = evaluateMapGuess(1100);
    expect(res).toEqual(10);
  });
  test("works: score 100 if distance 0", function () {
    const res = evaluateMapGuess(0);
    expect(res).toEqual(100);
  });
  test("works: score 50 if distance 0", function () {
    const res = evaluateMapGuess(450);
    expect(res).toEqual(50);
  });
  test("works: score 0 if distance 2000", function () {
    const res = evaluateMapGuess(2000);
    expect(res).toEqual(0);
  });
});

describe("calculate rank", function () {
  test("works: if score 0", function () {
    const res = calculateRank(0);
    expect(res).toEqual(1);
  });
  test("works: if score 800", function () {
    const res = calculateRank(800);
    expect(res).toEqual(2);
  });
  test("works: if max score", function () {
    const res = calculateRank(4250);
    expect(res).toEqual(8);
  });
});
