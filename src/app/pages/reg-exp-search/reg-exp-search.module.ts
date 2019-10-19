import {
  NgModule,
} from "@angular/core";

import {
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";

import {
  CommonModule,
} from "@angular/common";

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatProgressBarModule,
} from "@angular/material";

import {
  MatStepperModule,
} from "@angular/material/stepper";

import {
  GoogleChartsModule,
} from "angular-google-charts";

import { RegExpSearchComponent } from "./reg-exp-search.component";
import { SearchWordComponent } from "../../components/search-word/search-word.component";
import { LoadFoldaComponent } from "../../components/load-folda/load-folda.component";
import { DownloadFileComponent } from "../../components/download-file/download-file.component";
import { CreateWordComponent } from "../../components/create-word/create-word.component";
import { GraphComponent } from "../../components/graph/graph.component";

import { CheckNumberDirective } from "../../directives/check-number.directive";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    GoogleChartsModule.forRoot(),
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
})
export class RegExpSearchModule { }
