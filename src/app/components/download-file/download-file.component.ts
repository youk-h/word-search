import { Component, OnInit, ViewChild } from "@angular/core";

import { MakeOutputDataService } from "../../services/make-output-data/make-output-data.service";
import { ExportFileService } from "../../services/export-file/export-file.service";
import { ExtractTextsService } from "../../services/extract-texts/extract-texts.service";

@Component({
  selector: "app-download-file",
  templateUrl: "./download-file.component.html",
  styleUrls: ["./download-file.component.scss"],
})
export class DownloadFileComponent implements OnInit {
  @ViewChild("downloadFile") downloadFile;
  public saveFileName: string;

  constructor(
    private exportFileSvc: ExportFileService,
    private makeOutputSvc: MakeOutputDataService,
    private extractTextsSvc: ExtractTextsService,
  ) { }

  ngOnInit() { }

  public onDecideFileName(fileName: string) {
    if (fileName) {
      this.saveFileName = this.exportFileSvc.formatFileName(fileName);
    }
  }

  public onClickFileDownloadButton() {
    this.downloadFile.nativeElement.click();
  }

  public onDownload(event: any) {
    if (this.extractTextsSvc.extractedTexts.length === 0) {
      return window.alert("検索後に結果をダウンロードできます");
    }
    const exportData: string = this.makeOutputSvc.makeOutputData(this.extractTextsSvc.extractedTexts);
    const blob: Blob = new Blob([exportData], { type: "application/x-msdownload" });
    event.currentTarget.href = window.URL.createObjectURL(blob);
  }
}
