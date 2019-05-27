import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatStepperModule } from "@angular/material/stepper";

import { MY_ROUTES } from "./app.routing";
import { HomePageModule } from "./pages/home-page/home-page.module";
import { RegExpSearchModule } from "./pages/reg-exp-search/reg-exp-search.module";
import { WordClassSearchModule } from "./pages/word-class-search/word-class-search.module";

import { AppComponent } from "./app.component";
import { FileManagementService } from "./service/file-management/file-management.service";
import { GenerateRegExpService, SearchConditionService } from "./service/search-condition/search-condition.service";
import { MakeOutputDataService } from "./service/make-output-data/make-output-data.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MY_ROUTES,
    HomePageModule,
    RegExpSearchModule,
    WordClassSearchModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    GenerateRegExpService,
    SearchConditionService,
    FileManagementService,
    MakeOutputDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
