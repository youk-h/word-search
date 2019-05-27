import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadFoldaComponent } from './load-folda.component';

describe('LoadFoldaComponent', () => {
  let component: LoadFoldaComponent;
  let fixture: ComponentFixture<LoadFoldaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadFoldaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadFoldaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
