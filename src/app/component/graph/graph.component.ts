import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Graph } from "src/app/service/make-graph/graph.i";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.scss"]
})
export class GraphComponent implements OnInit, OnDestroy {
  public graphData = [];

  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.subscription = this.dataService.graphData$.subscribe(
    //   (graphData: Graph[]) => {
    //     graphData.forEach((data) => {
    //       this.graphData.push({ name: `${data.name}`, value: `${data.value}` });
    //     });
    //   },
    //   (error) => console.log(error),
    // );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
