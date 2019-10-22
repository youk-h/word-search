import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";

import { HomePageComponent } from "./pages/home-page/home-page.component";
import { RegExpSearchPageComponent } from "./pages/reg-exp-search/reg-exp-search.component";
import { MorphologicalAnalysisPageComponent } from "./pages/morphological-analysis/morphological-analysis.component";

const myRoutes = [
  { path: "", component: HomePageComponent },
  { path: "reg-exp", component: RegExpSearchPageComponent },
  { path: "word-class", component: MorphologicalAnalysisPageComponent },
];

export const MY_ROUTES: ModuleWithProviders = RouterModule.forRoot(myRoutes);
