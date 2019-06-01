import { Component, DoCheck } from "@angular/core";

import { Graph } from "src/app/service/make-graph/make-graph.service.i";
import { MakeGraphService } from "src/app/service/make-graph/make-graph.service";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.scss"]
})
export class GraphComponent implements DoCheck {
  public graphData: Graph = [];

  constructor(private makeGraphSvc: MakeGraphService) { }

  ngDoCheck() {
    this.graphData = this.makeGraphSvc.graphData;
  }
}
