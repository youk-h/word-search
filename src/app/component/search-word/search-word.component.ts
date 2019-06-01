import { Component } from "@angular/core";

import { loadFileService } from "../../service/load-file/load-file.service";
import { SearchConditionService } from "../../service/search-condition/search-condition.service";
import { SearchedNumber } from "../../service/analyze-texts/analyze-texts.service.i";
import { AnalyzeTextsService } from "../../service/analyze-texts/analyze-texts.service";

@Component({
  selector: "app-search-word",
  templateUrl: "./search-word.component.html",
  styleUrls: ["./search-word.component.scss"]
})
export class SearchWordComponent {
  public searchedNumber: SearchedNumber = 0;

  public constructor(
    private fileService: loadFileService,
    private searchCondtionService: SearchConditionService,
    private analyzeTextSvc: AnalyzeTextsService,
  ) { }

  public onSearch() {
    if (!this.checkConditionToSearch(this.fileService, this.searchCondtionService)) { return; }

    this.searchedNumber = this.analyzeTextSvc.analyzeTextOfFiles(this.fileService.loadFiles, this.searchCondtionService.regExp);
  }

  public checkConditionToSearch(fileService: loadFileService, searchCondition: SearchConditionService) {
    if (!searchCondition.regExp) {
      return window.alert("ステップ１で検索文字を指定してください");
    }
    if (!searchCondition.searchNumber) {
      return window.alert("ステップ１で検索文字数を指定してください");
    }
    if (!fileService.loadFiles.length) {
      return window.alert("ステップ２で検索対象のフォルダを読み込んでください");
    }
    return true;
  }

  public reset() {
    this.searchedNumber = 0;
  }
}
