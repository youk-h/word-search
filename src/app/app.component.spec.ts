import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { APP_BASE_HREF } from "@angular/common";
import { MatStepperModule } from "@angular/material/stepper";

import { MY_ROUTES } from "./app.routing";
import { HomePageModule } from "./pages/home-page/home-page.module";
import { RegExpSearchPageModule } from "./pages/reg-exp-search/reg-exp-search.module";
import { MorphologicalAnalysisPageModule } from "./pages/morphological-analysis/morphological-analysis.module";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        MatStepperModule,
        MY_ROUTES,
        HomePageModule,
        RegExpSearchPageModule,
        MorphologicalAnalysisPageModule,
      ],
      declarations: [AppComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: "/" }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  }));

  it("should create the app", () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should go to url when ", () => {
    // arrange
    const routes = (fixture.nativeElement as HTMLElement).querySelectorAll("a");
    const expected = ["/", "/reg-exp", "/word-class"];

    // act & assert
    routes.forEach((route, i) => {
      const href = (route as HTMLAnchorElement).getAttribute("href");
      expect(href).toEqual(expected[i]);
    });
  });
});
