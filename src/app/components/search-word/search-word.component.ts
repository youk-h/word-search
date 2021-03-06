import { Component } from "@angular/core";

import { LoadFileService } from "../../services/load-file/load-file.service";
import { SearchConditionService } from "../../services/search-condition/search-condition.service";
import { SearchedNumber } from "../../services/analyze-texts/analyze-texts.service.i";
import { AnalyzeTextsService } from "../../services/analyze-texts/analyze-texts.service";

@Component({
  selector: "app-search-word",
  templateUrl: "./search-word.component.html",
  styleUrls: ["./search-word.component.scss"],
})
export class SearchWordComponent {
  public searchedNumber: SearchedNumber = 0;

  public constructor(
    private fileService: LoadFileService,
    private searchCondtionService: SearchConditionService,
    private analyzeTextSvc: AnalyzeTextsService
  ) {}

  public onSearch() {
    if (
      !this.checkConditionToSearch(this.fileService, this.searchCondtionService)
    ) {
      return;
    }

    this.searchedNumber = this.analyzeTextSvc.analyzeTextOfFiles(
      this.fileService.loadFiles,
      this.searchCondtionService.regExp
    );
  }

  public checkConditionToSearch(
    fileService: LoadFileService,
    searchCondition: SearchConditionService
  ): boolean {
    if (!searchCondition.regExp) {
      window.alert("ステップ１で検索文字を指定してください");
      return false;
    }
    if (!searchCondition.searchNumber) {
      window.alert("ステップ１で検索文字数を指定してください");
      return false;
    }
    if (!fileService.loadFiles.length) {
      window.alert("ステップ２で検索対象のフォルダを読み込んでください");
      return false;
    }
    return true;
  }

  public reset() {
    this.searchedNumber = 0;
  }
}
