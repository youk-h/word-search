import { TestBed } from "@angular/core/testing";

import { LoadFileService } from "./load-file.service";

describe("FilemanagementService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: LoadFileService = TestBed.get(LoadFileService);
    expect(service).toBeTruthy();
  });
});
