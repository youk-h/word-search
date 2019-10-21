import { AnalyzeTextsService } from "./analyze-texts.service";
import { SearchConditionService } from "../search-condition/search-condition.service";
import { LoadFile } from "../load-file/load-file.service.i";
import { TestBed } from "@angular/core/testing";
import {
  ExtractTextsService,
  SearchMatchService,
} from "../extract-texts/extract-texts.service";
import { MakeGraphService } from "../make-graph/make-graph.service";
import { Index } from "./analyze-texts.service.i";

describe("AnalyzeTextsService", () => {
  let extractTextSvc: ExtractTextsService;
  let searchConditonSvc: SearchConditionService;
  let makeGraphSvc: MakeGraphService;
  let services: AnalyzeTextsService;

  beforeEach(() => {
    jest.restoreAllMocks();

    extractTextSvc = TestBed.get(ExtractTextsService);
    searchConditonSvc = TestBed.get(SearchConditionService);
    makeGraphSvc = TestBed.get(MakeGraphService);
    services = TestBed.get(AnalyzeTextsService);
  });

  describe("analyzeTextOfFiles", () => {
    let files: LoadFile[];
    let regExp: RegExp;

    beforeEach(() => {
      files = [];
      regExp = /""/;
      searchConditonSvc.wordList = [];
    });

    describe("This method should initialize graph data using input wordList.", () => {
      it("should call MakeGraphSvc.initializeGraphData", () => {
        // arrange
        jest.spyOn(makeGraphSvc, "initializeGraphData");

        // act
        services.analyzeTextOfFiles(files, regExp);

        // assert
        expect(makeGraphSvc.initializeGraphData).toHaveBeenCalledWith(
          searchConditonSvc.wordList
        );
      });
    });

    describe("This method should search indexes, extract texts using the indexes and make graph against each file.", () => {
      it("should process all files given from argument.", () => {
        // arrange
        files = [{ loadText: "1" } as LoadFile, { loadText: "2" } as LoadFile];

        jest.spyOn(SearchMatchService.prototype, "searchMatch");
        jest.spyOn(ExtractTextsService.prototype, "extractTextsFromFile");
        jest.spyOn(MakeGraphService.prototype, "makeGraphData");
        // act
        services.analyzeTextOfFiles(files, regExp);

        // assert
        expect(SearchMatchService.prototype.searchMatch).toHaveBeenCalledTimes(
          2
        );
        expect(
          ExtractTextsService.prototype.extractTextsFromFile
        ).toHaveBeenCalledTimes(2);
        expect(MakeGraphService.prototype.makeGraphData).toHaveBeenCalledTimes(
          2
        );
      });

      describe("Check a process for a file", () => {
        let file: LoadFile;
        beforeEach(() => {
          file = { loadText: "" } as LoadFile;
          files = [file];
        });

        it("should call a searchMatch function with loadText and regExp", () => {
          // arrange
          jest.spyOn(SearchMatchService.prototype, "searchMatch");

          const expected = { text: file.loadText, regExp };

          // act
          services.analyzeTextOfFiles(files, regExp);

          // assert
          expect(SearchMatchService.prototype.searchMatch).toHaveBeenCalledWith(
            expected.text,
            expected.regExp
          );
        });

        it("should extract texts according to indexes given by searchMatch funtion", () => {
          // arrange
          const indexes: Index[] = [{ index: 5, word: "" }];
          jest
            .spyOn(SearchMatchService.prototype, "searchMatch")
            .mockReturnValue(indexes);
          jest.spyOn(ExtractTextsService.prototype, "extractTextsFromFile");

          const expected = { file, indexes };

          // act
          services.analyzeTextOfFiles(files, regExp);

          // assert
          expect(
            ExtractTextsService.prototype.extractTextsFromFile
          ).toHaveBeenCalledWith(expected.file, expected.indexes);
        });

        it("should create graph according to indexes given by searchMatch funtion", () => {
          // arrange
          const indexes: Index[] = [{ index: 5, word: "" }];
          jest
            .spyOn(SearchMatchService.prototype, "searchMatch")
            .mockReturnValue(indexes);
          jest.spyOn(MakeGraphService.prototype, "makeGraphData");

          const expected = { indexes };

          // act
          services.analyzeTextOfFiles(files, regExp);

          // assert
          expect(MakeGraphService.prototype.makeGraphData).toHaveBeenCalledWith(
            expected.indexes
          );
        });
      });

      it("should caluculate all number of graph data at last", () => {
        // arrange
        jest.spyOn(MakeGraphService.prototype, "addAllNumberToGraph");

        // act
        services.analyzeTextOfFiles(files, regExp);

        // assert
        expect(
          MakeGraphService.prototype.addAllNumberToGraph
        ).toHaveBeenCalledWith(extractTextSvc.extractedTexts);
      });

      it("should caluculate all number of graph data at last", () => {
        // arrange
        extractTextSvc.extractedTexts = ["1", "2", "3"];
        const expected = extractTextSvc.extractedTexts.length;

        // act
        const extractedLength = services.analyzeTextOfFiles(files, regExp);

        // assert
        expect(extractedLength).toBe(expected);
      });
    });
  });

  describe("reset", () => {
    it("should reset data about search result", () => {
      // arrange
      extractTextSvc.extractedTexts = ["1", "2"];
      makeGraphSvc.graphData = [["hoge", 1], ["moge", 2]];

      const expected = [];

      // act
      services.reset();

      // asert
      expect(extractTextSvc.extractedTexts).toEqual(expected);
      expect(makeGraphSvc.graphData).toEqual(expected);
    });
  });
});
