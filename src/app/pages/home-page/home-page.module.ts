import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { HomePageComponent } from "./home-page.component";
import { UpdateInfoComponent } from "../../components/update-info/update-info.component";

@NgModule({
  imports: [FormsModule, CommonModule],
  exports: [HomePageComponent],
  declarations: [HomePageComponent, UpdateInfoComponent],
})
export class HomePageModule {}
