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
} from "../../component/search-word/search-word.component";
import {
  LoadFoldaComponent
} from "../../component/load-folda/load-folda.component";
import {
  DownloadFileComponent
} from "../../component/download-file/download-file.component";
import {
  CreateWordComponent
} from "../../component/create-word/create-word.component";
import {
  GraphComponent
} from "../../component/graph/graph.component";

import {
  SearchConditionService
} from "../../service/search-condition/search-condition.service";

import {
  CheckNumberDirective
} from "../../directive/check-number.directive";
import {
  CommonModule
} from "@angular/common";
import {
  GoogleChartsModule
} from "angular-google-charts";
import { LoadFileService } from "../../service/load-file/load-file.service";
import { AnalyzeTextsService } from "../../service/analyze-texts/analyze-texts.service";
import { MakeGraphService } from "../../service/make-graph/make-graph.service";

describe("RegExpSearchComponent", () => {
  let fixture: ComponentFixture<RegExpSearchComponent>;
  let component: RegExpSearchComponent;

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
    component = fixture.componentInstance;
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
      jest.spyOn(component, "onResetSearchCondition");

      // act
      button.click();
      fixture.detectChanges();

      // assert
      expect(component.onResetSearchCondition).toHaveBeenCalled();
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
      jest.spyOn(component, "onResetLoadFolda");

      // act
      button.click();
      fixture.detectChanges();

      // assert
      expect(component.onResetLoadFolda).toHaveBeenCalled();
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
      jest.spyOn(component, "onResetSearchResult");

      // act
      button.click();
      fixture.detectChanges();

      // assert
      expect(component.onResetSearchResult).toHaveBeenCalled();
      expect(SearchWordComponent.prototype.reset).toHaveBeenCalled();
      expect(AnalyzeTextsService.prototype.reset).toHaveBeenCalled();
      expect(MakeGraphService.prototype.reset).toHaveBeenCalled();
    });
  });

  describe("onResetAll", () => {
    it("should reset data when reset last button is clicked", () => {
      // arrange
      const button: HTMLButtonElement = (fixture.nativeElement as HTMLElement).querySelector("button.resetAll");

      jest.spyOn(component, "onResetSearchCondition");
      jest.spyOn(component, "onResetLoadFolda");
      jest.spyOn(component, "onResetSearchResult");
      jest.spyOn(component, "onResetAll");

      // act
      button.click();
      fixture.detectChanges();

      // assert
      expect(component.onResetSearchResult).toHaveBeenCalled();
      expect(component.onResetSearchCondition).toHaveBeenCalled();
      expect(component.onResetLoadFolda).toHaveBeenCalled();
      expect(component.onResetSearchResult).toHaveBeenCalled();
    });
  });

});
