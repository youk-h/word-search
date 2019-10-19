import { Component, ViewChild } from "@angular/core";

import { LoadFile } from "./load-folda.component.i";
import { LoadFileService } from "../../services/load-file/load-file.service";

@Component({
  selector: "app-load-folda",
  templateUrl: "./load-folda.component.html",
  styleUrls: ["./load-folda.component.scss"]
})
export class LoadFoldaComponent {
  @ViewChild("fileInput") fileInput;
  public loadResult;
  public loading = false;

  constructor(
    private fileService: LoadFileService,
  ) { this.initialize(); }

  public initialize() {
    this.loadResult = { fileNumber: 0, charNumber: 0 };
  }

  public onLoadFiles(folda: { [key: number]: File }): void {
    this.loading = true;

    const files = this.fileService.convertObjectToArray(folda);
    this.fileService.loadTextOfEachFiles$(files).subscribe(
      (loadFiles: LoadFile[]) => {
        this.loadResult = {
          fileNumber: loadFiles.length,
          charNumber: loadFiles.reduce((charNum, file) => charNum + file.loadText.length, 0)
        };
      },
      () => window.alert("読み込みに失敗しました"),
    ).add(() => this.loading = false);
  }

  public onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  public reset() {
    this.initialize();
  }
}
