import {
  async,
  ComponentFixture,
  TestBed
} from "@angular/core/testing";

import {
  GoogleChartsModule,
} from "angular-google-charts";

import { GraphComponent } from "./graph.component";
import { MakeGraphService } from "../../service/make-graph/make-graph.service";

describe("DownloadFileComponent", () => {
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;
  let makeGraphSvc: MakeGraphService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        GoogleChartsModule,
      ],
      declarations: [GraphComponent],
      providers: [
        MakeGraphService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphComponent);
    component = fixture.componentInstance;
    makeGraphSvc = TestBed.get(MakeGraphService);

    fixture.detectChanges();
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(makeGraphSvc).toBeTruthy();
  });

  describe("ngDoCheck", () => {
    it("should set graphData", () => {
      // arrange
      makeGraphSvc.graphData = [["graph", 1]];

      const expected = makeGraphSvc.graphData;

      // act
      fixture.detectChanges();

      // assert
      expect(component.graphData).toEqual(expected);
    });
  });
});
