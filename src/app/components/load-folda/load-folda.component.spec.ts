import {
  async,
  ComponentFixture,
  TestBed
} from "@angular/core/testing";

import { of } from "rxjs";

import {
  MatProgressBarModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
} from "@angular/material";

import { LoadFoldaComponent } from "./load-folda.component";
import { LoadFileService } from "../../service/load-file/load-file.service";

describe("LoadFoldaComponent", () => {
  let component: LoadFoldaComponent;
  let fixture: ComponentFixture<LoadFoldaComponent>;
  let loadFileSvc: LoadFileService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
      ],
      declarations: [LoadFoldaComponent],
      providers: [
        LoadFileService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadFoldaComponent);
    component = fixture.componentInstance;
    loadFileSvc = TestBed.get(LoadFileService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(loadFileSvc).toBeTruthy();
  });

  describe("onLoadFiles", () => {
    it("should call convertObjectToArray", () => {
      // arrange
      const files = {};
      jest.spyOn(LoadFileService.prototype, "convertObjectToArray").mockReturnValue([]);

      const expected = files;

      // act
      component.onLoadFiles(files);

      // assert
      expect(LoadFileService.prototype.convertObjectToArray).toHaveBeenCalledWith(expected);
    });

    it("should set loading with true", () => {
      // arrange
      const files = {};
      jest.spyOn(LoadFileService.prototype, "convertObjectToArray").mockReturnValue([]);
      jest.spyOn(LoadFileService.prototype, "loadTextOfEachFiles$").mockReturnValue(of());

      const expected = files;

      // act
      component.onLoadFiles(files);

      // assert
      expect(LoadFileService.prototype.convertObjectToArray).toHaveBeenCalledWith(expected);
    });

    it("should set loading with true", () => {
      // arrange
      const files = {};
      jest.spyOn(LoadFileService.prototype, "convertObjectToArray").mockReturnValue([]);
      jest.spyOn(LoadFileService.prototype, "loadTextOfEachFiles$").mockReturnValue(of());

      const expected = files;

      // act
      component.onLoadFiles(files);

      // assert
      expect(LoadFileService.prototype.convertObjectToArray).toHaveBeenCalledWith(expected);
    });

    it("should call loadTextOfEachFiles$", () => {
      // arrange
      const files = [];
      jest.spyOn(LoadFileService.prototype, "convertObjectToArray").mockReturnValue([]);
      jest.spyOn(LoadFileService.prototype, "loadTextOfEachFiles$").mockReturnValue(of());

      const expected = files;

      // act
      component.onLoadFiles(files);

      // assert
      expect(LoadFileService.prototype.loadTextOfEachFiles$).toHaveBeenCalledWith(expected);
    });
  });
});