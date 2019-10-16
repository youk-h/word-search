import { ComponentFixture, TestBed, async } from "@angular/core/testing";

import { CreateWordComponent } from "./create-word.component";
import { SearchConditionService } from "../../service/search-condition/search-condition.service";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule, MatInputModule, MatIconModule, MatListModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Subscription, Subject } from "rxjs";

describe("CreateWordComponent", () => {
  let fixture: ComponentFixture<CreateWordComponent>;
  let component: CreateWordComponent;
  let searchConditionSvc: SearchConditionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatIconModule,
      ],
      declarations: [CreateWordComponent],
      providers: [SearchConditionService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWordComponent);
    component = fixture.componentInstance;
    searchConditionSvc = TestBed.get(SearchConditionService);
    fixture.detectChanges();
  });

  it("should create component and service", () => {
    expect(component).toBeTruthy();
    expect(searchConditionSvc).toBeTruthy();
  });

  describe("ngOnInit", () => {
    describe("create subscriber of wordList", () => {
      it("should create subscription", () => {
        // assert
        expect(component.subscription).toBeTruthy();
      });
    });

    describe("subscriber created in ngOnInit", () => {
      it("should set wordList when subscriber receive wordList", () => {
        // arrange
        const wordList = ["import", "export"];

        // act
        component.wordList$.next(wordList);

        // assert
        expect(component.wordList).toEqual(wordList);
      });

      it("should call genRegExp with received wordList", () => {
        // arrange
        jest.spyOn(SearchConditionService.prototype, "genRegExp").mockReturnValue();

        // act
        component.wordList$.next();

        // assert
        expect(searchConditionSvc.genRegExp).toHaveBeenCalledWith(component.wordList);
      });
    });
  });

  describe("ngOnDestroy", () => {
    it("should call unsubscribe of component.subscription", () => {
      // arrange
      jest.spyOn(Subject.prototype, "subscribe").mockReturnValue(new Subscription());
      jest.spyOn(Subscription.prototype, "unsubscribe").mockReturnValue();

      // act
      fixture.destroy();

      // assert
      expect(Subscription.prototype.unsubscribe).toHaveBeenCalled();

    });
  });

  describe("onAddWordToWordList", () => {
    it("should push word when word is and is not in wordList", () => {
      // arrange
      jest.spyOn(SearchConditionService.prototype, "inWordList").mockReturnValue(false);
      const word = "import";
      searchConditionSvc.wordList = [];

      const expected = ["import"];

      // act
      component.onAddWordToWordList(word);

      // assert
      expect(searchConditionSvc.wordList).toEqual(expected);
    });

    it("should not push word when word is not", () => {
      // arrange
      jest.spyOn(SearchConditionService.prototype, "inWordList").mockReturnValue(false);
      const word = "";
      searchConditionSvc.wordList = [];

      const expected = [];

      // act
      component.onAddWordToWordList(word);

      // assert
      expect(searchConditionSvc.wordList).toEqual(expected);
    });

    it("should not push word when word is in wordList", () => {
      // arrange
      jest.spyOn(SearchConditionService.prototype, "inWordList").mockReturnValue(true);
      const word = "import";
      searchConditionSvc.wordList = ["import"];

      const expected = ["import"];

      // act
      component.onAddWordToWordList(word);

      // assert
      expect(searchConditionSvc.wordList).toEqual(expected);
    });

    it("should call next with service.wordList", () => {
      // arrange
      jest.spyOn(Subject.prototype, "next").mockReturnValue();
      jest.spyOn(SearchConditionService.prototype, "inWordList").mockReturnValue(false);
      const word = "import";
      searchConditionSvc.wordList = [];

      const expected = ["import"];

      // act
      component.onAddWordToWordList(word);

      // assert
      expect(Subject.prototype.next).toHaveBeenCalledWith(expected);
    });

    it("should set searchWord with null", () => {
      // arrange
      jest.spyOn(SearchConditionService.prototype, "inWordList").mockReturnValue(false);
      const word = "import";

      const expected = null;

      // act
      component.onAddWordToWordList(word);

      // assert
      expect(component.searchWord).toEqual(expected);
    });

  });

  describe("onChangeWordInWordList", () => {
    it("should change word in service.wordList if target word don't match with word of corresponding index of wordList", () => {
      // arrange
      searchConditionSvc.wordList = ["import", "export"];
      const word = "domestic";
      const index = 1;

      const expected = ["import", "domestic"];

      // act
      component.onChangeWordInWordList(word, index);

      // assert
      expect(searchConditionSvc.wordList).toEqual(expected);
    });

    it("should not change service.wordList if target word match with any word in wordList", () => {
      // arrange
      searchConditionSvc.wordList = ["import", "export"];
      const word = "export";
      const index = 1;

      const expected = ["import", "export"];

      // act
      component.onChangeWordInWordList(word, index);

      // assert
      expect(searchConditionSvc.wordList).toEqual(expected);
    });

    it("should not change service.wordList if target word has already been in wordList", () => {
      // arrange
      searchConditionSvc.wordList = ["import", "export"];
      const word = "export";
      const index = 0;

      const expected = ["import", "export"];

      // act
      component.onChangeWordInWordList(word, index);

      // assert
      expect(searchConditionSvc.wordList).toEqual(expected);
    });
  });

  describe("onDeleteWordFromWordList", () => {
    it("should delete word from service.wordList if target word is in wordList", () => {
      // arrange
      searchConditionSvc.wordList = ["import", "export"];
      const word = "import";

      const expected = ["export"];

      // act
      component.onDeleteWordFromWordList(word);

      // assert
      expect(searchConditionSvc.wordList).toEqual(expected);
    });

    it("should not delete word from service.wordList if target word is not in wordList", () => {
      // arrange
      searchConditionSvc.wordList = ["import", "export"];
      const word = "domestic";

      const expected = ["import", "export"];

      // act
      component.onDeleteWordFromWordList(word);

      // assert
      expect(searchConditionSvc.wordList).toEqual(expected);
    });

    it("should call next with service.wordList", () => {
      // arrange
      searchConditionSvc.wordList = ["import", "export"];
      jest.spyOn(Subject.prototype, "next");

      const expected = searchConditionSvc.wordList;

      // act
      component.onDeleteWordFromWordList("word");

      // assert
      expect(Subject.prototype.next).toHaveBeenCalledWith(expected);
    });
  });

  describe("onDecideSeachNumber", () => {
    it("should call decideSeachNumber with number received from view", () => {
      // arrange
      jest.spyOn(SearchConditionService.prototype, "decideSearchNumber").mockReturnValue();
      const num = 0;
      const expected = num;

      // act
      component.onDecideSearchNumber(num);

      // assert
      expect(searchConditionSvc.decideSearchNumber).toHaveBeenCalledWith(expected);
    });
  });

  describe("reset", () => {
    it("should set wordList with []", () => {
      // arrange
      component.wordList = ["import"];
      const expected = [];

      // act
      component.reset();

      // assert
      expect(component.wordList).toEqual(expected);
    });

    it("should set searchNumber with undefined", () => {
      // arrange
      component.searchNumber = 5;
      const expected = undefined;

      // act
      component.reset();

      // assert
      expect(component.searchNumber).toEqual(expected);
    });

    it("should set searchWord with undefined", () => {
      // arrange
      component.searchWord = "import";
      const expected = undefined;

      // act
      component.reset();

      // assert
      expect(component.searchWord).toEqual(expected);
    });
  });
});
