import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { CreateWordComponent } from "../../components/create-word/create-word.component";
import { LoadTextComponent } from "../../components/load-text/load-text.component";
import { SearchWordComponent } from "../../components/search-word/search-word.component";

import { SearchConditionService } from "../../services/search-condition/search-condition.service";
import { LoadFileService } from "../../services/load-file/load-file.service";
import { AnalyzeTextsService } from "../../services/analyze-texts/analyze-texts.service";
import { MakeGraphService } from "../../services/make-graph/make-graph.service";

@Component({
  selector: "app-reg-exp-search",
  templateUrl: "./reg-exp-search.component.html",
  styleUrls: ["./reg-exp-search.component.scss"]
})
export class RegExpSearchComponent implements OnInit {
  @ViewChild(CreateWordComponent) createWordComponent: CreateWordComponent;
  @ViewChild(LoadTextComponent) loadTextComponent: LoadTextComponent;
  @ViewChild(SearchWordComponent) searchWordComponent: SearchWordComponent;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private searchConditionSvc: SearchConditionService,
    private loadFileSvc: LoadFileService,
    private analyzeTextSvc: AnalyzeTextsService,
    private makeGraphSvc: MakeGraphService,
  ) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ["", Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ["", Validators.required]
    });
    this.fourthFormGroup = this.formBuilder.group({
      fourthCtrl: ["", Validators.required]
    });
    this.fifthFormGroup = this.formBuilder.group({
      fifthCtrl: ["", Validators.required]
    });
  }

  public onResetSearchCondition() {
    this.createWordComponent.reset();
    this.searchConditionSvc.reset();
  }

  public onResetLoadFolda() {
    this.loadTextComponent.reset();
    this.loadFileSvc.reset();
  }

  public onResetSearchResult() {
    this.searchWordComponent.reset();
    this.analyzeTextSvc.reset();
    this.makeGraphSvc.reset();
  }

  public onResetAll() {
    this.onResetSearchCondition();
    this.onResetLoadFolda();
    this.onResetSearchResult();
  }
}
