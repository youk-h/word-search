import { TestBed } from "@angular/core/testing";
import {
  SearchConditionService,
  GenerateRegExpService,
} from "./search-condition.service";

describe("SearchConditionService", () => {
  let service: SearchConditionService;

  beforeEach(() => {
    jest.resetAllMocks();
    service = TestBed.get(SearchConditionService);
  });

  describe("genRegExp", () => {
    it("should call convertWordsToRegExp", () => {
      // arrange
      const words: string[] = [];
      jest.spyOn(GenerateRegExpService.prototype, "convertWordsToRegExp");

      // act
      service.genRegExp(words);

      expect(
        GenerateRegExpService.prototype.convertWordsToRegExp
      ).toHaveBeenCalledWith(words);
    });
  });

  describe("inWordList", () => {
    let targetWord;

    beforeEach(() => {
      targetWord = "";
      service.wordList = ["import", "export", "public", "private"];
    });

    it("should return true when word is in property wordList", () => {
      // arrange
      targetWord = "import";

      const expected = true;

      // act
      const actual = service.inWordList(targetWord);

      // act
      expect(actual).toEqual(expected);
    });

    it("should return false when word is in property wordList", () => {
      // arrange
      targetWord = "outer";

      const expected = false;

      // act
      const actual = service.inWordList(targetWord);

      // act
      expect(actual).toEqual(expected);
    });

    it("should return false when property wordList is empty", () => {
      // arrange
      service.wordList = [];

      const expected = false;

      // act
      const actual = service.inWordList(targetWord);

      // act
      expect(actual).toEqual(expected);
    });
  });

  describe("decideSearchNumber", () => {
    it("should enter arg num into property searchNumber to decide searchNumber", () => {
      // arrange
      const num = 10;

      const expected = num;

      expect(service.searchNumber).not.toBe(expected);

      // act
      service.decideSearchNumber(num);

      // assert
      expect(service.searchNumber).toBe(expected);
    });
  });

  describe("reset", () => {
    it("should reset this service's all properties", () => {
      // arrange
      const expected = {
        wordList: [],
        regExp: undefined,
        searchNumber: undefined,
      };

      // act
      service.reset();

      // assert
      expect(service.wordList).toEqual(expected.wordList);
      expect(service.regExp).toEqual(expected.regExp);
      expect(service.searchNumber).toEqual(expected.searchNumber);
    });
  });
});

describe("GenerateRegExpService", () => {
  let service: GenerateRegExpService;

  beforeEach(() => {
    jest.restoreAllMocks();
    service = new GenerateRegExpService();
  });

  describe("escapeWhiteSpace", () => {
    let word;

    beforeEach(() => {
      word = "";
    });

    it("should remove head whitespace of given word", () => {
      // arrange
      word = "    hoge";

      const expected = "hoge";

      // act
      const actual = service.escapeWhiteSpace(word);

      // assert
      expect(actual).toEqual(expected);
    });

    it("should remove tail whitespace of given word", () => {
      // arrange
      word = "hoge   ";

      const expected = "hoge";

      // act
      const actual = service.escapeWhiteSpace(word);

      // assert
      expect(actual).toEqual(expected);
    });

    it("should remove head and tail whitespace of given word", () => {
      // arrange
      word = "    hoge    ";

      const expected = "hoge";

      // act
      const actual = service.escapeWhiteSpace(word);

      // assert
      expect(actual).toEqual(expected);
    });

    it("should ignore intermidinal whitespace", () => {
      // arrange
      word = "    hoge    hoge   ";

      const expected = "hoge    hoge";

      // act
      const actual = service.escapeWhiteSpace(word);

      // assert
      expect(actual).toEqual(expected);
    });
  });

  describe("convertWordsToRegExp", () => {
    let words: string[];

    beforeEach(() => {
      words = [];
    });

    it("should return undefined if words is empty", () => {
      // arrange
      words = [];

      const expected = undefined;

      // act
      const actual = service.convertWordsToRegExp(words);

      // assert
      expect(actual).toEqual(expected);
    });

    it("should call this.escapeWhiteSpace against each word of words", () => {
      // arrange
      words = ["import", "export"];
      jest.spyOn(service, "escapeWhiteSpace");

      const expected = words.length;

      // act
      const actual = service.convertWordsToRegExp(words);

      // assert
      expect(service.escapeWhiteSpace).toHaveBeenCalledTimes(expected);
    });

    it("should join words and separate by |", () => {
      // arrange
      words = ["import", "export"];

      const expected = /import|export/gi;

      // act
      const actual = service.convertWordsToRegExp(words);

      // assert
      expect(actual).toEqual(expected);
    });
  });
});
