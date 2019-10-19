import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject, Subscription } from "rxjs";

import { SearchConditionService } from "../../services/search-condition/search-condition.service";

@Component({
  selector: "app-create-word",
  templateUrl: "./create-word.component.html",
  styleUrls: ["./create-word.component.scss"],
})
export class CreateWordComponent implements OnInit, OnDestroy {
  public searchWord: string;
  public searchNumber: number;
  public wordList: string[] = [];

  public wordList$ = new Subject<string[]>();
  public subscription: Subscription;

  constructor(
    private searchConditionSvc: SearchConditionService,
  ) { }

  ngOnInit() {
    this.subscription = this.wordList$.subscribe(
      (wordList) => {
        this.wordList = wordList;
        this.searchConditionSvc.genRegExp(this.wordList);
      },
      (error) => console.log(error),
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onAddWordToWordList(word: string) {
    if (word && !this.searchConditionSvc.inWordList(word)) {
      this.searchConditionSvc.wordList.push(word);
      this.wordList$.next(this.searchConditionSvc.wordList);
    }

    this.searchWord = null;
  }

  public onChangeWordInWordList(changeWord: string, i: number) {
    if (this.searchConditionSvc.wordList.some((word) => changeWord === word)) {
      return;
    }

    if (changeWord !== this.wordList[i]) {
      this.searchConditionSvc.wordList[i] = changeWord;
      this.wordList$.next(this.searchConditionSvc.wordList);
    }
  }

  public onDeleteWordFromWordList(deleteWord: string) {
    this.searchConditionSvc.wordList = this.searchConditionSvc.wordList.filter((word) => word !== deleteWord);
    this.wordList$.next(this.searchConditionSvc.wordList);
  }

  public onDecideSearchNumber(num: number) {
    this.searchConditionSvc.decideSearchNumber(num);
  }

  public reset() {
    this.wordList = [];
    this.searchNumber = undefined;
    this.searchWord = undefined;
  }
}
