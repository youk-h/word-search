import { Component, ViewChild } from "@angular/core";

import { LoadFileService } from "../../service/load-file/load-file.service";

@Component({
  selector: "app-load-folda",
  templateUrl: "./load-folda.component.html",
  styleUrls: ["./load-folda.component.scss"]
})
export class LoadFoldaComponent {
  @ViewChild("fileInput") fileInput;
  public loadResult = { fileNumber: 0, charNumber: 0 };
  loading = false;

  constructor(
    private fileService: LoadFileService,
  ) { }

  public onLoadFiles(files: any): void {
    files = this.fileService.convertObjectToArray(files);
    this.loading = true;

    this.fileService.loadTextOfEachFiles$(files).subscribe(
      (loadFiles) => {
        this.loadResult = {
          fileNumber: loadFiles.length,
          charNumber: loadFiles.reduce((charNum, file) => charNum + file.loadText.length, 0)
        };
        this.loading = false;
      },
      (error) => console.log(error),
    );
  }

  public onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  public reset() {
    this.loadResult = { fileNumber: 0, charNumber: 0 };
  }
}
