import { Component, ViewChild } from "@angular/core";

import { LoadFile } from "./load-file.component.i";
import { LoadFileService } from "../../services/load-file/load-file.service";

@Component({
  selector: "app-load-file",
  templateUrl: "./load-file.component.html",
  styleUrls: ["./load-file.component.scss"]
})
export class LoadFileComponent {
  @ViewChild("fileInput") fileInput;
  public loadResult;
  public loading = false;

  constructor(
    private fileService: LoadFileService,
  ) { }

  public onLoadFile(folder: { [key: number]: File }): void {
    this.loading = true;

    const files = this.fileService.convertObjectToArray(folder);
    this.fileService.loadTextFromEachFiles$(files).subscribe(
      (loadFiles: LoadFile[]) => {
        this.fileService.saveLoadResult(loadFiles);
      },
      () => window.alert("読み込みに失敗しました"),
    ).add(() => this.loading = false);
  }

  public onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

}
