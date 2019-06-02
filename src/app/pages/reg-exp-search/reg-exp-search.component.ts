import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { CreateWordComponent } from "../../component/create-word/create-word.component";
import { LoadFoldaComponent } from "../../component/load-folda/load-folda.component";
import { SearchWordComponent } from "../../component/search-word/search-word.component";

import { SearchConditionService } from "../../service/search-condition/search-condition.service";
import { LoadFileService } from "../../service/load-file/load-file.service";
import { AnalyzeTextsService } from "../../service/analyze-texts/analyze-texts.service";
import { MakeGraphService } from "../../service/make-graph/make-graph.service";

@Component({
  selector: "app-reg-exp-search",
  templateUrl: "./reg-exp-search.component.html",
  styleUrls: ["./reg-exp-search.component.scss"]
})
export class RegExpSearchComponent implements OnInit {
  @ViewChild(CreateWordComponent) createWordComponent: CreateWordComponent;
  @ViewChild(LoadFoldaComponent) loadFoldaComponent: LoadFoldaComponent;
  @ViewChild(SearchWordComponent) searchWordComponent: SearchWordComponent;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private searchConditionSvc: SearchConditionService,
    private fileManagementSvc: LoadFileService,
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
    this.loadFoldaComponent.reset();
    this.fileManagementSvc.reset();
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
