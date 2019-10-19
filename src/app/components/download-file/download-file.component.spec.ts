import {
  FormsModule
} from "@angular/forms";

import {
  async,
  ComponentFixture,
  TestBed
} from "@angular/core/testing";

import {
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule
} from "@angular/material";

import { DownloadFileComponent } from "./download-file.component";
import { ExportFileService } from "../../services/export-file/export-file.service";
import { MakeOutputDataService } from "../../services/make-output-data/make-output-data.service";
import { ExtractTextsService } from "../../services/extract-texts/extract-texts.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("DownloadFileComponent", () => {
  let components: DownloadFileComponent;
  let fixture: ComponentFixture<DownloadFileComponent>;
  let exportFileSvc: ExportFileService;
  let makeOutputSvc: MakeOutputDataService;
  let extractTextsSvc: ExtractTextsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
      ],
      declarations: [DownloadFileComponent],
      providers: [
        ExportFileService,
        MakeOutputDataService,
        ExtractTextsService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadFileComponent);
    components = fixture.componentInstance;
    exportFileSvc = TestBed.get(ExportFileService);
    makeOutputSvc = TestBed.get(MakeOutputDataService);
    extractTextsSvc = TestBed.get(ExtractTextsService);

    fixture.detectChanges();
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("should create", () => {
    expect(components).toBeTruthy();
    expect(exportFileSvc).toBeTruthy();
    expect(makeOutputSvc).toBeTruthy();
    expect(extractTextsSvc).toBeTruthy();
  });

  describe("onDecideFileName", () => {
    it("should call formatFileName when fileName is", () => {
      // arrange
      const fileName = "file";
      jest.spyOn(ExportFileService.prototype, "formatFileName");

      // act
      components.onDecideFileName(fileName);

      // assert
      expect(ExportFileService.prototype.formatFileName).toHaveBeenCalledWith(fileName);
    });

    it("should set saveFileName formatted when fileName is", () => {
      // arrange
      const fileName = "file";
      const rtnMock = "file.txt";
      jest.spyOn(ExportFileService.prototype, "formatFileName").mockReturnValue(rtnMock);

      const expected = rtnMock;

      // act
      components.onDecideFileName(fileName);

      // assert
      expect(components.saveFileName).toBe(expected);
    });
  });

  describe("onClickFileDownLoadButton", () => {
    it("should call ViewChild.nativeElement.click", () => {
      // arrange
      components.downloadFile.nativeElement.click = jest.fn();

      // act
      components.onClickFileDownloadButton();

      // assert
      expect(components.downloadFile.nativeElement.click).toHaveBeenCalled();
    });
  });

  describe("onDownload", () => {
    let event: any;

    beforeEach(() => {
      event = {
        currentTarget: jest.fn(),
      };
      window.URL.createObjectURL = jest.fn();
    });

    describe("call window.alert", () => {
      it("should call window.alert and not call makeOutputData when extracteText.length === 0", () => {
        // arrange
        window.alert = jest.fn();
        jest.spyOn(MakeOutputDataService.prototype, "makeOutputData").mockReturnValue("");

        const expected = "検索後に結果をダウンロードできます";

        // act
        components.onDownload(event);

        // assert
        expect(window.alert).toHaveBeenCalledWith(expected);
        expect(MakeOutputDataService.prototype.makeOutputData).not.toHaveBeenCalled();
      });

    });

    describe("make exportData", () => {
      it("should call makeOutputData when extracteText.length !== 0", () => {
        // arrange
        window.alert = jest.fn();
        extractTextsSvc.extractedTexts = [""];
        jest.spyOn(MakeOutputDataService.prototype, "makeOutputData").mockReturnValue("");

        const expected = extractTextsSvc.extractedTexts;

        // act
        components.onDownload(event);

        // assert
        expect(window.alert).not.toHaveBeenCalled();
        expect(makeOutputSvc.makeOutputData).toHaveBeenCalledWith(expected);
      });
    });

    describe("make href of anker tag", () => {
      it("should call window.URL.createObjectURL", () => {
        // arrange
        const exportData = "import";
        extractTextsSvc.extractedTexts = [""];
        jest.spyOn(MakeOutputDataService.prototype, "makeOutputData").mockReturnValue(exportData);

        const expected = new Blob([exportData], { type: "application/x-msdownload" });

        // act
        components.onDownload(event);

        // assert
        expect(window.URL.createObjectURL).toHaveBeenCalledWith(expected);
      });

      it("should set href created", () => {
        // arrange
        const href = "url";
        extractTextsSvc.extractedTexts = [""];
        jest.spyOn(window.URL, "createObjectURL").mockReturnValue(href);

        const expected = href;

        // act
        components.onDownload(event);

        // assert
        expect(event.currentTarget.href).toEqual(expected);
      });
    });
  });
});
