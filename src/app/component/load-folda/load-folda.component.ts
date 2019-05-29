import { Component, DoCheck, ViewChild } from "@angular/core";

import { FileManagementService } from "../../service/file-management/file-management.service";
import { from, of } from "rxjs";
import { mergeMap, toArray, map } from "rxjs/operators";

@Component({
  selector: "app-load-folda",
  templateUrl: "./load-folda.component.html",
  styleUrls: ["./load-folda.component.scss"]
})
export class LoadFoldaComponent implements DoCheck {
  @ViewChild("fileInput") fileInput;
  public loaded = { fileNumber: 0, charNumber: 0 };
  loading = false;

  constructor(
    private fileService: FileManagementService,
  ) { }

  ngDoCheck() { }

  public onLoadFiles(files: any): void {
    files = this.fileService.convertObjectToArray(files);
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

  public reset() {
    this.loaded = { fileNumber: 0, charNumber: 0 };
  }
}
