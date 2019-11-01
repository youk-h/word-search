import { TestBed, ComponentFixture, async } from "@angular/core/testing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatStepperModule,
  MatButtonModule,
  MatProgressBarModule,
} from "@angular/material";

import { RegExpSearchPageComponent } from "./reg-exp-search.component";
import { SearchWordComponent } from "../../components/search-word/search-word.component";
import { DownloadFileComponent } from "../../components/download-file/download-file.component";
import { CreateWordComponent } from "../../components/create-word/create-word.component";
import { GraphComponent } from "../../components/graph/graph.component";

import { SearchConditionService } from "../../services/search-condition/search-condition.service";

import { CheckNumberDirective } from "../../directives/check-number.directive";
import { CommonModule } from "@angular/common";
import { GoogleChartsModule } from "angular-google-charts";
import { LoadFileService } from "../../services/load-file/load-file.service";
import { AnalyzeTextsService } from "../../services/analyze-texts/analyze-texts.service";
import { MakeGraphService } from "../../services/make-graph/make-graph.service";
import { LoadTextComponent } from "../../components/load-text/load-text.component";
import { LoadTextModule } from "../../components/load-text/load-text.module";

describe("RegExpSearchPageComponent", () => {
  let fixture: ComponentFixture<RegExpSearchPageComponent>;
  let components: RegExpSearchPageComponent;

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
        LoadTextModule,
      ],
      declarations: [
        RegExpSearchPageComponent,
        SearchWordComponent,
        DownloadFileComponent,
        CreateWordComponent,
        GraphComponent,
        CheckNumberDirective,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    jest.restoreAllMocks();
    fixture = TestBed.createComponent(RegExpSearchPageComponent);
    components = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create RegExpSearchPageComponent", () => {
    expect(fixture).toBeDefined();
  });

  describe("onResetSearchCondition", () => {
    it("should reset data when reset button of search condition is clicked", () => {
      // arrange
      const button: HTMLButtonElement = (fixture.nativeElement as HTMLElement).querySelector(
        "button.resetSearchCondition"
      );

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

  describe("onResetLoadFolder", () => {
    it("should reset data when reset button of load folda is clicked", () => {
      // arrange
      const button: HTMLButtonElement = (fixture.nativeElement as HTMLElement).querySelector(
        "button.resetLoadFolder"
      );

      jest.spyOn(LoadTextComponent.prototype, "reset");
      jest.spyOn(LoadFileService.prototype, "reset");
      jest.spyOn(components, "onResetLoadFolder");

      // act
      button.click();
      fixture.detectChanges();

      // assert
      expect(components.onResetLoadFolder).toHaveBeenCalled();
      expect(LoadTextComponent.prototype.reset).toHaveBeenCalled();
      expect(LoadFileService.prototype.reset).toHaveBeenCalled();
    });
  });

  describe("onResetSearchResult", () => {
    it("should reset data when reset button of search result is clicked", () => {
      // arrange
      const button: HTMLButtonElement = (fixture.nativeElement as HTMLElement).querySelector(
        "button.resetSearchResult"
      );

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
    it("should reset data when last reset button is clicked", () => {
      // arrange
      const button: HTMLButtonElement = (fixture.nativeElement as HTMLElement).querySelector(
        "button.resetAll"
      );

      jest.spyOn(components, "onResetSearchCondition");
      jest.spyOn(components, "onResetLoadFolder");
      jest.spyOn(components, "onResetSearchResult");
      jest.spyOn(components, "onResetAll");

      // act
      button.click();
      fixture.detectChanges();

      // assert
      expect(components.onResetSearchResult).toHaveBeenCalled();
      expect(components.onResetSearchCondition).toHaveBeenCalled();
      expect(components.onResetLoadFolder).toHaveBeenCalled();
      expect(components.onResetSearchResult).toHaveBeenCalled();
    });
  });
});
