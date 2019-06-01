import { Component, Input } from "@angular/core";

@Component({
  selector: "app-complement",
  templateUrl: "./complement.component.html",
  styleUrls: ["./complement.component.scss"],
})
export class ComplementComponent {
  @Input() complement: string;

  constructor() { }
}
