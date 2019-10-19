import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material";

import { SearchWordComponent } from "./search-word.component";
import { LoadFileService } from "../../service/load-file/load-file.service";
import { SearchConditionService } from "../../service/search-condition/search-condition.service";
import { AnalyzeTextsService } from "../../service/analyze-texts/analyze-texts.service";
import { LoadFile } from "../../service/load-file/load-file.service.i";

describe("SearchwordComponent", () => {
  let component: SearchWordComponent;
  let fixture: ComponentFixture<SearchWordComponent>;
  let loadFileSvc: LoadFileService;
  let searchConditionSvc: SearchConditionService;
  let analyzeTextSvc: AnalyzeTextsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
      ],
      declarations: [SearchWordComponent],
      providers: [
        LoadFileService,
        SearchConditionService,
        AnalyzeTextsService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWordComponent);
    component = fixture.componentInstance;
    loadFileSvc = TestBed.get(LoadFileService);
    searchConditionSvc = TestBed.get(SearchConditionService);
    analyzeTextSvc = TestBed.get(AnalyzeTextsService);

    fixture.detectChanges();
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("should create component and service", () => {
    expect(component).toBeTruthy();
    expect(loadFileSvc).toBeTruthy();
    expect(searchConditionSvc).toBeTruthy();
    expect(analyzeTextSvc).toBeTruthy();
  });

  describe("onSearch", () => {
    it("should call checkConditionTosearch with services", () => {
      // arrange
      jest.spyOn(SearchWordComponent.prototype, "checkConditionToSearch").mockReturnValue(false);

      const expected = [
        loadFileSvc,
        searchConditionSvc
      ];

      // act
      component.onSearch();

      // assert
      expect(SearchWordComponent.prototype.checkConditionToSearch).toHaveBeenCalledWith(...expected);
    });

    it("should call analyzeTextSvc.prototype.analyzeTextOfFiles when checkConditionToSearch returns true", () => {
      // arrange
      const regExp = new RegExp("");
      searchConditionSvc.regExp = regExp;
      const loadFiles = [];
      loadFileSvc.loadFiles = loadFiles;

      jest.spyOn(SearchWordComponent.prototype, "checkConditionToSearch").mockReturnValue(true);
      jest.spyOn(AnalyzeTextsService.prototype, "analyzeTextOfFiles").mockReturnValue(1);

      const expected = [
        loadFiles,
        regExp,
      ];

      // act
      component.onSearch();

      // assert
      expect(AnalyzeTextsService.prototype.analyzeTextOfFiles).toHaveBeenCalledWith(...expected);
    });
  });

  describe("checkConditionToSearch", () => {
    beforeEach(() => {
      window.alert = jest.fn((str: string) => { });
      searchConditionSvc.regExp = new RegExp("^$");
      searchConditionSvc.searchNumber = 1;
      loadFileSvc.loadFiles = [{} as LoadFile];
    });

    it("should call alert when regExp is not", () => {
      // arrange
      searchConditionSvc.regExp = undefined;

      const expected = "ステップ１で検索文字を指定してください";

      // act
      component.checkConditionToSearch(loadFileSvc, searchConditionSvc);

      // assert
      expect(window.alert).toHaveBeenCalledWith(expected);
    });

    it("should return false when regExp is not", () => {
      // arrange
      searchConditionSvc.regExp = undefined;

      const expected = false;

      // act
      const actual = component.checkConditionToSearch(loadFileSvc, searchConditionSvc);

      // assert
      expect(actual).toEqual(expected);
    });

    it("should call alert when searchNumber is not", () => {
      // arrange
      searchConditionSvc.searchNumber = undefined;

      const expected = "ステップ１で検索文字数を指定してください";

      // act
      component.checkConditionToSearch(loadFileSvc, searchConditionSvc);

      // assert
      expect(window.alert).toHaveBeenCalledWith(expected);
    });

    it("should return false when searchNumber is not", () => {
      // arrange
      searchConditionSvc.searchNumber = undefined;

      const expected = false;

      // act
      const actual = component.checkConditionToSearch(loadFileSvc, searchConditionSvc);

      // assert
      expect(actual).toEqual(expected);
    });

    it("should call alert when loadFiles is not", () => {
      // arrange
      loadFileSvc.loadFiles = [];

      const expected = "ステップ２で検索対象のフォルダを読み込んでください";

      // act
      component.checkConditionToSearch(loadFileSvc, searchConditionSvc);

      // assert
      expect(window.alert).toHaveBeenCalledWith(expected);
    });

    it("should return false when loadFiles is not", () => {
      // arrange
      loadFileSvc.loadFiles = [];

      const expected = false;

      // act
      const actual = component.checkConditionToSearch(loadFileSvc, searchConditionSvc);

      // assert
      expect(actual).toEqual(expected);
    });

    it("should return true when all input are", () => {
      // arrange
      const expected = true;

      // act
      const actual = component.checkConditionToSearch(loadFileSvc, searchConditionSvc);

      // assert
      expect(actual).toEqual(expected);
    });
  });

  describe("reset", () => {
    it("should set searchNumber with 0", () => {
      // arrange
      searchConditionSvc.searchNumber = 1;

      const expected = 0;

      // act
      searchConditionSvc.reset();

      // assert
      expect(component.searchedNumber).toBe(expected);
    });
  });
});
