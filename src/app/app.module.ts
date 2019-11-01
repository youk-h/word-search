import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatStepperModule } from "@angular/material/stepper";

import { MY_ROUTES } from "./app.routing";

import { HomePageModule } from "./pages/home-page/home-page.module";
import { RegExpSearchPageModule } from "./pages/reg-exp-search/reg-exp-search.module";
import { MorphologicalAnalysisPageModule } from "./pages/morphological-analysis/morphological-analysis.module";

import { AppComponent } from "./app.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MY_ROUTES,
    HomePageModule,
    RegExpSearchPageModule,
    MorphologicalAnalysisPageModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
