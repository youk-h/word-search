import { Component, DoCheck, ViewChild } from "@angular/core";

import { FileManagementService } from "../../service/file-management/file-management.service";
import { from, of } from "rxjs";
import { mergeMap, toArray, map } from "rxjs/operators";

@Component({
  selector: "app-folda-load",
  templateUrl: "./folda-load.component.html",
  styleUrls: ["../scss/reg-exp.scss", "./folda-load.component.scss"]
})
export class FoldaLoadComponent implements DoCheck {
  @ViewChild("fileInput") fileInput;
  public loaded = { fileNumber: 0, charNumber: 0 };
  loading = false;

  constructor(
    private fileService: FileManagementService,
  ) { }

  ngDoCheck() { }

  public onLoadFiles(files: File[]): void {
    this.loading = true;

    from(files).pipe(
      mergeMap((file: File) => this.fileService.loadText(file).pipe(
        map((loaded) => this.loaded = loaded),
      )),
      toArray(),
    ).subscribe(
      () => this.loading = false,
      (error) => console.log(error),
    );
  }

  public onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

}
