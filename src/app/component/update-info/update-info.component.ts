import { Component, OnInit } from "@angular/core";

import { Info } from "./update-info.component.i";
import { infos } from "../../../public/update-info";

@Component({
  selector: "app-update-info",
  templateUrl: "./update-info.component.html",
  styleUrls: ["./update-info.component.scss"]
})
export class UpdateInfoComponent implements OnInit {
  public infos: Info[] = infos;

  constructor() { }

  ngOnInit() { }
}
