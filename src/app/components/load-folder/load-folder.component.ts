import { Component, ViewChild } from "@angular/core";

import { LoadFile } from "./load-folder.component.i";
import { LoadFileService } from "../../services/load-file/load-file.service";

@Component({
  selector: "app-load-folda",
  templateUrl: "./load-folder.component.html",
  styleUrls: ["./load-folder.component.scss"],
})
export class LoadFolderComponent {
  @ViewChild("fileInput") fileInput;
  public loading = false;

  constructor(private fileService: LoadFileService) {}

  public onLoadFiles(folda: { [key: number]: File }): void {
    this.loading = true;

    const files = this.fileService.convertObjectToArray(folda);
    this.fileService
      .loadTextFromEachFiles$(files)
      .subscribe(
        (loadFiles: LoadFile[]) => {
          this.fileService.saveLoadResult(loadFiles);
        },
        () => window.alert("読み込みに失敗しました")
      )
      .add(() => (this.loading = false));
  }

  public onClickFoldaInputButton(): void {
    if (this.fileService.loadResult.fileNumber !== 0) {
      window.alert("すでにファイルを読み込んでいます");
      return;
    }
    this.fileInput.nativeElement.click();
  }
}
