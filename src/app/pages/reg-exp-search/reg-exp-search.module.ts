import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSelectModule,
  MatListModule,
  MatIconModule,
  MatProgressBarModule,
} from "@angular/material";

import { RegExpSearchComponent } from "./reg-exp-search.component";
import { SearchWordComponent } from "../../component/search-word/search-word.component";
import { FoldaLoadComponent } from "../../component/folda-load/folda-load.component";
import { DownloadFileComponent } from "../../component/download-file/download-file.component";
import { CreateWordComponent } from "../../component/create-word/create-word.component";
import { GraphComponent } from "../../component/graph/grash.component";

import { FileManagementService } from "../../service/file-management/file-management.service";
import { MakeOutputDataService } from "../../service/make-output-data/make-output-data.service";
import { SearchConditionService } from "../../service/search-condition/search-condition.service";

import { CheckNumberDirective } from "../../directive/check-number.directive";
import { MatStepperModule } from "@angular/material/stepper";

// import { NgxChartsModule } from "@swimlane/ngx-charts";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    // NgxChartsModule,
  ],
  exports: [
    RegExpSearchComponent,
    SearchWordComponent,
    FoldaLoadComponent,
    DownloadFileComponent,
    CreateWordComponent,
    CheckNumberDirective,
    GraphComponent,
  ],
  declarations: [
    RegExpSearchComponent,
    SearchWordComponent,
    FoldaLoadComponent,
    DownloadFileComponent,
    CreateWordComponent,
    CheckNumberDirective,
    GraphComponent,
  ],
  providers: [
    SearchConditionService,
    FileManagementService,
    MakeOutputDataService,
  ],
})
export class RegExpSearchModule { }
