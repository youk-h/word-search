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

import { GoogleChartsModule } from "angular-google-charts";

import { RegExpSearchComponent } from "./reg-exp-search.component";
import { SearchWordComponent } from "../../component/search-word/search-word.component";
import { LoadFoldaComponent } from "../../component/load-folda/load-folda.component";
import { DownloadFileComponent } from "../../component/download-file/download-file.component";
import { CreateWordComponent } from "../../component/create-word/create-word.component";
import { GraphComponent } from "../../component/graph/graph.component";

import { FileManagementService } from "../../service/file-management/file-management.service";
import { MakeOutputDataService } from "../../service/make-output-data/make-output-data.service";
import { SearchConditionService } from "../../service/search-condition/search-condition.service";

import { CheckNumberDirective } from "../../directive/check-number.directive";
import { MatStepperModule } from "@angular/material/stepper";

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
    GoogleChartsModule.forRoot(),
  ],
  exports: [
    RegExpSearchComponent,
    SearchWordComponent,
    LoadFoldaComponent,
    DownloadFileComponent,
    CreateWordComponent,
    CheckNumberDirective,
    GraphComponent,
  ],
  declarations: [
    RegExpSearchComponent,
    SearchWordComponent,
    LoadFoldaComponent,
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
