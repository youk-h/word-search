import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatStepperModule } from "@angular/material/stepper";

import { MY_ROUTES } from "./app.routing";
import { HomePageModule } from "./pages/home-page/home-page.module";
import { RegExpSearchModule } from "./pages/reg-exp-search/reg-exp-search.module";

import { AppComponent } from "./app.component";
import { LoadFileService } from "./services/load-file/load-file.service";
import { GenerateRegExpService, SearchConditionService } from "./services/search-condition/search-condition.service";
import { MakeOutputDataService } from "./services/make-output-data/make-output-data.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MY_ROUTES,
    HomePageModule,
    RegExpSearchModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    GenerateRegExpService,
    SearchConditionService,
    LoadFileService,
    MakeOutputDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
