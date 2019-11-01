import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { MorphologicalAnalysisPageComponent } from "./morphological-analysis.component";

@NgModule({
  imports: [FormsModule, CommonModule],
  exports: [MorphologicalAnalysisPageComponent],
  declarations: [MorphologicalAnalysisPageComponent],
})
export class MorphologicalAnalysisPageModule { }
