import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { RegExpSearchComponent } from "./pages/reg-exp-search/reg-exp-search.component";

const myRoutes = [
  { path: "", component: HomePageComponent },
  { path: "reg-exp", component: RegExpSearchComponent },
];

export const MY_ROUTES: ModuleWithProviders = RouterModule.forRoot(myRoutes);
