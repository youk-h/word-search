import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldaLoadComponent } from './folda-load.component';

describe('FoldaLoadComponent', () => {
  let component: FoldaLoadComponent;
  let fixture: ComponentFixture<FoldaLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoldaLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoldaLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
