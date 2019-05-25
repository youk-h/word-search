import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: "app-reg-exp-search",
  templateUrl: "./reg-exp-search.component.html",
  styleUrls: ["./reg-exp-search.component.scss"]
})
export class RegExpSearchComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ["", Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ["", Validators.required]
    });
    this.fourthFormGroup = this.formBuilder.group({
      fourthCtrl: ["", Validators.required]
    });
  }
}
