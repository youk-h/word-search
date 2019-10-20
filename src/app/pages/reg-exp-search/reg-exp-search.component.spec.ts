import {
  TestBed,
  ComponentFixture,
  async
} from "@angular/core/testing";

import {
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";

import {
  BrowserAnimationsModule
} from "@angular/platform-browser/animations";

import {
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatStepperModule,
  MatButtonModule,
  MatProgressBarModule
} from "@angular/material";

import {
  RegExpSearchComponent
} from "./reg-exp-search.component";
import {
  SearchWordComponent
} from "../../components/search-word/search-word.component";
import {
  LoadFoldaComponent
} from "../../components/load-folder/load-folder.component";
import {
  DownloadFileComponent
} from "../../components/download-file/download-file.component";
import {
  CreateWordComponent
} from "../../components/create-word/create-word.component";
import {
  GraphComponent
} from "../../components/graph/graph.component";

import {
  SearchConditionService
} from "../../services/search-condition/search-condition.service";

import {
  CheckNumberDirective
} from "../../directives/check-number.directive";
import {
  CommonModule
} from "@angular/common";
import {
  GoogleChartsModule
} from "angular-google-charts";
import { LoadFileService } from "../../services/load-file/load-file.service";
import { AnalyzeTextsService } from "../../services/analyze-texts/analyze-texts.service";
import { MakeGraphService } from "../../services/make-graph/make-graph.service";

describe("RegExpSearchComponent", () => {
  let fixture: ComponentFixture<RegExpSearchComponent>;
  let components: RegExpSearchComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatIconModule,
        MatStepperModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatIconModule,
        MatProgressBarModule,
        GoogleChartsModule.forRoot(),
      ],
      declarations: [
        RegExpSearchComponent,
        SearchWordComponent,
        LoadFoldaComponent,
        DownloadFileComponent,
        CreateWordComponent,
        GraphComponent,
        CheckNumberDirective,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    jest.restoreAllMocks();
    fixture = TestBed.createComponent(RegExpSearchComponent);
    components = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create RegExpSearchComponent", () => {
    expect(fixture).toBeDefined();
  });

  describe("onResetSearchCondition", () => {
    it("should reset data when reset button of search condition is clicked", () => {
      // arrange
      const button: HTMLButtonElement = (fixture.nativeElement as HTMLElement).querySelector("button.resetSearchCondition");

      jest.spyOn(CreateWordComponent.prototype, "reset");
      jest.spyOn(SearchConditionService.prototype, "reset");
      jest.spyOn(components, "onResetSearchCondition");

      // act
      button.click();
      fixture.detectChanges();

      // assert
      expect(components.onResetSearchCondition).toHaveBeenCalled();
      expect(CreateWordComponent.prototype.reset).toHaveBeenCalled();
      expect(SearchConditionService.prototype.reset).toHaveBeenCalled();
    });
  });

  describe("onResetLoadFolda", () => {
    it("should reset data when reset button of load folda is clicked", () => {
      // arrange
      const button: HTMLButtonElement = (fixture.nativeElement as HTMLElement).querySelector("button.resetLoadFolda");

      jest.spyOn(LoadFoldaComponent.prototype, "reset");
      jest.spyOn(LoadFileService.prototype, "reset");
      jest.spyOn(components, "onResetLoadFolda");

      // act
      button.click();
      fixture.detectChanges();

      // assert
      expect(components.onResetLoadFolda).toHaveBeenCalled();
      expect(LoadFoldaComponent.prototype.reset).toHaveBeenCalled();
      expect(LoadFileService.prototype.reset).toHaveBeenCalled();
    });
  });

  describe("onResetSearchResult", () => {
    it("should reset data when reset button of search result is clicked", () => {
      // arrange
      const button: HTMLButtonElement = (fixture.nativeElement as HTMLElement).querySelector("button.resetSearchResult");

      jest.spyOn(SearchWordComponent.prototype, "reset");
      jest.spyOn(AnalyzeTextsService.prototype, "reset");
      jest.spyOn(MakeGraphService.prototype, "reset");
      jest.spyOn(components, "onResetSearchResult");

      // act
      button.click();
      fixture.detectChanges();

      // assert
      expect(components.onResetSearchResult).toHaveBeenCalled();
      expect(SearchWordComponent.prototype.reset).toHaveBeenCalled();
      expect(AnalyzeTextsService.prototype.reset).toHaveBeenCalled();
      expect(MakeGraphService.prototype.reset).toHaveBeenCalled();
    });
  });

  describe("onResetAll", () => {
    it("should reset data when reset last button is clicked", () => {
      // arrange
      const button: HTMLButtonElement = (fixture.nativeElement as HTMLElement).querySelector("button.resetAll");

      jest.spyOn(components, "onResetSearchCondition");
      jest.spyOn(components, "onResetLoadFolda");
      jest.spyOn(components, "onResetSearchResult");
      jest.spyOn(components, "onResetAll");

      // act
      button.click();
      fixture.detectChanges();

      // assert
      expect(components.onResetSearchResult).toHaveBeenCalled();
      expect(components.onResetSearchCondition).toHaveBeenCalled();
      expect(components.onResetLoadFolda).toHaveBeenCalled();
      expect(components.onResetSearchResult).toHaveBeenCalled();
    });
  });

});
