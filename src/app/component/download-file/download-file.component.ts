import { Component, OnInit, OnDestroy } from "@angular/core";

import { MakeOutputDataService } from "../../service/make-output-data/make-output-data.service";
import { Subject, Subscription } from "rxjs";

@Component({
  selector: "app-download-file",
  templateUrl: "./download-file.component.html",
  styleUrls: ["./download-file.component.scss"],
})
export class DownloadFileComponent implements OnInit, OnDestroy {
  public saveFileName: string;

  private fileName$: Subject<string> = new Subject();
  private subscription: Subscription;

  constructor(
    private editWordService: MakeOutputDataService,
  ) { }

  ngOnInit() {
    // this.subscription = this.fileName$.subscribe(
    //   (name) => this.state = name ? status.Normal : status.NG,
    //   (error) => console.log(error),
    // );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onDecideFileName(e: any) {
    this.fileName$.next(e.target.value);
  }

  public onDownload(event: any) {
    // const exportData: string = this.editWordService.makeOutputData(this.dataService.searchedFiles);
    // const blob: Blob = new Blob([exportData], { type: "application/x-msdownload" });
    // event.currentTarget.href = window.URL.createObjectURL(blob);
  }
}
