import { TestBed } from "@angular/core/testing";

import { LoadFileService } from "./load-file.service";

describe("FilemanagementService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const services: LoadFileService = TestBed.get(LoadFileService);
    expect(services).toBeTruthy();
  });
});
