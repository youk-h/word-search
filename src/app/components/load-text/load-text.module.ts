import { NgModule } from "@angular/core";

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

import { LoadFileComponent } from "../load-file/load-file.component";
import { LoadFolderComponent } from "../load-folder/load-folder.component";
import { LoadTextComponent } from "./load-text.component";

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
  ],
  exports: [
    LoadTextComponent,
  ],
  declarations: [
    LoadTextComponent,
    LoadFileComponent,
    LoadFolderComponent,
  ],
})
export class LoadTextModule { }
