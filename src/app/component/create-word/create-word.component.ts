import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject, Subscription } from "rxjs";

import { SearchConditionService } from "../../service/search-condition/search-condition.service";

@Component({
  selector: "app-create-word",
  templateUrl: "./create-word.component.html",
  styleUrls: ["./create-word.component.scss"],
})
export class CreateWordComponent implements OnInit, OnDestroy {
  searchWord = "";
  searchNumber: number;
  wordList: string[] = [];

  private wordList$ = new Subject<string[]>();
  private subscription: Subscription;

  public constructor(
    private searchCondition: SearchConditionService,
  ) { }

  ngOnInit() {
    this.subscription = this.wordList$.subscribe(
      (wordList) => {
        this.searchCondition.genRegExp(wordList);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onAddWordToWordList(word: string) {
    if (word && !this.inWordList(word)) {
      this.wordList.push(word);
      this.wordList$.next(this.wordList);
    } else {
      console.log("this word has already registered");
    }
    this.searchWord = null;
  }

  public onChangeWordInWordList(word: string, i: number) {
    if (word !== this.wordList[i]) {
      this.wordList[i] = word;
      this.wordList$.next(this.wordList);
    }
  }

  public onDeleteWordFromWordList(deleteWord: string) {
    this.wordList = this.wordList.filter((word) => word !== deleteWord);
    this.wordList$.next(this.wordList);
  }

  public onDecideSearchNumber(num: number) {
    this.searchCondition.decideSearchNumber(num);
    console.log(this.searchCondition.searchNumber);
  }

  public inWordList(targetWord: string): boolean {
    return this.wordList.some((word: string) => word === targetWord);
  }

  public reset() {
    this.wordList = [];
    this.searchNumber = undefined;
    this.searchWord = undefined;
  }
}
