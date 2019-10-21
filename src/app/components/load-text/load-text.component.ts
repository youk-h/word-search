import { Component, DoCheck } from "@angular/core";

import { LoadFileService } from "../../services/load-file/load-file.service";

@Component({
  selector: "app-load-text",
  templateUrl: "./load-text.component.html",
  styleUrls: ["./load-text.component.scss"],
})
export class LoadTextComponent implements DoCheck {
  public loadResult;

  constructor(private fileService: LoadFileService) {}

  public ngDoCheck() {
    this.loadResult = this.fileService.loadResult;
  }

  public reset() {
    this.loadResult = { fileNumber: 0, charNumber: 0 };
  }
}
