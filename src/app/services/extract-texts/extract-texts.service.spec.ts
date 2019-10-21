import { TestBed } from "@angular/core/testing";

import {
  ExtractTextsService,
  CalculateTextlengthService,
  SearchMatchService,
} from "./extract-texts.service";
import { SearchConditionService } from "../search-condition/search-condition.service";
import { LoadFile, Index, Text } from "./extract-text.service.i";

describe("", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("ExtractTextsService", () => {
    let service: ExtractTextsService;
    let searchConditionSvc: SearchConditionService;

    beforeEach(() => {
      service = TestBed.get(ExtractTextsService);
      searchConditionSvc = TestBed.get(SearchConditionService);
    });

    describe("extractTextsFromFile", () => {
      let file: LoadFile;
      let indexes: Index[];

      beforeEach(() => {
        file = { loadText: "1" } as LoadFile;
        indexes = [{ index: 1, word: "1" }];
      });

      it("should process against all indexes", () => {
        indexes = [{ index: 1, word: "1" }, { index: 2, word: "2" }];

        jest.spyOn(service, "extractTextUsingIndex");

        const expected = indexes.length;

        // act
        service.extractTextsFromFile(file, indexes);

        // assert
        expect(service.extractTextUsingIndex).toHaveBeenCalledTimes(expected);
      });

      it("should push texts retrieved from loaded text", () => {
        // arrange
        const text = "text";
        jest.spyOn(service, "extractTextUsingIndex").mockReturnValue(text);
        const expected = text;

        // act
        service.extractTextsFromFile(file, indexes);

        // assert
        expect(service.extractTextUsingIndex).toHaveBeenCalled();
      });
    });

    describe("extractTextUsingIndex", () => {
      let text: Text;
      let index: Index;

      beforeEach(() => {
        text = "text";
        index = { index: 1, word: "1" };
      });

      describe("This calculates text length that should be retrieved", () => {
        it("should call calculateTextLength", () => {
          // arrange
          jest.spyOn(
            CalculateTextlengthService.prototype,
            "calculateTextLength"
          );

          // act
          service.extractTextUsingIndex(text, index);

          // assert
          expect(
            CalculateTextlengthService.prototype.calculateTextLength
          ).toHaveBeenCalledWith(searchConditionSvc.searchNumber, index);
        });
      });

      describe("This reconcile start and end of text range", () => {
        it("should extract (end - start) charactor text", () => {
          // arrange
          text = "0123456789";
          jest
            .spyOn(CalculateTextlengthService.prototype, "calculateTextLength")
            .mockReturnValueOnce({ start: 2, end: 5 });
          const expected = "234";

          // act
          const actual = service.extractTextUsingIndex(text, index);

          // assert
          expect(actual).toEqual(expected);
        });

        it("should change start to 0, then extract text when start is minus number", () => {
          // arrange
          text = "0123456789";
          jest
            .spyOn(CalculateTextlengthService.prototype, "calculateTextLength")
            .mockReturnValueOnce({ start: -5, end: 5 });
          const expected = "01234";

          // act
          const actual = service.extractTextUsingIndex(text, index);

          // assert
          expect(actual).toEqual(expected);
        });

        it("should change end to text length, then extract text when end is greater than text length", () => {
          // arrange
          text = "0123456789";
          jest
            .spyOn(CalculateTextlengthService.prototype, "calculateTextLength")
            .mockReturnValueOnce({ start: 2, end: 10 });
          const expected = "23456789";

          // act
          const actual = service.extractTextUsingIndex(text, index);

          // assert
          expect(actual).toEqual(expected);
        });
      });
    });
  });

  describe("SearchMatchService", () => {
    const service = new SearchMatchService();

    describe("searchMatch", () => {
      it("should extract index and word from given text according regexp", () => {
        // arrange
        const text = "import hoge, export moge, import huge";
        const regexp = /(import|export)/g;

        const expected = [
          { index: 0, word: "import" },
          { index: 13, word: "export" },
          { index: 26, word: "import" },
        ];

        // act
        const actual = service.searchMatch(text, regexp);

        // assert
        expect(actual).toEqual(expected);
      });
    });
  });

  describe("CalculateTextlengthService", () => {
    const service = new CalculateTextlengthService();

    describe("calculateTextLength", () => {
      let searchNumber: number;
      let index: Index;

      beforeEach(() => {
        searchNumber = 0;
        index = { index: 0, word: "0" };
      });

      describe("This method should returns range in text.", () => {
        it("should return reconciled range when searchNumber is less than wordLength", () => {
          // arrange
          searchNumber = 5;
          index = { index: 3, word: "import" };

          const expected = { start: 3, end: 9 };
          // act
          const actual = service.calculateTextLength(searchNumber, index);

          // assert
          expect(actual).toEqual(expected);
        });

        it("should return range when searchNumber is greater than wordLength", () => {
          // arrange
          searchNumber = 10;
          index = { index: 3, word: "import" };

          const expected = { start: 1, end: 11 };
          // act
          const actual = service.calculateTextLength(searchNumber, index);

          // assert
          expect(actual).toEqual(expected);
        });

        it("should shift range by absolute start when start < 0", () => {
          // arrange
          searchNumber = 20;
          index = { index: 3, word: "import" };

          const expected = { start: 0, end: 20 };
          // act
          const actual = service.calculateTextLength(searchNumber, index);

          // assert
          expect(actual).toEqual(expected);
        });
      });
    });

    describe("adjustSearchNumber", () => {
      beforeEach(() => {
        jest.restoreAllMocks();
      });
      describe("Thie method should return corrected searchNumber", () => {
        it("should return searchWordLength when searchNumber < searchWordLength", () => {
          // arrange
          const searchNumber = 5;
          const searchWordLength = 6;

          const expected = searchWordLength;

          // act
          const actual = service.adjustSearchNumber(
            searchNumber,
            searchWordLength
          );

          // assert
          expect(actual).toBe(expected);
        });

        it("should return searchNumber when searchNumber = searchWordLength", () => {
          // arrange
          const searchNumber = 6;
          const searchWordLength = 6;

          const expected = searchNumber;

          // act
          const actual = service.adjustSearchNumber(
            searchNumber,
            searchWordLength
          );

          // assert
          expect(actual).toBe(expected);
        });

        it("should return searchNumber when searchNumber > searchWordLength", () => {
          // arrange
          const searchNumber = 7;
          const searchWordLength = 6;

          const expected = searchNumber;

          // act
          const actual = service.adjustSearchNumber(
            searchNumber,
            searchWordLength
          );

          // assert
          expect(actual).toBe(expected);
        });
      });
    });

    describe("calculateHalfSearchNumber", () => {
      beforeEach(() => {
        jest.restoreAllMocks();
      });
      it("should return half of searchNumber - searchWordLength", () => {
        // arrange
        const searchNumber = 10;
        const searchWordLength = 4;

        const expected = 3;

        // act
        const actual = service.calculateHalfSearchNumber(
          searchNumber,
          searchWordLength
        );

        // assert
        expect(actual).toBe(expected);
      });

      it("should return value reduced by decimal value", () => {
        // arrange
        const searchNumber = 7;
        const searchWordLength = 6;

        const expected = 0;

        // act
        const actual = service.calculateHalfSearchNumber(
          searchNumber,
          searchWordLength
        );

        // assert
        expect(actual).toBe(expected);
      });

      it("should return 0 when searchNumber - searchWordLength = 0", () => {
        // arrange
        const searchNumber = 6;
        const searchWordLength = 6;

        const expected = 0;

        // act
        const actual = service.calculateHalfSearchNumber(
          searchNumber,
          searchWordLength
        );

        // assert
        expect(actual).toBe(expected);
      });
    });

    describe("getDecimalValue", () => {
      it("should return decimal value", () => {
        // arrange
        const num = 10.5;

        const expected = 0.5;

        // act
        const actual = service.getDecimalValue(num);

        // assert
        expect(actual).toBe(expected);
      });

      it("should return decimal value", () => {
        // arrange
        const num = 10;

        const expected = 0;

        // act
        const actual = service.getDecimalValue(num);

        // assert
        expect(actual).toBe(expected);
      });
    });
  });
});
